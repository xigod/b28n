var maxSsidNum  = +top.CONFIG_2_4G_MAX_SSID_NUMBER,
    maxSsidNum_5g = +top.CONFIG_5G_MAX_SSID_NUMBER,
    maxClientNum = +top.CONFIG_MAX_CLIENT;

function initHeadTail(num,name) {
	 $("#head").html(tbl_head(num));
     $("#tail").html(tbl_tail(name));
}

function inputData(data) {
	var d = data,
		i, $ele;
		
	for(i in data) {
		$ele = $("[name=" + i +"]");
		if($ele && $ele.length > 0) {
			if($ele[0].tagName.toUpperCase() == "INPUT") {
				switch($ele[0].type) {
					case "text" :
						$ele.val(decodeSSID(data[i]));
						break;

					case "radio" : 
						if(data[i] != "") {
							$("[name=" + i +"][value="+data[i]+"]")[0].checked = true;
						}
						break;

					case "checkbox" : 
						$ele[0].checked = (data[i] == 1 ? true : false);
						break;

					case "password" : 
						$ele.val(data[i]);
						break;
						
				}
			} else if($ele[0].tagName.toUpperCase() == "SELECT") {
				$ele.val(data[i]);
			}
		}
	}
}

function onChangeSec() {
	var idx = parseInt(document.forms[0].elements["secType"].value),
		wepidx = document.forms[0].wepSecOpt.selectedIndex,
		bodyId = document.body.id;
	document.getElementById("wpaPasswd").className = "";
	$("#wepAuth").addClass("none");
	if (idx == 0) {
		$("#div_wep,#div_wpa,#div_802").addClass("none");
	} else if (idx == 1) {
		$("#wepAuth").removeClass("none");
		if (wepidx == 0 || wepidx == 1) {
			$("#div_wep").removeClass("none");
			$("#div_wpa,#div_802").addClass("none");
		} else {
			$("#div_802").removeClass("none");
			$("#div_wpa,#div_wep").addClass("none");
		}
	} else if (idx == 2 || idx == 3 || idx == 4) {
		$("#div_wpa").removeClass("none");
		$("#div_wep,#div_802").addClass("none");
		if (bodyId == "basic") {
			f.keyPeriod.value = wpa_psk_key_time;
		}
		if (idx == 2) {
			f.cipher[2].disabled = true;
			if (f.cipher[2].checked) {
				f.cipher[2].checked = false;
				f.cipher[0].checked = true;
			}
		} else {
			f.cipher[2].disabled = false;
		}
	} else {
		$("#div_802,#div_wpa").removeClass("none");
		$("#div_wep,#wpaPasswd").addClass("none");
		if (bodyId == "basic") {
			f.keyPeriod.value = wpa_key_time;
		}
	}
	$("select[name=wepSecOpt]").change(function () {
		if (this.selectedIndex == 2) {
			$("#div_wep").addClass("none");
			$("#div_802").removeClass("none");
		} else {
			$("#div_wep").removeClass("none");
			$("#div_802").addClass("none");
		}
	});
}

function  checkSsid() {
	var re = /^[^\\]+$/, //[^\<\>,;"%&]
		sid = f.ssid.value,
		num = sid.match(/([\u4E00-\u9FA5])/g);
	if (sid == "") {
		alert(_("Please enter an SSID."));
		return false;
	}
	// if (!re.test(sid)) {
	// 	alert(_(_("The SSID cannot contain %s."), [""]));
	// 	return false;
	// }
	if (num && (sid.length + num.length * 2) > 32) {
		alert(_("Only a maximum of 32 characters are allowed in the SSID."));
		return false;
	}
	return true;
}

