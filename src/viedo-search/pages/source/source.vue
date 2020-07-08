<template>
  <view class="container">
    <view class="bar">
      <text class="btn-text space-l" @click="onClickUpdate">
        <u-icon name="attach" class="space-r"></u-icon>
        更新站源
      </text>
      <!-- <text class="btn-text space-l">自定义</text> -->
      <!-- <text class="text-date">更新时间:{{updateTime}}</text> -->
    </view>
    <u-cell-group>
      <u-swipe-action
        v-for="(item, index) in list"
        :key="item.meta.name"
        :options="options"
        ><u-cell-item
          :title="item.meta.name.toUpperCase()"
          :label="item.meta.home"
          :value="item.meta.version"
          :arrow="false"
      /></u-swipe-action>
    </u-cell-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      options: [
        // {
        //   text: "编辑",
        //   style: {
        //     backgroundColor: this.$scss.primaryColor,
        //   },
        // },
        // {
        //   text: "删除",
        //   style: {
        //     backgroundColor: this.$scss.hightColor,
        //   },
        // },
      ],
      list: this.$store.state.Source.list,
      updateTime: this.$store.state.Source.updateTime,
    };
  },
  methods: {
    async onClickUpdate() {
      await this.$store.dispatch("Source/inspect");
      if (this.$store.state.Source.isUpdate) {
        const [err, res] = await uni.showModal({
          title: "提示",
          content: "发现有更新，点击确认进行更新站源",
        });
        if (res.confirm) {
          await this.$store.dispatch("Source/update");
          uni.showToast({
            title: "更新完成",
            duration: 2000,
          });
        }
      }
    },
  },
  async created() {},
};
</script>

<style lang="scss">
.container {
  .bar {
    border-bottom: 1px solid #ddd;
    height: 40px;
    line-height: 40px;
  }
}
.btn {
  padding: 7px;
  background-color: $primary-color;
  color: #fff;
  &-text {
    @extend .btn;
    background-color: #fff;
    color: $primary-color;
    text-decoration: underline;
    transition: 0.36s all;
    &:active {
      color: $hight-color;
    }
  }
}
.space {
  margin: 5px;
  &-x {
    margin: 0 5px;
  }
  &-y {
    margin: 5px 0;
  }
  &-l {
    margin-left: 5px;
  }
  &-r {
    margin-right: 5px;
  }
}
.text {
  &-date {
    position: absolute;
    right: 10px;
    color: grey;
  }
}
</style>
