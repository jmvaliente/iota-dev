<template>
    <div>
        <div>
            <h1>Balance Address</h1>
        </div>
        <div class="balanceItems">
            <input type="text" v-model="address" placeholder="Address"/>
            <button v-on:click="handleGetBalance">Check Balance</button>
            <a href="https://faucet.chrysalis-devnet.iota.cafe/" target="_blank">Faucet Iota</a>
        </div>
        <div v-if="showBalance" class="balance">
            <span><b>Balance:</b> {{balance.balance}} <b>Dust Allowed:</b> {{balance.dustAllowed}}</span>
        </div>
        <div>
            <h1>Transfers IOTA</h1>
        </div>
        <div>
            <input type="text" v-model="transfer.address" placeholder="Address"/>
            <input type="text" v-model="transfer.seed" placeholder="Seed"/>
            <input type="number" v-model.number="transfer.value"  placeholder="Value min: 1000000"/>
            <form v-on:submit.prevent="handleTransfersIota">
                <button>Transfer</button>
            </form>
        </div>
        </div>
            <a v-if="message" :href="url" target="_blank">Explorer transaction</a>
        <div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
     data(){
         return {
             balance: {},
             address: "",
             showBalance: false,
             transfer: {seed: "", address: "", value: 0},
             message: "",
             url: ""
         }

    },
    methods: {
        handleGetBalance(){
            this.showBalance = true
            return fetch(`http://localhost:5000/balance/${this.address}`)
                .then(result => result.json())
                .then(data => this.balance = data)
                .catch(error => console.log(error))
        },
        handleTransfersIota() {
            const data = JSON.stringify(this.transfer)
            axios.post('http://localhost:5000/transfer',data , {headers: {'Content-Type': 'application/json'}})
                .then(res => {
                    console.log(res.data.messageId)
                    console.log(res)
                    const message = res.data.messageId
                    this.message = message
                    this.url = `https://explorer.iota.org/devnet/message/${message}`
                })
                .catch(error => console.log(error))                            
        }

    }
}
</script>

<style scoped>
.balance {
    margin: 15px;
}
.balanceItems{
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
}
</style>