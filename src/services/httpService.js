import axios from 'axios';
// const axios = Axios.create({ withCredentials: true });

const BASE_URL = 'https://api.instantwebtools.net/v1/';

export const httpService = {
	get(endpoint, data) {
		return ajax(endpoint, 'GET', data);
	},
	delete(endpoint, data) {
		return ajax(endpoint, 'DELETE', data);
	},
	put(endpoint, data) {
		return ajax(endpoint, 'PUT', data);
	},
	post(endpoint, data) {
		return ajax(endpoint, 'POST', data);
	},
};

async function ajax(endpoint, method, data = null) {
	try {
		const res = await axios({
			url: `${BASE_URL}${endpoint}`,
			method,
			data,
		});
		return res.data;
	} catch (err) {
		console.log(err);
	}
}
