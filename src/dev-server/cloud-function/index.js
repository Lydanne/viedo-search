const axios = require('./axios');

const cfs = {
  axios,
};

module.exports = function(funName, args, callback){
  cfs[funName](...args).then(res => callback(res));
}