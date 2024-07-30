import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../apiClient";

export const getRecipes = createAsyncThunk('recipes/getRecipes', async ({query = '', page}, {getState}) => {
	const response = await apiClient.get('/recipes/complexSearch', {
		params: {
			query,
			number: 16,
			offset: (page - 1) * 16,
		},
	});
	
	const {results} = response.data;
	const hasMore = results.length === 16; // Assuming 16 items per page
	return {results, hasMore, page};
});
