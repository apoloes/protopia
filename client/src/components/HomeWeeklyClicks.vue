<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
        type="Column2d"
        width="400"
        height="300"
        data-format="json"
        :data-source="HomeWeeklyChartData"
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
            HomeWeeklyChartData: {
                chart: {
                    theme: "fusion",
                    bgColor: "AD66C8, AE66BD",

                    "showBorder": "0",
                    "showCanvasBorder": "0",
                    "showAlternateHGridColor": "0",
                    showDivLineValues: "0",
                    "showvalues": "1",
                    "showLimits": "0",
                    "showDivLineValues": "0",
                    "paletteColors": "#ffc533",
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
                "annotations": {
                "groups": [{
                    "autoscale": "1",
                    "items": [{
                        "id": "indicator1",
                        "type": "text",
                        "text": "",
                        "color": "#FFFFFF",
                        "fontSize": "30",
                        "x": "$canvasEndX + 100",
                        "y": "$canvasheight - 50"
                    }, {
                        "id": "indicator2",
                        "type": "text",
                        "text": "",
                        "color": "#FFFFFF",
                        "fontSize": "14",
                        "x": "$canvasEndX + 100",
                        "y": "$canvasheight - 15"
                    }]
                }]
            },
              data: [],
            },
          };
        },
        methods: {
          setChartData: function() {
            let data = [];

            let pastWeek = 0;
            for (let i = 1; i < 8; i++) {
                pastWeek = pastWeek + this.cleanData.cleanFullData.clicksCount[i].counts;
            }
            let dataObject = {
                label: "Last Week",
                value: pastWeek,
                "alpha": "55"
            };
            data.push({label: "Last Week", value: pastWeek,"alpha": "55"});

            let currWeek = 0;
            for (let i = 8; i < 15; i++) {
                currWeek = currWeek + this.cleanData.cleanFullData.clicksCount[i].counts;
            }

            data.push({label: "This Week", value: currWeek});
            this.HomeWeeklyChartData.data = data;

            if(this.HomeWeeklyChartData.data[0].value > this.HomeWeeklyChartData.data[1].value){
                let decrease = (1 - (this.HomeWeeklyChartData.data[1].value/this.HomeWeeklyChartData.data[0].value)) * 100
                this.HomeWeeklyChartData.annotations.groups[0].items[0].text = "▼".concat((Math.round(100*decrease)/100).toString(), "%");
                this.HomeWeeklyChartData.annotations.groups[0].items[0].color = "#840c17";
                this.HomeWeeklyChartData.annotations.groups[0].items[1].text = "Decrease in Clicks";
                this.HomeWeeklyChartData.annotations.groups[0].items[1].color = "#840c17";
                this.HomeWeeklyChartData.annotations.groups[0].items[1].text.fontsize(2);
            }else{
                let increase = ((this.HomeWeeklyChartData.data[1].value/this.HomeWeeklyChartData.data[0].value) - 1) * 100
                this.HomeWeeklyChartData.annotations.groups[0].items[0].text = "▲".concat((Math.round(100*increase)/100).toString(), "%");
                this.HomeWeeklyChartData.annotations.groups[0].items[0].color = "#4ae46d";
                this.HomeWeeklyChartData.annotations.groups[0].items[1].text = "Increase in Clicks"
                this.HomeWeeklyChartData.annotations.groups[0].items[1].color = "#4ae46d";
                this.HomeWeeklyChartData.annotations.groups[0].items[1].fontSize = "1.1em";

            }
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
