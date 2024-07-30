import React from 'react';
import {BottomNavigation as BottomNavigationRNP, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

// Custom theme with white bottom navigation
const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		surface: '#FFFFFF', // Background color of the bottom navigation
		onSurface: '#000000', // Color of the icons and text
	},
};

export const BottomNavigation = ({index, setIndex, routes, renderScene}) => {
	return (
		<PaperProvider theme={theme}>
			<BottomNavigationRNP
				navigationState={{index, routes}}
				onIndexChange={setIndex}
				renderScene={renderScene}
			/>
		</PaperProvider>
	);
};
