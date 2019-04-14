const cheerio = require('cheerio');

const htmlParser = {};

/**
 * Get items from html content.
 * @param content
 * @param selectors
 */
htmlParser.getItems = function (content, selectors,callback) {
    var $ = cheerio.load(content);
    if(typeof callback==='function'){
        $(selectors).each(function(i,e){
           callback($,i,e);
        });
    }
}
module.exports=htmlParser;