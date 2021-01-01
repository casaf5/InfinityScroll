<template>
	<div class="style-modal flex-center col" @click.self="close">
		<div class="options-container flex-center col ">
			<BaseSelect
				label="Loading Text Color"
				:options="colors"
				:initialValue="options.loadingTextColor"
				@select="setOption($event, 'loadingTextColor')"
			/>
			<BaseSelect
				label="Loder Style"
				:options="loaderOptions"
				:initialValue="options.loadingSvg"
				@select="setOption($event, 'loadingSvg')"
			/>
			<BaseSelect
				label="Header Background Color"
				:options="colors"
				:initialValue="options.headerBg"
				@select="setOption($event, 'headerBg')"
			/>
			<BaseSelect
				label="Site Background Color"
				:options="colors"
				:initialValue="options.siteBg"
				@select="setOption($event, 'siteBg')"
			/>
			<BaseButton @click.native="close">Save Changes</BaseButton>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StyleOptions',
	data() {
		return {
			options: null,
			colors: ['#ff5c5c', 'black', 'red', 'yellow', 'orange', 'green', 'pink', 'white'],
			loaderOptions: [
				'audio',
				'ball-tringle',
				'bars',
				'circles',
				'grid',
				'hearts',
				'oval',
				'puff',
				'rings',
				'tail-spin',
			],
		};
	},
	methods: {
		close() {
			this.$store.commit('setStyleOptions', this.options);
			this.$emit('close');
		},
		setOption(selectedOption, key) {
			this.options[key] = selectedOption;
		},
	},
	computed: {},
	created() {
		this.options = JSON.parse(JSON.stringify(this.$store.getters.styleOptions));
	},
};
</script>

<style lang="scss" scoped></style>
