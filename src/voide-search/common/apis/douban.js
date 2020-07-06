import {douban} from "@/common/tools/http.js"

export function getTop250(){
	return douban.get('/v2/movie/top250').then(res => res.data);
}

export function getHotList(){
	return douban.get('/v2/movie/in_theaters').then(res => res.data);
}