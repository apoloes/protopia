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
                    ]
                }
            };
        },
        methods: {
            setChartData: function() {
                var categories = [];
                var opens = [];
                var clicks = [];

                for (var i = 0; i < this.cleanData.cleanResponseData.hourlyOpenCount.length; i++) {
                    var categoryObject = {
                        label: this.cleanData.cleanResponseData.hourlyOpenCount[i].hour,
                    };
                    var opensObject = {
                        value: this.cleanData.cleanResponseData.hourlyOpenCount[i].counts,
                    };
                    var clicksObject = {
                        value: this.cleanData.cleanResponseData.hourlyClicksCount[i].counts,
                    };
                    categories.push(categoryObject);
                    opens.push(opensObject);
                    clicks.push(clicksObject);
                }
                this.hourlyResponseRateChartData.categories[0].category = categories;
                this.hourlyResponseRateChartData.dataset[0].data = opens;
                this.hourlyResponseRateChartData.dataset[1].data = clicks;
            },
        },
        mounted: function() {
            if (this.cleanData.cleanResponseData.hourlyClicksCount.length === 0
                || this.cleanData.cleanResponseData.hourlyOpenCount.length === 0) {
                var clicks = [];
                var opens = [];
                var categories = [];
                for (var i = 0; i < 24; i++){
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
