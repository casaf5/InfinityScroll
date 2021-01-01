<template>
	<div class="passenger-card flex space-between">
		<div class="person-details flex col space-between">
			<h6><span>Person Id:</span> {{ person._id }}</h6>
			<h6><span>Name:</span> {{ person.name }}</h6>
			<h6><span>Trips:</span>{{ person.trips }}</h6>
		</div>
		<img :src="`https://robohash.org/${person.name}?set=set5`" alt="person-image" class="person-image" />
	</div>
</template>

<script>
export default {
	props: {
		person: {
			type: Object,
		},
	},
};
</script>
