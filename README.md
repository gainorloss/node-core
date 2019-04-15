
## install package

```javascript
npm i node-dev-fx -S
```

## import package

```javascript
const fx=require('node-dev-fx');
```

## httpServer

```javascript
var httpServer=fx.httpServer;
httpServer.addHandler('/api/hello',function(req){
    return "hello";
});
httpServer.addHandler('/api/users',function(req){
    return {id:1,name:'gainorloss'};
});
httpServer.start('localhost',3000);
```
## html downloader & parser

```javascript
var downloader=fx.htmlDownloader;
var parser=fx.htmlParser;

downloader.getHtmlContent("http://visionmedia.github.io/superagent/",{},content=>{
    parser.getItems(content,"h3",function($,i,e){
        console.log($(e).text());
    });
});
```

## scheduler & logger.

```javascript
var scheduler=fx.scheduler;
var logger=fx.logger;

let i=0;
scheduler.addJob("default",'*/1 * * * * ?',function(){
   i++;
   logger.debug(i);
   logger.info(i);
   logger.warning(i);
   logger.err(i);
});
scheduler.run();
```