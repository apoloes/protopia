<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
        type="doughnut2d"
        width="100%"
        height="100%"
        data-format="json"
        :data-source="clickRateChartData"
      >
      </fusioncharts>
    </div>

  </div>
</template>


<script>
    export default {
        props: ["cleanData", "time"],
        components: {},
        data() {
          return {
            clickRateChartData: {
              chart: {
                plottooltext: "<b>$percentValue</b> of requests <b>$label<b>",
                theme: "fusion",
                showlegend: "0",
                showlabels: "0",
                "palettecolors": "f2726f, #FFC533",
                "showBorder": "0",
                "showShadow": "0",
                "use3DLighting": "0",
                "showValues": "0",
                "bgColor": "#5e26ac",
                "bgAlpha": "100",
                "canvasBgAlpha": "0",
                "doughnutRadius": "105",
                "pieRadius": "125",
                "plotBorderAlpha": "0",
                "toolTipBgcolor": "#000000",
                "toolTipPadding": "7",
                "toolTipBorderRadius": "3",
                "toolTipBorderAlpha": "30",
                "tooltipBorderThickness": "0.7",
                "toolTipColor": "#FFFFFF",
                "legendShadow": "0",
                "legendBorderAlpha": "0",
                "legendBgAlpha": "0",
                "legendPosition": "BOTTOM",
                "defaultCenterLabel": "Click Rate",
                "centerLabel": "$value <br> $label",
                "centerLabelBold": "1",
                  centerLabelColor: "#FFFFFF",
                  centerLabelAlpha: "100",
                "centerLabelFontSize": "20",
                "enableRotation": "0",
              },
              data: [],
            },
          };
        },
        methods: {
          setChartData: function() {
            function compare(a, b) {
              // Use toUpperCase() to ignore character casing
              const A = a.value;
              const B = b.value;

              let comparison = 0;
              if (A > B) {
                comparison = 1;
              } else if (A < B) {
                comparison = -1;
              }
              return comparison;
            }
            var data = [];

            let clickRate = this.cleanData.cleanRequestData.clickRate;
            if (this.time == "today") {
              clickRate = this.cleanData.cleanRequestData.clickTodayRate;
            } else if (this.time == "week") {
              clickRate = this.cleanData.cleanRequestData.clickWeekRate;
            }


            for (var i = 0; i < clickRate.length; i++) {
              var dataObject = {
                label: clickRate[i].status,
                value: clickRate[i].count
              };
              data.push(dataObject);
            }
            data.sort(compare);
            this.clickRateChartData.data = data;
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
