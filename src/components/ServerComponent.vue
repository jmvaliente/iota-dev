<template>
  <div>
    <div>
      <h2>Server Configuration</h2>
      <div>
        <div>
          <p class="flow-text" v-if="!changeServer">{{ server }}</p>
          <input
            v-if="changeServer"
            type="text"
            placeholder="Server domain"
            v-model.trim="server"
          />
          <div>
            <div v-if="preloader" class="progress">
              <div class="indeterminate"></div>
            </div>
            <span v-if="serverStatus.isHealthy && !preloader"
              >Conection in {{ serverStatus.name }}
              {{ serverStatus.networkId }} V.{{ serverStatus.version }} MSG/Sec:
              {{ serverStatus.referencedMessagesPerSecond }}</span
            >
            <span v-if="!preloader && !serverStatus.isHealthy"
              >Conection disabled</span
            >
          </div>
        </div>
        <div class="statusConnect">
          <button
            class="waves-effect waves-light btn"
            v-if="!changeServer"
            v-on:click="handleChangeServer"
          >
            Change Server
          </button>
          <button
            class="waves-effect waves-light btn"
            v-else
            v-on:click="handleChangeServer"
          >
            Apply Server
          </button>
          <button
            class="waves-effect waves-light btn"
            v-if="!changeServer"
            v-on:click="handleConectionServer"
          >
            Conection Server
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServerConfiguration",
  data() {
    return {
      server: "api.lb-0.h.chrysalis-devnet.iota.cafe",
      changeServer: false,
      serverStatus: {},
      preloader: false,
      state: {
        value: 0,
      },
    };
  },
  methods: {
    handleChangeServer() {
      return (this.changeServer = !this.changeServer);
    },
    handleConectionServer() {
      this.preloader = true;
      return fetch(`http://localhost:5000/connect/${this.server}`)
        .then((result) => result.json())
        .then((data) => {
          this.preloader = false;
          return (this.serverStatus = data.nodeinfo);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #bbb;
  text-align: center;
  color: #2c3e50;
}
.dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}
.colorDotDisable {
  background-color: red;
}
.colorDotEnable {
  background-color: green;
}
.statusConnect {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
  margin: 10px;
}
</style>

