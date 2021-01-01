import Vue from 'vue';
import Vuex from 'vuex';
import { airplaneService } from '@/services/airplaneService.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		passengers: [],
		loading: false,
		filterBy: '',
		styleOptions: {
			headerBg: 'blue',
			siteBg: 'white',
			loadingSvg: 'bars',
			loadingTextColor: 'white',
		},
	},
	getters: {
		passengers(state) {
			return state.passengers.filter((p) => {
				return p.name.toLowerCase().includes(state.filterBy.toLowerCase());
			});
		},
		styleOptions(state) {
			return state.styleOptions;
		},
		getStyleOption(state) {
			return (key) => {
				console.log(state.styleOptions[key]);
				return state.styleOptions[key];
			};
		},
	},
	mutations: {
		setPassengers(state, passengers) {
			this.state.passengers.push(...passengers);
		},
		setLoading(state, loadingStatus) {
			state.loading = loadingStatus;
		},
		setFilterBy(state, filterBy) {
			state.filterBy = filterBy;
		},
		setStyleOptions(state, options) {
			state.styleOptions = options;
		},
	},
	actions: {
		async loadPassengers({ commit }, { page, count }) {
			commit('setLoading', true);
			const passengers = await airplaneService.loadPassengers(page, count);
			commit('setPassengers', passengers.data);
			commit('setLoading', false);
		},
	},
});
