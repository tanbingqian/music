<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>

<script>
//引用幻灯片插件
import Bscroll from "better-scroll"
export default {
   props: {
       propeType: {
           type: Number,
           default: 1
       },
       click: {
           type: Boolean,
           default: true
       },
       data: {
           type: Array,
           default: null
       },
       refreshDelay: {
          type: Number,
          default: 20
       },
   },
   mounted() {
     setTimeout(()=>{
       this._initScroll()
     },20);
   },
   methods: {
     _initScroll(){
       if(!this.$refs.wrapper){
            return
       }
       this.scroll = new Bscroll(this.$refs.wrapper,{
           propeType:this.propeType,
           click:this.click
       })
     },
     enable(){
         this.scroll && this.scroll.enable();
     },
     disble(){
         this.scroll && this.scroll.disble();
     },
     refresh(){
         this.scroll && this.scroll.refresh();
     }
   },
   watch: {
    data(){
        setTimeout(()=>{
            this.refresh();
        },this.refreshDelay);
    }
   }
}
</script>


<style  scoped lang="stylus" rel="stylesheet/stylus">
@import "~@/common/stylus/variable"

</style>