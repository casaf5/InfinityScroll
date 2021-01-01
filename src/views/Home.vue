<template>
	<div class="home pos-main-container">
		<Loading v-if="loading" />
		<PassengersList :passengers="passengers" />
	</div>
</template>

<script>
import PassengersList from '@/components/PassengersList.vue';
import Loading from '@/components/Loading.vue';
import { mapState } from 'vuex';
export default {
	name: 'Home',
	components: {
		PassengersList,
		Loading,
	},
	data() {
		return {
			currPage: 1,
			countPerPage: 10,
		};
	},
	computed: {
		passengers() {
			return this.$store.getters.passengers;
		},
		...mapState(['loading']),
	},
	methods: {
		loadPassengers() {
			this.$store.dispatch('loadPassengers', {
				page: this.currPage,
				count: this.countPerPage,
			});
		},
		scrollTrigger() {
			window.onscroll = (e) => {
				let bottomOfWindow =
					window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight;
				if (bottomOfWindow) {
					this.currPage++;
					this.loadPassengers();
				}
			};
		},
	},
	created() {
		this.loadPassengers();
	},
	mounted() {
		this.scrollTrigger();
	},
};
</script>
