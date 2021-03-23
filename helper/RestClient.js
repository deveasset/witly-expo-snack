import * as React from 'react';
import axios from 'axios';
import { BASE_URL } from './../constants/Globals';

export const RestClient = () => {
	return CreateRestClientInstance();
};

function CreateRestClientInstance() {
	const client = axios.create({
		baseURL: BASE_URL,
		timeout: 1000
	});

	client.interceptors.request.use(
		(config) => {
			// Do something before request is sent
			return config;
		},
		(error) => {
			// Do something with request error
			return Promise.reject(error);
		}
	);

	client.interceptors.response.use(
		(response) => {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		(error) => {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			//console.warn('Rest client response interceptor:', error);
			return Promise.reject(error);
		}
	);

	return client;
}
