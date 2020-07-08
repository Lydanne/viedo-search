<template>
  <view>
    <view v-if="this.$store.state.Source.isLoading" class='loading'>
      <!--加载组件-->
      <u-loading size="36"></u-loading>
      <span class="text">嗅探中...</span>
    </view>
    <u-cell-group>
      <u-cell-item
        v-for="(item, index) in list"
        :key="item.url"
        :title="splitText(item.title)"
        :label="item.home"
        :arrow="false"
        :value="'发现' + item.voides.length + '视频'"
        @click="onClick(index)"
      ></u-cell-item>
    </u-cell-group>
    <u-empty v-if="!this.$store.state.Source.isLoading && list.length===0" class="empty" text="没有搜到您要看的视频,请检查标题" mode="search"></u-empty>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      search:""
    };
  },
  methods: {
    onClick(index) {
      uni.navigateTo({ url: "/pages/play/play?index=" + index });
    },
    splitText(str=""){
      if(str.length >= 18) return str.substring(0,18) + '...';
      return str;
    }
  },
  async created() {
    this.list = this.$store.state.Source.resultList;
    let search = "";
    // #ifdef APP-PLUS
    search = this.$options.pageQuery.search;
    // #endif
    // #ifdef H5
    search = this.options.search;
    // #endif
    await this.$store.dispatch("Source/search", search);
  },
};
</script>

<style lang="scss">
.loading{
  padding:10px;
  .text{
    margin-left: 5px;
  }
}
.empty{
  padding: 200px 0;
}
</style>
