<template>
  <div class="singer">
     <listview :data="singers" @select="selectSinger"></listview>
     <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from "@/api/singer.js"
import { ERR_OK } from "@/api/config.js"
import Singer from "@/common/js/singer"
import Listview from "@/base/listview/listview"
import { mapMutations } from "vuex"

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
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSingerList(){
       getSingerList().then((res) => {
         if(res.code === ERR_OK){
           this.singers = this._normalizeSinger(res.data.list)
          //  console.log("123",this._normalizeSinger(this.singers))
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
      //  console.log("22",map);
      //为了得到有序列表，我们需要处理 map
      let hot = [];
      let ret = [];
      for(let key in map){
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)){
           ret.push(val);
        }else if(val.title === HOT_NAME){
           hot.push(val);
        }
      }
      ret.sort((a, b)=>{
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Listview
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

