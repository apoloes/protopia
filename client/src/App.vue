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
      cleanAskData: {
        askDayCount: [
          // gets added dynamically by this.getSetDailyAsks()
        ],
        askHourCount:[
          // gets added dynamically by this.getSetHourlyAsks()
        ],
        statusCount: [
          // gets added dynamically by this.getSetStatusCount()
        ],
        communityCount: [
          // gets added dynamically by this.getSetCommunityCount()
        ],
        PosNeg:[

        ],
        TopPos: [

        ],
        TopNeg: [

        ]
      },
      rawRequestData: '',
      rawResponseData: '',
      cleanRequestData: {
        openCount: [

        ],
        clicksCount: [

        ]
      },
      cleanResponseData: {
        openCount: [

        ],
        clicksCount: [

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
          console.log(this.cleanRequestData)
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
      getSetHourlyAsks: function() {
        var arr = new Array(24).fill(0);
        for (let i = 0; i < this.rawAskData.length; i++) {
          var s = this.rawAskData[i].createdAt.substring(11, 13);
          arr[s.replace(/^0+/, '')] = arr[s.replace(/^0+/, '')] + 1;
        }

        this.cleanAskData.askHourCount = arr;
      },
      getSetStatusCount: function() {
        let arr = [];
        for (let i = 0; i < this.rawAskData.length; i++) {
          arr.push(this.rawAskData[i].status.toString());
        }

        let results = {}, i;

        for (i=0; i<arr.length; i++) {
          results[arr[i]] = results[arr[i]] || 0;
          results[arr[i]]++;
        }

        for (i in results) {
          if (results.hasOwnProperty(i)) {
            this.cleanAskData.statusCount.push({status:i,counts:results[i]});
          }
        }
      },
      getSetCommunityCount: function() {
        let arr = [];
        for (let i = 0; i < this.rawAskData.length; i++) {
          arr.push(this.rawAskData[i].community.name.toString());
        }

        let results = {}, i;

        for (i=0; i<arr.length; i++) {
          results[arr[i]] = results[arr[i]] || 0;
          results[arr[i]]++;
        }

        for (i in results) {
          if (results.hasOwnProperty(i)) {
            this.cleanAskData.communityCount.push({community:i,counts:results[i]});
          }
        }
      },
      getSetPosNeg: function(){
        var string = ""
        for (var i = 0; i < this.rawAskData.length; i++) {
          var text = this.rawAskData[i].text;
          text = text.replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/g,"");
          text = text.replace(/(\r\n|\n|\r)/gm," ");
          text = text.replace(/[^\w\s]/gi, '');
          text = text.replace(/\s\s+/g, ' ');
          text = text.replace(/[0-9]/g, '');
          string = string + " " + text.trim();
        }

        var sw = require('stopword');

        var newString = sw.removeStopwords(string.split(' '));

        var Sentiment = require('sentiment');
        var sentiment = new Sentiment();

        var result = sentiment.analyze(newString.join(' '));

        this.cleanAskData.PosNeg.push(result.comparative);

        var results = {}, i;

        for (i=0; i<result.positive.length; i++) {
          results[result.positive[i]] = results[result.positive[i]] || 0;
          results[result.positive[i]]++;
        }

        for (i in results) {
          if (results.hasOwnProperty(i)) {
            this.cleanAskData.TopPos.push({word:i,counts:results[i]});
          }
        }

        var results = {}, i;

        for (i=0; i<result.negative.length; i++) {
          results[result.negative[i]] = results[result.negative[i]] || 0;
          results[result.negative[i]]++;
        }

        for (i in results) {
          if (results.hasOwnProperty(i)) {
            this.cleanAskData.TopNeg.push({word:i,counts:results[i]});
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
        // this.getSetDailyAsks();
        // this.getSetHourlyAsks();
        // this.getSetStatusCount();
        // this.getSetCommunityCount();
        // this.getSetPosNeg();
    },
  },
  mounted: async function() {
    await this.organizeAllDetails();
  }
};


</script>

<style>

</style>

