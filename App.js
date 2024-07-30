import React from 'react';
import {DefaultTheme as NavigationDefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen} from './src/screens/MainScreen';
import {RecipesScreen} from './src/screens/RecipesScreen';
import {MenusScreen} from './src/screens/MenusScreen';
import {BottomNavigation, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {RecipeDetailScreen} from './src/screens/RecipeDetailScreen';
import {MenuDetailScreen} from "./src/screens/MenuDetailScreen";

const Stack = createStackNavigator();

const routes = [
	{key: 'recipes', title: 'Recipes', focusedIcon: 'text-box', unfocusedIcon: 'text-box-outline'},
	{key: 'menus', title: 'Menus', focusedIcon: 'room-service', unfocusedIcon: 'room-service-outline'},
];

const renderScene = BottomNavigation.SceneMap({
	recipes: RecipesScreen,
	menus: MenusScreen,
});

const CombinedDefaultTheme = {
	...NavigationDefaultTheme,
	...PaperDefaultTheme,
	colors: {
		...NavigationDefaultTheme.colors,
		...PaperDefaultTheme.colors,
		background: '#f6f6f6',
		surface: '#ffffff',
		text: '#000000',
		primary: '#6200ee',
	},
};

const App = () => {
	return (
		<Provider store={store}>
			<PaperProvider theme={CombinedDefaultTheme}>
				<NavigationContainer theme={CombinedDefaultTheme}>
					<Stack.Navigator screenOptions={{headerShown: false}}>
						<Stack.Screen name="Main">
							{() => <MainScreen routes={routes} renderScene={renderScene} />}
						</Stack.Screen>
						<Stack.Screen name="Recipe Detail" component={RecipeDetailScreen} options={{headerShown: true}} />
						<Stack.Screen name="Menu Detail" component={MenuDetailScreen} options={{headerShown: true}} />
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</Provider>
	);
};

export default App;
