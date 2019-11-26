<template>
  <div id="app">
    <h1>Student page</h1>
    <student_graphs v-bind:cleanRequestData="cleanRequestData"></student_graphs>
  </div>
</template>

<script>
    import StudentGraphs from "./Students";
    export default {
        props: ["cleanRequestData"],
        name: "students_page",
        components: {
            'student_graphs' : StudentGraphs
        }
    }
</script>

<style scoped>

</style>
