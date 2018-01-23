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
		document.frmSetup.ledStatus.value = _("Disable all LEDs");
	}
}

function clickLed() {
	if (parent.userType == "user") {
		alert(_("You must log in as an administrator to make any change."));
		return false;
	}
	if (document.frmSetup.ledStatus.value == _("Disable all LEDs")) {
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