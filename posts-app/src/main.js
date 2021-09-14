import Vue from 'vue';
import App from './App.vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:4001'
  })
});

Vue.config.productionTip = false;
Vue.use(VueApollo);

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
