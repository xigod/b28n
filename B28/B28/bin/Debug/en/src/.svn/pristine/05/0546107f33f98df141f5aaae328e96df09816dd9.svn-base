var f = document.forms[0];


function initHtml() {
	$("#head").html(tbl_head(28));
	$("#tail").html(tbl_tail("deploy"));
}

function initEvent() {
	$("[name='deployType']").on("click", changeEnable);
}

function getValue() {
	$.GetSetData.getJson("goform/getDeployInfo", initValue);
}

function changeEnable() {
	if ($("[name='deployType'][value='local']")[0].checked) {
		$("#apDeviceName").attr("disabled", true);
		$("#yunAcIp").attr("disabled", true);
		$("#yunAcManagePort").attr("disabled", true);
		$("#yunAcUpgradePort").attr("disabled", true);
	} else {
		$("#apDeviceName").removeAttr("disabled");
		$("#yunAcIp").removeAttr("disabled");
		$("#yunAcManagePort").removeAttr("disabled");
		$("#yunAcUpgradePort").removeAttr("disabled");
	}
}

function initValue(obj) {
	inputValue(obj);

	changeEnable();

}

function preSubmit() {
	if (parent.userType == "user") {
		alert(_("You must log in as an administrator to make any change."));
		return false;
	}
	if (f.deployType[1].checked) {
		var str = f.yunAcIp;

		if (!/^[\d\.]+$/.test(str.value)) {
			if (/^[0-9a-z]([0-9a-z-]+\.){1,}([0-9a-z])+$/i.test(str.value) || str.value == "localhost") {

			} else {
				if (!checkIp(str, _("Cloud AC Address"))) {
					return false;
				}
			}
		}

		if (~~f.yunAcManagePort.value < 1024 || ~~f.yunAcManagePort.value > 65535) {
			alert(_("Please specify a valid manage port"));
			return false;
		}
		if (~~f.yunAcUpgradePort.value < 1024 || ~~f.yunAcUpgradePort.value > 65535) {
			alert(_("Please specify a valid upgrade port"));
			return false;
		}
	}
	submitData("goform/setDeployInfo");
}

function init() {
	initHtml();
	initEvent();
	getValue();
}
window.onload = function () {
	init();
}