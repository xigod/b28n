$(function () {
	var bodyId = $("body").attr("id"),
		i;
	if (bodyId == "system") {
		$("#head").html(tbl_head(0));
		$("#apName").html(apName);
		$("#systime").html(systime);
		$("#uptime").html(timeStr(uptime));
		$("#clients").html(clients);
		$("#run_code_ver").html(run_code_ver);
		$("#hw_ver").html(hw_ver);
		$("#lan_mac").html(lan_mac);
		$("#ipAddr").html(ipAddr);
		$("#mask").html(mask);
		$("#dns1").html(dns1);
		$("#dns2").html(dns2);
		if (conn_status == "") {
			conn_status = 0;
		}
		$("#conn_status").html(conn_str[conn_status]);

		if (wan_ip_info.length > 0) {
			var waninfo = wan_ip_info.split('\t');
			$("#wan_ip").html(waninfo[0]);
			$("#wan_mask").html(waninfo[2]);
			$("#default_gate").html(waninfo[1]);
			$("#wan_dns1").html(waninfo[3]);
			$("#wan_dns2").html(waninfo[4]);
		}
		if (curmode == "3") {
			$('.wan_msg').css("display", "");
			$('.lan_msg').css("display", "none");
		} else {
			$('.wan_msg').css("display", "none");
			$('.lan_msg').css("display", "");
		}
	}
	if (bodyId == "wireless") {
		$("#head").html(tbl_head(1));
		if (data.basic_enable == "1") {
			$("#wlEnable").html(_("On"));
		} else {
			$("#wlEnable").html(_("Off"));
		}

		if (data.basic_mode == 'bg') {
			$("#mode").html('b/g');
		} else if (data.basic_mode == 'bgn') {
			$("#mode").html('b/g/n');
		} else if (data.basic_mode == 'an') {
			$("#mode").html('a/n');
		} else {
			$("#mode").html(data.basic_mode);
		}
		/*if(data.basic_mode == "0") {
			$("#mode").html("11b/g���ģʽ");
		} else if(data.basic_mode == "1") {
			$("#mode").html(_("11b"));
		} else if(data.basic_mode == "2") {
			$("#mode").html(_("11g"));
		} else if(data.basic_mode == "3") {
			$("#mode").html(_("11b/g/n"));
		}*/
		$("#cur_channel").html(data.basic_channel);
		var tabTb = document.getElementById("wireless_status");
		var ssid_index = 0;
		if (curmode == 2) {
			ssid_index = maxSsidNum - 1;
		} else {
			ssid_index = maxSsidNum;
		}
		for (i = 1; i <= ssid_index; i++) {
			tabTb.insertRow(i - 1);
			tabTb.rows[i - 1].insertCell(0).innerHTML = data["ssid" + i]; //$("<span>").html(data["ssid" + i]).text().replace(/\s/g,"&nbsp;");
			tabTb.rows[i - 1].insertCell(1).innerHTML = data["mac" + i];
			tabTb.rows[i - 1].insertCell(2).innerHTML = sta[+data["ssidOF" + i]];
			tabTb.rows[i - 1].insertCell(3).innerHTML = sec[+data["security" + i]];
		}
		if (curmode == 1 && macAddr.length >= 17) {
			$("#wdsStatus").removeClass("none");
			var temp = macAddr.split(" ");
			var tempStatus = macsta.split(";");
			for (var i = 0; i < 4; i++) {
				if (temp[i].length == 17) {
					if (tempStatus[i] == 'Up') {
						$("#wds_status").append("<tr><td>" + (i + 1) + "</td><td>" + temp[i] +
							"</td><td>" + _("Connected") + "</td></tr>");

					} else if (tempStatus[i] == "Down") {
						$("#wds_status").append("<tr><td>" + (i + 1) + "</td><td>" + temp[i] +
							"</td><td>" + _("Disconnected") + "</td></tr>");

					} else {
						$("#wds_status").append("<tr><td>" + (i + 1) + "</td><td>" + temp[i] +
							"</td><td>" + _("Unknown") + "</td></tr>");

					}

				}
			}
		}
	}
	if (bodyId == "wireless_5g") {
		$("#head").html(tbl_head(1));
		if (data.basic_enable == "1") {
			$("#wlEnable").html(_("On"));
		} else {
			$("#wlEnable").html(_("Off"));
		}
		if (data.basic_mode == 'bg') {
			$("#mode").html('b/g');
		} else if (data.basic_mode == 'bgn') {
			$("#mode").html('b/g/n');
		} else if (data.basic_mode == 'an') {
			$("#mode").html('a/n');
		} else {
			$("#mode").html(data.basic_mode);
		}
		/*if (data.basic_mode == 0) {
			$("#mode").html(_("11a"));
		} else {
			$("#mode").html(_("11a/n"));
		}*/
		$("#cur_channel").html(data.basic_channel);

		var tabTb = document.getElementById("wireless_status");
		var ssid_index = 0;
		if (curmode == 2) {
			ssid_index = maxSsidNum_5g - 1;
		} else {
			ssid_index = maxSsidNum_5g;
		}
		for (i = 1; i <= ssid_index; i++) {
			tabTb.insertRow(i - 1);
			tabTb.rows[i - 1].insertCell(0).innerHTML = data["ssid" + i]; //$("<span>").html(data["ssid" + i]).text().replace(/\s/g,"&nbsp;");
			tabTb.rows[i - 1].insertCell(1).innerHTML = data["mac" + i];
			tabTb.rows[i - 1].insertCell(2).innerHTML = sta[+data["ssidOF" + i]];
			tabTb.rows[i - 1].insertCell(3).innerHTML = sec[+data["security" + i]];
		}
		if (curmode == 1 && macAddr.length >= 17) {
			$("#wdsStatus").removeClass("none");
			var temp = macAddr.split(" ");
			var tempStatus = macsta.split(";");
			for (var i = 0; i < 4; i++) {
				if (temp[i].length == 17) {
					if (tempStatus[i] == 'Up') {
						$("#wds_status").append("<tr><td>" + (i + 1) + "</td><td>" + temp[i] +
							"</td><td>" + _("Connected") + "</td></tr>");

					} else if (tempStatus[i] == "Down") {
						$("#wds_status").append("<tr><td>" + (i + 1) + "</td><td>" + temp[i] +
							"</td><td>" + _("Disconnected") + "</td></tr>");

					} else {
						$("#wds_status").append("<tr><td>" + (i + 1) + "</td><td>" + temp[i] +
							"</td><td>" + _("Unknown") + "</td></tr>");

					}

				}
			}
		}
	}
	if (bodyId == "ap") {
		$("#head").html(tbl_head(2));
		var tabTb = document.getElementById("StatisticList");

		$.get("/goform/WifiStatistic?r="+Math.random(), function (str) {
			if (str != " ") {
				var datas = str.split("\n");
				if (curmode == '2') {
					if (datas.length == 8) {
						datas.length = 7;
					}
				}
				for (i = 0; i < datas.length; i++) {

					var rowlist = datas[i].substr(0, datas[i].length).split('\t');
					if (rowlist.length < 5) continue;
					tabTb.insertRow(i);
					tabTb.rows[i].insertCell(0).innerHTML = toHtmlCode(rowlist[0]); //.replace(/\s/g,"&nbsp;")
					tabTb.rows[i].insertCell(1).innerHTML = (rowlist[1] / 1024 / 1024).toFixed(2) + "MB";
					tabTb.rows[i].insertCell(2).innerHTML = rowlist[2];
					tabTb.rows[i].insertCell(3).innerHTML = (rowlist[3] / 1024 / 1024).toFixed(2) + "MB";
					tabTb.rows[i].insertCell(4).innerHTML = rowlist[4];
				}
			}
		})
	}
	if (bodyId == "ap_5g") {
		$("#head").html(tbl_head(2));
		var tabTb = document.getElementById("StatisticList");
		$.get("/goform/WifiStatistic5g?r="+Math.random(), function (str) {
			if (str != " ") {
				var datas = str.split("\n");
				if (curmode == '2') {
					if (datas.length == 4) {
						datas.length = 3;
					}
				}
				for (i = 0; i < datas.length; i++) {
					var rowlist = datas[i].substr(0, datas[i].length).split('\t');
					if (rowlist.length < 5) continue;
					tabTb.insertRow(i);
					tabTb.rows[i].insertCell(0).innerHTML = toHtmlCode(rowlist[0]); //.replace(/\s/g,"&nbsp;")
					tabTb.rows[i].insertCell(1).innerHTML = (rowlist[1] / 1024 / 1024).toFixed(2) + "MB";
					tabTb.rows[i].insertCell(2).innerHTML = rowlist[2];
					tabTb.rows[i].insertCell(3).innerHTML = (rowlist[3] / 1024 / 1024).toFixed(2) + "MB";
					tabTb.rows[i].insertCell(4).innerHTML = rowlist[4];
				}
			}
		})
	}
	if (bodyId == "wirelessList") {
		$("#head").html(tbl_head(3));
		initSsidHtml(maxSsidNum);
		$("select[name=index]").change(function () {
			initValue(this.value, 0);
		});
		initValue(0, 0, 1);
	}
	if (bodyId == "wirelessList_5g") {
		$("#head").html(tbl_head(3));
		initSsidHtml(maxSsidNum_5g);
		$("select[name=index]").change(function () {
			initValue(this.value, 1);
		});
		initValue(0, 1, 1);
	}
});
var maxSsidNum = +top.CONFIG_2_4G_MAX_SSID_NUMBER,
	maxSsidNum_5g = +top.CONFIG_5G_MAX_SSID_NUMBER;

