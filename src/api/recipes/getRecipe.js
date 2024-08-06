import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../apiClient";

export const getRecipe = createAsyncThunk(
	'recipes/getRecipe',
	async (recipeId) => {
		const response = await apiClient.get(`/recipes/${recipeId}/information`);
		
		return response.data;
	}
);
