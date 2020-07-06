<template>
	<view class="item">
		<view class="content">
			<view class="text" v-text="_a.title"></view>
			<view class="text text-sub" v-text="_a.sub"></view>
		</view>
		<image class="image" :src="_a.src" mode="widthFix"></image>
	</view>
</template>

<script>
	import propsMixin from '@/mixins/props-mixin.vue'
	export default {
		mixins:[propsMixin],
		props:{
			title:{
				type:String
			},
			sub:{
				type:String
			},
			src:{
				type:String
			},
			href:{
				type:String
			}
		},
		data() {
			return {
				
			};
		},
	}
</script>

<style lang="scss" scoped>
.item{
	display: flex;
	flex-direction: column;
	width: 90%;
	min-height: 200px;
	background-color: #000;
	border: 1px solid #000;
	margin-bottom: 20px;
	overflow: hidden;
	.image{
		position: relative;
		display: block;
		width: 100%;
		height: 90%;
	}
	.content{
		margin-bottom: -100px;
		top: 70%;
		position: relative;
		z-index: 100;
		color: #fff;
		background-color: rgba($color: #000000, $alpha: 0.5);
		height: 100px;
		padding: 5px;
		.text{
			white-space: nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
			&-sub{
				font-size: 0.5rem;
			}
		}
	}
}
</style>
