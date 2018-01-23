var maxSsidNum;
var modeObj = {
	"bg": _("11b/g mixed"),
	"b": _("11b"),
	"g": _("11g"),
	"bgn": _("11b/g/n mixed"),
	"ac": _("11ac"),
	"an": _("11a/n"),
	"a": _("11a"),
};

function initHtml() {
	$("#head").html(tbl_head(1));
}

function getValue() {
	if (top.RADIO == "2.4G") {
		maxSsidNum = (+top.CONFIG_2_4G_MAX_SSID_NUMBER);
	} else {
		maxSsidNum = (+top.CONFIG_5G_MAX_SSID_NUMBER);
	}

	$.GetSetData.getJson("goform/getWrlStatus?radio=" + top.RADIO, initValue);
}

function initValue(obj) {
	$("#wdsStatus").addClass("none");
	inputValue(obj);
	if (obj.baseRadioEn == "true") {
		$("#baseRadioEn").html(_("On"));
	} else {
		$("#baseRadioEn").html(_("Off"));
	}
	modeObj
	$("#baseNetMode").html(modeObj[obj.baseNetMode]);

	//ssid list
	var tabTb = document.getElementById("wireless_status");
	var ssid_index = 0,
		ssidList = obj.ssidList,
		tabStr = "",
		sta = {
			"false": _("Disabled"),
			"true": _("Enabled")
		},
		sec = {
			"none": _("None"),
			"wep": _("WEP"),
			"wpapsk": _("WPA-PSK"),
			"wpa2psk": _("WPA2-PSK"),
			"wpawpa2psk": _("Mixed WPA/WPA2-PSK"),
			"wpa": _("WPA"),
			"wpa2": _("WPA2")
		};

	if (obj.wrlMode == "apclient") {
		ssid_index = maxSsidNum - 1;
	} else {
		ssid_index = maxSsidNum;
	}

	for (i = 0; i < ssid_index; i++) {
		tabStr = "<tr><td class='ssidTarget'></td>";
		tabStr += "<td>" + ssidList[i].mac + "</td>";
		tabStr += "<td>" + sta[ssidList[i].ssidEn] + "</td>";
		tabStr += "<td>" + sec[ssidList[i].secMode] + "</td>";
		tabStr += "</tr>";

		$(tabTb).append(tabStr);
		$(tabTb).find(".ssidTarget").text(decodeURIComponent(decodeSSID(ssidList[i].ssid)));
		$(tabTb).find(".ssidTarget").removeClass("ssidTarget");
	}

	//wds list
	if (obj.wrlMode == "wds") {
		$("#wdsStatus").removeClass("none");
		var temp = obj.wdsList;
		for (var i = 0; i < 4; i++) {
			if (temp[i].mac.length == 17) {
				if (temp[i].connectStatus == 'up') {
					$("#wds_status").append("<tr><td>" + (i + 1) + "</td><td>" + temp[i].mac +
						"</td><td>" + _("Connected") + "</td></tr>");

				} else if (temp[i].connectStatus == "down") {
					$("#wds_status").append("<tr><td>" + (i + 1) + "</td><td>" + temp[i].mac +
						"</td><td>" + _("Disconnected") + "</td></tr>");

				} else {
					$("#wds_status").append("<tr><td>" + (i + 1) + "</td><td>" + temp[i].mac +
						"</td><td>" + _("Unknow") + "</td></tr>");

				}

			}
		}
	}
}

function init() {
	initHtml();
	getValue();
}
window.onload = function () {
	init();
}