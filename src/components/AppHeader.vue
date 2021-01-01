<template>
	<header class="grid-container">
		<div class="header-container grid-pos-center flex-center">
			<BaseInput text="Search passenger" @input="setFilter" />
			<BaseButton>Search</BaseButton>
			<i class="fas fa-cogs" @click="toggleStyleModal" />
		</div>
		<StyleOptions v-if="styleIsOpen" @close="toggleStyleModal" />
	</header>
</template>

<script>
import BaseButton from './Base/BaseButton.vue';
import StyleOptions from '@/components/StyleOptions.vue';
export default {
	components: {
		BaseButton,
		StyleOptions,
	},
	data() {
		return {
			styleIsOpen: false,
		};
	},
	methods: {
		openMenu() {
			this.menuIsOpen = !this.menuIsOpen;
		},
		setFilter(filterBy) {
			this.$store.commit('setFilterBy', filterBy);
		},
		toggleStyleModal() {
			this.styleIsOpen = !this.styleIsOpen;
		},
	},
};
</script>
