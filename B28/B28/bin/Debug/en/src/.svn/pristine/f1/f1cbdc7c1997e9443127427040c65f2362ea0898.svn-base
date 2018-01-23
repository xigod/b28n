var initObj = {};

function initHtml() {
	$("#head").html(tbl_head(23));
	$("#tail").html(tbl_tail("dhcpserverset"));
}

function getValue() {
	$.GetSetData.getJson("goform/getDhcpInfo", initValue);
}

function initValue(obj) {
	initObj = obj;
	inputValue(obj);
}

function preSubmit() {
    if (parent.userType == "user") {
        alert(_("You must log in as an administrator to make any change."));
        return false;
    }
	var ipe = $("#dhcpEndIp").val().split("."),
		ips = $("#dhcpStartIp").val().split("."),
		masks = $("#dhcpMask").val().split("."),
		lanIps = initObj.lanIp.split("."),
		lanMasks = initObj.lanMask.split("."),
		i = 0,
		f = document.forms[0];
	if (!checkIp(f.dhcpStartIp, _("Start IP"))) {
		return;
	}
	if (!checkIp(f.dhcpEndIp, _("End IP Address"))) return;


	if ($("#dhcpMask").val() == "255.255.255.255") {
		alert(_("Subnet mask cannot be 255.255.255.255!"));
		return false;
	}
	if (!checkMask(f.dhcpMask)) {
		return false;
	}
	if (!checkIp(f.dhcpGw, _("Gateway"))) {
		return false;
	}

	var tmp = lanMasks[0] * Math.pow(2, 24) + lanMasks[1] * Math.pow(2, 16) + lanMasks[2] * Math.pow(2, 8) + (+lanMasks[3]),
		tmpt = masks[0] * Math.pow(2, 24) + masks[1] * Math.pow(2, 16) + masks[2] * Math.pow(2, 8) + (+masks[3]);
	for (i = 0; i < 4; i++) {

		if (tmp - tmpt > 0) {
			alert(_("The Subnet mask must large or equal than LAN IP's Subnet mask!"));
			return false;
		}
	}

	for (i = 0; i < 4; i++) {
		if ((ips[i] & masks[i]) != (lanIps[i] & masks[i])) {
			alert(_("The start IP and LAN IP should be in the same network segment!"));
			return false;
		}
	}
	for (i = 0; i < 4; i++) {
		if ((ipe[i] & masks[i]) != (lanIps[i] & masks[i])) {
			alert(_("The end IP and  LAN IP should be in the same network segment!"));
			return false;
		}
	}
	if (!checkMulticastIp($("#dhcpStartIp").val(), $("#dhcpMask").val())) {
		alert(_("The start IP address you entered is a broadcast IP address. Please specify a valid start IP address!"));
		return false;
	}
	if (!checkVerifyIp($("#dhcpStartIp").val(), $("#dhcpMask").val())) {
		alert(_("Please specify a valid start IP address!"));
		return false;
	}

	if (!checkMulticastIp($("#dhcpEndIp").val(), $("#dhcpMask").val())) {
		alert(_("The end IP address you entered is a broadcast IP address. Please specify a valid end IP address!"));
		return false;
	}
	if (!checkVerifyIp($("#dhcpEndIp").val(), $("#dhcpMask").val())) {
		alert(_("Please specify a valid end IP address!"));
		return false;
	}

	if (!checkVerifyIp($("#dhcpGw").val(), $("#dhcpMask").val())) {
		alert(_("Please specify a valid gateway IP address!"));
		return false;
	}
	if (!checkIpInSameSegment(initObj.lanIp, initObj.lanMask, $("#dhcpGw").val(), $("#dhcpMask").val())) {
		alert(_("LAN IP address should be on the same subnet as gateway!"));
		return false;
	}
	if (!checkMulticastIp($("#dhcpGw").val(), $("#dhcpMask").val())) {
		alert(_("The gateway IP address you entered is a broadcast IP address. Please specify a valid gateway IP address!"));
		return false;
	}
	if (!checkIp(f.dhcpDns1, _("Primary DNS Server"))) {
		//alert(_("Please specify a valid primary DNS server address!"));
		return false;
	}
	if (!verifyIP0(f.dhcpDns2, _("Secondary DNS Server"))) {
		//alert(_("Please specify a valid secondary DNS server address!"));
		return false;
	}
	if (!checkDNSisSame($("#dhcpDns1").val(), $("#dhcpDns2").val())) {
		$("#dns2").focus();
		return false;
	}
	var tmp = ips[0] * Math.pow(2, 24) + ips[1] * Math.pow(2, 16) + ips[2] * Math.pow(2, 8) + (+ips[3]),
		tmpt = ipe[0] * Math.pow(2, 24) + ipe[1] * Math.pow(2, 16) + ipe[2] * Math.pow(2, 8) + (+ipe[3]);
	if (tmp > tmpt) {
		alert(_("The start IP address should be smaller than the end IP address!"));
		return false;
	}

	submitData("goform/setDhcpInfo");
	//setDhcpInfo
}

function init() {
	initHtml();
	getValue();
}
window.onload = function () {
	init();
}