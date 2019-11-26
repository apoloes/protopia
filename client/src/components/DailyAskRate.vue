<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts id="askrategraph"
        type="msspline"
        width="100%"
        height="100%"
        data-format="json"
        dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
        :data-source="dailyAskRateChartData"
      >
      </fusioncharts>
    </div>

  </div>
</template>

<script>
    export default {
        props: ["cleanRequestData"],
        data() {
          return {
            dailyAskRateChartData: {
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

            for (var i = 0; i < this.cleanRequestData.openCount.length; i++) {
              var categoryObject = {
                label: this.cleanRequestData.openCount[i].date,
              };
              var opensObject = {
                value: this.cleanRequestData.openCount[i].counts,
              };
              var clicksObject = {
                value: this.cleanRequestData.clicksCount[i].counts,
              };
              categories.push(categoryObject);
              opens.push(opensObject);
              clicks.push(clicksObject);
            }
            this.dailyAskRateChartData.categories[0].category = categories
            this.dailyAskRateChartData.dataset[0].data = opens
            this.dailyAskRateChartData.dataset[1].data = clicks
          },
        },
        mounted:function() {
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
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                    {value: "0"},
                  ]
          var opens = clicks
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
                    {label: "23"},
                    {label: "24"},
                    {label: "25"},
                    {label: "26"},
                    {label: "27"},
                    {label: "28"},
                    {label: "29"},
                    {label: "30"},
                    {label: "31"}
                  ]
          this.dailyAskRateChartData.categories[0].category = categories
          this.dailyAskRateChartData.dataset[0].data = opens
          this.dailyAskRateChartData.dataset[1].data = clicks
          
        },
        watch: {
          cleanRequestData: {
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
