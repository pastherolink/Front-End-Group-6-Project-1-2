import { useState, useCallback } from 'react';
import { GET, POST, PUT, DELETE } from './api';

export function useRecipes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GET('/recipes');
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return [];
    }
  }, []);

  const getRecipeById = useCallback(async (id) => {
    setLoading(true);
    try {
      // Extract just the numeric part if it includes a dash
      const numericId = id.toString().split('-')[0];
      const data = await GET(`/recipes/${numericId}`);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, []);

  const createRecipe = useCallback(async (recipeData) => {
    setLoading(true);
    try {
      const data = await POST('/recipes', recipeData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, []);

  const updateRecipe = useCallback(async (id, recipeData) => {
    setLoading(true);
    try {
      // Extract just the numeric part if it includes a dash
      const numericId = id.toString().split('-')[0];
      const data = await PUT(`/recipes/${numericId}`, recipeData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, []);

  const deleteRecipe = useCallback(async (id) => {
    setLoading(true);
    try {
      await DELETE(`/recipes/${id}`);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  }, []);

  return {
    loading,
    error,
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
  };
}