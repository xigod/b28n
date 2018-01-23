function initHtml() {
	$("#head").html(tbl_head(2));
}

function getValue() {
	$.GetSetData.getJson("goform/getTrafficStatus?radio=" + top.RADIO, initValue);
}

function initValue(obj) {
	var ssidList = obj.ssidList,
		i = 0,
		len = ssidList.length,
		tabTb = document.getElementById("StatisticList"),
		tabStr;

	if (top.GLOBAL.wrlMode == 'apclient') {
		if (len == 8) {
			len = 7;
		}
	}
	for (i = 0; i < len; i++) {

		tabStr = "<tr><td class='ssidTarget'></td>";
		tabStr += "<td>" + ((ssidList[i].rxTraffic / 1024 / 1024).toFixed(2) + "MB") + "</td>";
		tabStr += "<td>" + ssidList[i].rxPacketNum + "</td>";
		tabStr += "<td>" + ((ssidList[i].txTraffic / 1024 / 1024).toFixed(2) + "MB") + "</td>";
		tabStr += "<td>" + ssidList[i].txPacketNum + "</td></tr>";
		$(tabTb).append(tabStr);
		$(tabTb).find(".ssidTarget").text(decodeSSID(decodeURIComponent(ssidList[i].ssid)));
		$(tabTb).find(".ssidTarget").removeClass("ssidTarget");
	}

}

function init() {
	initHtml();
	getValue();
}
window.onload = function () {
	init();
}