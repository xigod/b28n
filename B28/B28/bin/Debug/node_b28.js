var jsdom = require('jsdom'),
    fs = require('fs'),
    path = require('path'),
    B = require('./libs/b28lib').b28lib,
    glob = require('./libs/glob'),
    file = require('./libs/file'),
    xlsxWriter = require('./libs/xlsx-write'),
    console = require('./libs/console');

var includes = '**.{js,html,htm,asp,tpl,xml}';
var excludes = '**{lang,img,.css,.svn,.git,jquery,.min.js,shiv.js,respond.js,b28,shim.js,/goform/,/cgi-bin/}**';
//或['.svn', 'goform', 'css', 'images', 'lang', 'fis', 'config.js', 'release.js'];


var spliter = '\t**--**\t';

var gfileList = [],

    CONFIG = {
        src: null,
        dest: null,
        help: null,
        onlyZH: false,
        dict: null //翻译模式时需要指定
    },
    jsonDict = {};


function unique(inputs, type) {
    var res = [];
    var json = {};
    if (!inputs) {
        return [];
    }
    for (var i = 0; i < inputs.length; i++) {
        if (typeof inputs[i] === 'undefined') continue;

        if (!json[inputs[i]]) {
            if (type === 1) {
                inputs[i] = inputs[i].split(spliter);
            }
            res.push(inputs[i]);
            //json[inputs[i]] = 1;
        }
    }
    return res;
}


function readDict(filename, key, value) { //读取字典
	if (path.extname(filename) === '.xlsx') {
        jsonDict.content = require('./libs/xlsx-read').parse(filename, key, value);
    } else {
        jsonDict.content = fs.readFileSync(filename, 'utf-8');
    }
	
}

function writeExcel(filename, array) { //以xlsx形式写入
    xlsxWriter.write(filename, 'translate', array, {
        wscols: [{
            wch: 30
        }, {
            wch: 10
        }, {
            wch: 0.0000000000001
        }, {
            wch: 100
        }]
    });
   // console.log(filename + ' success saved!');
}

function writeText(filename, content) { //以文本形式写入
    fs.writeFileSync(filename, content);
   // console.log(filename + ' success saved!');
}

function writeFile(saveTo, array) { //文件写入
    saveTo = path.resolve(saveTo);
    if (/\.xlsx$/.test(saveTo)) {
        writeExcel(saveTo, unique(array, 1));
    } else {
        writeText(saveTo, unique(array, 1).join("\r\n"));
    }
}

function correctPath(_path) {
    if (!_path) return '';
    return path.resolve(_path);
}

function filter(key) {
    if (typeof includes === 'string') {
        includes = glob(includes);
        excludes = glob(excludes);
    }

    return includes.test(key) && !excludes.test(key);
}


function getFileList(srcFolder, destFolder) {
    if (!gfileList || gfileList.length === 0) {
        srcFolder = correctPath(srcFolder);

        var files = file.scanFolder(srcFolder);

        if (destFolder) {
            destFolder = correctPath(destFolder);

            files.folders.forEach(function(val) {
                file.createFolder(path.join(destFolder, path.relative(srcFolder, val))); //创建目录
            });

        }

        files.files.forEach(function(val) {
            //console.log("file.relative(CONFIG.src, val)========="+file.relative(CONFIG.src, val));
            //console.log("destFolder========="+destFolder);
            if (filter('/' + file.relative(CONFIG.src, val))) {
                gfileList.push({
                    fileName: val,
                    fileType: path.extname(val)
                });

            } else if (destFolder) {

                //如果是翻译模式需要将未匹配的文件原样拷贝
                var dst = path.join(destFolder, path.relative(srcFolder, val));
                if (fs.existsSync(val) && !fs.existsSync(dst)) {
					file.cp(val, dst);
                }
            }
        });
    }
	
    return gfileList;
}

function _getPageLangData(page) { //提取html
    //console.log("path.resolve(page)+++++++"+path.resolve(page));
    var content = fs.readFileSync(page, 'utf-8');
    var document = jsdom.jsdom(content);
    var arr = new B.getPageData(document.documentElement, CONFIG.onlyZH, path.resolve(page));
    document = '';
    //console.log("arr+++++++"+arr);
    return arr;
}

function _getResLangData(file) { //提取js
    var content = fs.readFileSync(file, 'utf-8');
    var arr = new B.getResData(content, CONFIG.onlyZH, path.resolve(file));
    return arr;
}

function _GetXMLLangData(file) { //提取xml
    var content = fs.readFileSync(file, 'utf-8');
    var arr = new B.GetXMLData(content, path.resolve(file));
    return arr;
}


function doGetLangData(file) { //执行提取
    if (file.fileType == ".js") {
        return _getResLangData(file.fileName);
    } else if(file.fileType == ".xml") {
        return _GetXMLLangData(file.fileName);
    } else {
        return _getPageLangData(file.fileName);
    }
}


