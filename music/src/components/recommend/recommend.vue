<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList">
      <div>
          <div v-if="recommends.length" class="slider-wrapper">
            <Slider>
              <div v-for="(item, index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" @load="loadImage"/>
                </a>
              </div>
            </Slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌曲推荐</h1>
            <ul>
              <li v-for="(item,index) in discList" :key="index" class="item">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.imgurl"/>
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
      </div>
      <div class="loading-contain" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>

  </div>
</template>

<script>
import Scroll from "@/base/scroll/scroll"
import Loading from "@/base/loading/loading"
import Slider from "@/base/slider/slider"
import {getRecommend, getDiscList} from "@/api/recommend.js"
import {ERR_OK} from "@/api/config.js"
import { proplot } from '@/api/api.js'

export default {
  name: "recommend",
  data(){
    return{
       recommends:[],
       discList: []
    }
  },
  props: {
    msg: String
  },
  created(){
    this._getRecommend();
    this._getDiscList();
   
  },
  methods:{
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.slider);
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList(){
      getDiscList().then((res) => {
        if(res.code === ERR_OK){
          console.log("jjj",res.data.list)
          this.discList = res.data.list
        }
      })
    },
    //当图片加载出来时候调用refresh方法重新计算

    loadImage () {
        if (!this.checkloaded) {
          this.checkloaded = true
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      },
    
  },
  components:{
    Slider,
    Scroll,
    Loading
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "~@/common/stylus/variable"

   .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>


