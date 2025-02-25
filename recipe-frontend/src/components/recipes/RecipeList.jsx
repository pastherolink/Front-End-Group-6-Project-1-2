import React from 'react';

const RecipeList = () => {
  const sampleRecipes = [
    {
      id: 1,
      name: 'Classic Spaghetti Carbonara',
      ingredients: ['Pasta', 'Eggs', 'Pecorino Romano', 'Pancetta', 'Black Pepper'],
      cookingTime: '25 mins',
      difficulty: 'Medium'
    },
    {
      id: 2,
      name: 'Chicken Stir Fry',
      ingredients: ['Chicken Breast', 'Mixed Vegetables', 'Soy Sauce', 'Ginger', 'Garlic'],
      cookingTime: '20 mins',
      difficulty: 'Easy'
    },
    {
      id: 3,
      name: 'Vegetarian Buddha Bowl',
      ingredients: ['Quinoa', 'Chickpeas', 'Avocado', 'Sweet Potato', 'Kale'],
      cookingTime: '30 mins',
      difficulty: 'Easy'
    }
  ];

  return (
    <section id="recipes">
      <h2>Recipes</h2>
      <div className="recipe-list">
        {sampleRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.name}</h3>
            <div className="recipe-details">
              <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
            </div>
            <div className="recipe-ingredients">
              <h4>Ingredients:</h4>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <button className="view-recipe-btn">View Recipe</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeList;