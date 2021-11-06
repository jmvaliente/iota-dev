<template>
  <div>
    <div>
      <h3>Validate Address</h3>
    </div>
    <div>
      <input type="text" v-model.trim="address" placeholder="Test Address" />
      <button
        class="waves-effect waves-light btn"
        v-on:click="handleCheckAddress"
      >
        Check Address
      </button>
    </div>
    <div>
      <h5 v-if="statusWallet">Wallet Validate</h5>
    </div>
  </div>
</template>
<script>
export default {
  name: "Validate Address",
  data() {
    return {
      address: "",
      statusWallet: false,
    };
  },
  methods: {
    handleCheckAddress() {
      fetch(`http://localhost:5000/validate_address/${this.address}`)
        .then((result) => result.json())
        .then((data) => (this.statusWallet = data.validate))
        .catch((error) => console.log(error));
    },
  },
};
</script>



<style scoped>
</style>