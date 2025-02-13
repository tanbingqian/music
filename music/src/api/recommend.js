import jsonp from "@/common/js/jsonp"
import {commonParams, options} from "@/api/config"

import axios from 'axios'   

const debug = process.env.NODE_ENV !== 'production';

export function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}

export function getDiscList() {
    // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' 
    const url = debug ? '/api/getDiscList' : 'http://ustbhuangyi.com/music/api/getDiscList'
    const data = Object.assign({}, commonParams, {
        picmid: 1,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })
    return axios.get(url, {
        params: data
      }).then((res) => {
        return Promise.resolve(res.data)
      })
}

