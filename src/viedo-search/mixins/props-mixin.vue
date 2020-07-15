<!--
 * @Author: your name
 * @Date: 2020-07-06 21:57:48
 * @LastEditTime: 2020-07-14 19:57:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \VideoSearch\src\viedo-search\mixins\props-mixin.vue
--> 
<script>
	export default{
		props:{
			props:{
				type:Object,
				default:()=>({})
			}
		},
		computed:{
			_p(){
				const t = {};
				for (const key in this.$props){
					t[key] = (this.$props[key]) ? this.$props[key] : this.$props.props[key];
				}
				return t;
			}
		},
	}
</script>
