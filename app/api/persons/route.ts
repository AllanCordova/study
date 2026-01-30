import { NextResponse } from "next/server";
import pool from "@/lib/db";

/**
 * @swagger
 * /api/persons:
 *   get:
 *     summary: Retrieve all persons/characters
 *     description: Returns a list of all persons stored in the database with their id, name, level, and image_path
 *     tags:
 *       - Persons
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the person
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Name of the person/character
 *                     example: "Batman"
 *                   level:
 *                     type: integer
 *                     description: Current level of the person
 *                     example: 0
 *                   image_path:
 *                     type: string
 *                     description: Path to the person's image
 *                     example: "/assets/persons/batman.webp"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar dados"
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
