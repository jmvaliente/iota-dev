<template>
    <div>
        <div>
            <h1>Server Configuration</h1>
            <h3>{{server}}</h3>
            <h2>{{state.value}}</h2>
        </div>
        <div>
            <button v-on:click="modCount('add')">+</button>
            <button v-on:click="modCount('dis')">-</button>
        </div>
    </div>
</template>

<script>
 export default {
  name: 'ServerConfiguration',
  data () {
    return{
        server: 'https://api.lb-0.h.chrysalis-devnet.iota.cafe:443',
        state: {
          value: 0
        }
    }
  },
  methods: {
      modCount(instuccion) {
          return instuccion === 'add' ? this.state.value ++ : this.state.value --
      },

  }
}
</script>

