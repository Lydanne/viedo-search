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
		methods:{
			
		},
		created(){
			this._a
		}
	}
</script>
