import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/components/EditRecipe.css';
import { GET, PUT, DELETE } from '../../utils/api';

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await GET(`/recipes/${id}`);
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const updatedRecipe = {
      name: formData.get('recipe-name'),
      cookingTime: formData.get('cooking-time'),
      difficulty: formData.get('difficulty'),
      servings: parseInt(formData.get('servings')),
      ingredients: formData.get('ingredients').split('\n').filter(i => i.trim()),
      instructions: formData.get('instructions').split('\n').filter(i => i.trim())
    };

    try {
      await PUT(`/recipes/${id}`, updatedRecipe);
      navigate(`/recipe/${id}`);
    } catch (error) {
      setError('Failed to update recipe');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await DELETE(`/recipes/${id}`);
        navigate('/recipes');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="edit-recipe-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h2>Edit Recipe</h2>
        
        <div className="form-group">
          <label htmlFor="recipe-name">Recipe Name:</label>
          <input 
            type="text" 
            id="recipe-name" 
            name="recipe-name" 
            defaultValue={recipe.name}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="cooking-time">Cooking Time:</label>
          <input 
            type="text" 
            id="cooking-time" 
            name="cooking-time" 
            defaultValue={recipe.cookingTime}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select 
            id="difficulty" 
            name="difficulty"
            defaultValue={recipe.difficulty}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="servings">Servings:</label>
          <input 
            type="number" 
            id="servings" 
            name="servings" 
            min="1"
            defaultValue={recipe.servings}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (one per line):</label>
          <textarea 
            id="ingredients" 
            name="ingredients"
            defaultValue={recipe.ingredients.join('\n')}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions (one per line):</label>
          <textarea 
            id="instructions" 
            name="instructions"
            defaultValue={recipe.instructions.join('\n')}
            required
          ></textarea>
        </div>

        <div className="button-group">
          <button type="submit" className="save-btn">Save Changes</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate(`/recipe/${id}`)}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRecipe;