import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import scss from './variables.scss'
import * as douban from './common/apis/douban.js'
import config from './config.js'
import { axios } from './common/tools/http'
import { HttpCrawler } from 'http-crawler'
import { store } from './store'
import HandleMixin from './mixins/handle-mixin.vue'

HttpCrawler.http = axios;

Vue.mixin(HandleMixin);

Vue.use(uView);
Vue.config.productionTip = false;

Vue.prototype.$douban = douban;
Vue.prototype.$scss = Object.assign(scss, config.theme);

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
