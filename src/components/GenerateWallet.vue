<template>
    <div class="container">
        <h1>Generate Seed and Address</h1>
        <div class="seedData">
            <h4>Seed and mnemonic</h4>
            <span v-if="state">Seed: {{state.hexEncodedSeed}}</span>
            <span v-if="state">mnemonic: <b>{{state.mnemonic}}</b></span>
            <h4>Addresses</h4>
            <div class="address" v-for="address in state.addresses" :key="address">
                <span v-if="state" >{{address}}</span>
            </div>
            <button v-on:click="handleGenerateSeed">Generate Seed</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Generate Wallet",
    data() {
        return{
            state: {}
        }
    },
    methods: {
        handleGenerateSeed(){
            return fetch('http://localhost:5000/seed_generate')
                .then(result => result.json())
                .then(data => this.state = data)
        }
    }
}
</script>

<style scoped>
.seedData {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.address {
    display: flex;
    margin: 5px;
    
}
.container {
    display: flex;
    flex-direction: column;
    text-align: left;
}

</style>
