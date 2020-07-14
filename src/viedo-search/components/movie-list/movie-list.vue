<template>
	<view class="container">
		<movie-item v-for="item in _p.list" :key="item.id" :props="item"></movie-item>
	</view>
</template>

<script>
	import propsMixin from '@/mixins/props-mixin.vue'

	export default {
		mixins:[propsMixin],
		props:{
			list:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.container{
	display: grid;
	grid-template-columns: 50% 50%;
	justify-items: center;
	padding: 0 10px;
	
}
</style>
