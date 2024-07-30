import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../apiClient";

// Async thunk to fetch recipe information by ID
export const getRecipe = createAsyncThunk(
	'recipes/getRecipe',
	async (recipeId) => {
		// Fetch the recipe information based on the recipe ID
		const response = await apiClient.get(`/recipes/${recipeId}/information`);
		
		// Extract recipe information from the response data
		return response.data;
	}
);
