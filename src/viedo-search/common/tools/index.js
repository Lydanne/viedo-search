/**
 * 自动组合get参数
 * @param {JSON} params 参数 
 * @param {String} initStr 初始化字符串
 * @return {String} 拼接好的get参数
 */
export function decodeParams(params = {}, initStr = ""){
	if(isEmpty(params)) return '';
	const arr = [];
	for(const key in params){
		arr.push(key + '=' + params[key]);
	}
	initStr += arr.join('&');
	return initStr;
}

/**
 * 判断一个变量是否为空
 * @param {any} any 一个任意类型的值
 * @return {Boolean} 返回是否为空
 */
export function isEmpty(any){
	switch(typeof any){
		case 'object': 
			return Object.keys(any).length === 0;
		case 'string':
			return any.length === 0;
		case 'number':
			return any === 0;
		default :
			return Boolean(any);
	}
}

export function isObject(obj){
	return typeof obj === 'object' && !(obj instanceof Array);
}


export function isArray (value) {
	return value instanceof Array;
}

export function sleep(interval = 500){
	return new Promise(resolve => setTimeout(resolve,interval))
}

export function looseJsonParse (obj) {
	return Function('"use strict";return (' + obj + ')')();
}

/**
 * 深度遍历对象
 * @param target 目标对象
 * @param callback 处理每个元素的回调函数
 * @param path 当前元素的位置
 */
export function deepEach (target, callback = (value) => value, path = "$") {
	let _target = null;
	if (isObject(target)) {
		const keys = Object.keys(target);
		_target = {};
		keys.forEach(key => {
			_target[key] = deepEach(target[key], callback, path + "." + key);
		});
	}
	else if (isArray(target)) {
		_target = [];
		target.forEach((item, index) => {
			_target[index] = deepEach(item, callback, path + `[${index}]`);
		});
	}
	else {
		return callback(target, path);
	}
	return _target;
}

export function sourceParse(sourceItem, extra = {}){
	const [ ,fullName ] = sourceItem.path.split('/');
	const [ name, version ] = fullName.split('.');
	return {
		name,
		version,
		url:sourceItem.url,
		...extra
	};
}
