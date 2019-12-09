<template>
  <div class="custom-card header-card card">
    <div class="card-body pt-0">
      <fusioncharts id="hourlyresponserategraph"
                    type="scrollstackedcolumn2d"
                    width="100%"
                    height="100%"
                    data-format="json"
                    :data-source="homeMonthlyRateChartData"
      >
      </fusioncharts>
    </div>

  </div>
</template>

<script>
    export default {
        props: ["cleanData", "startDate", "endDate"],
        data() {
          return {
            homeMonthlyRateChartData: {
              chart: {
                caption: "Daily Open, Click, and Email Counts",
                yaxisname: "Frequency",
                subcaption: "Last Month",
                numdivlines: "3",
                showvalues: "0",
                rotateLabels: "1",
                slantLabels: "1",
                plotToolText: "$label<br><hr><b>$dataValue</b> $seriesname",
                theme: "fusion",
              },
              categories: [
                {
                  category: []
                }
              ],
              dataset: [
                {
                seriesname: "Emails",
                data: []
                },
                {
                  seriesname: "Opens",
                  data: []
                },
                {
                  seriesname: "Clicks",
                  data: []
                },
              ],
            }
          };
        },
        methods: {
          setChartData: function() {
            let categories = [];
            let opens = [];
            let clicks = [];
            let emails = [];

            for (let i = this.cleanData.cleanFullData.opensCount.length-1; i >= 0; i--) {
              let categoryObject = {
                label: this.cleanData.cleanFullData.opensCount[i].date.substring(5,10),
              };
              
              let opensObject = {
                value: this.cleanData.cleanFullData.opensCount[i].counts,
              };
              
              let clicksObject = {
                value: this.cleanData.cleanFullData.clicksCount[i].counts,
              };
              
              let emailsObject = {
                value: this.cleanData.cleanFullData.emailsCount[i].counts,
              };
              categories.push(categoryObject);
              opens.push(opensObject);
              clicks.push(clicksObject);
              emails.push(emailsObject);
            }
            this.homeMonthlyRateChartData.categories[0].category = categories;
            this.homeMonthlyRateChartData.dataset[0].data = emails;
            this.homeMonthlyRateChartData.dataset[1].data = opens;
            this.homeMonthlyRateChartData.dataset[2].data = clicks;
          },
          
        },
        mounted:function() {
            if (this.cleanData.cleanFullData.clicksCount.length === 0
                || this.cleanData.cleanFullData.opensCount.length === 0) {
                let clicks = [];
                let opens = [];
                let categories = [];
                let emails = [];
                for (let i = 0; i < 32; i++){
                    clicks.push({value: "0"});
                    opens.push({value: "0"});
                    emails.push({value: "0"});
                    categories.push({label: i});
                }

                this.homeMonthlyRateChartData.categories[0].category = categories;
                this.homeMonthlyRateChartData.dataset[0].data = opens;
                this.homeMonthlyRateChartData.dataset[1].data = clicks;
                this.homeMonthlyRateChartData.dataset[2].data = emails;
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

