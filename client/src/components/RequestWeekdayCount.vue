<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
        type="bar2d"
        width="100%"
        height="100%"
        data-format="json"
        :data-source="RequestWeekdayChartData"
      >
      </fusioncharts>
    </div>

  </div>
</template>

<script>
    export default {
        props: ["cleanData","time"],
        components: {},
        data() {
          return {
            RequestWeekdayChartData: {
              chart: {
                plottooltext: "<b>$value</b> requests sent on <b>$label<b>",
                labelFontColor: "#FFFFFF",
                valueFontColor: "#FFFFFF",
                theme: "fusion",
                showCanvasBorder: "0",
                placeValuesInside: "0",
                showAlternateVGridColor: "0",
                  "bgColor": "#5e26ac",
                "showvalues": "1",
                "showLimits": "0",
                "showDivLineValues": "0",
                "paletteColors": "#ffc533",
                "usePlotGradientColor": "0",
                "divLineColor": "#999999",
                "divLineDashLen": "5",
                "valueFontSize": "15",
                "canvasRightMargin": "160",
                "canvasLeftMargin": "0",
                "canvasBottomMargin": "60",
                "canvasTopMargin": "60",
                "toolTipBgcolor": "#9178a0",
                "toolTipPadding": "7",
                "toolTipBorderRadius": "3",
                "toolTipBorderAlpha": "30",
                "tooltipBorderThickness": "0.7",
                "toolTipColor": "#FDFDFD",
                "transposeAnimation":"1"
              },
              data: [],
            },
          };
        },
        methods: {
          setChartData: function() {
            let data = [];
            let weekdayCount = this.cleanData.cleanRequestData.weekdayCount;
            if (this.time == "today") {
              weekdayCount = this.cleanData.cleanRequestData.weekdayTodayCount;
            } else if (this.time == "week") {
              weekdayCount = this.cleanData.cleanRequestData.weekdayWeekCount;
            }

            for (let i = 0; i < weekdayCount.length; i++) {
              let dataObject = {
                label: weekdayCount[i].weekday,
                value: weekdayCount[i].count
              };
              data.push(dataObject);
            }
            this.RequestWeekdayChartData.data = data;
          },
        },
        mounted: function() {
          this.setChartData();
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
