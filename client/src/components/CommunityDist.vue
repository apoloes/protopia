<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
        type="pie2d"
        width="100%"
        height="100%"
        data-format="json"
        dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
        :data-source="communityDistChartData"
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
            communityDistChartData: {
              chart: {
                caption: "Student Community Distribution",
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
                plottooltext: "<b>$percentValue</b> of asks have a status of $label",
                showAxisLines: "0",
                showYAxisValues: "0",
                anchorRadius: "4",
                divLineAlpha: "0",
                labelFontSize: "13",
                labelAlpha: "65",
                labelFontBold: "0",
                rotateLabels: "1",
                slantLabels: "1",
                showlegend: "1",
                showpercentvalues: "1",
                legendposition: "bottom",
                usedataplotcolorforlabels: "1",
                canvasPadding: "20"
              },
              data: [],
            },
          };
        },
        methods: {
          setChartData: function() {
            var data = [];

            for (var i = 0; i < this.cleanRequestData.communityCount.length; i++) {
              var dataObject = {
                label: this.cleanRequestData.communityCount[i].community,
                value: this.cleanRequestData.communityCount[i].counts
              };
              data.push(dataObject);
            }
            this.communityDistChartData.data = data;
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
