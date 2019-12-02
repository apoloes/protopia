<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
        type="pie2d"
        width="100%"
        height="100%"
        data-format="json"
        dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
        :data-source="statusDistChartData"
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
            statusDistChartData: {
              chart: {
                caption: "Response Status Distribution",
                plottooltext: "<b>$percentValue</b> of asks have a status of $label",
                showlegend: "1",
                showpercentvalues: "1",
                legendposition: "bottom",
                usedataplotcolorforlabels: "1",
                showlabels: "0",
                theme: "fusion"
              },
              data: [],
            },
          };
        },
        methods: {
          setChartData: function() {
            var data = [];

            console.log(this.cleanData.cleanResponseData)
            for (var i = 0; i < this.cleanData.cleanResponseData.statusCount.length; i++) {
              var dataObject = {
                label: this.cleanData.cleanResponseData.statusCount[i].status,
                value: this.cleanData.cleanResponseData.statusCount[i].counts
              };
              data.push(dataObject);
            }
            this.statusDistChartData.data = data;
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
