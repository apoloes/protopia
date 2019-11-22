<template>
  <div>
<!--    <p>The child components of Content.vue are:</p>-->
<!--    <ul>-->
<!--      <li v-for="child in childComponents">{{ child }}</li>-->
<!--    </ul>-->
<!--    <students v-bind:cleanAskData="cleanAskData"></students>-->
    <sidebar></sidebar>
    <students_graphs v-bind:cleanAskData="cleanAskData"></students_graphs>

  </div>
</template>

<script>
import students_graphs from "./Students";
import SideBar from "./SideBar";
import home from "./home";
import students_page from "./students_page";
import alumni_page from "./alumni_page";

export default {
  props: ["cleanAskData"],
  components: {
     'sidebar': SideBar,
    'students': students_page,
      'alumni': alumni_page,
      'home' : home,
      'students_graphs' : students_graphs
  },
  data () {
    return {
      childComponents: ['Students.vue']
    }
  },
  methods: {

  },
  computed: {

  },
}

</script>

<style>

</style>
