/**
 * Utility functions for processing recipe data
 */

/**
 * Parses JSON string fields in recipe objects
 * @param {Object} recipe - Recipe object from API
 * @returns {Object} Recipe with parsed JSON fields
 */
export const parseRecipeData = (recipe) => {
  if (!recipe) return null;
  
  const parsedRecipe = { ...recipe };
  
  // Parse ingredients if it's a string
  if (typeof parsedRecipe.ingredients === 'string') {
    try {
      parsedRecipe.ingredients = JSON.parse(parsedRecipe.ingredients);
    } catch (error) {
      console.warn('Failed to parse ingredients JSON', error);
      parsedRecipe.ingredients = [];
    }
  }
  
  // Parse instructions if it's a string
  if (typeof parsedRecipe.instructions === 'string') {
    try {
      parsedRecipe.instructions = JSON.parse(parsedRecipe.instructions);
    } catch (error) {
      console.warn('Failed to parse instructions JSON', error);
      parsedRecipe.instructions = [];
    }
  }
  
  return parsedRecipe;
};

/**
 * Parses a specific JSON string field
 * @param {string|Array} field - Field that may be a JSON string
 * @returns {Array} Parsed array or empty array if parsing fails
 */
export const parseJsonField = (field) => {
  if (!field) return [];
  
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch (error) {
      console.warn('Failed to parse JSON field', error);
      return [];
    }
  }
  
  return Array.isArray(field) ? field : [];
};
