<template>
  <div id="app">
    <h2 class="pagetitle">Alumni page</h2>
    <student_graphs v-bind:cleanAskData="cleanAskData"></student_graphs>
  </div>
</template>

<script>
    import StudentGraphs from "./Students";
    export default {
        props: ["cleanAskData"],
        name: "AlumniPage",
        components: {
            'student_graphs' : StudentGraphs
        }
    }
</script>

<style scoped>

</style>
