$(function () {
	function cloneMAC() {
		var macHost = moduleView.data.statusWAN.macHost;
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
	var diagnose = new Diagnose();

	function Diagnose() {
		var that = this;
		this.init = function () {
			this.initEvent();
			this.getData("goform/getStatus");
		};
		this.getData = function (url) {
			$.getJSON(url + "?" + Math.random(), that.initValue);
		};
		this.initEvent = function () {
			$("#gohome").on("click", function () {
				window.location = "./index.html";
			});
			$("#wan-connect-status").delegate("#cloneMac", "click", cloneMAC);
		};

		this.initValue = function (obj) { //初始化数据
			showWanInternetStatus(obj.statusInternet, "wan-connect-status");
			if (obj.statusInternet.slice(2, 3) == "1") {
				$(".pic-wan").removeClass("pic-wan-error");
			} else {
				$(".pic-wan").addClass("pic-wan-error");
			}
		}
	}

	diagnose.init();
})