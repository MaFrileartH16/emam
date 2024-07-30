// RecipesScreen.js
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Card, IconButton, Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from '@uidotdev/usehooks';
import {resetRecipes} from '../store/recipesSlice';
import {useNavigation} from '@react-navigation/native';
import {getRecipes} from '../api/recipes/getRecipes';

const EmptyState = () => (
	<View style={styles.emptyStateContainer}>
		<IconButton icon="food-off" size={64} color="#B0B0B0" />
		<Text style={styles.emptyStateText}>No recipes found</Text>
	</View>
);

const RecipeItem = React.memo(({item, onPress}) => (
	<Card style={styles.card} elevation={2} onPress={onPress}>
		<Image source={{uri: item.image}} style={styles.cardCover} />
		<Card.Title title={item.title} titleStyle={styles.cardTitle} />
	</Card>
));

export const RecipesScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState('');
	const debouncedSearchQuery = useDebounce(searchQuery, 300);
	const {recipes, status, page, hasMore} = useSelector((state) => state.recipes);
	
	useEffect(() => {
		dispatch(resetRecipes());
		dispatch(getRecipes({query: debouncedSearchQuery, page: 1}));
	}, [debouncedSearchQuery, dispatch]);
	
	const fetchMoreRecipes = useCallback(() => {
		if (status === 'succeeded' && hasMore) {
			dispatch(getRecipes({query: debouncedSearchQuery, page: page + 1}));
		}
	}, [status, hasMore, debouncedSearchQuery, page, dispatch]);
	
	const renderRecipeItem = useCallback(
		({item}) => (
			<RecipeItem
				item={item}
				onPress={() => navigation.navigate('Recipe Detail', {recipeId: item.id})}
			/>
		),
		[navigation]
	);
	
	return (
		<View style={styles.container}>
			<Searchbar
				placeholder="Search recipes"
				onChangeText={setSearchQuery}
				value={searchQuery}
				style={styles.searchbar}
			/>
			<FlatList
				contentContainerStyle={styles.scrollView}
				data={recipes}
				renderItem={renderRecipeItem}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={status !== 'loading' && <EmptyState />}
				ListFooterComponent={status === 'loading' && <ActivityIndicator size="large" color="#6200EE" />}
				onEndReached={fetchMoreRecipes}
				onEndReachedThreshold={0.5}
				windowSize={5}
				initialNumToRender={10}
				maxToRenderPerBatch={10}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	searchbar: {
		margin: 16,
		borderRadius: 8,
		elevation: 4,
	},
	scrollView: {
		paddingHorizontal: 16,
	},
	card: {
		marginBottom: 16,
		borderRadius: 8,
		overflow: 'hidden',
	},
	cardCover: {
		height: 200,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333',
	},
	emptyStateContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyStateText: {
		marginTop: 10,
		fontSize: 18,
		color: '#B0B0B0',
	},
});
