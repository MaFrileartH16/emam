import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getMenu} from "../api/menus/getMenu"; // Import the thunk

export const MenuDetailScreen = ({route}) => {
	const {menuId} = route.params;
	const dispatch = useDispatch();
	const menu = useSelector((state) => state.menus.menu);
	const status = useSelector((state) => state.menus.status);
	
	useEffect(() => {
		// Fetch the menu information when the component mounts
		dispatch(getMenu(menuId));
	}, [dispatch, menuId]);
	
	// Show a loading indicator while fetching
	if (status === 'loading') {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" animating={true} />
			</View>
		);
	}
	
	// Show an error message if there was a problem fetching the data
	if (status === 'failed') {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>Error loading menu.</Text>
			</View>
		);
	}
	
	// Show the menu information once it's loaded
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{menu && (
					<View>
						<Card elevation={2} style={styles.card}>
							<Card.Cover source={{uri: menu.image}} style={styles.cardCover} />
							<Card.Title title={menu.title} subtitle={`Servings: ${menu.servings.number} ${menu.servings.unit}`} />
							<Card.Content>
								<Text style={styles.restaurantChain}>Restaurant: {menu.restaurantChain}</Text>
								
								<View style={styles.nutritionSection}>
									<Text style={styles.sectionTitle}>Nutrition</Text>
									{menu.nutrition.nutrients.map((nutrient) => (
										<Text key={nutrient.name} style={styles.nutrient}>
											<Text
												style={styles.label}>{nutrient.name}:</Text> {nutrient.amount} {nutrient.unit} ({nutrient.percentOfDailyNeeds}%
											                                                                                 Daily Needs)
										</Text>
									))}
									<Text style={styles.caloricBreakdownTitle}>Caloric Breakdown</Text>
									<Text>Protein: {menu.nutrition.caloricBreakdown.percentProtein}%</Text>
									<Text>Fat: {menu.nutrition.caloricBreakdown.percentFat}%</Text>
									<Text>Carbs: {menu.nutrition.caloricBreakdown.percentCarbs}%</Text>
								</View>
								
								{menu.breadcrumbs.length > 0 && (
									<View style={styles.section}>
										<Text style={styles.sectionTitle}>Categories</Text>
										{menu.breadcrumbs.map((breadcrumb, index) => (
											<Text key={index} style={styles.breadcrumb}>
												{breadcrumb}
											</Text>
										))}
									</View>
								)}
							</Card.Content>
						</Card>
					</View>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	scrollContent: {
		padding: 16,
		paddingBottom: 80, // Extra space at the bottom for the source button
	},
	card: {
		marginBottom: 16,
	},
	cardCover: {
		borderRadius: 16,
		height: 200,
	},
	restaurantChain: {
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 8,
	},
	nutritionSection: {
		marginVertical: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	nutrient: {
		fontSize: 16,
		color: '#333',
		marginBottom: 4,
	},
	caloricBreakdownTitle: {
		marginTop: 8,
		fontWeight: 'bold',
	},
	section: {
		marginVertical: 16,
	},
	breadcrumb: {
		fontSize: 16,
		color: '#333',
		marginBottom: 4,
	},
	errorText: {
		color: 'red',
	},
});
