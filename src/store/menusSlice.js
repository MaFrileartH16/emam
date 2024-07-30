import {createSlice} from "@reduxjs/toolkit";
import {getMenus} from "../api/menus/getMenus";
import {getMenu} from "../api/menus/getMenu";

const menusSlice = createSlice({
	name: 'menus',
	initialState: {
		menus: [],
		menu: null, // For storing a single menu's information
		status: 'idle',
		page: 1,
		hasMore: false,
		error: null, // To store error messages
	},
	reducers: {
		resetMenus: (state) => {
			state.menus = [];
			state.page = 1;
			state.hasMore = false;
		},
		resetMenu: (state) => {
			state.menu = null;
		}
	},
	extraReducers: (builder) => {
		builder
			// Handling states for getMenus
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
			// Handling states for getMenu
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

export const {resetMenus, resetMenu} = menusSlice.actions;
export default menusSlice.reducer;
