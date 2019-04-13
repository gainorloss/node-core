
```node
npm i node-core-fx -S
```
```javascript
const fx=require('node-dev-fx');
var httpServer=fx.httpServer;
httpServer.addHandlers('/api/hello',function(req){
    return "hello";
});
httpServer.addHandlers('/api/users',function(req){
    return {id:1,name:'gainorloss'};
});
httpServer.start('localhost',3000);
```