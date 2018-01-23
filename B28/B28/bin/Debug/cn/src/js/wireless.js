var f;
var maxSsidNum = +top.CONFIG_2_4G_MAX_SSID_NUMBER,
	maxSsidNum_5g = +top.CONFIG_5G_MAX_SSID_NUMBER,
	maxClientNum = +top.CONFIG_MAX_CLIENT;
var wizardObj = {};

var DFSAuth = [];

function initSsidHtml() {
	$("[name='index']").html("");
	var ssidIndex = 0,
		i = 0;
	var ssidArry;
	if (f.wrlRadio.value == '2.4G') {
		ssidArry = [];
		ssidIndex = maxSsidNum;
		ssidArry.push(ssid1, ssid2, ssid3, ssid4, ssid5, ssid6, ssid7, ssid8);
	} else {
		ssidArry = [];
		ssidArry.push(ssid1, ssid2, ssid3, ssid4);
		ssidIndex = maxSsidNum_5g;
	}
	if (curmode == 2) {
		ssidIndex--;
	}
	var dom;
	for (i = 0; i < ssidIndex; i++) {
		dom = document.createElement("option");
		dom.value = i;
		if (typeof dom.innerText != "undefined") {
			dom.innerText = decodeSSID(ssidArry[i]);
		} else { //firefox
			dom.textContent = decodeSSID(ssidArry[i]);
		}
		$("[name='index']")[0].appendChild(dom);
	}
}

wizardObj = {
	setSecurityType: function () {
		if (document.forms[0].workmode[0].checked) {
			var wep_auth_str = "";
			var str = '<option value="0">' + _("None") + '</option>' +
				'<option value="1">WEP</option>' +
				'<option value="2">WPA-PSK</option>' +
				'<option value="3">WPA2-PSK</option>' +
				'<option value="4">Mixed WPA/WPA2-PSK</option>' +
				'<option value="5">WPA</option>' +
				'<option value="6">WPA2</option>';
			wep_auth_str = '<option value="open">' + _("Open") + '</option>' +
				'<option value="shared">' + _("Shared") + '</option>' +
				'<option value="802.1x">802.1x</option>';
		} else {
			var str = '<option value="0">' + _("None") + '</option>' +
				'<option value="1">WEP</option>' +
				'<option value="2">WPA-PSK</option>' +
				'<option value="3">WPA2-PSK</option>' +
				'<option value="4">Mixed WPA/WPA2-PSK</option>';
			wep_auth_str = '<option value="open">' + _("Open") + '</option>' +
				'<option value="shared">' + _("Shared") + '</option>';
		}
		$("#secType").html(str);
		$("[name='wepSecOpt']").html(wep_auth_str);
	}

};

var wpa_psk_key_time,
	wpa_key_time;
