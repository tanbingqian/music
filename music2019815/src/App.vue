<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <Mheader></Mheader>
    <Tab></Tab>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import Mheader from "./components/m-header/m-header";
import Tab from "./components/tab/tab"
export default {
  components: {
    Mheader,
    Tab
  }
};
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
