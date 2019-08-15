<template>
  <div class="singer">
    歌手页面
  </div>
</template>

<script>
import { getSingerList } from "@/api/singer.js"
import { ERR_OK } from "@/api/config.js"
import Singer from "@/common/js/singer"

const HOT_NAME = '热门' 
const HOT_SINGER_LEN = 10

export default {
  name: "singer",
  props: {
    msg: String
  },
  data(){
    return{
      singers: []
    }
  },
  created(){
    this._getSingerList();
  },
  methods:{
    _getSingerList(){
       getSingerList().then((res) => {
         if(res.code === ERR_OK){
           this.singers = res.data.list
           console.log("111",this._normalizeSinger(this.singers))
         }
       })
    },
    _normalizeSinger(list){  //list=this.singer
       let map = {
         hot:{  
           title: HOT_NAME,
           items: []
         }
       }
       return hot.concat(ret)
       list.forEach((item, index)=>{
         if( index < HOT_SINGER_LEN ){
          map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
          }))
         }
         const key = item.Findex
         if(!map[key]){
           map[key] = {
             title: key,
             items: []
           }
         }
         map[key].items.push(new Singer({
             id: item.Fsinger_mid,
             name: item.Fsinger_name
         }))
       })
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   .singer
     position: fixed
     top: 88px
     bottom: 0
     width: 100%
</style>

