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
        props: ["cleanData"],
        data() {
            return {
                hourlyResponseRateChartData: {
                    chart: {
                        caption: "Hourly Open and Click Rates",
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
                for (let i = 0; i < this.cleanData.cleanResponseData.hourlyOpenCount.length; i++) {
                    let categoryObject = {
                        label: this.cleanData.cleanResponseData.hourlyOpenCount[i].hour,
                    };
                    avgOpens = avgOpens + this.cleanData.cleanResponseData.hourlyOpenCount[i].counts
                    let opensObject = {
                        value: this.cleanData.cleanResponseData.hourlyOpenCount[i].counts,
                    };
                    avgClicks = avgClicks + this.cleanData.cleanResponseData.hourlyClicksCount[i].counts
                    let clicksObject = {
                        value: this.cleanData.cleanResponseData.hourlyClicksCount[i].counts,
                    };
                    categories.push(categoryObject);
                    opens.push(opensObject);
                    clicks.push(clicksObject);
                }
                this.hourlyResponseRateChartData.categories[0].category = categories;
                this.hourlyResponseRateChartData.dataset[0].data = opens;
                this.hourlyResponseRateChartData.dataset[1].data = clicks;
                this.hourlyResponseRateChartData.trendlines[0].line[0].startvalue = avgOpens / this.cleanData.cleanResponseData.hourlyOpenCount.length
                this.hourlyResponseRateChartData.trendlines[0].line[1].startvalue = avgClicks / this.cleanData.cleanResponseData.hourlyOpenCount.length
                this.hourlyResponseRateChartData.trendlines[0].line[0].displayvalue = "Avg. Opens: ".concat(Math.round(this.hourlyResponseRateChartData.trendlines[0].line[0].startvalue.toString()))
                this.hourlyResponseRateChartData.trendlines[0].line[1].displayvalue = "Avg. Clicks: ".concat(Math.round(this.hourlyResponseRateChartData.trendlines[0].line[1].startvalue.toString()))
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
        },
    };
</script>

<style>

</style>
