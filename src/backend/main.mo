import Map "mo:core/Map";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type Cuisine = {
    #italian;
    #indian;
    #mexican;
    #french;
    #chinese;
    #japanese;
    #mediterranean;
    #american;
    #thai;
    #spanish;
  };

  type Category = {
    #appetizer;
    #mainCourse;
    #dessert;
    #sideDish;
    #beverage;
    #salad;
    #soup;
  };

  type RecipeID = Nat;

  type Recipe = {
    id : RecipeID;
    titleEn : Text;
    titleHi : Text;
    descriptionEn : Text;
    descriptionHi : Text;
    ingredientsEn : [Text];
    ingredientsHi : [Text];
    stepsEn : [Text];
    stepsHi : [Text];
    cuisine : Cuisine;
    category : Category;
    prepTimeMinutes : Nat;
    cookTimeMinutes : Nat;
    servings : Nat;
    photoAssetPath : Text;
    createdAt : Time.Time;
  };

  var nextRecipeId : RecipeID = 1;
  let recipeStore = Map.empty<RecipeID, Recipe>();

  // Seed initial recipes
  func seedRecipes() {
    let recipes = [
      {
        id = nextRecipeId;
        titleEn = "Spaghetti Carbonara";
        titleHi = "स्पगेटी कार्बनारा";
        descriptionEn = "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.";
        descriptionHi = "अंडे, चीज़, पंकेटा और मिर्च के साथ क्लासिक इटालियन पास्ता डिश।";
        ingredientsEn = ["Spaghetti", "Eggs", "Parmesan cheese", "Pancetta", "Black pepper"];
        ingredientsHi = ["स्पगेटी", "अंडे", "पार्मेज़ान चीज़", "पंकेटा", "काली मिर्च"];
        stepsEn = ["Boil pasta", "Cook pancetta", "Mix eggs and cheese", "Combine everything"];
        stepsHi = ["पास्ता उबालें", "पंकेटा पकाएं", "अंडे और चीज़ मिलाएं", "सभी मिलाएं"];
        cuisine = #italian;
        category = #mainCourse;
        prepTimeMinutes = 15;
        cookTimeMinutes = 20;
        servings = 4;
        photoAssetPath = "/static/images/recipes/carbonara.jpg";
        createdAt = 0;
      }
    ];

    // Add more recipes as needed

    for (recipe in recipes.values()) {
      recipeStore.add(nextRecipeId, recipe);
      nextRecipeId += 1;
    };
  };

  // Call seedRecipes on first actor initialization
  system func preupgrade() {};
  system func postupgrade() {
    seedRecipes();
  };

  public shared ({ caller }) func addRecipe(
    titleEn : Text,
    titleHi : Text,
    descriptionEn : Text,
    descriptionHi : Text,
    ingredientsEn : [Text],
    ingredientsHi : [Text],
    stepsEn : [Text],
    stepsHi : [Text],
    cuisine : Cuisine,
    category : Category,
    prepTimeMinutes : Nat,
    cookTimeMinutes : Nat,
    servings : Nat,
    photoAssetPath : Text,
  ) : async Recipe {
    let recipe : Recipe = {
      id = nextRecipeId;
      titleEn;
      titleHi;
      descriptionEn;
      descriptionHi;
      ingredientsEn;
      ingredientsHi;
      stepsEn;
      stepsHi;
      cuisine;
      category;
      prepTimeMinutes;
      cookTimeMinutes;
      servings;
      photoAssetPath;
      createdAt = Time.now();
    };

    recipeStore.add(nextRecipeId, recipe);
    nextRecipeId += 1;
    recipe;
  };

  public query ({ caller }) func getRecipe(id : RecipeID) : async Recipe {
    switch (recipeStore.get(id)) {
      case (null) { Runtime.trap("Recipe not found") };
      case (?recipe) { recipe };
    };
  };

  public query ({ caller }) func getAllRecipes() : async [Recipe] {
    recipeStore.values().toArray();
  };

  public query ({ caller }) func getRecipesByCuisine(cuisine : Cuisine) : async [Recipe] {
    recipeStore.values().toArray().filter(
      func(recipe) { recipe.cuisine == cuisine }
    );
  };

  public query ({ caller }) func getRecipesByCategory(category : Category) : async [Recipe] {
    recipeStore.values().toArray().filter(
      func(recipe) { recipe.category == category }
    );
  };
};
