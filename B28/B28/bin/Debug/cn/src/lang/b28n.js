// "Butterfat internationalization" (b28n.js)
//  Released under the GNU GPL
//	versions 2.0
//	$Id: b28n.js 2013-4-7 09:42:30 ETw $
/***********************************************************************************************
 ************************************************************************************************/
var MSG = {};
MSG.supportLang = ["cn"];
MSG.idEnglish = true;
MSG.fileType = "xml";
if (MSG.idEnglish) {
	MSG.supportLang.push("en");
}
var cookie = document.cookie.split(';');
for(var i = 0; i < cookie.length; i++) {
	if(/lang=/.test(cookie[i])) {
		MSG.supportLang = cookie[i].split('=')[1].split(',');
	}
}

MSG.extend = function (obj) {
	var name;
	for (name in obj) {
		if (obj.hasOwnProperty(name)) {
			MSG[name] = obj[name];
		}
	}
};

(function (window, document) {
	"use strict";
	var win = window,
		doc = document,
		core_version = "2.0",
		core_trim = core_version.trim,

		// 语言包文件是否加载完成标志
		b28Loaded = false,

		// Define until function
		domReady, loadScript, loadXML, innerText, trim,

		// Define a local copy of Butterlate
		Butterlate;

	trim = core_trim && !core_trim.call("\uFEFF\xA0") ?
		function (text) {
			return text == null ?
				"" :
				core_trim.call(text);
	} :

	// Otherwise use our own trimming functionality
	function (strs) {
		var str = strs.replace(/^\s+/, ""),
			end = str.length - 1,
			ws = /\s/;

		while (ws.test(str.charAt(end))) {
			end--;
		}
		return str.slice(0, end + 1);
	};

	innerText = (function () {
		var element = doc.createElement('p');

		element.innerHTML = '22';
		return element.textContent ? function (elem, str) {
			if (str) {
				elem.textContent = str;
				return elem;
			}
			return elem.textContent;

		} : function (elem, str) {
			if (str) {
				elem.innerText = str;
				return elem;
			}
			return elem.innerText;
		};
	}());

	function transTitle() {
		var titleElem = doc.getElementsByTagName("title")[0],
			transTitle;
		if (titleElem.getAttribute("id") &&
			/\S/.test(titleElem.getAttribute("id"))) {
			transTitle = titleElem.getAttribute("id");
		} else {
			transTitle = doc.title;
		}
		doc.title = Butterlate.gettext(trim(transTitle));
	}

	function replaceTextNodeValue(valObject, element) {
		if (!element) {
			return;
		}
		var cur = element.firstChild,
			btnStr = "submit,reset,button",
			curValue, isInputButton;

		// Hander elements common attribute need to replace
		if (element.nodeType === 1) {
			if (element.getAttribute("alt") && /\S/.test(element.getAttribute("alt"))) {

				curValue = trim(element.getAttribute("alt"));
				if (Butterlate.gettext(curValue)) {
					element.setAttribute("alt", Butterlate.gettext(curValue));
				}
			}

			if (element.getAttribute("title") &&
				/\S/.test(element.getAttribute("title"))) {

				curValue = trim(element.getAttribute("title"));
				if (Butterlate.gettext(curValue)) {
					element.setAttribute("title", Butterlate.gettext(curValue));
				}
			}
		}

		//如果有data-lang属性，说明是叶子元素，而且需要翻译
		if (element.nodeType === 1 && element.getAttribute("data-lang") &&
			/\S/.test(element.getAttribute("data-lang"))) {
			curValue = trim(element.getAttribute("data-lang"));

			if (Butterlate.gettext(curValue)) {
				isInputButton = element.nodeName.toLowerCase() == "input" &&
					(btnStr.indexOf(element.getAttribute("type")) !== -1);
				if (isInputButton) {
					element.setAttribute("value", Butterlate.gettext(curValue));
				} else {
					innerText(element, Butterlate.gettext(curValue));
				}
			}

			if (element.nextSibling != null) {
				element = element.nextSibling;
				replaceTextNodeValue(valObject, element);
			}

			//如果是非叶子元素，遍历器子元素
		} else {
			while (cur != null) {
				if (cur.nodeType === 3 && /\S/.test(cur.nodeValue)) {
					curValue = trim(cur.nodeValue);
					if (Butterlate.gettext(curValue)) {
						cur.nodeValue = Butterlate.gettext(curValue);
					}
				} else if (cur.nodeType === 1) {
					isInputButton = cur.nodeName.toLowerCase() == "input" &&
						(btnStr.indexOf(cur.getAttribute("type")) !== -1);

					if (cur.getAttribute("value") && isInputButton &&
						/\S/.test(cur.getAttribute("value"))) {

						curValue = trim(cur.getAttribute("value"));
						if (Butterlate.gettext(curValue)) {
							cur.setAttribute("value", Butterlate.gettext(curValue));
						}
					}

					replaceTextNodeValue(valObject, cur);
				}
				cur = cur.nextSibling;
			}
		}
	}

	domReady = (function () {
		var funcs = [],
			already = false,
			len,
			i;

		function handler(e) {
			e = e || win.event;
			if (already) {
				return;
			}

			if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
				return;
			}

			for (i = 0, len = funcs.length; i < len; i++) {
				funcs[i].call(doc);
			}

			already = true;
			funcs = null;
		}

		if (doc.addEventListener) {
			doc.addEventListener("DOMContentLoaded", handler, false);
			doc.addEventListener("onreadystatechange", handler, false);
			win.addEventListener("load", handler, false);
		} else if (doc.attachEvent) {
			doc.attachEvent('onreadystatechange', handler);
			win.attachEvent('onload', handler);
		}

		// return ready() function
		return function ready(f) {
			if (already) {
				f.call(doc);
			} else {
				funcs.push(f);
			}
		};
	}());

	loadScript = (function () {
		var scripts = doc.createElement("script"),
			hasReadyState = scripts.readyState;

		return hasReadyState ? function (url, callBack) {
			var scripts = doc.createElement("script");

			scripts.onreadystatechange = function () {
				if (scripts.readyState === 'loaded' ||
					scripts.readyState === 'complete') {
					scripts.onreadystatechange = null;

					if (typeof callBack === "function") {
						callBack();
						callBack = null;
					}
				}
			};
			scripts.src = url;
			doc.getElementsByTagName("head")[0].appendChild(scripts);

		} : function (url, callBack) {
			var scripts = doc.createElement("script");

			scripts.onload = function () {
				if (typeof callBack === "function") {
					callBack();
					callBack = null;
				}
			};
			scripts.src = url;
			doc.getElementsByTagName("head")[0].appendChild(scripts);
		};
	})();

	loadXML = function (url, callBack) {
		var request,
			i,
			pos,
			posLen;

		try {
			request = new XMLHttpRequest();
		} catch (e1) {
			try {
				request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e2) {
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e3) {
					return;
				}
			}
		}
		request.open("GET", url, false);
		request.setRequestHeader("If-Modified-Since", "1");
		request.send(null);

		if (request.status === 200) {
			pos = request.responseXML.documentElement.getElementsByTagName("message");
			posLen = pos.length;
			for (i = 0; i < posLen; i++) {
				MSG[pos[i].getAttribute("msgid")] = pos[i].getAttribute("msgstr");
			}

			if (typeof callBack === "function") {
				callBack();
				callBack = null;
			}
		}
	}

	function Butterlation() {
		this.autoTrans = true;
		this.curDomain = 0;
		this.domainArr = [];
		this.options = {
			"defaultLang": "en",
			"support": MSG.supportLang,
			"fileType": MSG.fileType
		};
		this.isSupport = function (lang) {
			var support = this.options.support,
				len = support.length,
				i;

			for (i = 0; i < len; i++) {
				if (lang === support[i]) {
					return support[i];
				}
			}
		};
		this.setLang = function (lang) {

			if (lang !== undefined) {

				if (!this.isSupport(lang)) {
					lang = this.options.defaultLang;
				}
				doc.cookie = "bLanguage=" + lang + ";";
			}
		};
		this.getLang = function (lang) {
			var special = {
					"zh": "cn",
					"zh-chs": "cn",
					"zh-cn": "cn",
					"zh-cht": "cn",
					"zh-hk": "zh",
					"zh-mo": "zh",
					"zh-tw": "zh",
					"zh-sg": "zh"
				},
				defLang = this.options.defaultLang,
				local, ret, start, end;

			if (lang && this.isSupport(lang)) {
				this.setLang(lang);
				return lang;
			}

			if ((doc.cookie.indexOf("bLanguage=")) === -1) {
				local = (win.navigator.language ||
					win.navigator.browserLanguage || defLang).toLowerCase();

				ret = special[local] || local.split("-")[0].toString();
			} else {
				if (doc.cookie.indexOf("bLanguage=") === 0) {
					start = 10;
				} else if (doc.cookie.indexOf("; bLanguage=") !== -1) {
					start = doc.cookie.indexOf("; bLanguage=") + 12;
				}
				if (start !== undefined) {
					end = (doc.cookie.indexOf(';', start) !== -1) ?
						doc.cookie.indexOf(';', start) : doc.cookie.length;
					ret = doc.cookie.substring(start, end);
				}

			}

			return this.isSupport(ret) || this.options.defaultLang;
		};
		this.getURL = function (domain) {
			var ret;

			if (this.options.fileType === "xml") {
				ret = window.location.protocol + "//" +
					window.location.host + "/lang/" + this.lang + "/" +
					domain + ".xml";
			} else {
				ret = "lang/" + this.lang + "/b28n_" + domain + ".js";
			}

			return ret;
		};
		this.setTextDomain = function (domain, lang, callBack) {
			var i,
				domainLen,
				htmlElem = doc.getElementsByTagName("html")[0];

			//Hander lang is undefined
			this.lang = this.getLang(lang);
			this.curDomain = 0;
			if (typeof callBack === "function") {
				this.success = callBack;
			}

			htmlElem.style.display = "none";
			htmlElem.className = htmlElem.className + " lang-" + this.lang;

			if (Object.prototype.toString.call(domain) === "[object Array]") {
				domainLen = domain.length;
				this.domainArr = domain;

				for (i = 0; i < domainLen; i = i + 1) {
					this.po = this.getURL(domain[i]);
					this.loadDomain(this.po, i);
				}
			} else if (typeof domain === "string") {
				this.domainArr.push(domain);
				this.po = this.getURL(domain);
				this.loadDomain(this.po, 0);
			}
		};

		this.loadDomain = function (url) {
			if (MSG.idEnglish && this.lang === 'en') {
				this.loadedDict();
			} else {
				if (this.options.fileType === "js") {
					loadScript(url, this.loadedDict);
				} else {
					loadXML(url, this.loadedDict);
				}

			}
		};
		this.loadedDict = function () {
			var len = Butterlate.domainArr.length;
			if (Butterlate.curDomain + 1 === len) {
				b28Loaded = true;
				domReady(Butterlate.translatePage);
			} else {
				Butterlate.curDomain += 1;
			}
		};
		this.isLoaded = function () {
			return b28Loaded;
		};
		this.gettext = function (key) {
			return MSG[key] !== undefined ? MSG[key] : key;
		};
		this.getFormatText = function (key, replacements) {
			var nkey = this.gettext(key),
				index,
				count = 0;

			if (replacements.length === 0) {
				return nkey;
			}
			while ((index = nkey.indexOf('%s')) !== -1) {
				nkey = nkey.substring(0, index) + replacements[count] +
					nkey.substring(index + 2, nkey.length);
				count = ((count + 1) === replacements.length) ? count : (count + 1);
			}
			return nkey;
		};
		this.deleteKey = function (key) {
			delete MSG[key];
		};
		this.initSelectElem = function () {
			var selectElem = doc.getElementById('select-lang'),
				len = MSG.supportLang.length,
				newOption, lang, i;

			if (selectElem && selectElem.nodeName.toLowerCase() == "select") {
				for (i = 0; i < len; i++) {
					lang = MSG.supportLang[i];
					newOption = new Option(Butterlate.langArr[lang], lang);
					selectElem.add(newOption, undefined);
				}
				selectElem.value = Butterlate.lang;

				if (doc.addEventListener) {
					selectElem.addEventListener("change", function () {
						Butterlate.setLang(document.getElementById('select-lang').value);
						if (typeof ajaxSetLang === 'undefined') {
							win.setTimeout(function () {
								window.location.reload();
							}, 24);
						}
					}, false);

				} else if (doc.attachEvent) {
					selectElem.attachEvent('onchange', function () {
						Butterlate.setLang(document.getElementById('select-lang').value);
						if (typeof ajaxSetLang === 'undefined') {
							win.setTimeout(function () {
								window.location.reload();
							}, 24);
						}
					});
				}

			}
		};
		this.translatePage = function () {
			var bodyElem = document.getElementsByTagName('body')[0];

			// 翻译HTML页面内容
			transTitle();
			replaceTextNodeValue(Butterlate.dict, bodyElem);
			// 显示页面内容
			doc.getElementsByTagName("html")[0].style.display = "";
			// 初始语言选择下拉框
			Butterlate.initSelectElem();

			if (typeof Butterlate.success === "function") {
				Butterlate.success();
			}
		};
		this.translate = function () {};
	}

	Butterlate = new Butterlation();
	Butterlate.langArr = {
		"cn": "简体中文",
		"zh": "繁體中文",
		"de": "Deutsch", //德语
		"en": "English", //英语
		"es": "Español", //西班牙
		"fr": "Français", //法国
		"hu": "Magyar", //匈牙利
		"it": "Italiano", //意大利
		"pl": "Polski", //波兰
		"ro": "Română", //罗马尼亚
		"ar": "العربية", //阿拉伯
		"tr": "Türkçe", //土耳其
		"ru": "Русский", //Russian	俄语
		"pt": "Português" //Portugal 葡萄牙语
	};

	//Export to window
	win.Butterlate = Butterlate;
	win.B = win.B || win.Butterlate;
	win._ = function (key, replacements) {
		if (!replacements) {
			return Butterlate.gettext(key);
		}
		return Butterlate.getFormatText(key, replacements);
	};
	win.__ = function (key, replacements) {
		return Butterlate.getFormatText(key, replacements);
	};
	win.Butterlate.loadScript = loadScript;
}(window, document));