<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts id="hourlyrequestrategraph"
        type="msspline"
        width="100%"
        height="100%"
        data-format="json"
        dataEmptyMessage="i-https://i.postimg.cc/R0QCk9vV/Rolling-0-9s-99px.gif"
        :data-source="hourlyRequestRateChartData"
      >
      </fusioncharts>
    </div>

  </div>
</template>

<script>
    export default {
        props: ["cleanData"],
        data() {
          return {
           hourlyRequestRateChartData: {
              chart: {
                caption: "Hourly Open and Click Rates",
                yaxisname: "Frequency",
                subcaption: "Last week",
                numdivlines: "3",
                showvalues: "0",
                rotateLabels: "1",
                slantLabels: "1",
                plotToolText: "$label<br><hr><b>$dataValue</b>",
                theme: "fusion"
              },
              categories: [
                {
                  category: []
                }
              ],
              dataset: [
                {
                  seriesname: "Opens",
                  data: []
                },
                {
                  seriesname: "Clicks",
                  data: []
                }
              ]
              }
          };
        },
        methods: {
          setChartData: function() {
            var categories = [];
            var opens = [];
            var clicks = [];

            for (var i = 0; i < this.cleanData.cleanRequestData.hourlyOpenCount.length; i++) {
              var categoryObject = {
                label: this.cleanData.cleanRequestData.hourlyOpenCount[i].hour,
              };
              var opensObject = {
                value: this.cleanData.cleanRequestData.hourlyOpenCount[i].counts,
              };
              var clicksObject = {
                value: this.cleanData.cleanRequestData.hourlyClicksCount[i].counts,
              };
              categories.push(categoryObject);
              opens.push(opensObject);
              clicks.push(clicksObject);
            }
            this.hourlyRequestRateChartData.categories[0].category = categories;
            this.hourlyRequestRateChartData.dataset[0].data = opens;
            this.hourlyRequestRateChartData.dataset[1].data = clicks
          },
        },
        mounted: function() {
            if (this.cleanData.cleanRequestData.hourlyClicksCount.length === 0
                || this.cleanData.cleanRequestData.hourlyOpenCount.length === 0) {
                var clicks = [];
                var opens = [];
                var categories = [];
                for (var i = 0; i < 24; i++){
                    clicks.push({value: "0"});
                    opens.push({value: "0"});
                    categories.push({label: i});
                }

                this.hourlyRequestRateChartData.categories[0].category = categories;
                this.hourlyRequestRateChartData.dataset[0].data = opens;
                this.hourlyRequestRateChartData.dataset[1].data = clicks;
            } else {
                this.setChartData();
            }
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
