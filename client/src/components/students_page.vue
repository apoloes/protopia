<template>
  <div id="app">
    <h1>Student page</h1>
    <student_graphs v-bind:cleanAskData="cleanAskData"></student_graphs>
  </div>
</template>

<script>
    import student_graphs from "./Students";
    export default {
        props: ["cleanAskData"],
        name: "students_page",
        components: {
            'student_graphs' : student_graphs
        }
    }
</script>

<style scoped>

</style>
