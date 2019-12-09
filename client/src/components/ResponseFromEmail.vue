<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
        type="doughnut2d"
        width="100%"
        height="100%"
        data-format="json"
        :data-source="emailDistChartData"
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
            emailDistChartData: {
              chart: {
                theme: "fusion",
                plottooltext: "<b>$percentValue</b> of responses received from <b>$label</b>",
                showlegend: "0",
                showlabels: "0",
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
                "defaultCenterLabel": "From Email",
                "centerLabel": "$value <br> $label",
                "centerLabelBold": "1",
                centerLabelColor: "#FFFFFF",
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
            
            let emailCount = this.cleanData.cleanResponseData.emailCount;
            if (this.time == "today") {
              emailCount = this.cleanData.cleanResponseData.emailTodayCount;
            } else if (this.time == "week") {
              emailCount = this.cleanData.cleanResponseData.emailWeekCount;
            }

            for (var i = 0; i < emailCount.length; i++) {
              var dataObject = {
                label: emailCount[i].email,
                value: emailCount[i].counts
              };
              data.push(dataObject);
            }
            data.sort(compare);
            this.emailDistChartData.data = data;
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
