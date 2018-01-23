var f = document.forms[0],
	initObj = {};
var addEvent = false; //用于判断是否初始化密码框

function initHtml() {
	$("#head").html(tbl_head(19));

	if (top.CONFIG_NET_WAN_PPPOE == "y") {
		$("#pppoe_set").css("display", "");
	} else {
		$("#pppoe_set").css("display", "none");
	}
	if (+top.CONFIG_5G_MAX_SSID_NUMBER < 1) {
		$("#radio-set").css("display", "none");
	} else {
		$("#radio-set").css("display", "");
	}
}

function initEvent() {
	$("select[name=secMode]").on("change", onChangeSec);
	$("#wlScan").on("click", wdsScan);
	$("input:radio[name=wrlMode]").on("click", changeWorkMode);
	$(".button[name=save]").on("click", preSubmit);
    $("[name=wrlRadio]").on("click", getValue);
	$("select[name=wepAuth]").on("change", changeWepAuth);
}

function changeWepAuth() {
	if ($("#secMode").val() == "wep") {
		if ($("#wepAuth").val() == "802.1x") {
			$("#div_wep").addClass("none");
			$("#div_802").removeClass("none");
		} else {
			$("#div_wep").removeClass("none");
			$("#div_802").addClass("none");
		}
	}
}

function onChangeSec() {
	var secMode = $("#secMode").val(),
		wepidx = $("#wepAuth").val();
	var bodyId = document.body.id;
	document.getElementById("wpaPasswd").className = "";
	$("#wepAuthWrap").addClass("none");
	if (secMode == "none") {
		$("#div_wep,#div_wpa,#div_802").addClass("none");
	} else if (secMode == "wep") {
		$("#wepAuthWrap").removeClass("none");
		if (wepidx == "open" || wepidx == "shared") {
			$("#div_wep").removeClass("none");
			$("#div_wpa,#div_802").addClass("none");
		} else {
			$("#div_802").removeClass("none");
			$("#div_wpa,#div_wep").addClass("none");
		}
	} else if (secMode == "wpapsk" || secMode == "wpa2psk" || secMode == "wpawpa2psk") {
		$("#div_wpa").removeClass("none");
		$("#div_wep,#div_802").addClass("none");

		if (secMode == "wpapsk") {
			$("[name='cipherType'][value='aes+tkip']").attr("disabled", true);
			if ($("[name='cipherType'][value='aes+tkip']")[0].checked) {
				$("[name='cipherType']").get(0).checked = true;
			}
		} else {
			$("[name='cipherType'][value='aes+tkip']").removeAttr("disabled")
		}
	} else {
		$("#div_802,#div_wpa").removeClass("none");
		$("#div_wep,#wpaPasswd").addClass("none");
	}
}

function changeWorkMode() {
	var wrlMode = $("[name='wrlMode']:checked").val();
	if (wrlMode == "apclient") {
		$("#wdsWrap").show();
		$("#nettype").removeClass("none");
		$("#wdsMac tr:lt(4)").removeClass("none");
		$("#apclientMac").addClass("none");
		$("#apWdsChannel").removeClass("none");
		$("#apNetmode").addClass("none");
		$("#extend").addClass("none");
		$("#apChannel").removeClass("none");
		$("#apWdsChannel").addClass("none");
		$("#div_pppoe").addClass("none");
		$("#wlScan").parent().show();
		$("#ssidWrap").show();
	} else if (wrlMode == "ap") { //ap
		$("#wdsWrap").hide();
		$("#ssidWrap").show();
		$("#nettype").removeClass("none");
		$("#wdsMac tr:lt(4)").removeClass("none");
		$("#apclientMac").addClass("none");
		$("#apWdsChannel").removeClass("none");
		$("#apNetmode").removeClass("none");
		$("#extend").removeClass("none");
		$("#apChannel").removeClass("none");
		$("#apWdsChannel").removeClass("none");
		$("#wlScan").parent().hide();
		$("#div_pppoe").addClass("none");
	} else if (wrlMode == "pppoe") {
		$("#ssidWrap").hide();
		$("#wdsWrap").hide();
		$("#div_pppoe").removeClass("none");
	} else { //wds
		$("#wdsWrap").show();
		$("#ssidWrap").show();
		$("#div_pppoe").addClass("none");
	}

	setSecurityType();
}

