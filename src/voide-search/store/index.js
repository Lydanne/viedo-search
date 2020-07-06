import Vuex from 'vuex'
import Vue from 'vue'
import Source from './modules/source'

import vuexStorage from './plugins/vuex-storage.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state:{
	},
	plugins: [vuexStorage],
	modules:{
		Source
	}
})