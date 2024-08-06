import React, {useEffect} from 'react';
import {Image, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Button, Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipe} from '../api/recipes/getRecipe';

export const RecipeDetailScreen = ({route}) => {
	const {recipeId} = route.params;
	const dispatch = useDispatch();
	const recipe = useSelector((state) => state.recipes.recipe);
	const status = useSelector((state) => state.recipes.status);
	
	useEffect(() => {
		dispatch(getRecipe(recipeId));
	}, [dispatch, recipeId]);
	
	if (status === 'loading') {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" animating={true} />
			</View>
		);
	}
	
	if (status === 'failed') {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>Error loading recipe.</Text>
			</View>
		);
	}
	
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{recipe && (
					<Card elevation={2} style={styles.card}>
						<Card.Cover source={{uri: recipe.image}} style={styles.cardCover} />
						<Card.Title title={recipe.title} subtitle={`Servings: ${recipe.servings}`} />
						<Card.Content>
							<Text style={styles.summary} numberOfLines={5}>{recipe.summary.replace(/<[^>]*>/g, '')}</Text>
							<View>
								<Text><Text style={styles.label}>Cooking Time:</Text> {recipe.cookingMinutes} minutes</Text>
								<Text><Text style={styles.label}>Preparation Time:</Text> {recipe.preparationMinutes} minutes</Text>
								<Text><Text style={styles.label}>Ready in:</Text> {recipe.readyInMinutes} minutes</Text>
								<Text><Text style={styles.label}>Health Score:</Text> {recipe.healthScore}</Text>
								<Text><Text style={styles.label}>Spoonacular Score:</Text> {recipe.spoonacularScore}</Text>
							</View>
							
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Ingredients</Text>
								{recipe.extendedIngredients.map((ingredient) => (
									<Text key={ingredient.id} style={styles.ingredient}>
										{ingredient.amount} {ingredient.unit} {ingredient.name}
									</Text>
								))}
							</View>
							
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Wine Pairing</Text>
								{recipe.winePairing && recipe.winePairing.pairedWines.length > 0 ? (
									recipe.winePairing.pairedWines.map((wine, index) => (
										<Text key={index} style={styles.pairingText}>{wine}</Text>
									))
								) : (
									<Text>No specific wine pairings found.</Text>
								)}
								
								{recipe.winePairing && recipe.winePairing.productMatches.length > 0 && (
									<View style={styles.pairingProduct}>
										<Text style={styles.pairingText}>Recommended Wine:</Text>
										{recipe.winePairing.productMatches.map((product) => (
											<View key={product.id} style={styles.pairingProductContainer}>
												<Image source={{uri: product.imageUrl}} style={styles.pairingImage} />
												<View style={styles.pairingDetails}>
													<Text style={styles.pairingTitle}>{product.title}</Text>
													<Text>{product.description}</Text>
													<Text>Price: {product.price}</Text>
													<Button mode="contained" onPress={() => Linking.openURL(product.link)}>Buy Now</Button>
												</View>
											</View>
										))}
									</View>
								)}
							</View>
							
							{recipe.sourceUrl && (
								<Button mode="contained" onPress={() => Linking.openURL(recipe.sourceUrl)} style={styles.sourceButton}>
									Recipe Source
								</Button>
							)}
						</Card.Content>
					</Card>
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
		paddingBottom: 80,
	},
	card: {
		marginBottom: 16,
	},
	cardCover: {
		borderRadius: 16,
		height: 200,
	},
	summary: {
		marginVertical: 8,
		fontSize: 16,
		color: '#333',
	},
	label: {
		fontWeight: 'bold',
	},
	section: {
		marginVertical: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	ingredient: {
		fontSize: 16,
		color: '#333',
		marginBottom: 4,
	},
	pairingText: {
		fontSize: 16,
		color: '#333',
		marginBottom: 4,
	},
	pairingProduct: {
		marginVertical: 8,
	},
	pairingProductContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	pairingImage: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},
	pairingDetails: {
		marginLeft: 8,
	},
	pairingTitle: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	sourceButton: {
		marginTop: 16,
	},
	errorText: {
		color: 'red',
	},
});
