import Students_page from './components/StudentsPage.vue';
import Alumni_page from './components/AlumniPage.vue';
import home from './components/Home.vue';



export default [
  { path: '/', component: home},
  { path: '/alumni', component: Alumni_page},
  { path: '/students', component: Students_page}
]
