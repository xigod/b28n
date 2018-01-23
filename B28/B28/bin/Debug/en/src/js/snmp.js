function initHtml() {
	$("#head").html(tbl_head(16));
	$("#tail").html(tbl_tail("snmp"));
}

function initEvent() {
	$("[name=snmpEn]").on('change', function () {
		if (this.value == "false") {
			$("#snmpWrap").addClass("none");
		} else {
			$("#snmpWrap").removeClass("none");
		}
	});
}

function getValue() {
	$.GetSetData.getJson("goform/getSnmpInfo", initValue);
}

function initValue(obj) {
	inputValue(obj);

	if (obj.snmpEn == "false") {
		$("#snmpWrap").addClass("none");
	} else {
		$("#snmpWrap").removeClass("none");
	}

}

function preSubmit() {
    if (parent.userType == "user") {
        alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
        return false;
    }
	function checkData(val, str) {
		if (val == "") {
			alert(_(_("Please enter %s."), [str]));
			return false;
		}
		if (!/^\w+$/.test(val)) {
			alert(_(_("Only digits, letters, and underscores are allowed in %s."), [str]));
			return false;
		}
		return true;
	}

	var rel_str = '\"',
		f = document.forms[0];
	if (f.snmpEn[1].checked == true) {
		if (!checkData(f.snmpAdmin.value, _("Administrator"))) return;
		if (f.deviceName.value == "") {
			alert(_("Please enter a device name."));
			return false;
		}
		var rel_apname = /^[0-9a-zA-Z-._\u4E00-\u9FA5]+$/;

		if (f.deviceName.value.replace(/[\u4E00-\u9FA5]/g, "aaa").length > 32) {
			alert(_("Only a maximum of 32 characters are allowed in the device name."));
			return false
		}
		//if (!checkData(f.snmpDevice.value,_("Device Name")))	return;
		if (!checkData(f.location.value, _("Location"))) return;
		if (!checkData(f.readCommunity.value, _("Read Community"))) return;
		if (!checkData(f.readWriteCommunity.value, _("Read/Write Community"))) return;

	}
	submitData("goform/setSnmpInfo");
}

function init() {
	initHtml();
	initEvent();
	getValue();
}
window.onload = function () {
	init();
}