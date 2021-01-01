<template>
	<div class="passengers-list" ref="infinityScroll">
		<PassengerCard v-for="person in passengers" :person="person" :key="person.id" />
	</div>
</template>

<script>
import PassengerCard from '@/components/PassengerCard.vue';
export default {
	props: {
		passengers: {
			type: Array,
		},
	},
	components: {
		PassengerCard,
	},

	created() {
		console.log('passengers', this.passengers);
	},
};
</script>
