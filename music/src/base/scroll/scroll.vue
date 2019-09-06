<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
//引用幻灯片插件
import BScroll from "better-scroll";

// const DIRECTION_H = 'horizontal'
const DIRECTION_V = "vertical";
export default {
    props: {
        probeType: {
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
        listenScroll: {
            type: Boolean,
            default: false
        },
        direction: {
            type: String,
            default: DIRECTION_V
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll();
        }, 20);
    },
    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return;
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
                // eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
            });
            // this.scroll = new Bscroll(this.$refs.wrapper, {
            //     propeType: this.propeType,
            //     click: this.click
            // });
            if (this.listenScroll) {
                let me = this;
                me.scroll.on("scroll", pos => {
                    me.$emit("scroll", pos);
                });
            }
        },
        enable() {
            this.scroll && this.scroll.enable();
        },
        disble() {
            this.scroll && this.scroll.disble();
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() {
            this.scroll &&
                this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay);
        }
    }
};
</script>


<style  scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable';
</style>