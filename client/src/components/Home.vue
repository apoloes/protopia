<template>
  <div id="app">
    <h1 class="globaltitle"><router-link to="/">Protopia</router-link></h1>
    <h2 class="pagetitle">Home</h2>
    <div class="parent-card">
      <div class="widget-card" style="text-align: center">
        <p class="card-heading">Total Monthly Emails: </p>

        <div id="openDiv">
          <h1 class="openNum">{{cleanData.cleanFullData.numTotalEmails}}</h1>
          <vs-icon icon="inbox"></vs-icon>
        </div>
      </div>
      <div class="widget-card" style="text-align: center">
        <p class="card-heading">Total Monthly Opens: </p>

        <div id="openDiv">
          <h1 class="openNum">{{cleanData.cleanRequestData.numOpens + cleanData.cleanResponseData.numOpens}}</h1>
          <vs-icon icon="drafts"></vs-icon>
        </div>
      </div>
      <div class="widget-card" style="text-align: center">
        <p class="card-heading">Total Monthly Clicks: </p>
        <div id="clickDiv">
          <h1 class="clicksNum">{{cleanData.cleanRequestData.numClicks + cleanData.cleanResponseData.numClicks}}</h1>
          <vs-icon icon="touch_app"></vs-icon>
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

  .openNum{
    text-align: left;
    padding: 5px;
    /*color: #cba8e0;*/
  }
  .clicksNum{
    text-align: left;
    padding: 5px;
    /*color: #cba8e0;*/
  }
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
  #openDiv{
    display:flex;
    justify-content: center;
    align-items: center;
    color: #9178a0;
  }
  #clickDiv{
    display:flex;
    justify-content: center;
    align-items: center;
    color: #9178a0;
  }
  .widget-card{
    border-radius: 5px;
    background: none !important;
    box-shadow: none !important;
  }
</style>
