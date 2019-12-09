<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts id="hourlyresponserategraph"
                    type="msspline"
                    width="100%"
                    height="100%"
                    data-format="json"
                    dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
                    :data-source="hourlyResponseRateChartData"
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
                hourlyResponseRateChartData: {
                    chart: {
                        // caption: "Hourly Open, Click, and Response Rates",
                          captionFontColor: "#FFF",
                          subCaptionFontColor: "#FFF",
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
                            seriesname: "Responses",
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
              let openCount = this.cleanData.cleanResponseData.hourlyOpenCount;
              let clicksCount = this.cleanData.cleanResponseData.hourlyClicksCount;
              if (this.time == "today") {
                openCount = this.cleanData.cleanResponseData.hourlyTodayOpenCount;
                clicksCount = this.cleanData.cleanResponseData.hourlyTodayClicksCount;
              } else if (this.time == "week") {
                openCount = this.cleanData.cleanResponseData.hourlyWeekOpenCount;
                clicksCount = this.cleanData.cleanResponseData.hourlyWeekClicksCount;
              }

              let categories = [];
              let opens = [];
              let clicks = [];
              let responses = [];

              let avgClicks = 0;
              let avgOpens = 0;
              let avgResponses = 0;

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
                avgResponses = avgResponses + this.cleanData.cleanResponseData.hourlyResponseCount[i].counts
                let responseObject = {
                  value: this.cleanData.cleanResponseData.hourlyResponseCount[i].counts,
                };
                categories.push(categoryObject);
                opens.push(opensObject);
                clicks.push(clicksObject);
                responses.push(responseObject)
              }
              this.hourlyResponseRateChartData.categories[0].category = categories;
              this.hourlyResponseRateChartData.dataset[0].data = opens;
              this.hourlyResponseRateChartData.dataset[1].data = clicks;
              this.hourlyResponseRateChartData.dataset[2].data = responses;
              this.hourlyResponseRateChartData.trendlines[0].line[0].startvalue = avgOpens / openCount.length
              this.hourlyResponseRateChartData.trendlines[0].line[1].startvalue = avgClicks / openCount.length
              this.hourlyResponseRateChartData.trendlines[0].line[2].startvalue = avgResponses / this.cleanData.cleanResponseData.hourlyResponseCount.length
              this.hourlyResponseRateChartData.trendlines[0].line[0].displayvalue = "Avg. Opens: ".concat(Math.round(this.hourlyResponseRateChartData.trendlines[0].line[0].startvalue.toString()))
              this.hourlyResponseRateChartData.trendlines[0].line[1].displayvalue = "Avg. Clicks: ".concat(Math.round(this.hourlyResponseRateChartData.trendlines[0].line[1].startvalue.toString()))
              this.hourlyResponseRateChartData.trendlines[0].line[2].displayvalue = "Avg. Responses: ".concat(Math.round(this.hourlyResponseRateChartData.trendlines[0].line[2].startvalue.toString()))
            },
        },
        mounted: function() {
            if (this.cleanData.cleanResponseData.hourlyClicksCount.length === 0
                || this.cleanData.cleanResponseData.hourlyOpenCount.length === 0) {
                let clicks = [];
                let opens = [];
                let categories = [];
                for (let i = 0; i < 24; i++){
                    clicks.push({value: "0"});
                    opens.push({value: "0"});
                    categories.push({label: i});
                }

                this.hourlyResponseRateChartData.categories[0].category = categories;
                this.hourlyResponseRateChartData.dataset[0].data = opens;
                this.hourlyResponseRateChartData.dataset[1].data = clicks;
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
