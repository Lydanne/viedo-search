import config from "@/config.js";
import Http from "luch-request";

const { doubanBaseUrl, doubanApikey } = config;

export const douban = new Http({ baseURL: doubanBaseUrl });
douban.interceptors.request.use(config => {
	Object.assign(config.params, { apikey: doubanApikey });
	return config;
});

export function axios(config){
	const requestConfig = {};
	requestConfig.method = config.method.toUpperCase();
	requestConfig.params = config.params;
	requestConfig.data = config.data;
	requestConfig.url = config.url;
	requestConfig.header = config.headers;
	requestConfig.timeout = config.timeout;
	const http = new Http();
	return http.request(requestConfig);
}

export default new Http();