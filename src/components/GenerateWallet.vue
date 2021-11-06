<template>
  <div>
    <h2>Generate Seed and Address</h2>
    <div>
      <h4>Seed and mnemonic</h4>
      <div class="table">
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">filter_drama</i>Seed
            </div>
            <div class="collapsible-body">
              <span>{{ state.hexEncodedSeed }}</span>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="material-icons">place</i>Mnemonic
            </div>
            <div class="collapsible-body">
              <span>{{ state.mnemonic }}</span>
            </div>
          </li>
          <li>
            <div class="collapsible-header">
              <i class="material-icons">account_balance_wallet </i>Address
            </div>
            <div class="collapsible-body">
              <span
                ><div
                  class="address"
                  v-for="(address, index) in state.addresses"
                  :key="address"
                >
                  <span v-if="state">Index: {{ index }} : {{ address }}</span>
                </div></span
              >
            </div>
          </li>
        </ul>
      </div>
      <button
        class="waves-effect waves-light btn"
        v-on:click="handleGenerateSeed"
      >
        Generate Seed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Generate Wallet",
  data() {
    return {
      state: {},
    };
  },
  methods: {
    handleGenerateSeed() {
      return fetch("http://localhost:5000/seed_generate")
        .then((result) => result.json())
        .then((data) => (this.state = data));
    },
  },
};
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
.table {
  width: 100%;
}
</style>
