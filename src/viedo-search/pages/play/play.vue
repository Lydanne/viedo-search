<template>
  <view>
    <view class="play">
      <!--播放区-->
      <video class="video" :src="playUrl" :title="playTitle"></video>
    </view>
    <h4 class="title">点击下方选择剧集(请优先选择mp4、flv、m3u8格式)</h4>
    <view class="voide">
      <!--视频区-->
      <u-tag
        v-for="(item, index) in voidelist"
        :key="index"
        class="item"
        :text="item.name"
        type="success"
        :mode="active(index)"
        @click="onClickPlay(index)"
      />
    </view>
    <view class="foot">
      <!--来源-->
      资源来自 <br />
      {{ resultItem.home }}
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      playIndex: 0,
      playUrl: "",
      playTitle: "",
      index:0,
    };
  },
  computed: {
    voidelist() {
      const i = this.index;
      const voides = this.$store.state.Source.resultList[i].voides
      // const list = voides.filter(item => item.url.search(/(.mp4|.flv|.m3u8)$/igm)!==-1);
      // if(list.length){
      //   return list;
      // }
      return voides;
    },
    srcList() {
      return this.voidelist.map(item => item.url);
    },
    resultItem() {
      const i = this.index;
      return this.$store.state.Source.resultList[i];
    },
  },
  methods: {
    active(index) {
      return index === this.playIndex ? "dark" : "plain";
    },
    onClickPlay(index) {
      this.playTitle = this.voidelist[index].name;
      this.playUrl = this.voidelist[index].url;
      this.playIndex = index;
    },
  },
  async created() {
    // console.log(this.$store.state);
    // #ifdef APP-PLUS
    this.index = this.$options.pageQuery.index;
    // #endif
    // #ifdef H5
    this.index = this.options.index;
    // #endif
    this.onClickPlay(0);
  },
};
</script>

<style lang="scss">
.play {
  width: 100%;
  height: 230px;
  background-color: #ddd;
  .video{
    position:fixed;
    top: 44px;
    width: 100%;
  }
}
.title {
  border-left: 3px solid $primary-color;
  padding-left: 10px;
  margin: 10px;
}

.voide {
  padding: 5px;
  .item {
    margin: 5px;
  }
}

.foot {
  margin: 20px 10px;
  margin-bottom: 30px;
  font-size: 0.9rem;
}
</style>
