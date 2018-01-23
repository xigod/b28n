function onChangeSec() {
	var idx = document.forms[0].elements["secType"].selectedIndex,
		wepidx = document.forms[0].wepSecOpt.selectedIndex;
	var bodyId = document.body.id;
	document.getElementById("wpaPasswd").className = "";
	$("#wepAuth").addClass("none");
	if (idx == 0) {
		$("#div_wep,#div_wpa,#div_802").addClass("none");
	} else if (idx == 1) {
		$("#wepAuth").removeClass("none");
		if (wepidx == 0 || wepidx == 1) {
			$("#div_wep").removeClass("none");
			$("#div_wpa,#div_802").addClass("none");
		} else {
			$("#div_802").removeClass("none");
			$("#div_wpa,#div_wep").addClass("none");
		}
	} else if (idx == 2 || idx == 3 || idx == 4) {
		$("#div_wpa").removeClass("none");
		$("#div_wep,#div_802").addClass("none");
		if (bodyId == "basic") {
			f.keyPeriod.value = wpa_psk_key_time;
		}
		if (idx == 2) {
			f.cipher[2].disabled = true;
			if (f.cipher[2].checked) {
				f.cipher[2].checked = false;
				f.cipher[0].checked = true;
			}
		} else {
			f.cipher[2].disabled = false;
		}
	} else {
		$("#div_802,#div_wpa").removeClass("none");
		$("#div_wep,#wpaPasswd").addClass("none");
		if (bodyId == "basic") {
			f.keyPeriod.value = wpa_key_time;
		}
	}
	$("select[name=wepSecOpt]").change(function () {
		if (this.selectedIndex == 2) {
			$("#div_wep").addClass("none");
			$("#div_802").removeClass("none");
		} else {
			$("#div_wep").removeClass("none");
			$("#div_802").addClass("none");
		}
	});
}


function  checkSsid() {
	var re = /^[^\\]+$/, //[^\<\>,;"%&]
		sid = f.ssid.value,
		num = sid.match(/([\u4E00-\u9FA5])/g);
	if (sid == "") {
		alert(_("Please enter SSID!"));
		return false;
	}
	if (!re.test(sid)) {
		alert(_("SSID includes invalid characters: %s", ["\\"]));
		return false;
	}
	if (num && (sid.length + num.length * 2) > 32) {
		alert(_("SSID can only include up to 32 characters!"));
		return false;
	}
	return true;
}

function checkSec() {
	var securitymode = f.secType.value,
		keyvalue;
	if (securitymode == "1" && f.wepSecOpt.value != "802.1x") {
		var defaultid = f.wep_default_key.value,
			keylength;
		keyvalue = f["wep" + defaultid].value;
		if (keyvalue.length == 0) {
			alert(_('Please enter the WEP key %s', [defaultid]));
			return false;
		}
		for (var i = 1; i < 5; i++) {
			keylength = f["wep" + i].value.length;
			if (keylength != 0) {
				if (f["WEP" + i + "Select"].options.selectedIndex == 0) {
					if (keylength != 5 && keylength != 13 || !/^[\x00-\xff]+$/.test(f["wep" + i].value)) {
						alert(_('WEP key %s is invalid! Please enter 5 or 13 ASCII characters!', [i]));
						return false;
					}
				} else {
					if (keylength != 10 && keylength != 26 || !/^[0-9a-fA-F]+$/.test(f["wep" + i].value)) {
						alert(_('WEP key %s is invalid! Please enter 10 or 26 Hex characters.', [i]));
						return false;
					}
				}
				if (f["wep" + i].value.indexOf("\\") != -1) {
					alert(_("Invalid WEP security key %s. %s can't be included.", [i, "\\"]));
					return false;
				}
			}
		}

	} else if ((securitymode == "1" && f.wepSecOpt.value == "802.1x") || securitymode == "5" || securitymode == "6") {
		var x;
		if (!checkIp(f.radius_svrip, _("RADIUS Server IP"))) {
			return false;
		}
		x = Number(f.radius_port.value);
		f.radius_port.value = x;
		if (isNaN(f.radius_port.value) || f.radius_port.value < 1025 || f.radius_port.value > 65535 || !/^[1-9]\d*$/.test(f.radius_port.value)) {
			f.radius_port.value = '';
			alert(_("Please enter valid RADIUS port number!"));
			return false;
		}
		if (!/^[\x00-\xff]{1,64}$/.test(f.radius_pass.value)) {
			alert(_("Please enter valid RADIUS Password!"));
			return false;
		}
	} else if (securitymode == "2" || securitymode == "3" || securitymode == "4") {
		keyvalue = f.passphrase.value;
		if (!(/^[\x00-\x7f]{8,63}$/i.test(keyvalue) || /^[0-9a-f]{64}$/i.test(keyvalue))) {
			alert(_('Please enter 8-64 Hex characters or 8-63 ASCII characters.'));
			return false;
		}
		if (keyvalue.indexOf("\\") != -1) {
			alert(_("Invalid security key. %s can't be included.", ["\\"]));
			return false;
		}
	}
	return true;
}

function checkRssiData(obj, str, s, e) {
	if (obj.value == "") {
		alert(_("Please enter %s!", [str]));
		return false;
	}
	if ((+obj.value) < s || (+obj.value) > e || !/^[-0-9]\d*$/.test(obj.value)) {
		alert(_("%s is invalid %s range: %s ~ %s.They must be round numbers!", [str, str, s, e]));
		return false;
	}
	return true;
}

function checkData(obj, str, s, e) {
	if (obj.value == "") {
		alert(_("Please enter %s!", [str]));
		return false;
	}
	if (isNaN(obj.value) || obj.value < s || obj.value > e || !/^[1-9]\d*$/.test(obj.value)) {
		alert(_("%s is invalid %s range: %s ~ %s.They must be round numbers!", [str, str, s, e]));
		return false;
	}
	return true;
}
