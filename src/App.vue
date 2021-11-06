<template>
  <img alt="Iota Logo" src="./assets/iota_logo.png" class="logo" />
  <div class="menu">
    <ServerComponent />
    <GenerateWallet />
    <ValidateAddress />
    <BalanceAddress />
    <!--<HelloWorld msg="Test"/>-->
  </div>
</template>

<script>
import ServerComponent from "./components/ServerComponent.vue";
import GenerateWallet from "./components/GenerateWallet.vue";
import ValidateAddress from "./components/ValidateAddress.vue";
import BalanceAddress from "./components/BalanceAddress.vue";

export default {
  name: "App",
  components: {
    ServerComponent,
    GenerateWallet,
    ValidateAddress,
    BalanceAddress,
  },
};
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.logo {
  width: 20%;
  height: 20%;
}
</style>
