<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts id="topposgraph"
        type="bar2d"
        width="100%"
        height="100%"
        data-format="json"
        dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
        :data-source="TopPosChartData"
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
            TopPosChartData: {
              chart: {
                caption: "Top 10 Most Frequent Positive Words",
                captionFontBold: "0",
                captionFontColor: "#000000",
                captionPadding: "30",
                baseFont: "Roboto",
                chartTopMargin: "30",
                showHoverEffect: "1",
                theme: "fusion",
                // showaxislines: "1",
                anchorBgColor: "#6297d9",
                paletteColors: "#6297d9",
                drawCrossLine: "1",
                plotToolText: "$label<br><hr><b>$dataValue</b>",
                showAxisLines: "1",
                showYAxisValues: "1",
                anchorRadius: "4",
                divLineAlpha: "0",
                labelFontSize: "13",
                labelAlpha: "65",
                labelFontBold: "0",
                rotateLabels: "1",
                slantLabels: "1",
                canvasPadding: "20"
              },
              data: [],
            },
          };
        },
        methods: {
          setChartData: function() {
            if(this.cleanRequestData.TopPos.length > 0){
              var data = [];

              for (var i = 0; i < 10; i++) {
                var dataObject = {
                  label: this.cleanRequestData.TopPos[i].word,
                  value: this.cleanRequestData.TopPos[i].counts
                };
                data.push(dataObject);
              }
              this.TopPosChartData.data = data;
            }
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
