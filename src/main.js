import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import './styles/styles.scss';
import { upperFirst, camelCase } from 'loadsh';

Vue.config.productionTip = false;

//GLOBAL BASE COMPONENT REGISTRATION
const requireComponent = require.context('./components/Base', false, /Base[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
	const componentConfig = requireComponent(fileName);
	const componentName = upperFirst(
		camelCase(
			fileName
				.split('/')
				.pop()
				.replace(/\.\w+$/, '')
		)
	);
	Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.directive('scroll', {
	inserted: function(el, binding) {
		let f = function(evt) {
			if (binding.value(evt, el)) {
				window.removeEventListener('scroll', f);
			}
		};
		window.addEventListener('scroll', f);
	},
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
