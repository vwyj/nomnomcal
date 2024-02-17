const API_KEY = "985add3c8acf4917b5e9db49c3736bdb";
//const API_KEY = "88cff814492a4f13be7c1995dcfaac9d";

// Search Recipes By Query In Search Bar
export async function fetchSearches(query) {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`);

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
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`);
  
    if (!response.ok) {
      console.error(
        `Error fetching recipe details for ID ${recipeId}. Status: ${response.status}`
      );
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    return data;
  } 
  catch (error) 
  {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
}


// Get Featured Recipes with targetCalories
export async function fetchFeatured(noOfRecipes, targetCalories) {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=${noOfRecipes}&targetCalories=${targetCalories}`);
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const data = await response.json();
    return data.recipes;
  } 
  catch (error) 
  {
    console.error("Error fetching random recipes:", error);
    throw error;
  }
};


// Get Featured Recipes without allergies
export async function fetchFeaturedAllergies(noOfRecipes, restrictions) {
  try 
    {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=${noOfRecipes}&exclude-tags=${restrictions}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    
      const data = await response.json();
      return data.recipes;
    } 
    catch (error) 
    {
      console.error("Error fetching random recipes:", error);
      throw error;
    }
  };


// Get Cuisine Type
export async function fetchCuisine(cuisineType) {
  try 
  {
    const response = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&cuisine=${cuisineType}`);

    if (!response.ok) 
    {
      throw new Error(`Network response was not ok for ${cuisineType}`);
    }

    const data = await response.json();
    return data.results;
  } 
  catch (error) 
  {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

// // Modify your fetchAllergies function to accept allergies as a parameter
// export async function fetchAllergies(query, allergies) {
//   // Construct the URL with the query
//   let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`;

//   // Gather all intolerances into an array
//   const intolerances = allergies.join(",");

//   // If there are any intolerances, append them to the URL
//   if (intolerances.length > 0) {
//       url += `&intolerances=${intolerances}`;
//   }

//   try 
//   {
//       const response = await fetch(url);

//       if (!response.ok) {
//           throw new Error("Network response was not ok");
//       }

//       const data = await response.json();

//       // Additional client-side filtering
//       const filteredData = data.results.filter((recipe) => {
//         // Check if the recipe title includes any of the user's allergies
//         const containsAllergy = allergies.some((allergy) =>
//           recipe.title.toLowerCase().includes(allergy.toLowerCase())
//         );

//         // Filter out recipes that contain any allergy
//         return !containsAllergy;
//       });

//       return filteredData;
//   } 
//   catch (error) 
//   {
//     console.error("Error fetching recipes:", error);
//     throw error;
//   }
// }
