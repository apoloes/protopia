<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts id="hourlyrequestrategraph"
        type="msspline"
        width="100%"
        height="100%"
        data-format="json"
        dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
        :data-source="hourlyRequestRateChartData"
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
           hourlyRequestRateChartData: {
              chart: {
                // caption: "Hourly Open, Click, and Request Rates",
                  captionFontColor: "#FFF",
                  subCaptionFontColor: "#FFF",
                  // subcaptionFontSize: "1em",
                  xAxisNameFontColor: "#FFF",
                  legendCaptionFontColor: "#FFF",
                  legendItemFontColor: "#FFF",
                  baseFontColor: "#FFF",
                yaxisname: "Frequency",
                subcaption: "Last Month",
                numdivlines: "3",
                showvalues: "0",
                slantLabels: "1",
                  bgColor: "#5e26ac",
                plotToolText: "$label<br><hr><b>$dataValue</b>",
                theme: "fusion"
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
            let openCount = this.cleanData.cleanRequestData.hourlyOpenCount;
            let clicksCount = this.cleanData.cleanRequestData.hourlyClicksCount;
            this.hourlyRequestRateChartData.chart.subcaption = "Last Month";
            if (this.time == "today") {
              openCount = this.cleanData.cleanRequestData.hourlyTodayOpenCount;
              clicksCount = this.cleanData.cleanRequestData.hourlyTodayClicksCount;
              this.hourlyRequestRateChartData.chart.subcaption = "Today";
            } else if (this.time == "week") {
              openCount = this.cleanData.cleanRequestData.hourlyWeekOpenCount;
              clicksCount = this.cleanData.cleanRequestData.hourlyWeekClicksCount;
              this.hourlyRequestRateChartData.chart.subcaption = "Last Week";
            }

            let categories = [];
            let opens = [];
            let clicks = [];
            let requests = [];

            let avgClicks = 0;
            let avgOpens = 0;
            let avgRequests = 0;

            for (let i = 0; i < openCount.length; i++) {
              let categoryObject = {
                label: openCount[i].hour,
              };
              avgOpens = avgOpens + openCount[i].counts
              let opensObject = {
                value: openCount[i].counts,
              };
              avgClicks = clicksCount[i].counts
              let clicksObject = {
                value: clicksCount[i].counts,
              };
              avgRequests = avgRequests + this.cleanData.cleanRequestData.hourlyRequestCount[i].counts
              let responseObject = {
                value: this.cleanData.cleanRequestData.hourlyRequestCount[i].counts,
              };
              categories.push(categoryObject);
              opens.push(opensObject);
              clicks.push(clicksObject);
              requests.push(responseObject)
            }
            this.hourlyRequestRateChartData.categories[0].category = categories;
            this.hourlyRequestRateChartData.dataset[0].data = opens;
            this.hourlyRequestRateChartData.dataset[1].data = clicks;
            this.hourlyRequestRateChartData.dataset[2].data = requests;
            this.hourlyRequestRateChartData.trendlines[0].line[0].startvalue = avgOpens / openCount.length
            this.hourlyRequestRateChartData.trendlines[0].line[1].startvalue = avgClicks / openCount.length
            this.hourlyRequestRateChartData.trendlines[0].line[2].startvalue = avgRequests / this.cleanData.cleanRequestData.hourlyRequestCount.length
            this.hourlyRequestRateChartData.trendlines[0].line[0].displayvalue = "Avg. Opens: ".concat(Math.round(this.hourlyRequestRateChartData.trendlines[0].line[0].startvalue.toString()))
            this.hourlyRequestRateChartData.trendlines[0].line[1].displayvalue = "Avg. Clicks: ".concat(Math.round(this.hourlyRequestRateChartData.trendlines[0].line[1].startvalue.toString()))
            this.hourlyRequestRateChartData.trendlines[0].line[2].displayvalue = "Avg. Requests: ".concat(Math.round(this.hourlyRequestRateChartData.trendlines[0].line[2].startvalue.toString()))
          },
        },
        mounted: function() {
            if (this.cleanData.cleanRequestData.hourlyClicksCount.length === 0
                || this.cleanData.cleanRequestData.hourlyOpenCount.length === 0) {
                let clicks = [];
                let opens = [];
                let categories = [];
                let requests = [];
                for (let i = 0; i < 24; i++){
                    clicks.push({value: "0"});
                    opens.push({value: "0"});
                    requests.push({value: "0"});
                    categories.push({label: i});
                }

                this.hourlyRequestRateChartData.categories[0].category = categories;
                this.hourlyRequestRateChartData.dataset[0].data = opens;
                this.hourlyRequestRateChartData.dataset[1].data = clicks;
                this.hourlyRequestRateChartData.dataset[2].data = requests;
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
