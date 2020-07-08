import { getSources, getSource } from '@/common/apis/gitee'
import { sourceParse, isEmpty } from '@/common/tools'
import { HttpCrawler } from 'http-crawler'
export default {
  namespaced: true,
  state () {
    return {
      list: [
        /**
         * {
         *    source
         * }
         */
      ],
      resultList:[],
      toUpdateList: [
        /**
         * {
         *    listIndex:0,
         *    name:'',
         *    version:20200704,
         *    url:'',
         * }
         */
      ],
      updateTime: new Date(),
      toDels: [],
      isLoading:false,
      isUpdate: false,
    }
  },
  getters: {

  },
  mutations: {
    toUpdate (state, sourceList) {
      state.updateTime = new Date();
      state.toUpdateList = [];
      state.isUpdate = false;
      const sourceInfoList = sourceList.map(item => sourceParse(item));
      for (let i = 0; i < state.list.length; i++) {
        const source = state.list[i];
        const sourceInfoIndex = sourceInfoList.findIndex(item => item.name === source.meta.name);
        const sourceInfo = sourceInfoList[sourceInfoIndex] || {};
        if (sourceInfoIndex !== -1) { // 存在
          if (sourceInfo.version !== source.meta.version) {
            sourceInfo.status = 'upt';
            sourceInfo.targetIndex = i;
            state.isUpdate = true;
            state.toUpdateList.push(sourceInfo);
          }
          sourceInfoList.splice(sourceInfoIndex, 1);
        } else { //被移除
          sourceInfo.status = 'del';
          sourceInfo.targetIndex = i;
          state.toUpdateList.push(sourceInfo);
          state.isUpdate = true;
        }
      }
      sourceInfoList.forEach(sourceInfo => {
        sourceInfo.status = 'add';
        state.toUpdateList.push(sourceInfo);
        state.isUpdate = true;
      });
    },
    add (state, { source }) {
      state.list.push(source);
    },
    del (state, { index }) {
      state.toDels.push(index);
    },
    execDel (state) {
      state.toDels.forEach(item => state.list.splice(item, 1));
      state.toDels = [];
    },
    upt (state, { index, source }) {
      state.list[index] = source;
    },
    updateFinish (state) {
      state.toUpdateList = [];
      state.isUpdate = false;
    },
    remove (state, { key, index, deletaCount = 1 }) {
      state[key].splice(index, deletaCount)
    },
    removeAll (state, key) {
      state[key].splice(0, state[key].length)
    },
    addResultList(state, arr){
      state.resultList.push(...arr);
    },
    change(state, {key, value}){
      state[key] = value;
    }
  },
  actions: {
    /**
     * 检查更新
     */
    async inspect ({ commit }) {
      const sourceList = await getSources();
      commit('toUpdate', sourceList);
    },
    /**
     * 更新
     */
    async update ({ state, commit }) {
      for (let i = 0; i < state.toUpdateList.length; i++) {
        const sourceInfo = state.toUpdateList[i];
        let source = {};
        if (sourceInfo.status !== 'del'){
          source = await getSource(sourceInfo);
        }
        commit(sourceInfo.status, { index: sourceInfo.targetIndex, source });
      }
      commit('execDel')
      commit('updateFinish')
    },
    async search ({ state, commit }, searchIn) {
      commit('removeAll','resultList');
      commit('change',{key:'isLoading', value:true});
      let num = 0;
      const promises = state.list.map(source => {
        const http = new HttpCrawler(source);
        const res = http.run({ search: searchIn });
        num ++;
        return res;
      });
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        promise.then( res => {
          num --;
          commit('addResultList',res);
          if(num<=0){
            commit('change', { key: 'isLoading', value: false });
          }
        });
      }
    },
    stop () {

    },
    start () {

    }
  }
}