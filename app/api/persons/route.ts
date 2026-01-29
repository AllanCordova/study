import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM persons");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, level, image_path } = body;

  await pool.query(
    "INSERT INTO persons (name, level, image_path) VALUES ($1, $2, $3)",
    [name, level, image_path],
  );

  return NextResponse.json({ message: "Criado com sucesso" }, { status: 201 });
}
