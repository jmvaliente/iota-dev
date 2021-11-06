<template>
  <div>
    <div>
      <h3>Balance Address</h3>
    </div>
    <div class="container">
      <input type="text" v-model="address" placeholder="Address" />
      <div class="balanceItems">
        <button
          class="waves-effect waves-light btn"
          v-on:click="handleGetBalance"
        >
          Check Balance
        </button>
        <a
          class="waves-effect waves-light btn"
          href="https://faucet.chrysalis-devnet.iota.cafe/"
          target="_blank"
          >Faucet Iota</a
        >
      </div>
    </div>
    <div v-if="showBalance" class="container">
      <span>
        <b>Balance:</b> {{ balance.balance }} <b>Dust Allowed:</b>
        {{ balance.dustAllowed }}
      </span>
    </div>
    <div>
      <h3>Transfers IOTA</h3>
    </div>
    <div>
      <input type="text" v-model="transfer.address" placeholder="Address" />
      <input type="text" v-model="transfer.seed" placeholder="Seed" />
      <input
        type="number"
        v-model.number="transfer.value"
        placeholder="Value min: 1000000"
      />
      <form v-on:submit.prevent="handleTransfersIota">
        <button class="waves-effect waves-light btn">Transfer</button>
      </form>
    </div>
    <a v-if="message" :href="url" target="_blank">Explorer transaction</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      balance: {},
      address: "",
      showBalance: false,
      transfer: { seed: "", address: "", value: "" },
      message: "",
      url: "",
    };
  },
  methods: {
    handleGetBalance() {
      this.showBalance = true;
      return fetch(`http://localhost:5000/balance/${this.address}`)
        .then((result) => result.json())
        .then((data) => (this.balance = data))
        .catch((error) => console.log(error));
    },
    handleTransfersIota() {
      const data = JSON.stringify(this.transfer);
      axios
        .post("http://localhost:5000/transfer", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data.messageId);
          console.log(res);
          const message = res.data.messageId;
          this.message = message;
          this.url = `https://explorer.iota.org/devnet/message/${message}`;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.balance {
  margin: 15px;
}
.balanceItems {
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
}
</style>