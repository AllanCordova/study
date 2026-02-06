import { NextResponse } from "next/server";
import pool from "@/lib/db";

/**
 * @swagger
 * /api/persons:
 *   get:
 *     summary: List all persons
 *     description: Returns the list of persons stored in the database.
 *     responses:
 *       200:
 *         description: List of persons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Batman
 *                   level:
 *                     type: integer
 *                     example: 10
 *                   image_path:
 *                     type: string
 *                     example: /assets/persons/batman.webp
 *       500:
 *         description: Server error
 */
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
