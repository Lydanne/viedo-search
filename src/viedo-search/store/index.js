import Vuex from 'vuex'
import Vue from 'vue'
import Source from './modules/source'
import {
	getVersions,
	downloadInatallApp
} from '@/common/apis/gitee.js'

import vuexStorage from './plugins/vuex-storage.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
	plugins: [vuexStorage],
	state: {
		versions: [],
		versionIndex: -1, //当前版本
		isUpdate: false
	},
	getters: {
		currentVersion(state) {
			if(state.versionIndex===-1){
				return {commit:{}};
			}
			return state.versions[state.versionIndex];
		},
		lastVersion(state) {
			if(state.versions.length===0){
				return {commit:{}};
			}
			return state.versions[state.versions.length - 1];
		}
	},
	mutations: {
		uptVersions(state, versions) {
			state.versions.splice(0,state.versions.length,...versions);
		},
		setVersionIndex(state, index) {
			state.versionIndex = index;
		},
		chageUpdateState(state, bool) {
			state.isUpdate = bool;
		}
	},
	actions: {
		async checkUpdate({
			state,
			commit
		}) {
			const versions = await getVersions();
			commit('uptVersions', versions);
			if (state.versionIndex === -1) {
				commit('setVersionIndex', versions.length - 1);
			}
			if (versions.length === state.versionIndex + 1) {
				commit('chageUpdateState', false);
				return false;
			}

			commit('chageUpdateState', true);
			return true;
		},
		async update({
			state,
			commit,
			getters
		}) {
			if (!state.isUpdate) {
				console.log('no update');
				return false;
			}
			const [err,res] = await uni.showModal({
				title: "版本更新",
				content: `更新内容:\n${getters.lastVersion.message}\n更新时间:\n${getters.lastVersion.commit.date}`,
				confirmText: '立即更新',
				cancelText: '下次更新'
			});

			if(res.confirm){	
				try {
					await downloadInatallApp(getters.lastVersion);
					commit('chageUpdateState', false);
				} catch (err) {
					console.log('err:' + err)
					uni.showToast({
						title: '更新失败',
						duration: 1500
					});
				}
			}
		}
	},
	modules: {
		Source
	}
})
