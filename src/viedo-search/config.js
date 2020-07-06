import devConfig from './config.dev.js'

const config = {
	doubanBaseUrl:'http://api.douban.com',
	doubanApikey:'0df993c66c0c636e29ecbb5344252a4a',
	theme:{
		primaryColor:'#30A9DE',
		subColor:'#EFDC05',
		hightColor:'#E53A40',
		blackColor:'#090707',
	},
	cfBaseUrl:'http://wmtest.xyz:8888',
	source:'https://gitee.com/api/v5/repos/WumaCoder/viedo-search/git/trees/master?recursive=1',
};

if (process.env.NODE_ENV === 'development') {
    Object.assign(config,devConfig);
}

export default config;