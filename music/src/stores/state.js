import { playMode } from '@/common/js/config'

const state = {
    singer: {},
    playing: false,  //播放
    fullScreen: false, //展开和收取
    playlist: [],
    sequenceList: [], //顺序列表
    mode: playMode.sequence,
    currentIndex: -1
}

export default state