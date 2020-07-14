<!--
 * @Author: your name
 * @Date: 2020-07-14 19:57:07
 * @LastEditTime: 2020-07-14 20:01:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VideoSearch\src\viedo-search\mixins\handle-mixin.vue
-->
<script>
export default {
  computed: {
    $query(){
      // #ifdef APP-PLUS
      return this.$options.pageQuery;
      // #endif
      // #ifdef H5
      return this.options;
      // #endif
    }
  }
};
</script>
