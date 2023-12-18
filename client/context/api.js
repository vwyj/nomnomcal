const API_KEY = "985add3c8acf4917b5e9db49c3736bdb";

// Search Recipes By Query For Search Bar
export async function fetchSearches(query) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

// Get Recipe Details Using Recipe ID
export async function fetchDetails(recipeId) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`
    );
  
    if (!response.ok) {
      console.error(
        `Error fetching recipe details for ID ${recipeId}. Status: ${response.status}`
      );
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
}


  export async function fetchFeatured(noOfRecipes) {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=${noOfRecipes}`
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      console.error("Error fetching random recipes:", error);
      throw error;
    }
  }

// Get Recommended Recipe Without User Allergies/Intolerances
export async function fetchRecommendations(targetCalories, allergies) {
  let url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${API_KEY}&timeFrame=day&targetCalories=${targetCalories}`;
  
  // Gather all intolerances into an array and append them to the URL if they exist
  const intolerances = [
    "Egg",
    "Dairy",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat",
  ]
    .filter((intolerance) => allergies.includes(intolerance))
    .join(",");
  
  if (intolerances.length > 0) 
  {
    url += `&exclude=${intolerances}`;
  }
  
  try 
  {
    const response = await fetch(url);
    
    if (!response.ok)
    {
      throw new Error("Network response was not ok");
    }
  
      const data = await response.json();
      return data;
  } 
  catch (error) 
  {
    console.error("Error fetching meal recommendations:", error);
    throw error;
  }
}