function setSecurityType() {
	var secMode = $("#secMode").val(),
		wepAuth = $("#wepAuth").val();
	if ($("[name='wrlMode']:checked").val() == "ap") {
		var wep_auth_str = "";
		var str = '<option value="none">' + _("None") + '</option>' +
			'<option value="wep">WEP</option>' +
			'<option value="wpapsk">WPA-PSK</option>' +
			'<option value="wpa2psk">WPA2-PSK</option>' +
			'<option value="wpawpa2psk">Mixed WPA/WPA2-PSK</option>' +
			'<option value="wpa">WPA</option>' +
			'<option value="wpa2">WPA2</option>';
		wep_auth_str = '<option value="open">' + _("Open") + '</option>' +
			'<option value="shared">' + _("Shared") + '</option>' +
			'<option value="802.1x">802.1x</option>';
	} else {
		var str = '<option value="none">' + _("None") + '</option>' +
			'<option value="wep">WEP</option>' +
			'<option value="wpapsk">WPA-PSK</option>' +
			'<option value="wpa2psk">WPA2-PSK</option>' +
			'<option value="wpawpa2psk">Mixed WPA/WPA2-PSK</option>';
		wep_auth_str = '<option value="open">' + _("Open") + '</option>' +
			'<option value="shared">' + _("Shared") + '</option>';
	}
	$("#secMode").html(str);
	$("#secMode").val(secMode);
	if ($("#secMode").val() != secMode) {
		onChangeSec();
	}
	$("[name='wepAuth']").html(wep_auth_str);
	$("[name='wepAuth']").val(wepAuth);
	if ($("[name='wepAuth']").val() != wepAuth) {
		changeWepAuth()
	}

}

function checkSubmitData() {
	if ($("[name='wrlMode']")[3].checked == false) {
		if (!checkSec()) {
			return false;
		}
		if (!checkSsid()) {
			return false;
		}
	}
	if ($("[name='wrlMode']")[1].checked == true) {
		var maclist = [];
		if (f.wdsMac1.value == "" && f.wdsMac2.value == "" && f.wdsMac3.value == "" && f.wdsMac4.value == "") {
			alert(_("Please enter a MAC address!"));
			return false;
		}
		for (i = 1; i < 5; i++) {
			for (j = i + 1; j < 5; j++) {
				if (f["wdsMac" + i].value != "" && f["wdsMac" + i].value == f["wdsMac" + j].value) {
					alert(_("This MAC address already exists! Please enter a new one!"));
					f["wdsMac" + j].value = "";
					return false;
				}
			}
		}
		for (i = 1; i < 5; i++) {
			if (f["wdsMac" + i].value != "" && !checkMAC(f["wdsMac" + i].value)) {
				return false;
			}
			if (f["wdsMac" + i].value != "") {
				maclist.push(f["wdsMac" + i].value);
			}
		}
		f.wdslist.value = maclist.join(" ");
		for (i = maclist.length; i < 5; i++) {
			f.wdslist.value += " "
		}
		f.wdslist.value = f.wdslist.value.toUpperCase();
	}
	if (f.mppeEn.checked == true) {
		f.mppeEn.value = "true";
	} else {
		f.mppeEn.value = "false";
	}
	if (f.wrlMode[2].checked == true) {

		/*if (f.upMac.value == "") {
			alert(_("Please enter a valid MAC address!"));
			return false;
		}
		if(f.upMac.value != "" && !checkMAC(f.upMac.value)) {
			return false;
		}
		f.wdslist.value = f.upMac.value.toUpperCase() + "~~~";
		*/
	}
	if (f.wrlMode[3].checked == true) {
		var ppoeUser = f.pppoeUser.value,
			ppoePwd = f.pppoePwd.value,
			ppoeMtu = f.pppoeMTU.value;
		var mtu_reg = /^[0-9]{1,}$/;
		if (ppoeUser == "" || ppoePwd == "") {
			alert(_("Please enter a valid user name or password!"));
			return false;
		}
		if (/[\\]/g.test(ppoeUser) || /[\\]/g.test(ppoePwd)) {
			alert(_("%s is not allowed included in username and password!", ["\\"]));
			return false;
		}
		if (ppoeMtu == "" || !mtu_reg.test(ppoeMtu) || (ppoeMtu > 1492) || (ppoeMtu < 256)) {
			alert(_("Please enter a MTU value between 256 and 1492."));
			return false;
		}
	}
	return true;
}

