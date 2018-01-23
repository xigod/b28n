function initHtml() {
    $("#head").html(tbl_head(9));
    $("#tail").html(tbl_tail("wl_advance"));

    if (top.CONFIG_TRANSMISSION == "y") {
        $('#Transmission').removeClass('none');
    } else {
        $('#Transmission').addClass('none');
    }

    if (top.CONFIG_DEPLOY == "y") {
        $('#deploy_type').removeClass('none');
    } else {
        $('#deploy_type').addClass('none');
    }

    if (top.CONFIG_INTERFACE == "y") {
        $("#interface-set").css("display", "");
    } else {
        $("#interface-set").css("display", "none");
    }

    if (top.CONFIG_TRANSMISSION_LEVEL == "y") {
        $('#signalLevel_type').show();
    } else {
        $('#signalLevel_type').hide();
    }

    if (top.CONFIG_CHIP_MODEL != "bcm4708") {
        $('#atf_type').hide();
        $('#atf_type_5g').hide();
    }
}

function initEvent() {
    $("input[name=setPower]").on("click", function () {
        if (this.checked == true) {
            f.txPower.disabled = true;
        } else {
            f.txPower.disabled = false;
        }
    });
}

function getValue() {
    $.GetSetData.getJson("goform/getWrlAdvancedInfo?radio=" + top.RADIO, initValue);
}

function initValue(obj) {
    inputValue(obj);
    if ($("#txPower")[0].checked) {
        f.txPower.disabled = true;
    } else {
        f.txPower.disabled = false;
    }

    function initPowerHtml(minPower, maxPower, defPower) {
        var powerStr = "",
            i = 0;
        $("#txPower").html("");
        minPower = Number(minPower);
        maxPower = Number(maxPower);

        for (i = minPower; i <= maxPower; i++) {
            powerStr += "<option value='" + i + "'>" + i + "</option>";
        }
        var helpStr = "";
        helpStr = _(_("dBm (Range: %s to %s; Default: %s)"), [minPower, maxPower, defPower]);
        $("#powerHelp").html(helpStr);
        $("#txPower").html(powerStr);
    }

    initPowerHtml(obj.minPower, obj.maxPower, obj.defPower);
    $("#txPower").val(obj.txPower);
}

function init() {
    initHtml();
    initEvent();
    getValue();
}

function checkRssiData(obj, str, s, e) {
    if (obj.value == "") {
        alert(_(_("Please enter %s."), [str]));
        return false;
    }
    if ((+obj.value) < s || (+obj.value) > e || !/^[-0-9]\d*$/.test(obj.value)) {
        alert(_(_("%s is invalid. %s must be an integer from %s through %s. "), [str, str, s, e]));
        return false;
    }
    return true;
}

function checkData(obj, str, s, e) {
    if (obj.value == "") {
        alert(_(_("Please enter %s."), [str]));
        return false;
    }
    if (isNaN(obj.value) || obj.value < s || obj.value > e || !/^[1-9]\d*$/.test(obj.value)) {
        alert(_(_("%s is invalid. %s must be an integer from %s through %s. "), [str, str, s, e]));
        return false;
    }
    return true;
}

function checkSubmitData() {
	var beaconStartVal = +top.GLOBAL.ssidEnCount > 6 ? 200 : 100;

    if (!checkData(f.beacon, _("Beacon Interval"), beaconStartVal, 999)) {
        return false;
    }
    if (!checkData(f.fragment, _("Fragment Threshold"), 256, 2346)) {
        return false;
    }
    if (!checkData(f.rts, _("RTS Threshold"), 1, 2347)) {
        return false;
    }
    if (!checkData(f.dtim, _("DTIM Interval"), 1, 255)) {
        return false;
    }
    if (!checkRssiData(f.RSSI, _("Minimum RSSI Threshold"), -90, -60)) {
        return false;
    }

    if (f.wrlRadio.value == 0) {
        var rebootTag = false;
        if (($("[name='penetration']:checked").val() != f.reboot.value) && f.reboot.value != "") {
            rebootTag = true;
        } else {
            rebootTag = false;
        }

        if (rebootTag) {
            if (!confirm(_("The change takes effect only after the device is rebooted. Do you want to reboot it now?"))) {
                return false;
            }
        }
        if (rebootTag) {
            f.reboot.value = "1";
        } else {
            f.reboot.value = "0";
        }
    }
    return true;
}

function preSubmit() {
    if (checkSubmitData()) {
        submitData("goform/setWrlAdvancedInfo");
    }
}

var f;
window.onload = function () {
    f = document.forms[0];
    init();
}