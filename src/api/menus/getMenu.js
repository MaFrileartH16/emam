import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../apiClient";

// Async thunk to fetch recipe information by ID
export const getMenu = createAsyncThunk(
	'menus/getMenu',
	async (menuId) => {
		// Fetch the recipe information based on the recipe ID
		const response = await apiClient.get(`/food/menuItems/${menuId}`);
		
		// Extract recipe information from the response data
		return response.data;
	}
);