function checkSec() {
	var securitymode = f.secType.value,
		keyvalue;
	if (securitymode == "1" && f.wepSecOpt.value != "802.1x") {
		var defaultid = f.wep_default_key.value,
			keylength;
		keyvalue = f["wep" + defaultid].value;
		if (keyvalue.length == 0) {
			alert(_('Please enter the WEP key %s', [defaultid]));
			return false;
		}
		for (var i = 1; i < 5; i++) {
			keylength = f["wep" + i].value.length;
			if (keylength != 0) {
				if (f["WEP" + i + _("Select")].options.selectedIndex == 0) {
					if (keylength != 5 && keylength != 13 || !/^[\x00-\xff]+$/.test(f["wep" + i].value)) {
						alert(_('WEP key %s is invalid! Please enter 5 or 13 ASCII characters!', [i]));
						return false;
					}
				} else {
					if (keylength != 10 && keylength != 26 || !/^[0-9a-fA-F]+$/.test(f["wep" + i].value)) {
						alert(_('WEP key %s is invalid! Please enter 10 or 26 Hex characters.', [i]));
						return false;
					}
				}
				if (f["wep" + i].value.indexOf("\") != -1) {
					alert(_(_("Key %s cannot contain %s."), [i, ""]));
					return false;
				}
			}
		}

	} else if ((securitymode == "1" && f.wepSecOpt.value == "802.1x") || securitymode == "5" || securitymode == "6") {
		var x;
		if (!checkIp(f.radius_svrip, _("RADIUS Server IP Address"))) {
			return false;
		}
		x = Number(f.radius_port.value);
		f.radius_port.value = x;
		if (isNaN(f.radius_port.value) || f.radius_port.value < 1025 || f.radius_port.value > 65535 || !/^[1-9]\d*$/.test(f.radius_port.value)) {
			f.radius_port.value = '';
			alert(_("Please enter a valid RADIUS port number."));
			return false;
		}
		if (!/^[\x00-\xff]{1,64}$/.test(f.radius_pass.value)) {
			alert(_("Please enter a valid RADIUS password, which consists of 1 to 64 ASCII characters."));
			return false;
		}
	} else if (securitymode == "2" || securitymode == "3" || securitymode == "4") {
		keyvalue = f.passphrase.value;
		if (!(/^[\x00-\x7f]{8,63}$/i.test(keyvalue) || /^[0-9a-f]{64}$/i.test(keyvalue))) {
			alert(_('Please enter 8-64 Hex characters or 8-63 ASCII characters.'));
			return false;
		}
		if (keyvalue.indexOf("\") != -1) {
			alert(_(_("The key cannot contain %s."), [""]));
			return false;
		}
	}
	return true;
}

function checkRssiData(obj, str, s, e) {
	if (obj.value == "") {
		alert(_(_("Please enter %s."), [str]));
		return false;
	}
	if ((+obj.value) < s || (+obj.value) > e || !/^[-0-9]\d*$/.test(obj.value)) {
		alert(_(_("%s is invalid. %s must be an integer from %s through %s. "), [str, str, s, e]));
		return false;
	}
	return true;
}

function checkData(obj, str, s, e) {
	if (obj.value == "") {
		alert(_(_("Please enter %s."), [str]));
		return false;
	}
	if (isNaN(obj.value) || obj.value < s || obj.value > e || !/^[1-9]\d*$/.test(obj.value)) {
		alert(_(_("%s is invalid. %s must be an integer from %s through %s. "), [str, str, s, e]));
		return false;
	}
	return true;
}

function channelScan() {
	//$("#wlScanTab").toggleClass("none");
	if (this.value == _("Scan")) {
		this.value = _("Disable Scan");
		this.disabled = true;
		$.get("/goform/wifiWDS?radio=" + f.wrlRadio.value + "&" + Math.random(), function (data) {
			document.getElementById("wlScan").disabled = false;
			var str1 = $.parseJSON(data).scanList,
				len = str1.length,
				scanStr = '<tr class="a3">' +
				'<td width="30">' + _("ID") + '</td>' +
				'<td id="ssidVal" width="150">' + _("SSID") + '</td>' +
				'<td width="130">' + _("MAC Address") + '</td>' +
				'<td width="60">' + _("Network Mode") + '</td>' +
				'<td width="50" id="channelVal">' + _("Channel") + '</td>' +
				'<td width="65">' + _("Channel Bandwidth") + '</td>' +
				'<td width="100">' + _("Security Mode") + '</td>' +
				'<td width="95" id="strength">' + _("Signal Strength") + '</td></tr>', //Channel Bandwidth
				i = 0;
			for (i = 0; i < len; i++) {
				var str = str1[i],
					signalClass = Number(str.signal) + 100,
					length = 0;

				for(var j in str) {
					length++;
				}
				if (length < 6) {
					continue;
				}
				if (f.wrlRadio.value == '2.4G' && str.channel > 13) {
					continue;
				} else if (f.wrlRadio.value == '5G' && (str.channel > 165 || str.channel < 36)) {
					continue;
				}
				if (signalClass <= 14) { //20
					signalClass = "signal1";
				} else if (signalClass <= 24) { //40
					signalClass = "signal2";
				} else if (signalClass <= 34) { //60
					signalClass = "signal3";
				} else if (signalClass <= 44) { //80
					signalClass = "signal4";
				} else {
					signalClass = "signal5";
				}

				scanStr += '<tr><td>' + (i + 1) + '</td>'
				scanStr += '<td class="fixed">' + decodeURIComponent(str.ssid) + '</td><td>' + str.mac + '</td><td>' + str.netMode + '</td><td>' + str.channel + '</td><td>' + str.bandwidth + '</td><td class="fixed">' + str.secMode.replace('_', " ") + '</td><td class="' + signalClass + '">' + str.signal + 'dBm</td></tr>'
			}
			$("#wlScanTab").html(scanStr).show();
			$("#ssidVal,#channelVal,#strength").click(function () {
				var temp = new Array(),
					objs = $("#wlScanTab tr:gt(0)"), //获取表格的第一级子元素
					id = $(this).attr("id"),
					arr = objs.map(function (a) {
						if (id == "ssidVal")
							return $(this).children("td:eq(1)").html();
						else if (id == "channelVal")
							return parseInt($(this).children("td:eq(4)").html());
						else
							return parseInt($(this).children("td:eq(7)").html());
					});
				//遍历表格子元素的
				for (i = 0; i < objs.length; i++) {　　　
					temp[i] = new Array(arr[i], objs[i]);
				}
				if (arr[0] > arr[objs.length - 1] && typeof temp[0][0] == "number")
					temp.sort(function (a, b) {
						return a[0] - b[0]
					});　　 //进行排序-自定义排序方法sort
				else if (arr[0] <= arr[objs.length - 1] && typeof temp[0][0] == "number")
					temp.sort(function (a, b) {
						return b[0] - a[0]
					});
				else if(arr[0]) {
						if(arr[0].localeCompare(arr[objs.length - 1]) > 0) {
							temp.sort();
					}
				}else
					temp.sort().reverse();
				for (var i = 0; i < temp.length; i++)　　 {
					//将排序结果重新添加到表格中
					$("#wlScanTab").append(temp[i][1]);　　　　　　　　　　 
				}

			});
		})
	} else {
		this.value = _("Scan");
		this.disabled = false;
		$("#wlScanTab").hide();
	}
}

function initSsidHtml() {
	$("[name='index']").html("");
	var ssidIndex = 0,
		i = 0,
		ssidArry;
	if(f.wrlRadio.value == '2.4G') {
		ssidArry = [];
		ssidIndex = maxSsidNum;
		ssidArry.push(ssid1, ssid2, ssid3, ssid4, ssid5, ssid6, ssid7, ssid8);
	} else {
		ssidArry = [];
		ssidArry.push(ssid1, ssid2, ssid3, ssid4);
		ssidIndex = maxSsidNum_5g;	
	}
	if(curmode == 2) {
		ssidIndex --;	
	}
	var dom;
	for(i = 0; i < ssidIndex; i++) {
		dom = document.createElement("option");
		dom.value = i;
		if(typeof dom.innerText != "undefined") {
			dom.innerText = decodeSSID(ssidArry[i]);	
		} else { //firefox
			dom.textContent = decodeSSID(ssidArry[i]);	
		}
		$("[name='index']")[0].appendChild(dom);
	}	
}

function permission() {
    if (parent.userType == "user") {
        alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
        return false;
    }else{
    	return true;
    }
}
