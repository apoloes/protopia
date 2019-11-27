<template>
  <div id="app">
    <h1>Protopia Home</h1>
    <div class="parent-card">
      <div class="widget-card" style="text-align: center">
        <p class="card-heading">Monthly request/response opens: </p>
        <h1 style="color:#4a57b5">{{cleanData.cleanRequestData.numOpens + cleanData.cleanResponseData.numOpens}}</h1>
      </div>
      <div class="widget-card" style="text-align: center">
        <p class="card-heading">Monthly request/response clicks: </p>
        <h1 style="color:#4a57b5">{{cleanData.cleanRequestData.numClicks + cleanData.cleanResponseData.numClicks}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Home",
        props: ["cleanData"]
    }
</script>

<style scoped>

</style>
