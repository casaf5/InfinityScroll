<template>
	<div class="pagination flex-center ">
		<div v-for="page in getLength">
			<span @click="setPage(page)">{{ page }}</span>
		</div>
		<span class="all">All</span>
	</div>
</template>

<script>
export default {
	computed: {
		getLength() {
			let length = this.$store.getters.getLength;
			return length / 10;
		},
	},
	methods: {
		setPage(page) {
			this.$store.commit('setPage', page);
		},
	},
};
</script>

<style lang="scss" scoped></style>
