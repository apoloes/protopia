import Students_page from './components/students_page.vue';
import Alumni_page from './components/alumni_page.vue';
import home from './components/home.vue';



export default [
  { path: '/', component: home},
  { path: '/alumni', component: Alumni_page},
  { path: '/students', component: Students_page}
]
