<template>
  <div id="app">
    <h1 class="globaltitle">Protopia</h1>

    <h2 class="pagetitle">Responses Page</h2>
    <dailyresponse-dashboard v-bind:cleanData="cleanData"></dailyresponse-dashboard>
    <hourlyresponse-dashboard v-bind:cleanData="cleanData"></hourlyresponse-dashboard>
    <statusresponse-dashboard v-bind:cleanData="cleanData"></statusresponse-dashboard>
    <fromemail-dashboard v-bind:cleanData="cleanData"></fromemail-dashboard>
  </div>
</template>

<script>
    import DailyResponseRate from "./DailyResponseRate.vue";
    import HourlyResponseRate from "./HourlyResponseRate.vue";
    import ResponseStatusDist from "./ResponseStatusDist.vue";
    import ResponseFromEmail from "./ResponseFromEmail.vue";

    export default {
        props: ["cleanData"],
        components: {
            'dailyresponse-dashboard': DailyResponseRate,
            'hourlyresponse-dashboard': HourlyResponseRate,
            'statusresponse-dashboard': ResponseStatusDist,
            'fromemail-dashboard': ResponseFromEmail,
        },
        data () {
            return {
                childComponents: ['DailyResponseRate.vue','HourlyResponseRate.vue', 'ResponseStatusDist.vue', 'ResponseFromEmail.vue']
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
