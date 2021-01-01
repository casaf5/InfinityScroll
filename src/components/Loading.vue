<template>
	<div class="loading-screen flex-center col">
		<img :src="getLoaderStyle" />
		<h6>Loading...</h6>
	</div>
</template>

<script>
export default {
	computed: {
		getLoaderStyle() {
			let loader = this.$store.getters.getStyleOption('loadingSvg');
			var loaders = require.context('../assets/svg-loaders', false, /\.svg$/);
			return loaders('./' + loader + '.svg');
		},
	},
};
</script>

<style lang="scss" scoped></style>
