
```node
npm i node-core-fx -S
```
```javascript
const fx=require('node-dev-fx');
var httpServer=fx.httpServer;
httpServer.addHandler('/api/hello',function(req){
    return "hello";
});
httpServer.addHandler('/api/users',function(req){
    return {id:1,name:'gainorloss'};
});
httpServer.start('localhost',3000);
```