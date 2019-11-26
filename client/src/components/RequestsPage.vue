<template>
  <div id="app">
    <h2 class="pagetitle">Requests page</h2>
    <student_graphs v-bind:cleanAskData="cleanAskData"></student_graphs>
  </div>
</template>

<script>
    import StudentGraphs from "./Students";
    export default {
        props: ["cleanAskData"],
        name: "RequestsPage",
        components: {
            'student_graphs' : StudentGraphs
        }
    }
</script>

<style scoped>

</style>
