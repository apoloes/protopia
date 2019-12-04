// What the top level dependencies are (where to get the most important npm packages necessary);
// How to resolve the dependencies, along with instructions to Vue on using plugins/wrappers, if any;
// A Vue instance that manages the topmost component in the project: src/App.vue (the nodal .vue file).

// Import the dependencies and necessary modules
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Routes from './routes';


import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
import VueFusionCharts from 'vue-fusioncharts'


import { vsSideBar, vsButton, vsSelect, vsPopup, vsDivider, vsIcon, vsAvatar } from 'vuesax';
import 'vuesax/dist/vuesax.css'; //Vuesax styles
import 'material-icons/iconfont/material-icons.css';


Vue.config.productionTip = false;

// Resolve the dependencies
Charts(FusionCharts);
PowerCharts(FusionCharts);
Widgets(FusionCharts);
FusionTheme(FusionCharts);
GammelTheme(FusionCharts);

// Globally register the components for project-wide use
Vue.use(VueFusionCharts, FusionCharts, TimeSeries, Charts);
Vue.use(vsButton);
Vue.use(vsSideBar);
Vue.use(vsPopup);
Vue.use(vsSelect);
Vue.use(vsDivider);
Vue.use(vsIcon);
Vue.use(vsAvatar);

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
})
//
// const myDataSource = {
//   "chart": {
//     "caption": "Recommended Portfolio Split",
//     "subCaption" : "For a net-worth of $1M",
//     "showValues":"1",
//     "showPercentInTooltip" : "0",
//     "numberPrefix" : "$",
//     "enableMultiSlicing":"1",
//     "theme": "fusion"
//   },
//   "data": [{
//     "label": "Equity",
//     "value": "300000"
//   }, {
//     "label": "Debt",
//     "value": "230000"
//   }, {
//     "label": "Bullion",
//     "value": "180000"
//   }, {
//     "label": "Real-estate",
//     "value": "270000"
//   }, {
//     "label": "Insurance",
//     "value": "20000"
//   }]
// };

// Instantiate the Vue instance that controls the application
new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  components: { App },
  // data: {
  //   type: 'pie2d',
  //   width: '500',
  //   height: '30',
  //   dataFormat: 'json',
  //   dataSource: myDataSource
  // },
  template: '<App/>'
})