function checkSsid() {
	var re = /^[^\\]+$/, //[^\<\>,;"%&]
		sid = f.ssid.value,
		num = sid.match(/([\u4E00-\u9FA5])/g);
	if (sid == "") {
		alert(_("Please enter SSID!"));
		return false;
	}
	//	if (!re.test(sid)) {//modify by zhangli 2016-3-14
	//		alert(_("SSID includes invalid characters: %s", ["\\"]));
	//		return false;
	//	}
	if (num && (sid.length + num.length * 2) > 32) {
		alert(_("SSID can only include up to 32 characters!"));
		return false;
	}
	return true;
}

function checkSec() {
	var securitymode = $("#secMode").val(),
		keyvalue;
	if (securitymode == "wep" && $("#wepAuth").val() != "802.1x") {
		var defaultid = $("#wepDefaultKey").val(),
			keylength;
		keyvalue = $("#wepKey" + defaultid).val();
		if (keyvalue.length == 0) {
			alert(_('Please enter the WEP key %s', [defaultid]));
			return false;
		}
		for (var i = 1; i < 5; i++) {
			keylength = $("#wepKey" + i).val().length;
			if (keylength != 0) {
				if ($("#wepKey" + i + "Type").val() == 1) {
					if (keylength != 5 && keylength != 13 || !/^[\x00-\xff]+$/.test($("#wepKey" + i).val())) {
						alert(_('WEP key %s is invalid! Please enter 5 or 13 ASCII characters!', [i]));
						return false;
					}
				} else {
					if (keylength != 10 && keylength != 26 || !/^[0-9a-fA-F]+$/.test($("#wepKey" + i).val())) {
						alert(_('WEP key %s is invalid! Please enter 10 or 26 Hex characters.', [i]));
						return false;
					}
				}
				if ($("#wepKey" + i).val().indexOf("\\") != -1) {
					alert(_("Invalid WEP security key %s. %s can't be included.", [i, "\\"]));
					return false;
				}
			}
		}

	}  else if ((securitymode == "wep" && $("#wepAuth").val() == "802.1x") || securitymode == "wpa" || securitymode == "wpa2") {
		var x,
			radiusPort = $("#radiusPort").val();
		if (!checkIp(f.radiusServerIp, _("RADIUS Server IP"))) {
			return false;
		}
		x = Number(radiusPort);
		$("#radiusPort").val(x);
		radiusPort = $("#radiusPort").val();
		if (isNaN(radiusPort) || radiusPort < 1025 || radiusPort > 65535 || !/^[1-9]\d*$/.test(radiusPort)) {
			$("#radiusPort").val('');
			alert(_("Please enter valid RADIUS port number!"));
			return false;
		}
		if (!/^[\x00-\xff]{1,64}$/.test(f.radiusPwd.value)) {
			alert(_("Please enter valid RADIUS Password!"));
			return false;
		}
	} else if (securitymode == "wpapsk" || securitymode == "wpa2psk" || securitymode == "wpawpa2psk") {
		keyvalue = $("#wifiPwd").val();
		if (!(/^[\x00-\x7f]{8,63}$/i.test(keyvalue) || /^[0-9a-f]{64}$/i.test(keyvalue))) {
			alert(_('Please enter 8-64 Hex characters or 8-63 ASCII characters.'));
			return false;
		}
		if (keyvalue.indexOf("\\") != -1) {
			alert(_("Invalid security key. %s can't be included.", ["\\"]));
			return false;
		}
	}
	return true;
}

