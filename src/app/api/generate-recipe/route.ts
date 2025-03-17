import { generateObject } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"
import { NextResponse } from "next/server"

// Define our schema using Zod
const recipeSchema = z.object({
  recipe: z
    .object({
      name: z.string().describe("The name of the recipe"),
      ingredients: z
        .array(
          z.object({
            name: z.string().describe("The name of the ingredient"),
            amount: z.string().describe("The amount of the ingredient needed"),
          }),
        )
        .describe("List of ingredients needed for the recipe"),
      steps: z
        .array(z.string().describe("A step in the cooking process"))
        .describe("Step by step instructions for preparing the recipe"),
      prepTime: z.string().optional().describe("The preparation time for the recipe"),
      cookTime: z.string().optional().describe("The cooking time for the recipe"),
    })
    .describe("A complete recipe with ingredients and instructions"),
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // Generate structured recipe data using AI SDK
    const { object } = await generateObject({
      model: google("gemini-2.0-flash-exp"),
      schema: recipeSchema,
      prompt: `Generate a detailed recipe for: ${prompt}. Include all ingredients with precise measurements and step-by-step instructions.`,
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error("Error generating recipe:", error)
    return NextResponse.json({ error: "Failed to generate recipe" }, { status: 500 })
  }
}