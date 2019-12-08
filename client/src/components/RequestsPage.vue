<template>
  <div id="app">
    <h1 class="globaltitle"><router-link to="/">Protopia</router-link></h1>
    <h2 class="pagetitle">Requests Page</h2>
    <div class="parent-card">
      <div class="widget-card" style="text-align: center">
        <p class="card-heading">Total Monthly Requests: </p>

        <div id="openDiv">
          <h1 class="openNum">{{cleanData.cleanRequestData.numRequests}}</h1>
          <vs-icon icon="inbox"></vs-icon>
        </div>
      </div>
      <div class="widget-card" style="text-align: center">
        <p class="card-heading">Monthly Request Opens: </p>

        <div id="openDiv">
          <h1 class="openNum">{{cleanData.cleanRequestData.numOpens}}</h1>
          <vs-icon icon="drafts"></vs-icon>
        </div>
      </div>
      <div class="widget-card" style="text-align: center">
        <p class="card-heading">Monthly Request Clicks: </p>
        <div id="clickDiv">
          <h1 class="clicksNum">{{cleanData.cleanRequestData.numClicks}}</h1>
          <vs-icon icon="touch_app"></vs-icon>
        </div>
      </div>
    </div>
    <dailyrequest-dashboard v-bind:cleanData="cleanData"></dailyrequest-dashboard>
    <hourlyrequest-dashboard v-bind:cleanData="cleanData"></hourlyrequest-dashboard>

    <div id="pieCharts">
      <openrate-dashboard v-bind:cleanData="cleanData"></openrate-dashboard>
      <clickrate-dashboard v-bind:cleanData="cleanData"></clickrate-dashboard>
      <statusrequest-dashboard v-bind:cleanData="cleanData"></statusrequest-dashboard>
    </div>

    <div id="pieCharts">
      
      <fromemail-dashboard v-bind:cleanData="cleanData"></fromemail-dashboard>
    </div>

  </div>
</template>

<script>
    import DailyRequestRate from "./DailyRequestRate.vue";
    import HourlyRequestRate from "./HourlyRequestRate.vue";
    import RequestStatusDist from "./RequestStatusDist.vue";
    import RequestFromEmail from "./RequestFromEmail.vue";
    import RequestOpenRate from "./RequestOpenRate.vue";
    import RequestClickRate from "./RequestClickRate.vue";

    export default {
        props: ["cleanData"],
        components: {
            'dailyrequest-dashboard': DailyRequestRate,
            'hourlyrequest-dashboard': HourlyRequestRate,
            'statusrequest-dashboard': RequestStatusDist,
            'fromemail-dashboard': RequestFromEmail,
            'openrate-dashboard': RequestOpenRate,
            'clickrate-dashboard': RequestClickRate,
        },
        data () {
            return {
                childComponents: ['DailyRequestRate.vue','HourlyRequestRate.vue', 'RequestStatusDist.vue', 'RequestFromEmail.vue', 'RequestOpenRate.vue', 'RequestClickRate.vue']
            }
        },
        methods: {

        },
        computed: {

        }
    }
</script>

<style scoped>
  #pieCharts{
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
