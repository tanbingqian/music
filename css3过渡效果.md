#### 1.singer播放页面css3过渡效果

```html
<transition name="normal">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img width="100%" height="100%" :src="currentSong.image" />
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l" ref="middleL">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd">
                                <img ref="image" class="image" :src="currentSong.image" />
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric"></div>
                        </div>
                    </div>
                    <scroll class="middle-r">
                        <div class="lyric-wrapper">
                            <div class="pure-music">
                                <p></p>
                            </div>
                        </div>
                    </scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l"></span>
                        <div class="progress-bar-wrapper">
                            <!-- <progress-bar ref="progressBar"></progress-bar> -->
                        </div>
                        <span class="time time-r"></span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i :class="iconMode"></i>
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center">
                            <i class="needsclick"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

```



```css
<style scoped lang="stylus" rel="stylesheet/stylus"> 
&.normal-enter-active, &.normal-leave-active {
            transition: all 0.4s;

            .top, .bottom {
                transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
            }
        }

        &.normal-enter, &.normal-leave-to {
            opacity: 0;

            .top {
                transform: translate3d(0, -100px, 0);
            }

            .bottom {
                transform: translate3d(0, 100px, 0);
            }
        }
</style>
```

#### 2.歌手详情页面的从左往右过度效果

```html
 <transition appear name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
```

```css
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
```



#### 3.CD往上往下展开与收缩

```html
<template>
    <div class="player" v-show="playlist.length>0">
        <transition 
            name="normal"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img width="100%" height="100%" :src="currentSong.image" />
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.singer"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l" ref="middleL">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd">
                                <img ref="image" class="image" :src="currentSong.image" />
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric"></div>
                        </div>
                    </div>
                    <scroll class="middle-r">
                        <div class="lyric-wrapper">
                            <div class="pure-music">
                                <p></p>
                            </div>
                        </div>
                    </scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l"></span>
                        <div class="progress-bar-wrapper">
                            <!-- <progress-bar ref="progressBar"></progress-bar> -->
                        </div>
                        <span class="time time-r"></span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i></i>
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center">
                            <i class="needsclick"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
```



```js
<script type="text/ecmascript-6">
    import { prefixStyle } from "@/common/js/dom"

    const transform = prefixStyle('transform');
    export default {
        data() {
            return {};
        },
        computed: {
            ...mapGetters(["fullScreen", "playlist", "currentSong"])
        },
        created() {},
        methods: {
            //返回
            back() {
                this.setFullScreen(false);  //关闭
            },
            ...mapMutations({
                setFullScreen: "SET_FULL_SCREEN"  //把SET_FULL_SCREEN映射到setFullScreen
            }),
            //点击底部迷打开播放器
            open() {
                this.setFullScreen(true);  //打开底部的迷你播放块
            },
            enter(el, done) {
              const {x,y,scale} = this._getPosAndScale();
              let animation = {
                 0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                 },
                 60: {
                    transform: `translate3d(0,0,0) scale(1.1)`
                 },
                 100: {
                    transform: `translate3d(0,0,0) scale(1)`
                 }
              }
              animations.registerAnimation({
                  name: 'move',
                  animation,
                  presets: {
                      duration: 400,
                      easing: 'linear'
                  }
              })
              animations.runAnimation(this.$refs.cdWrapper, 'move',done);
            },
            afterEnter() {
              animations.unregisterAnimation('move');
              this.$refs.cdWrapper.style.animation = ''
            },
            leave(el, done) {
              this.$refs.cdWrapper.style.transition = 'all 0.4s';
              const {x,y,scale} = this._getPosAndScale();
              this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
              this.$refs.cdWrapper.addEventListener('transitionend', done);
            },
            afterLeave() {
              this.$refs.cdWrapper.style.transition = '';
              this.$refs.cdWrapper.style[transform] = '';
            },
            //获取缩放的尺寸
            _getPosAndScale() {
                const targetWidth = 40  //底部小播放器的头像宽度
                const paddingLeft = 40  //中心坐标距离左边距离
                const paddingBottom = 30  //距离底部高度
                const paddingTop = 80  //上方的播放转动图标距离最顶部的距离
                const width = window.innerWidth * 0.8  //CD容器的宽度
                const scale = targetWidth/ width  //计算初始播放比例
                const x = -(window.innerWidth / 2 - paddingLeft)
                const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
                return {
                    x,
                    y,
                    scale
                }
            }
        },
        watch: {},
        components: {
            Scroll
        }
    };
</script>

```

