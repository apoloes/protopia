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

    <sidebar v-bind:cleanRequestData="cleanRequestData"></sidebar>
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
      cleanRequestData: {
        openCount: [

        ],
        clicksCount: [

        ],
        hourlyOpenCount: [

        ],
        hourlyClicksCount: [

        ]
      },
      cleanResponseData: {
        openCount: [

        ],
        clicksCount: [

        ],
        hourlyOpenCount: [

        ],
        hourlyClicksCount: [
          
        ]
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
    fetchStudentAskData: async function() {
          const axios = require('axios');
          let self = this;
          let path = "/api/asks/";
          let server = await self.setDevServer(axios, path);

          return axios.get(server + path).then(function(response) {
              if (response.status === 200) {
                self.rawAskData = response.data.asks;
              }
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
      getSetRequestFields: function() {
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
              this.cleanRequestData.openCount.push({date:i,counts:opens_count[i]});
            }
          }
          for (let i in clicks_count) {
            if (clicks_count.hasOwnProperty(i)) {
              this.cleanRequestData.clicksCount.push({date:i,counts:clicks_count[i]});
            }
          }

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
              this.cleanRequestData.hourlyOpenCount.push({hour:i,counts:hourly_opens_count[i]});
            }
          }
          for (let i in hourly_clicks_count) {
            if (hourly_clicks_count.hasOwnProperty(i)) {
              this.cleanRequestData.hourlyClicksCount.push({hour:i,counts:hourly_clicks_count[i]});
            }
          }
        
        }
      },
      getSetResponseFields: function() {
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
              this.cleanResponseData.openCount.push({date:i,counts:opens_count[i]});
            }
          }
          for (let i in clicks_count) {
            if (clicks_count.hasOwnProperty(i)) {
              this.cleanResponseData.clicksCount.push({date:i,counts:clicks_count[i]});
            }
          }
        }
      },
      
      organizeAllDetails: async function() {
      // top level organization
      //   await this.fetchStudentAskData();
        await this.fetchSendGridData();
        await this.getSetRequestsResponses();
        this.getSetRequestFields();
        this.getSetRequestsResponses();
    },
  },
  mounted: async function() {
    await this.organizeAllDetails();
  }
};


</script>

<style>

</style>

