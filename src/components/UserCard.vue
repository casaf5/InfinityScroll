<template>
	<div class="user-card flex-center space-between">
		<div class="left-side flex col">
			<div class="name" />
			<div class="details"></div>
		</div>
		<div class="right-side flex-center">
			{{ user.id }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
		},
	},
};
</script>
