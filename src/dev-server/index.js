const express = require("express");
const bodyParser = require("body-parser");
const cloudFunction = require("./cloud-function");

const app = express();
app.listen(8888);

app.use(bodyParser.json());

app.post('/cf/:funName', (req,res)=>{
  const { funName } = req.params;
  const { args } = req.body;
  console.log(`${new Date().toLocaleString()} | ip:${req.ip} | call:${funName}, args:${args}`);
  cloudFunction(funName, args, (returns)=>{
    res.send({returns});
  });
});

