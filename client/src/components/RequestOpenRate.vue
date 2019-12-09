<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
        type="doughnut2d"
        width="100%"
        height="100%"
        data-format="json"
        :data-source="openRateChartData"
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
            openRateChartData: {
              chart: {
                theme: "fusion",
                plottooltext: "<b>$percentValue</b> of requests have been <b>$label<b>",
                showlegend: "0",
                showlabels: "0",
                "palettecolors": "5d62b5,29c3be",
                "showBorder": "0",
                "showShadow": "0",
                "use3DLighting": "0",
                "showValues": "0",
                "bgColor": "#5e26ac",
                "bgAlpha": "100",
                "canvasBgAlpha": "0",
                // "doughnutRadius": "45",
                // "pieRadius": "65",
                "plotBorderAlpha": "0",
                "toolTipBgcolor": "#9178a0",
                "toolTipPadding": "7",
                "toolTipBorderRadius": "3",
                "toolTipBorderAlpha": "30",
                "tooltipBorderThickness": "0.7",
                "toolTipColor": "#FFFFFF",
                "legendShadow": "0",
                "legendBorderAlpha": "0",
                "legendBgAlpha": "0",
                "legendPosition": "BOTTOM",
                "defaultCenterLabel": "Open Rate",
                "centerLabel": "$value <br> $label",
                "centerLabelBold": "1",
                "centerLabelColor": "#FFFFFF",
                  "centerLabelAlpha": "100",
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
            let data = [];
            let openRate = this.cleanData.cleanRequestData.openRate;
            if (this.time == "today") {
              openRate = this.cleanData.cleanRequestData.openTodayRate;
            } else if (this.time == "week") {
              openRate = this.cleanData.cleanRequestData.openWeekRate;
            }

            for (let i = 0; i < openRate.length; i++) {
              let dataObject = {
                label: openRate[i].status,
                value: openRate[i].count
              };
              data.push(dataObject);
            }
            data.sort(compare);
            this.openRateChartData.data = data;
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
