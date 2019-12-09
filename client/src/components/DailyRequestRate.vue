<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts id="dailyrequestrategraph"
        type="msspline"
        width="100%"
        height="100%"
        data-format="json"
        :data-source="dailyRequestRateChartData"
      >
      </fusioncharts>
    </div>

  </div>
</template>

<script>
    export default {
        props: ["cleanData", "time"],
        data() {
          return {
            currentData: '',
            dailyRequestRateChartData: {
              chart: {
                caption: "Daily Open, Click, and Request Rates",
                yaxisname: "Frequency",
                subcaption: "Last Month",
                numdivlines: "3",
                showvalues: "0",
                rotateLabels: "1",
                slantLabels: "1",
                plotToolText: "$label<br><hr><b>$dataValue</b>",
                theme: "fusion",
              },
              categories: [
                {
                  category: []
                }
              ],
              dataset: [
                {
                  seriesname: "Opens",
                  data: []
                },
                {
                  seriesname: "Clicks",
                  data: []
                },
                {
                  seriesname: "Requests",
                  data: []
                },
              ],
              trendlines: [{
                "line": [{
                  "startvalue": "",
                  "color": "#5D62B5",
                  "valueOnRight": "1",
                  "dashed": "1",
                  "displayvalue": ""
                },
                {
                  "startvalue": "",
                  "color": "#29C3BE",
                  "valueOnRight": "1",
                  "dashed": "1",
                  "displayvalue": ""
                },
                {
                  "startvalue": "",
                  "color": "#f2726f",
                  "valueOnRight": "1",
                  "dashed": "1",
                  "displayvalue": ""
                },
                ]
              }]
            }
          };
        },
        methods: {
          setChartData: function() {
            let openCount = this.cleanData.cleanRequestData.openCount;
            let clicksCount = this.cleanData.cleanRequestData.clicksCount;
            if (this.time == "today") {
              openCount = this.cleanData.cleanRequestData.openTodayCount;
              clicksCount = this.cleanData.cleanRequestData.clicksTodayCount;
            } else if (this.time == "week") {
              openCount = this.cleanData.cleanRequestData.openWeekCount;
              clicksCount = this.cleanData.cleanRequestData.clicksWeekCount;
            }

            let categories = [];
            let opens = [];
            let clicks = [];
            let requests = [];

            let avgClicks = 0;
            let avgOpens = 0;
            let avgRequests = 0;
            for (let i = openCount.length-1; i >= 0; i--) {
              let categoryObject = {
                label: openCount[i].date.substring(5,10),
              };
              avgOpens = avgOpens + openCount[i].counts
              let opensObject = {
                value: openCount[i].counts,
              };
              avgClicks = avgClicks + clicksCount[i].counts
              let clicksObject = {
                value: clicksCount[i].counts,
              };
              avgRequests = avgRequests + this.cleanData.cleanRequestData.requestCount[i].counts
              let requestsObject = {
                value: this.cleanData.cleanRequestData.requestCount[i].counts,
              };
              categories.push(categoryObject);
              opens.push(opensObject);
              clicks.push(clicksObject);
              requests.push(requestsObject);
            }
            this.dailyRequestRateChartData.categories[0].category = categories;
            this.dailyRequestRateChartData.dataset[0].data = opens;
            this.dailyRequestRateChartData.dataset[1].data = clicks;
            this.dailyRequestRateChartData.dataset[2].data = requests;
            this.dailyRequestRateChartData.trendlines[0].line[0].startvalue = avgOpens / openCount.length
            this.dailyRequestRateChartData.trendlines[0].line[1].startvalue = avgClicks / openCount.length
            this.dailyRequestRateChartData.trendlines[0].line[2].startvalue = avgRequests / openCount.length
            this.dailyRequestRateChartData.trendlines[0].line[0].displayvalue = "Avg. Opens: ".concat(Math.round(this.dailyRequestRateChartData.trendlines[0].line[0].startvalue.toString()))
            this.dailyRequestRateChartData.trendlines[0].line[1].displayvalue = "Avg. Clicks: ".concat(Math.round(this.dailyRequestRateChartData.trendlines[0].line[1].startvalue.toString()))
            this.dailyRequestRateChartData.trendlines[0].line[2].displayvalue = "Avg. Requests: ".concat(Math.round(this.dailyRequestRateChartData.trendlines[0].line[2].startvalue.toString()))
          }
        },
        mounted:function() {
            if (this.cleanData.cleanRequestData.clicksCount.length === 0
                || this.cleanData.cleanRequestData.openCount.length === 0) {
                let clicks = [];
                let opens = [];
                let categories = [];
                let requests = [];
                for (let i = 0; i < 32; i++){
                    clicks.push({value: "0"});
                    opens.push({value: "0"});
                    requests.push({value: "0"});
                    categories.push({label: i});
                }

                this.dailyRequestRateChartData.categories[0].category = categories;
                this.dailyRequestRateChartData.dataset[0].data = opens;
                this.dailyRequestRateChartData.dataset[1].data = clicks;
                this.dailyRequestRateChartData.dataset[2].data = requests;
            } else {
                this.setChartData();
            }
        },
        watch: {
          cleanData: {
            handler: function() {
              this.setChartData();
            },
            deep: true
          },
          time: {
            handler: function() {
              this.setChartData();
            },
          },
      },
    };
</script>

<style>

</style>
