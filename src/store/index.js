import {configureStore} from "@reduxjs/toolkit";
import recipesReducer from "./recipesSlice";
import menusReducer from "./menusSlice";

export const store = configureStore({
	reducer: {
		recipes: recipesReducer,
		menus: menusReducer
	},
});
