<template>
	<div class="home pos-main-container">
		<div class="home-wrapper flex col">
			<InfinityScroll
				triggerId="listContainer"
				loader="bars"
				loadingText="Loading..."
				background="#03045e"
				@onBottom="loadData"
			>
				<UserCard v-for="(user, idx) in fakeData" :user="user" :key="user.id" />
			</InfinityScroll>
		</div>
	</div>
</template>

<script>
import UserCard from '@/components/UserCard.vue';
import InfinityScroll from '@/components/InfinityScroll.vue';

export default {
	name: 'Home',
	components: {
		InfinityScroll,
		UserCard,
	},
	data() {
		return {
			fakeData: [],
		};
	},
	methods: {
		loadData() {
			setTimeout(this.generateData, 500);
		},
		generateData() {
			let currLength = this.fakeData.length;
			for (let i = currLength; i < currLength + 10; i++) {
				this.fakeData.push({ id: i });
			}
		},
	},
	created() {
		this.generateData();
	},
};
</script>
