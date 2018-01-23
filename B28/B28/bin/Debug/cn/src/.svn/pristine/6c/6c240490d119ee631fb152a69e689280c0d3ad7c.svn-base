var f = document.forms[0],
	DFSAuth = [],
	initObj = {};
var pageGlobal = {};

function initHtml() {
	$("#head").html(tbl_head(7));
	$("#tail").html(tbl_tail("wl_radio"));
	init_country("country");
}


function initEvent() {
	$("input[name=txrxChain]").on('change', toogleChainPort);
	$("select[name=netMode]").change(changeMode);
	$("select[name=country]").change(changeCountry);
	$(":radio[name=bandwidth]").change(changeBandwidth);
	$(":radio[name=wmm_capable]").change(function () {
		if (this.value == 1) {
			$("#apsdCapable").show();
		} else {
			$("#apsdCapable").hide();
		}
	});
	$("input[name=setPower]").click(function () {
		if (this.checked == true) {
			$("#txPower").attr('disabled', true);
		} else {
			$("#txPower").attr('disabled', false);
		}
	});
	$("select[name=channel]").change(extraChannel);
	$("input:[name=channelLockEn]").change(function () {
		if (this.checked == true || initObj.wrlMode == "apclient" || initObj.wrlMode == "wds") {
			$(":radio[name=bandwidth],select[name=channel],select[name=extendChannel],select[name=country],select[name=netMode]").attr("disabled", true);
		} else {
			$(":radio[name=bandwidth],select[name=channel],select[name=extendChannel],select[name=country],select[name=netMode]").attr("disabled", false);
			changeMode(); //解决在未开启时导致带宽禁用不正确
		}
	});
}

function getValue() {
	$.GetSetData.getJson("goform/getWrlRadioInfo?radio=" + top.RADIO, initValue);
}

function initValue(obj) {
	obj.wrlRadio = top.RADIO == '2.4G' ? 0 : 1;
	initObj = obj;
	inputValue(obj);
	DFSAuth[0] = obj.DFS1Enable || "0";
	DFSAuth[1] = obj.DFS2Enable || "0";
	//依据频率、国家代码和带宽初始化信道
	init_channel(f.wrlRadio.value, obj.country, obj.bandwidth, "channel", obj.netMode);
	$("#channel").val(obj.channel);
	extraChannel();
	$("#extendChannel").val(obj.extendChannel);

	if (f.wrlRadio.value == 1) { //5G a模式只支持20M ac模式中国不支持80M an模式不支持80M
		if (f.netMode.value == 'a') {
			f.bandwidth[0].checked = true;
			f.bandwidth[1].disabled = true;
			f.bandwidth[2].disabled = true;
		} else if (f.netMode.value == 'an') {
			f.bandwidth[2].disabled = true;
		}
	} else {
		if (f.netMode.value != 'bgn') { //2.4G非bgn模式只能为20M带宽
			f.bandwidth[1].disabled = true;
			f.bandwidth[2].disabled = true;
		}
	}

	//初始化扩展信道
	changeExtendChannelStatus(f.wrlRadio.value, obj.netMode, obj["bandwidth"], "channelExtra");

	if (f.channelLockEn.checked) {

		$(":radio[name=bandwidth],select[name=channel],select[name=extendChannel],select[name=country],select[name=netMode]").attr("disabled", true);

	}

	//添加天线处理
	if (top.CONFIG_CHAIN == "y") {
		$('#chain_num, #chain_port').show();
	} else {
		$('#chain_num, #chain_port').hide();
	}

	pageGlobal.wrlMode = obj.wrlMode;

	if (obj.setPower == "true") {
		$("#txPower").attr('disabled', true);
	} else {
		$("#txPower").attr('disabled', false);
	}
	var helpStr = "",
		powerStr = '';
	top.minPower = parseInt(obj.minPower, 10);
	top.maxPower = parseInt(obj.maxPower, 10);
	top.defPower = parseInt(obj.defPower, 10);
	$("#txPower").html('');
	for(var i = top.minPower; i <= top.maxPower; i++) {
		powerStr += '<option value="'+i+'">'+ i +'</option>';
	}
	$("#txPower").append(powerStr).val(top.defPower);
	helpStr = _("(dBm,Range: %s ~ %s; Default: %s)", [obj.minPower, obj.maxPower, obj.defPower]);
	$("#powerHelp").html(helpStr);
}

