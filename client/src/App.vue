<!-- Template: This is where the HTML template for the page is defined. Apart from the static HTML, this section also contains Vue’s way of embedding dynamic content, using the double curly braces {{ }}.
Script: JavaScript rules this section, and is responsible for generating dynamic content that goes and sits within the HTML template at appropriate places. This section is primarily an object that is exported, and consists of:
Data: This is a function itself, and usually it returns some desired data encapsulated within a nice data structure.
Methods: An object that consists of one or more functions/methods, each of which usually manipulates data in some way or the other, and also controls the dynamic content of the HTML template.
Computed: Much like the method object discussed above with one important distinction — while all the functions within the method object are executed whenever any one of them is called, the functions within the computed object behaves much more sensibly, and executes if and only if it has been called.
Style: This section is for CSS styling that applies to the HTML of the page (written within template) — put the good old CSS here to make your pages beautiful! -->
<template>
  <div id="app">

    <sidebar v-bind:cleanData="cleanData"></sidebar>
<!--    <home></home>-->
<!--    <students_graphs ></students_graphs>-->
<!--    <fusioncharts-->
<!--        :type="type"-->
<!--        :width="width"-->
<!--        :height="height"-->
<!--        :dataFormat="dataFormat"-->
<!--        :dataSource="dataSource">-->
<!--    </fusioncharts>-->
  </div>

</template>

<script>
import SideBar from './components/SideBar';
import Home from './components/Home';
import RequestsPage from './components/RequestsPage';
import ResponsesPage from './components/ResponsesPage';
import moment from "moment";

