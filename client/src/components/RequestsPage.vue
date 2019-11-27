<template>
  <div id="app">
    <h2 class="pagetitle">Requests page</h2>
    <student_graphs v-bind:cleanRequestData="cleanRequestData"></student_graphs>
  </div>
</template>

<script>
    import StudentGraphs from "./Students";
    export default {
        props: ["cleanRequestData"],
        name: "RequestsPage",
        components: {
            'student_graphs' : StudentGraphs
        }
    }
</script>

<style scoped>

</style>
