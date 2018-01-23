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
        alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
        return false;
    }
	var ipe = $("#dhcpEndIp").val().split("."),
		ips = $("#dhcpStartIp").val().split("."),
		masks = $("#dhcpMask").val().split("."),
		lanIps = initObj.lanIp.split("."),
		lanMasks = initObj.lanMask.split("."),
		i = 0,
		f = document.forms[0];
	if (!checkIp(f.dhcpStartIp, _("Start IP Address"))) {
		return;
	}
	if (!checkIp(f.dhcpEndIp, _("End IP Address"))) return;


	if ($("#dhcpMask").val() == "255.255.255.255") {
		alert(_("The subnet mask cannot be 255.255.255.255."));
		return false;
	}
	if (!checkMask(f.dhcpMask)) {
		return false;
	}
	if (!checkIp(f.dhcpGw, _("Default Gateway"))) {
		return false;
	}

	var tmp = lanMasks[0] * Math.pow(2, 24) + lanMasks[1] * Math.pow(2, 16) + lanMasks[2] * Math.pow(2, 8) + (+lanMasks[3]),
		tmpt = masks[0] * Math.pow(2, 24) + masks[1] * Math.pow(2, 16) + masks[2] * Math.pow(2, 8) + (+masks[3]);
	for (i = 0; i < 4; i++) {

		if (tmp - tmpt > 0) {
			alert(_("The network ID bits of this subnet mask must be equal to or longer than the network ID bits in the LAN port subnet mask."));
			return false;
		}
	}

	for (i = 0; i < 4; i++) {
		if ((ips[i] & masks[i]) != (lanIps[i] & masks[i])) {
			alert(_("The start IP address must belong to the same network segment as the LAN IP address of this device."));
			return false;
		}
	}
	for (i = 0; i < 4; i++) {
		if ((ipe[i] & masks[i]) != (lanIps[i] & masks[i])) {
			alert(_("The end IP address must belong to the same network segment as the LAN IP address of this device."));
			return false;
		}
	}
	if (!checkMulticastIp($("#dhcpStartIp").val(), $("#dhcpMask").val())) {
		alert(_("The start IP address cannot be a broadcast IP address."));
		return false;
	}
	if (!checkVerifyIp($("#dhcpStartIp").val(), $("#dhcpMask").val())) {
		alert(_("The host field of the start IP address cannot be 0."));
		return false;
	}

	if (!checkMulticastIp($("#dhcpEndIp").val(), $("#dhcpMask").val())) {
		alert(_("The end IP address cannot be a broadcast IP address."));
		return false;
	}
	if (!checkVerifyIp($("#dhcpEndIp").val(), $("#dhcpMask").val())) {
		alert(_("The host field of the end IP address cannot be 0."));
		return false;
	}

	if (!checkVerifyIp($("#dhcpGw").val(), $("#dhcpMask").val())) {
		alert(_("The host field of the default gateway IP address cannot be 0."));
		return false;
	}
	if (!checkIpInSameSegment(initObj.lanIp, initObj.lanMask, $("#dhcpGw").val(), $("#dhcpMask").val())) {
		alert(_("The IP address must belong to the same network segment as that of the default gateway."));
		return false;
	}
	if (!checkMulticastIp($("#dhcpGw").val(), $("#dhcpMask").val())) {
		alert(_("The default gateway IP address cannot be a broadcast IP address."));
		return false;
	}
	if (!checkIp(f.dhcpDns1, _("Primary DNS Server"))) {
		//alert(_("Incorrect primary DNS server address."));
		return false;
	}
	if (!verifyIP0(f.dhcpDns2, _("Secondary DNS Server"))) {
		//alert(_("Incorrect secondary DNS server address."));
		return false;
	}
	if (!checkDNSisSame($("#dhcpDns1").val(), $("#dhcpDns2").val())) {
		$("#dns2").focus();
		return false;
	}
	var tmp = ips[0] * Math.pow(2, 24) + ips[1] * Math.pow(2, 16) + ips[2] * Math.pow(2, 8) + (+ips[3]),
		tmpt = ipe[0] * Math.pow(2, 24) + ipe[1] * Math.pow(2, 16) + ipe[2] * Math.pow(2, 8) + (+ipe[3]);
	if (tmp > tmpt) {
		alert(_("The start IP address cannot be greater than the end IP address."));
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