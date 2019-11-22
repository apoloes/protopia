<template>
  <div>
    <p>The child components of Students.vue are:</p>
    <ul>
      <li v-for="child in childComponents">{{ child }}</li>
    </ul>
  </div>
</template>

<script>

    export default {
        data () {
            return {
                childComponents: ['AskRate.vue', 'OpenRate.vue', 'ResponseRate.vue']
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


asks: {
"availableInteractions": [
"reopen"
],
"_id": "5d0ae3ae957f1c467499f652",
"status": "(7) Closed",
"subject": "Can you help with a question?",
"text": "Hi - \n\nMy name is Susan and I am currently a senior majoring in Mechanical Engineering. I am thinking about transitioning into the field of consulting and business analytics. I worked with two startups last year and consulted in the medical device and the design/innovation spaces, and found that I love the big picture side of a business.\n\nI am currently looking to learn more about business and consulting, and would love to find resources so I can work on these skills. I would also love to connect with people in this field so if you know who I could reach out to please let me know.\n\nIf you have any questions or information please contact me at susan.student@duke.edu and my phone number is (999)-123-4567.\n\nThank you!\n\nSusan Student\nsusan.student@duke.edu\n999-123-4567",
"community": {
"customSettings": {
"primaryBtnBgColor": "#000000",
"primaryTxtColor": "#ffffff",
"secondaryBtnBgColor": "#CCCCCC",
"secondaryTxtColor": "#ffffff",
"primaryColor": "#000000",
"secondaryColor": "#FFFFFF",
"logoURL": "https://storage.googleapis.com/protopia/images/logo_demo.png",
"iconURL": "https://storage.googleapis.com/protopia/images/icon_demo.png"
},
"name": "University"
},
"createdByMemberID": {
"displayName": "Susan Student"
},
"createdAt": "2019-06-20T01:38:54.524Z"
},
