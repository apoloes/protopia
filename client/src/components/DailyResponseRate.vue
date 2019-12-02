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
        props: ["cleanData"],
        data() {
            return {
                dailyResponseRateChartData: {
                    chart: {
                        caption: "Daily Open and Click Rates",
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
                
                let avgClicks = 0;
                let avgOpens = 0;

                for (let i = this.cleanData.cleanResponseData.openCount.length-1; i >= 0; i--) {
                    let categoryObject = {
                        label: this.cleanData.cleanResponseData.openCount[i].date,
                    };
                    avgOpens = avgOpens + this.cleanData.cleanResponseData.openCount[i].counts
                    let opensObject = {
                        value: this.cleanData.cleanResponseData.openCount[i].counts,
                    };
                    avgClicks = avgClicks + this.cleanData.cleanResponseData.clicksCount[i].counts
                    let clicksObject = {
                        value: this.cleanData.cleanResponseData.clicksCount[i].counts,
                    };
                    categories.push(categoryObject);
                    opens.push(opensObject);
                    clicks.push(clicksObject);
                }
                this.dailyResponseRateChartData.categories[0].category = categories;
                this.dailyResponseRateChartData.dataset[0].data = opens;
                this.dailyResponseRateChartData.dataset[1].data = clicks;
                this.dailyResponseRateChartData.trendlines[0].line[0].startvalue = avgOpens / this.cleanData.cleanResponseData.openCount.length
                this.dailyResponseRateChartData.trendlines[0].line[1].startvalue = avgClicks / this.cleanData.cleanResponseData.openCount.length
                this.dailyResponseRateChartData.trendlines[0].line[0].displayvalue = "Avg. Opens: ".concat(Math.round(this.dailyResponseRateChartData.trendlines[0].line[0].startvalue.toString()))
                this.dailyResponseRateChartData.trendlines[0].line[1].displayvalue = "Avg. Clicks: ".concat(Math.round(this.dailyResponseRateChartData.trendlines[0].line[1].startvalue.toString()))
            },
        },
        mounted:function() {
            if (this.cleanData.cleanResponseData.clicksCount.length === 0
                || this.cleanData.cleanResponseData.openCount.length === 0) {
                let clicks = [];
                let opens = [];
                let categories = [];
                for (let i = 0; i < 32; i++){
                    clicks.push({value: "0"});
                    opens.push({value: "0"});
                    categories.push({label: i});
                }

                this.dailyResponseRateChartData.categories[0].category = categories;
                this.dailyResponseRateChartData.dataset[0].data = opens;
                this.dailyResponseRateChartData.dataset[1].data = clicks;
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
