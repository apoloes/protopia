<template>
  <div id="app">
    <h1 class="globaltitle">Protopia</h1>
    <h2 class="pagetitle">Requests Page</h2>

    <dailyrequest-dashboard v-bind:cleanData="cleanData"></dailyrequest-dashboard>
    <hourlyrequest-dashboard v-bind:cleanData="cleanData"></hourlyrequest-dashboard>
    <statusrequest-dashboard v-bind:cleanData="cleanData"></statusrequest-dashboard>
  </div>
</template>

<script>
    import DailyRequestRate from "./DailyRequestRate.vue";
    import HourlyRequestRate from "./HourlyRequestRate.vue";
    import RequestStatusDist from "./RequestStatusDist.vue";

    export default {
        props: ["cleanData"],
        components: {
            'dailyrequest-dashboard': DailyRequestRate,
            'hourlyrequest-dashboard': HourlyRequestRate,
            'statusrequest-dashboard': RequestStatusDist,
        },
        data () {
            return {
                childComponents: ['DailyRequestRate.vue','HourlyRequestRate.vue', 'RequestStatusDist.vue']
            }
        },
        methods: {

        },
        computed: {

        }
    }
</script>

<style>
  #wrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .left{
    flex: 1;
    /*width: 15%;*/
    background-image:linear-gradient(-180deg, #80b6db 0%, #7da7e2 100%);
  }
  .right{
    flex: 5;
    /*width: 70%;*/
    background: #ffffff;
  }

</style>
