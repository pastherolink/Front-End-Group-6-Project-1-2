import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST } from '../../utils/api';
import { createSlug } from '../../utils/helpers';
import '../../styles/components/CreateRecipe.css';

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    cookingTime: '', // Changed from separate prep/cook times to single cookingTime
    servings: '',
    ingredients: [''],
    instructions: ['']
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleListChange = (e, index, field) => {
    const newList = [...formData[field]];
    newList[index] = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: newList
    }));
  };
  
  const addListItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  
  const removeListItem = (index, field) => {
    if (formData[field].length <= 1) return;
    
    const newList = [...formData[field]];
    newList.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      [field]: newList
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Clean up the data - remove empty items
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter(item => item.trim()),
        instructions: formData.instructions.filter(item => item.trim())
      };
      
      const response = await POST('/recipes', cleanedData);
      
      if (response && response.recipeId) {
        // Create a SEO-friendly URL with slug
        const slug = createSlug(cleanedData.name);
        // Navigate to the single recipe page (not recipes plural)
        navigate(`/recipe/${response.recipeId}-${slug}`);
      } else {
        // If we don't get a recipe ID back, just go to recipes list
        navigate('/recipes');
      }
    } catch (err) {
      console.error('Failed to create recipe:', err);
      setError(err.message || 'Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/recipes');
  };
  
  return (
    <div className="create-recipe-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h1>Create New Recipe</h1>
        
        {error && (
          <div className="error-message">{error}</div>
        )}
        
        <div className="form-group">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cookingTime">Cooking Time</label>
            <input
              type="text"
              id="cookingTime"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              placeholder="e.g., 30 minutes"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="servings">Servings</label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={`ingredient-${index}`} className="list-item">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleListChange(e, index, 'ingredients')}
                placeholder="e.g., 2 cups flour"
              />
              <button 
                type="button" 
                onClick={() => removeListItem(index, 'ingredients')}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addListItem('ingredients')}
            className="add-btn"
          >
            Add Ingredient
          </button>
        </div>
        
        <div className="form-group">
          <label>Instructions</label>
          {formData.instructions.map((instruction, index) => (
            <div key={`instruction-${index}`} className="list-item">
              <textarea
                value={instruction}
                onChange={(e) => handleListChange(e, index, 'instructions')}
                placeholder={`Step ${index + 1}`}
              />
              <button 
                type="button" 
                onClick={() => removeListItem(index, 'instructions')}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addListItem('instructions')}
            className="add-btn"
          >
            Add Step
          </button>
        </div>
        
        <div className="button-group">
          <button 
            type="submit" 
            className="save-btn"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Recipe'}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipePage;
