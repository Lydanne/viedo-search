<template>
  <view class="container">
    <view class="box">
      <view class="logo">
        <text class="text-blod">Viedo</text>
        <text class="text-red">Search</text>
      </view>
      <u-search
        placeholder="搜索你想要看的电影"
        height="80"
        :animation="true"
        v-model="formData.search"
        :show-action="false"
        @search="onSearch"
      ></u-search>
      <!-- 			<view class="tip">
				<u-tag class="item" size="mini" text="异世界居酒屋阿信" shape="circleRight" type="info" mode="plain"  closeable  />
			</view> -->
      <view class="github" @click="onCopy">
        <!--WumaCoder-->
        <u-icon name="github-circle-fill" size="128"></u-icon>
        <span>WumaCoder</span>
        <span>v0.1.1</span>
      </view>
    </view>
    <!-- <view class="top200">
      <movie-list :list="movieList"></movie-list>
      <u-loadmore margin-bottom="20" :status="status" />
    </view> -->
    <foot-end></foot-end>
  </view>
</template>

<script>
import { decodeParams } from "@/common/tools";
export default {
  data() {
    return {
      formData: {
        search: "",
      },
      movieList: [],
      status: "loadmore",
    };
  },
  methods: {
    async getMovieList() {
      const data = await this.$douban.getHotList();

      this.movieList = data.subjects.map((item) => ({
        title: item.title,
        src: item.images.small,
        sub: item.genres.join("-"),
      }));
    },
    onSearch() {
      uni.navigateTo({
        url: "/pages/result/result?" + decodeParams(this.formData),
      });
    },
    onCopy() {
      uni.setClipboardData({
        data: "https://github.com/WumaCoder/viedo-search",
        success: function () {
          uni.showToast({title:'复制仓库'});
        },
      });
    },
  },
  async created() {
    this.getMovieList();
  },
};
</script>

<style lang="scss">
.container {
  .box {
    height: 80vh;
    background-color: #30a9de;
    padding: 0 10%;
    padding-top: 10%;
    .logo {
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
      margin-bottom: 20px;

      .text {
        line-height: 100px;
        &-red {
          @extend .text;
          color: #fff;
          background-color: $hight-color;
          border-radius: 10px;
          padding: 0 10px;
          margin-left: 10px;
        }
        &-blod {
          @extend .text;
          font-weight: 900;
        }
      }
    }
    .tip {
      margin-top: 10px;
      height: 110px;
      overflow: hidden;
      .item {
        margin: 2px 5px;
      }
    }
    .github {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 100px;
    }
  }
  .top200 {
    padding-top: 20px;
  }
}
</style>