export default {
  name: 'app',
  components: {
      'sidebar' : SideBar,
      'home' : Home,
      'requests' : RequestsPage,
      'responses' : ResponsesPage
  },
  data () {
    return {
      filename: 'App.vue',
      rawAskData: '',
      rawSendGridData: '',
      rawRequestData: '',
      rawResponseData: '',
      today: '',
      week: '',
      cleanData: {
        cleanFullData: {
          numTotalEmails: 0,
          numTotalOpens: 0,
          numTotalClicks: 0,
          emailsCount: [],
          opensCount: [],
          clicksCount: [],
        },
        cleanRequestData: {
            numRequests: 0,
            numTodayRequests: 0,
            numWeekRequests: 0,
            numOpens: 0,
            numTodayOpens: 0,
            numWeekOpens: 0,
            numClicks: 0,
            numTodayClicks: 0,
            numWeekClicks: 0,
            numEmails: 0,
            openCount: [],
            openTodayCount: [],
            openWeekCount: [],
            clicksCount: [],
            clicksTodayCount: [],
            clicksWeekCount: [],
            hourlyOpenCount: [],
            hourlyTodayOpenCount: [],
            hourlyWeekOpenCount: [],
            hourlyClicksCount: [],
            hourlyTodayClicksCount: [],
            hourlyWeekClicksCount: [],
            hourlyRequestCount: [],
            statusCount: [],
            statusTodayCount: [],
            statusWeekCount: [],
            emailCount: [],
            emailTodayCount: [],
            emailWeekCount: [],
            requestCount: [],
            openRate: [],
            openTodayRate: [],
            openWeekRate: [],
            clickRate: [],
            clickTodayRate: [],
            clickWeekRate: [],
            weekdayCount: [],
            weekdayTodayCount: [],
            weekdayWeekCount: [],
        },
        cleanResponseData: {
            numResponses: 0,
            numTodayResponses: 0,
            numWeekResponses: 0,
            numOpens: 0,
            numTodayOpens: 0,
            numWeekOpens: 0,
            numClicks: 0,
            numTodayClicks: 0,
            numWeekClicks: 0,
            numEmails: 0,
            openCount: [],
            openTodayCount: [],
            openWeekCount: [],
            clicksCount: [],
            clicksTodayCount: [],
            clicksWeekCount: [],
            hourlyOpenCount: [],
            hourlyTodayOpenCount: [],
            hourlyWeekOpenCount: [],
            hourlyClicksCount: [],
            hourlyTodayClicksCount: [],
            hourlyWeekClicksCount: [],
            hourlyResponseCount: [],
            statusCount: [],
            statusTodayCount: [],
            statusWeekCount: [],
            emailCount: [],
            emailTodayCount: [],
            emailWeekCount: [],
            responseCount: [],
            openRate: [],
            openTodayRate: [],
            openWeekRate: [],
            clickRate: [],
            clickTodayRate: [],
            clickWeekRate: [],
            weekdayCount: [],
            weekdayTodayCount: [],
            weekdayWeekCount: [],

        }
      }
    }
  },
  methods: {
    setDevServer: async function(axios, path) { //Determines whether we are using a proxy server or not
          return new Promise(resolve => {
              axios.get(path)
                  .then(response => {
                      if (response.status === 200) { resolve(''); }
                  })
                  .catch(err => {
                      axios.get('http://localhost:80' + path) // We are using a proxy server
                          .then(response => {
                              if (response.status === 200) { resolve('http://localhost:80'); }
                          })
                        .catch(err => {
                          axios.get('http://34.74.129.63' + path) // We are using a proxy server
                            .then(response => {
                              if (response.status === 200) { resolve('http://34.74.129.63'); }
                            })
                            .catch(err => alert(err.message));
                        });
          });
        });
      },
      fetchSendGridData: async function() {
          const axios = require('axios');
          let self = this;
          let path = "/api/open/";
          let server = await self.setDevServer(axios, path);

          return axios.get(server + path).then(function(response) {
              if (response.status === 200) {
                  self.rawSendGridData = response.data.messages;
              }
          });
      },
      getSetRequestsResponses: function() {
        let requests = [];
        let responses = [];
        let email_count = [];
        let opens_count = [];
        let clicks_count = [];

        let total_opens = 0;
        let total_clicks = 0;

        for (let message of this.rawSendGridData) {
            if (message['subject'].includes("Can you help")) {
                requests.push(message);
            } else if (message['subject'].includes("FYI, we've got a new response") ||
                message['subject'].includes("You have help!") ||
                message['subject'].includes("We've received new feedback from a member")) {
                responses.push(message);
            }
          let date = message['last_event_time'].substring(0,10);
          email_count[date] = email_count[date] || 0;
          email_count[date] += 1;
          opens_count[date] = opens_count[date] || 0;
          opens_count[date] += message['opens_count'];
          clicks_count[date] = clicks_count[date] || 0;
          clicks_count[date] += message["clicks_count"];

          total_opens = total_opens + message['opens_count'];
          total_clicks = total_clicks + message['clicks_count'];

        }

        for (let i in email_count) {
          if (email_count.hasOwnProperty(i)) {
            this.cleanData.cleanFullData.emailsCount.push({date:i,counts:email_count[i]});
          }
        }
        for (let i in opens_count) {
          if (opens_count.hasOwnProperty(i)) {
            this.cleanData.cleanFullData.opensCount.push({date:i,counts:opens_count[i]});
          }
        }
        for (let i in clicks_count) {
          if (clicks_count.hasOwnProperty(i)) {
            this.cleanData.cleanFullData.clicksCount.push({date:i,counts:clicks_count[i]});
          }
        }
        this.cleanData.cleanFullData.numTotalOpens = total_opens;
        this.cleanData.cleanFullData.numTotalClicks = total_clicks;
        this.today = moment().format('YYYY-MM-DD');
        let week = moment().subtract(7, 'days').calendar();
        this.week = week.substr(6,) + '-' + week.substr(0,2) + '-' + week.substr(3,3);
        this.rawRequestData = requests;
        this.rawResponseData = responses;
      },
      getSetRequestDailyOpensClicks: function() {
        let numRequests = this.rawRequestData.length;
        this.cleanData.cleanRequestData.numRequests = this.rawRequestData.length;
        this.cleanData.cleanFullData.numTotalEmails = this.rawSendGridData.length;

        if (numRequests > 0) {
          let opens_count = {};
          let opens_today_count = {};
          let opens_week_count = {};

          let clicks_count = {};
          let clicks_today_count = {};
          let clicks_week_count = {};

          let email_count = {};

          for (let i = 0; i < numRequests; i++) {
            let date = this.rawRequestData[i].last_event_time.substring(0,10);
            if (date == this.today) {
              this.cleanData.cleanRequestData.numTodayRequests += 1;
              this.cleanData.cleanRequestData.numTodayOpens += this.rawRequestData[i].opens_count;
              this.cleanData.cleanRequestData.numTodayClicks += this.rawRequestData[i].clicks_count;
              opens_today_count[date] = opens_today_count[date] || 0;
              opens_today_count[date] += this.rawRequestData[i].opens_count;
              clicks_today_count[date] = clicks_today_count[date] || 0;
              clicks_today_count[date] += this.rawRequestData[i].clicks_count;
            }
            if (date > this.week) {
              this.cleanData.cleanRequestData.numWeekRequests += 1;
              this.cleanData.cleanRequestData.numWeekOpens += this.rawRequestData[i].opens_count;
              this.cleanData.cleanRequestData.numWeekClicks+= this.rawRequestData[i].clicks_count;
              opens_week_count[date] = opens_week_count[date] || 0;
              opens_week_count[date] += this.rawRequestData[i].opens_count;
              clicks_week_count[date] = clicks_week_count[date] || 0;
              clicks_week_count[date] += this.rawRequestData[i].clicks_count;
            }
            opens_count[date] = opens_count[date] || 0;
            opens_count[date] += this.rawRequestData[i].opens_count;
            this.cleanData.cleanRequestData.numOpens += this.rawRequestData[i].opens_count;
            clicks_count[date] = clicks_count[date] || 0;
            clicks_count[date] += this.rawRequestData[i].clicks_count;
            this.cleanData.cleanRequestData.numClicks += this.rawRequestData[i].clicks_count;

            email_count[date] = email_count[date] || 0;
            email_count[date] += 1;
            this.cleanData.cleanRequestData.numEmails+= 1;
          }
          for (let i in opens_today_count) {
            if (opens_today_count.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.openTodayCount.push({date:i,counts:opens_week_count[i]});
            }
          }
          for (let i in clicks_today_count) {
            if (clicks_today_count.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.clicksTodayCount.push({date:i,counts:clicks_week_count[i]});
            }
          }
          for (let i in opens_week_count) {
            if (opens_week_count.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.openWeekCount.push({date:i,counts:opens_week_count[i]});
            }
          }
          for (let i in clicks_week_count) {
            if (clicks_week_count.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.clicksWeekCount.push({date:i,counts:clicks_week_count[i]});
            }
          }
          for (let i in opens_count) {
            if (opens_count.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.openCount.push({date:i,counts:opens_count[i]});
            }
          }
          for (let i in clicks_count) {
            if (clicks_count.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.clicksCount.push({date:i,counts:clicks_count[i]});
            }
          }
          for (let i in email_count) {
            if (email_count.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.requestCount.push({date:i,counts:email_count[i]});
            }
          }
        }
      },
      getSetRequestHourlyOpensClicks: function() {
        let numRequests = this.rawRequestData.length;

        if (numRequests > 0) {
            let hourly_opens_count = {};
            let hourly_today_opens_count = {};
            let hourly_week_opens_count = {};

            let hourly_clicks_count = {};
            let hourly_today_clicks_count = {};
            let hourly_week_clicks_count = {};

            let hourly_email_count = {};

            for (let i = 0; i < numRequests; i++) {
              let date = this.rawRequestData[i].last_event_time.substring(0,10);
              let hour = this.rawRequestData[i].last_event_time.substring(11,13);
              if (hour.substring(0,1) == "0"){
                  hour = hour.substring(1,2);
              }

              if (date == this.today) {
                hourly_today_opens_count[date] = hourly_today_opens_count[date] || 0;
                hourly_today_opens_count[date] += this.rawRequestData[i].opens_count;
                hourly_today_clicks_count[date] = hourly_today_clicks_count[date] || 0;
                hourly_today_clicks_count[date] += this.rawRequestData[i].clicks_count;
              }

              if (date > this.week) {
                hourly_week_opens_count[date] = hourly_week_opens_count[date] || 0;
                hourly_week_opens_count[date] += this.rawRequestData[i].opens_count;
                hourly_week_clicks_count[date] = hourly_week_clicks_count[date] || 0;
                hourly_week_clicks_count[date] += this.rawRequestData[i].clicks_count;
              }

                hourly_opens_count[hour] = hourly_opens_count[hour] || 0;
                hourly_opens_count[hour] += this.rawRequestData[i].opens_count;
                hourly_clicks_count[hour] = hourly_clicks_count[hour] || 0;
                hourly_clicks_count[hour] += this.rawRequestData[i].clicks_count;
                hourly_email_count[hour] = hourly_email_count[hour] || 0;
                hourly_email_count[hour] += 1;
            }
            for (let i in hourly_today_opens_count) {
              if (hourly_today_opens_count.hasOwnProperty(i)) {
                this.cleanData.cleanRequestData.hourlyTodayOpenCount.push({hour:i,counts:hourly_today_opens_count[i]});
              }
            }
            for (let i in hourly_week_opens_count) {
              if (hourly_week_opens_count.hasOwnProperty(i)) {
                this.cleanData.cleanRequestData.hourlyWeekOpenCount.push({hour:i,counts:hourly_week_opens_count[i]});
              }
            }
            for (let i in hourly_today_clicks_count) {
              if (hourly_today_clicks_count.hasOwnProperty(i)) {
                this.cleanData.cleanRequestData.hourlyTodayClicksCount.push({hour:i,counts:hourly_today_clicks_count[i]});
              }
            }
            for (let i in hourly_week_clicks_count) {
              if (hourly_week_clicks_count.hasOwnProperty(i)) {
                this.cleanData.cleanRequestData.hourlyWeekClicksCount.push({hour:i,counts:hourly_week_clicks_count[i]});
              }
            }
            for (let i in hourly_opens_count) {
                if (hourly_opens_count.hasOwnProperty(i)) {
                    this.cleanData.cleanRequestData.hourlyOpenCount.push({hour:i,counts:hourly_opens_count[i]});
                }
            }
            for (let i in hourly_clicks_count) {
                if (hourly_clicks_count.hasOwnProperty(i)) {
                    this.cleanData.cleanRequestData.hourlyClicksCount.push({hour:i,counts:hourly_clicks_count[i]});
                }
            }
            for (let i in hourly_email_count) {
                if (hourly_email_count.hasOwnProperty(i)) {
                    this.cleanData.cleanRequestData.hourlyRequestCount.push({hour:i,counts:hourly_email_count[i]});
                }
            }
        }
      },
      getSetResponseDailyOpensClicks: function() {
        let numResponses = this.rawResponseData.length;
        this.cleanData.cleanResponseData.numResponses = this.rawResponseData.length;

        if (numResponses > 0) {
          let opens_count = {};
          let opens_today_count = {};
          let opens_week_count = {};

          let email_count = {};

          let clicks_count = {};
          let clicks_today_count = {};
          let clicks_week_count = {};

          for (let i = 0; i < numResponses; i++) {
            let date = this.rawResponseData[i].last_event_time.substring(0,10);
            if (date == this.today) {
              this.cleanData.cleanResponseData.numTodayResponses += 1;
              this.cleanData.cleanResponseData.numTodayOpens += this.rawResponseData[i].opens_count;
              this.cleanData.cleanResponseData.numTodayClicks += this.rawResponseData[i].clicks_count;
              opens_today_count[date] = opens_today_count[date] || 0;
              opens_today_count[date] += this.rawResponseData[i].opens_count;
              clicks_today_count[date] = clicks_today_count[date] || 0;
              clicks_today_count[date] += this.rawResponseData[i].clicks_count;
            }
            if (date > this.week) {
              this.cleanData.cleanResponseData.numWeekResponses += 1;
              this.cleanData.cleanResponseData.numWeekOpens += this.rawResponseData[i].opens_count;
              this.cleanData.cleanResponseData.numWeekClicks += this.rawResponseData[i].clicks_count;
              opens_week_count[date] = opens_week_count[date] || 0;
              opens_week_count[date] += this.rawResponseData[i].opens_count;
              clicks_week_count[date] = clicks_week_count[date] || 0;
              clicks_week_count[date] += this.rawResponseData[i].clicks_count;
            }
            opens_count[date] = opens_count[date] || 0;
            opens_count[date] += this.rawResponseData[i].opens_count;
            this.cleanData.cleanResponseData.numOpens += this.rawResponseData[i].opens_count;
            clicks_count[date] = clicks_count[date] || 0;
            clicks_count[date] += this.rawResponseData[i].clicks_count;
            this.cleanData.cleanResponseData.numClicks += this.rawResponseData[i].clicks_count;

            email_count[date] = email_count[date] || 0;
            email_count[date] += 1;
            this.cleanData.cleanResponseData.numEmails += 1;
          }
          for (let i in opens_today_count) {
            if (opens_today_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.openTodayCount.push({date:i,counts:opens_week_count[i]});
            }
          }
          for (let i in clicks_today_count) {
            if (clicks_today_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.clicksTodayCount.push({date:i,counts:clicks_week_count[i]});
            }
          }
          for (let i in opens_week_count) {
            if (opens_week_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.openWeekCount.push({date:i,counts:opens_week_count[i]});
            }
          }
          for (let i in clicks_week_count) {
            if (clicks_week_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.clicksWeekCount.push({date:i,counts:clicks_week_count[i]});
            }
          }
          for (let i in opens_count) {
            if (opens_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.openCount.push({date:i,counts:opens_count[i]});
            }
          }
          for (let i in clicks_count) {
            if (clicks_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.clicksCount.push({date:i,counts:clicks_count[i]});
            }
          }
          for (let i in email_count) {
            if (email_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.responseCount.push({date:i,counts:email_count[i]});
            }
          }
        }
      },
    getSetResponseHourlyOpensClicks: function() {
      let numResponses = this.rawResponseData.length;

      if (numResponses > 0) {
        let hourly_opens_count = {};
        let hourly_today_opens_count = {};
        let hourly_week_opens_count = {};

        let hourly_clicks_count = {};
        let hourly_today_clicks_count = {};
        let hourly_week_clicks_count = {};

        let hourly_email_count = {};

        for (let i = 0; i < numResponses; i++) {
          let date = this.rawResponseData[i].last_event_time.substring(0,10);
          let hour = this.rawResponseData[i].last_event_time.substring(11,13);
          if (hour.substring(0,1) == "0"){
            hour = hour.substring(1,2);
          }

          if (date == this.today) {
            hourly_today_opens_count[date] = hourly_today_opens_count[date] || 0;
            hourly_today_opens_count[date] += this.rawResponseData[i].opens_count;
            hourly_today_clicks_count[date] = hourly_today_clicks_count[date] || 0;
            hourly_today_clicks_count[date] += this.rawResponseData[i].clicks_count;
          }

          if (date > this.week) {
            hourly_week_opens_count[date] = hourly_week_opens_count[date] || 0;
            hourly_week_opens_count[date] += this.rawResponseData[i].opens_count;
            hourly_week_clicks_count[date] = hourly_week_clicks_count[date] || 0;
            hourly_week_clicks_count[date] += this.rawResponseData[i].clicks_count;
          }

          hourly_opens_count[hour] = hourly_opens_count[hour] || 0;
          hourly_opens_count[hour] += this.rawResponseData[i].opens_count;
          hourly_clicks_count[hour] = hourly_clicks_count[hour] || 0;
          hourly_clicks_count[hour] += this.rawResponseData[i].clicks_count;
          hourly_email_count[hour] = hourly_email_count[hour] || 0;
          hourly_email_count[hour] += 1;
        }
        for (let i in hourly_today_opens_count) {
          if (hourly_today_opens_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.hourlyTodayOpenCount.push({hour:i,counts:hourly_today_opens_count[i]});
          }
        }
        for (let i in hourly_week_opens_count) {
          if (hourly_week_opens_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.hourlyWeekOpenCount.push({hour:i,counts:hourly_week_opens_count[i]});
          }
        }
        for (let i in hourly_today_clicks_count) {
          if (hourly_today_clicks_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.hourlyTodayClicksCount.push({hour:i,counts:hourly_today_clicks_count[i]});
          }
        }
        for (let i in hourly_week_clicks_count) {
          if (hourly_week_clicks_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.hourlyWeekClicksCount.push({hour:i,counts:hourly_week_clicks_count[i]});
          }
        }
        for (let i in hourly_opens_count) {
          if (hourly_opens_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.hourlyOpenCount.push({hour:i,counts:hourly_opens_count[i]});
          }
        }
        for (let i in hourly_clicks_count) {
          if (hourly_clicks_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.hourlyClicksCount.push({hour:i,counts:hourly_clicks_count[i]});
          }
        }
        for (let i in hourly_email_count) {
          if (hourly_email_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.hourlyResponseCount.push({hour:i,counts:hourly_email_count[i]});
          }
        }
      }
    },
    getSetRequestStatusCounts: function(){
        let numRequests = this.rawRequestData.length;

        if (numRequests > 0) {
          let request_status_count = {};
          let request_today_status_count = {};
          let request_week_status_count = {};

          for (let i = 0; i < numRequests; i++) {
            let date = this.rawRequestData[i].last_event_time.substring(0,10);
            if (date == this.today) {
              let request_status = this.rawRequestData[i].status;
              request_today_status_count[request_status] = request_today_status_count[request_status] || 0;
              request_today_status_count[request_status] += 1;
            }
            if (date > this.week) {
              let request_status = this.rawRequestData[i].status;
              request_week_status_count[request_status] = request_week_status_count[request_status] || 0;
              request_week_status_count[request_status] += 1;
            }

              let request_status = this.rawRequestData[i].status;
              request_status_count[request_status] = request_status_count[request_status] || 0;
              request_status_count[request_status] += 1;
            }
          for (let i in request_today_status_count) {
            if (request_today_status_count.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.statusTodayCount.push({status:i,counts:request_today_status_count[i]});
            }
          }
          for (let i in request_week_status_count) {
            if (request_week_status_count.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.statusWeekCount.push({status:i,counts:request_week_status_count[i]});
            }
          }
          for (let i in request_status_count) {
                  if (request_status_count.hasOwnProperty(i)) {
                      this.cleanData.cleanRequestData.statusCount.push({status:i,counts:request_status_count[i]});
                  }
          }
        }
      },
    getSetResponseStatusCounts: function(){
      let numResponses = this.rawResponseData.length;

      if (numResponses > 0) {
        let response_status_count = {};
        let response_today_status_count = {};
        let response_week_status_count = {};

        for (let i = 0; i < numResponses; i++) {
          let date = this.rawResponseData[i].last_event_time.substring(0,10);
          if (date == this.today) {
            let response_status = this.rawResponseData[i].status;
            response_today_status_count[response_status] = response_today_status_count[response_status] || 0;
            response_today_status_count[response_status] += 1;
          }
          if (date > this.week) {
            let response_status = this.rawResponseData[i].status;
            response_week_status_count[response_status] = response_week_status_count[response_status] || 0;
            response_week_status_count[response_status] += 1;
          }

          let response_status = this.rawResponseData[i].status;
          response_status_count[response_status] = response_status_count[response_status] || 0;
          response_status_count[response_status] += 1;
        }
        for (let i in response_today_status_count) {
          if (response_today_status_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.statusTodayCount.push({status:i,counts:response_today_status_count[i]});
          }
        }
        for (let i in response_week_status_count) {
          if (response_week_status_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.statusWeekCount.push({status:i,counts:response_week_status_count[i]});
          }
        }
        for (let i in response_status_count) {
          if (response_status_count.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.statusCount.push({status:i,counts:response_status_count[i]});
          }
        }
      }
    },
    getSetRequestEmailCounts: function(){
        let numResponses = this.rawRequestData.length

        if (numResponses > 0) {
          let from_email_count = {};
          let from_today_email_count = {};
          let from_week_email_count = {};

          for (let i = 0; i < numResponses; i++) {
              let date = this.rawRequestData[i].last_event_time.substring(0,10);
              let from_email = this.rawRequestData[i].from_email.split('@')[0];

              if (date == this.today) {
                from_today_email_count[from_email] = from_today_email_count[from_email] || 0;
                from_today_email_count[from_email] += 1;
              }

              if (date > this.week) {
                from_week_email_count[from_email] = from_week_email_count[from_email] || 0;
                from_week_email_count[from_email] += 1;
              }

              from_email_count[from_email] = from_email_count[from_email] || 0;
              from_email_count[from_email] += 1;
            }

        if (from_email_count.length < 6){
            for (let i in from_email_count) {
              if (from_email_count.hasOwnProperty(i)) {
                  this.cleanData.cleanRequestData.emailCount.push({email:i,counts:from_email_count[i]});
              }
            }
          }else{
            let array = [];
            for (let key in from_email_count) {
              array.push({
                label: key,
                value: from_email_count[key]
              });
            }

            let sorted = array.sort(function(a, b) {
              return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0)
            });

            let length = Math.min(5, sorted.length);
            for (let i = 0; i < length; i++){
              this.cleanData.cleanRequestData.emailCount.push({email:sorted[i].label,counts:sorted[i].value});
            }
            if (length > 5) {
              let remainder = 0;
              for (let i = 5; i < sorted.length; i++){
                remainder = remainder + sorted[i].value
              }
              this.cleanData.cleanRequestData.emailCount.push({email:"Other",counts:remainder});
            }
          }

          if (from_today_email_count.length < 6){
            for (let i in from_today_email_count) {
              if (from_today_email_count.hasOwnProperty(i)) {
                this.cleanData.cleanRequestData.emailTodayCount.push({email:i,counts:from_today_email_count[i]});
              }
            }
          }else{
            let array = [];
            for (let key in from_today_email_count) {
              array.push({
                label: key,
                value: from_today_email_count[key]
              });
            }

            let sorted = array.sort(function(a, b) {
              return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0)
            });

            let length = Math.min(5, sorted.length);
            for (let i = 0; i < length; i++){
              this.cleanData.cleanRequestData.emailTodayCount.push({email:sorted[i].label,counts:sorted[i].value});
            }
            if (length > 5) {
              let remainder = 0;
              for (let i = 5; i < sorted.length; i++){
                remainder = remainder + sorted[i].value
              }
              this.cleanData.cleanRequestData.emailTodayCount.push({email:"Other",counts:remainder});
            }
          }


          if (from_week_email_count.length < 6){
            for (let i in from_week_email_count) {
              if (from_week_email_count.hasOwnProperty(i)) {
                this.cleanData.cleanRequestData.emailWeekCount.push({email:i,counts:from_week_email_count[i]});
              }
            }
          }else{
            let array = [];
            for (let key in from_week_email_count) {
              array.push({
                label: key,
                value: from_week_email_count[key]
              });
            }

            let sorted = array.sort(function(a, b) {
              return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0)
            });

            let length = Math.min(5, sorted.length);
            for (let i = 0; i < length; i++){
              this.cleanData.cleanRequestData.emailWeekCount.push({email:sorted[i].label,counts:sorted[i].value});
            }
            if (length > 5) {
              let remainder = 0;
              for (let i = 5; i < sorted.length; i++){
                remainder = remainder + sorted[i].value
              }
              this.cleanData.cleanRequestData.emailWeekCount.push({email:"Other",counts:remainder});
            }
          }
        }
      },
    getSetResponseEmailCounts: function(){
      let numResponses = this.rawResponseData.length

      if (numResponses > 0) {
        let from_email_count = {};
        let from_today_email_count = {};
        let from_week_email_count = {};

        for (let i = 0; i < numResponses; i++) {
          let date = this.rawResponseData[i].last_event_time.substring(0,10);
          let from_email = this.rawResponseData[i].from_email.split('@')[0];

          if (date == this.today) {
            from_today_email_count[from_email] = from_today_email_count[from_email] || 0;
            from_today_email_count[from_email] += 1;
          }

          if (date > this.week) {
            from_week_email_count[from_email] = from_week_email_count[from_email] || 0;
            from_week_email_count[from_email] += 1;
          }

          from_email_count[from_email] = from_email_count[from_email] || 0;
          from_email_count[from_email] += 1;
        }

        if (from_email_count.length < 6){
          for (let i in from_email_count) {
            if (from_email_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.emailCount.push({email:i,counts:from_email_count[i]});
            }
          }
        }else{
          let array = [];
          for (let key in from_email_count) {
            array.push({
              label: key,
              value: from_email_count[key]
            });
          }

          let sorted = array.sort(function(a, b) {
            return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0)
          });

          let length = Math.min(5, sorted.length);
          for (let i = 0; i < 5; i++){
            this.cleanData.cleanResponseData.emailCount.push({email:sorted[i].label,counts:sorted[i].value});
          }
          if (length > 5) {
            let remainder = 0;
            for (let i = 5; i < sorted.length; i++){
              remainder = remainder + sorted[i].value
            }
            this.cleanData.cleanResponseData.emailCount.push({email:"Other",counts:remainder});
          }
        }

        if (from_today_email_count.length < 6){
          for (let i in from_today_email_count) {
            if (from_today_email_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.emailTodayCount.push({email:i,counts:from_today_email_count[i]});
            }
          }
        }else{
          let array = [];
          for (let key in from_today_email_count) {
            array.push({
              label: key,
              value: from_today_email_count[key]
            });
          }

          let sorted = array.sort(function(a, b) {
            return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0)
          });

          let length = Math.min(5, sorted.length);
          for (let i = 0; i < length; i++){
            this.cleanData.cleanResponseData.emailTodayCount.push({email:sorted[i].label,counts:sorted[i].value});
          }
          if (length > 5) {
            let remainder = 0;
            for (let i = 5; i < sorted.length; i++){
              remainder = remainder + sorted[i].value
            }
            this.cleanData.cleanResponseData.emailTodayCount.push({email:"Other",counts:remainder});
          }
        }

        if (from_week_email_count.length < 6){
          for (let i in from_week_email_count) {
            if (from_week_email_count.hasOwnProperty(i)) {
              this.cleanData.cleanResponseData.emailWeekCount.push({email:i,counts:from_week_email_count[i]});
            }
          }
        }else{
          let array = [];
          for (let key in from_week_email_count) {
            array.push({
              label: key,
              value: from_week_email_count[key]
            });
          }

          let sorted = array.sort(function(a, b) {
            return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0)
          });

          let length = Math.min(5, sorted.length);
          for (let i = 0; i < length; i++){
            this.cleanData.cleanResponseData.emailWeekCount.push({email:sorted[i].label,counts:sorted[i].value});
          }
          if (length > 5) {
            let remainder = 0;
            for (let i = 5; i < sorted.length; i++){
              remainder = remainder + sorted[i].value
            }
            this.cleanData.cleanResponseData.emailWeekCount.push({email:"Other",counts:remainder});
          }
        }
      }
    },
    getSetRequestOpenClickRate: function(){
        let numResponses = this.rawRequestData.length;

        if (numResponses > 0) {
          let open_rate = {};
          open_rate["Unopened"] = 0;
          open_rate["Opened"] = 0;

          let open_today_rate = {};
          open_today_rate["Unopened"] = 0;
          open_today_rate["Opened"] = 0;

          let open_week_rate = {};
          open_week_rate["Unopened"] = 0;
          open_week_rate["Opened"] = 0;

          let click_rate = {};
          click_rate["Unclicked"] = 0;
          click_rate["Clicked"] = 0;

          let click_today_rate = {};
          click_today_rate["Unclicked"] = 0;
          click_today_rate["Clicked"] = 0;

          let click_week_rate = {};
          click_week_rate["Unclicked"] = 0;
          click_week_rate["Clicked"] = 0;

          for (let i = 0; i < numResponses; i++) {
            let date = this.rawRequestData[i].last_event_time.substring(0,10);
            if (date == this.today) {
              if (this.rawRequestData[i].opens_count == 0){
                open_today_rate["Unopened"] += 1
              }else{
                open_today_rate["Opened"] += 1
              }
              if (this.rawRequestData[i].clicks_count == 0){
                click_today_rate["Unclicked"] += 1
              }else{
                click_today_rate["Clicked"] += 1
              }
            }

            if (date > this.week) {
              if (this.rawRequestData[i].opens_count == 0){
                open_week_rate["Unopened"] += 1
              }else{
                open_week_rate["Opened"] += 1
              }
              if (this.rawRequestData[i].clicks_count == 0){
                click_week_rate["Unclicked"] += 1
              }else{
                click_week_rate["Clicked"] += 1
              }
            }

            if (this.rawRequestData[i].opens_count == 0){
              open_rate["Unopened"] += 1
            }else{
              open_rate["Opened"] += 1
            }
            if (this.rawRequestData[i].clicks_count == 0){
              click_rate["Unclicked"] += 1
            }else{
              click_rate["Clicked"] += 1
            }
          }
          for (let i in open_today_rate) {
            if (open_today_rate.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.openTodayRate.push({status:i,count:open_today_rate[i]});
            }
          }
          for (let i in open_week_rate) {
            if (open_week_rate.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.openWeekRate.push({status:i,count:open_week_rate[i]});
            }
          }
          for (let i in click_today_rate) {
            if (click_today_rate.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.clickTodayRate.push({status:i,count:click_today_rate[i]});
            }
          }
          for (let i in click_week_rate) {
            if (click_week_rate.hasOwnProperty(i)) {
              this.cleanData.cleanRequestData.clickWeekRate.push({status:i,count:click_week_rate[i]});
            }
          }
          for (let i in open_rate) {
            if (open_rate.hasOwnProperty(i)) {
                this.cleanData.cleanRequestData.openRate.push({status:i,count:open_rate[i]});
            }
          }
          for (let i in click_rate) {
            if (click_rate.hasOwnProperty(i)) {
                this.cleanData.cleanRequestData.clickRate.push({status:i,count:click_rate[i]});
            }
          }
        }
      },
    getSetResponseOpenClickRate: function() {
      let numResponses = this.rawResponseData.length;

      if (numResponses > 0) {
        let open_rate = {};
        open_rate["Unopened"] = 0;
        open_rate["Opened"] = 0;

        let open_today_rate = {};
        open_today_rate["Unopened"] = 0;
        open_today_rate["Opened"] = 0;

        let open_week_rate = {};
        open_week_rate["Unopened"] = 0;
        open_week_rate["Opened"] = 0;

        let click_rate = {};
        click_rate["Unclicked"] = 0;
        click_rate["Clicked"] = 0;

        let click_today_rate = {};
        click_today_rate["Unclicked"] = 0;
        click_today_rate["Clicked"] = 0;

        let click_week_rate = {};
        click_week_rate["Unclicked"] = 0;
        click_week_rate["Clicked"] = 0;

        for (let i = 0; i < numResponses; i++) {
          let date = this.rawResponseData[i].last_event_time.substring(0, 10);
          if (date == this.today) {
            if (this.rawResponseData[i].opens_count == 0) {
              open_today_rate["Unopened"] += 1
            } else {
              open_today_rate["Opened"] += 1
            }
            if (this.rawResponseData[i].clicks_count == 0) {
              click_today_rate["Unclicked"] += 1
            } else {
              click_today_rate["Clicked"] += 1
            }
          }

          if (date > this.week) {
            if (this.rawResponseData[i].opens_count == 0) {
              open_week_rate["Unopened"] += 1
            } else {
              open_week_rate["Opened"] += 1
            }
            if (this.rawResponseData[i].clicks_count == 0) {
              click_week_rate["Unclicked"] += 1
            } else {
              click_week_rate["Clicked"] += 1
            }
          }

          if (this.rawResponseData[i].opens_count == 0) {
            open_rate["Unopened"] += 1
          } else {
            open_rate["Opened"] += 1
          }
          if (this.rawResponseData[i].clicks_count == 0) {
            click_rate["Unclicked"] += 1
          } else {
            click_rate["Clicked"] += 1
          }
        }
        for (let i in open_today_rate) {
          if (open_today_rate.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.openTodayRate.push({status:i,count:open_today_rate[i]});
          }
        }
        for (let i in open_week_rate) {
          if (open_week_rate.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.openWeekRate.push({status:i,count:open_week_rate[i]});
          }
        }
        for (let i in click_today_rate) {
          if (click_today_rate.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.clickTodayRate.push({status:i,count:click_today_rate[i]});
          }
        }
        for (let i in click_week_rate) {
          if (click_week_rate.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.clickWeekRate.push({status:i,count:click_week_rate[i]});
          }
        }
        for (let i in open_rate) {
          if (open_rate.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.openRate.push({status:i,count:open_rate[i]});
          }
        }
        for (let i in click_rate) {
          if (click_rate.hasOwnProperty(i)) {
            this.cleanData.cleanResponseData.clickRate.push({status:i,count:click_rate[i]});
          }
        }
      }
    },
      getSetResponseWeekdayCounts: function() {
      let numResponses = this.rawResponseData.length;

      if (numResponses > 0) {
        let weekday_count = {};
        let weekdayToday_count = {};
        let weekdayWeek_count = {};

        for (let i = 0; i < numResponses; i++) {
          let day = moment(this.rawResponseData[i].last_event_time.substring(0,10), "YYYY-MM-DD").format('dddd');
          let date = this.rawResponseData[i].last_event_time.substring(0,10);
          if (date == this.today) {
            weekdayToday_count[day] = weekdayToday_count[day] || 0;
            weekdayToday_count[day] += 1;
          }

          if (date > this.week) {
            weekdayWeek_count[day] = weekdayWeek_count[day] || 0;
            weekdayWeek_count[day] += 1;
          }

          weekday_count[day] = weekday_count[day] || 0;
          weekday_count[day] += 1;

        }
        let weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        for (let i = 0; i < weekdays.length; i++) {
          this.cleanData.cleanResponseData.weekdayCount.push({weekday:weekdays[i],count:weekday_count[weekdays[i]]});
          this.cleanData.cleanResponseData.weekdayTodayCount.push({weekday:weekdays[i],count:weekdayToday_count[weekdays[i]]});
          this.cleanData.cleanResponseData.weekdayWeekCount.push({weekday:weekdays[i],count:weekdayWeek_count[weekdays[i]]});
        }

      }
      },
      getSetRequestWeekdayCounts: function() {
      let numRequests = this.rawRequestData.length;

      if (numRequests > 0) {
        let weekday_count = {};
        let weekdayToday_count = {};
        let weekdayWeek_count = {};

        for (let i = 0; i < numRequests; i++) {
          let day = moment(this.rawRequestData[i].last_event_time.substring(0,10), "YYYY-MM-DD").format('dddd');
          let date = this.rawRequestData[i].last_event_time.substring(0,10);
          if (date == this.today) {
            weekdayToday_count[day] = weekdayToday_count[day] || 0;
            weekdayToday_count[day] += 1;
          }

          if (date > this.week) {
            weekdayWeek_count[day] = weekdayWeek_count[day] || 0;
            weekdayWeek_count[day] += 1;
          }

          weekday_count[day] = weekday_count[day] || 0;
          weekday_count[day] += 1;

        }
        let weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        for (let i = 0; i < weekdays.length; i++) {
          this.cleanData.cleanRequestData.weekdayCount.push({weekday:weekdays[i],count:weekday_count[weekdays[i]]});
          this.cleanData.cleanRequestData.weekdayTodayCount.push({weekday:weekdays[i],count:weekdayToday_count[weekdays[i]]});
          this.cleanData.cleanRequestData.weekdayWeekCount.push({weekday:weekdays[i],count:weekdayWeek_count[weekdays[i]]});
        }
      }


      },
    organizeAllDetails: async function() {
      // top level organization
      //   await this.fetchStudentAskData();
        await this.fetchSendGridData();
        await this.getSetRequestsResponses();
        this.getSetRequestDailyOpensClicks();
        this.getSetRequestHourlyOpensClicks();
        this.getSetResponseDailyOpensClicks();
        this.getSetResponseHourlyOpensClicks();
        this.getSetRequestStatusCounts();
        this.getSetResponseStatusCounts();
        this.getSetRequestEmailCounts();
        this.getSetResponseEmailCounts();
        this.getSetRequestOpenClickRate();
        this.getSetResponseOpenClickRate();
        this.getSetResponseWeekdayCounts();
        this.getSetRequestWeekdayCounts();

    },
  },
  mounted: async function() {
    await this.organizeAllDetails();
  }
};


</script>

<style>

</style>

