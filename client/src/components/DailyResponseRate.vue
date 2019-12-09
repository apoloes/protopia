<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts id="dailyresponserategraph"
                    type="msspline"
                    width="100%"
                    height="100%"
                    data-format="json"
                    dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
                    :data-source="dailyResponseRateChartData"
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
                dailyResponseRateChartData: {
                    chart: {
                        // caption: "Daily Open, Click, and Response Rates",
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
                        rotateLabels: "1",
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
                        }
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
              let openCount = this.cleanData.cleanResponseData.openCount;
              let clicksCount = this.cleanData.cleanResponseData.clicksCount;
              if (this.time == "today") {
                openCount = this.cleanData.cleanResponseData.openTodayCount;
                clicksCount = this.cleanData.cleanResponseData.clicksTodayCount;
              } else if (this.time == "week") {
                openCount = this.cleanData.cleanResponseData.openWeekCount;
                clicksCount = this.cleanData.cleanResponseData.clicksWeekCount;
              }

              let categories = [];
              let opens = [];
              let clicks = [];
              let responses = [];

              let avgClicks = 0;
              let avgOpens = 0;
              let avgResponses = 0;
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
                avgResponses = avgResponses + this.cleanData.cleanResponseData.responseCount[i].counts
                let responsesObject = {
                  value: this.cleanData.cleanResponseData.responseCount[i].counts,
                };
                categories.push(categoryObject);
                opens.push(opensObject);
                clicks.push(clicksObject);
                responses.push(responsesObject);
              }
              this.dailyResponseRateChartData.categories[0].category = categories;
              this.dailyResponseRateChartData.dataset[0].data = opens;
              this.dailyResponseRateChartData.dataset[1].data = clicks;
              this.dailyResponseRateChartData.dataset[2].data = responses;
              this.dailyResponseRateChartData.trendlines[0].line[0].startvalue = avgOpens / openCount.length
              this.dailyResponseRateChartData.trendlines[0].line[1].startvalue = avgClicks / openCount.length
              this.dailyResponseRateChartData.trendlines[0].line[2].startvalue = avgResponses / openCount.length
              this.dailyResponseRateChartData.trendlines[0].line[0].displayvalue = "Avg. Opens: ".concat(Math.round(this.dailyResponseRateChartData.trendlines[0].line[0].startvalue.toString()))
              this.dailyResponseRateChartData.trendlines[0].line[1].displayvalue = "Avg. Clicks: ".concat(Math.round(this.dailyResponseRateChartData.trendlines[0].line[1].startvalue.toString()))
              this.dailyResponseRateChartData.trendlines[0].line[2].displayvalue = "Avg. Responses: ".concat(Math.round(this.dailyResponseRateChartData.trendlines[0].line[2].startvalue.toString()))

            },
        },
        mounted:function() {
            if (this.cleanData.cleanResponseData.clicksCount.length === 0
                || this.cleanData.cleanResponseData.openCount.length === 0) {
                let clicks = [];
                let opens = [];
                let categories = [];
                let responses = [];
                for (let i = 0; i < 32; i++){
                    clicks.push({value: "0"});
                    opens.push({value: "0"});
                    responses.push({value: "0"});
                    categories.push({label: i});
                }

                this.dailyResponseRateChartData.categories[0].category = categories;
                this.dailyResponseRateChartData.dataset[0].data = opens;
                this.dailyResponseRateChartData.dataset[1].data = clicks;
                this.dailyResponseRateChartData.dataset[2].data = responses;

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