function macAcc(e) {
	var curNode = e.target || e.srcElement,
		trNode = curNode.parentNode.parentNode;
	mac = trNode.cells[2].innerHTML,
		netType = trNode.cells[3].innerHTML
	ssid = $(curNode.parentNode.nextSibling).text(),
		secs = trNode.cells[7].innerHTML.split("/");
	if (f.wdsMac1.value == "" || f.workmode[2].checked == true) {
		f.ssid.value = ssid;
		f.uplinkChannel.value = trNode.cells[5].innerHTML;
		f.uplinkNetWork.value = netType;
		if (secs[0] == "none") {
			f.elements["secMode"].value = "none";
		} else if (secs[0] == "WEP" || secs[0] == "wep") {
			f.elements["secMode"].value = "wep";
		} else if (secs[0] == "WPA" || secs[0] == "wpa") {
			f.elements["secMode"].value = "wpapsk";
		} else if (secs[0] == "WPA2" || secs[0] == "wpa2") {
			f.elements["secMode"].value = "wpa2psk";
		} else {
			f.elements["secMode"].value = "wpawpa2psk";
		}
		if (secs[1] == "AES" || secs[1] == "aes") {
			f.cipherType[0].checked = true;
		} else if (secs[1] == "TKIP" || secs[1] == "tkip") {
			f.cipherType[1].checked = true;
		} else {
			f.cipherType[2].checked = true;
		}
	}
	if (f.wrlMode[1].checked == true) {
		if (f.wdsMac1.value == "") {
			f.wdsMac1.value = mac;
		} else if (f.wdsMac2.value == "") {
			f.wdsMac2.value = mac;
		} else if (f.wdsMac3.value == "") {
			f.wdsMac3.value = mac;
		} else {
			f.wdsMac4.value = mac;
		}
		f.uplinkBandwidth.value = curNode.parentNode.parentNode.childNodes[4].innerHTML;
		f.uplinkBandwidth.value = curNode.parentNode.parentNode.childNodes[6].innerHTML;
	} else {
		f.upLinkMac.value = mac;
	}
	$("[name=ssidEncode]").val(trNode.cells[9].innerHTML);
	onChangeSec();
}

