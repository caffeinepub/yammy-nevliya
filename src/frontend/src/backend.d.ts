import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type RecipeID = bigint;
export interface Recipe {
    id: RecipeID;
    photoAssetPath: string;
    descriptionEn: string;
    descriptionHi: string;
    createdAt: Time;
    cookTimeMinutes: bigint;
    stepsEn: Array<string>;
    stepsHi: Array<string>;
    cuisine: Cuisine;
    category: Category;
    prepTimeMinutes: bigint;
    servings: bigint;
    titleEn: string;
    titleHi: string;
    ingredientsEn: Array<string>;
    ingredientsHi: Array<string>;
}
export type Time = bigint;
export enum Category {
    sideDish = "sideDish",
    mainCourse = "mainCourse",
    dessert = "dessert",
    soup = "soup",
    salad = "salad",
    appetizer = "appetizer",
    beverage = "beverage"
}
export enum Cuisine {
    mediterranean = "mediterranean",
    thai = "thai",
    japanese = "japanese",
    chinese = "chinese",
    mexican = "mexican",
    italian = "italian",
    indian = "indian",
    spanish = "spanish",
    american = "american",
    french = "french"
}
export interface backendInterface {
    addRecipe(titleEn: string, titleHi: string, descriptionEn: string, descriptionHi: string, ingredientsEn: Array<string>, ingredientsHi: Array<string>, stepsEn: Array<string>, stepsHi: Array<string>, cuisine: Cuisine, category: Category, prepTimeMinutes: bigint, cookTimeMinutes: bigint, servings: bigint, photoAssetPath: string): Promise<Recipe>;
    getAllRecipes(): Promise<Array<Recipe>>;
    getRecipe(id: RecipeID): Promise<Recipe>;
    getRecipesByCategory(category: Category): Promise<Array<Recipe>>;
    getRecipesByCuisine(cuisine: Cuisine): Promise<Array<Recipe>>;
}
