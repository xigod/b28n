window.onload = function () {

	function initHtml() {
		$("#head").html(tbl_head(0));
	}

	function getValue() {
		$.GetSetData.getJson("goform/getSysStatus", initValue);
	}

	function initValue(obj) {
		var connectObj = {
			"disconnected": _("Disconnected"),
			"connecting": _("Connecting"),
			"connected": _("Connected")
		};
		obj.system.firmwareVersion = top.CONFIG_FIRWARE_VERION;
		inputValue(obj.system);
		inputValue(obj.lan);
		$("#runningTime").html(timeForm(obj.system.runningTime));
		//inputValue(obj.wan);
		//$("#conn_status").html(connectObj[obj.wan.connectStatus || "disconnected"]);

		if (obj.system.wrlMode == "pppoe") {
			$('.wan_msg').css("display", "");
			$('.lan_msg').css("display", "none");
		} else {
			$('.wan_msg').css("display", "none");
			$('.lan_msg').css("display", "");
		}
	}

	function timeForm(t) {
        var d = parseInt(t/86400),
            h = ("" + (100 + parseInt(t/3600)%24)).substr(1),
            m = ("" + (100 + parseInt(t/60)%60)).substr(1),
            s = ("" + (100 + t%60)).substr(1),
            str = "";

        if (d > 0) {
            str = d + _("Day ") + h + _("h ") + m + _("m ") + s + _("s ");
        } else {
            str = h + _("h ") + m + _("m ")+ s + _("s ");
        }
        return str;
    }

	function init() {
		initHtml();
		getValue();
	}

	init();
}