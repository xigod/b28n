B.setTextDomain("all");

function checkMAC(mac) {
	var re = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/;
	if (!re.test(mac)) {
		alert(_("Please enter a correct MAC address."));
		return false;
	}
	if (mac == "00:00:00:00:00:00" || mac.toUpperCase() == "FF:FF:FF:FF:FF:FF") {
		alert(_("Please enter a correct MAC address."));
		return false;
	}
	if (parseInt(mac.charAt(1), 16) & 1 == 1) { //m[0]最后一位是否为1
		alert(_("The MAC address cannot be a multicast address."));
		return false;
	}
	return true;
}

function ill_check(val, ill_array, str) {
	var i = 0;
	for (; i < ill_array.length; i++) {
		if (val.indexOf(ill_array[i]) != -1) {
			alert(_(_("The URL includes invalid characters: %s."), ill_array[i]));
			return false;
		}
	}
	return true;
}

function validNumCheck(v, m) {
	var t = /^(\d|[1-9]\d{1,})$/;
	if (!t.test(v.value)) {
		alert(_("Please enter a valid number."));
		v.value = v.defaultValue;
		return 0;
	}
	return 1;
}

function rangeCheck(v, a, b, s) {
	//if (!validNumCheck(v,s)) return 0;          
	if ((v.value < a) || (v.value > b) || isNaN(v.value)) {
		alert(s);
		v.value = v.defaultValue;
		return 0;
	} else
		return 1;
}

function ipCheck(srcip, dstip, mask) {
	var sip = srcip.split('.');
	var dip = dstip.split('.');
	var lanmsk = mask.split('.');
	if (sip[0] == dip[0]) {
		if (sip[0] < 128 && lanmsk[1] == "0")
			return true;
	} else {
		return false;
	}
	if (sip[1] == dip[1]) {
		if (sip[0] < 192 && lanmsk[2] == "0")
			return true;
	} else {
		return false;
	}
	if (sip[2] == dip[2]) {
		if (sip[0] < 224 && lanmsk[3] == "0")
			return true;
	} else {
		return false;
	}
}

function refresh(destination) {
	window.location = destination;
}

function verifyIP0(ipa, str) {
	var ip = combinIP2(ipa);
	//if (ip == '' || ip == '0.0.0.0')// 不能设置为0.0.0.0
	if (ip == '')
		return true;
	return checkIp(ipa, str);
}

function checkIp(ipa, str) {
	var tip = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
		ip = ipa.value.split(".");
	if (ipa.value == "") {
		alert(_(_("Please enter %s."), [str]));
		return false;
	}
	if (!tip.test(ipa.value)) {
		alert(_(_("Incorrect %s."), [str]));
		return false;
	}
	if (ip[0] == 127 || ip[0] >= 224 || ip[3] == 0 || ip[3] >= 255) {
		alert( _(_("Incorrect %s."),[str]) );
		return false;
	}
	return true;
}

function clearInvalidIpstr(ipa) {
	var iplist = new Array();
	var ip = '';
	iplist = ipa.split(".");
	for (var i = 0; i < iplist.length - 1; i++) {
		if (isNaN(iplist[i]) || iplist[i] == '')
			ip += iplist[i] + ".";
		else
			ip += parseInt(iplist[i], 10) + ".";
	}
	if (isNaN(iplist[iplist.length - 1]) || iplist[iplist.length - 1] == '')
		ip += iplist[i];
	else
		ip += parseInt(iplist[iplist.length - 1], 10);
	return ip;
}

function combinIP2(d) {
	if (d.length != 4)
		return d.value;
	var ip = d[0].value + "." + d[1].value + "." + d[2].value + "." + d[3].value;
	if (ip == "...")
		ip = "";
	return ip;
}

function combinMAC2(m) {
	var mac = m[0].value.toUpperCase() + ":" + m[1].value.toUpperCase() + ":" + m[2].value.toUpperCase() + ":" + m[3].value.toUpperCase() + ":" + m[4].value.toUpperCase() + ":" + m[5].value.toUpperCase();
	if (mac == ":::::")
		mac = "";
	return mac;
}

