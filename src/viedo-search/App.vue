<script>
	import jmespath from 'jmespath'
export default {
	onLaunch:async function() {
		await this.$store.dispatch('Source/inspect');
		await this.$store.dispatch('Source/update');
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
/*每个页面公共css */
/* H5的时候，隐藏滚动条 */
/* #ifdef H5 */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
/* #endif */
</style>