function getLangData(srcdir, saveTo) { //提取入口
    var langFetchArr = [];
    if (srcdir && typeof srcdir == 'string' && fs.lstatSync(srcdir).isDirectory()) {
        gfileList = getFileList(srcdir);
        gfileList.forEach(function(val) {
            //console.log("文件为++++++++++++++++"+val.fileName);
            langFetchArr = langFetchArr.concat(doGetLangData(val));
            //console.log("内容++++++++++++++++"+langFetchArr);
        });

    } else {
        langFetchArr = doGetLangData({
            fileName: srcdir,
            fileType: path.extname(srcdir)
        });
    }
    console.log("langFetchArr========"+langFetchArr);
    if (CONFIG.onlyZH) {
        langFetchArr.unshift(['zh', 'en'].join(spliter));
    } else {
        langFetchArr.unshift(['en', 'other'].join(spliter));
    }
    writeFile(saveTo, langFetchArr);
    writeExcel(path.join(path.dirname(saveTo), 'remark.xlsx'), unique(B.getRemark(), 1));
}

function _translatePage(page, saveTo) { //翻译html
    var content = fs.readFileSync(page, 'utf-8');
    var document = jsdom.jsdom(content);
    var script = document.getElementsByTagName('script');

    for(var i = 0; i < script.length; i++) {
        console.log(script[i].innerHTML);
        script[i].innerHTML = B.translateRes(script[i].innerHTML)
        console.log(script[i].innerHTML);
    }
    B.transTitle(document, path.resolve(page));
    B.translatePage(document, path.resolve(page));
	
    writeText(saveTo, "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML);
}

function _translateRes(file, saveTo) { //翻译js
    var content = fs.readFileSync(file, 'utf-8');
    var ret = B.translateRes(content, path.resolve(file));
    writeText(saveTo, ret);
}

function doTranslate(file, savepath) { //执行翻译
    if (file.fileType == ".js") {
        _translateRes(file.fileName, savepath);
    } else if (file.fileType == ".htm" || file.fileType == ".html" || file.fileType == ".asp") {
        _translatePage(file.fileName, savepath);
    }
}

function translatePage(srcdir, saveTo) { //翻译入口
    if (srcdir && typeof srcdir == 'string' && fs.statSync(srcdir).isDirectory()) { //如果是目录,先扫描目录

        var fileList = getFileList(srcdir, saveTo);
		
        fileList.forEach(function(val) {
            doTranslate(val, val.fileName.replace(srcdir, saveTo));
        });
    } else {
        doTranslate({
            fileType: path.extname(srcdir),
            fileName: srcdir
        }, saveTo);
    }
    var jsonData = [],
        MSGCopy = B.getUnTranslate();//获取未被翻译的项

    for (var key in MSGCopy) {
        jsonData.push([key, MSGCopy[key]]);
    }
    xlsxWriter.write('未翻译项.xlsx', 'xixi', jsonData);
    writeExcel(path.join(path.dirname(CONFIG.lang), 'remark.xlsx'), unique(B.getRemark(), 1));
}


CONFIG.help = '帮助信息:\r\n\t\r\n\t提取命令:\r\n\tnode node_b28.js -src=srcdir -dest=destdir -zh\r\n\t\r\n\t'
+'翻译命令:\r\n\tnode node_b28.js -src=srcdir -dest=destdir -lang=langfile -t\r\n\t\r\n\t'
+'如果语言包是excel，则命令如下：\r\n\ttnode node_b28.js -src=srcdir -dest=destdir -lang=langfile -t -key=en -value=fr';

console.log("hello, node b28!\r\nCoreVersion: " + B.coreVersion + '\r\nNode b28 Version: V1.5\r\n');



//将命令和参数分离
var args = require('./libs/getOption')(process.argv.splice(2));


/*for(var i in args) {
    console.log("aaaaaaaaaaaaaaaaa"+i)
}*/

if (!args.h) {
   
    CONFIG.src = correctPath(args.src);
    CONFIG.dest = correctPath(args.dest);
    CONFIG.lang = correctPath(args.lang);
    
    if (args.src && args.dest) {
        if (args.t) {
            console.log('翻译模块');
            if (CONFIG.lang) {
                console.log('开始加载语言包');
				if(path.extname(CONFIG.lang) === ".json") {
					readDict(CONFIG.lang);
					B.translateFileType("json");
					B.loadJSON(jsonDict.content);
					
				} else {
					//.xlsx时需要对应的 key / value
					if(!args.key || !args.value) {
						throw "xlsx file must be input -key and -value";
					}
					readDict(CONFIG.lang, args.key, args.value);
					B.translateFileType("xlsx");
					
					B.loadJSON(jsonDict.content, "xlsx");
				}
                console.log('开始翻译');
				
				//假如目的文件不存在则创建
				if(!fs.existsSync(CONFIG.dest)) {
					fs.mkdirSync(CONFIG.dest);
				}
                translatePage(CONFIG.src, CONFIG.dest);
            } else {
                console.log('请指定JSON格式语言包!');
            }
        } else {
            console.log('提取模块');
            //console.log(CONFIG);
            if (args.zh) {
                CONFIG.onlyZH = true;
            }
            getLangData(CONFIG.src, CONFIG.dest);
        }
    } else {
        console.log('请指定源目录和目标目录!');
    }
} else {
    console.log(CONFIG.help);
}
console.log('成功!');//返回success
process.exit();