<template>
  <div>
    <div id="app">
      <h1>Student Page</h1>
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
    <dailyrequest-dashboard v-bind:cleanData="cleanData"></dailyrequest-dashboard>
    <hourlyrequest-dashboard v-bind:cleanData="cleanData"></hourlyrequest-dashboard>
    <!--          <status-dashboard v-bind:cleanAskData="cleanRequestData"></status-dashboard>-->
    <!--          <community-dashboard v-bind:cleanAskData="cleanRequestData"></community-dashboard>-->
    <!--          <sentiment-dashboard v-bind:cleanAskData="cleanRequestData"></sentiment-dashboard>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
    import DailyRequestRate from "./DailyRequestRate.vue";
    import HourlyRequestRate from "./HourlyRequestRate.vue";

    export default {
        props: ["cleanData"],
        components: {
            'dailyrequest-dashboard': DailyRequestRate,
            'hourlyrequest-dashboard': HourlyRequestRate,
        },
        data () {
            return {
                childComponents: ['DailyRequestRate.vue','HourlyRequestRate.vue']
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
