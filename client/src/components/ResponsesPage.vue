<template>
  <div id="app">
    <h1 class="globaltitle">Protopia</h1>
    <h2 class="pagetitle">Responses Page</h2>
<!--    <student_graphs v-bind:cleanRequestData="cleanRequestData"></student_graphs>-->
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

<style scoped>

</style>
