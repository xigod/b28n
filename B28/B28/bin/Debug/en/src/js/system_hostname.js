var f = document.forms[0];

function initHtml() {
	$("#head").html(tbl_head(11));
	$("#tail").html(tbl_tail('time'));
}

function getValue() {
	$.GetSetData.getJson("goform/getSysTimeInfo?radio=" + top.RADIO, initValue);
}

function initValue(obj) {
	inputValue(obj);
	var t = obj.systemTime.split("-");
	f.year.value = t[0];
	f.month.value = t[1];
	f.day.value = t[2];
	f.hour.value = t[3];
	f.minute.value = t[4];
	f.second.value = t[5];
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
	//时间输入不能为空@edit by windy
	if (f.day.value == "" || f.hour.value == "" || f.minute.value == "" || f.second.value == "") {
		alert(_("Please specify a valid time."));
		return false;
	}
	if (sh > 23 || smi > 59 || ss > 59) {
		alert(_("Please specify a valid time."));
		return false;
	}
	return true;
}

function preSubmit() {
    if (parent.userType == "user") {
        alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
        return false;
    }
	if (submitSystemHostname()) {
		$("[name=systemTime]").val($("[name=year]").val() + '-' +$("[name=month]").val() + '-' +$("[name=day]").val() + '-' +$("[name=hour]").val() + '-' +$("[name=minute]").val() + '-' +$("[name=second]").val());
		submitData("goform/setSysTimeInfo");
	}
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

function init() {
	initHtml();
	getValue();
}
window.onload = function () {
	init();
}