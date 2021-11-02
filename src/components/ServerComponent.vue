<template>
    <div>
        <div>
            <h1>Server Configuration</h1>
            <div>
                <div>
                    <h4 v-if="!changeServer">{{server}}</h4>
                    <input v-if="changeServer" type="text" placeholder="Server domain" v-model.trim="server"/>
                    <div class="statusConnect">
                        <span v-if="serverStatus.isHealthy" class="dot colorDotEnable"></span>
                        <span v-else class="dot colorDotDisable"></span>
                        <span v-if="serverStatus.isHealthy">Conection in {{serverStatus.name}} {{serverStatus.networkId}} V.{{serverStatus.version}} MSG/Sec: {{serverStatus.referencedMessagesPerSecond}}</span>
                        <span v-else>Conection disabled</span>
                    </div>
                </div>
                <div>
                    <button v-if="!changeServer" v-on:click="handleChangeServer">Change Server</button>
                    <button v-else v-on:click="handleChangeServer">Apply Server</button>
                    <button v-if="!changeServer" v-on:click="handleConectionServer">Conection Server</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ServerConfiguration',
  data () {
    return{
        server: 'api.lb-0.h.chrysalis-devnet.iota.cafe',
        changeServer: false,
        serverStatus: {},
        state: {
          value: 0
        }
    }
  },
  methods: {
      handleChangeServer() {
          return this.changeServer = !this.changeServer
      },
      handleConectionServer(){
          return fetch(`http://localhost:5000/connect/${this.server}`)
            .then(result => result.json())
            .then(data => this.serverStatus = data.nodeinfo)
            .catch(error => console.log(error))
      }
  }
}
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
    justify-content:space-evenly;
    padding: 10px;
    margin: 10px;
}
</style>

