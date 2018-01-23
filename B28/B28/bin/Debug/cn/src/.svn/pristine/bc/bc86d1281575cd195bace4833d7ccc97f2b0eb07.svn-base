var refreshTimer;

function initHtml() {
	$("#head").html(tbl_head(23));
}

function initEvent() {
	$("#refresh").on("click", function () {
		getValue();
	});
}

function getValue() {
	$.GetSetData.getJson("goform/getDhcpList", initValue);
}

function initValue(obj) {
	clearTimeout(refreshTimer);
	refreshTimer = setTimeout(function () {
		getValue();
	}, 5000);

	var tbd = document.getElementById("list"),
		dhcpList = obj.dhcpList,
		i = 0,
		tabStr;
	$("#list tr").remove();
    if (dhcpList.length == 0) {
        tabStr = "<tr><td colspan=5>" + _("No clients connected!") + "</td></tr>";
        $("#list").html(tabStr);
    } else {
    	for (i = 0; i < dhcpList.length; i++) {
    		tabStr = "<tr><td>" + (i + 1) + "</td>";
    		tabStr += "<td class='hostnameTarget fixed'>" + (i + 1) + "</td>";
    		tabStr += "<td>" + dhcpList[i].ip + "</td>";
    		tabStr += "<td>" + dhcpList[i].mac + "</td>";
    		tabStr += "<td>" + timeStr(dhcpList[i].leaseTime) + "</td>";
    		$(tbd).append(tabStr);
    		$(tbd).find(".hostnameTarget").text(dhcpList[i].hostName);
    		$(tbd).find(".hostnameTarget").attr("title", dhcpList[i].hostName);
    		$(tbd).find(".hostnameTarget").removeClass("hostnameTarget");
    	}
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