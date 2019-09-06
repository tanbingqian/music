<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
      <div class="dots">
        <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex === index}">4</span>
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
          dots: [],
          currentPageIndex: 0
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
           this._ititDots();
           this._initSlider();

           //自动播放
           if(this.autoPlay){
             this._paly();
           }
        },20);
        //尺寸发生改变的时候重新计算_setSliderWidth
        window.addEventListener('resize',()=>{
          if(!this.slider || !this.slider.enable){
            return
          }
          clearTimeout(this.resizeTimer)
          this.resizeTimer = setTimeout(() => {
            if (this.slider.isInTransition) {
              this._onScrollEnd()
            } else {
              if (this.autoPlay) {
                this._play()
              }
            }
            this.refresh()
          }, 60)
          // this._setSliderWidth(true);
          // this.slider.refresh(); 
        })
    },
    methods: {
        //获取宽度
        _setSliderWidth(isResize) {
           this.children = this.$refs.sliderGroup.children;  //获取sliderGroup的children 也就是说sliderGroup有多少个元素

           let width = 0;
           let sliderWidth  = this.$refs.slider.clientWidth;
           for(let i = 0; i < this.children.length;i++){
              let child = this.children[i];
              addClass(child, 'slider-item');  //调用addClass方法 然每个元素添加slider-item样式
              child.style.width = sliderWidth + 'px'; //每个元素的宽度等于总的宽度
              width += sliderWidth 
           }

           if(this.loop && ! isResize){
              width += 2*sliderWidth ;  //滚动的时候，两边的宽度加倍
           }
           this.$refs.sliderGroup.style.width = width + 'px'

        },
        

        //初始化dots
        _ititDots(){
          this.dots = new Array(this.children.length)
        },
      
        //初始化幻灯片
        _initSlider() {
           this.slider = new Bscroll(this.$refs.slider, {
               scrollX: true,
               scrollY: false,
               momentum: false,
               snap: {
                loop: this.loop,
                threshold: 0.3,
                speed: 400
              }
          });
           this.slider.on('scrollEnd', this._onScrollEnd)
           this.slider.on('scrollEnd',()=>{  //切换的时候使用scrollEnd事件
             //获取元素的第几个元素
             let pageIndex = this.slider.getCurrentPage().pageX
             this.currentPageIndex = pageIndex;

            //清除时间
            if(this.autoPlay){
              clearTimeout(this.timer);
              this._paly();
            }
           })
        },

        //自动播放方法
        _paly(){
          clearTimeout(this.timer);
          //添加定时器
          this.timer = setTimeout(()=>{
            // this.slider.goToPage(pageIndex, 0, 400)   //goToPage事件，400表示间隔
            this.slider.next()
          }, this.interval);
        },
    },
    destroyed() {
      clearTimeout(this.timer);
    },
}
</script>


<style  scoped lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable"

.slider
    min-height: 1px
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