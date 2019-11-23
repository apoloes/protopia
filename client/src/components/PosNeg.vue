<template>
  <div class="custom-card header-card card">
    <div class="card-body pb-0">
      <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :container-background-opacity="containerbackgroundopacity"
        :data-format="dataformat"
        :data-source="datasource"
      >
      </fusioncharts>
    </div>
  </div>
</template>


<script>
export default {
  props: ["cleanAskData"],
  components: {},
  data() {
    return {
      type: "angulargauge",
      width: "100%",
      height: "100%",
      containerbackgroundopacity: 0,
      dataformat: "json",
      datasource: {
        chart: {
            "caption": "Comparative Sentiment Score",
            "subcaption": "All Student Asks",
            "lowerLimit": "-5",
            "upperLimit": "5",
            "theme": "fusion"
        },
        "colorRange": {
            "color": [
                {
                    "minValue": "-5",
                    "maxValue": "0",
                    "code": "#e44a00"
                },
                {
                    "minValue": "0",
                    "maxValue": "5",
                    "code": "#6baa01"
                }
            ]
        },
        "dials": {
            "dial": [
                {
                    "value": this.cleanAskData.PosNeg[0]
                }
            ]
        }
    }
    }
  },
  watch: {
    cleanAskData: {
        handler: function() {
            this.datasource.dials.dial[0].value = this.cleanAskData.PosNeg[0]
        },
        deep: true
    },
}
}

</script>
