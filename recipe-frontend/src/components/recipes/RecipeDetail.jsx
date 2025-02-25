import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/RecipeDetail.css';

const RecipeDetail = ({ recipe = sampleRecipe }) => {
  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <h2>{recipe.name}</h2>
        <Link 
          to={`/recipe/edit/${recipe.id}`} 
          className="edit-recipe-link"
        >
          Edit Recipe
        </Link>
      </div>
      <div className="recipe-info">
        <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
      </div>
      <div className="recipe-ingredients">
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-instructions">
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const sampleRecipe = {
  id: 1,
  name: 'Classic Spaghetti Carbonara',
  cookingTime: '25 mins',
  difficulty: 'Medium',
  servings: '4',
  ingredients: [
    '400g spaghetti',
    '200g pancetta or guanciale',
    '4 large eggs',
    '100g Pecorino Romano',
    'Black pepper to taste'
  ],
  instructions: [
    'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
    'While pasta cooks, cut pancetta into small cubes and fry until crispy.',
    'In a bowl, whisk eggs, grated cheese, and black pepper.',
    'Drain pasta, reserving some cooking water.',
    'Combine hot pasta with egg mixture, adding cooking water if needed.',
    'Serve immediately with extra cheese and black pepper.'
  ]
};

export default RecipeDetail;