import React from 'react';
import {BottomNavigation as BottomNavigationRNP, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		surface: '#FFFFFF',
		onSurface: '#000000',
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
