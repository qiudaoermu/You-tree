import Vue from 'vue';
import App from './app.vue';
import './assets/styles/global.styl'
import 'animate.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
const root = document.createElement('div');
document.body.appendChild(root);


new Vue({
    render:(h) => h(App)
}).$mount(root);

