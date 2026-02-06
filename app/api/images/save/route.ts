import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { join } from "path";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { selections } = await request.json();

    if (!selections || !Array.isArray(selections)) {
      return NextResponse.json(
        { error: "Selections array is required" },
        { status: 400 }
      );
    }

    const scriptsDir = join(process.cwd(), "scripts");
    const scriptPath = join(scriptsDir, "save_image.py");
    const outputDir = join(process.cwd(), "public", "assets", "persons");
    const results = [];

    for (const selection of selections) {
      const { characterName, imageUrl, filename } = selection;

      if (!characterName || !imageUrl || !filename) {
        continue;
      }

      try {
        const data = JSON.stringify({
          url: imageUrl,
          outputDir: outputDir,
          filename: filename,
        });

        const pythonCmd = process.platform === "win32" ? "python" : "python3";
        const escapedData = data.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        const command = `"${pythonCmd}" "${scriptPath}" "${escapedData}"`;

        const { stdout, stderr } = await execAsync(command, { cwd: scriptsDir });

        if (stderr) {
          console.error(`Python script error for ${characterName}:`, stderr);
        }

        const result = JSON.parse(stdout);
        
        if (result.success) {
          results.push({
            characterName,
            filename,
            success: true,
            path: result.path,
          });
        } else {
          results.push({
            characterName,
            success: false,
            error: result.error || "Failed to save image",
          });
        }
      } catch (error) {
        console.error(`Error saving ${characterName}:`, error);
        results.push({
          characterName,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error saving images:", error);
    return NextResponse.json(
      { error: "Failed to save images" },
      { status: 500 }
    );
  }
}
