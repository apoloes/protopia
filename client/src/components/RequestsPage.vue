<template>
  <div id="app">
    <h1 class="globaltitle">Protopia</h1>
    <h2 class="pagetitle">Requests Page</h2>

    <dailyrequest-dashboard v-bind:cleanData="cleanData"></dailyrequest-dashboard>
    <hourlyrequest-dashboard v-bind:cleanData="cleanData"></hourlyrequest-dashboard>
    <statusrequest-dashboard v-bind:cleanData="cleanData"></statusrequest-dashboard>
    <fromemail-dashboard v-bind:cleanData="cleanData"></fromemail-dashboard>
  </div>
</template>

<script>
    import DailyRequestRate from "./DailyRequestRate.vue";
    import HourlyRequestRate from "./HourlyRequestRate.vue";
    import RequestStatusDist from "./RequestStatusDist.vue";
    import RequestFromEmail from "./RequestFromEmail.vue";

    export default {
        props: ["cleanData"],
        components: {
            'dailyrequest-dashboard': DailyRequestRate,
            'hourlyrequest-dashboard': HourlyRequestRate,
            'statusrequest-dashboard': RequestStatusDist,
            'fromemail-dashboard': RequestFromEmail,
        },
        data () {
            return {
                childComponents: ['DailyRequestRate.vue','HourlyRequestRate.vue', 'RequestStatusDist.vue', 'RequestFromEmail.vue']
            }
        },
        methods: {

        },
        computed: {

        }
    }
</script>

<style>


</style>
