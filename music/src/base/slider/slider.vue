<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
         <slot></slot>
      </div>
      <div class="dots">

      </div>
    </div>
</template>

<script>
//引用幻灯片插件
import Bscroll from "better-scroll"
import {addClass} from "@/common/js/dom"
export default {
    data(){
        return{

        }
    },
    props: {
     //循环轮播
     loop: {
       type: Boolean,
       default: true
     },
     //自动轮播
     autoPlay: {
       type: Boolean,
       default: true
     },
     //时间 多少毫秒滚动一次
     interval: {
        type: Number,
        default: 4000
     }
    },
    mounted(){
        //页面加载延迟
        setTimeout(() => {
           this._setSliderWidth();
           this._initSlider();
        },20)
    },
    methods:{
        //获取宽度
        _setSliderWidth() {
           this.children = this.$refs.sliderGroup.children;  //获取sliderGroup的children 也就是说sliderGroup有多少个元素

           let width = 0;
           let sliderWidth  = this.$refs.slider.clientWidth;
           for(let i = 0; i < this.children.length;i++){
              let child = this.children[i];
              addClass(child, 'slider-item');  //调用addClass方法 然每个元素添加slider-item样式
              child.style.width = sliderWidth + 'px'; //每个元素的宽度等于总的宽度
              width += sliderWidth 
           }

           if(this.loop){
              width += 2*sliderWidth ;  //滚动的时候，两边的宽度加倍
           }
           this.$refs.sliderGroup.style.width = width + 'px'

        },
        //初始化
        _initSlider() {
           this.slider = new Bscroll(this.$refs.slider, {
               scrollX: true,
               scrollY: false,
               momentum: false,
               snap: true,
               snapLoop: this.loop,
               snapThreshold: 0.3,
               snapSpeed: 400,
               click: true
           })
        }
    }
    
}
</script>


<style  scoped lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>