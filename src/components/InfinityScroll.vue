<template>
	<div class="infinity-scroll-wrapper flex col">
		<div class="search-container flex space-between align-center" v-if="$slots.default">
			<h5 class="items-count">
				<i class="fas fa-poll" /> Total Results: {{ $slots.default.length }}
			</h5>
			<div class="goto-location-wrapper">
				<input
					class="item-number-input"
					type="text"
					v-model="itemNumber"
					placeholder="Go to Item.."
					@keyup.enter="jumpTo"
				/>
				<BaseButton @click.native="jumpTo">Go!</BaseButton>
			</div>
		</div>
		<div class="items-container" :id="triggerId" ref="scrollElement">
			<slot></slot>
		</div>
		<transition name="fade" appear>
			<div
				class="loading-screen flex-center"
				v-show="loadingStatus"
				:style="{ backgroundColor: background }"
			>
				<img class="loader" :src="setLoader" />
				<h6>{{ loadingText }}</h6>
			</div>
		</transition>
		<div class="pagination flex-center space-around">
			<i class="fad fa-arrow-left" @click="movePage(-1)" />
			<span :class="`page-number page${page}`" @click="goToPage(page)" v-for="page in pages">{{
				page
			}}</span>
			<i class="fad fa-arrow-right" @click="movePage(1)" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		loader: {
			type: String,
			default: 'bars',
		},
		loadingText: {
			type: String,
			default: 'Loading...',
		},
		background: {
			type: String,
			default: 'rgba(0,0,0,0.5)',
		},
		triggerId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			loadingStatus: false,
			itemNumber: '',
			itemsCount: null,
			currPage: 0,
		};
	},
	updated() {
		this.itemsCount = this.$slots.default.length;
		setTimeout(() => (this.loadingStatus = false), 1000);
	},
	computed: {
		setLoader() {
			var loaders = require.context('../assets/svg-loaders', false, /\.svg$/);
			return loaders('./' + this.loader + '.svg');
		},
		pages() {
			return Math.floor(this.itemsCount / 6);
		},
	},
	methods: {
		scrollTrigger({ target }) {
			const { scrollTop, scrollHeight, clientHeight, id } = target;
			if (id !== this.triggerId) return;
			let isOnBottom = scrollTop + clientHeight >= scrollHeight;
			if (isOnBottom) {
				this.loadingStatus = true;
				this.$emit('onBottom');
			}
		},
		jumpTo() {
			if (isNaN(this.itemNumber) || this.itemNumber < 0 || this.itemNumber > this.itemsCount)
				return;
			this.setScrollLocation(this.itemNumber);
			let jumpToItem = this.$slots.default[this.itemNumber].elm;
			jumpToItem.classList.add('highlight');
			setTimeout(() => {
				jumpToItem.classList.remove('highlight');
			}, 3000);
		},
		goToPage(page) {
			this.setScrollLocation(page * 6);
			this.setSelectedPage(page);
			this.currPage = page;
		},
		setSelectedPage(pageNumber) {
			let selected = document.querySelector('.page-number.selected');
			if (selected) selected.classList.remove('selected');
			document.querySelector(`.page${pageNumber}`).classList.add('selected');
		},
		movePage(diff) {
			if (this.currPage + diff < 0 || this.currPage + diff > this.itemsCount / 6) return;
			this.currPage += diff;
			this.setScrollLocation(this.currPage * 6);
			this.setSelectedPage(this.currPage);
		},
		setScrollLocation(item) {
			let scrollPageLocation = this.$slots.default[item];
			this.$refs.scrollElement.scrollTop = scrollPageLocation.elm.offsetTop;
		},
	},
	mounted() {
		document.addEventListener('scroll', this.scrollTrigger, true);
		this.itemsCount = this.$slots.default.length;
	},
	destroyed() {
		document.removeEventListener('scroll', this.scrollTrigger, true);
	},
};
</script>

<style lang="scss" scoped>
.infinity-scroll-wrapper {
	overflow: auto;
	max-height: 85vh;
	position: relative;
}
.items-container {
	scroll-behavior: smooth;
	overflow: auto;
	height: 80%;
}
.search-container {
	position: sticky;
	top: 0;
	height: 10%;
	margin: 5px;
}
.items-count {
	font-size: 0.9rem;
}
.item-number-input {
	height: 100%;
	width: 100px;
	border: none;
	border-bottom: 1px solid #03045e;
	padding: 5px;
}
.loading-screen {
	position: sticky;
	height: 50px;
	width: 100%;
	bottom: 0;
	background-color: #03045e;
	z-index: 1;
	color: white;
	text-align: center;
	transition: all 0.5s ease;
	opacity: 1;
	.loader {
		height: 25px;
	}
	h6 {
		font-size: 15px;
		margin-left: 10px;
	}
}
.pagination {
	height: 10%;
	padding: 10px;
}
.pagination i {
	cursor: pointer;
	transition: 0.4s ease;
}
.pagination i:hover {
	color: #03045e;
}
.page-number {
	color: lightgray;
	transition: 0.4s ease;
}
.page-number:hover {
	color: #03055e;
	cursor: pointer;
}
.page-number.selected {
	color: #03055e;
}
.highlight {
	background-color: #03055e;
}

//----Transition Classes----/
.fade-enter {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: 0.4s ease;
}
.fade-leave-to {
	opacity: 0;
}
</style>
