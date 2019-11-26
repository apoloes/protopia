<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts id="hourlyaskrategraph"
        type="msspline"
        width="100%"
        height="100%"
        data-format="json"
        dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
        :data-source="hourlyAskRateChartData"
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
           hourlyAskRateChartData: {
              chart: {
                caption: "Hourly Open and Click Rates",
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
            console.log(this.cleanRequestData)
            for (var i = 0; i < this.cleanRequestData.hourlyOpenCount.length; i++) {
              var categoryObject = {
                label: this.cleanRequestData.hourlyOpenCount[i].hour,
              };
              var opensObject = {
                value: this.cleanRequestData.hourlyOpenCount[i].counts,
              };
              var clicksObject = {
                value: this.cleanRequestData.hourlyClicksCount[i].counts,
              };
              categories.push(categoryObject);
              opens.push(opensObject);
              clicks.push(clicksObject);
            }
            this.hourlyAskRateChartData.categories[0].category = categories
            this.hourlyAskRateChartData.dataset[0].data = opens
            this.hourlyAskRateChartData.dataset[1].data = clicks
          },
        },
        mounted: function() {
          var clicks = []
          var opens = []
          var categories = []
          for (var i = 0; i < 24; i++){
            clicks.push({value: "0"})
            opens.push({value: "0"})
            categories.push({label: i})
          }
          
          this.hourlyAskRateChartData.categories[0].category = categories
          this.hourlyAskRateChartData.dataset[0].data = opens
          this.hourlyAskRateChartData.dataset[1].data = clicks
          
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
