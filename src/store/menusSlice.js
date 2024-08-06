import {createSlice} from "@reduxjs/toolkit";
import {getMenus} from "../api/menus/getMenus";
import {getMenu} from "../api/menus/getMenu";

const menusSlice = createSlice({
	name: 'menus',
	initialState: {
		menus: [],
		menu: null,
		status: 'idle',
		page: 1,
		hasMore: false,
		error: null,
	},
	reducers: {
		resetMenus: (state) => {
			state.menus = [];
			state.page = 1;
			state.hasMore = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMenus.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getMenus.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.menus = [...state.menus, ...action.payload.menuItems];
				state.hasMore = action.payload.hasMore;
				state.page = action.payload.page;
			})
			.addCase(getMenus.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getMenu.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getMenu.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.menu = action.payload;
			})
			.addCase(getMenu.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const {resetMenus} = menusSlice.actions;
export default menusSlice.reducer;
