var initObj = {};
var f = document.forms[0],
	ssidIndex = 0,
	maxClientNum = +top.CONFIG_MAX_CLIENT;
var addEvent = false;

function initHtml() {
	$("#head").html(tbl_head(6));
	$("#tail").html(tbl_tail("wl_basic"));
}

function initEvent() {
	$("select[name=ssidIndex]").on("change", function() {
		getValue($("#ssidIndex").val());
	});

	$("input:[name=ssidEn]").change(function () {
		if (this.checked == false && f.ssidIndex.value == 0) {
			if (initObj.wrlMode == "wds") {
				alert(_("In WDS mode, the first SSID cannot be disabled!"));
				this.checked = true;
			}
			if (initObj.wrlMode == "apclient") {
				alert(_("In AP Client mode, the first SSID cannot be disabled!"));
				this.checked = true;
			}
		}
	});

	$("select[name=secMode]").on("change", onChangeSec);
	$("select[name=wepAuth]").on("change", changeWepAuth);
	
   
}

function getValue(ssidIndex) {
	$.GetSetData.getJson("goform/getWrlBasicInfo?radio=" + top.RADIO + "&ssidIndex="+ssidIndex, initValue);
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

function initSsidHtml(ssidArr) {
	var i = 0,
		len = ssidArr.length,
		ssidValue = initObj.ssidIndex || "0",
		optionStr;
	$("#ssidIndex").html('');
	for (i = 0; i < len; i++) {
		optionStr = "<option value='" + (i) + "'></option>";

		$("#ssidIndex").append(optionStr);
		$("#ssidIndex").find("option:eq(" + i + ")").text(decodeURIComponent(decodeSSID(ssidArr[i])));
	}

	$("#ssidIndex").val(ssidValue);
}

function initValue(obj) {
    obj.ssid = decodeSSID(obj.ssid);
	initObj = obj;
	initSsidHtml(initObj.ssidList);
	//f.broadcast.value = datas[2];
	/*if (str.bdssid == 2) {
		f.hideSsid.checked = true;
		f.broadcastSsid.value = 0;
		//f.broadcastSsid.disabled = true;
		f.broadcastSsid.disabled = false;
	} else {
		f.hideSsid.checked = false;
		f.broadcastSsid.disabled = false;
		f.broadcastSsid.value = str.bdssid;
	}*/

	/*$(":checkbox[name=hideSsid]").on("click", function () {
		if (this.checked == true) {
			//f.broadcastSsid.disabled = true;
			f.broadcastSsid.disabled = false;
		} else {
			f.broadcastSsid.disabled = false;
		}
	})*/
	inputValue(obj);
	$("#secMode").val(obj.secMode);
	onChangeSec();
	$("#webAuth").val(obj.webAuth);
	changeWepAuth();
	selectWepOption();

	if (initObj.wrlMode == "wds" && 0 == ssidIndex) {
		alert(_("In WDS Mode,the frist ssid can't be changed."))
		$("#btnsubmit").attr("disabled", true);
	} else {
		$("#btnsubmit").removeAttr("disabled");
	}

	var helpStr = "";
	helpStr = _("(Range:1~%s)", [maxClientNum]);
	$("#clientHelp").html(helpStr);

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

    if(secMode == "wpa" || secMode == "wpa2") {
        $("#keyPeriod").val(initObj.radiusPeriod);
    } else {
        $("#keyPeriod").val(initObj.keyPeriod);
    }
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

	} else if ((securitymode == "wep" && $("#wepAuth").val() == "802.1x") || securitymode == "wpa" || securitymode == "wpa2") {
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

function checkData(obj, str, s, e) {
	if (obj.value == "") {
		alert(_("Please enter %s!", [str]));
		return false;
	}
	if (isNaN(obj.value) || obj.value < s || obj.value > e || !/^[1-9]\d*$/.test(obj.value)) {
		alert(_("%s is invalid %s range: %s ~ %s.They must be round numbers!", [str, str, s, e]));
		return false;
	}
	return true;
}

function checkSubmitData() {
	var tmp = 0;

	if (!checkSsid()) {
		return false;
	}
	var ssid_arry = [];

	$("#ssidIndex option").each(function () {
		ssid_arry.push($(this).text());
	})

	for (var i = 0; i < ssid_arry.length; i++) {
		if (f.ssid.value == decodeSSID(ssid_arry[i]) && i != f.ssidIndex.value) {
			alert(_("SSID can not be same with same band other SSID"));
			return false;
		}
	}
	if (f.ssidEn.checked == true) {
		tmp = parseInt(f.maxClients.value, 10) + parseInt(initObj.sum_client, 10);
	} else {
		tmp = parseInt(initObj.sum_client, 10);
	}

	if (tmp > 128) {
		alert(_("Total maximum clients should be within 128!"));
		return false;
	}


	if (!checkData(f.maxClients, _("Limit numbers of client"), 1, maxClientNum)) {
		return false;
	}
	if (f.ssidEn.checked == true) {
		f.ssidEn.value = 1;
	} else {
		f.ssidEn.value = 0;
	}
	if (f.hideSsid.checked == true) {
		f.broadcastSsidEn.value = "2";
	}
	if (!checkSec()) {
		return false;
	}
	if (!(f.secMode.value == 0 || (f.secMode.value == 1 && f.wepAuth.value == "802.1x"))) {
		var x = Number(f.keyPeriod.value);
		f.keyPeriod.value = x;
		if (isNaN(x) || (x < 60 && x != 0) || !/^[0-9]\d*$/.test(x)) {
			f.keyPeriod.value = '';
			alert(_('Key Update Interval must be either 0 or 60~99999!'));
			return false;
		}
	}
	return true;
}

function preSubmit() {
    if (parent.userType == "user") {
        alert(_("You must log in as an administrator to make any change."));
        return false;
    }
	if (checkSubmitData()) {
		submitData("goform/setWrlBasicInfo");
	}
}



function init() {
	initHtml();
	initEvent();
	getValue(0);
}
window.onload = function () {
	init();
}