/**
 * @方法 init
 * @参数 （objec）f 要初始化的表单对象
 * @描述 根据f的id来确定调用不同的初始化函数。
 */
var f;

$(function () {
	f = document.forms[0];
	var op_id = f.id;
	switch (op_id) {
	case 'system_rebooting':
		document.getElementById("head").innerHTML = tbl_head(17);
		var url = window.location.toString(),
			urlArr = url.split("?");
		if (ipMode == 0) {
			$("form table").hide();
			window.parent.reboot(rebootUrl, 600, 0, sslenable);
		} else {
			if (urlArr.length == 1) {
				$("form table").show();
			} else if (urlArr[1] == "reboot") {
				$("form table").hide();
				window.parent.reboot(rebootUrl, 600, 0, sslenable);
			} else if (urlArr[1] == "upgrade") {
				$("form table").hide();
				window.parent.reboot(rebootUrl, 700, 1, sslenable);
			}
		}
		break;
	case 'system_password':
		$("#head").html(tbl_head(14));
		$("#tail").html(tbl_tail('password'));
		$("#admin").html(parent.adminName); //"admin"
		if (userExist == 1) {
			f.userEn.checked = true;
			$("button[name=moduser]").html(_("Edit"));
			$("#user").html(userName); //"user"
		}
		$("button.moduser").on("click", function () {
			if (this.name == "modadmin") {
				f.usertype.value = "admin";
				f.operate.value = "change";
				$("#olduserInfo,#newuserInfo").removeClass("none");
				$("input[name=oldUser]").val(parent.adminName); //"admin"
			} else {
				f.usertype.value = _("user");
				if (userExist == 0) {
					f.operate.value = _("add");
					$("#olduserInfo").addClass("none");
					$("#newuserInfo").removeClass("none");
				} else {
					f.operate.value = "change";
					$("#olduserInfo,#newuserInfo").removeClass("none");
					$("input[name=oldUser]").val(userName); //"user"
				}
			}
		});
		$("button.deluser").on("click", function () {
			f.userEn.checked = false;
			f.operate.value = _("del");
			f.usertype.value = _("user");
			$("#olduserInfo,#newuserInfo").addClass("none");
		});
		break;
	case 'system_backup':
		$("#head").html(tbl_head(13));
		break;
	case 'system_hostname':
		initSystemHostname();
		break;
	case 'system_overtime':
		$("#head").html(tbl_head(11));
		$("#tail").html(tbl_tail("overtime"));
		f.overtimeTo.value = overtime;
		break;
	case 'system_upgrade':
		$("#head").html(tbl_head(10));
		$("#fireware").html(_(_("Current Firmware Version: %s; Release Date: %s"), [FirwareVerion, FirwareDate]));
		break;
	case 'system_reboot':
		$("#head").html(tbl_head(26));
		break;
	case 'system_restore':
		$("#head").html(tbl_head(13));
		break;
	case 'system_checktool':
		$("#head").html(tbl_head(15));
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
		break;
	case 'system_snmp':
		$("#head").html(tbl_head(16));
		$("#tail").html(tbl_tail("snmp"));
		initSystemSnmp();
		break;
	default:
		;
	}
});
/**
 * @方法 preSubmit
 * @参数 （objec）f 要操作的表单对象
 * @描述 根据f的id来确定调用不同的提交函数。
 */
function preSubmit() {
	var op_id = f.id;
	if (parent.userType == "user") {
		alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
		return false;
	}
	switch (op_id) {
	case 'system_restore':
		if (window.confirm(_("This device will restart automatically. The IP address will change to 192.168.0.254.") +
				_("The user name and password will change to admin. If this page is not refreshed automatically after this device restarts, update the network settings of your computer and try login again."))) {
			$.get("/goform/SysToolRestoreSet?r="+Math.random(), function () {});
			window.parent.reboot("http://192.168.0.254", 550, 0, "restore");
		}
		//f.submit();
		break;
	case 'system_reboot':
		submitSystemReboot();
		break;
	case 'system_password':
		submitSystemPassword();
		break;
	case 'system_backup':
		submitSystemBackup();
		break;
	case 'system_hostname':
		submitSystemHostname();
		break;
	case 'system_overtime':
		submitSystemOvertime();
		break;
	case 'system_upgrade':
		submitSystemUpgrade();
		break;
	case 'system_snmp':
		submitSystemSnmp();
		break;
	default:
		;
	}
}

