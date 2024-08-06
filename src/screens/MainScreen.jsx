import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {BottomNavigation} from "../components/BottomNavigation";

export const MainScreen = ({routes, renderScene}) => {
	const [index, setIndex] = React.useState(0);
	
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{flex: 1}}>
				<BottomNavigation
					index={index}
					setIndex={setIndex}
					routes={routes}
					renderScene={renderScene}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};
