import axios from "axios";

const API_KEYS = ['37fb1840ef5a41b385113ecab047e28c', '51f8dde9e67249d1b4a149f1415d3c0f'];

export const apiClient = axios.create({
	baseURL: 'https://api.spoonacular.com',
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use(
	config => {
		config.params = config.params || {};
		config.params.apiKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
