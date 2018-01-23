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
		alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
		return false;
	}
	if (f.upLinkEn.checked) {

		if (f.pingHostIp1.value == "" && f.pingHostIp2.value == "") {
			alert(_("Please enter a valid host IP address to ping."))
			return;
		}

		if (f.pingHostIp1.value != "") {
			if (!checkIp(f.pingHostIp1, _("Host 1 to Ping"))) {
				return false;
			}
		}

		if (f.pingHostIp2.value != "") {
			if (!checkIp(f.pingHostIp2, _("Host 2 to Ping"))) {
				return false;
			}
		}

		if (~~f.pingInterval.value < 10 || ~~f.pingInterval.value > 100) {
			alert(_("Please enter a valid ping interval."));

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