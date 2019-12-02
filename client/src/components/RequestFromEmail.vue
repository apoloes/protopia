<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts
        type="pie2d"
        width="100%"
        height="100%"
        data-format="json"
        dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
        :data-source="emailDistChartData"
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
            emailDistChartData: {
              chart: {
                caption: "Request Distribution of From Emails",
                plottooltext: "<b>$percentValue</b> of requests received from this $label",
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

            for (var i = 0; i < this.cleanData.cleanRequestData.emailCount.length; i++) {
              var dataObject = {
                label: this.cleanData.cleanRequestData.emailCount[i].email,
                value: this.cleanData.cleanRequestData.emailCount[i].counts
              };
              data.push(dataObject);
            }
            this.emailDistChartData.data = data;
          },
        },
        mounted: function() {
          this.setChartData();
        },
        watch: {
          cleanData: {
            handler: function() 
              this.setChartData();
            },
            deep: true
        },
      },
    };
</script>

<style>

</style>
