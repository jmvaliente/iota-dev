<template>
  <img alt="Iota Logo" src="./assets/iota_logo.png"  class="logo">
  <div class="menu">
    <ServerComponent/>
    <GenerateWallet/>
    <!--<HelloWorld msg="Test"/>-->
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import ServerComponent from './components/ServerComponent.vue'
import GenerateWallet from './components/GenerateWallet.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    ServerComponent,
    GenerateWallet,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
.logo {
  width: 20%;
  height: 20%;
}
</style>
