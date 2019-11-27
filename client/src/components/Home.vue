<template>
  <div id="app">
    <h1>Protopia Home</h1>
    <div class="parent-card">
      <div class="widget-card card-heading">
        <p>Monthly request/response opens: </p>
        <h2>{{cleanData.cleanRequestData.numOpens + cleanData.cleanResponseData.numOpens}}</h2>
      </div>
      <div class="widget-card card-heading">
        <p>Monthly request/response clicks: </p>
        <h2>{{cleanData.cleanRequestData.numClicks + cleanData.cleanResponseData.numClicks}}</h2>
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
