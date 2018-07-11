const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var fs = require('fs')

const { parse }  =  require('node-html-parser');


fs.readFile("/Users/Ant_user/workspace/shlomi-tests/svg-sprite/coral-svg-list.html", "utf8", function(err, data) {
    const dom = new JSDOM(data);
   // var e = dom.window.document.querySelector("svg").textContent
    //var er = dom.window.document.body.children;

    const root = parse(data);
    var sdf = root.querySelectorAll('svg');
    for (var i = 0; i < sdf.length; i++) {
        fs.writeFile("/Users/Ant_user/workspace/shlomi-tests/svg-sprite/svg-list/" + sdf[i].id + ".svg", sdf[i], function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
});