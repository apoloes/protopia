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
                caption: "Response Distribution of From Emails",
                plottooltext: "<b>$percentValue</b> of responses received from this $label",
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
            var data = [];

            for (var i = 0; i < this.cleanData.cleanResponseData.emailCount.length; i++) {
              var dataObject = {
                label: this.cleanData.cleanResponseData.emailCount[i].email,
                value: this.cleanData.cleanResponseData.emailCount[i].counts
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
