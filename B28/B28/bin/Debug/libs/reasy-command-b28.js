var excel = require('xlsx');
var fs = require('fs');
var path = require('path');
var file = require('./file');


function writeObjSync(filepath, obj) {
    file.createFolder(path.dirname(filepath));
    fs.writeFileSync(filepath, JSON.stringify(obj, null, 4));
}


function parse(file, dest, key, langArr) {
    var wb = excel.readFileSync(file, {
        cellFormula: false
    });

    var sheet_name_list = wb.SheetNames;
    sheet_name_list.forEach(function(y) { /* 遍历sheets */
        var ws = excel.utils.sheet_to_json(wb.Sheets[y]);
        //遍历多国语内容
        var langObj = {};
        for (var row = 0, rlen = ws.length; row < rlen; row++) { //遍历表格行

            if (!ws[row][key]) {
                console.warn('[WARN]:not find key `' + ws[row][key] + '` in excel!\r\n');
            }

            if (!langArr) {//如果没有指定需要输出的语言,则
              for (var col in ws[row]) { //遍历表格列,ws[row]表示一行的内容, col表示列头
                  if (col === key) {
                      continue;
                  }

                  if (!(col in langObj)) {
                      langObj[col] = {};
                  }
                  
                  langObj[col][ws[row][key]] = ws[row][col];
              }
            } else {//否则遍历语言
              for (var index = 0, clen = langArr.length; index < clen; index++) { //遍历表格列,ws[row]表示一行的内容, col表示列头
                  var col = langArr[index];

                  if (col === key) {
                      continue;
                  }

                  if (!(col in langObj)) {
                      langObj[col] = {};
                  }

                  langObj[col][ws[row][key]] = ws[row][col];
                  //console.log("!!!!!ws[row][col="+col+"]="+ws[row][col]);
              }
            }
        }
        var xmlStr = "";
        for (var lang in langObj) {
          for(var i in langObj[lang]) {
            xmlStr += "<message msgid=\""+i+"\" msgstr=\""+langObj[lang][i]+"\"/>\n"
          }
          
              writeObjSync(dest + '/' + lang + '/' + y + '.json', langObj[lang]);
        }
        fs.writeFileSync(dest+'/ap255us.txt', xmlStr);
    });
}

exports.parse = function(settings) {

    if (!settings) {
        throw new Error('settings can`t be empty!');
    }

    if (!settings.file) {
        throw new Error('please set `settings.file!`');
    }

    settings.dest = settings.dest || path.dirname(settings.file);
    settings.key = settings.key || settings.defaultLang || 'en';

    if (!(settings.lang && settings.lang instanceof Array && settings.lang.length > 0)) {
        settings.lang = false;
    }

    file.createFolder(settings.dest);
    parse(settings.file, settings.dest, settings.key, settings.lang);

};
