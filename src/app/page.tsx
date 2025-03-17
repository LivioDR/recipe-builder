"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RecipeDisplay } from "./recipe-display"
import type { Recipe } from "./types"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      setRecipe(data.recipe)
    } catch (error) {
      console.error("Error generating recipe:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>AI Recipe Generator</CardTitle>
            <CardDescription>Enter a description of a dish or ingredients to generate a recipe</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Recipe Prompt</Label>
                <Input
                  id="prompt"
                  placeholder="e.g., A vegetarian pasta dish with mushrooms"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Recipe"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {recipe && <RecipeDisplay recipe={recipe} />}
      </div>
    </main>
  )
}