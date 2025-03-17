export interface Ingredient {
    name: string
    amount: string
}
  
export interface Recipe {
    name: string
    ingredients: Ingredient[]
    steps: string[]
    prepTime?: string
    cookTime?: string
}
  
  