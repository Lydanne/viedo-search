import config from "@/config.js";
import Axios from "luch-request";

const { doubanBaseUrl, doubanApikey } = config;

export const douban = new Axios({ baseURL: doubanBaseUrl });
douban.interceptors.request.use(config => {
	Object.assign(config.params, { apikey: doubanApikey });
	return config;
});

export default new Axios();