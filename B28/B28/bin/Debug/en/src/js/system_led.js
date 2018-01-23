var ledData;

function initHtml() {
	$("#head").html(tbl_head(25));
}

function initEvent() {
	$("input[name=ledStatus]").on("click", clickLed);
}

function getValue() {
	$.GetSetData.getJson("goform/getLedInfo", initValue);
}

function initValue(res) {
	ledData = res || {};

	if (ledData.ledType == "open") {
		document.frmSetup.ledStatus.value = _("Disable All LEDs");
	}
}

function clickLed() {
	if (parent.userType == "user") {
		alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
		return false;
	}
	if (document.frmSetup.ledStatus.value == _("Disable All LEDs")) {
		document.frmSetup.action.value = "close";
	} else {
		document.frmSetup.action.value = "open";
	}
	submitData("goform/setLedInfo");
}

function init() {
	initHtml();
	initEvent();
	getValue();
}

window.onload = function () {
	init();
}