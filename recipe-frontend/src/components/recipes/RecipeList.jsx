import React from 'react';
import '../../styles/components/RecipeList.css';

const RecipeList = () => {
  const sampleRecipes = [
    {
      id: 1,
      name: 'Classic Spaghetti Carbonara',
      cookingTime: '25 mins',
      difficulty: 'Medium'
    },
    {
      id: 2,
      name: 'Chicken Stir Fry',
      cookingTime: '20 mins',
      difficulty: 'Easy'
    },
    {
      id: 3,
      name: 'Vegetarian Super Bowl Sizzler',
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
            <button className="view-recipe-btn">View Recipe</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeList;