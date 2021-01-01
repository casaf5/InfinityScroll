import Vue from 'vue';
import Vuex from 'vuex';
import { airplaneService } from '@/services/airplaneService.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		passengers: [],
		loading: false,
		currPage: 0,
		filterBy: '',
		styleOptions: {
			headerBg: '#ff5c5c',
			siteBg: 'white',
			loadingSvg: 'bars',
			loadingTextColor: 'white',
		},
	},
	getters: {
		passengers(state) {
			// let from = state.currPage * 10;
			// let slicedPass = state.passengers.slice(from, from + 10);
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
		getLength(state) {
			return state.passengers.length;
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
		setPage(state, page) {
			state.currPage = page;
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
