import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../apiClient";

export const getMenu = createAsyncThunk(
	'menus/getMenu',
	async (menuId) => {
		const response = await apiClient.get(`/food/menuItems/${menuId}`);
		
		return response.data;
	}
);
