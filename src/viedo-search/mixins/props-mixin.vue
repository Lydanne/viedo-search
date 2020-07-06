<script>
	export default{
		props:{
			props:{
				type:Object,
				default:()=>({})
			}
		},
		computed:{
			_a(){
				const t = {};
				for (const key in this.$props){
					t[key] = (this.$props[key]) ? this.$props[key] : this.$props.props[key];
				}
				return t;
			}
		},
		methods:{
			
		},
	}
</script>
