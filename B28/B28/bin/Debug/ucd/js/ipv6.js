define(function (require, exports, module) {

	var pageModule = new PageLogic("goform/getIPV6Set", "goform/setIPV6Set");
	pageModule.rebootIP = location.host;
	pageModule.modules = [];
	//增加自定义数据验证属性
	pageModule.initEvent = function () {
		$.validate.valid.ipv6Prefix = { //前缀 2001::
			all: function (str) {
				var idx = str.indexOf("::");
				if (idx == -1) { // no "::"
					return _("Please input a valid address.");
				}
				var items = str.split("::");
				if (items.length != 2) { //length is not 2
					return _("Please input a valid address.");
				}
				if (items[1] != "") { //
					return _("Please input a valid address.");
				}
				var items0 = items[0].split(":");



				if (items0.length >= 1 && items0.length <= 4) { //1:: or 2:2:2:2::
					for (i = 0; i < items0.length; i++) {
						if (!(/^[0-9a-fA-F]{1,4}$/).test(items0[i])) {
							return _("Please input a valid address.");
						}
					}
					if (items0.length == 1) {
						if (parseInt(items0, 16) == 0) {
							return _("Please input a valid address.");
						}
					}
				} else {
					return _("Please input a valid address.");
				}
			}
		};
		$.validate.valid.ipv6Postfix = { //后缀  ::2001
			all: function (str) {
				var idx = str.indexOf("::");

				if (idx != -1) {
					if (idx != 0) { //::2001
						return _("Please input a valid address.");
					} else {
						var items = str.split("::");
						var items0 = items[0];
						var items1 = items[1];
						if (items.length != 2) {
							return _("Please input a valid address.");
						}
						if (items[0] != "") {

							//if (!(/^[0-9a-fA-F]{1,4}$/).test(items0)) {
							return _("Please input a valid address.");
							//}
						}
						//for (i = 0; i < items1.length; i++) {
						if (!(/^[0-9a-fA-F]{1,4}$/).test(items1)) {
							return _("Please input a valid address.");
						}

						if (parseInt(items1, 16) == 0) {
							return _("Please input a valid address.");
						}

						//}
						//return true;
					}
				} else {
					var items = str.split(":");
					if (items.length != 4) {
						return _("please input a valid address.");
					} else {
						for (i = 0; i < items.length; i++) {
							if (!(/^[0-9a-fA-F]{1,4}$/).test(items[i])) {
								return _("Please input a valid address.");
							}
						}
						//return true;
					}
				}
			}
		};
		/*check ipv6 address */
		$.validate.valid.ipv6 = {
			all: function (str) {
				var ret = this.specific(str);

				if (ret) {
					return ret;
				}
			},
			specific: function (str) {

				var headStr = str.slice(0, 4).toLowerCase();
				var idx = str.indexOf("::");

				if (headStr.slice(0, 2) == "ff") {
					return _("Please input a valid address.");
				}
				// there is no "::" in the ip address
				if (idx == -1) {
					var items = str.split(":");
					if (items.length != 8) {
						return _("Please input a valid address.");
					} else {

						for (var i = 0; i < items.length; i++) {
							if (!(/^[0-9a-fA-F]{1,4}$/).test(items[i])) {
								return _("Please input a valid address.");
							}
						}

						//return true;
					}
				} else {
					// at least, there are two "::" in the ip address

					if (str == "::" || str == "::1") {
						return _("Please input a valid address.");
					}
					if (idx != str.lastIndexOf("::")) {
						return _("Please input a valid address.");
					} else {
						var items = str.split("::");
						var items0 = items[0].split(":");
						var items1 = items[1].split(":");

						if (items0.length + items1.length > 7) {
							return _("Please input a valid address.");
						}

						if (items[0] != "") {

							for (var i = 0; i < items0.length; i++) {
								if (!(/^[0-9a-fA-F]{1,4}$/).test(items0[i])) {
									return _("Please input a valid address.");
								}
							}

						}

						for (var i = 0; i < items1.length; i++) {
							if (!(/^[0-9a-fA-F]{1,4}$/).test(items1[i])) {
								return _("Please input a valid address.");
							}
						}
						if ((Number(items0[0]) == 0) || (items0[0] == "2002")) {
							return _("Please input a valid address.");
						}
						//return true;
					}
				}

			}
		};
	}
	module.exports = pageModule;
	/**********IPV6 WAN Setup***********/
	var ipv6WanModule = new IPv6WanModule();
	pageModule.modules.push(ipv6WanModule);

	function IPv6WanModule() {
		this.init = function () {
			this.initEvent();
		}
		this.initEvent = function () {
			this.addInputEvent = false;
			$("#ipv6En").on("click", changeIPv6En);
			$("input[name='ipv6WanType']").on('click', changeWanType);
		}
		this.initValue = function () {
			var obj = pageModule.data.ipv6Wan;
			inputValue(obj);
			if (!this.addInputEvent) {
				$("#ipv6WanPPPoEUser").addPlaceholder(_("User Name from ISP"));
				$("#ipv6WanPPPoEPwd").initPassword(_("Password from ISP"));
				this.addInputEvent = true;
			}
			$("#ipv6En").html("");
			if (pageModule.data.ipv6En == "true") {
				$("#ipv6Wrap").show();
				$("#ipv6En").removeClass("icon-toggle-off").addClass("icon-toggle-on");
			} else {
				$("#ipv6Wrap").hide();
				$("#ipv6En").removeClass("icon-toggle-on").addClass("icon-toggle-off");
			}
			changeWanType();
		};
		this.checkData = function () {
			var wanType = $("[name='ipv6WanType']:checked").val(),
				staticDns1 = $("#ipv6WanDns1").val(),
				staticDns2 = $("#ipv6WanDns2").val(),
				staticIP = $("#ipv6WanIP").val(),
				staticGw = $("#ipv6WanGateway").val();

			if (wanType == "static") { //static
				if (staticIP.slice(0, 2).toLowerCase() == "fe") {

					$("#ipv6WanIP").focus();
					return _("Please input a valid IPv6 Address.");
				}

				if (staticGw.slice(0, 2).toLowerCase() == "fe" && staticGw.slice(0, 4).toLowerCase() != "fe80") {
					$("#ipv6WanGateway")[0].focus();
					return _("Please input a valid IPv6 Default Gateway.");
				}

				if (staticIP == staticGw && staticGw != "") {
					$("#ipv6WanGateway").focus();
					return ("IPv6 Address and Default Gateway cannot be the same.");
				}
				if (staticDns1 == staticDns2 && staticDns1 != "") {
					$("#ipv6LanDns2").focus();
					return _("Alternative DNS and Preferred DNS cannot be the same.");
				}
			}
			return;
		}
		this.getSubmitData = function () {
			var data = {
				ipv6En: $("#ipv6En").hasClass("icon-toggle-on") || "false",
				ipv6WanType: $("input[name='ipv6WanType']:checked").val(),
				ipv6WanPPPoEUser: $("#ipv6WanPPPoEUser").val(),
				ipv6WanPPPoEPwd: $("#ipv6WanPPPoEPwd").val(),
				ipv6WanIP: $("#ipv6WanIP").val(),
				ipv6WanGateway: $("#ipv6WanGateway").val(),
				ipv6WanDns1: $("#ipv6WanDns1").val(),
				ipv6WanDns2: $("#ipv6WanDns2").val(),
				ipv6WayTemporary: $("#ipv6WayTemporary")[0].checked ? "true" : "false",
				ipv6WayDelegation: $("#ipv6WayDelegation")[0].checked ? "true" : "false"
			};
			return objToString(data);
		};

		function changeIPv6En() {
			if ($("#ipv6En").hasClass("icon-toggle-off")) {
				$("#ipv6Wrap").show();
				$("#ipv6En").removeClass("icon-toggle-off").addClass("icon-toggle-on");
			} else {
				$("#ipv6Wrap").hide();
				$("#ipv6En").removeClass("icon-toggle-on").addClass("icon-toggle-off");
			}
			top.mainLogic.initModuleHeight();
		}

		function changeWanType() {
			var wanType = $("input[name='ipv6WanType']:checked").val();
			if (wanType == "pppoe") { //pppoe
				$("#ipv6PppoeWrap").show();
				$("#ipv6StaticWrap").hide();
				$("#ipv6WayWrap").show();
			} else if (wanType == "dhcp") { //dhcp
				$("#ipv6PppoeWrap").hide();
				$("#ipv6StaticWrap").hide();
				$("#ipv6WayWrap").show();
			} else { //static
				$("#ipv6PppoeWrap").hide();
				$("#ipv6StaticWrap").show();
				$("#ipv6WayWrap").hide();
			}
			top.mainLogic.initModuleHeight();
		}
	}

	/**********END IPV6 WAN Setup***********/

	/*********IPV6 LAN Setup**************************/
	var ipv6WLanModule = new IPv6WLanModule();
	pageModule.modules.push(ipv6WLanModule);

	function IPv6WLanModule() {
		this.init = function () {
			this.initEvent();
		}
		this.initEvent = function () {
			$("#ipv6LanType").on("change", changeIpv6LanType);
			$("#ipv6LanDhcpPrefixType").on("change", changeIpv6DhcpPrefix);
			$("#ipv6LanDhcpEn").on("change", changeIpv6DhcpEn);
			$("#ipv6LanDhcpType").on("change", changeLanDhcpType);

			$("#ipv6LanDnsType").on("change", changeLanDnsType);
		}
		this.initValue = function () {
			var obj = pageModule.data.ipv6Lan;
			inputValue(obj);
			changeIpv6LanType();
			changeIpv6DhcpPrefix();
			changeIpv6DhcpEn();
			changeLanDhcpType();
			changeLanDnsType();
		};
		this.checkData = function () {
			var startIp = $("#ipv6LanDhcpStartID").val(), //start ip
				endIp = $("#ipv6LanDhcpEndID").val(), //end ip
				lanDns1 = $("#ipv6LanDns1").val(), //dns1
				lanDns2 = $("#ipv6LanDns2").val(); //dns2

			if ($("#ipv6LanDhcpEn").val() == "true") { //dhcp en 
				if ($("#ipv6LanDhcpType").val() == "manual") { //dhcp type manual
					if ((startIp.indexOf("::") != -1 && endIp.indexOf("::") != -1) || (startIp.indexOf("::") == -1 && endIp.indexOf("::") == -1)) {
						var endArry = endIp.split(":"),
							startArry = startIp.split(":"),
							len = endArry.length,
							i = 0;
						for (i = 0; i < len; i++) {
							if (endArry[i] != "") {
								if (parseInt(startArry[i], 10) > parseInt(endArry[i], 10)) {
									$("#ipv6LanDhcpEndID").focus();
									return _("Start ID must be less than end ID.");
								}
							}
						}
					} else {
						$("#ipv6LanDhcpEndID").focus();
						return _("End ID must be the same format with the Start ID");
					}
				}

				if ($("#ipv6LanDnsType").val() == "manual") { //dns type manual
					if (lanDns1 == lanDns2 && lanDns1 != "") {
						$("#ipv6LanDns2").focus();
						return _("Alternative DNS and Preferred DNS cannot be the same.");
					}
				}
			}
			return;
		}
		this.getSubmitData = function () {
			var data = {

				ipv6LanType: $("#ipv6LanType").val(),
				ipv6LanIP: $("#ipv6LanIP").val(),
				ipv6LanDhcpPrefixType: $("#ipv6LanDhcpPrefixType").val(),
				ipv6LanDhcpPrefix: $("#ipv6LanDhcpPrefix").val(),
				ipv6LanDhcpEn: $("#ipv6LanDhcpEn").val(),
				ipv6LanDhcpType: $("#ipv6LanDhcpType").val(),

				ipv6LanDhcpStartID: $("#ipv6LanDhcpStartID").val(),
				ipv6LanDhcpEndID: $("#ipv6LanDhcpEndID").val(),
				ipv6LanDnsType: $("#ipv6LanDnsType").val(),
				ipv6LanDns1: $("#ipv6LanDns1").val(),
				ipv6LanDns2: $("#ipv6LanDns2").val()
			}
			return objToString(data);
		};

		function changeIpv6LanType() {
			if ($("#ipv6LanType").val() == "auto") {
				$("#ipv6LanIPWrap").hide();
			} else {
				$("#ipv6LanIPWrap").show();
			}
			top.mainLogic.initModuleHeight();
		}

		function changeIpv6DhcpPrefix() {
			if ($("#ipv6LanDhcpPrefixType").val() == "auto") {
				$("#ipv6LanDhcpPrefixWrap").hide();
			} else {
				$("#ipv6LanDhcpPrefixWrap").show();
			}
			top.mainLogic.initModuleHeight();
		}

		function changeIpv6DhcpEn() {
			if ($("#ipv6LanDhcpEn").val() == "true") {
				$("#ipv6LanDhcpWrap").show();
			} else {
				$("#ipv6LanDhcpWrap").hide();
			}
			top.mainLogic.initModuleHeight();
		}

		function changeLanDhcpType() {
			if ($("#ipv6LanDhcpType").val() == "auto") {
				$("#ipv6DhcpIDWrap").hide();
			} else {
				$("#ipv6DhcpIDWrap").show();
			}
			top.mainLogic.initModuleHeight();
		}

		function changeLanDnsType() {
			if ($("#ipv6LanDnsType").val() == "auto") {
				$("#ipv6LanDnsTypeWrap").hide();
			} else {
				$("#ipv6LanDnsTypeWrap").show();
			}
			top.mainLogic.initModuleHeight();
		}
	}
	/*********END IPV6 LAN Setup**************************/

	/***************IPv6 Status***************/
	var statusIPv6StatusModule = new statusIPv6StatusModule();
	pageModule.modules.push(statusIPv6StatusModule);

	function statusIPv6StatusModule() {
		this.init = function () {
			this.initEvent();
		}
		this.initEvent = function () {

		}
		this.initValue = function () {
			var obj = pageModule.data.statusIPv6;
			//当WAN口没有IP时，不显示
			if (obj.statusIPv6 == "false") {
				$("#statusIPv6Wrap").hide();
				return false;
			} else {
				$("#statusIPv6Wrap").show();
			}

			if (obj.statusIPv6WanType == "dhcp") {
				obj.statusIPv6WanType = _("DHCPv6");
			} else if (obj.statusIPv6WanType == "pppoe") {
				obj.statusIPv6WanType = _("PPPoEv6");
			} else if (obj.statusIPv6WanType == "static") {
				obj.statusIPv6WanType = _("Staticv6");
			}

			for (var prop in obj) {
				if (obj[prop] == "") {
					obj[prop] = "-";
				}
			}
			inputValue(obj);
		}

		this.checkData = function () {
			return;
		}

		this.getSubmitData = function () {

		}
	}
	/***************END IPv6 Status***************/
})