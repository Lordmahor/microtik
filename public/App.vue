<template>
  <Navbar id="navbar" style="position: fixed; width: 100%" @currentTab="currentComponent=$event" @isLogout="isLogin = true" v-if="!isLogin"/>
  <div :style="[isLogin ? 'padding-top: 0px' : 'padding-top: 85px']"  id="component">
    <Login @isLogged="isLogin = !isLogin" ref="login" v-if="isLogin"/>
    <keep-alive v-else-if="currentComponent !== 'FraudManager'"><component v-bind:is="currentComponent"></component></keep-alive>
    <component  v-else v-bind:is="currentComponent"></component>
  </div>
</template>

<style>
  body {
    padding-top: 1em;
    padding-right: 1em;
    padding-bottom: 1em;
    padding-left: 1em;
  }
  html, body {
    height: 100%;
  }
  .scroll::-webkit-scrollbar { height: 4px; }
</style>
<script>


export default {
  data: () => ({
    isLogin: true,
    currentComponent: 'FraudManager'
  }),
}
</script>