$(function () {
	var bodyId = document.body.id;
	f = document.forms[0];
	if (bodyId == "mode") {
		var apclient,
			apwds,
			initMode = function () {
				if (top.CONFIG_NET_WAN_PPPOE == "y") {
					$("#pppoe_set").css("display", "");
				} else {
					$("#pppoe_set").css("display", "none");
				}
				if (maxSsidNum_5g < 1) {
					$("#radio-set").css("display", "none");
				} else {
					$("#radio-set").css("display", "");
				}
				if (f.workmode[0].checked == true) {
					$("#page10").hide();
				} else {
					$("#page10").show();
				}
				if (f.wrlRadio.value == '2.4G') {
					apclient = apclientDate;
					apwds = apwdsDate;
				} else {
					apclient = apclientDate5g;
					apwds = apwdsDate5g;
				}
				wizardObj.setSecurityType();
				if (f.workmode[2].checked == true) {
					$("#wdsMac tr:lt(4)").addClass("none");
					$("#apNetmode").addClass("none");
					$("#apWdsChannel").addClass("none");
					$("#extend").addClass("none");
					$("#apChannel").addClass("none");
					$("#nettype").addClass("none");
					$("#apChannel").removeClass("none");
					f.ssid.value = $("<span>").html(apclient["ssid"]).text();
					f.nettype.value = apwds.nettype;
					f.secType.value = apclient.secType ? apclient.secType : 0;
					f.wepSecOpt.value = apclient.wep_auth;
					f.wep_default_key.value = apclient["wep_default_key"];
					f.wep1.value = $("<span>").html(apclient["wep_key_1"]).text();
					if (apclient["wep_key_1"].length == 10 || apclient["wep_key_1"].length == 26) {
						f.WEP1Select.value = 0;
					} else {
						f.WEP1Select.value = 1;
					}
					f.wep2.value = $("<span>").html(apclient["wep_key_2"]).text();
					if (apclient["wep_key_2"].length == 10 || apclient["wep_key_2"].length == 26) {
						f.WEP2Select.value = 0;
					} else {
						f.WEP2Select.value = 1;
					}
					f.wep3.value = $("<span>").html(apclient["wep_key_3"]).text();
					if (apclient["wep_key_3"].length == 10 || apclient["wep_key_3"].length == 26) {
						f.WEP3Select.value = 0;
					} else {
						f.WEP3Select.value = 1;
					}
					f.wep4.value = $("<span>").html(apclient["wep_key_4"]).text();
					if (apclient["wep_key_4"].length == 10 || apclient["wep_key_4"].length == 26) {
						f.WEP4Select.value = 0;
					} else {
						f.WEP4Select.value = 1;
					}
					f.radius_svrip.value = apclient["radius_svrip"];
					f.radius_port.value = apclient["radius_port"];
					f.radius_pass.value = apclient["radius_pass"];
					f.cipher[+apwds["cipher"]].checked = true;
					/*if (apclient["cipher"] == 3) {
					f.cipher[1].checked = true;
				} else if (apclient["cipher"] == 2) {
					f.cipher[2].checked = true;
				} else{
					f.cipher[0].checked = true;
				}*/
					f.passphrase.value = $("<span>").html(apclient["passphrase"]).text();
					if (apclient["macAddr"].length >= 17) {
						f.upMac.value = apclient["macAddr"].substr(0, 17);
						f.wdslist.value = apclient["macAddr"];
					} else {
						$("input[name^=wdsMac]").val("");
					}
					f.channel.value = apclient["channel"];
				} else {
					$("#nettype").removeClass("none");
					$("#wdsMac tr:lt(4)").removeClass("none");
					$("#apclientMac").addClass("none");
					$("#apWdsChannel").removeClass("none");
					$("#apNetmode").removeClass("none");
					$("#extend").removeClass("none");
					$("#apChannel").removeClass("none");
					$("#apWdsChannel").removeClass("none");
					f.ssid.value = $("<span>").html(apwds["ssid"]).text();
					f.secType.value = apwds.secType;
					f.wepSecOpt.value = apwds.wep_auth;
					f.wep_default_key.value = apwds["wep_default_key"];
					f.wep1.value = $("<span>").html(apwds["wep_key_1"]).text();
					if (apwds["wep_key_1"].length == 10 || apwds["wep_key_1"].length == 26) {
						f.WEP1Select.value = 0;
					} else {
						f.WEP1Select.value = 1;
					}
					f.wep2.value = $("<span>").html(apwds["wep_key_2"]).text();
					if (apwds["wep_key_2"].length == 10 || apwds["wep_key_2"].length == 26) {
						f.WEP2Select.value = 0;
					} else {
						f.WEP2Select.value = 1;
					}
					f.wep3.value = $("<span>").html(apwds["wep_key_3"]).text();
					if (apwds["wep_key_3"].length == 10 || apwds["wep_key_3"].length == 26) {
						f.WEP3Select.value = 0;
					} else {
						f.WEP3Select.value = 1;
					}
					f.wep4.value = $("<span>").html(apwds["wep_key_4"]).text();
					if (apwds["wep_key_4"].length == 10 || apwds["wep_key_4"].length == 26) {
						f.WEP4Select.value = 0;
					} else {
						f.WEP4Select.value = 1;
					}
					f.radius_svrip.value = apwds["radius_svrip"];
					f.radius_port.value = apwds["radius_port"];
					f.radius_pass.value = apwds["radius_pass"];
					f.cipher[+apwds["cipher"]].checked = true;

					f.passphrase.value = $("<span>").html(apwds["passphrase"]).text();
					if (f.wrlRadio.value == '2.4G' && macstr != "") {
						var tempStatus = macsta.split(";");
						for (var i = 0; i < tempStatus.length; i++) {
							if (tempStatus[i] == 'Up') {
								$("#macSta" + (i + 1)).html(_("Connected")).attr("class", macClass[0]);
							} else if (tempStatus[i] == "Down") {
								$("#macSta" + (i + 1)).html(_("Disconnected")).attr("class", macClass[1]);
							} else {
								$("#macSta" + (i + 1)).html(_("Unknow"));
							}
						}

					} else {
						var tempStatus = macsta5g.split(";");
						for (var i = 0; i < tempStatus.length; i++) {
							if (tempStatus[i] == 'Up') {
								$("#macSta" + (i + 1)).html(_("Connected")).attr("class", macClass[0]);
							} else if (tempStatus[i] == "Down") {
								$("#macSta" + (i + 1)).html(_("Disconnected")).attr("class", macClass[1]);
							} else {
								$("#macSta" + (i + 1)).html(_("Unknow"));
							}
						}
					}
					if (apwds["macAddr"].length >= 17) {
						var temp = apwds["macAddr"].split(" ");
						for (var i = 0; i < 4; i++) {
							f["wdsMac" + (i + 1)].value = temp[i];
						}
						f.wdslist.value = apwds["macAddr"];
					} else {
						$("input[name^=wdsMac]").val("");
					}
					f.channel.value = apwds["channel"];
					f.band_width.value = apwds["band_width"];
					f.extend_channel.value = apwds["extend_channel"];
					f.nettype.value = apwds["nettype"];
				}
				if (f.workmode[0].checked == true || f.workmode[3].checked == true) {
					$("#wlScan").addClass("none");
				} else {
					$("#wlScan").removeClass("none");
				}
				if (f.workmode[3].checked == true) {
					$("#page1").hide();
					$("#div_pppoe").removeClass("none");
					f.pppoeName.value = pppoeName;
					f.pppoePwd.value = pppoePwd;
					f.pppoeMTU.value = pppoeMTU;
					if (pppMppe == '1') {
						f.MPPE.checked = true;
					} else {
						f.MPPE.checked = false;
					}
				} else {
					$("#page1").show();
					$("#div_pppoe").addClass("none");
				}
				onChangeSec();
			};
		$("#head").html(tbl_head(19));
		if (curmode == 0) {
			f.workmode[0].checked = true;
		} else if (curmode == 1) {
			f.workmode[1].checked = true;
		} else if (curmode == 2) {
			f.workmode[2].checked = true;
		} else if (curmode == 3) {
			f.workmode[3].checked = true;
		}

		initMode();
		var str_mode;
		$("select[name=secType]").change(onChangeSec);
		$("#wlScan").click(wdsScan);
		$("input:radio[name=workmode]").on("change", initMode);
		$("select[name=wrlRadio]").change(function () {
			var curMode;
			if (f.wrlRadio.value == '2.4G') {
				curMode = curmode;

			} else {
				curMode = curmode5g;
			}
			if (curMode == 0) {
				f.workmode[0].checked = true;
			} else if (curMode == 1) {
				f.workmode[1].checked = true;
			} else if (curMode == 2) {
				f.workmode[2].checked = true;
			} else if (curMode == 3) {
				f.workmode[3].checked = true;
			}
			initMode();
		});
		$(".button[name=save]").on("click", preSubmit);
	}
	if (bodyId == "basic") {
		var initValue = function () {
			var ssidIndex = f.index.value;
			$.getJSON("/goform/wifiSSIDget?index=" + ssidIndex + "&wrlRadio=" + f.wrlRadio.value, function (str) {
				if (str.ssidEnable == 1) {
					f.enable.checked = true;
				} else {
					f.enable.checked = false;
				}
				if (ssidIndex == 0) {
					f.enable.disabled = true;
				} else {
					f.enable.disabled = false;
				}
				f.ssid.value = decodeSSID(str.ssid);
				//f.broadcast.value = datas[2];
				if (str.bdssid == 2) {
					f.hideSsid.checked = true;
					f.broadcastSsid.value = 0;
					//f.broadcastSsid.disabled = true;
					f.broadcastSsid.disabled = false;
				} else {
					f.hideSsid.checked = false;
					f.broadcastSsid.disabled = false;
					f.broadcastSsid.value = str.bdssid;
				}

				f.ssid_encode.value = str.ssid_encode; //ssid编码格式

				$(":checkbox[name=hideSsid]").on("click", function () {
					if (this.checked == true) {
						//f.broadcastSsid.disabled = true;
						f.broadcastSsid.disabled = false;
					} else {
						f.broadcastSsid.disabled = false;
					}
				})
				if (str.apIsolate == 0) {
					f.isolate[0].checked = true;
				} else {
					f.isolate[1].checked = true;
				}
				if (str.wmf_enable == 0) {
					f.wmf_enable[0].checked = true;
				} else {
					f.wmf_enable[1].checked = true;
				}

				f.maxclients.value = str.maxclients;
				if (f.wrlRadio.value == '2.4G') {
					if (qvlan_en == 1 && f.index.value != 0) {
						//f.secType.value = 0;
						//f.secType.disabled = true;
						f.secType.value = str.secType;
					} else {
						f.secType.value = str.secType;
						//f.secType.disabled = false;
					}
				} else {
					f.secType.value = str.secType;
				}
				f.wepSecOpt.value = str.wepSecOpt;
				f.wep_default_key.value = str.wep_default_key ? str.wep_default_key : 1;
				str.wep_key1 = $("<span>").html(str.wep_key1).text();
				f.wep1.value = str.wep_key1;
				if (str.wep_key1.length == 10 || str.wep_key1.length == 26) {
					f.WEP1Select.value = 0;
				} else {
					f.WEP1Select.value = 1;
				}
				str.wep_key2 = $("<span>").html(str.wep_key2).text();
				f.wep2.value = str.wep_key2;
				if (str.wep_key2.length == 10 || str.wep_key2.length == 26) {
					f.WEP2Select.value = 0;
				} else {
					f.WEP2Select.value = 1;
				}
				str.wep_key3 = $("<span>").html(str.wep_key3).text();
				f.wep3.value = str.wep_key3;
				if (str.wep_key3.length == 10 || str.wep_key3.length == 26) {
					f.WEP3Select.value = 0;
				} else {
					f.WEP3Select.value = 1;
				}
				str.wep_key4 = $("<span>").html(str.wep_key4).text();
				f.wep4.value = str.wep_key4;
				if (str.wep_key4.length == 10 || str.wep_key4.length == 26) {
					f.WEP4Select.value = 0;
				} else {
					f.WEP4Select.value = 1;
				}
				f.radius_svrip.value = str.radius_svrip;
				f.radius_port.value = str.radius_port;
				f.radius_pass.value = str.radius_pass;
				if (str.cipher == 1) {
					f.cipher[0].checked = true;
				} else if (str.cipher == 2) {
					f.cipher[2].checked = true;
				} else {
					f.cipher[1].checked = true;
				}
				if (str.secType == 2) {
					f.cipher[2].disabled = true;
				}
				f.passphrase.value = decodeSSID(str.wpa_pass);
				wpa_psk_key_time = str.keyPeriod;
				wpa_key_time = str.radiusPeriod;
				if (str.secType == 2 || str.secType == 3 || str.secType == 4) {
					f.keyPeriod.value = str.keyPeriod;
				} else if (str.secType == 5 || str.secType == 6) {
					f.keyPeriod.value = str.radiusPeriod;

				} else {
					f.keyPeriod.value = str.keyPeriod;
				}
				clientNum = str.sum_client;
				onChangeSec();

				if (curmode == 1 && 0 == ssidIndex) {
					alert(_("In WDS Mode,the frist ssid can't be changed."))
					$("#btnsubmit").attr("disabled", true);
				} else {
					$("#btnsubmit").removeAttr("disabled");
				}
			})
		};
		$("#head").html(tbl_head(6));
		$("#tail").html(tbl_tail("wl_basic"));
		var helpStr = "";
		helpStr = _("(Range:1~%s)", [maxClientNum]);
		$("#clientHelp").html(helpStr);
		initSsidHtml();

		$("select[name=index]").change(initValue);
		var url = window.location.toString().split("?"),
			indexed;

		if (url.length != 1 && url[1].split("=")[0] == 'index') {
			indexed = url[1].split("=")[1];
		} else {
			indexed = 0;
		}
		f.index.value = indexed;
		initValue();
		$("select[name=secType]").change(onChangeSec);
		$("input:[name=enable]").change(function () {
			if (this.checked == false && f.index.value == 0) {
				if (curmode == 1) {
					alert(_("In WDS mode, the first SSID cannot be disabled!"));
					this.checked = true;
				}
				if (curmode == 2) {
					alert(_("In AP Client mode, the first SSID cannot be disabled!"));
					this.checked = true;
				}
			}
		});
	}
	if (bodyId == "channel") {
		$("#head").html(tbl_head(24));
		$("#wlScan").on("click", channelScan);
	}
	if (bodyId == "radio") {
		$("#head").html(tbl_head(7));
		$("#tail").html(tbl_tail("wrlRadio"));
		//初始化国家代码
		init_country("country");

		var product = top.CONFIG_PRODUCT,
			vision = parseInt(product.split("V")[1] || "1", 10);
		var countryStr;
		//if(vision > 1) {
		if (top.CONFIG_SUPPORT_11AC == "y" || vision > 1) {
			if (f.wrlRadio.value == '5G') { //初始化网络模式 
				$("#bandwidth80M-set").css("display", "");
			}
		} else { // V1.0	
			if (f.wrlRadio.value == '5G') { //初始化网络模式 
				$("#wirelessmode").html('<option value="2">11a/n</option>');
				$("#bandwidth80M-set").css("display", "none");
			}
		}
		var configChain = /p131ap|p130ap/gi.test(top.CONFIG_PRODUCT.toLowerCase());

		$.getJSON("/goform/WifiRadioGet?r=" + Math.random() + "radio=" + f.wrlRadio.value, function (str) {
			if (str.enable == 1) {
				f.wlRadio.checked = true;
			}
			DFSAuth[0] = str.DFS1Enable || "0";
			DFSAuth[1] = str.DFS2Enable || "0";
			f.country.value = str.country; //国家代码
			//依据频率、国家代码和带宽初始化信道
			init_channel(f.wrlRadio.value, str.country, parseInt(str.bandwidth, 10), "channel", parseInt(str.mode, 10));

			f.wirelessmode.value = str.mode; //网络模式

			f.bandwidth[parseInt(str.bandwidth, 10)].checked = true; //带宽

			if (f.country.value == "KR" || f.country.value == "RU") { //韩国、俄罗斯不支持40M
				f.bandwidth[0].disabled = false;
				f.bandwidth[1].disabled = true;
				f.bandwidth[2].disabled = true;
			} else {
				if (f.wrlRadio.value == '5G') { //5G a模式只支持20M ac模式中国不支持80M an模式不支持80M
					if (f.wirelessmode.value == 0) {
						f.bandwidth[0].checked = true;
						f.bandwidth[1].disabled = true;
						f.bandwidth[2].disabled = true;
					} else if (f.wirelessmode.value == 2) {
						f.bandwidth[2].disabled = true;
					}
				} else {
					if (f.wirelessmode.value != 3) { //2.4G非bgn模式只能为20M带宽
						f.bandwidth[1].disabled = true;
						f.bandwidth[2].disabled = true;
					}
				}
			}
			f.channel.value = str.channel; //信道
			//初始化扩展信道
			if (!changeExtendChannelStatus(f.wrlRadio.value, parseInt(str.mode), parseInt(str["bandwidth"], 10), "channelExtra")) {
				if (f.country.value != "KR" && f.country.value != "RU") {
					int_extend_channel(f.wrlRadio.value, str.channel, str.country, "extra");
				}
			}

			f.extra.value = str.extchannel; //扩展信道
			if (str.ssidIsolate == 0) {
				f.ssidIsolate[1].checked = true;
			} else {
				f.ssidIsolate[0].checked = true;
			}
			if (str.lockchannel == 1) {
				f.lockChannel.checked = true;
				$(":radio[name=bandwidth],select[name=channel],select[name=extra],select[name=country],select[name=wirelessmode]").attr("disabled", true);

			}
			f.channel.value = str.channel;
			if (str.wmm == 1) {
				f.wmm_capable[0].checked = true;
				//document.getElementById("apsdCapable").style.display = "";
			} else {
				f.wmm_capable[1].checked = true;
				//document.getElementById("apsdCapable").style.display = "none";
			}
			if (str.wmmMode == 2) {
				f.wmmMode[0].checked = true;
			} else if (str.wmmMode == 1) {
				f.wmmMode[1].checked = true;
			} else {
				f.wmmMode[2].checked = true;
			}
			if (str.apsd == 1) {
				f.apsd[0].checked = true;
			} else {
				f.apsd[1].checked = true;
			}

			//添加天线处理
			if (configChain) {
				if (str.txrx_chain == 1) {
					f.txrx_chain[0].checked = true;
				} else {
					f.txrx_chain[1].checked = true;
					$('#chain_port').hide();
				}
				if (str.txrx_chain_port == 1) {
					f.txrx_chain_port[0].checked = true;
				} else {
					f.txrx_chain_port[1].checked = true;
				}
			} else {
				$('#chain_num, #chain_port').hide();
			}
			if (curmode == 1 || curmode == 2) {
				alert(_("In Ap Clinet Mode or WDS Mode,this page can't be changed."))
				$("#btnsubmit").attr("disabled", true);
			}
			f.sta_timeout.value = str.sta_timeout
			if (f.sta_timeout.value == 1) {
				document.getElementById("sta_timeout").options[0].selected = true;
			} else if (f.sta_timeout.value == 10) {
				document.getElementById("sta_timeout").options[2].selected = true;
			} else if (f.sta_timeout.value == 15) {
				document.getElementById("sta_timeout").options[3].selected = true;
			} else {
				document.getElementById("sta_timeout").options[1].selected = true;
			}
		});

		function toogleChainPort() {
			if (f.txrx_chain[0].checked) {
				$('#chain_port').show();
			} else {
				$('#chain_port').hide();
			}
		}
		var changeMode = function () {

			var countryName = f.country.value;
			if (countryName == "KR" || countryName == "RU") { //韩国、俄罗斯不支持40M
				f.bandwidth[0].checked = true;
				f.bandwidth[0].disabled = false;
				f.bandwidth[1].disabled = true;
				f.bandwidth[2].disabled = true;
				//$(".radioWrapper").addClass("none");
			} else {
				//$(".radioWrapper").addClass("none");
				if (f.wrlRadio.value == '5G') {
					if (f.wirelessmode.value == 0) { //5G a模式只支持20M  an模式不支持80M

						f.bandwidth[0].disabled = false;
						f.bandwidth[1].disabled = true;
						f.bandwidth[2].disabled = true;
						f.bandwidth[0].checked = true;
					} else if (f.wirelessmode.value == 2) {
						f.bandwidth[0].disabled = false;
						f.bandwidth[1].disabled = false;
						f.bandwidth[2].disabled = true;
						if (f.bandwidth[2].checked) {
							f.bandwidth[0].checked = true;
						}
					} else if (f.wirelessmode.value == 1) {
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
				} else if (f.wrlRadio.value == '2.4G') {
					if (f.wirelessmode.value != 3) { //2.4G非bgn模式只能为20M带宽

						f.bandwidth[1].checked = true;
						f.bandwidth[1].disabled = true;
						f.bandwidth[2].disabled = true;
					} else {
						f.bandwidth[1].disabled = false;
						f.bandwidth[2].disabled = false;
					}
				}

			}
			for (i = 0; i < 3; i++) {
				if (f.bandwidth[i].checked)
					break;
			}
			init_channel(f.wrlRadio.value, f.country.value, i, "channel", parseInt(f.wirelessmode.value, 10));
			if (!changeExtendChannelStatus(f.wrlRadio.value, parseInt(f.wirelessmode.value, 10),
				i, "channelExtra")) {
				if (f.country.value != "KR" && f.country.value != "RU") {
					int_extend_channel(f.wrlRadio.value, f.channel.value, f.country.value, "extra");
				}
			}

		}

		var changeBandwidth = function () {
			for (i = 0; i < 3; i++) {
				if (f.bandwidth[i].checked)
					break;
			}
			init_channel(f.wrlRadio.value, f.country.value, i, "channel", parseInt(f.wirelessmode.value, 10));
			if (!changeExtendChannelStatus(f.wrlRadio.value, parseInt(f.wirelessmode.value),
				i, "channelExtra")) {
				if (f.country.value != "KR" && f.country.value != "RU") {
					int_extend_channel(f.wrlRadio.value, f.channel.value, f.country.value, "extra");
				}
			}
		}
		var extraChannel = function () {
			if (f.country.value != "KR" && f.country.value != "RU") {
				int_extend_channel(f.wrlRadio.value, f.channel.value, f.country.value, "extra");
			}
		}
		var changeCountry = function () {
			changeMode();

		}
		$("input[name=txrx_chain]").on('change', toogleChainPort);
		$("select[name=wirelessmode]").change(changeMode);
		$("select[name=country]").change(changeCountry);
		$(":radio[name=bandwidth]").change(changeBandwidth);
		$(":radio[name=wmm_capable]").change(function () {
			if (this.value == 1) {
				$("#apsdCapable").show();
			} else {
				$("#apsdCapable").hide();
			}
		});
		$("select[name=channel]").change(extraChannel);
		$("input:[name=lockChannel]").change(function () {
			if (this.checked == true || curmode == 2 || curmode == 1) {
				$(":radio[name=bandwidth],select[name=channel],select[name=extra],select[name=country],select[name=wirelessmode]").attr("disabled", true);
			} else {
				$(":radio[name=bandwidth],select[name=channel],select[name=extra],select[name=country],select[name=wirelessmode]").attr("disabled", false);
				changeMode(); //解决在未开启时导致带宽禁用不正确
			}
		});

	}
	if (bodyId == "wds") {
		$("#head").html(tbl_head(21));
		$("#tail").html(tbl_tail("wl_wds"));
		var wdsModeOnChange = function () {
				if (f.wds_mode.selectedIndex == 0) {
					$("#wds_1,#wds_2,#wds_3,#wds_4,#wlScan").addClass("none");
				} else {
					$("#wds_1,#wds_2,#wds_3,#wds_4,#wlScan").removeClass("none");
					document.getElementById("wlScan").value = "Open Scan";
				}
			},
			wdslistArray;
		wdsList = wdsList.replace(/~+$/, "");
		if (wdsList != "") {
			wdslistArray = wdsList.split("~");
			for (i = 1; i <= wdslistArray.length; i++) {
				f["wds_" + i].value = wdslistArray[i - 1];
			}
		}
		if (wdsMode == 0) {
			f.wds_mode.selectedIndex = 0;
		} else if (wdsMode == 3) {
			f.wds_mode.selectedIndex = 1;
		}
		wdsModeOnChange();
		$("#wds_mode").change(wdsModeOnChange);
		$("#wlScan").bind("click", wdsScan);
	}
	if (bodyId == "advance") {
		$("#head").html(tbl_head(9));
		$("#tail").html(tbl_tail("wl_advance"));
		var product_num = parseInt(top.CONFIG_PRODUCT.slice(1, 4), 10);

		if (top.CONFIG_PRODUCT == 'w30ap-mini' || top.CONFIG_PRODUCT == 'I21V1.0') {
			$('#Transmission, #deploy_type').addClass('none');
		}
		if (product_num == "65" || product_num == "75" || product_num == "85" || product_num == "185" || product_num == "175") {
			$("#interface-set").css("display", "");
		} else {
			$("#interface-set").css("display", "none");
		}

		function initPowerHtml() {
			var powerStr = "",
				cur_radio = f.wrlRadio.value;
			i = 0;
			$("[name='txPower']").html("");
			minPower = Number(minPower);
			maxPower = Number(maxPower);
			/*
			if (power_mode == "low" && cur_radio == "0" &&((top.CONFIG_PRODUCT == "W175AP" || top.CONFIG_PRODUCT == "W185AP"))) {
				maxPower = 15;
			}*/
			for (i = minPower; i <= maxPower; i++) {
				powerStr += "<option value='" + i + "'>" + i + "</option>";
			}
			var helpStr = "";
			helpStr = _("(dBm,Range: %s ~ %s; Default: %s)", [minPower, maxPower, defPower]);
			$("#powerHelp").html(helpStr);
			$("[name='txPower']").html(powerStr);
		}
		initPowerHtml();

		var configDeploy = /w10ap|w15ap|w18ap|w30ap|w16ap|ap255|ap205|ap235|ap315|w30apv4.0/gi.test(top.CONFIG_PRODUCT.toLowerCase());
		var configTransmission = /w10ap|w15ap|w18ap|w30ap|w16ap|ap255|ap205|ap235|w30apv4.0/gi.test(top.CONFIG_PRODUCT.toLowerCase());
		var configTransmission_only_Leve = /ap605/gi.test(top.CONFIG_PRODUCT.toLowerCase());

		$.getJSON("/goform/WifiAdvanceGet?radio=" + f.wrlRadio.value, function (str) {
			var datas = str;

			f.beacon.value = datas.beacon;
			f.fragment.value = datas.fragment;
			f.rts.value = datas.rts;
			f.dtim.value = datas.dtim;
			f.txPower.value = datas.power;

			f.atf.value = datas.atf;
			if (f.wrlRadio.value == '2.4G') { //2.4G
				f.interference.value = datas.interference;
			}

			if (f.wrlRadio.value == '5G') { //5G
				if (datas.prio_5 == 1) {
					f.prio_5[0].checked = true;
				} else {
					f.prio_5[1].checked = true;
				}
			}
			f.RSSI.value = datas.RSSI;
			if (datas.ledoff == 1) {
				f.wlLed[0].checked = true;
			} else {
				f.wlLed[1].checked = true;
			}
			if (datas.plcphdr == 0) { //无线前导码
				f.Plcp[1].checked = true;
			} else {
				f.Plcp[0].checked = true;
			}
			if (datas.lockpower == 1) {
				f.txPower.disabled = true;
				f.setPower.checked = true;
			}

			if (f.wrlRadio.value == '2.4G') { //5G暂时不支持
				//穿墙能力
				if (configTransmission) {
					$('#Transmission').hide();
				} else {
					if (datas.penetration == "1") {
						f.penetration[0].checked = true;
					} else {
						f.penetration[1].checked = true;
					}
					f.reboot.value = datas.penetration;
				}

				//添加部署方式
				if (!configTransmission_only_Leve) {
					$('#signalLevel_type').hide();
				}
				if (configDeploy) {
					$('#deploy_type').hide();
					if (configTransmission_only_Leve) {
						//信号接收能力
						if (datas.signalLevel == "0") {
							document.getElementById("signalLevel").options[0].selected = "selected";
						} else if (datas.signalLevel == "1") {
							document.getElementById("signalLevel").options[1].selected = "selected";
						} else if (datas.signalLevel == "2") {
							document.getElementById("signalLevel").options[2].selected = "selected";
						} else if (datas.signalLevel == "3") {
							document.getElementById("signalLevel").options[3].selected = "selected";
						} else {
							document.getElementById("signalLevel").options[4].selected = "selected";
						}
					}
				} else {
					//部署方式
					if (datas.deploy == "0") {
						f.deploy[0].checked = true;
						$("#inter").attr("disabled", true);
					} else if (datas.deploy == "1") {
						f.deploy[1].checked = true;
						$("#inter").attr("disabled", false);
					} else {
						f.deploy[2].checked = true;
						$("#inter").attr("disabled", true);
					}
				}

				if (top.CONFIG_CHIP_MODEL != "bcm4708") {
					$('#atf_type').hide();
					$('#atf_type_5g').hide();
				}


			}
		});
		$("input[name=setPower]").click(function () {
			if (this.checked == true) {
				f.txPower.disabled = true;
			} else {
				f.txPower.disabled = false;
			}
		});
	}
	if (bodyId == "filter") {
		var addMac = function () {
			var add_mac = (f.mac1.value + ":" + f.mac2.value + ":" + f.mac3.value + ":" +
				f.mac4.value + ":" + f.mac5.value + ":" + f.mac6.value).toUpperCase();
			if (!checkMAC(add_mac)) {
				return false;
			}
			if (flist.length > 15) {
				window.alert(_("Up to 16 MAC address entries can be configured!"));
				return;
			}
			for (var i = 0; i < flist.length; i++) {
				if (flist[i].substr(0, 17).toUpperCase() == add_mac) {
					window.alert(_("Specified MAC address already exists!"));
					return;
				}
			}
			flist.push(add_mac + ";1");
			showList();
		};
		var showList = function () {
			var s = '<table border=1 class="w640 tc" id="listTab">';
			for (var i = 0; i < flist.length; i++) {
				s += '<tr><td width="10%" data-val="' + flist[i] + '">' + (i + 1) + '</td><td width="50%">' +
					flist[i].split(";")[0] + '</td><td width="15%"><input type="checkbox" id="check' + i + '"' + (flist[i].split(";")[1] == "0" ? "" : "checked") + '>&nbsp;' + _("Enable") + '</td>' +
					'<td><input type="button" class="button" value="' + _("Delete") + '" id="macAddr' + i + '"></td></tr>';
			}
			s += '</table>';
			document.getElementById("list").innerHTML = s;
			$(":button[id^=macAddr]").click(function () {
				if (confirm(_('Are you sure you want to delete this entry?'))) {
					var index = this.id.match(/\d+$/)[0];
					document.getElementById("listTab").deleteRow(index);
					flist.splice(index, 1);
					showList();
				}
			});
			$(":checkbox[id^=check]").click(function () {
				var temp = $(this).closest("tr").find("td:first"),
					inde = this.id.match(/\d+$/)[0];
				if (this.checked == true) {
					temp.attr("data-val", temp.attr("data-val").replace(/\d+$/, "1"));
					flist[inde] = temp.attr("data-val").replace(/\d+$/, "1");
				} else {
					temp.attr("data-val", temp.attr("data-val").replace(/\d+$/, "0"));
					flist[inde] = temp.attr("data-val").replace(/\d+$/, "0");
				}
			});
		};
		var initValue = function () {
			var ssidIndex = f.index.value;
			$.get("/goform/WifiClientList?r=" + Math.random() + "&index=" + ssidIndex + "&wrlRadio=" + f.wrlRadio.value, function (str) {
				//ssid~MAC;IP;time;speed;bandwidth~
				var datas = str.split("\n");
				var tbd = document.getElementById("clientList"),
					sec = [
						[_("None")],
						['', _('WEP Open'), _('WEP Share')],
						[],
						['', _('WPA-PSK'), _('WPA-PSK'), _('WPA-PSK')]
					],
					i;
				if (datas.length == 1) {
					$("#clientList tr").remove();
					tbd.insertRow(0);
					tbd.rows[0].insertCell(0);
					tbd.rows[0].cells[0].setAttribute("colSpan", 5);
					tbd.rows[0].cells[0].innerHTML = _("No clients connected!");
				} else {
					$("#clientList tr").remove();
					for (i = 0; i < datas.length - 1; i++) {
						if (datas[i].split("\t").length < 4) continue;
						tbd.insertRow(i);
						tbd.rows[i].insertCell(0).innerHTML = i + 1;
						tbd.rows[i].insertCell(1).innerHTML = datas[i].split("\t")[0];
						tbd.rows[i].insertCell(2).innerHTML = datas[i].split("\t")[1] != "0.0.0.0" ? datas[i].split("\t")[1] : _("Unknow");
						tbd.rows[i].insertCell(3).innerHTML = timeStr(datas[i].split("\t")[2]);
						tbd.rows[i].insertCell(4).innerHTML = '<input type="button" class="addMac button" value="' + _("Add") + '">'
					}
					$("input.addMac").on("click", function () {
						var add_mac = this.parentNode.parentNode.childNodes[1].innerHTML;
						if (f.filterMode.selectedIndex == 0) {
							alert(_("Please select a filter mode!"));
							return;
						}
						if (flist.length > 15) {
							window.alert(_("Up to 16 MAC address entries can be configured!"));
							return;
						}
						for (var i = 0; i < flist.length; i++) {
							if (flist[i].substr(0, 17).toUpperCase() == add_mac) {
								window.alert(_("The specified MAC address already exists!"));
								return;
							}
						}
						flist.push(add_mac + ";1");
						showList();
					})
				}
			});
			$.get("/goform/WifiMacFilterGet?index=" + ssidIndex + "&wrlRadio=" + f.wrlRadio.value, function (str) {
				var datas = str.split("\r");
				flist = datas[2] ? datas[2].split("~") : [];
				if (datas[0] == "0") {
					f.filterMode.selectedIndex = 0;
					$("#filterTab").addClass("none");
				} else {
					$("#filterTab").removeClass("none");
					if (datas[1] == "1") {
						f.filterMode.selectedIndex = 1;
					} else {
						f.filterMode.selectedIndex = 2;
					}
				}
				showList();
			});
		}
		$("#head").html(tbl_head(8));
		$("#tail").html(tbl_tail("wl_filter"));
		initSsidHtml();
		$("select[name=index]").change(initValue);
		var url = window.location.toString().split("?"),
			indexed;

		if (url.length != 1 && url[1].split("=")[0] == 'index') {
			indexed = url[1].split("=")[1];
		} else {
			indexed = 0;
		}
		f.index.value = indexed;
		initValue();
		$("#filterMode").change(function () {
			if (this.value == "disabled") {
				$("#filterTab").hide();
			} else {
				$("#filterTab").show();
			}
		});
		$("input:text[name^=mac]").keyup(function (e) {
			var ind = this.name.match("\\d")[0];
			if (e.keyCode == 8 && this.value == "") {
				if (ind - 1 > 0) {
					if (f["mac" + (ind - 1)].createTextRange) {
						var range = f["mac" + (ind - 1)].createTextRange(),
							pos = f["mac" + (ind - 1)].value.length;
						range.collapse(true);
						range.moveEnd('character', pos);
						range.moveStart('character', pos);
						range.select();
					} else {
						f["mac" + (ind - 1)].focus();
					}
				}
			}
			this.value = this.value.replace(/[^0-9a-fA-F]/g, '')
			if (this.value.length == 2) {
				$(this).next("input").focus();
			}
		});
		$("#add").click(addMac);
	}
	if (bodyId == "qvlan") {
		$("#head").html(tbl_head(22));
		$("#tail").html(tbl_tail("wl_qvlan"));

		var qvlanStr = "",
			i = 1;
		for (i = 1; i <= maxSsidNum; i++) {
			qvlanStr += '<tr id="qvlan_' + i + '">' +
				'<td id="ssid' + i + '" align="right" class="pr40"></td>' +
				'<td class="pl10"><input type="text" name="qvlan' + i + '" id="qvlan' + i + '" size="4" maxlength="4"></td>' +
				'</tr>';
		}

		$("#qvlan_set").html(qvlanStr);
		qvlanStr = "";
		for (i = 1; i <= maxSsidNum_5g; i++) {
			qvlanStr += '<tr id="qvlan_' + i + '_5g">' +
				'<td id="ssid' + i + '_5g" align="right" class="pr40"></td>' +
				'<td class="pl10"><input type="text" name="qvlan' + i + '_5g" id="qvlan' + i + '_5g" size="4" maxlength="4"></td>' +
				'</tr>';
		}

		$("#qvlan_set_5g").html(qvlanStr);

		if (maxSsidNum_5g == "0") {
			$("#qvlan_set_5g").parent().css("display", "none");
		} else {
			$("#qvlan_set_5g").parent().css("display", "");
		}

		var trunk_str = "",
			lan_port_str = "",
			check,
			lanvlan;
		for (var i = 0; i < top.CONFIG_MAX_LAN_PORT_NUMBER; i++) {
			//check = trunkport.split(";")[i] == "1" ? true : false;
			lanvlan = lan_vlans.split(",");
			trunk_str += '<label for="port' + i + '" class="radio"><input type="checkbox" id="port' + i + '" name="port' + i + '" >LAN' + i + '</label>';
			lan_port_str += '<tr>' +
				'<td align="right" class="w150 pr40">LAN' + i + '</td>' +
				'<td class="pl10">' +
				'<input type="text" name="lan_qvlan' + i + '" id="lan_qvlan' + i + '" size="4" maxlength="4" value="' + lanvlan[i] + '">' +
				'</td>' +
				'</tr>';
		}
		$("#port_trunk").html(trunk_str);
		$("#lan_port_wrap").html(lan_port_str);
		for (var i = 0; i < top.CONFIG_MAX_LAN_PORT_NUMBER; i++) {
			check = trunkport.split(";")[i] == "1" ? true : false;
			$("[id='port" + i + "']")[0].checked = check;
			if (check == true) {
				$("#lan_qvlan" + i).attr("disabled", true);
			} else {
				$("#lan_qvlan" + i).removeAttr("disabled");
			}
		}

		$(":checkbox[id^=port]").click(function () {
			var clicktrunk = this.id;
			var lanId = "lan_qvlan" + clicktrunk.charAt(4);
			if (this.checked == true) {
				$("#" + lanId).attr("disabled", true);
			} else {
				$("#" + lanId).removeAttr("disabled");
			}
		});
		if (top.CONFIG_MAX_LAN_PORT_NUMBER < 2) {
			$("#div_trunk").css("display", "none");
			$("#lan_port_wrap").parent().css("display", "none");
		}

		var ssidArry = [];
		ssidArry.push(ssid1, ssid2, ssid3, ssid4, ssid5, ssid6, ssid7, ssid8);
		var ssidEnArry = [];
		ssidEnArry.push(ssidOF1, ssidOF2, ssidOF3, ssidOF4, ssidOF5, ssidOF6, ssidOF7, ssidOF8);

		for (var i = 0; i < maxSsidNum; i++) {
			$("#" + ("ssid" + (i + 1))).text(decodeSSID(ssidArry[i]));
			if (ssidEnArry[i] == "1") {
				$("#" + ("qvlan" + (i + 1))).parent().parent().css("display", "");
			} else {
				$("#" + ("qvlan" + (i + 1))).parent().parent().css("display", "none");
			}
		}

		var ssidArry_5g = [];
		ssidArry_5g.push(ssid1_5g, ssid2_5g, ssid3_5g, ssid4_5g);
		var ssidEnArry_5g = [];
		ssidEnArry_5g.push(ssidOF1_5g, ssidOF2_5g, ssidOF3_5g, ssidOF4_5g);

		for (var i = 0; i < maxSsidNum_5g; i++) {
			$("#" + ("ssid" + (i + 1) + "_5g")).text(decodeSSID(ssidArry_5g[i]));
			if (ssidEnArry_5g[i] == "1") {
				$("#" + ("qvlan" + (i + 1) + "_5g")).parent().parent().css("display", "");
			} else {
				$("#" + ("qvlan" + (i + 1) + "_5g")).parent().parent().css("display", "none");
			}
		}

		$("#pvid").val(pvid);
		$("#manage_vlan").val(manage_vlan);

		if (curmode == 2) {
			$("#qvlan_" + (maxSsidNum)).css("display", "none");
		}
		if (curmode_5g == 2) {
			$("#qvlan_" + (maxSsidNum_5g) + "_5g").css("display", "none");
		}
		/*
		if(top.CONFIG_PRODUCT == "w45ap" || top.CONFIG_PRODUCT == "ap335" || top.CONFIG_PRODUCT == "ap515") {
			$("#div_pvid").css("display", "none");	
		}
		*/
		for (var i = 1; i <= maxSsidNum; i++) {
			f["qvlan" + i].value = qvlans.split(',')[i - 1];
		}

		for (var i = 1; i <= maxSsidNum_5g; i++) {
			f["qvlan" + i + "_5g"].value = qvlans_5g.split(',')[i - 1];
		}

		if (qvlan_en == 1) {
			f.qvlanEn.checked = true;
		} else {
			f.qvlanEn.checked = false;
		}
		//f.tag.value = vlan1tag;
		/*$("input[name=qvlan1]").on('focusout', function () {
			if (qvlan_en_5g == '1' && document.forms[0].qvlan1.value != qvlans.split(',')[0]) {
				if (!confirm(_('2.4GHz and 5GHz own the same main ssid VLAN ID, 5GHz Qvlan main ssid VLAN ID will be change too,are you continue?'))) {
					document.forms[0].qvlan1.value = qvlans.split(',')[0];
				}
			}
		});*/



	}
	if (bodyId == "qvlan_5g") {
		$("#head").html(tbl_head(22));
		$("#tail").html(tbl_tail("wl_qvlan"));

		var qvlanStr = "",
			i = 1;
		for (i = 1; i <= maxSsidNum_5g; i++) {
			qvlanStr += '<tr id="qvlan_' + i + '">' +
				'<td id="ssid' + i + '" align="right" class="pr40"></td>' +
				'<td class="pl10"><input type="text" name="qvlan' + i + '" size="4" maxlength="4"></td>' +
				'</tr>';
		}

		$("#qvlan_set").html(qvlanStr);
		var ssidArry = [];
		ssidArry.push(ssid1, ssid2, ssid3, ssid4);

		for (var i = 0; i < ssidArry.length; i++) {
			$("#" + ("ssid" + (i + 1))).text(decodeSSID(ssidArry[i]));
		}

		if (curmode == 2) {
			$("#qvlan_" + (maxSsidNum_5g - 1)).css("display", "none");
		} else {
			$("#qvlan_" + (maxSsidNum_5g - 1)).css("display", "");
		}

		for (var i = 1; i <= maxSsidNum_5g; i++) {
			f["qvlan" + i].value = qvlans.split(',')[i - 1];
		}
		if (qvlan_en == 1) {
			f.qvlanEn.checked = true;
		} else {
			f.qvlanEn.checked = false;
		}
		//f.tag.value = vlan1tag;

		$("input[name=qvlan1]").on('focusout', function () {
			if (qvlan_en_24 == '1' && document.forms[0].qvlan1.value != qvlans.split(',')[0]) {
				if (!confirm(_('2.4GHz and 5GHz own the same main ssid VLAN ID, 2.4GHz Qvlan main ssid VLAN ID will be change too,are you continue?'))) {
					document.forms[0].qvlan1.value = qvlans.split(',')[0];
				}
			}
		})
	}
});


function macAcc(e) {
	var curNode = e.target || e.srcElement,
		trNode = curNode.parentNode.parentNode;
	mac = trNode.cells[2].innerHTML,
	netType = trNode.cells[3].innerHTML
	ssid = $(curNode.parentNode.nextSibling).text(),
	secs = trNode.cells[7].innerHTML.split("/");
	if (f.wdsMac1.value == "" || f.workmode[2].checked == true) {
		f.ssid.value = ssid;
		f.channel.value = trNode.cells[5].innerHTML;
		f.nettype.value = netType;
		if (secs[0] == "none") {
			f.elements["secType"].value = 0;
		} else if (secs[0] == "WEP" || secs[0] == "wep") {
			f.elements["secType"].value = 1;
		} else if (secs[0] == "WPA" || secs[0] == "wpa") {
			f.elements["secType"].value = 2;
		} else if (secs[0] == "WPA2" || secs[0] == "wpa2") {
			f.elements["secType"].value = 3;
		} else {
			f.elements["secType"].value = 4;
		}
		if (secs[1] == "AES" || secs[1] == "aes") {
			f.cipher[0].checked = true;
		} else if (secs[1] == "TKIP" || secs[1] == "tkip") {
			f.cipher[1].checked = true;
		} else {
			f.cipher[2].checked = true;
		}
	}
	if (f.workmode[1].checked == true) {
		if (f.wdsMac1.value == "") {
			f.wdsMac1.value = mac;
		} else if (f.wdsMac2.value == "") {
			f.wdsMac2.value = mac;
		} else if (f.wdsMac3.value == "") {
			f.wdsMac3.value = mac;
		} else {
			f.wdsMac4.value = mac;
		}
		f.band_width.value = curNode.parentNode.parentNode.childNodes[4].innerHTML;
		f.extend_channel.value = curNode.parentNode.parentNode.childNodes[6].innerHTML;
	} else {
		f.upMac.value = mac;
	}
	onChangeSec();
}

function onChangeSec() {
	var idx = document.forms[0].elements["secType"].selectedIndex,
		wepidx = document.forms[0].wepSecOpt.selectedIndex;
	var bodyId = document.body.id;
	document.getElementById("wpaPasswd").className = "";
	$("#wepAuth").addClass("none");
	if (idx == 0) {
		$("#div_wep,#div_wpa,#div_802").addClass("none");
	} else if (idx == 1) {
		$("#wepAuth").removeClass("none");
		if (wepidx == 0 || wepidx == 1) {
			$("#div_wep").removeClass("none");
			$("#div_wpa,#div_802").addClass("none");
		} else {
			$("#div_802").removeClass("none");
			$("#div_wpa,#div_wep").addClass("none");
		}
	} else if (idx == 2 || idx == 3 || idx == 4) {
		$("#div_wpa").removeClass("none");
		$("#div_wep,#div_802").addClass("none");
		if (bodyId == "basic") {
			f.keyPeriod.value = wpa_psk_key_time;
		}
		if (idx == 2) {
			f.cipher[2].disabled = true;
			if (f.cipher[2].checked) {
				f.cipher[2].checked = false;
				f.cipher[0].checked = true;
			}
		} else {
			f.cipher[2].disabled = false;
		}
	} else {
		$("#div_802,#div_wpa").removeClass("none");
		$("#div_wep,#wpaPasswd").addClass("none");
		if (bodyId == "basic") {
			f.keyPeriod.value = wpa_key_time;
		}
	}
	$("select[name=wepSecOpt]").change(function () {
		if (this.selectedIndex == 2) {
			$("#div_wep").addClass("none");
			$("#div_802").removeClass("none");
		} else {
			$("#div_wep").removeClass("none");
			$("#div_802").addClass("none");
		}
	});
}

function checkSec() {
	var securitymode = f.secType.value,
		keyvalue;
	if (securitymode == "1" && f.wepSecOpt.value != "802.1x") {
		var defaultid = f.wep_default_key.value,
			keylength;
		keyvalue = f["wep" + defaultid].value;
		if (keyvalue.length == 0) {
			alert(_('Please enter the WEP key %s', [defaultid]));
			return false;
		}
		for (var i = 1; i < 5; i++) {
			keylength = f["wep" + i].value.length;
			if (keylength != 0) {
				if (f["WEP" + i + "Select"].options.selectedIndex == 0) {
					if (keylength != 5 && keylength != 13 || !/^[\x00-\xff]+$/.test(f["wep" + i].value)) {
						alert(_('WEP key %s is invalid! Please enter 5 or 13 ASCII characters!', [i]));
						return false;
					}
				} else {
					if (keylength != 10 && keylength != 26 || !/^[0-9a-fA-F]+$/.test(f["wep" + i].value)) {
						alert(_('WEP key %s is invalid! Please enter 10 or 26 Hex characters.', [i]));
						return false;
					}
				}
				if (f["wep" + i].value.indexOf("\\") != -1) {
					alert(_("Invalid WEP security key %s. %s can't be included.", [i, "\\"]));
					return false;
				}
			}
		}

	} else if ((securitymode == "1" && f.wepSecOpt.value == "802.1x") || securitymode == "5" || securitymode == "6") {
		var x;
		if (!checkIp(f.radius_svrip, _("RADIUS Server IP"))) {
			return false;
		}
		x = Number(f.radius_port.value);
		f.radius_port.value = x;
		if (isNaN(f.radius_port.value) || f.radius_port.value < 1025 || f.radius_port.value > 65535 || !/^[1-9]\d*$/.test(f.radius_port.value)) {
			f.radius_port.value = '';
			alert(_("Please enter valid RADIUS port number!"));
			return false;
		}
		if (!/^[\x00-\xff]{1,64}$/.test(f.radius_pass.value)) {
			alert(_("Please enter valid RADIUS Password!"));
			return false;
		}
	} else if (securitymode == "2" || securitymode == "3" || securitymode == "4") {
		keyvalue = f.passphrase.value;
		if (!(/^[\x00-\x7f]{8,63}$/i.test(keyvalue) || /^[0-9a-f]{64}$/i.test(keyvalue))) {
			alert(_('Please enter 8-64 Hex characters or 8-63 ASCII characters.'));
			return false;
		}
		if (keyvalue.indexOf("\\") != -1) {
			alert(_("Invalid security key. %s can't be included.", ["\\"]));
			return false;
		}
	}
	return true;
}

function wdsScan() {
	if (this.value == _("Enable Scan")) {
		this.value = _("Disable Scan");
		this.disabled = true;
		$.get("/goform/wifiWDS?radio=" + f.wrlRadio.value + "&" + Math.random(), function (data) {
			document.getElementById("wlScan").disabled = false;
			var str1 = data.split("\r"),
				len = str1.length,
				scanStr = '<tr class="a3">' +
				'<td width="40">' + _("Select") + '</td>' +
				'<td id="ssidVal">' + _("SSID") + '</td>' +
				'<td width="130">' + _("MAC Address") + '</td>' +
				'<td width="50">' + _("Network Mode") + '</td>' +
				'<td width="85" id="ap_band">' + _("Channel Bandwidth") + '</td>' +
				'<td width="50" id="channelVal">' + _("Channel") + '</td>' +
				'<td width="85" id="ap_extend">' + _("Extension Channel") + '</td>' +
				'<td width="130">' + _("Security") + '</td>' +
				'<td width="90" id="strength">' + _("Signal Strength") + '</td></tr>',
				i = 0;
			for (i = 0; i < len; i++) {
				var str = str1[i].split("\t"),
					signalClass = Number(str[5]) + 100;
				if (str.length < 6) {
					continue;
				}
				if (f.wrlRadio.value == '2.4G' && str[2] > 13) {
					continue;
				} else if (f.wrlRadio.value == '5G' && (str[2] > 165 || str[2] < 36)) {
					continue;
				}
				if (signalClass <= 14) { //20
					signalClass = "signal1";
				} else if (signalClass <= 24) { //40
					signalClass = "signal2";
				} else if (signalClass <= 34) { //60
					signalClass = "signal3";
				} else if (signalClass <= 44) { //80
					signalClass = "signal4";
				} else {
					signalClass = "signal5";
				}
				if (document.body.id == "mode") {
					scanStr += '<tr><td><input type="radio" name="wlSelect" onclick="macAcc(event)"/></td>'
				} else {
					scanStr += '<tr><td><input type="radio" name="wlSelect" onclick="macSel(this)"/></td>'
				}
				scanStr += '<td>' + toHtmlCode(str[0]) + '</td><td>' + str[1] + '</td><td>' + str[7] + '</td><td>' + str[3] + '</td><td>' + str[2] + '</td><td>' + str[6] + '</td><td>' + str[4] + '</td><td class="' + signalClass + '">' + str[5] + 'dBm</td></tr>'

			}
			$("#wlScanTab").html(scanStr).show();
			$("#ssidVal,#channelVal,#strength").click(function () {
				var temp = new Array(),
					//obj = document.getElementById("wlScanTab").getElementsByTagName("tbody")[0], //获取当前页的表格
					objs = $("#wlScanTab tr:gt(0)"), //obj.childNodes　　　//获取表格的第一级子元素
					id = $(this).attr("id"),
					arr = objs.map(function (a) {
						if (id == "ssidVal")
							return $(this).children("td:eq(1)").html();
						else if (id == "channelVal")
							return parseInt($(this).children("td:eq(5)").html());
						else
							return parseInt($(this).children("td:eq(8)").html());
					});
				//遍历表格子元素的
				for (i = 0; i < objs.length; i++) {　　　
					temp[i] = new Array(arr[i], objs[i]);
				}
				if (arr[0] > arr[objs.length - 1] && typeof temp[0][0] == "number")
					temp.sort(function (a, b) {
						return a[0] - b[0]
					});　　 //进行排序-自定义排序方法sort
				else if (arr[0] <= arr[objs.length - 1] && typeof temp[0][0] == "number")
					temp.sort(function (a, b) {
						return b[0] - a[0]
					});
				else if (arr[0].localeCompare(arr[objs.length - 1]) > 0)
					temp.sort();
				else
					temp.sort().reverse();
				for (var i = 0; i < temp.length; i++)　　 $("#wlScanTab").append(temp[i][1]);　　　　　　　　　　 //将排序结果重新添加到表格中
			});
		})
	} else {
		this.value = _("Enable Scan");
		$("#wlScanTab").hide();
	}
}

function channelScan() {
	//$("#wlScanTab").toggleClass("none");
	if (this.value == _("Enable Scan")) {
		this.value = _("Disable Scan");
		this.disabled = true;
		$.get("/goform/wifiWDS?radio=" + f.wrlRadio.value + "&" + Math.random(), function (data) {
			document.getElementById("wlScan").disabled = false;
			var str1 = data.split("\r"),
				len = str1.length,
				scanStr = '<tr class="a3">' +
				'<td width="30">' + _("ID") + '</td>' +
				'<td id="ssidVal">' + _("SSID") + '</td>' +
				'<td width="130">' + _("MAC Address") + '</td>' +
				'<td width="60">' + _("Network Mode") + '</td>' +
				'<td width="50" id="channelVal">' + _("Channel") + '</td>' +
				'<td width="65">' + _("Bandwidth") + '</td>' +
				'<td width="130">' + _("Security") + '</td>' +
				'<td width="90" id="strength">' + _("Signal Strength") + '</td></tr>', //Channel Bandwidth
				i = 0;
			for (i = 0; i < len; i++) {
				var str = str1[i].split("\t"),
					signalClass = Number(str[5]) + 100;
				if (str.length < 6) {
					continue;
				}
				if (f.wrlRadio.value == '2.4G' && str[2] > 13) {
					continue;
				} else if (f.wrlRadio.value == '5G' && (str[2] > 165 || str[2] < 36)) {
					continue;
				}
				if (signalClass <= 14) { //20
					signalClass = "signal1";
				} else if (signalClass <= 24) { //40
					signalClass = "signal2";
				} else if (signalClass <= 34) { //60
					signalClass = "signal3";
				} else if (signalClass <= 44) { //80
					signalClass = "signal4";
				} else {
					signalClass = "signal5";
				}

				scanStr += '<tr><td>' + (i + 1) + '</td>'
				scanStr += '<td>' + toHtmlCode(str[0]) + '</td><td>' + str[1] + '</td><td>' + str[7] + '</td><td>' + str[2] + '</td><td>' + str[3] + '</td><td>' + str[4].replace('_', " ") + '</td><td class="' + signalClass + '">' + str[5] + 'dBm</td></tr>'
			}
			$("#wlScanTab").html(scanStr).show();
			$("#ssidVal,#channelVal,#strength").click(function () {
				var temp = new Array(),
					objs = $("#wlScanTab tr:gt(0)"), //获取表格的第一级子元素
					id = $(this).attr("id"),
					arr = objs.map(function (a) {
						if (id == "ssidVal")
							return $(this).children("td:eq(1)").html();
						else if (id == "channelVal")
							return parseInt($(this).children("td:eq(4)").html());
						else
							return parseInt($(this).children("td:eq(7)").html());
					});
				//遍历表格子元素的
				for (i = 0; i < objs.length; i++) {　　　
					temp[i] = new Array(arr[i], objs[i]);
				}
				if (arr[0] > arr[objs.length - 1] && typeof temp[0][0] == "number")
					temp.sort(function (a, b) {
						return a[0] - b[0]
					});　　 //进行排序-自定义排序方法sort
				else if (arr[0] <= arr[objs.length - 1] && typeof temp[0][0] == "number")
					temp.sort(function (a, b) {
						return b[0] - a[0]
					});
				else if (arr[0].localeCompare(arr[objs.length - 1]) > 0)
					temp.sort();
				else
					temp.sort().reverse();
				for (var i = 0; i < temp.length; i++)　　 $("#wlScanTab").append(temp[i][1]);　　　　　　　　　　 //将排序结果重新添加到表格中
			});
		})
	} else {
		this.value = _("Enable Scan");
		this.disabled = false;
		$("#wlScanTab").hide();
	}
}

function macSel(th) {
	if (!confirm(_("Are you sure to connect to this AP?"))) {
		return;
	}
	var mac = $(th.parentNode).siblings("td:eq(1)").html(),
		ssid = $(th.parentNode).siblings("td:eq(0)").html();
	//mac = tbl.rows[r - 1].cells[2].innerHTML;
	//ssid = tbl.rows[r - 1].cells[1].innerHTML;
	if (f.wds_1.value == "") {
		f.wds_1.value = mac;
	} else if (f.wds_2.value == "") {
		f.wds_2.value = mac;
	} else if (f.wds_3.value == "") {
		f.wds_3.value = mac;
	} else {
		f.wds_4.value = mac;
	}
}

function checkRssiData(obj, str, s, e) {
	if (obj.value == "") {
		alert(_("Please enter %s!", [str]));
		return false;
	}
	if ((+obj.value) < s || (+obj.value) > e || !/^[-0-9]\d*$/.test(obj.value)) {
		alert(_("%s is invalid %s range: %s ~ %s.They must be round numbers!", [str, str, s, e]));
		return false;
	}
	return true;
}

function checkData(obj, str, s, e) {
	if (obj.value == "") {
		alert(_("Please enter %s!", [str]));
		return false;
	}
	if (isNaN(obj.value) || obj.value < s || obj.value > e || !/^[1-9]\d*$/.test(obj.value)) {
		alert(_("%s is invalid %s range: %s ~ %s.They must be round numbers!", [str, str, s, e]));
		return false;
	}
	return true;
}

function CheckValue() {
	var checkSsid = function () {
			var re = /^[^\\]+$/, //[^\<\>,;"%&]
				sid = f.ssid.value,
				num = sid.match(/([\u4E00-\u9FA5])/g);
			if (sid == "") {
				alert(_("Please enter SSID!"));
				return false;
			}
			//	if (!re.test(sid)) {//modify by zhangli 2016-3-14
			//		alert(_("SSID includes invalid characters: %s", ["\\"]));
			//		return false;
			//	}
			if (num && (sid.length + num.length * 2) > 32) {
				alert(_("SSID can only include up to 32 characters!"));
				return false;
			}
			return true;
		},
		i, j;
	if (document.body.id == "mode") {
		if (f.workmode[3].checked == false) {
			if (!checkSec()) {
				return false;
			}
			if (!checkSsid()) {
				return false;
			}
		}
		if (f.workmode[1].checked == true) {
			var maclist = [];
			if (f.wdsMac1.value == "" && f.wdsMac2.value == "" && f.wdsMac3.value == "" && f.wdsMac4.value == "") {
				alert(_("Please enter a MAC address!"));
				return false;
			}
			for (i = 1; i < 5; i++) {
				for (j = i + 1; j < 5; j++) {
					if (f["wdsMac" + i].value != "" && f["wdsMac" + i].value == f["wdsMac" + j].value) {
						alert(_("This MAC address already exists! Please enter a new one!"));
						f["wdsMac" + j].value = "";
						return false;
					}
				}
			}
			for (i = 1; i < 5; i++) {
				if (f["wdsMac" + i].value != "" && !checkMAC(f["wdsMac" + i].value)) {
					return false;
				}
				if (f["wdsMac" + i].value != "") {
					maclist.push(f["wdsMac" + i].value);
				}
			}
			f.wdslist.value = maclist.join(" ");
			for (i = maclist.length; i < 5; i++) {
				f.wdslist.value += " "
			}
			f.wdslist.value = f.wdslist.value.toUpperCase();

			f.extend_wl.value = f.extend_channel.value;
		}
		if (f.MPPE.checked == true) {
			f.pppMPPE.value = 1;
		} else {
			f.pppMPPE.value = 0;
		}
		if (f.workmode[2].checked == true) {

			/*if (f.upMac.value == "") {
				alert(_("Please enter a valid MAC address!"));
				return false;
			}
			if(f.upMac.value != "" && !checkMAC(f.upMac.value)) {
				return false;
			}
			f.wdslist.value = f.upMac.value.toUpperCase() + "~~~";
			*/
		}
		if (f.workmode[3].checked == true) {
			var ppoeUser = f.pppoeName.value,
				ppoePwd = f.pppoePwd.value,
				ppoeMtu = f.pppoeMTU.value;
			var mtu_reg = /^[0-9]{1,}$/;
			if (ppoeUser == "" || ppoePwd == "") {
				alert(_("Please enter a valid user name or password!"));
				return false;
			}
			if (/[\\]/g.test(ppoeUser) || /[\\]/g.test(ppoePwd)) {
				alert(_("%s is not allowed included in username and password!", ["\\"]));
				return false;
			}
			if (ppoeMtu == "" || !mtu_reg.test(ppoeMtu) || (ppoeMtu > 1492) || (ppoeMtu < 256)) {
				alert(_("Please enter a MTU value between 256 and 1492."));
				return false;
			}
		}
		return true;
	}
	if (document.body.id == "basic") {
		var tmp = 0;
		/*for (var i = 0; i < 8; i++) {
			if (f.index.value == i && f.enable.checked == true) {
				tmp += +f.maxclients.value;
			} else if (clientNum[i].split("~")[0] == 1) {
				tmp += +clientNum[i].split("~")[1];
			}
		}*/
		if (!checkSsid()) {
			return false;
		}
		var ssid_arry = [];
		if (f.wrlRadio.value == '2.4G') {
			ssid_arry.push(ssid1, ssid2, ssid3, ssid4, ssid5, ssid6, ssid7, ssid8);
		} else {
			ssid_arry.push(ssid1, ssid2, ssid3, ssid4);
		}

		for (var i = 0; i < ssid_arry.length; i++) {
			if (f.ssid.value == decodeSSID(ssid_arry[i]) && i != f.index.value) {
				alert(_("SSID can not be same with same band other SSID"));
				return false;
			}
		}
		if (f.enable.checked == true) {
			tmp = parseInt(f.maxclients.value, 10) + parseInt(clientNum, 10);
		} else {
			tmp = parseInt(clientNum, 10);
		}
		/*
		if (tmp > 128) {
			alert(_("Total maximum clients should be within 128!"));
			return false;
		}
		*/

		if (!checkData(f.maxclients, _("Limit numbers of client"), 1, maxClientNum)) {
			return false;
		}
		if (f.enable.checked == true) {
			f.enableWireless.value = 1;
		} else {
			f.enableWireless.value = 0;
		}
		if (f.hideSsid.checked == true) {
			f.broadcast.value = 2;
		} else {
			f.broadcast.value = f.broadcastSsid.value;
		}
		if (!checkSec()) {
			return false;
		}
		if (!(f.secType.value == 0 || (f.secType.value == 1 && f.wepSecOpt.value == "802.1x"))) {
			var x = Number(f.keyPeriod.value);
			f.keyPeriod.value = x;
			if (isNaN(x) || (x < 60 && x != 0) || !/^[0-9]\d*$/.test(x)) {
				f.keyPeriod.value = '';
				alert(_('Key Update Interval must be either 0 or 60~99999!'));
				return false;
			}
		}
		return true;
	}
	if (document.body.id == "radio") {
		if (f.wlRadio.checked == true) {
			f.radioEnable.value = 1;
		} else {
			f.radioEnable.value = 0;
		}
		f.hidden_channel.value = f.channel.value;
		if (f.bandwidth[0].checked == true) {
			f.hidden_bandwidth.value = f.bandwidth[0].value;
		} else if (f.bandwidth[1].checked == true) {
			f.hidden_bandwidth.value = f.bandwidth[1].value;
		} else if (f.bandwidth[2].checked == true) {
			f.hidden_bandwidth.value = f.bandwidth[2].value;
		} else {
			f.hidden_bandwidth.value = f.bandwidth[3].value;
		}
		if (!$("#channelExtra").hasClass("none"))
			f.hidden_ext.value = f.extra.value;
		else
			f.hidden_ext.value = "none";
		f.hidden_country.value = f.country.value;
		f.hidden_netmode.value = f.wirelessmode.value;

		return true;
	}
	if (document.body.id == "qvlan") {
		var qvlan = "";
		for (var i = 1; i <= maxSsidNum; i++) {
			qvlan += f["qvlan" + i].value + ",";
		}
		qvlan = qvlan.replace(/[,]$/, "");

		var trunk = [];
		var trunk_ok = false;
		for (var i = 0; i < top.CONFIG_MAX_LAN_PORT_NUMBER; i++) {
			trunk.push((!!$('#port' + i).attr('checked')) ? 1 : 0);
			if (trunk[i] == 1) {
				trunk_ok = true;
			}
		}
		f.trunkport.value = trunk.join(";");
		if ((qvlan_en == 0 && f.qvlanEn.checked == false)) {
			alert(_("The VLAN feature is disabled,  please check the settings"));
			return false;
		}

		var vlanArr = lan_vlans.split(",");
		var changeFlag = false;
		if (f.lan_qvlan0.value == vlanArr[0] && f.lan_qvlan1.value == vlanArr[1]) {
			changeFlag = true;
		}

		if (qvlan_en == 1 && qvlan == qvlans.replace(/[,]+$/, "") && f.qvlanEn.checked == true && pvid == f.pvid.value && manage_vlan == f.manage_vlan.value && f.trunkport.value == trunkport && changeFlag) {
			alert(_("The settings isn't modified, you don't need to save the settings"));
			return false;
		}

		if (f.qvlanEn.checked == true) {
			if (trunk_ok == false) {
				alert(_("Please select one LAN port to work in trunk mode at least!"));
				return false;
			}
			/*var qvlan1,
					qvlan2,
					ssid1_qvlan,
					qvlanIndex = 0;*/ //判断QVLAN是否一致
			f.qvlanEnlan.value = 1;
			//ssid1_qvlan = Number(f.qvlan1.value);
			for (var i = 1; i <= maxSsidNum; i++) {
				/*qvlan1 = f["qvlan" + i].value;
				if (ssid1_qvlan == qvlan1) {
					qvlanIndex += 1;
				}*/
				if (!checkData(f["qvlan" + i], "QVLAN", 1, 4094)) {
					return false;
				}
			}

			for (var i = 1; i <= maxSsidNum_5g; i++) {
				/*qvlan1 = f["qvlan" + i].value;
				if (ssid1_qvlan == qvlan1) {
					qvlanIndex += 1;
				}*/
				if (!checkData(f["qvlan" + i + "_5g"], "QVLAN", 1, 4094)) {
					return false;
				}
			}

			for (var i = 0; i < top.CONFIG_MAX_LAN_PORT_NUMBER; i++) {

				if (!checkData(f["lan_qvlan" + i], "QVLAN", 1, 4094)) {
					return false;
				}
			}

			if (!checkData(f.pvid, "QVLAN", 1, 4094)) {
				return false;
			}
			if (!checkData(f.manage_vlan, "QVLAN", 1, 4094)) {
				return false;
			}

			/*
			if (qvlanIndex == maxSsidNum) {
				alert(_("All the VLAN ID is the same, please tag different VLAN ID for different SSID"));
				return false;
			}
			*/
		} else {
			f.qvlanEnlan.value = 0;
		}

		if (confirm(_("If save the configurations, the device will reboot immediately. Are you sure to reboot?"))) {
			return true;
		} else {
			return false;
		}

	}

	if (document.body.id == "qvlan_5g") {
		var qvlan;
		qvlan = "";
		for (var i = 1; i <= maxSsidNum_5g; i++) {
			qvlan += f["qvlan" + i].value + ",";
		}
		qvlan = qvlan.replace(/[,]$/, "");

		if ((qvlan_en == 0 && f.qvlanEn.checked == false) ||
			(qvlan_en == 1 && qvlan == qvlans && f.qvlanEn.checked == true /*&& f.tag.value == vlan1tag*/ )) {
			alert(_("QVLAN disabled or no changes, please do not save again!"));
			return false;
		}
		if (f.qvlanEn.checked == true) {
			f.qvlanEnlan.value = 1;
			for (var i = 1; i <= maxSsidNum_5g; i++) {
				if (!checkData(f["qvlan" + i], "QVLAN", 1, 4094)) {
					return false;
				}
			}
		} else {
			f.qvlanEnlan.value = 0;
		}
		if (confirm(_("If save the configurations, the device will reboot immediately. Are you sure to reboot?"))) {
			return true;
		} else {
			return false;
		}

	}
	if (document.body.id == "wds") {
		var maclist = [];
		if (enablewireless == 0 && f.wrlRadio.value == '2.4G') {
			alert(_("Please enable 2.4GHz network!"));
			return false;
		}
		if (enablewireless == 0 && f.wrlRadio.value == '5G') {
			alert(_("Please enable 5GHz network!"));
			return false;
		}
		if (f.wds_mode.value != 0) {
			if (f.wds_1.value == "" && f.wds_2.value == "" && f.wds_3.value == "" && f.wds_4.value == "") {
				alert(_("Please enter MAC address!"));
				return false;
			}
		}
		for (i = 1; i < 5; i++) {
			for (j = i + 1; j < 5; j++) {
				if (f["wds_" + i].value != "" && f["wds_" + i].value == f["wds_" + j].value) {
					alert(_("Please enter different MAC addresses!"));
					f["wds_" + j].value = "";
					return false;
				}
			}
		}
		for (i = 1; i < 5; i++) {
			if (f["wds_" + i].value != "" && !checkMAC(f["wds_" + i].value)) {
				return false;
			}
			if (f["wds_" + i].value != "") {
				maclist.push(f["wds_" + i].value);
			}
		}
		f.wdslist.value = maclist.join("~");
		for (i = maclist.length; i < 5; i++) {
			f.wdslist.value += "~"
		}
		f.wdslist.value = f.wdslist.value.toUpperCase();
		return true;
	}
	if (document.body.id == "advance") {
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
		if (!checkRssiData(f.RSSI, _("Receive Signal Strength"), -90, -60)) {
			return false;
		}

		if (f.wrlRadio.value == '2.4G') {
			var rebootTag = false;
			if (($("[name='penetration']:checked").val() != f.reboot.value) && f.reboot.value != "") {
				rebootTag = true;
			} else {
				rebootTag = false;
			}

			if (rebootTag) {
				if (!confirm(_("Devices requiring a reboot to apply the change, reboot it now?"))) {
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
	if (document.body.id == "filter") {
		var i = 0,
			len = flist.length,
			listIndex = 0;
		if (f.filterMode.selectedIndex == 1) {
			if (flist.length == 0) {
				alert(_("You must allow the feature or specify a rule!"));
				return false;
			}
			for (i = 0; i < len; i++) {
				listIndex += parseInt(flist[i].split(";")[1], 10);
			}
			if (listIndex == 0) {
				alert(_("You must allow the feature or specify a rule!"));
				return false;
			}
		}
		if (flist.length == 0 && f.filterMode.selectedIndex == 2) {
			//alert(_("You must disable the feature or specify a rule!"));
			//return false;
		}
		document.getElementById("maclist").value = flist.join("~");
		return true;
	}
}

function preSubmit() {
	var bodyId = document.body.id;
	var ssid_arry = [];
	if (parent.userType == "user") {
		alert(_("You must log in as an administrator to make any change."));
		return false;
	}
	if (bodyId == "mode") {
		if (enableCliNum > 128) {
			alert(_("When saved, the first SSID will be enabled and you should modify the permitted numbers of clients!"));
			return false;
		}
		if (f.workmode[0].checked == true) {
			if (f.wrlRadio.value == '2.4G') {
				ssid_arry = [];
				ssid_arry.push(g2_ssid2, g2_ssid3, g2_ssid4, g2_ssid5, g2_ssid6, g2_ssid7, g2_ssid8);
			} else {
				ssid_arry = [];
				ssid_arry.push(g5_ssid2, g5_ssid3, g5_ssid4);
			}

			/*
			for (var i = 0; i < ssid_arry.length; i++) {
				if(f.ssid.value == ssid_arry[i]) {
					alert(_("SSID can not be same with other SSID"));
					return false;   
				}   
			}*/
		}
	}
	if (CheckValue()) {
		f.submit();
	}
}

function interference_value() {
	if (top.CONFIG_CHIP_MODEL == "bcm5356c0" || top.CONFIG_CHIP_MODEL == "bcm47186") {
		if ($("[name=deploy]:checked").val() == "0") {
			$("#inter").val("2");
			$("#inter").attr("disabled", true);
		} else if ($("[name=deploy]:checked").val() == "1") {
			$("#inter").val("2");
			$("#inter").attr("disabled", false);
		} else {
			$("#inter").val("2");
			$("#inter").attr("disabled", true);
		}
	} else {
		if ($("[name=deploy]:checked").val() == "0") {
			$("#inter").val("2");
			$("#inter").attr("disabled", true);
		} else if ($("[name=deploy]:checked").val() == "1") {
			$("#inter").val("2");
			$("#inter").attr("disabled", false);
		} else {
			$("#inter").val("2");
			$("#inter").attr("disabled", true);
		}
	}
}
/**
 * 将html标符转换为页面可显示的安全字符
 * @param  {String} str 需要转换html tag的字符串
 * @return {[type]}     转换过html tag的字符
 */
function toHtmlCode(str) {
	if (typeof str != "string") {
		return str;
	} else {
		return str ? str.replace(/[<>\"]/g, function (char) {
			switch (char) {
			case '<':
				return '&lt;'
			case '>':
				return '&gt;'
			case '"':
				return '&quot;'
			}
		}) : '';
	}
}