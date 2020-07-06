import { deepEach } from '@/common/tools'

let timer = null;
let initStateData = {};
export default function (store) {
	try {
	    const value = uni.getStorageSync('@vuex');
		initStateData = store.state;
	    if (value) {
			const json = JSON.parse(value);
			store.replaceState(json);
			console.log('加载Store成功');
	    }
		store['initState'] = (stateTreeName) => {
			const stateNames = stateTreeName.split('.');
			const lastName = stateNames.pop();
			const currentState = deepEach(store.state);
			const initStateTemp = deepEach(initStateData);
			let t1 = currentState;
			let t2 = initStateTemp;
			for (let i = 0; i < stateNames.length; i++) {
				const key = stateNames[i];
				t1 = t1[key];
				t2 = t2[key];
			}
			t1[lastName] = t2[lastName];
			store.replaceState(currentState);
		}
	} catch (e) {
	    // error
		console.log(e)
	}
    store.subscribe((mutation, state) => {
		if(timer){
			clearTimeout(timer);
		}
		timer = setTimeout(()=>{			
			uni.setStorage({
				key: '@vuex',
				data: JSON.stringify(state),
			});
		},500)
    })
}