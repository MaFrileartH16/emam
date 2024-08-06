import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiClient} from "../apiClient";

export const getMenus = createAsyncThunk('menus/getMenus', async ({query = '', page}) => {
	const response = await apiClient.get('/food/menuItems/search', {
		params: {
			query,
			number: 16,
			offset: (page - 1) * 16,
		},
	});
	
	const {menuItems} = response.data;
	const hasMore = menuItems.length === 16;
	return {menuItems, hasMore, page};
});
