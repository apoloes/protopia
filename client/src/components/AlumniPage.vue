<template>
  <div>
    <div id="app">
      <h1>Alumni Page</h1>
    </div>
    <!--    <p>The child components of Students.vue are:</p>-->
    <!--    <ul>-->
    <!--      <li v-for="child in childComponents">{{ child }}</li>-->
    <!--    </ul>-->
    <!--    <open-dashboard></open-dashboard>-->
    <!--    <response-dashboard></response-dashboard>-->
    <!--    <div id="wrapper">-->
    <!--      <div class="left">-->
    <!--        <div id="sidebar">-->
    <!--          <p>Sidebar</p>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="right">-->
    <dailyresponse-dashboard v-bind:cleanData="cleanData"></dailyresponse-dashboard>
    <hourlyresponse-dashboard v-bind:cleanData="cleanData"></hourlyresponse-dashboard>
    <statusresponse-dashboard v-bind:cleanData="cleanData"></statusresponse-dashboard>
    <!--          <community-dashboard v-bind:cleanAskData="cleanRequestData"></community-dashboard>-->
    <!--          <sentiment-dashboard v-bind:cleanAskData="cleanRequestData"></sentiment-dashboard>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
    import DailyResponseRate from "./DailyResponseRate.vue";
    import HourlyResponseRate from "./HourlyResponseRate.vue";
    import ResponseStatusDist from "./ResponseStatusDist.vue";

    export default {
        props: ["cleanData"],
        components: {
            'dailyresponse-dashboard': DailyResponseRate,
            'hourlyresponse-dashboard': HourlyResponseRate,
            'statusresponse-dashboard': ResponseStatusDist,
        },
        data () {
            return {
                childComponents: ['DailyResponseRate.vue','HourlyResponseRate.vue','ResponseStatusDist.vue']
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