/**
 * @方法 initSystemSnmp
 * @所属页面 system_snmp.asp
 */
function initSystemSnmp() {
	if (data["snmpEn"] == 1) {
		f.snmpEn[1].checked = true;
		$("table.myTable").find("tr:gt(1)").show();
	} else {
		f.snmpEn[0].checked = true;
		$("table.myTable").find("tr:gt(1)").hide();
	}
	if (data["snmpVer"] == 1) {
		f.snmpVer[0].checked = true;
	} else {
		f.snmpVer[1].checked = true;
	}
	f.snmpAdmin.value = data["snmpAdmin"];
	f.snmpDevice.value = decodeSSID(data["snmpDevice"]);
	f.snmpPos.value = data["snmpPos"];
	f.snmpGetcomm.value = data["snmpGetcomm"];
	f.snmpSetcomm.value = data["snmpSetcomm"];
	$("input[name='snmpEn']").change(function () {
		if (this.value == 0) {
			$("table.myTable").find("tr:gt(1)").hide();
		} else {
			$("table.myTable").find("tr:gt(1)").show();
		}
	});
}
/**
 * @方法 submitSystemSnmp
 * @所属页面 system_snmp.asp
 */
function submitSystemSnmp() {
	var checkData = function (val, str) {
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
	var rel_str = '\"';
	if (f.snmpEn[1].checked == true) {
		if (!checkData(f.snmpAdmin.value, _("Administrator"))) return;
		if (f.snmpDevice.value == "") {
			alert(_("Please enter a device name."));
			return false;
		}
		var rel_apname = /^[0-9a-zA-Z-._\u4E00-\u9FA5]+$/;

		if (f.snmpDevice.value.replace(/[\u4E00-\u9FA5]/g, "aaa").length > 32) {
			alert(_("Only a maximum of 32 characters are allowed in the device name."));
			return false
		}
		//if (!checkData(f.snmpDevice.value,_("Device Name")))	return;
		if (!checkData(f.snmpPos.value, _("Location"))) return;
		if (!checkData(f.snmpGetcomm.value, _("Read Community"))) return;
		if (!checkData(f.snmpSetcomm.value, _("Read/Write Community"))) return;
		/*
		if(f.snmpGetcomm.value != "private" && f.snmpGetcomm.value != "public") {
			alert( _("The Read Community must be private or public."));
			return false;	
		}
		if(f.snmpSetcomm.value != "private" && f.snmpSetcomm.value != "public") {
			alert( _("The Read/Write Community must be private or public."));
			return false;
		}
		if(f.snmpGetcomm.value == f.snmpSetcomm.value) {
			alert(_("The Read Community cannot be the same as the Read/Write Community."));
			return false;	
		}
		*/
	}
	f.submit();
}

/**
 * @方法 submitSystemReboot
 * @所属页面 system_reboot.asp
 * @参数 （objec）f 要操作的表单对象
 * @描述 验证数据，并向后台提交数据,页面跳转到direct_reboot.asp。
 */
function submitSystemReboot() {
	if (window.confirm(_("You will be redirected to the home page in 1 minute."))) {
		var url = "http://" + lanip;
		$.get("/goform/SysToolReboot?r="+Math.random(), function () {
			window.parent.reboot(url, 450, 0);
		});
	} else return;
}

/**
 * @方法 preSubmit
 * @所属页面 system_password.asp
 * @参数 （objec）f 要操作的表单对象
 * @描述 验证数据，并向后台提交数据。
 */
function submitSystemPassword() {
	var r = /^[\w]+$/;
	if (f.newUser.value == parent.adminName && f.usertype.value == "user") {
		alert(_("The new user name and administrator user name cannot be the same."));
		return false;
	}
	if (f.operate.value == "add" || f.operate.value == "change") {
		if (f.usertype.value == "admin" && f.oldUser.value != parent.adminName) {
			alert(_("Incorrect old user name."));
			return false;
		}
		if (f.newUser.value == "") {
			alert(_("The new user name cannot be blank."));
			return false;
		}
		if (!r.test(f.newUser.value)) {
			alert(_("Only digits, letters, and underscores are allowed in the new user name."));
			return false;
		}
		if (!r.test(f.newPwd.value) || !r.test(f.newPwd2.value)) {
			alert(_("Only digits, letters, and underscores are allowed in the new password."));
			return false;
		}
		if (f.newPwd.value != f.newPwd2.value) {
			alert(_("The confirm password must be the same as the new password."));
			return false;
		}
	}
	f.submit();
}
/**
 * @方法 UpLoadCfg
 * @所属页面 system_backup.asp
 * @描述 验证要导入的配置文件类型，如果正确导入文件
 */
function UpLoadCfg() {
	if (parent.userType == "user") {
		alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
		return;
	}
	var tmp = document.frmSetup.fileCfg.value.toLowerCase();
	var arr = tmp.split(".");
	/*	alert(arr);*/
	if (arr[0] == "") {
		alert(_("Please select a backup file."));
		return;
	} else if (arr[arr.length - 1] != "cfg") {
		alert(_("The extension of the configuration file to be imported must be .cfg."));
		return;
	}
	if (confirm(_("This device will restart after the configuration file is imported.")))
		document.frmSetup.submit();
}
/**
 * @方法名称  UpLoadCfg
 * @所属页面  system_backup.asp
 * @功能描述  导出的配置文件，并默认把他保存电脑中的我的文档文件夹里。
 */
function DownLoadCfg() {
	if (parent.userType == "user") {
		alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
		return;
	}
	if (confirm(_("Please select a path to save the exported configuration file."))) {
		refresh("/cgi-bin/DownloadCfg/APCfm.cfg");
	}
}
/**
 * @方法 init
 * @所属页面 system_hostname.asp
 * @参数 （objec）f 要初始化的表单对象
 * @描述 在html元素加载完成后运行，初始化页面元素的值。
 */
function initSystemHostname() {
	$("#head").html(tbl_head(11));
	$("#tail").html(tbl_tail('time'));
	var t = time.split("-");
	if (checkTime == 1) {
		f.check.checked = true;
	} else {
		f.check.checked = false;
	}
	f.SETPRIO.value = setPeriod;
	f.TZ.value = timeZone;
	f.year.value = t[0];
	f.month.value = t[1];
	f.day.value = t[2];
	f.hour.value = t[3];
	f.minute.value = t[4];
	f.second.value = t[5];
}

/**
 * @方法 preSubmit
 * @所属页面 system_overtime.asp
 * @参数 （objec）f 要初始化的表单对象
 * @描述 在html元素加载完成后运行，初始化页面元素的值。
 */
function submitSystemOvertime() {
	var t = Number(f.overtimeTo.value);
	f.overtimeTo.value = t
	if (isNaN(t) || +t < 1 || +t > 60) {
		if (isNaN(t)) {
			f.overtimeTo.value = "";
			alert(_("Please specify a timeout interval from 1 through 60 minutes."));
		} else {
			alert(_("Please specify a timeout interval from 1 through 60 minutes."));
		}
		return false;
	}

	f.submit();
}
/**
 * @方法 preSubmit
 * @所属页面 system_hostname.asp
 * @参数 （objec）f 要操作的表单对象
 * @描述 验证数据，并向后台提交数据。
 */
function submitSystemHostname() {
	var sy = +f.year.value,
		smo = +f.month.value,
		sd = +f.day.value,
		sh = +f.hour.value,
		smi = +f.minute.value,
		ss = +f.second.value;
	if (sy < 1970 || sy > 2037) {
		alert(_("Please specify a year from 1970 through 2037."));
		return false;
	}
	if (smo < 1 || smo > 12) {
		alert(_("Please specify a valid month."));
		return false;
	}
	if (smo == 2) { //2月
		if (sd > 28) {
			if (((sy % 4 == 0 && sy % 100 != 0) || sy % 400 == 0) && sd == 29) {} else {
				alert(_("Please specify a valid day."));
				return false;
			}
		}
	} else if (smo == 4 || smo == 6 || smo == 9 || smo == 11) { //4.6.9.11
		if (sd > 30) {
			alert(_("Please specify a valid day."));
			return false;
		}
	} else { //1.3.5.7.8.10.12
		if (sd > 31) {
			alert(_("Please specify a valid day."));
			return false;
		}
	}
	if (sh > 23 || smi > 59 || ss > 59) {
		alert(_("Please specify a valid time."));
		return false;
	}
	if (f.check.checked) {
		f.check.value = 'on';
	} else {
		f.check.value = "";
	}
	f.submit();
}

/**
 * @方法 cplocaltime
 * @所属页面 system_hostname.asp
 * @描述 获取本地时间，并填充到相应表单元素中。
 */
function cplocaltime() {
	var today = new Date();
	f.year.value = today.getFullYear().toString();
	f.month.value = today.getMonth() + 1;
	f.day.value = today.getDate();
	f.hour.value = today.getHours();
	f.minute.value = today.getMinutes();
	f.second.value = today.getSeconds();
	cfg2Form(f);
}

/**
 * @方法 systemUpgrade
 * @所属页面 system_hostname.asp
 * @参数 （objec）f 要操作的表单对象
 * @描述 验证数据，并向后台提交数据。
 */
function submitSystemUpgrade() {
	if (document.frmSetup.upgradeFile.value == "") {
		alert(_("Please select a firmware file."));
		return;
	}
	if (confirm(_('Are you sure you want to update your device?'))) {
		document.getElementById("fwsubmit").disabled = true;
		document.frmSetup.submit();
	}
}
/*system_checktool.asp*/
function diagnosis() {
	var selectcmd;
	var ipaddress = document.getElementById("ipaddress").value;
	if (ipaddress == "") {
		alert(_("Please enter an IP address."));
		return;
	}
	if (document.forms[0].selectcmd[0].checked == true) {
		selectcmd = document.forms[0].selectcmd[0].value;
	} else {
		selectcmd = document.forms[0].selectcmd[1].value;
	}
	document.frmSetup.result.value = _("Diagnosing... Please wait.");
	document.frmSetup.testbutton.disabled = true;
	$.get("/goform/CheckTools?r="+Math.random()+"&ipaddress=" + ipaddress + "&selectcmd=" + selectcmd, function () {
		var str = http_request.responseText.split(";");
		var contentType = http_request.getResponseHeader("Content-Type");
		if (contentType.match("html") == "html") {
			window.location = "login.asp";
		}
		if (str[0] == "") {
			document.frmSetup.result.value = _("Diagnosing... Please wait.");
		} else {
			document.frmSetup.result.value = str[0];
		}
		if (str[1] == 1) {
			makeRequest("/goform/CheckTools?selectcmd=" + selectcmd, "something");
		} else if (str[1] == 0) {
			document.frmSetup.testbutton.disabled = false;
		}
	});
}

function submitSystemChecktool() {
	var str = f.cmdinput.value.substring(5);
	if (!/^ping\s\S+$/.test(f.cmdinput.value)) {
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
	} else if (!checkDomainName(str)) {
		alert(_("Please enter a valid IP address."));
		return false;
	}
	$("textarea[name=result]").val("");
	$.get("/goform/exeCommand?random=" + Math.random() + "&cmdinput=" + f.cmdinput.value, function (str) {
		$("textarea[name=result]").val(str);
	})
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