function wdsScan() {
	if (this.value == _("Enable Scan")) {
		this.value = _("Disable Scan");
		this.disabled = true;
		$.GetSetData.getJson("/goform/scanSsidInfo?radio=" + f.wrlRadio.value + "&" + Math.random(), function (data) {
			document.getElementById("wlScan").disabled = false;
			var str1 = data.scanList,
				len = str1.length,
				scanStr = '<tr class="a3">' +
				'<td width="40">' + _("Select") + '</td>' +
				'<td id="ssidVal">' + _("SSID") + '</td>' +
				'<td width="130">' + _("MAC Address") + '</td>' +
				'<td width="60">' + _("Network Mode") + '</td>' +
				'<td width="75" id="ap_band">' + _("Channel Bandwidth") + '</td>' +
				'<td width="50" id="channelVal">' + _("Channel") + '</td>' +
				'<td width="70" id="ap_extend">' + _("Extension Channel") + '</td>' +
				'<td width="115" >' + _("Security") + '</td>' +
				'<td width="95" id="strength">' + _("Signal Strength") + '</td>' +
				'<td class="none">' + _("ssidEncode") + '</td></tr>',
				i = 0;

			$("#wlScanTab").html(scanStr);
			for (i = 0; i < len; i++) {

				signalClass = Number(str1[i].signal) + 100;

				if (f.wrlRadio.value == "2.4G" && str1[i].channel > 13) {
					continue;
				} else if (f.wrlRadio.value == "5G" && (str1[i].channel > 165 || str1[i].channel < 36)) {
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
				if (document.body.id == "mode") {
					scanStr = '<tr><td><input type="radio" name="wlSelect" onclick="macAcc(event)"/></td>'
				} else {
					scanStr = '<tr><td><input type="radio" name="wlSelect" onclick="macSel(this)"/></td>'
				}
				scanStr += '<td class="ssidTarget fixed"></td><td>' + str1[i].mac + '</td><td>' + str1[i].netMode + '</td><td>' + str1[i].bandwidth + '</td><td>' + str1[i].channel + '</td><td>' + str1[i].nctrlsb + '</td><td class="fixed">' + str1[i].secMode + '</td><td class="' + signalClass + '">' + str1[i].signal + 'dBm</td><td class="none">' + str1[i].ssidEncode + '</td></tr>'
				$("#wlScanTab").append(scanStr);
				$("#wlScanTab").find(".ssidTarget").text(decodeURIComponent(str1[i].ssid));
				//为SSID添加title，过长时显示
				$("#wlScanTab").find(".ssidTarget").attr("title", decodeURIComponent(str1[i].ssid));
				$("#wlScanTab").find(".ssidTarget").removeClass("ssidTarget");
			}
			$("#wlScanTab").show();
			$("#ssidVal,#channelVal,#strength").click(function () {
				var temp = new Array(),
					//obj = document.getElementById("wlScanTab").getElementsByTagName("tbody")[0], //获取当前页的表格
					objs = $("#wlScanTab tr:gt(0)"), //obj.childNodes　　　//获取表格的第一级子元素
					id = $(this).attr("id"),
					arr = objs.map(function (a) {
						if (id == "ssidVal")
							return $(this).children("td:eq(1)").html();
						else if (id == "channelVal")
							return parseInt($(this).children("td:eq(5)").html());
						else
							return parseInt($(this).children("td:eq(8)").html());
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
				else if (arr[0].localeCompare(arr[objs.length - 1]) > 0)
					temp.sort();
				else
					temp.sort().reverse();
				for (var i = 0; i < temp.length; i++)　　 $("#wlScanTab").append(temp[i][1]);　　　　　　　　　　 //将排序结果重新添加到表格中
			});
		})
	} else {
		this.value = _("Enable Scan");
		$("#wlScanTab").hide();
	}
}

function preSubmit() {
    if (parent.userType == "user") {
        alert(_("You must log in as an administrator to make any change."));
        return false;
    }
	if (initObj.enableClientNum > 128) {
		alert(_("When saved, the first SSID will be enabled and you should modify the permitted numbers of clients!"));
		return false;
	}

	if (checkSubmitData()) {
		
		submitData("goform/setWizardInfo");
	}
}

function selectWepOption() {
	var i = 1,
		wepKeyValue;
	for (; i < 5; i++) {
		wepKeyValue = $("#wepKey" + i).val()
		if (wepKeyValue.length == 5 || wepKeyValue.length == 13) {
			$("#wepKey" + i + "Type").val("1"); //ascii
		} else {
			$("#wepKey" + i + "Type").val("0");
		}
	}
}

function getValue() {
	$.GetSetData.getJson("goform/getWizardInfo", initValue);
}

function initValue(obj) {
    obj.wrl2.ssid = decodeSSID(obj.wrl2.ssid);
    obj.wrl5.ssid = decodeSSID(obj.wrl5.ssid);
	initObj = obj;
    if(f.wrlRadio.value == '2.4G') {
        inputValue(obj.wrl2);
        changeWorkMode();
        $("#secMode").val(obj.wrl2.secMode);
        onChangeSec();
        $("#webAuth").val(obj.wrl2.webAuth);
    } else {
        inputValue(obj.wrl5);
        changeWorkMode();
        $("#secMode").val(obj.wrl5.secMode);
        onChangeSec();
        $("#webAuth").val(obj.wrl5.webAuth);
    }
	//inputValue(obj);
	//inputValue(obj.modeInfo);
	changeWepAuth();
	selectWepOption();
	if (!addEvent) {
		$('[name=wepKey1]').initPassword();
		$('[name=wepKey2]').initPassword();
		$('[name=wepKey3]').initPassword();
		$('[name=wepKey4]').initPassword();
		$('[name=wifiPwd]').initPassword();
		$('[name=radiusPwd]').initPassword();
		addEvent = false;
	}
}

function init() {
	initHtml();
	initEvent();
	getValue();
}
window.onload = function () {
	init();
}