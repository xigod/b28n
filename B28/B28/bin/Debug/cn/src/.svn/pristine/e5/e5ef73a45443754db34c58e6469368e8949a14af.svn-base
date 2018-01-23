var f = document.forms[0],
	linkEn,
	pingIp1,
	pingIp2,
	intervalTime;

function initHtml() {
	$("#head").html(tbl_head(29));
	$("#tail").html(tbl_tail("uplink"));
}


function getValue() {
	$.GetSetData.getJson("goform/getUplinkInfo", initValue);
}

function initValue(res) {
	var data = res || {};
	inputValue(data);
}


function preSubmit() {
	if (parent.userType == "user") {
		alert(_("You must log in as an administrator to make any change."));
		return false;
	}
	if (f.upLinkEn.checked) {

		if (f.pingHostIp1.value == "" && f.pingHostIp2.value == "") {
			alert(_("Please input a valid Ping IP address!"))
			return;
		}

		if (f.pingHostIp1.value != "") {
			if (!checkIp(f.pingHostIp1, _("Ping Host1"))) {
				return false;
			}
		}

		if (f.pingHostIp2.value != "") {
			if (!checkIp(f.pingHostIp2, _("Ping Host2"))) {
				return false;
			}
		}

		if (~~f.pingInterval.value < 10 || ~~f.pingInterval.value > 100) {
			alert(_("Please input a valid Ping interval!"));

			return false;
		}

	}

	submitData("goform/setUplinkInfo");
}

function init() {
	initHtml();
	getValue();
}

window.onload = function () {
	init();
}