function initHtml() {
	$("#head").html(tbl_head(26));
	$("#tail").html(tbl_tail("timeReboot"));
}

function initEvent() {
	$("#sched_type").on("change", changeSchedType);
	$("#everyday").on("click", clickEveryday);
}


function getValue() {
	$.GetSetData.getJson("goform/getManualReboot", initValue);
}

function initValue(data) {

	var row = data.rebootDate.split('');

	document.getElementById("tail").innerHTML = tbl_tail("timeReboot");

	$('#en')[0].checked = data.manualRebootEn == 'false' ? false : true;
	$('#time').val(data.rebootTime);
	$("#interval_time").val(data.intervalTime);
	$("#sched_type").val(data.rebootType);

	//everyday init
	if (row[0] == 1) {
		$("#everyday")[0].checked = true;
	} else {
		$("#everyday")[0].checked = false;
	}


	for (i = 1; i < row.length; i++) {
		$('#week' + i).attr('checked', !!(+row[i]));
	}

	clickEveryday();
	changeSchedType();
}



function clickEveryday() {
	var doc = $("#everyday")[0];
	if (doc.checked == true) {
		$("[id^='week']").attr("disabled", true);
		$("[id^='week']").attr("checked", true);
	} else {
		$("[id^='week']").removeAttr("disabled");
	}

}

function changeSchedType() {
	if ($("#sched_type").val() == "timing") {
		$("#tr-1").addClass("none");
		$("#tr-2").removeClass("none");
		$("#tr-3").removeClass("none");
	} else {
		$("#tr-1").removeClass("none");
		$("#tr-2").addClass("none");
		$("#tr-3").addClass("none");
	}
}

function filterV(id) {
	var value = $("#" + id).val();
	$("#" + id).val(isNaN(parseInt(value, 10)) ? '' : parseInt(value, 10));
}

function preSubmit() {
	var day = [],
		s_time = $('#time').val(),
		type = $("#sched_type").val() == 'interval' ? '0' : '1';
	if (parent.userType == "user") {
		alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
		return false;
	}


	if (type == '0' && (!(/^[0-9]+$/g.test(+$("#interval_time").val())) || (+$("#interval_time").val()) < 10 || (+$("#interval_time").val()) > 7200)) {
		alert(_("The interval must range from 10 through 7200 minutes."));
		return;
	}

	if (+type && !/^(([0-9])|([01][0-9])|(2[0-3]))\:([0-5][0-9])$/.test(s_time)) {
		alert(_("Please specify a correct time to reboot."));
		return;
	}

	day.push((!!$('#everyday').attr('checked')) ? 1 : 0); //everyday
	for (i = 1; i < 8; i++) {
		day.push((!!$('#week' + i).attr('checked')) ? 1 : 0);
	}

	document.forms[0].manualRebootEn.value = $("#en")[0].checked == true ? "true" : "false";
	document.forms[0].rebootType.value = $("#sched_type").val();
	document.forms[0].intervalTime.value = $("#interval_time").val();
	document.forms[0].rebootTime.value = $("#time").val();
	document.forms[0].rebootDate.value = day.join("");

	submitData("goform/setManualReboot");

}

function init() {
	initHtml();
	initEvent();
	getValue();
}

window.onload = function () {
	init();
}