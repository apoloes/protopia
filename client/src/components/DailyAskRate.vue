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
        components: {},
        data() {
          return {
            dailyAskRateChartData: {
              chart: {
                caption: "Daily Open and Click Rates",
                showHoverEffect: "1",
                theme: "fusion",
                // showaxislines: "1",
                drawCrossLine: "1",
                plotToolText: "$label<br><hr><b>$dataValue</b>",
                showAxisLines: "1",
                showYAxisValues: "1",
                labelFontSize: "13",
                labelAlpha: "65",
                labelFontBold: "0",
                rotateLabels: "1",
                slantLabels: "1",
                canvasPadding: "20"
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
        mounted: function() {
          this.setChartData();
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