function initSsidHtml(number) {
	$("[name='index']").html("");
	var ssidIndex = 0,
		i = 0;

	ssidIndex = number;
	if (curmode == 2) {
		ssidIndex--;
	}
	var dom;
	var ssidArry = [];
	ssidArry.push(ssid1, ssid2, ssid3, ssid4);
	if (ssid5) {
		ssidArry.push(ssid5, ssid6, ssid7, ssid8);
	}
	for (i = 0; i < ssidIndex; i++) {
		dom = document.createElement("option");
		dom.value = i;
		if (typeof dom.innerText != "undefined") {
			dom.innerText = decodeSSID(ssidArry[i]);
		} else { //firefox
			dom.textContent = decodeSSID(ssidArry[i]);
		}
		$("[name='index']")[0].appendChild(dom);
	}
}

function initValue(index, radio, flag) {
	var ssidIndex = document.getElementById("index").value;
	$.get("/goform/WifiClientList?r="+Math.random()+"&index=" + ssidIndex + "&wrlRadio=" + radio, function (str) {
		//ssid~C8:3A:35:CB:42:6F;192.168.0.76;80;26.0Mbps
		var datas = str.split("\n");
		var tbd = document.getElementById("list"),
			dataStr,
			i;
		if (datas.length < 2) {
			$("#list tr").remove();
			tbd.insertRow(0);
			tbd.rows[0].insertCell(0);
			tbd.rows[0].cells[0].setAttribute("colSpan", 6);
			tbd.rows[0].cells[0].innerHTML = _("No client connected.");
		} else {
			$("#list tr").remove();
			for (i = 0; i < datas.length - 1; i++) {
				dataStr = datas[i].split("\t");
				if (dataStr.length < 4) continue;
				tbd.insertRow(i);
				tbd.rows[i].insertCell(0).innerHTML = i + 1;
				tbd.rows[i].insertCell(1).innerHTML = dataStr[0];
				tbd.rows[i].insertCell(2).innerHTML = dataStr[1] != "0.0.0.0" ? dataStr[1] : _("Unknown");
				tbd.rows[i].insertCell(3).innerHTML = timeStr(dataStr[2]);
				if (!radio) {
					tbd.rows[i].insertCell(4).innerHTML = parseInt(dataStr[3]) <= 450 ? dataStr[3] : "1Mbps";
					tbd.rows[i].insertCell(5).innerHTML = parseInt(dataStr[4]) <= 450 ? dataStr[4] : "1Mbps";
				} else {
					tbd.rows[i].insertCell(4).innerHTML = parseInt(dataStr[3]) <= 1300 ? dataStr[3] : "1Mbps";
					tbd.rows[i].insertCell(5).innerHTML = parseInt(dataStr[4]) <= 1300 ? dataStr[4] : "1Mbps";
				}
			}
		}
	});
	if (flag == 1) {
		setTimeout('initValue(' + index + ',' + radio + ',1)', 10000);
	}
}

function timeStr(t) {
	var d = parseInt(t / 86400),
		h = ("" + (100 + parseInt(t / 3600) % 24)).substr(1),
		m = ("" + (100 + parseInt(t / 60) % 60)).substr(1),
		s = ("" + (100 + t % 60)).substr(1),
		str = "";
	if (d > 0) {
		str = d + _("Day ") + h + _("h ") + m + _("m ") + s + _("s ");
	} else {
		str = h + _("h ") + m + _("m ") + s + _("s ");
	}
	return str;
}
/**
 * 将html标符转换为页面可显示的安全字符
 * @param  {String} str 需要转换html tag的字符串
 * @return {[type]}     转换过html tag的字符
 */
function toHtmlCode(str) {
	if (typeof str != "string") {
		return str;
	} else {
		return str ? str.replace(/[<>\"]/g, function (char) {
			switch (char) {
			case '<':
				return '&lt;'
			case '>':
				return '&gt;'
			case '"':
				return '&quot;'
			}
		}) : '';
	}
}
