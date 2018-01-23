var f = document.forms[0];

function initHtml() {
	$("#head").html(tbl_head(11));
	$("#tail").html(tbl_tail("overtime"));
}

function getValue() {
	$.GetSetData.getJson("goform/getWebTimeout", initValue);
}

function initValue(obj) {
	inputValue(obj)
}

function preSubmit() {
    if (parent.userType == "user") {
        alert(_("You must log in as an administrator to make any change."));
        return false;
    }
	var t = Number(f.timeoutTime.value);
	f.timeoutTime.value = t;
	if (isNaN(t) || +t < 1 || +t > 60) {
		if (isNaN(t)) {
			f.timeoutTime.value = "";
			alert(_("Please specify a valid timeout value between 1-60 minutes!"));
		} else {
			alert(_("Please specify a valid timeout value between 1-60 minutes!"));
		}
		return false;
	}

	submitData("goform/setWebTimeout");
}

function init() {
	initHtml();
	getValue();
}
window.onload = function () {
	init();
}