const { HttpCrawler } = require('http-crawler');
module.exports = ()=>{
  const imo = new HttpCrawler({
    meta:{
      name:'imomoe',
      version:'202007081',
      home:'m.imomoe.in',
      zhName:'樱花动漫',
      search:'科学的超电磁炮S'
    },
    option:{
      delay:300
    },
    steps:[
      {
        url:'http://www.zkk7.com/search/-------------.html',
        params:{
          wd:'{{v-meta=search}}'
        },
        resultModel:{
          home:'{{v-meta=home}}',
          title:'{{v-resp-html=.detail .title|[*].structuredText}}',
          router:'http://www.zkk7.com/{{v-resp-html=.detail .margin-0|[*].firstChild.attributes.href}}'
        }
      },
      {
        key:'voides',
        url:'{{v-prev-resu=[*].router}}',
        isMergeResult:true,
        resultModel:{
          name:'{{v-resp-html=.stui-content__playlist a|[*].structuredText}}',
          router:'http://www.zkk7.com/{{v-resp-html=.stui-content__playlist a|[*].attributes.href}}'
        }
      },
      {
        key:'test',
        url:'{{v-prev-resu=[*].router}}',
        isMergeResult:true,
        resultModel:{
          router:'{{v-resp-html=script|attributes}}'
        }
      },
    ]
  });
  imo.on('request:err',(e)=>{
    console.log(e);
    
  });

  imo.on('go:after',(result)=>{
    console.log(result);
    
  });
  imo.run().then(res=>{
    console.log(res);
    console.log(imo);
    return res;
  })
}