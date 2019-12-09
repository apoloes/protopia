<template>
  <div id="app">
    <div class="headerDiv">
      <div class="title">
        <h1><router-link to="/">Protopia</router-link></h1>
        <h2>Requests Page</h2>
      </div>

      <div class="parent-card">
        <div class="widget-card">
          <p class="card-heading">Monthly Requests</p>
          <div class="dataCounts">
            <h1>{{cleanData.cleanRequestData.numRequests}}</h1><vs-icon icon="post_add"></vs-icon>
          </div>
        </div>

        <div class="widget-card">
          <p class="card-heading">Monthly Request Opens</p>
          <div class="dataCounts">
            <h1>{{cleanData.cleanRequestData.numOpens}}</h1><vs-icon icon="drafts"></vs-icon>
          </div>
        </div>

        <div class="widget-card">
          <p class="card-heading">Monthly Request Clicks</p>
          <div class="dataCounts">
            <h1>{{cleanData.cleanRequestData.numClicks}}</h1><vs-icon icon="touch_app"></vs-icon>
          </div>
        </div>
      </div>
    </div>

    <div class="bodyDiv">

      <div class="box graph1st">
<!--        <input type="date" :value="startDate" @input="startDate = $event.target.value">-->
<!--        to-->
<!--        <input type="date" :value="endDate" @input="endDate = $event.target.value">-->
        <div class="boxTitle">Daily Open, Click, and Request Rates</div>
        <hr class="boxLine">
        <dailyrequest-dashboard v-bind:cleanData="cleanData"v-bind:startDate="startDate"v-bind:endDate="endDate"></dailyrequest-dashboard>
      </div>

      <div class="box b">
        <div class="boxTitle">Open Rate</div>
        <hr class="boxLine">
        <openrate-dashboard v-bind:cleanData="cleanData"></openrate-dashboard>
      </div>

      <div class="box graph2nd">
        <div class="boxTitle">Hourly Open, Click, and Request Rates</div>
        <hr class="boxLine">
        <hourlyrequest-dashboard v-bind:cleanData="cleanData"></hourlyrequest-dashboard>
      </div>
      <div class="box d">
        <div class="boxTitle">Click Rate</div>
        <hr class="boxLine">
        <clickrate-dashboard v-bind:cleanData="cleanData"></clickrate-dashboard>
      </div>


      <openrate-dashboard v-bind:cleanData="cleanData"></openrate-dashboard>
      <clickrate-dashboard v-bind:cleanData="cleanData"></clickrate-dashboard>
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
        props: ["cleanData", "startDate", "endDate"],
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
    padding-left: 4px;
  }
  .pies {
    grid-column: col 3 / span 2;
    grid-row: row;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 1fr 1fr;
  }
  .graphs2nd{
    grid-column: col / span 2;
    grid-row: row 2;
  }
  .pies2nd{
    grid-column: col 3 / span 2;
    grid-row: row 2;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 1fr 1fr;
  }
  .pies1{
    grid-column: 1;
    grid-row:1;
  }
  .pies2{

    grid-row:2;
  }

</style>
