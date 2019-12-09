<template>
  <div id="app">
    <h1 class="globaltitle"><router-link to="/">Protopia</router-link></h1>
    <h2 class="pagetitle">Requests Page</h2>
    <div class="parent-card">

      <div class="widget-card">
        <p class="card-heading">Monthly Requests: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanRequestData.numRequests}}</h1><vs-icon icon="drafts"></vs-icon>
        </div>
      </div>

      <div class="widget-card">
        <p class="card-heading">Monthly Request Opens: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanRequestData.numOpens}}</h1><vs-icon icon="drafts"></vs-icon>
        </div>
      </div>

      <div class="widget-card">
        <p class="card-heading">Monthly Request Clicks: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanRequestData.numClicks}}</h1><vs-icon icon="touch_app"></vs-icon>
        </div>
      </div>

    </div>

    <div class="btn-group">
      <button
        type="button"
        class="btn btn-md light btn__border"
        v-on:click="time = 'today'"
      >Today</button>
      <button
        type="button"
        class="btn btn-md light btn__border"
        v-on:click="time = 'week'"
      >Week</button>
      <button
        type="button"
        class="btn btn-md light btn__border"
        v-on:click="time = 'month'"
      >Month</button>
    </div>

    <dailyrequest-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></dailyrequest-dashboard>
    <hourlyrequest-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></hourlyrequest-dashboard>

    <div id="pieCharts">
      <openrate-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></openrate-dashboard>
      <clickrate-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></clickrate-dashboard>
      <statusrequest-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></statusrequest-dashboard>
      <fromemail-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></fromemail-dashboard>
    </div>

    <weekdaycount-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></weekdaycount-dashboard>
    <div id="pieCharts"></div>

  </div>
</template>

<script>
    import DailyRequestRate from "./DailyRequestRate.vue";
    import HourlyRequestRate from "./HourlyRequestRate.vue";
    import RequestStatusDist from "./RequestStatusDist.vue";
    import RequestFromEmail from "./RequestFromEmail.vue";
    import RequestOpenRate from "./RequestOpenRate.vue";
    import RequestClickRate from "./RequestClickRate.vue";
    import RequestWeekdayCount from "./RequestWeekdayCount.vue";

    export default {
        props: ["cleanData", "time"],
        components: {
            'dailyrequest-dashboard': DailyRequestRate,
            'hourlyrequest-dashboard': HourlyRequestRate,
            'statusrequest-dashboard': RequestStatusDist,
            'fromemail-dashboard': RequestFromEmail,
            'openrate-dashboard': RequestOpenRate,
            'clickrate-dashboard': RequestClickRate,
            'weekdaycount-dashboard': RequestWeekdayCount,
        },
        data () {
            return {
                time: 'month',
                childComponents: ['DailyRequestRate.vue','HourlyRequestRate.vue', 'RequestStatusDist.vue', 'RequestFromEmail.vue', 'RequestOpenRate.vue', 'RequestClickRate.vue', 'RequestWeekdayCount.vue']
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
