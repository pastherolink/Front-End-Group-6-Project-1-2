import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/components/EditRecipe.css';
import { GET, PUT, DELETE } from '../../utils/api';
import { createSlug } from '../../utils/helpers';

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [instructionsList, setInstructionsList] = useState([]);

  // Extract the numeric ID from URL parameter
  const extractId = () => {
    if (!id) {
      console.error("Edit Recipe: ID parameter is missing or undefined");
      return null;
    }
    
    console.log("Edit Recipe: Raw ID from URL:", id);
    
    // Handle ID formats like "123-recipe-name" or just "123"
    const match = id.match(/^(\d+)/);
    if (match && match[1]) {
      console.log("Edit Recipe: Extracted numeric ID:", match[1]);
      return match[1]; // Return just the numeric part
    }
    
    console.log("Edit Recipe: Using full ID as numeric ID:", id);
    return id;
  };
  
  const numericId = extractId();

  // Helper function for parsing JSON or array data
  const parseArrayData = (data, fieldName) => {
    if (!data) return [];
    
    if (Array.isArray(data)) {
      return data;
    }
    
    // Try to parse as JSON string
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        console.warn(`Parsed ${fieldName} is not an array:`, parsed);
        return [String(parsed)];
      }
    } catch (e) {
      console.warn(`Failed to parse ${fieldName} JSON:`, e);
      // If it's a string but not JSON, treat as a single item
      if (typeof data === 'string') {
        return [data];
      }
      return [];
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log(`Edit Recipe: Fetching recipe with ID: ${numericId}`);
        
        const data = await GET(`/recipes/${numericId}`);
        console.log("Edit Recipe: Received data:", data);
        
        if (!data) {
          throw new Error('No data returned from API');
        }
        
        // Process ingredients and instructions using helper function
        const ingredients = parseArrayData(data.ingredients, 'ingredients');
        const instructions = parseArrayData(data.instructions, 'instructions');
        
        // Set these to the state variables for dynamic inputs
        setIngredientsList(ingredients);
        setInstructionsList(instructions);
        
        // Create a new object with all data properties
        const processedData = {
          ...data,
          name: data.name || '',
          cookingTime: data.cookingTime || '',
          difficulty: data.difficulty || 'Medium',
          servings: data.servings || 1,
          ingredients: ingredients,
          instructions: instructions
        };
        
        setRecipe(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Edit Recipe: Failed to fetch recipe:', error);
        console.error('Edit Recipe: Error details:', error.stack || JSON.stringify(error, null, 2));
        setError(`Failed to load recipe: ${error.message}`);
        setLoading(false);
      }
    };

    if (numericId) {
      fetchRecipe();
    } else {
      setError('Invalid recipe ID');
      setLoading(false);
    }
  }, [numericId]);

  // Handle moving items up in the list
  const moveItemUp = (index, listType) => {
    if (index === 0) return; // Can't move up if already at top
    
    if (listType === 'ingredients') {
      const updatedList = [...ingredientsList];
      [updatedList[index - 1], updatedList[index]] = [updatedList[index], updatedList[index - 1]];
      setIngredientsList(updatedList);
    } else {
      const updatedList = [...instructionsList];
      [updatedList[index - 1], updatedList[index]] = [updatedList[index], updatedList[index - 1]];
      setInstructionsList(updatedList);
    }
  };

  // Handle moving items down in the list
  const moveItemDown = (index, listType) => {
    const list = listType === 'ingredients' ? ingredientsList : instructionsList;
    if (index === list.length - 1) return; // Can't move down if already at bottom
    
    if (listType === 'ingredients') {
      const updatedList = [...ingredientsList];
      [updatedList[index], updatedList[index + 1]] = [updatedList[index + 1], updatedList[index]];
      setIngredientsList(updatedList);
    } else {
      const updatedList = [...instructionsList];
      [updatedList[index], updatedList[index + 1]] = [updatedList[index + 1], updatedList[index]];
      setInstructionsList(updatedList);
    }
  };

  // Handle updating an item
  const updateItem = (index, value, listType) => {
    if (listType === 'ingredients') {
      const updatedList = [...ingredientsList];
      updatedList[index] = value;
      setIngredientsList(updatedList);
    } else {
      const updatedList = [...instructionsList];
      updatedList[index] = value;
      setInstructionsList(updatedList);
    }
  };

  // Handle adding a new item
  const addItem = (listType) => {
    if (listType === 'ingredients') {
      setIngredientsList([...ingredientsList, '']);
    } else {
      setInstructionsList([...instructionsList, '']);
    }
  };

  // Handle removing an item
  const removeItem = (index, listType) => {
    if (listType === 'ingredients') {
      const updatedList = ingredientsList.filter((_, i) => i !== index);
      setIngredientsList(updatedList);
    } else {
      const updatedList = instructionsList.filter((_, i) => i !== index);
      setInstructionsList(updatedList);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a deep copy to avoid modifying state directly
      const recipeToSubmit = {...recipe};
      
      // Process form values from the form elements
      const formElements = e.target.elements;
      
      recipeToSubmit.name = formElements['recipe-name'].value.trim();
      recipeToSubmit.cookingTime = formElements['cooking-time'].value.trim();
      recipeToSubmit.difficulty = formElements.difficulty.value;
      recipeToSubmit.servings = parseInt(formElements.servings.value, 10) || 1;
      
      // Use our state arrays for ingredients and instructions
      // Filter out any empty items
      const filteredIngredients = ingredientsList.filter(item => item.trim() !== '');
      const filteredInstructions = instructionsList.filter(item => item.trim() !== '');
      
      // Ensure ingredients and instructions are properly formatted for API
      recipeToSubmit.ingredients = JSON.stringify(filteredIngredients);
      recipeToSubmit.instructions = JSON.stringify(filteredInstructions);
      
      console.log("Sending recipe update:", recipeToSubmit);
      
      await PUT(`/recipes/${numericId}`, recipeToSubmit);
      
      // When successful, navigate back with a SEO-friendly URL
      const slug = createSlug(recipeToSubmit.name);
      navigate(`/recipe/${numericId}-${slug}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError(`Failed to update recipe: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await DELETE(`/recipes/${numericId}`);
        navigate('/recipes');
      } catch (err) {
        console.error('Error deleting recipe:', err);
        setError(err.message || 'Failed to delete recipe');
      }
    }
  };

  if (loading) return <div className="loading">Loading recipe data...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!recipe) return <div className="not-found">Recipe not found</div>;

  return (
    <div className="edit-recipe-container">
      {error && <div className="error-message">{error}</div>}
      
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
          <label>Ingredients:</label>
          <div className="dynamic-inputs-container">
            {ingredientsList.map((ingredient, index) => (
              <div key={`ingredient-${index}`} className="dynamic-input-row">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateItem(index, e.target.value, 'ingredients')}
                  placeholder="Enter ingredient"
                  required
                />
                <div className="input-controls">
                  <button 
                    type="button" 
                    onClick={() => moveItemUp(index, 'ingredients')}
                    disabled={index === 0}
                    className="move-btn"
                  >
                    ↑
                  </button>
                  <button 
                    type="button" 
                    onClick={() => moveItemDown(index, 'ingredients')}
                    disabled={index === ingredientsList.length - 1}
                    className="move-btn"
                  >
                    ↓
                  </button>
                  <button 
                    type="button" 
                    onClick={() => removeItem(index, 'ingredients')}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addItem('ingredients')}
              className="add-item-btn"
            >
              + Add Ingredient
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Instructions:</label>
          <div className="dynamic-inputs-container">
            {instructionsList.map((instruction, index) => (
              <div key={`instruction-${index}`} className="dynamic-input-row">
                <textarea
                  value={instruction}
                  onChange={(e) => updateItem(index, e.target.value, 'instructions')}
                  placeholder="Enter instruction step"
                  required
                />
                <div className="input-controls">
                  <button 
                    type="button" 
                    onClick={() => moveItemUp(index, 'instructions')}
                    disabled={index === 0}
                    className="move-btn"
                  >
                    ↑
                  </button>
                  <button 
                    type="button" 
                    onClick={() => moveItemDown(index, 'instructions')}
                    disabled={index === instructionsList.length - 1}
                    className="move-btn"
                  >
                    ↓
                  </button>
                  <button 
                    type="button" 
                    onClick={() => removeItem(index, 'instructions')}
                    className="remove-btn"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addItem('instructions')}
              className="add-item-btn"
            >
              + Add Instruction Step
            </button>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="save-btn">Save Changes</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => {
              // When canceling, navigate back with a SEO-friendly URL
              const slug = createSlug(recipe.name);
              navigate(`/recipe/${numericId}-${slug}`);
            }}
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