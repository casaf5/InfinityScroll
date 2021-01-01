<template>
	<div id="app" class="site-main-layout" :style="getStyle">
		<AppHeader />
		<router-view />
		<AppFooter />
	</div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
	components: {
		AppHeader,
		AppFooter,
	},
	computed: {
		getStyle() {
			let siteBg = this.$store.getters.getStyleOption('siteBg');
			return `backgroundColor:${siteBg}`;
		},
	},
};
</script>
