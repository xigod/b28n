var ssidValue;

function initHtml() {
	$("#head").html(tbl_head(3));
}

function initEvent() {
	$("#index").on("change", function () {
		getValue(this.value);
	});

	$('body').delegate('.offline', 'click', function() {
		var data = {
				mac : $(this).parents('tr').children().eq(1).html() + ";1",
				ssidIndex : $("#index").val(),
				radio : top.RADIO
			};
		$.post('goform/setStaOffline?random=' + Math.random(), data, function() {
			getValue($("#index").val());
		});
	});
}

function getValue(index) {
	ssidValue = index;
	$.GetSetData.getJson("goform/getWrlClients?radio=" + top.RADIO + "&ssidIndex=" + index, initValue);
}

function initValue(obj) {
	var ssidList = obj.ssidList,
		ssidStr = "",
		i = 0,
		len = ssidList.length,
		tbd = document.getElementById("list"),
		dataStr,
		datas = obj.clients;

	if (!obj.osEnable) {
		$("#os_type").hide();
	} else {
		$("#os_type").show();
	}
	$("#index").html('');
	for (i = 0; i < len; i++) {
		ssidStr = "<option value='" + i + "'></option>";
		$("#index").append(ssidStr);
		$("#index").find("option:last").text(decodeURIComponent(decodeSSID(ssidList[i])));
	}

	$("#index").val(ssidValue);

	if (datas.length == 0) {
		if (obj.osEnable) {
			$(tbd).html("<tr><td colspan=8>" + _("No client connected.") + "</td></tr>");
		} else {
			$(tbd).html("<tr><td colspan=7>" + _("No client connected.") + "</td></tr>");
		}
	} else {
		$("#list tr").remove();
		for (i = 0; i < datas.length; i++) {
			dataStr = "<tr><td>" + (i + 1) + "</td>";
			dataStr += "<td>" + datas[i].mac + "</td>";
			dataStr += "<td>" + (datas[i].ip != "0.0.0.0" ? datas[i].ip : _("Unknown")) + "</td>";
			dataStr += "<td>" + timeStr(datas[i].connectTime) + "</td>";
			if (top.RADIO == "2.4G") {
				dataStr += "<td>" + (parseInt(datas[i].sendSpeed) <= 450 ? datas[i].sendSpeed : "1Mbps") + "</td>";
				dataStr += "<td>" + (parseInt(datas[i].receiveSpeed) <= 450 ? datas[i].receiveSpeed : "1Mbps") + "</td>";
			} else {
				dataStr += "<td>" + (parseInt(datas[i].sendSpeed) <= 1300 ? datas[i].sendSpeed : "1Mbps") + "</td>";
				dataStr += "<td>" + (parseInt(datas[i].receiveSpeed) <= 1300 ? datas[i].receiveSpeed : "1Mbps") + "</td>";
			}
            if (obj.osEnable) {
			     dataStr += "<td>" + datas[i].osType + "</td>";
            }
            dataStr += "<td><img class='offline' src='/images/offline.png'></td>";
			dataStr += "</tr>";
			$(tbd).append(dataStr);
		}
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