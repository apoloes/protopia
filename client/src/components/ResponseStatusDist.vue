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
                plottooltext: "<b>$percentValue</b> of asks have a status of <b>$label<b>",
                showlegend: "0",
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

            console.log(this.cleanData.cleanResponseData)
            for (var i = 0; i < this.cleanData.cleanResponseData.statusCount.length; i++) {
              var dataObject = {
                label: this.cleanData.cleanResponseData.statusCount[i].status,
                value: this.cleanData.cleanResponseData.statusCount[i].counts
              };
              data.push(dataObject);
            }
            data.sort(compare);
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
