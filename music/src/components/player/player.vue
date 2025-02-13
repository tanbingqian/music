<template>
    <div class="player" v-show="playlist.length>0">
        <transition
            name="normal"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
        >
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
                            <div class="cd" ref="imageWrapper">
                                <img
                                    ref="image"
                                    :class="cdCls"
                                    class="image"
                                    :src="currentSong.image"
                                />
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
                            <i @click="togglePlaying" :class="playIcon"></i>
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

        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                    <div class="imgWrapper" ref="miniWrapper">
                        <img
                            ref="miniImage"
                            width="40"
                            height="40"
                            :class="cdCls"
                            :src="currentSong.image"
                        />
                    </div>
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <progress-circle>
                        <i @click.stop="togglePlaying" :class="miniIcon"></i>
                    </progress-circle>
                </div>
                <div class="control" @click.stop="showPlaylist">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <!-- <playlist ref="playlist"></playlist> -->
        <audio ref="audio" :src="currentSong.url"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import Scroll from "@/base/scroll/scroll";
import { prefixStyle } from "@/common/js/dom";

const transform = prefixStyle("transform");

export default {
    data() {
        return {};
    },
    computed: {
        //旋转CD
        cdCls() {
            return this.playing ? "play" : "";
        },
        //播放暂停图标切换
        playIcon() {
            return this.playing ? "icon-pause" : "icon-play";
        },
        //收起来的小播放器播放和暂停图标切换
        miniIcon() {
            return this.playing ? "icon-pause-mini" : "icon-play-mini";
        },
        ...mapGetters(["fullScreen", "playlist", "currentSong", "playing"])
    },
    created() {},
    methods: {
        //返回
        back() {
            this.setFullScreen(false); //关闭
        },
        ...mapMutations({
            setFullScreen: "SET_FULL_SCREEN", //把SET_FULL_SCREEN映射到setFullScreen
            setPlayingState: "SET_PLAYING_START" //SET_PLAYING_START播放映射到setPlayingState
        }),
        //点击底部迷打开播放器
        open() {
            this.setFullScreen(true); //打开底部的迷你播放块
        },
        enter(el, done) {
            const { x, y, scale } = this._getPosAndScale();
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
            };
            animations.registerAnimation({
                name: "move",
                animation,
                presets: {
                    duration: 400,
                    easing: "linear"
                }
            });
            animations.runAnimation(this.$refs.cdWrapper, "move", done);
        },
        afterEnter() {
            animations.unregisterAnimation("move");
            this.$refs.cdWrapper.style.animation = "";
        },
        leave(el, done) {
            this.$refs.cdWrapper.style.transition = "all 0.4s";
            const { x, y, scale } = this._getPosAndScale();
            this.$refs.cdWrapper.style[
                transform
            ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
            this.$refs.cdWrapper.addEventListener("transitionend", done);
        },
        afterLeave() {
            this.$refs.cdWrapper.style.transition = "";
            this.$refs.cdWrapper.style[transform] = "";
        },
        //获取缩放的尺寸
        _getPosAndScale() {
            const targetWidth = 40; //底部小播放器的头像宽度
            const paddingLeft = 40; //中心坐标距离左边距离
            const paddingBottom = 30; //距离底部高度
            const paddingTop = 80; //上方的播放转动图标距离最顶部的距离
            const width = window.innerWidth * 0.8; //CD容器的宽度
            const scale = targetWidth / width; //计算初始播放比例
            const x = -(window.innerWidth / 2 - paddingLeft);
            const y =
                window.innerHeight - paddingTop - width / 2 - paddingBottom;
            return {
                x,
                y,
                scale
            };
        },
        //暂停播放
        togglePlaying() {
            this.setPlayingState(!this.playing);
        },
        /**
         * 计算内层Image的transform，并同步到外层容器
         * @param wrapper
         * @param inner
         */
        syncWrapperTransform(wrapper, inner) {
            if (!this.$refs[wrapper]) {
                return;
            }
            let imageWrapper = this.$refs[wrapper];
            let image = this.$refs[inner];
            let wTransform = getComputedStyle(imageWrapper)[transform];
            let iTransform = getComputedStyle(image)[transform];
            imageWrapper.style[transform] = wTransform === "none" ? iTransform : iTransform.concat(" ", wTransform);
        }
    },
    watch: {
        currentSong() {
            this.$nextTick(() => {
                this.$refs.audio.play();
            });
        },
        //监听暂停播放
        playing(newPlaying) {
            const audio = this.$refs.audio;
            this.$nextTick(() => {
                newPlaying ? audio.play() : audio.pause();
            });
            if (!newPlaying) {
                if (this.fullScreen) {
                    this.syncWrapperTransform('imageWrapper', 'image')
                } else {
                    this.syncWrapperTransform('miniWrapper', 'miniImage')
                }
            }
        }
    },
    components: {
        Scroll
    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable';
@import '~@/common/stylus/mixin';

.player {
    .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: $color-background;

        .background {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.6;
            filter: blur(20px);
        }

        .top {
            position: relative;
            margin-bottom: 25px;

            .back {
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;

                .icon-back {
                    display: block;
                    padding: 9px;
                    font-size: $font-size-large-x;
                    color: $color-theme;
                    transform: rotate(-90deg);
                }
            }

            .title {
                width: 70%;
                margin: 0 auto;
                line-height: 40px;
                text-align: center;
                no-wrap();
                font-size: $font-size-large;
                color: $color-text;
            }

            .subtitle {
                line-height: 20px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-text;
            }
        }

        .middle {
            position: fixed;
            width: 100%;
            top: 80px;
            bottom: 170px;
            white-space: nowrap;
            font-size: 0;

            .middle-l {
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 80%;

                .cd-wrapper {
                    position: absolute;
                    left: 10%;
                    top: 0;
                    width: 80%;
                    box-sizing: border-box;
                    height: 100%;

                    .cd {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;

                        .image {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border-radius: 50%;
                            border: 10px solid rgba(255, 255, 255, 0.1);
                        }

                        .play {
                            animation: rotate 20s linear infinite;
                        }
                    }
                }

                .playing-lyric-wrapper {
                    width: 80%;
                    margin: 30px auto 0 auto;
                    overflow: hidden;
                    text-align: center;

                    .playing-lyric {
                        height: 20px;
                        line-height: 20px;
                        font-size: $font-size-medium;
                        color: $color-text-l;
                    }
                }
            }

            .middle-r {
                display: inline-block;
                vertical-align: top;
                width: 100%;
                height: 100%;
                overflow: hidden;

                .lyric-wrapper {
                    width: 80%;
                    margin: 0 auto;
                    overflow: hidden;
                    text-align: center;

                    .text {
                        line-height: 32px;
                        color: $color-text-l;
                        font-size: $font-size-medium;

                        &.current {
                            color: $color-text;
                        }
                    }

                    .pure-music {
                        padding-top: 50%;
                        line-height: 32px;
                        color: $color-text-l;
                        font-size: $font-size-medium;
                    }
                }
            }
        }

        .bottom {
            position: absolute;
            bottom: 50px;
            width: 100%;

            .dot-wrapper {
                text-align: center;
                font-size: 0;

                .dot {
                    display: inline-block;
                    vertical-align: middle;
                    margin: 0 4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: $color-text-l;

                    &.active {
                        width: 20px;
                        border-radius: 5px;
                        background: $color-text-ll;
                    }
                }
            }

            .progress-wrapper {
                display: flex;
                align-items: center;
                width: 80%;
                margin: 0px auto;
                padding: 10px 0;

                .time {
                    color: $color-text;
                    font-size: $font-size-small;
                    flex: 0 0 30px;
                    line-height: 30px;
                    width: 30px;

                    &.time-l {
                        text-align: left;
                    }

                    &.time-r {
                        text-align: right;
                    }
                }

                .progress-bar-wrapper {
                    flex: 1;
                }
            }

            .operators {
                display: flex;
                align-items: center;

                .icon {
                    flex: 1;
                    color: $color-theme;

                    &.disable {
                        color: $color-theme-d;
                    }

                    i {
                        font-size: 30px;
                    }
                }

                .i-left {
                    text-align: right;
                }

                .i-center {
                    padding: 0 20px;
                    text-align: center;

                    i {
                        font-size: 40px;
                    }
                }

                .i-right {
                    text-align: left;
                }

                .icon-favorite {
                    color: $color-sub-theme;
                }
            }
        }

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
    }

    .mini-player {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 60px;
        background: $color-highlight-background;

        &.mini-enter-active, &.mini-leave-active {
            transition: all 0.4s;
        }

        &.mini-enter, &.mini-leave-to {
            opacity: 0;
        }

        .icon {
            flex: 0 0 40px;
            width: 40px;
            height: 40px;
            padding: 0 10px 0 20px;

            .imgWrapper {
                height: 100%;
                width: 100%;

                img {
                    border-radius: 50%;

                    &.play {
                        animation: rotate 10s linear infinite;
                    }

                    &.pause {
                        animation-play-state: paused;
                    }
                }
            }
        }

        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;

            .name {
                margin-bottom: 2px;
                no-wrap();
                font-size: $font-size-medium;
                color: $color-text;
            }

            .desc {
                no-wrap();
                font-size: $font-size-small;
                color: $color-text-d;
            }
        }

        .control {
            flex: 0 0 30px;
            width: 30px;
            padding: 0 10px;

            .icon-play-mini, .icon-pause-mini, .icon-playlist {
                font-size: 30px;
                color: $color-theme-d;
            }

            .icon-mini {
                font-size: 32px;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
