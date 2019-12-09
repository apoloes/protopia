<template>
  <div id="app">
    <div class="headerDiv">
      <div class="title">
        <h1><router-link to="/">Protopia</router-link></h1>
        <h2>Responses Page</h2>
      </div>

      <div class="parent-card">
        <div class="widget-card">
          <p class="card-heading">{{responseHeader}}</p>
          <div class="dataCounts">
            <h1>{{numResponses}}</h1><vs-icon icon="post_add"></vs-icon>
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

<!--    <input type="date" :value="responseStartDate"-->
<!--           @input="responseStartDate = $event.target.value">-->
<!--    to-->
<!--    <input type="date" :value="responseEndDate"-->
<!--           @input="responseEndDate = $event.target.value">-->
    <div class="bodyDiv">
      <div class="box graph1st">
        <div class="boxTitle">Daily Open, Click, and Response Rates</div>
        <hr class="boxLine">
        <dailyresponse-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></dailyresponse-dashboard>
      </div>

      <div class="box b">
        <div class="boxTitle">Open Rate</div>
        <hr class="boxLine">
        <openrate-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></openrate-dashboard>
      </div>

      <div class="box graph2nd">
        <div class="boxTitle">Hourly Open, Click, and Response Rates</div>
        <hr class="boxLine">
        <hourlyresponse-dashboard v-bind:cleanData="cleanData"v-bind:time="time"></hourlyresponse-dashboard>
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
        <statusresponse-dashboard v-bind:cleanData="cleanData"></statusresponse-dashboard>
      </div>
      <div class="box f">
        <div class="boxTitle">Weekday Counts</div>
        <hr class="boxLine">
        <weekdaycount-dashboard v-bind:cleanData="cleanData"></weekdaycount-dashboard>
      </div>
      <div class="box g">
        <div class="boxTitle">Emails</div>
        <hr class="boxLine">
        <fromemail-dashboard v-bind:cleanData="cleanData"></fromemail-dashboard>
      </div>
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
    import ResponseWeekdayCount from "./ResponseWeekdayCount.vue"

    export default {
        props: ["cleanData", "time"],
        components: {
            'dailyresponse-dashboard': DailyResponseRate,
            'hourlyresponse-dashboard': HourlyResponseRate,
            'statusresponse-dashboard': ResponseStatusDist,
            'fromemail-dashboard': ResponseFromEmail,
            'openrate-dashboard': ResponseOpenRate,
            'clickrate-dashboard': ResponseClickRate,
            'weekdaycount-dashboard': ResponseWeekdayCount,
        },
        data () {
            return {
                numOpens: this.cleanData.cleanResponseData.numOpens,
                numResponses: this.cleanData.cleanResponseData.numResponses,
                numClicks: this.cleanData.cleanResponseData.numClicks,
                opensHeader: 'Monthly Response Opens',
                responseHeader: 'Monthly Responses',
                clicksHeader: 'Monthly Response Clicks',
                time: 'month',
                childComponents: ['DailyResponseRate.vue','HourlyResponseRate.vue', 'ResponseStatusDist.vue', 'ResponseFromEmail.vue', 'ResponseOpenRate.vue', 'ResponseClickRate.vue', 'ResponseWeekdayCount.vue']
            }
        },
        methods: {
          setCounts: function () {
            this.numOpens = this.cleanData.cleanResponseData.numOpens;
            this.numResponses = this.cleanData.cleanResponseData.numResponses;
            this.numClicks = this.cleanData.cleanResponseData.numClicks;
            this.opensHeader = 'Monthly Response Opens';
            this.responseHeader = 'Monthly Responses';
            this.clicksHeader = 'Monthly Response Clicks';
            if (this.time == "today") {
              this.numOpens = this.cleanData.cleanResponseData.numTodayOpens;
              this.numResponses = this.cleanData.cleanResponseData.numTodayResponses;
              this.numClicks = this.cleanData.cleanResponseData.numTodayClicks;
              this.opensHeader = 'Response Opens Today';
              this.responseHeader = 'Responses Today';
              this.clicksHeader = 'Response Clicks Today';
            } else if (this.time == "week") {
              this.numOpens = this.cleanData.cleanResponseData.numWeekOpens;
              this.numResponses = this.cleanData.cleanResponseData.numWeekResponses;
              this.numClicks = this.cleanData.cleanResponseData.numWeekClicks;
              this.opensHeader = 'Weekly Response Opens';
              this.responseHeader = 'Weekly Responses';
              this.clicksHeader = 'Weekly Response Clicks';
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
  }
</style>
