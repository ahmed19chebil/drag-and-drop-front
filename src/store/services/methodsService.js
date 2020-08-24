import axios from "axios";
import config from "../../config/config";

export const methodsServices = {
	get,
	post,
	deleteDetail,
	put,
};

async function get(apiEndpoint, store) {
	return await axios
		.get(config.baseUrl + apiEndpoint)
		.then((response) => {
			return Promise.resolve(response);
		})
		.catch((err) => {
			return Promise.reject(err.response);
		});
}

async function post(apiEndpoint, payload, headers) {
	return await axios
		.post(config.baseUrl + apiEndpoint, payload, {
			headers: headers,
		})
		.then((response) => {
			return Promise.resolve(response);
		})
		.catch((err) => {
			return Promise.reject(err.response);
		});
}

async function put(apiEndpoint, payload, headers) {
	return await axios
		.put(config.baseUrl + apiEndpoint, payload, {
			headers: headers,
		})
		.then((response) => {
			return Promise.resolve(response);
		})
		.catch((err) => {
			return Promise.reject(err.response);
		});
}

async function deleteDetail(apiEndpoint) {
	return axios
		.delete(config.baseUrl + apiEndpoint)
		.then((response) => {
			return Promise.resolve(response);
		})
		.catch((err) => {
			return Promise.reject(err.response);
		});
}
