<!-- Template: This is where the HTML template for the page is defined. Apart from the static HTML, this section also contains Vue’s way of embedding dynamic content, using the double curly braces {{ }}.
Script: JavaScript rules this section, and is responsible for generating dynamic content that goes and sits within the HTML template at appropriate places. This section is primarily an object that is exported, and consists of:
Data: This is a function itself, and usually it returns some desired data encapsulated within a nice data structure.
Methods: An object that consists of one or more functions/methods, each of which usually manipulates data in some way or the other, and also controls the dynamic content of the HTML template.
Computed: Much like the method object discussed above with one important distinction — while all the functions within the method object are executed whenever any one of them is called, the functions within the computed object behaves much more sensibly, and executes if and only if it has been called.
Style: This section is for CSS styling that applies to the HTML of the page (written within template) — put the good old CSS here to make your pages beautiful! -->
<template>
  <div id="app">
<!--    <p>This component’s code is in {{ filename }}</p>-->
<!--    <sidebar></sidebar>-->

    <sidebar v-bind:cleanData="cleanData"></sidebar>
<!--    <home></home>-->
<!--    <router-view></router-view>-->
<!--    <students_graphs ></students_graphs>-->
  </div>

</template>

<script>
import SideBar from './components/SideBar';
import Home from './components/Home';
import StudentsPage from './components/StudentsPage';
import AlumniPage from './components/AlumniPage';

export default {
  name: 'app',
  components: {
      'sidebar' : SideBar,
      'home' : Home,
      'students' : StudentsPage,
      'alumni' : AlumniPage
  },
  data () {
    return {
      filename: 'App.vue',
      rawAskData: '',
      rawSendGridData: '',
      rawRequestData: '',
      rawResponseData: '',
      cleanData: {
        cleanRequestData: {
            openCount: [],
            clicksCount: [],
            hourlyOpenCount: [],
            hourlyClicksCount: [],
            statusCount: []
        },
        cleanResponseData: {
            openCount: [],
            clicksCount: [],
            hourlyOpenCount: [],
            hourlyClicksCount: [],
            statusCount: []
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
                      axios.get('http://localhost:8000' + path) // We are using a proxy server
                          .then(response => {
                              if (response.status === 200) { resolve('http://localhost:8000'); }
                          })
                          .catch(err => alert(err.message));
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
        for (let message of this.rawSendGridData) {
            if (message['subject'].includes("Can you help")) {
                requests.push(message);
            } else if (message['subject'].includes("FYI, we've got a new response") ||
                message['subject'].includes("You have help!") ||
                message['subject'].includes("We've received new feedback from a member")) {
                responses.push(message);
            }
        }
        this.rawRequestData = requests;
        this.rawResponseData = responses;
      },
      getSetRequestDailyOpensClicks: function() {
        let numRequests = this.rawRequestData.length;

        if (numRequests > 0) {
          let opens_count = {};
          let clicks_count = {};
          for (let i = 0; i < numRequests; i++) {
            let date = this.rawRequestData[i].last_event_time.substring(0,10);
            opens_count[date] = opens_count[date] || 0;
            opens_count[date] += this.rawRequestData[i].opens_count;
            clicks_count[date] = clicks_count[date] || 0;
            clicks_count[date] += this.rawRequestData[i].clicks_count;
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
        }
      },
      getSetRequestHourlyOpensClicks: function() {
        let numRequests = this.rawRequestData.length;

        if (numRequests > 0) {
            let hourly_opens_count = {};
            let hourly_clicks_count = {};
            for (let i = 0; i < numRequests; i++) {
                let hour = this.rawRequestData[i].last_event_time.substring(11,13);

                if (hour.substring(0,1) == "0"){
                    //console.log(hour.substring(0,1))
                    //console.log(hour.substring(1,2))
                    hour = hour.substring(1,2);
                }
                hourly_opens_count[hour] = hourly_opens_count[hour] || 0;
                hourly_opens_count[hour] += this.rawRequestData[i].opens_count;
                hourly_clicks_count[hour] = hourly_clicks_count[hour] || 0;
                hourly_clicks_count[hour] += this.rawRequestData[i].clicks_count;
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
        }
      },
      getSetResponseDailyOpensClicks: function() {
        let numResponses = this.rawResponseData.length;

        if (numResponses > 0) {
          let opens_count = {};
          let clicks_count = {};
          for (let i = 0; i < numResponses; i++) {
            let date = this.rawResponseData[i].last_event_time.substring(0,10);
            opens_count[date] = opens_count[date] || 0;
            opens_count[date] += this.rawResponseData[i].opens_count;
            clicks_count[date] = clicks_count[date] || 0;
            clicks_count[date] += this.rawResponseData[i].clicks_count;
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
        }
      },
      getSetResponseHourlyOpensClicks: function() {
          let numResponses = this.rawResponseData.length;

          if (numResponses > 0) {
              let hourly_opens_count = {};
              let hourly_clicks_count = {};
              for (let i = 0; i < numResponses; i++) {
                  let hour = this.rawResponseData[i].last_event_time.substring(11,13);

                  if (hour.substring(0,1) == "0"){
                      //console.log(hour.substring(0,1))
                      //console.log(hour.substring(1,2))
                      hour = hour.substring(1,2);
                  }
                  hourly_opens_count[hour] = hourly_opens_count[hour] || 0;
                  hourly_opens_count[hour] += this.rawResponseData[i].opens_count;
                  hourly_clicks_count[hour] = hourly_clicks_count[hour] || 0;
                  hourly_clicks_count[hour] += this.rawResponseData[i].clicks_count;
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
          }
      },
      getSetRequestStatusCounts: function(){
        let numResponses = this.rawRequestData.length

        if (numResponses > 0) {
          console.log(this.rawRequestData)
          let request_status_count = {};
          for (let i = 0; i < numResponses; i++) {
              let request_status = this.rawRequestData[i].status;
              request_status_count[request_status] = request_status_count[request_status] || 0;
              request_status_count[request_status] += 1;
            }
          for (let i in request_status_count) {
                  if (request_status_count.hasOwnProperty(i)) {
                      this.cleanData.cleanRequestData.statusCount.push({status:i,counts:request_status_count[i]});
                  }
              }
          console.log( this.cleanData.cleanRequestData.statusCount)
        }
      },
      getSetResponseStatusCounts: function(){
        let numResponses = this.rawResponseData.length

        if (numResponses > 0) {
          console.log(this.rawResponseData)
          let response_status_count = {};
          for (let i = 0; i < numResponses; i++) {
              let response_status = this.rawResponseData[i].status;
              response_status_count[response_status] = response_status_count[response_status] || 0;
              response_status_count[response_status] += 1;
            }
          for (let i in response_status_count) {
                  if (response_status_count.hasOwnProperty(i)) {
                      this.cleanData.cleanResponseData.statusCount.push({status:i,counts:response_status_count[i]});
                  }
              }
          console.log( this.cleanData.cleanResponseData.statusCount)
        }
      },
      organizeAllDetails: async function() {
      // top level organization
      //   await this.fetchStudentAskData();
        await this.fetchSendGridData();
        await this.getSetRequestsResponses();
        console.log(this.cleanData);
        this.getSetRequestDailyOpensClicks();
        this.getSetRequestHourlyOpensClicks();
        this.getSetResponseDailyOpensClicks();
        this.getSetResponseHourlyOpensClicks();
        this.getSetRequestStatusCounts();
        this.getSetResponseStatusCounts();
    },
  },
  mounted: async function() {
    await this.organizeAllDetails();
  }
};


</script>

<style>

</style>