function toogleChainPort() {
	if (f.txrxChain[0].checked) {
		$('#chain_port').show();
	} else {
		$('#chain_port').hide();
	}
}

function changeMode() {

	var countryName = f.country.value;

	//$(".radioWrapper").addClass("none");
	if (f.wrlRadio.value == 1) {
		if (f.netMode.value == 'a') { //5G a模式只支持20M  an模式不支持80M

			f.bandwidth[0].disabled = false;
			f.bandwidth[1].disabled = true;
			f.bandwidth[2].disabled = true;
			f.bandwidth[0].checked = true;
		} else if (f.netMode.value == 'an') {
			f.bandwidth[0].disabled = false;
			f.bandwidth[1].disabled = false;
			f.bandwidth[2].disabled = true;
			if (f.bandwidth[2].checked) {
				f.bandwidth[0].checked = true;
			}
		} else if (f.netMode.value == 'ac') {
			f.bandwidth[0].disabled = false;
			f.bandwidth[1].disabled = false;

			//判断是否支持80M
			if (typeof countryCode[countryName]["channel_5g"]["80"] != "undefined") {
				f.bandwidth[2].disabled = false;
			} else {
				if (f.bandwidth[2].checked) {
					f.bandwidth[0].checked = true;
				}
				f.bandwidth[2].disabled = true;
			}
		}
	} else if (f.wrlRadio.value == 0) {
		if (f.netMode.value != 'bgn') { //2.4G非bgn模式只能为20M带宽

			f.bandwidth[1].checked = true;
			f.bandwidth[1].disabled = true;
			f.bandwidth[2].disabled = true;
		} else {
			f.bandwidth[1].disabled = false;
			f.bandwidth[2].disabled = false;
		}
	}

	for (i = 0; i < 3; i++) {
		if (f.bandwidth[i].checked)
			break;
	}
	init_channel(f.wrlRadio.value, f.country.value, f.bandwidth[i].value, "channel", f.netMode.value);
	if (!changeExtendChannelStatus(f.wrlRadio.value, f.netMode.value,
		f.bandwidth[i].value, "channelExtra")) {
		int_extend_channel(f.wrlRadio.value, f.channel.value, f.country.value, "extendChannel");
	}

}

var changeBandwidth = function () {
	for (i = 0; i < 3; i++) {
		if (f.bandwidth[i].checked)
			break;
	}
	init_channel(f.wrlRadio.value, f.country.value, f.bandwidth[i].value, "channel", f.netMode.value);
	if (!changeExtendChannelStatus(f.wrlRadio.value, f.netMode.value,
		f.bandwidth[i].value, "channelExtra")) {
		int_extend_channel(f.wrlRadio.value, f.channel.value, f.country.value, "extendChannel");
	}
}
var extraChannel = function () {
	int_extend_channel(f.wrlRadio.value, f.channel.value, f.country.value, "extendChannel");
}
var changeCountry = function () {
	changeMode();
}


function preSubmit() {
	if (parent.userType == "user") {
		alert(_("You must log in as an administrator to make any change."));
		return false;
	}
	//无线模式为apclient或wds模式时，不允许修改射频设置页面。
	if (pageGlobal.wrlMode == "apclient" || pageGlobal.wrlMode == "wds") {
		alert(_("The device is working on the APClient Mode, the relevant radio parameter is not allowed to change."));
		window.location.reload();
		return false;
	}

	if (f.wirelessEn.checked == true) {
		f.wirelessEn.value = "true";
	} else {
		f.wirelessEn.value = "false";
	}
	if (f.channelLockEn.checked == true) {
		f.channelLockEn.value = "true";
	} else {
		f.channelLockEn.value = "false";
	}

	submitData("goform/setWrlRadioInfo");
}



function init() {
	initHtml();
	initEvent();
	getValue();
}
window.onload = function () {
	init();
}