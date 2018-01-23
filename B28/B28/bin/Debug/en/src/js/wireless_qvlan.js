var maxSsidNum = +top.CONFIG_2_4G_MAX_SSID_NUMBER,
	maxSsidNum_5g = +top.CONFIG_5G_MAX_SSID_NUMBER,
	initObj = {};
var f = document.forms[0];

function initHtml() {
	$("#head").html(tbl_head(22));
	$("#tail").html(tbl_tail("wl_qvlan"));
}

function getValue() {
	$.GetSetData.getJson("goform/getWrlQvlanInfo", initValue);
}

function initValue(obj) {
	initObj = obj;
	var qvlanStr = "",
		i = 1;
	for (i = 1; i <= maxSsidNum; i++) {
		qvlanStr += '<tr id="qvlan_' + i + '">' +
			'<td id="ssid' + i + '" align="right" class="pr40"></td>' +
			'<td class="pl10"><input type="text" name="qvlan' + i + '" id="qvlan' + i + '" size="4" maxlength="4"></td>' +
			'</tr>';
	}

	$("#qvlan_set").html(qvlanStr);
	qvlanStr = "";
	for (i = 1; i <= maxSsidNum_5g; i++) {
		qvlanStr += '<tr id="qvlan_' + i + '_5g">' +
			'<td id="ssid' + i + '_5g" align="right" class="pr40"></td>' +
			'<td class="pl10"><input type="text" name="qvlan' + i + '_5g" id="qvlan' + i + '_5g" size="4" maxlength="4"></td>' +
			'</tr>';
	}

	$("#qvlan_set_5g").html(qvlanStr);

	if (maxSsidNum_5g == "0") {
		$("#qvlan_set_5g").parent().css("display", "none");
	} else {
		$("#qvlan_set_5g").parent().css("display", "");
	}

	var trunk_str = "",
		lan_port_str = "",
		check,
		lanvlan;
	for (var i = 0; i < top.CONFIG_MAX_LAN_PORT_NUMBER; i++) {
		//check = trunkport.split(";")[i] == "1" ? true : false;

		trunk_str += '<label for="port' + i + '" class="radio"><input type="checkbox" id="port' + i + '" name="port' + i + '" >LAN' + i + '</label>';
		lan_port_str += '<tr>' +
			'<td align="right" class="w150 pr40">' + obj.wiredLanPort[i].portName + '</td>' +
			'<td class="pl10">' +
			'<input type="text" name="lan_qvlan' + i + '" id="lan_qvlan' + i + '" size="4" maxlength="4" value="' + obj.wiredLanPort[i].vlanId + '">' +
			'</td>' +
			'</tr>';
	}
	$("#port_trunk").html(trunk_str);
	$("#lan_port_wrap").html(lan_port_str);
	for (var i = 0; i < top.CONFIG_MAX_LAN_PORT_NUMBER; i++) {
		check = obj.trunkPort.split(";")[i] == "1" ? true : false;
		$("[id='port" + i + "']")[0].checked = check;
		if (check == true) {
			$("#lan_qvlan" + i).attr("disabled", true);
		} else {
			$("#lan_qvlan" + i).removeAttr("disabled");
		}
	}

	$(":checkbox[id^=port]").click(function () {
		var clicktrunk = this.id;
		var lanId = "lan_qvlan" + clicktrunk.charAt(4);
		if (this.checked == true) {
			$("#" + lanId).attr("disabled", true);
		} else {
			$("#" + lanId).removeAttr("disabled");
		}
	});
	if (top.CONFIG_MAX_LAN_PORT_NUMBER < 2) {
		$("#div_trunk").css("display", "none");
		$("#lan_port_wrap").parent().css("display", "none");
	}

	for (var i = 0; i < maxSsidNum; i++) {
		$("#" + ("ssid" + (i + 1))).text(decodeURIComponent(decodeSSID(obj.ssidQvlan[i].ssid)));
		$("#" + ("qvlan" + (i + 1))).val(decodeURIComponent(obj.ssidQvlan[i].vlanId));
		if (obj.ssidQvlan[i].ssidEn == "true") {
			$("#" + ("qvlan" + (i + 1))).parent().parent().css("display", "");
		} else {
			$("#" + ("qvlan" + (i + 1))).parent().parent().css("display", "none");
		}
	}

	for (var i = 0; i < maxSsidNum_5g; i++) {
		$("#" + ("ssid" + (i + 1) + "_5g")).text(decodeURIComponent(decodeSSID(obj.ssidQvlan5G[i].ssid)));
		$("#" + ("qvlan" + (i + 1) + "_5g")).val(decodeURIComponent(obj.ssidQvlan5G[i].vlanId));
		if (obj.ssidQvlan5G[i].ssidEn == "true") {
			$("#" + ("qvlan" + (i + 1) + "_5g")).parent().parent().css("display", "");
		} else {
			$("#" + ("qvlan" + (i + 1) + "_5g")).parent().parent().css("display", "none");
		}
	}

	inputValue(obj);

	if (obj.wrlMode == "apclient") {
		$("#qvlan_" + (maxSsidNum)).css("display", "none");
	}
	if (obj.wrlMode5G == "apclient") {
		$("#qvlan_" + (maxSsidNum_5g) + "_5g").css("display", "none");
	}
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

function checkSubmitData() {
	var qvlan = "";
	for (var i = 1; i <= maxSsidNum; i++) {
		qvlan += f["qvlan" + i].value + ",";
	}
	qvlan = qvlan.replace(/[,]$/, "");

	var trunk = [];
	var trunk_ok = false;
	for (var i = 0; i < top.CONFIG_MAX_LAN_PORT_NUMBER; i++) {
		trunk.push((!!$('#port' + i).attr('checked')) ? 1 : 0);
		if (trunk[i] == 1) {
			trunk_ok = true;
		}
	}
	if ((initObj.qvlanEn == "false" && f.qvlanEn.checked == false)) {
		alert(_("The VLAN function is disabled. Please check the settings."));
		return false;
	}

	/*var vlanArr = lan_vlans.split(",");
	var changeFlag = false;
	if (f.lan_qvlan0.value == vlanArr[0] && f.lan_qvlan1.value == vlanArr[1]) {
		changeFlag = true;
	}

	if (qvlan_en == 1 && qvlan == qvlans.replace(/[,]+$/, "") && f.qvlanEn.checked == true && pvid == f.pvid.value && manageVlan == f.manageVlan.value && f.trunkport.value == trunkport && changeFlag) {
		alert(_("The settings are not changed. You do not need to save them."));
		return false;
	}
*/
	if (f.qvlanEn.checked == true) {
		if (trunk_ok == false) {
			alert(_("Please set at least one LAN port as the trunk port."));
			return false;
		}
		/*var qvlan1,
				qvlan2,
				ssid1_qvlan,
				qvlanIndex = 0;*/ //判断QVLAN是否一致
		//ssid1_qvlan = Number(f.qvlan1.value);
		for (var i = 1; i <= maxSsidNum; i++) {
			/*qvlan1 = f["qvlan" + i].value;
			if (ssid1_qvlan == qvlan1) {
				qvlanIndex += 1;
			}*/
			if (!checkData(f["qvlan" + i], _("QVLAN"), 1, 4094)) {
				return false;
			}
		}

		for (var i = 1; i <= maxSsidNum_5g; i++) {
			/*qvlan1 = f["qvlan" + i].value;
			if (ssid1_qvlan == qvlan1) {
				qvlanIndex += 1;
			}*/
			if (!checkData(f["qvlan" + i + "_5g"], _("QVLAN"), 1, 4094)) {
				return false;
			}
		}

		for (var i = 0; i < top.CONFIG_MAX_LAN_PORT_NUMBER; i++) {

			if (!checkData(f["lan_qvlan" + i], _("QVLAN"), 1, 4094)) {
				return false;
			}
		}

		if (!checkData(f.pvid, _("QVLAN"), 1, 4094)) {
			return false;
		}
		if (!checkData(f.manageVlan, _("QVLAN"), 1, 4094)) {
			return false;
		}

	} else {
		f.qvlanEn.value = "false";
	}

	if (confirm(_("This device will reboot immediately after the settings are saved. Do you want to continue?"))) {
		return true;
	} else {
		return false;
	}
}

function preSubmit() {
    if (parent.userType == "user") {
        alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
        return false;
    }
	if (checkSubmitData()) {
		var wiredLanPort = '',
			ssidQvlan = '',
			ssidQvlan5G = '',
			port = '';
		for(var i = 0; i < $("[name*=port]").length; i++) {
			if($("[name*=port]").eq(i)[0].checked) {
				port += '1;';
			} else {
				port += '0;';
			}
		}
		for(var i = 0; i < $("[name*=lan_qvlan]").length; i++) {
			wiredLanPort += $("[name*=lan_qvlan]")[i].value + ';';
		}
		for (var i = 1; i <= maxSsidNum; i++) {
			ssidQvlan += f["qvlan" + i].value + ';';
		}
		for (var i = 1; i <= maxSsidNum_5g; i++) {
			ssidQvlan5G += f["qvlan" + i + "_5g"].value + ';';
		}
		$("[name=trunkPort]").val(port.slice(0,port.length-1));
		$("[name=wiredLanPort]").val(wiredLanPort.slice(0,wiredLanPort.length-1));
		$("[name=ssidQvlan]").val(ssidQvlan.slice(0,ssidQvlan.length-1));
		$("[name=ssidQvlan5G]").val(ssidQvlan5G.slice(0,ssidQvlan5G.length-1));
		submitData("goform/setWrlQvlanInfo", callback);
	}
}


function callback() {
	window.parent.reboot('', 450, 0);
}

function init() {
	initHtml();
	getValue();
}
window.onload = function () {
	init();
}