<template>
  <view>
    <view class="play">
      <!--播放区-->
      <video class="video" :src="playUrl" :title="playTitle"></video>
    </view>
    <u-tabs :list="tabList" :current="tabIndex" @change="onChangeTab"></u-tabs>
    <h4 class="title">点击下方选择剧集</h4>
    <view class="voide">
      <!--视频区-->
      <u-tag
        v-for="(item, index) in currentTab.voideList"
        :key="item.url"
        class="item"
        :text="item.name | formatName"
        type="success"
        :mode="active(index)"
        @click="onClickPlay(index)"
      />
    </view>
    <h4 class="title">资源来自</h4>
    <view class="foot">
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
      index: 0,
      tabList: [],
      tabIndex: 0,
    };
  },
  filters: {
    formatName(value) {
      const find$ = value.indexOf("$");
      if (find !== -1) {
        return value.substring(0, find$);
      }
      return value;
    },
  },
  computed: {
    currentTab(){
      if(this.tabList.length){
        return this.tabList[this.tabIndex];
      }
      return {};
    },
    mp4VideoList() {
      const i = this.index;
      const voides = this.$store.state.Source.resultList[i].voides;
      const list = voides.filter((item) => item.url.search(/\.mp4$/gim) !== -1);
      if (list.length) {
        return list;
      }
      return [];
    },
    m3u8VideoList() {
      const i = this.index;
      const voides = this.$store.state.Source.resultList[i].voides;
      const list = voides.filter(item => item.url.search(/\.m3u8$/igm)!==-1);
      if(list.length){
        return list;
      }
      return [];
    },
    flvVideoList() {
      const i = this.index;
      const voides = this.$store.state.Source.resultList[i].voides;
      const list = voides.filter(item => item.url.search(/\.flv$/igm)!==-1);
      if(list.length){
        return list;
      }
      return [];
    },
    otherVideoList() {
      const i = this.index;
      const voides = this.$store.state.Source.resultList[i].voides;
      const list = voides.filter(item => item.url.search(/(.mp4|.flv|.m3u8)$/igm)===-1);
      if(list.length){
        return list;
      }
      return [];
    },
    srcList() {
      return this.voidelist.map((item) => item.url);
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
    inittabList(){
      const voideLists = [this.mp4VideoList, this.m3u8VideoList, this.flvVideoList, this.otherVideoList];
      let voideLine = 1;
      voideLists.forEach(voideList=>{
        if(voideList.length){
          this.tabList.push({
            name:'线路'+voideLine++,
            voideList:voideList,
          });
        }
      });
    },
    onClickPlay(index) {
      if(this.currentTab.voideList){
        this.playTitle = this.currentTab.voideList[index].name;
        this.playUrl = this.currentTab.voideList[index].url;
        this.playIndex = index;
      }
    },
    onChangeTab(index) {
      this.tabIndex = index;
      this.onClickPlay(this.playIndex);
    },
  },
  beforeMount() {
    this.index = this.$query.index;
    this.inittabList();
    this.onChangeTab(0);
  }
};
</script>

<style lang="scss">
.play {
  width: 100%;
  background-color: #ddd;
  .video {
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
  margin: 5px 10px;
  margin-bottom: 30px;
}
</style>
