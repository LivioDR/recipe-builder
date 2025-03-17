import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recipe, Ingredient } from "./types"


export function RecipeDisplay({ recipe }: { recipe: Recipe }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Ingredients</h3>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.ingredients.map((ingredient:Ingredient, index:number) => (
              <li key={index}>
                {ingredient.amount} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Instructions</h3>
          <ol className="list-decimal pl-5 space-y-2">
            {recipe.steps.map((step:Recipe.steps, index:number) => (
              <li key={index} className="pl-1">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {recipe.prepTime && <div className="text-sm text-muted-foreground">Prep time: {recipe.prepTime}</div>}

        {recipe.cookTime && <div className="text-sm text-muted-foreground">Cook time: {recipe.cookTime}</div>}
      </CardContent>
    </Card>
  )
}

