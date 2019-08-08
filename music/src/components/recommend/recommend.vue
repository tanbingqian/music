<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
         <Slider>
           <div v-for="(item, index) in recommends" :key="index">
             <a :href="item.linkUrl">
               <img :src="item.picUrl"/>
             </a>
           </div>
         </Slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌曲推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecommend} from "@/api/recommend.js"
import {ERR_OK} from "@/api/config.js"
import Slider from "@/base/slider/slider"

export default {
  name: "recommend",
  data(){
    return{
       recommends:[]
    }
  },
  props: {
    msg: String
  },
  created(){
    this._getRecommend();
  },
  methods:{
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.slider);
          this.recommends = res.data.slider
        }
      })
    }
  },
  components:{
    Slider
  }
};
</script>

