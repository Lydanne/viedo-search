import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import scss from './variables.scss'
import * as douban from './common/apis/douban.js'
import config from './config.js'
import * as native from './common/tools/native'
import {store} from './store'
import { HttpCrawler } from 'http-crawler'
import http from './common/tools/http'

HttpCrawler.http = http.request.bind(http);

Vue.use(uView);
Vue.config.productionTip = false;

Vue.prototype.$douban = douban;
Vue.prototype.$scss = Object.assign(scss, config.theme);
Vue.prototype.$tools = Object.assign({},native);

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
