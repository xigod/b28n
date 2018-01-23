var ssidValue;

function initHtml() {
	$("#head").html(tbl_head(8));
	$("#tail").html(tbl_tail("wl_filter"));
}

function initEvent() {
	$("#filterMode").on("change", function () {
		if (this.value == "disabled") {
			$("#filterTab").addClass("none");
		} else {
			$("#filterTab").removeClass("none");
		}
	});

	$("#ssidIndex").on("change", function () {
		getValue(this.value);
	})

	$("#add").on("click", addMac);

	$("input:text[name^=mac]").keyup(function (e) {
		var ind = this.name.match("\d")[0];
		if (e.keyCode == 8 && this.value == "") {
			if (ind - 1 > 0) {
				if (f["mac" + (ind - 1)].createTextRange) {
					var range = f["mac" + (ind - 1)].createTextRange(),
						pos = f["mac" + (ind - 1)].value.length;
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				} else {
					f["mac" + (ind - 1)].focus();
				}
			}
		}
		this.value = this.value.replace(/[^0-9a-fA-F]/g, '')
		if (this.value.length == 2) {
			$(this).next("input").focus();
		}
	});
}

function getValue(ssidIndex) {
	ssidValue = ssidIndex;
	$.GetSetData.getJson("goform/getWrlAccessList?radio=" + top.RADIO + "&ssidIndex=" + ssidIndex, initValue);
}

function createSsid(ssidList) {
	var len = ssidList.length,
		i = 0,
		str = "";
	$("#ssidIndex").html('');
	for (i = 0; i < len; i++) {
		str = "<option value='" + i + "'></option>";
		$("#ssidIndex").append(str);
		$("#ssidIndex option").eq(i).text(decodeURIComponent(decodeSSID(ssidList[i])));
	}

	$("#ssidIndex").val(ssidValue);
}

function createClientTable(clients) {
	var i = 0,
		str = "",
		len = clients.length;

	$("#clientList").html('');
	if (len == 0) {
		str = "<tr><td colspan=5>" + _("No client connected.") + "</td></tr>";
		$("#clientList").html(str);
	} else {
		for (i = 0; i < len; i++) {
			str = "<tr><td>" + (i + 1) + "</td>";
			str += "<td>" + clients[i].mac + "</td>";
			str += "<td>" + (clients[i].ip != "0.0.0.0" ? clients[i].ip : _("Unknown")) + "</td>";
			str += "<td>" + timeStr(clients[i].connectTime) + "</td>";
			str += "<td>" + '<input type="button" class="addMac button" value="' + _("Add") + '">' + "</td>";
			$("#clientList").append(str);
		}

		$("input.addMac").on("click", function () {
			var add_mac = this.parentNode.parentNode.childNodes[1].innerHTML;
			if (f.filterMode.selectedIndex == 0) {
				alert(_("Please select a filter mode."));
				return;
			}
			if (flist.length > 15) {
				window.alert(_("Only a maximum of 16 MAC address entries are allowed."));
				return;
			}
			for (var i = 0; i < flist.length; i++) {
				if (flist[i].mac.toUpperCase() == add_mac) {
					window.alert(_("The MAC address exists."));
					return;
				}
			}
			flist.push({
				mac: add_mac,
				enable: "true"
			});
			showList();
		});
	}

}

function crateManualMac(macs) {
	var i = 0,
		len = macs.length,
		str = "";
	if (len === 0) {
		$("#filterTab").addClass("none");
	} else {
		if ($("#filterMode").val() == "disabled") {
			$("#filterTab").addClass("none");
		} else {
			$("#filterTab").removeClass("none");
		}
	}
	showList();
}

function initValue(obj) {
	createSsid(obj.ssidList);
	createClientTable(obj.wrlClientList);
	flist = obj.macList;
	crateManualMac(obj.macList);
	f.filterMode.value = obj.filterMode;
	if ($("#filterMode").val() == "disabled") {
		$("#filterTab").addClass("none");
	} else {
		$("#filterTab").removeClass("none");
	}
}

function addMac() {
	var add_mac = (f.mac1.value + ":" + f.mac2.value + ":" + f.mac3.value + ":" +
		f.mac4.value + ":" + f.mac5.value + ":" + f.mac6.value).toUpperCase();
	if (!checkMAC(add_mac)) {
		return false;
	}
	if (flist.length > 15) {
		window.alert(_("Only a maximum of 16 MAC address entries are allowed."));
		return;
	}
	for (var i = 0; i < flist.length; i++) {
		if (flist[i].mac.toUpperCase() == add_mac) {
			window.alert(_("The MAC address exists."));
			return;
		}
	}
	flist.push({
		mac: add_mac,
		enable: "true"
	});
	showList();
}

function showList() {
	var s = '<table border=1 class="w640 tc" id="listTab">';
	for (var i = 0; i < flist.length; i++) {
		s += '<tr><td width="10%" data-val="' + flist[i].enable + '">' + (i + 1) + '</td><td width="50%">' +
			flist[i].mac + '</td><td width="15%"><input type="checkbox" id="check' + i + '"' + (flist[i].enable == "false" ? "" : "checked") + '>&nbsp;' + _("Enable") + '</td>' +
			'<td><input type="button" class="button" value="' + _("Delete") + '" id="macAddr' + i + '"></td></tr>';
	}
	s += '</table>';
	document.getElementById("list").innerHTML = s;
	$(":button[id^=macAddr]").click(function () {
		if (confirm(_('Are you sure you want to delete this entry?'))) {
			var index = this.id.match(/\d+$/)[0];
			document.getElementById("listTab").deleteRow(index);
			flist.splice(index, 1);
			showList();
		}
	});
	$(":checkbox[id^=check]").click(function () {
		var temp = $(this).closest("tr").find("td:first"),
			inde = this.id.match(/\d+$/)[0];
		if (this.checked == true) {
			temp.attr("data-val", "true");
			flist[inde].enable = "true";
		} else {
			temp.attr("data-val", "false");
			flist[inde].enable = "false";
		}
	});
}

function checkSubmitData() {
	var i = 0,
		len = flist.length,
		listIndex = 0,
		macListStr = "";
	if (f.filterMode.selectedIndex == 1) {
		if (flist.length == 0) {
			alert(_("You must configure and enable at least one rule if MAC Address Filter Mode is set to Allow."));
			return false;
		}
		for (i = 0; i < len; i++) {
			if (flist[i].enable == "true") {
				listIndex++;
			}
		}
		if (listIndex == 0) {
			alert(_("You must configure and enable at least one rule if MAC Address Filter Mode is set to Allow."));
			return false;
		}
	}
	macListStr = "";
	for (i = 0; i < len; i++) {
		macListStr += flist[i].mac + ";" + flist[i].enable + "\n";
	}
	macListStr = macListStr.replace(/(\n)$/, '');
	$("#macList").val(macListStr);
	return true;
}

function preSubmit() {
    if (parent.userType == "user") {
        alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
        return false;
    }
	if (checkSubmitData()) {
		submitData("goform/setWrlAccessList");
	}
}

function init() {
	initHtml();
	initEvent();
	getValue(0);
}

var flist, f = document.forms[0];
window.onload = function () {
	init();
}