<template>
  <div id="app">
    <h1 class="globaltitle"><router-link to="/">Protopia</router-link></h1>
    <h2 class="pagetitle">Home</h2>
    <div class="parent-card">
      <div class="widget-card">
        <p class="card-heading">Total Monthly Emails: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanFullData.numTotalEmails}}</h1><vs-icon icon="post_add"></vs-icon>
        </div>
      </div>

      <div class="widget-card">
        <p class="card-heading">Total Monthly Opens: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanFullData.numTotalOpens}}</h1><vs-icon icon="drafts"></vs-icon>
        </div>
      </div>

      <div class="widget-card">
        <p class="card-heading">Total Monthly Clicks: </p>
        <div class="dataCounts">
          <h1>{{cleanData.cleanFullData.numTotalClicks}}</h1><vs-icon icon="touch_app"></vs-icon>
        </div>
      </div>

    </div>
    <div id="barCharts">
      <div id="first">
        <weeklyemails-dashboard v-bind:cleanData="cleanData"></weeklyemails-dashboard>
      </div>
      <div id="second">
        <weeklyopens-dashboard v-bind:cleanData="cleanData"></weeklyopens-dashboard>
      </div>
      <div id="third">
        <weeklyclicks-dashboard v-bind:cleanData="cleanData"></weeklyclicks-dashboard>
      </div>
    </div>
    <monthlycounts-dashboard v-bind:cleanData="cleanData"></monthlycounts-dashboard>
  </div>
</template>

<script>
    import HomeWeeklyEmails from "./HomeWeeklyEmails.vue";
    import HomeWeeklyOpens from "./HomeWeeklyOpens.vue";
    import HomeWeeklyClicks from "./HomeWeeklyClicks.vue";
    import HomeMonthlyCounts from "./HomeMonthlyCounts.vue";

    export default {
        name: "Home",
        props: ["cleanData"],
        components: {
            'weeklyemails-dashboard': HomeWeeklyEmails,
            'weeklyopens-dashboard': HomeWeeklyOpens,
            'weeklyclicks-dashboard': HomeWeeklyClicks,
            'monthlycounts-dashboard': HomeMonthlyCounts,
        },
        data () {
            return {
                childComponents: ['HomeWeeklyEmails.vue','HomeWeeklyOpens.vue', 'HomeWeeklyClicks.vue', 'HomeMonthlyCounts.vue']
            }
        },
    }
</script>

<style scoped>
  #barCharts{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .custom-card .header-card .card{
    padding: 20px;
    border-radius: 5px;
  }
  /*#first, #second, #third{*/
  /*  padding: 20px;*/
  /*  border-radius: 5px;*/
  /*}*/
  .card-heading{
    padding: 5px;
    font-weight: lighter;
    font-size: 1.3em;
    color: black;
  }
  .parent-card{
    /*margin-top: 20px;*/
    width: 80%;
    margin: auto;
    padding: 30px;
  }
  .widget-card{
    border-radius: 5px;
    background: none !important;
    box-shadow: none !important;
  }
  .widget-card .vs-icon{
    padding-bottom: 4px;
  }
</style>
