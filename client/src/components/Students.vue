<template>
  <div>
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
          <dailyask-dashboard v-bind:cleanRequestData="cleanRequestData"></dailyask-dashboard>
          <hourlyask-dashboard v-bind:cleanRequestData="cleanRequestData"></hourlyask-dashboard>
<!--          <status-dashboard v-bind:cleanAskData="cleanRequestData"></status-dashboard>-->
<!--          <community-dashboard v-bind:cleanAskData="cleanRequestData"></community-dashboard>-->
<!--          <sentiment-dashboard v-bind:cleanAskData="cleanRequestData"></sentiment-dashboard>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import OpenRate from "./OpenRate.vue";
import ResponseRate from "./ResponseRate.vue";
import DailyAskRate from "./DailyAskRate.vue";
import HourlyAskRate from "./HourlyAskRate.vue";
import StatusDist from "./StatusDist.vue";
import CommunityDist from "./CommunityDist.vue";
import AskSentiment from "./AskSentiment.vue";

export default {
  props: ["cleanRequestData"],
  components: {
    'open-dashboard': OpenRate,
    'response-dashboard': ResponseRate,
    'dailyask-dashboard': DailyAskRate,
    'hourlyask-dashboard': HourlyAskRate,
    'status-dashboard': StatusDist,
    'community-dashboard': CommunityDist,
    'sentiment-dashboard': AskSentiment
  },
  data () {
    return {
      childComponents: ['DailyAskRate.vue','HourlyAskRate.vue', 'OpenRate.vue', 'ResponseRate.vue', 'StatusDist.vue', 'CommunityDist.vue', 'AskSentiment.vue']
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