function checkMask(mask) {
	var m = mask.value.split('.');
	if (m.length != 4) {
		alert(_("Invalid subnet mask."));
		return false;
	}


	for (var i = 0; i < 4; i++) {
		if (m[i] == "") {
			alert(_("Invalid subnet mask."));
			return false;
		}
		if (!(m[i] == 0 || (+m[i]).toString(2).length == 8)) {
			alert(_("Invalid subnet mask."));
			return false;
		}
	}
	var v = (+m[0]).toString(2) + (+m[1]).toString(2) + (+m[2]).toString(2) + (+m[3]).toString(2);
	if (!/^1+0*$/.test(v)) {
		alert(_("Invalid subnet mask."));
		return false;
	}
	return true;
}

function Cfg(n, i, v) {
	this.i = i;
	this.n = n;
	this.v = this.o = v;
}

var CA = new Array();

function addCfg(n, i, v) {
	CA.length++;
	CA[CA.length - 1] = new Cfg(n, i, v);
}

function idxOfCfg(kk) {
	if (kk == 'undefined') {
		alert(_("Undefined"));
		return -1;
	}
	for (var i = 0; i < CA.length; i++) {
		if (CA[i].n != 'undefined' && CA[i].n == kk)
			return i;
	}
	return -1;
}

function getCfg(n) {
	var idx = idxOfCfg(n)
	if (idx >= 0)
		return CA[idx].v;
	else
		return "";
}

function setCfg(n, v) {
	var idx = idxOfCfg(n)
	if (idx >= 0) {
		CA[idx].v = v;
	}
}

function cfg2Form(f) {
	for (var i = 0; i < CA.length; i++) {
		var e = eval('f.' + CA[i].n);
		if (e) {
			if (e.name == 'undefined')
				continue;
			if (e.length && e[0].type == 'radio') {
				for (var j = 0; j < e.length; j++)
					e[j].checked = e[j].defaultChecked = (e[j].value == CA[i].v);
			} else if (e.type == 'checkbox')
				e.checked = e.defaultChecked = Number(CA[i].v);
			else
				e.value = getCfg(e.name);
			if (e.defaultValue != 'undefined')
				e.defaultValue = e.value;
		}
	}
}

function form2Cfg(f) {
	for (var i = 0; i < CA.length; i++) {
		var e = eval('f.' + CA[i].n);
		if (e) {
			if (e.disabled)
				continue;
			if (e.length && e[0].type == 'text') {
				if (e.length == 4)
					CA[i].v = combinIP2(e);
				else if (e.length == 6)
					CA[i].v = combinMAC2(e);
			} else if (e.length && e[0].type == 'radio') {
				for (var j = 0; j < e.length; j++)
					if (e[j].checked) {
						CA[i].v = e[j].value;
						break;
					}
			} else if (e.type == 'checkbox')
				setCfg(e.name, Number(e.checked));
			else
				setCfg(e.name, e.value);
		}
	}
}

function fit2(n) {
	var s = String(n + 100).substr(1, 2);
	return s;
}

function timeStr(t) {
	if (t < 0) {
		str = '00:00:00';
		return str;
	}
	var s = t % 60;
	var m = parseInt(t / 60) % 60;
	var h = parseInt(t / 3600) % 24;
	var d = parseInt(t / 86400);

	var str = '';
	if (d > 999) {
		return _('Permanent');
	}
	if (d)
		str += d + _('day');
	str += fit2(h) + ':';
	str += fit2(m) + ':';
	str += fit2(s);
	return str;
}

// auto,NA,IC,ETS,SP,FR,JP
var dmnRng = new Array(16383, 2047, 2047, 8191, 1536, 7680, 16383);

function rmEntry(a, i) {
	if (a.splice)
		a.splice(i, 1);
	else {
		if (i >= a.length)
			return;
		for (var k = i + 1; k <= a.length; k++)
			a[k - 1] = a[k];
		a.length--;
	}
}

