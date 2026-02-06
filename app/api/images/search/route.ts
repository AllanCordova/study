import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { join } from "path";

const execAsync = promisify(exec);

/**
 * @swagger
 * /api/images/search:
 *   post:
 *     summary: Search images for a character
 *     description: Uses the Python search script to return image URLs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 example: Batman
 *               maxResults:
 *                 type: integer
 *                 example: 10
 *               preferredSites:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["pinterest.com", "deviantart.com", "artstation.com"]
 *     responses:
 *       200:
 *         description: Image URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrls:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Missing query
 *       500:
 *         description: Search error
 */
export async function POST(request: NextRequest) {
  try {
    const { query, maxResults = 10, preferredSites } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const scriptsDir = join(process.cwd(), "scripts");
    const scriptPath = join(scriptsDir, "search_images.py");
    const sitesStr = (preferredSites || ["pinterest.com", "deviantart.com", "artstation.com"]).join(",");
    const pythonCmd = process.platform === "win32" ? "python" : "python3";
    
    const escapedQuery = query.replace(/"/g, '\\"');
    const command = `"${pythonCmd}" "${scriptPath}" "${escapedQuery}" ${maxResults} "${sitesStr}"`;
    
    const { stdout, stderr } = await execAsync(command, { cwd: scriptsDir });

    if (stderr) {
      console.error("Python script error:", stderr);
    }

    const result = JSON.parse(stdout);
    
    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrls: result.imageUrls || [] });
  } catch (error) {
    console.error("Error searching images:", error);
    return NextResponse.json(
      { error: "Failed to search images" },
      { status: 500 }
    );
  }
}
