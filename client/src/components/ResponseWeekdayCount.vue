<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
        type="bar2d"
        width="100%"
        height="100%"
        data-format="json"
        :data-source="ResponseWeekdayChartData"
      >
      </fusioncharts>
    </div>

  </div>
</template>

<script>
    export default {
        props: ["cleanData"],
        components: {},
        data() {
          return {
            ResponseWeekdayChartData: {
              chart: {
                plottooltext: "<b>$value</b> responses sent on <b>$label<b>",
                theme: "fusion",
                showCanvasBorder: "0",
                placeValuesInside: "0",
                showAlternateVGridColor: "0",
                "showvalues": "1",
                "showLimits": "0",
                "showDivLineValues": "0",
                "paletteColors": "#9178a0",
                "usePlotGradientColor": "0",
                "divLineColor": "#999999",
                "divLineDashed": "1",
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
            for (let i = 0; i < this.cleanData.cleanResponseData.weekdayCount.length; i++) {
              let dataObject = {
                label: this.cleanData.cleanResponseData.weekdayCount[i].weekday,
                value: this.cleanData.cleanResponseData.weekdayCount[i].count
              };
              data.push(dataObject);
            }
            this.ResponseWeekdayChartData.data = data;
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
      },
    };
</script>

<style>

</style>
