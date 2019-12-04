<template>
  <div id="app">
    <h1 class="globaltitle"><router-link to="/">Protopia</router-link></h1>
    <h2 class="pagetitle">Home</h2>
    <div class="parent-card">
      <div class="widget-card">
        <p class="card-heading">Total Monthly Emails: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanFullData.numTotalEmails}}</h1><vs-icon icon="drafts"></vs-icon>
        </div>
      </div>

      <div class="widget-card">
        <p class="card-heading">Total Monthly Opens: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanRequestData.numOpens + cleanData.cleanResponseData.numOpens}}</h1><vs-icon icon="drafts"></vs-icon>
        </div>
      </div>

      <div class="widget-card">
        <p class="card-heading">Total Monthly Clicks: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanRequestData.numClicks + cleanData.cleanResponseData.numClicks}}</h1><vs-icon icon="touch_app"></vs-icon>
        </div>
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
  .card-heading{
    padding: 5px;
    font-weight: lighter;
    font-size: 1.3em;
    color: black;
  }
  .parent-card{
    /*margin-top: 20px;*/
    width: 80%;
    margin: auto;
    padding: 30px;
  }
  .widget-card{
    border-radius: 5px;
    background: none !important;
    box-shadow: none !important;
  }
  .widget-card .vs-icon{
    padding-bottom: 4px;
  }
</style>
