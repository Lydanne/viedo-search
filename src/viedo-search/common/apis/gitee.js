import axios from "@/common/tools/http.js"
import { looseJsonParse } from "@/common/tools"
import { Base64 } from 'js-base64'
import config from '@/config.js' 
import { download, installApp } from '../tools/native.js'

/**
 * 获取源信息
 * @returns SourceList
 *  [{
 *    path:'源的路径',
 *    url:'源的地址',
 *    ...
 *  }]
 */
export async function getSources(){
  const res = await axios.get(config.source);
  return res.data.tree.filter(item => item.path.search(/^sources\//gm)!==-1);
}

/**
 * 获取某个元素的源数据
 * @param {object} SourceItem SourceList的元素
 * @returns Source
 * {
 *    meta:{},
 *    option:{},
 *    ...
 * }
 */
export async function getSource(SourceItem){
  const res = await axios.get(SourceItem.url || SourceItem);
  return looseJsonParse(Base64.decode(res.data.content));
}

export async function getVersions(){
	return await axios.get(config.updateUrl).then(res=>res.data);
}

export async function downloadInatallApp(version){
	const url = `https://download.fastgit.org/WumaCoder/viedo-search/releases/download/${version.name}/steup.apk`;
	const res = await download(url);
	const instal = await installApp(res);
	return res;
}