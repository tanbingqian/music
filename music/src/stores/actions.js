import * as types from './mutation-types'

export const selectPlay = function ({commit, state},{list, index}) {
   commit(types.SET_SEQUENCE_LIST, list)
   commit(types.SET_PLAYLIST, list)  //随机播放
   commit(types.SET_CURRENT_INDEX, index)
   commit(types.SET_FULL_SCREEN, true)
   commit(types.SET_PLAYING_START,true)
}