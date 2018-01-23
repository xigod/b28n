'use strict';

var path = require('path');
var core = require('./libs/reasy-command-b28');
var file = require('./libs/file');
var options = require('./libs/getOption')(process.argv.splice(2));
var console = require('./libs/console');

var valueArr = [];
/*for(var i in options) {
    console.log("@@@@@@@options="+i);
    console.log("@@@@@@@options="+options[""+i]);
}*/
function fixPath(_path) {
    if (!file.isAbsolute(_path)) {
        _path = path.join(process.cwd(), _path);
    }
    return _path;
}


if (options.h || !options.f) {
    console.log('EXCEL转JSON: \r\n\tnode ' + path.basename(process.argv[1]) + ' -f xlsxfile.xlsx -o ./outdir -key en -value cn');
    return;
}

options.f = fixPath(options.f);

if (!options.o) {
    options.o = path.resolve(options.f).replace(/\.xlsx$/i, '.json');
}

options.o = fixPath(options.o);

if (!options.key || options.key === true) {
    console.log("options.key" + options.key);
    options.key = 'zh';
}

//获取value参数数组
valueArr = options.value.split(',');

if (!options.value || options.value === true) {
    console.log("options.value" + options.value);
    options.value = 'en';
}

core.parse({
    file: options.f,
    dest: options.o,
    key: options.key,
    lang: valueArr
});
console.log('success!!');
