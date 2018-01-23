var f = document.frmSetup;
var strregex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
    + "(([0-9]{1,3}.){3}[0-9]{1,3}" // ip形式的url- 199.194.52.184
    + "|" // 允许ip和domain（域名）
    + "([0-9a-z_!~*'()-]+.)*" // 域名- www.
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // 端口- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
var re = new RegExp(strregex);

function initHtml() {
	$("#head").html(tbl_head(15));
}

function initEvent() {
	$("#ipaddress").keydown(function (e) {
		if (e.keyCode == 13 || e.which == 13) {
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			submitSystemChecktool();
		}
	});

	$("input[name=pingbutton]").click(submitSystemChecktool);
}


function submitSystemChecktool() {
    if (parent.userType == "user") {
        alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
        return;
    }
	var content = $("#ipaddress").val(),
		str = content.substring(5),
		contentObj = {
			"cmd": content
		};

	if (!/^ping\s\S+$/.test(content)) {
		alert(_("Please enter a valid value."));
		return false;
	}

	if (/^[\d.]+$/.test(str)) {
		if (str.split(".").length != 4 || +str.split(".")[0] == 0 || str.split(".")[1] == "" ||
			str.split(".")[2] == "" || str.split(".")[3] == "") {
			alert(_("Please enter a valid IP address."));
			return false;
		}
	}

	if (/^[0-9.]{1,}$/.test(str)) {
		if (!checkIp_(str, _("IP Address"))) {
			return false;
		}
	} else if (!re.test(str) || /["\\]/.test(str)) {
        alert(_("Please enter a valid IP address."));
        return false;
    }

	$("textarea[name=result]").val("");
	f.cmd.value = content;
	submitData("goform/setDiagnoseInfo", function (data) {
		$("textarea[name=result]").val(data.msg);
	});
}

//判断域名是否输入正确
function checkDomainName(nname) {
	var msg = 1;
	if (nname != null && nname.length > 0) {
		var i, j;
		var labels = nname.split('.');
		var ipv6label = nname.split(':');
		var count1 = 0;
		var count2 = 0;
		var count3 = 0;
		var count4 = 0;

		if (labels.length < 2 || !(labels[labels.length - 1])) {
			msg = 0;
			return msg;
		}
		for (count1 = 0; count1 < labels.length; count1++) {
			if (labels[count1] == "") {
				count2++;
			} else {
				count3++;
			}
		}
		if (count2 >= count3) {
			msg = 0;
			return msg;
		}

		for (count4 = 0; count4 < nname.length - 1; count4++) {
			if (nname[count4] == '.') {
				if (nname[count4 + 1] == '.') {
					msg = 0;
					return msg;
				}
			}
		}
		if (ipv6label.length > 1) {
			msg = 0;
			return msg;
		}
		if (nname.length > 253) {
			msg = 0;
			return msg;
		}

		for (i = 0; i < labels.length; i++) {
			if (labels[i].length > 63) {
				msg = 0;
				return msg;
			}

			for (j = 0; j < labels[i].length; j++) {
				var dh = labels[i].charAt(j);
				var hh = dh.charCodeAt(0);
				if ((hh > 47 && hh < 59) || (hh > 64 && hh < 91) || (hh > 96 && hh < 123) || hh == 45 || hh == 46) {
					if ((j == 0 || j == labels[i].length - 1) && hh == 45) {
						msg = 0;
						return msg;
					}
				} else {
					msg = 0;
					return msg;
				}
			}
		}
	} else {
		msg = 0;
	}
	return msg;
}

function checkIp_(ipa, str) {

	var tip = /^([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/,
		ip = ipa.split(".");
	if (ipa == "") {
		alert(_(_("Please enter %s."), [str]));
		return false;
	}
	if (!tip.test(ipa)) {
		alert(_(_("Incorrect %s."), [str]));
		return false;
	}
	if (ip[0] >= 224) {
		alert(_(_("Incorrect %s."), [str]));
		return false;
	}
	return true;
}

function init() {
	initHtml();
	initEvent();
}

window.onload = function () {
	init();
}