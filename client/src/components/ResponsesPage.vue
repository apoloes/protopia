<template>
  <div id="app">
    <h1 class="globaltitle"><router-link to="/">Protopia</router-link></h1>
    <h2 class="pagetitle">Responses Page</h2>
    <div class="parent-card">
      <div class="widget-card">
        <p class="card-heading">Monthly Responses: </p>

        <div class="dataCounts">
          <h1>{{cleanData.cleanResponseData.numResponses}}</h1><vs-icon icon="drafts"></vs-icon>
        </div>
      </div>

      <div class="widget-card">
        <p class="card-heading">Monthly Response Opens: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanResponseData.numOpens}}</h1><vs-icon icon="drafts"></vs-icon>
        </div>
      </div>

      <div class="widget-card">
        <p class="card-heading">Monthly Response Clicks: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanResponseData.numClicks}}</h1><vs-icon icon="touch_app"></vs-icon>
        </div>
      </div>
    </div>
    <input type="date" :value="responseStartDate"
           @input="responseStartDate = $event.target.value">
    to
    <input type="date" :value="responseEndDate"
           @input="responseEndDate = $event.target.value">
    <dailyresponse-dashboard v-bind:cleanData="cleanData"v-bind:responseStartDate="responseStartDate"v-bind:responseEndDate="responseEndDate"></dailyresponse-dashboard>
    <hourlyresponse-dashboard v-bind:cleanData="cleanData"></hourlyresponse-dashboard>

    <div id="pieCharts">
      <openrate-dashboard v-bind:cleanData="cleanData"></openrate-dashboard>
      <clickrate-dashboard v-bind:cleanData="cleanData"></clickrate-dashboard>
      <statusresponse-dashboard v-bind:cleanData="cleanData"></statusresponse-dashboard>
    </div>
    <div id="pieCharts">
      
      <fromemail-dashboard v-bind:cleanData="cleanData"></fromemail-dashboard>
    </div>
  </div>
</template>

<script>
    import DailyResponseRate from "./DailyResponseRate.vue";
    import HourlyResponseRate from "./HourlyResponseRate.vue";
    import ResponseStatusDist from "./ResponseStatusDist.vue";
    import ResponseFromEmail from "./ResponseFromEmail.vue";
    import ResponseOpenRate from "./ResponseOpenRate.vue";
    import ResponseClickRate from "./ResponseClickRate.vue";

    export default {
        props: ["cleanData", "responseStartDate", "responseEndDate"],
        components: {
            'dailyresponse-dashboard': DailyResponseRate,
            'hourlyresponse-dashboard': HourlyResponseRate,
            'statusresponse-dashboard': ResponseStatusDist,
            'fromemail-dashboard': ResponseFromEmail,
            'openrate-dashboard': ResponseOpenRate,
            'clickrate-dashboard': ResponseClickRate,
        },
        data () {
            return {
                childComponents: ['DailyResponseRate.vue','HourlyResponseRate.vue', 'ResponseStatusDist.vue', 'ResponseFromEmail.vue', 'ResponseOpenRate.vue', 'ResponseClickRate.vue']
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
