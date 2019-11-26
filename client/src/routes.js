import ResponsesPage from './components/ResponsesPage.vue';
import RequestsPage from './components/RequestsPage.vue';
import home from './components/Home.vue';



export default [
  { path: '/', component: home},
  { path: '/requests', component: RequestsPage},
  { path: '/responses', component: ResponsesPage}
]
