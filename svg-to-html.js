var fs = require('fs');
var parseString = require('xml2js').parseString;

var file = 'coral.svg';
var saveTo = 'coral-grid.html';

fs.readFile(file, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    data = data.slice(data.indexOf('>') + 1);
    data = '<div class="svg-wrapper">' + data;
    data = data.replace(/svg/g, 'div');

    var document = parseString(data, function (err, data2) {
        for( var i=0; i < data2.div.symbol.length; i++ ){
            data = data.replace(/[<]symbol/, '<div class="svg-item"><span>#' + data2.div.symbol[i].$.id + '</span>' + '<svg');
            data = data.replace(/[<][/]symbol/, '</svg></div');
        }
    });

    data =
        '<style>' +
        'body {margin: 0; background: #e8e8e8;}' +
        '.div-wrapper { display: flex; flex-wrap: wrap; padding: 1rem}' +
        '.svg-item { background: #d8d6d6; display: flex; flex-direction: column; margin: .3rem .15rem; align-items: center;}' +
        'span {font-size: 11px; border-bottom: solid 1px #d8d6d6; padding: .2rem; width: 100%; text-align: center}' +
        'svg { width: 3rem; height: 3rem; margin-top: .3rem; padding: .2rem;}' +
        '</style>' + data;

    //console.log(data);
    fs.writeFile(saveTo, data, 'utf8', function (err) {
        if (err){ return console.log(err) }
        else { console.log('Done!')}
    });
});