function GetReqObj() {
	var req = null;
	try {
		req = new XMLHttpRequest();
		if (req.overrideMimeType)
			req.overrideMimeType("text/xml");
	} catch (trymicrosoft) {
		try {
			req = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (othermicrosoft) {
			req = false;
		}
	}
	if (!req) {
		alert(_("Error initializing HttpRequest!"));
		return false;
	}
	return req;
}

function ckRemark(s) {
	var re = /^\w{0,}$/;
	if (!re.test(remark)) {
		alert(_("Only digits, letters, and underscores are allowed in the description."));
		return false;
	}
	return true;
}

function detectCapsLock(event) {
	var e = event || window.event;
	var o = e.target || e.srcElement;
	var oTip = o.nextSibling;
	var keyCode = e.keyCode || e.which; // 按键的keyCode   
	var isShift = e.shiftKey || (keyCode == 16) || false; // shift键是否按住
	if (
		((keyCode >= 65 && keyCode <= 90) && !isShift) // Caps Lock 打开，且没有按住shift键   
		|| ((keyCode >= 97 && keyCode <= 122) && isShift) // Caps Lock 打开，且按住shift键  
	) {
		oTip.style.display = '';
		//o.setAttribute("title","己按下大小写灯");
	} else {
		oTip.style.display = 'none';
	}
}

function getValue(name) {
	return document.forms[0].elements[name].value;
}

function setValue(name, value) {
	document.forms[0].elements[name].value = value;
}

/**
 * @方法 getPageSize
 * @描述 针对不同浏览器用不同方法获取页面可视高度，宽度。
 * @返回值 （json数据） pageWidth为页面可视高度，pageHeight页面可视宽度
 */
function getPageSize() {
	if (window.innerWidth) {
		return {
			pageWidth: window.innerWidth,
			pageHeight: window.innerHeight
		};
	} else if (typeof window.innerWidth != 'number') {
		if (document.compatMode == 'CSS1Compat') {
			return {
				pageWidth: document.documentElement.clientWidth,
				pageHeight: document.documentElement.clientHeight
			};
		} else {
			return {
				pageWidth: document.body.clientWidth,
				pageHeight: document.body.clientHeight
			};
		}
	}
}
//Base64 encode
function utf16to8(str) {
	var out = "",
		i, len, c;
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}

function base64encode(str) {
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		out = "",
		i = 0,
		len;
	var c1, c2, c3;
	len = str.length;
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xF) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
}

function str_encode(str) {
	return base64encode(utf16to8(str));
}

function checkVerifyIp(ip, mask) {
	var ips = ip.split("."),
		masks = mask.split("."),
		i = 0;
	for (; i < 4; i++) {
		if ((ips[i] | masks[i]) != masks[i]) {
			return true;
		}
	}
	return false;
}

function checkMulticastIp(ip, mask) {
	var ips = ip.split("."),
		masks = mask.split("."),
		i = 0;
	for (; i < 4; i++) {
		if ((ips[i] | masks[i]) != 255) {
			return true;
		}
	}
	return false;
}

function decodeSSID(SSID) {
	var e = document.createElement("div"),
		deSSID = '';
	e.innerHTML = SSID.replace(/\x20/g, "\xA0");
	if (e.innerText) {
		deSSID = e.innerText;
	} else if (e.textContent) {
		deSSID = e.textContent;
	}
	e = null;
	return deSSID.replace(/\xA0/g, "\x20");
}

/********判断是否同网段****************/
function checkIpInSameSegment(ip_lan, mask_lan, ip_wan, mask_wan) {
	if (ip_lan === '' || ip_wan === '') {
		return false;
	}
	var ip1Arr = ip_lan.split("."),
		ip2Arr = ip_wan.split("."),
		maskArr1 = mask_lan.split("."),
		maskArr2 = mask_wan.split("."),
		maskArr = maskArr1,
		i;
	for (i = 0; i < 4; i++) {
		if (maskArr1[i] != maskArr2[i]) {
			if (maskArr1[i] & maskArr2[i] == maskArr1[i]) {
				maskArr = maskArr1;
			} else {
				maskArr = maskArr2;
			}
			break;
		}
	}
	for (i = 0; i < 4; i++) {
		if ((ip1Arr[i] & maskArr[i]) != (ip2Arr[i] & maskArr[i])) {
			return false;
		}
	}
	return true;
}

/****判断dns1和dns2是否相同****/
function checkDNSisSame(dns1, dns2) {
	if (dns1 == dns2) {
		alert(_("The primary DNS server and secondary DNS server cannot be the same."));
		return false;
	}
	return true;
}

function inputValue(obj) {
	for (var prop in obj) {
		if ($("#" + prop).length === 1) {
			setDefaultVal($("#" + prop), obj[prop]);
		} else if ($("[name='" + prop + "']").length > 0) {
			setDefaultVal($("[name='" + prop + "']"), obj[prop]);
		}

	}
}

