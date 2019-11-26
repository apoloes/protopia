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
                        subcaption: "Last week",
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

                for (var i = 0; i < this.cleanData.cleanResponseData.openCount.length; i++) {
                    var categoryObject = {
                        label: this.cleanData.cleanResponseData.openCount[i].date,
                    };
                    var opensObject = {
                        value: this.cleanData.cleanResponseData.openCount[i].counts,
                    };
                    var clicksObject = {
                        value: this.cleanData.cleanResponseData.clicksCount[i].counts,
                    };
                    categories.push(categoryObject);
                    opens.push(opensObject);
                    clicks.push(clicksObject);
                }
                this.dailyResponseRateChartData.categories[0].category = categories;
                this.dailyResponseRateChartData.dataset[0].data = opens;
                this.dailyResponseRateChartData.dataset[1].data = clicks;
            },
        },
        mounted:function() {
            if (this.cleanData.cleanResponseData.clicksCount.length == 0
                || this.cleanData.cleanResponseData.openCount.length == 0) {
                var clicks = [
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                ]
                var opens = clicks;
                var categories = [
                    {label: "0"},
                    {label: "1"},
                    {label: "2"},
                    {label: "3"},
                    {label: "4"},
                    {label: "5"},
                    {label: "6"},
                    {label: "7"},
                    {label: "8"},
                    {label: "9"},
                    {label: "10"},
                    {label: "11"},
                    {label: "12"},
                    {label: "13"},
                    {label: "14"},
                    {label: "15"},
                    {label: "16"},
                    {label: "17"},
                    {label: "18"},
                    {label: "19"},
                    {label: "20"},
                    {label: "21"},
                    {label: "22"},
                    {label: "23"}
                ];
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
