define(function (require, exports, module) {

	var pageModule = new PageLogic("goform/getSysTools", "goform/setSystem");
	pageModule.modules = [];
	pageModule.beforeSubmit = function () {
		if (pageModule.data.lan.lanIP != $("#lanIP").val()) {
			if (!confirm(_('The login IP will be changed into %s.', [$("#lanIP").val()]))) {
				return false;
			}
		}
		return true;
	}

	pageModule.initEvent = function () {
		pageModule.update(5000, updateTime);
	}

	function updateTime() {
		var obj = arguments[0];
		$("#sysTimecurrentTime").text(obj.sysTime.sysTimecurrentTime);
	}

	module.exports = pageModule;

	/***********Login Password****************/
	var loginPwdModule = new LoginPwdModule();
	pageModule.modules.push(loginPwdModule);

	function LoginPwdModule() {
		this.init = function () {
			this.addInputEvent = false;
		}
		this.initValue = function () {
			var obj = pageModule.data;
			if (obj.firmware.hasPwd == "true") {
				$("#oldPwdWrap").show();
			} else {
				$("#oldPwdWrap").hide();
			}
			$("#oldPwd").val("");

			if (!this.addInputEvent) {
				$("#oldPwd").initPassword(_("Must be numbers and letters"), true);
				$("#newPwd").initPassword(_("Must be numbers and letters"), true);
				$("#cfmPwd").initPassword(_("Repeat New Password"), true);
				this.addInputEvent = true;
			}
		}
		this.checkData = function () {
			if ($("#newPwd").val() != $("#cfmPwd").val()) {
				if ($("#cfmPwd_") && $("#cfmPwd_").length > 0) {
					if (!$.isHidden($("#cfmPwd_")[0])) {
						$("#cfmPwd_").focus();
					} else {
						$("#cfmPwd").focus();
					}
				} else {
					$("#cfmPwd").focus();
				}

				return _("Password mismatch!");
			}
			return;
		};
		this.getSubmitData = function () {
			var encode = new Encode();
			var data = {
				//oldPwd: encode($("#oldPwd").val()),
				newPwd: encode($("#newPwd").val())
			};
			if (pageModule.data.firmware.hasPwd == "true") {
				data.oldPwd = encode($("#oldPwd").val());
			}
			return objToString(data);
		}
	}
	/***********END Login Password******************/

	/***********WAN Parameters*************************/
	var wanParamModule = new WanParamModule();
	pageModule.modules.push(wanParamModule);

	function WanParamModule() {
		this.init = function () {
			this.addInputEvent = false;
			this.initEvent();
		}
		this.initEvent = function () {
			$("#macClone").on("change", changeMacCloneType);
		};
		this.initValue = function () {
			var obj = pageModule.data;
			this.initHtml(obj.wan);
			setWanValue(obj.wan);

			if (!this.addInputEvent) {
				$("#wanServerName").addPlaceholder(_("Default"));
				$("#wanServiceName").addPlaceholder(_("Default"));
				this.addInputEvent = true;
			}

			routerMac = obj.mac.macRouter;
			hostMac = obj.mac.macHost;
			initMacOption(obj.mac);
			inputValue(obj.mac);
			changeMacCloneType();
		}

		this.getSubmitData = function () {
			var wanMac = "";
			if ($("#macClone").val() == "clone") {
				wanMac = hostMac;
			} else if ($("#macClone").val() == "default") {
				wanMac = routerMac;
			} else {
				wanMac = $("#macCurrentWan").val().replace(/[-]/g, ":");
			}
			var data = {
				wanServerName: $("#wanServerName").val(),
				wanServiceName: $("#wanServiceName").val(),
				wanMTU: $("#wanMTU")[0].val(),
				macClone: $("#macClone").val(),
				wanMAC: wanMac.toUpperCase(),
				wanSpeed: $("#wanSpeed").val()
			};
			return objToString(data);
		};
		this.initHtml = function (obj) {

			if (obj.wanType == "pppoe") {
				$("#serverNameWrap").show();
				$("#wanMTU").attr("data-options", '{"type":"num", "args":[576, 1492]}');
			} else {
				$("#serverNameWrap").hide();
				$("#wanMTU").attr("data-options", '{"type":"num", "args":[576, 1500]}');
			}

			$("#wanMTU").toSelect({
				"initVal": obj.wanMTU,
				"editable": "1",
				"size": "small",
				"options": [{
					"1492": "1492",
					"1480": "1480",
					"1450": "1450",
					"1400": "1400",
					".divider": ".divider",
					".hand-set": _("Manual")
				}]
			});
		}

		function initMacOption(obj) {
			var wanMac = obj.macCurrentWan,
				hostMac = obj.macHost;

			if (obj.macMobileDevice == "true") {
				$("#macClone option[value='clone']").remove();
				obj.macClone == "manual";
			}
			if (obj.macClone == "clone" && wanMac != hostMac) {
				obj.macClone == "manual";
			}
		}

		function changeMacCloneType() {
			var macCloneType = $("#macClone").val();
			if (macCloneType == "clone") {
				$("#macCurrenWrap").html(_("Local Host's MAC: %s", [hostMac]));
				$("#macCurrentWan").hide();
				$("#macCurrenWrap").show();
			} else if (macCloneType == "default") {
				$("#macCurrenWrap").html(_("Factory MAC: %s", [routerMac]));
				$("#macCurrentWan").hide();
				$("#macCurrenWrap").show();
			} else {
				$("#macCurrentWan").show();
				$("#macCurrenWrap").hide();
			}
			top.mainLogic.initModuleHeight();
		}

		var hostMac,
			routerMac;

		function setWanValue(obj) {
			$("#wanSpeed").val(obj.wanSpeed);
			$("#wanMTUCurrent").html(obj.wanMTUCurrent);
			$("#wanSpeedCurrent").html($("#wanSpeed").find("option[value='" + obj.wanSpeedCurrent + "']").html());
			$("#wanServerName").val(obj.wanServerName);
			$("#wanServiceName").val(obj.wanServiceName);

		}
	}
	/***********END WAN Parameters***************************/

	/***********LAN Parameters*********************/
	var lanModule = new LanModule();
	pageModule.modules.push(lanModule);

	function LanModule() {
		this.init = function () {
			this.initEvent();
		};

		function changeIpNet() {
			var ipCheck = false,
				lanIP = $("#lanIP").val();
			if ((/^([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/).test(lanIP)) {
				ipCheck = true;
			}
			if ($("#lanMask").parent().hasClass("has-error")) {
				return;
			}
			if ($("#lanIP").parent().hasClass("has-error") || !ipCheck) {
				return;
			}
			if (!$("#lanIP").parent().hasClass("has-error") && ipCheck) {
				var ipNet = "",
					ipArry = $("#lanIP").val().split(".");
				ipNet = ipArry[0] + "." + ipArry[1] + "." + ipArry[2] + ".";
				$(".ipNet").html(ipNet);
			}

			//判断初始化时LAN IP == LAN DNS1，则在修改LAN IP时同时改变LAN DNS1
			if (pageModule.data.lan.lanIP == pageModule.data.lan.lanDns1) {
				$("#lanDns1").val($("#lanIP").val());
			}

		}

		this.initEvent = function () {
			$("#dhcpEn").on("click", changeDhcpEn);
			$("#lanIP").on("blur", changeIpNet);
		}
		this.initValue = function () {
			var obj = pageModule.data;
			inputValue(obj.lan);

			var ipNet = "",
				ipArry = obj.lan.lanDhcpStartIP.split(".");
			ipNet = ipArry[0] + "." + ipArry[1] + "." + ipArry[2] + ".";
			$(".ipNet").html(ipNet);
			$("#lanDhcpStartIP").val(obj.lan.lanDhcpStartIP.split(".")[3]);
			$("#lanDhcpEndIP").val(obj.lan.lanDhcpEndIP.split(".")[3]);
			changeDhcpEn();
		}
		this.checkData = function () {
			var lanIP = $("#lanIP").val(),
				lanMask = $("#lanMask").val(),
				startIP = $(".ipNet").eq(0).html() + $("#lanDhcpStartIP").val(),
				endIP = $(".ipNet").eq(0).html() + $("#lanDhcpEndIP").val(),
				wanIP = pageModule.data.wan.wanIP || "0.0.0.0",
				wanMask = pageModule.data.wan.wanMask || "0.0.0.0";
			var msg = checkIsVoildIpMask(lanIP, lanMask, _("LAN IP"));
			if (msg) {
				$("#lanIP").focus();
				return msg;
			}

			if ((/^([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])\.(([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/).test(wanIP)) {

				if (checkIpInSameSegment(lanIP, lanMask, wanIP, wanMask)) {
					$("#lanIP").focus();
					return _("%s and %s (%s) should not be in the same network segment.", [_("LAN IP"), _("WAN IP"), wanIP]);
				}
			}

			if ($("#dhcpEn")[0].checked) {
				if (!checkIpInSameSegment(startIP, lanMask, lanIP, lanMask)) {
					$("#lanDhcpStartIP").focus();
					return _("%s and %s must be in the same network segment.", [_("Start IP"), _("LAN IP")]);
				}

				msg = checkIsVoildIpMask(startIP, lanMask, _("Start IP"));
				if (msg) {
					$("#lanDhcpStartIP").focus();
					return msg;
				}

				if (!checkIpInSameSegment(endIP, lanMask, lanIP, lanMask)) {
					$("#lanDhcpEndIP").focus();
					return _("%s and %s must be in the same network segment.", [_("End IP"), _("LAN IP")]);
				}

				msg = checkIsVoildIpMask(endIP, lanMask, _("End IP"));
				if (msg) {
					$("#lanDhcpEndIP").focus();
					return msg;
				}

				var sipArry = startIP.split("."),
					eipArry = endIP.split("."),
					sipNumber,
					eipNumber;
				sipNumber = parseInt(sipArry[0], 10) * 256 * 256 * 256 + parseInt(sipArry[1], 10) * 256 * 256 + parseInt(sipArry[2], 10) * 256 + parseInt(sipArry[3], 10);
				eipNumber = parseInt(eipArry[0], 10) * 256 * 256 * 256 + parseInt(eipArry[1], 10) * 256 * 256 + parseInt(eipArry[2], 10) * 256 + parseInt(eipArry[3], 10);
				if (sipNumber > eipNumber) {
					$("#lanDhcpEndIP").focus();
					return _("The start IP can't be greater than the end IP.");
				}
				if ($("#lanDns1").val() == $("#lanDns2").val()) {
					return _("Preferred DNS server and Alternative DNS server can't be the same.");
				}
			}
			return;
		}
		this.getSubmitData = function () {
			var data = {
				lanIP: $("#lanIP").val(),
				lanMask: $("#lanMask").val(),
				dhcpEn: $("#dhcpEn")[0].checked == true ? "true" : "false",
				lanDhcpStartIP: $(".ipNet").eq(0).html() + $("#lanDhcpStartIP").val(),
				lanDhcpEndIP: $(".ipNet").eq(0).html() + $("#lanDhcpEndIP").val(),
				lanDhcpLeaseTime: $("#lanDhcpLeaseTime").val(),
				lanDns1: $("#lanDns1").val(),
				lanDns2: $("#lanDns2").val()
			};
			return objToString(data);
		}

		function changeDhcpEn() {
			if ($("#dhcpEn")[0].checked) {
				$("#dnsWrap").show();
			} else {
				$("#dnsWrap").hide();
			}
			top.mainLogic.initModuleHeight();
		}
	}
	/***********EDN LAN Parameters*************/

	/***********Remote Web Management*******************/
	var remoteModule = new RemoteModule();
	pageModule.modules.push(remoteModule);

	function RemoteModule() {
		this.init = function () {
			this.initEvent();
		};
		this.initEvent = function () {
			$("#remoteWebEn").on("click", changeRemoteEn);
			$("#remoteWebType").on("change", changeRemoteWebType);
		}
		this.initValue = function () {
			var obj = pageModule.data;
			inputValue(obj.remoteWeb);
			changeRemoteEn();
			changeRemoteWebType();
		}
		this.checkData = function () {
			var lanIP = $("#lanIP").val(),
				lanMask = $("#lanMask").val(),
				remoteWebIP = $("#remoteWebIP").val();

			if ($("#remoteWebEn")[0].checked && $("#remoteWebType").val() == "specified") {
				var msg = checkIsVoildIpMask(remoteWebIP, "255.255.255.0", _("Remote IP"));
				if (msg) {
					$("#remoteWebIP").focus();
					return msg;
				}

				if (remoteWebIP == lanIP) {
					$("#remoteWebIP").focus();
					return _("%s should not be the same with the %s(%s)", [_("Remote IP"), _("LAN IP"), lanIP]);
				}

				if (checkIpInSameSegment(remoteWebIP, lanMask, lanIP, lanMask)) {
					$("#remoteWebIP").focus();
					return _("%s and %s (%s) should not be in the same network segment.", [_("Remote IP"), _("LAN IP"), lanIP]);
				}
			}
		}
		this.getSubmitData = function () {
			var data = {
				remoteWebEn: $("#remoteWebEn")[0].checked == true ? "true" : "false",
				remoteWebType: $("#remoteWebType").val(),
				remoteWebIP: $("#remoteWebIP").val(),
				remoteWebPort: $("#remoteWebPort").val()
			};
			return objToString(data);
		}

		function changeRemoteEn() {
			if ($("#remoteWebEn")[0].checked) {
				$("#remoteWrap").show();
			} else {
				$("#remoteWrap").hide();
			}
			top.mainLogic.initModuleHeight();
		}

		function changeRemoteWebType() {
			if ($("#remoteWebType").val() == "any") {
				$("#remoteWebIP").parent().hide();
			} else {
				$("#remoteWebIP").parent().show();
			}
			top.mainLogic.initModuleHeight();
		}
	}
	/***********END Remote Web Management***************/

	/***********Date & Time***************/
	var timeModule = new TimeModule();
	pageModule.modules.push(timeModule);

	function TimeModule() {
		this.initValue = function () {
			var obj = pageModule.data;
			inputValue(obj.sysTime);
			if (obj.sysTime.internetState == "true") {
				$("#internetTips").show();
			} else {
				$("#internetTips").hide();
			}
		}
		this.getSubmitData = function () {
			var data = {
				sysTimeZone: $("#sysTimeZone").val()
			};
			return objToString(data);
		}
	}
	/***********END Date & Time**************/

	/***********Device Management**********/
	var manageModule = new ManageModule();
	pageModule.modules.push(manageModule);

	function ManageModule() {
		this.init = function () {
			this.initEvent();
			goUpgrade();
		}
		this.initEvent = function () {
			$("#reboot").on("click", function () {
				if (confirm(_("Reboot the device?"))) {
					$.post("goform/sysReboot", "action=reboot", function (str) {
						if (checkIsTimeOut(str)) {
							top.location.reload(true);
							return;
						}
						var num = $.parseJSON(str).errCode;
						if (num == 100) {
							progressLogic.init("", "reboot", 200);
							clearTimeout(pageModule.updateTimer);
						}
					})
				}
			});

			$("#restore").on("click", function () {
				if (confirm(_("Resetting to factory default will clear all settings of the router."))) {
					$.post("goform/sysRestore", "action=restore", function (str) {
						if (checkIsTimeOut(str)) {
							top.location.reload(true);
							return;
						}
						var num = $.parseJSON(str).errCode;
						if (num == 100) {
							var jumpIp = (window.location.href.indexOf('tendawifi') == -1 ? '192.168.0.1' : '');
							progressLogic.init(_("Resetting...Please wait..."), "restore", 200, jumpIp);
							clearTimeout(pageModule.updateTimer);
						}
					})
				}
			});

			$("#export").on("click", function () {
				window.location = "/cgi-bin/DownloadSyslog/RouterSystem.log?" + Math.random();
			});

		}
		this.initValue = function () {
			var obj = pageModule.data.firmware;
			$("#firmwareAutoMaintenanceEn")[0].checked = (obj.firmwareAutoMaintenanceEn == "true");
			$("#firmwareVision").html(obj.firmwareVision);
		}
		this.checkData = function () {
			return;
		}
		this.getSubmitData = function () {
			pageModule.rebootIP = $("#lanIP").val();
			var data = {
				firmwareAutoMaintenanceEn: $("#firmwareAutoMaintenanceEn")[0].checked == true ? "true" : "false"
			};
			return objToString(data);
		};

		function goUpgrade() {

			pageModule.upgradeLoad = new AjaxUpload("upgrade", {
				action: './cgi-bin/upgrade',
				name: 'upgradeFile',
				responseType: 'json',

				onSubmit: function (file, ext) {
					if (confirm(_('Upgrade the device?'))) {
						if (!ext) {
							return false;
						}
						//  if (!(ext && /^(bin|trx)$/.test(ext))) {  
						//    alert("请选择文件名以 “trx” 或 “bin”结尾的文件");  
						//    return false;  
						//  }  
					} else {
						document.upgradefrm.reset();
						return false;
					}
				},
				onComplete: function (file, msg) {
					if (typeof msg == 'string' && checkIsTimeOut(msg)) {
						top.location.reload(true);
						return;
					}
					var num = msg.errCode;
					if (num == "100") {
						parent.progressLogic.init("", "upgrade");
					} else if (num == "201") {
						mainLogic.showModuleMsg(_("Firmware error!") + " " + _("The router will reboot."));
						setTimeout(function () {
							progressLogic.init("", "reboot", 200);
						}, 2000);
						clearTimeout(pageModule.updateTimer);
					} else if (num == "202") {
						mainLogic.showModuleMsg(_("Upgrade failed!"));
					} else if (num == "203") {
						mainLogic.showModuleMsg(_("Firmware size is too large!") + " " + _("The router will reboot."));
						setTimeout(function () {
							progressLogic.init("", "reboot", 200);
						}, 2000)
						clearTimeout(pageModule.updateTimer);
					}
				}
			});
		}
	}
	/***********END Device Management**********/
})