function setDefaultVal(elem, val) {
	var $this = $(elem);
	var _this = $this[0],
		//name = _this.name || $this.attr("name") || "",
		tagName = _this.tagName.toLowerCase(),
		type = _this.type,
		_value = val,
		name;

	switch (tagName) {
	case "input":
		switch (type) {
		case "radio":
			//存在值为obj[name]的元素则选中
			name = $(elem).attr("name");
			if ($("[name='" + name + "'][value='" + _value + "']").length > 0) {
				$("[name='" + name + "'][value='" + _value + "']")[0].checked = true;
			}
			break;
		case "checkbox":
			if (_value == $this.val() || _value == "enabled" || _value == "启用" || +_value == 1 || _value == true || _value == "true") {
				$this.attr("checked", true);
			} else {
				$this.attr("checked", false);
			}
			break;
			//button不做处理
		case "button":
			break;
		default:
			_this.value = decodeURIComponent(_value);

		}
		break;
	case "select":
		_this.value = decodeURIComponent(_value);
		break;
	default:
		//默认有data-bind属性时
		var dataBind = $this.attr("data-bind");
		//兼容ip地址输入框 
		if (dataBind == "ipBox" || dataBind == "macBox") {
			$this[0].val(_value);
		} else {
			//其他属性直接修改dom节点
			$this.text(decodeURIComponent(_value));
		}
		break;
	}
}

$.GetSetData = {
	getData: function (url, handler) {
		if (url.indexOf("?") < 0) {
			url += "?" + Math.random();
		} else {
			url += "&r=" + Math.random();
		}
		$.ajax({
			url: url,
			cache: false,
			type: "get",
			dataType: "text",
			async: true,
			success: function (data, status) {
				if (data.indexOf("<!DOCTYPE") != -1) {
					window.location.reload(true);
					return false;
				}

				if (data === "") {
					alert(_("Please exit your security suite to display this webpage normally."));
				}

				if (typeof handler == "function") {
					handler.apply(this, arguments);
				}
			},
			error: function (msg, status) {
				if (typeof handler == "function") {
					//handler.apply(this, arguments);
				}
			},
			complete: function (xhr) {
				xhr = null;
			}
		});

	},

	getJson: function (url, handler) {
		this.getData(url, function (data) {
			handler($.parseJSON(data));
		});
	},

	setData: function (url, data, handler) {
		$.ajax({
			url: url,
			cache: false,
			type: "post",
			dataType: "text",
			async: true,
			data: data,
			success: function (data) {
				if (data.indexOf("<!DOCTYPE") != -1) {
					window.location.reload(true);
					return false;
				}
				if ((typeof handler).toString() == "function") {
					handler(data);
				}
			}
		});
	}
};

function getDefaultSubmitData() {
	var subData = {};
	$("input[name],select[name]").each(function () {
		var name = $(this).attr("name");

		if ($("input[name='" + name + "']").length > 1 && $(this).attr("type") == "radio") {
			subData[name] = $("input[name='" + name + "']:checked").val();
		} else if ($(this).attr("type") == "checkbox") {
			if (this.checked) {
				subData[name] = "true";
			} else {
				subData[name] = "false";
			}
		} else if ($(this).attr("type") == "button" || $(this).attr("type") == "reset") {

		} else {
			//对值进行编码，处理特殊字符@edit by windy
			//SSID页面保存时，ssid不用编码@editor dapei
			subData[name] = $(this).val();
			/*if (name == "ssid") {
				subData[name] = $(this).val();
			} else {
				subData[name] = encodeURIComponent($(this).val());
			}*/
		}
	});

	return subData;
}

function submitData(url, callback) {
	var dataObj = getDefaultSubmitData();
		dataObj.radio = top.RADIO || '';
	$.GetSetData.setData(url, dataObj, function (str) {
		var obj = {}
		try {
			obj = $.parseJSON(str);
		} catch (e) {
			obj = {};
		}
		if (obj.errCode == "0") {
			if (typeof callback == "function") {
				callback.call();
			} else {
				if (typeof getValue == "function") {
					getValue.call();
				}
			}
		} else {
			if (typeof callback == "function") {
				callback.call(null, obj);
			}
		}
	});
}

//Base64 decode
function base64decode(str) {
    var c1, c2, c3, c4;
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
        58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
    );
    var i = 0,
        len = str.length,
        string = '';

    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (
            i < len && c1 == -1
        );
        if (c1 == -1) break;

        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (
            i < len && c2 == -1
        );
        if (c2 == -1) break;

        string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return string;

            c3 = base64DecodeChars[c3]
        } while (
            i < len && c3 == -1
        );
        if (c3 == -1) break;

        string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return string;
            c4 = base64DecodeChars[c4]
        } while (
            i < len && c4 == -1
        );
        if (c4 == -1) break;

        string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return string;
}