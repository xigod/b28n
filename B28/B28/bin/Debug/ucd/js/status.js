define(function (require, exports, module) {
	/***************页面信息初始化**************/
	var pageModule = new PageLogic("goform/getStatus");
	pageModule.modules = [];
	var statusTimer = null;
	pageModule.initEvent = function () {
		pageModule.pageRunning = true;
		clearInterval(statusTimer);
		statusTimer = setInterval(function () {
			pageModule.getValue("goform/getStatus");
		}, 5000);

		if (!pageModule.pageRunning) {
			clearInterval(statusTimer);
			return;
		}
	}
	module.exports = pageModule;
	/***************Internet Connection Status*************/
	var statusSysModule = new StatusSysModule();
	pageModule.modules.push(statusSysModule);

	function StatusSysModule() {
		this.init = function () {
			this.initEvent();
		}
		this.initEvent = function () {
			$("#statusInternet").delegate("#cloneMac", "click", cloneMAC);
		}
		this.initValue = function () {
			var obj = pageModule.data;
			showWanInternetStatus(obj.statusInternet, "wan-connect-status");
			if (obj.statusInternet.slice(2, 3) == "1") {
				$(".pic-wan").removeClass("pic-wan-error");
			} else {
				$(".pic-wan").addClass("pic-wan-error");
			}

			//APClient 隐藏 WAN状态
			/*if (obj.statusInternet.slice(3, 4) == "2") {
				$(".pic-wan").addClass("none");
			} else {
				$(".pic-wan").removeClass("none");
			}*/

		}
		this.checkData = function () {
			return;
		}
		this.getSubmitData = function () {
			return "";
		}

		function cloneMAC() {
			var macHost = pageModule.data.statusWAN.macHost;
			$.post("goform/setMacClone", "wanMac=" + macHost, function (str) {

				if (checkIsTimeOut(str)) {
					top.location.reload(true);
					return;
				}
				var num = $.parseJSON(str).errCode || "-1";
				if (num == 0) {
					mainLogic.showModuleMsg(_("Clone MAC successfully!"));
				}
			})
		}
	}
	/***************END Internet Connection Status*******************/

	/***************System Info***************/
	var statusWanModule = new StatusWanModule();
	pageModule.modules.push(statusWanModule);

	function StatusWanModule() {
		this.init = function () {
			this.initEvent();
		}
		this.initEvent = function () {

		}
		this.initValue = function () {
			var obj = pageModule.data;
			if (obj.statusWAN.statusWanType == "dhcp") {
				obj.statusWAN.statusWanType = _("Dynamic IP");
			} else if (obj.statusWAN.statusWanType == "pppoe") {
				obj.statusWAN.statusWanType = _("PPPoE");
			} else if (obj.statusWAN.statusWanType == "static") {
				obj.statusWAN.statusWanType = _("Static IP");
			}

			//当WAN口没有IP时，不显示
			if (obj.statusWAN.statusWanIP == "") {
				$("#statistic").hide();
				$("#statusWAN").hide();
			} else {
				$("#statistic").show();
				$("#statusWAN").show();
			}


			for (var prop in obj.statusWAN) {
				if (obj.statusWAN[prop] == "") {
					obj.statusWAN[prop] = "-";
				}
			}
			inputValue(obj.statusWAN);

			$("#statusWanConnectTime").html(formatSeconds(obj.statusWAN.statusWanConnectTime));
		}

		this.checkData = function () {
			return;
		}

		this.getSubmitData = function () {

		}
	}
	/***************END System Info***************/

	/***************Attached Devices and Real-time Statistics************/
	var statusBandModule = new StatusBandModule();
	pageModule.modules.push(statusBandModule);

	function StatusBandModule() {
		this.init = function () {
			this.initEvent();
		}
		this.initEvent = function () {
			$("#statistic fieldset").on("click", function () {
				mainLogic.changeMenu("net-control");
			});
		}
		this.initValue = function () {
			var obj = pageModule.data;

			$("#statusOnlineNumber").html(obj.statusOnlineNumber);
			shapingSpeed("statusDownSpeed", obj.statusDownSpeed);
			shapingSpeed("statusUpSpeed", obj.statusUpSpeed);
		}
	}

	function shapingSpeed(id, value) {
		var val = parseFloat(value);

		if (val > 1024) {
			$("#" + id).html((val / 1024).toFixed(1));
			$("#" + id + "~small").html(_("MB/s"));
		} else {
			$("#" + id).html(val.toFixed(1));
			$("#" + id + "~small").html(_("KB/s"));
		}
	}
	/***************END Attached Devices and Real-time Statistics************/
})