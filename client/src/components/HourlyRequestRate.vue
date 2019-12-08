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
        props: ["cleanData"],
        data() {
          return {
           hourlyRequestRateChartData: {
              chart: {
                caption: "Hourly Open, Click, and Request Rates",
                yaxisname: "Frequency",
                subcaption: "Last Month",
                numdivlines: "3",
                showvalues: "0",
                rotateLabels: "1",
                slantLabels: "1",
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
            let categories = [];
            let opens = [];
            let clicks = [];
            let requests = [];

            let avgClicks = 0;
            let avgOpens = 0;
            let avgRequests = 0;

            for (let i = 0; i < this.cleanData.cleanRequestData.hourlyOpenCount.length; i++) {
              let categoryObject = {
                label: this.cleanData.cleanRequestData.hourlyOpenCount[i].hour,
              };
              avgOpens = avgOpens + this.cleanData.cleanRequestData.hourlyOpenCount[i].counts
              let opensObject = {
                value: this.cleanData.cleanRequestData.hourlyOpenCount[i].counts,
              };
              avgClicks = avgClicks + this.cleanData.cleanRequestData.hourlyClicksCount[i].counts
              let clicksObject = {
                value: this.cleanData.cleanRequestData.hourlyClicksCount[i].counts,
              };
              avgRequests = avgRequests + this.cleanData.cleanRequestData.hourlyResponseCount[i].counts
              let responseObject = {
                value: this.cleanData.cleanRequestData.hourlyResponseCount[i].counts,
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
            this.hourlyRequestRateChartData.trendlines[0].line[0].startvalue = avgOpens / this.cleanData.cleanRequestData.hourlyOpenCount.length
            this.hourlyRequestRateChartData.trendlines[0].line[1].startvalue = avgClicks / this.cleanData.cleanRequestData.hourlyOpenCount.length
            this.hourlyRequestRateChartData.trendlines[0].line[2].startvalue = avgRequests / this.cleanData.cleanRequestData.hourlyResponseCount.length
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
                for (let i = 0; i < 24; i++){
                    clicks.push({value: "0"});
                    opens.push({value: "0"});
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
      },
    };
</script>

<style>

</style>
