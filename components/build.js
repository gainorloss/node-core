const chokidar=require('chokidar');
const path=require('path');
const logger=require('./logger');
const build={};

build.watch=function(callback){
    let watcher=chokidar.watch(path.join(__dirname,'../../../'),{persistent:true,usePolling:true})
    watcher.on('ready',function(){
        logger.info("build","Initial scan complete. Ready for changes.");
    });
    watcher.on('add',function(dir){
        logger.info("build",[dir,"has been created"].join(''));
        callback("created",dir);
    });
    watcher.on('change',function(dir){
        logger.info("build",[dir,"has been modified"].join(''));
        callback("modified",dir);
    });
    watcher.on('unlink',function(dir){
        logger.info("build",[dir,"has been removed"].join(''));
        callback("removed",dir);
    });
}
module.exports=build;