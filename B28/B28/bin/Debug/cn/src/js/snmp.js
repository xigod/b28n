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
        alert(_("You must log in as an administrator to make any change."));
        return false;
    }
	function checkData(val, str) {
		if (val == "") {
			alert(_("Please enter %s!", [str]));
			return false;
		}
		if (!/^\w+$/.test(val)) {
			alert(_("%s Must be alphanumeric characters or underscore!", [str]));
			return false;
		}
		return true;
	}

	var rel_str = '\"',
		f = document.forms[0];
	if (f.snmpEn[1].checked == true) {
		if (!checkData(f.snmpAdmin.value, _("Administrator Name"))) return;
		if (f.deviceName.value == "") {
			alert(_("Please enter a device name!"));
			return false;
		}
		var rel_apname = /^[0-9a-zA-Z-._\u4E00-\u9FA5]+$/;

		if (f.deviceName.value.replace(/[\u4E00-\u9FA5]/g, "aaa").length > 32) {
			alert(_("The length of device name should not be greater than 32 bits."));
			return false
		}
		//if (!checkData(f.snmpDevice.value,_("Device Name")))	return;
		if (!checkData(f.location.value, _("Location"))) return;
		if (!checkData(f.readCommunity.value, _("Read Community"))) return;
		if (!checkData(f.readWriteCommunity.value, _("Write/Read Community"))) return;

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