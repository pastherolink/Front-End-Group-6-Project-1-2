import React from 'react';

const CreateRecipe = () => {
  return (
    <section id="create-recipe">
      <h2>Create Recipe</h2>
      <form id="recipe-form">
        <label htmlFor="recipe-name">Recipe Name:</label>
        <input type="text" id="recipe-name" name="recipe-name" required />

        <label htmlFor="recipe-ingredients">Ingredients:</label>
        <textarea id="recipe-ingredients" name="recipe-ingredients" required></textarea>

        <label htmlFor="recipe-steps">Steps:</label>
        <textarea id="recipe-steps" name="recipe-steps" required></textarea>

        <button type="submit">Create Recipe</button>
      </form>
    </section>
  );
};

export default CreateRecipe;