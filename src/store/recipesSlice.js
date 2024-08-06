import {createSlice} from "@reduxjs/toolkit";
import {getRecipes} from "../api/recipes/getRecipes";
import {getRecipe} from "../api/recipes/getRecipe";

const recipesSlice = createSlice({
	name: 'recipes',
	initialState: {
		recipes: [],
		recipe: null,
		status: 'idle',
		page: 1,
		hasMore: false,
		error: null,
	},
	reducers: {
		resetRecipes: (state) => {
			state.recipes = [];
			state.page = 1;
			state.hasMore = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getRecipes.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getRecipes.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.recipes = [...state.recipes, ...action.payload.results];
				state.hasMore = action.payload.hasMore;
				state.page = action.payload.page;
			})
			.addCase(getRecipes.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getRecipe.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getRecipe.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.recipe = action.payload;
			})
			.addCase(getRecipe.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const {resetRecipes} = recipesSlice.actions;
export default recipesSlice.reducer;
