const axios = require("axios");

module.exports =  (config) => {
  console.log(config);
  // return axios({ 
  //   url:'https://api.clicli.us/search/posts',
  //   params:{key:'超电磁炮'},
  //   method:'GET',
  //   header:{},
  //   data:{}
  // }).then(res => {
  //   return res.data;
  // })
  return axios(config).then(res => res.data);
}