import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Amplify from '@aws-amplify/api';
import awsconfig from './aws-exports';

Amplify.configure({
  ...awsconfig,                               
  aws_appsync_authenticationType: 'API_KEY'
});

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
