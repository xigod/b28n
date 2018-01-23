// JavaScript Document

var initObj = {},
	f = document.forms[0];

function initHtml() {
	$("#head").html(tbl_head(4));
	$("#tail").html(tbl_tail("lan"));
}

function initEvent() {
	$("select[name=lanMode]").on("change", modeChange);
    $("#continu-lan").on("click", function() {
        top.location.href = "http://" + f.lanIp.value;
    });
}

function getValue() {
	$.GetSetData.getJson("goform/getLanInfo", initValue);
}

function initValue(obj) {
	inputValue(obj);
	initObj = obj;
	modeChange();
}

function modeChange() {
	if (f.lanMode.value == "dhcp") {
		$("#ipAddr,#subnet,#gateWay,#lan_dns1,#lan_dns2").addClass("none");
	} else {
		$("#ipAddr,#subnet,#gateWay,#lan_dns1,#lan_dns2").removeClass("none");
	}
}

function preSubmit() {
	var f = document.forms[0],
		lanMode = $("#lanMode").val(),
		lanIp = $("#lanIp").val(),
		lanMask = $("#lanMask").val(),
		lanGw = $("#lanGw").val(),
		lanDns1 = $("#lanDns1").val(),
		lanDns2 = $("#lanDns2").val();
	if (parent.userType == "user") {
		alert(_("You must log in as an administrator to make any change."));
		return false;
	}

	if (initObj.lanMode == lanMode && initObj.lanIp == lanIp && initObj.lanMask == lanMask && initObj.lanGw == lanGw && lanDns1 == initObj.lanDns1 && lanDns2 == initObj.lanDns2 && initObj.ethMode == f.ethMode.value) {

		if (initObj.apName == f.apName.value) {
			alert(_("You have already saved the settings. No need to do it again."));
			return false;
		} else {
			f.reboot.value = "0";
		}
	}
	if (lanMode == "static") { //静态IP	
		if (!checkIp(f.lanIp, _("IP Address"))) {
			return false;
		}
		f.lanMask.value = lanMask.replace(/\d+/g, function (s) {
			return +s;
		});
		if (!checkMask(f.lanMask)) {
			return false;
		}
		if (lanMask == "255.255.255.255") {
			alert(_("Subnet mask cannot be 255.255.255.255!"));
			return false;
		}

		if (!checkIp(f.lanGw, _("ISP Gateway"))) {
			return;
		}
		if (!checkMulticastIp(lanGw, lanMask)) {
			alert(_("Please specify a valid gateway IP address!"));
			return false;
		}
		if (!checkVerifyIp(lanIp, lanMask)) {
			alert(_("Please specify a valid IP address!"));
			return false;
		}
		if (!checkMulticastIp(f.lanIp.value, lanMask)) {
			alert(_("The gateway IP address you entered is a broadcast IP address. Please specify a valid gateway IP address!"));
			return false;
		}
		if (lanIp.split(".")[3] == "255") {
			alert(_("Please input a valid IP address!"));
			return false;
		}

		var oldmsk = initObj.lanMask.split("."),
			checklanip = lanIp.split("."),
			checkgwip = lanGw.split("."),
			checkmask = lanMask.split("."),
			oldmskvalue = (((((oldmsk[0] * 256) + oldmsk[1]) * 256) + oldmsk[2]) * 256) + oldmsk[3],
			newmskvalue = (((((checkmask[0] * 256) + checkmask[1]) * 256) + checkmask[2]) * 256) + checkmask[3];
		if (newmskvalue > oldmskvalue) {
			if (!confirm(_('The new subnet mask is smaller than the old one, which may affect other functionalities. Are you sure you want to save the change?'))) {
				return false;
			}
		}
		if (lanIp == lanGw) {
			alert(_("LAN IP address should not be the same as that of gateway!"));
			return false;
		}

		for (var i = 0; i < 4; i++) {
			if ((checklanip[i] & checkmask[i]) != (checkgwip[i] & checkmask[i])) {
				alert(_("LAN IP address should be on the same subnet as gateway!"));
				return false;
			}
		}
		if (initObj.lanIp != lanIp) {
			alert(_('If you change this LAN IP address, you must use the new one to re-log on to this utility. Are you sure you want to continue?'))
		}

		if (!checkIp(f.lanDns1, _("Primary DNS Server"))) {
			//alert(_("Please specify a valid primary DNS server address!"));
			return false;
		}
		if (!verifyIP0(f.lanDns2, _("Secondary DNS Server"))) {
			//alert(_("Please specify a valid secondary DNS server address!"));
			return false;
		}
		if (!checkDNSisSame(lanDns1, lanDns2)) {
			$("#dns2").focus();
			return false;
		}
		if (f.apName.value == "") {
			alert(_("Please enter a valid Device Name!"));
			return false;
		}

	}
	if (f.apName.value == "") {
		alert(_("Please enter a valid Device Name!"));
		return false;
	}

	var rel_apname = /^[0-9a-zA-Z-._\u4E00-\u9FA5]+$/;

	if (f.apName.value.replace(/[\u4E00-\u9FA5]/g, "aaa").length > 32) {
		alert(_("The length of device name should not be greater than 32 bits."));
		return false
	}
	submitData("goform/setLanInfo", function (str) {
		if (str == 0) {
            $(".divbody").addClass("none");
            $("#lan-wait").removeClass("none");
        } else if (str == 1) {
            window.location.reload(true);
        } else {
            top.location.href = "http://" + f.ip.value;
        }
	});
}

function init() {
	initHtml();
	initEvent();
	getValue();
}

window.onload = function () {
	init();
}
