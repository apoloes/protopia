<template>
  <div id="app">
    <div class="headerDiv">
      <div class="title">
        <h1><router-link to="/">Protopia</router-link></h1>
        <h2>Requests Page</h2>
      </div>

      <div class="parent-card">
        <div class="widget-card">
          <p class="card-heading">{{requestsHeader}}</p>
          <div class="dataCounts">
            <h1>{{numRequests}}</h1><vs-icon icon="post_add"></vs-icon>
          </div>
        </div>

        <div class="widget-card">
          <p class="card-heading">{{opensHeader}}</p>
          <div class="dataCounts">
            <h1>{{numOpens}}</h1><vs-icon icon="drafts"></vs-icon>
          </div>
        </div>

        <div class="widget-card">
          <p class="card-heading">{{clicksHeader}}</p>
          <div class="dataCounts">
            <h1>{{numClicks}}</h1><vs-icon icon="touch_app"></vs-icon>
          </div>
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

    <div class="bodyDiv">

      <div class="box graph1st">
<!--        <input type="date" :value="startDate" @input="startDate = $event.target.value">-->
<!--        to-->
<!--        <input type="date" :value="endDate" @input="endDate = $event.target.value">-->
        <div class="boxTitle">Daily Open, Click, and Request Rates</div>
        <hr class="boxLine">
        <dailyrequest-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></dailyrequest-dashboard>
      </div>

      <div class="box b">
        <div class="boxTitle">Open Rate</div>
        <hr class="boxLine">
        <openrate-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></openrate-dashboard>
      </div>

      <div class="box graph2nd">
        <div class="boxTitle">Hourly Open, Click, and Request Rates</div>
        <hr class="boxLine">
        <hourlyrequest-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></hourlyrequest-dashboard>
      </div>
      <div class="box d">
        <div class="boxTitle">Click Rate</div>
        <hr class="boxLine">
        <clickrate-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></clickrate-dashboard>
      </div>
    </div>

    <div class="bottomDiv">
      <div class="box e">
        <div class="boxTitle">Status</div>
        <hr class="boxLine">
        <statusrequest-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></statusrequest-dashboard>
      </div>
      <div class="box f">
        <div class="boxTitle">Weekday Counts</div>
        <hr class="boxLine">
        <weekdaycount-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></weekdaycount-dashboard>
      </div>
      <div class="box g">
        <div class="boxTitle">Emails</div>
        <hr class="boxLine">
        <fromemail-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></fromemail-dashboard>
      </div>
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
                numOpens: this.cleanData.cleanRequestData.numOpens,
                numRequests: this.cleanData.cleanRequestData.numRequests,
                numClicks: this.cleanData.cleanRequestData.numClicks,
                opensHeader: 'Monthly Request Opens',
                requestsHeader: 'Monthly Requests',
                clicksHeader: 'Monthly Request Clicks',
                time: 'month',
                childComponents: ['DailyRequestRate.vue','HourlyRequestRate.vue', 'RequestStatusDist.vue', 'RequestFromEmail.vue', 'RequestOpenRate.vue', 'RequestClickRate.vue', 'RequestWeekdayCount.vue']
            }
        },
        methods: {
          setCounts: function () {
              this.numOpens = this.cleanData.cleanRequestData.numOpens;
              this.numRequests = this.cleanData.cleanRequestData.numRequests;
              this.numClicks = this.cleanData.cleanRequestData.numClicks;
              this.opensHeader = 'Monthly Request Opens';
              this.requestsHeader = 'Monthly Requests';
              this.clicksHeader = 'Monthly Request Clicks';
              if (this.time == "today") {
                this.numOpens = this.cleanData.cleanRequestData.numTodayOpens;
                this.numRequests = this.cleanData.cleanRequestData.numTodayRequests;
                this.numClicks = this.cleanData.cleanRequestData.numTodayClicks;
                this.opensHeader = 'Request Opens Today';
                this.requestsHeader = 'Requests Today';
                this.clicksHeader = 'Request Clicks Today';
              } else if (this.time == "week") {
                this.numOpens = this.cleanData.cleanRequestData.numWeekOpens;
                this.numRequests = this.cleanData.cleanRequestData.numWeekRequests;
                this.numClicks = this.cleanData.cleanRequestData.numWeekClicks;
                this.opensHeader = 'Weekly Request Opens';
                this.requestsHeader = 'Weekly Requests';
                this.clicksHeader = 'Weekly Request Clicks';
              }
          }
        },
        computed: {

        },
        watch: {
          time: {
            handler: function() {
              this.setCounts();
            },
          },
      },
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

  .btn-group button{
    /*font-size: 0.6em;*/
  }
</style>
