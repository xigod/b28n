var f = document.forms[0];
var maxPower = "",
    minPower = "",
    defPower = "";
var defInteference = "";
$(function () {
    var ret1 = "",
        ret2 = "";
    var advance = {
        init: function () {
            initHeadTail(9, "wl_advance");
            $("#btnsubmit").removeAttr('onClick');
            advance.initHtml();
            advance.initValue();
            advance.initEvent();
        },

        initHtml: function () {
            var product_num = "";
            if (top.CONFIG_PRODUCT != "ap355") {
                product_num = parseInt(top.CONFIG_PRODUCT.slice(1, 4), 10);
            }
            if (top.CONFIG_PRODUCT == "ap365" || top.CONFIG_PRODUCT == "ap355" || product_num == "65" || product_num == "75" || product_num == "85" || top.CONFIG_PRODUCT == "i21") {
                $("#interface-set").css("display", "");
            } else {
                $("#interface-set").css("display", "none");
            }

        },

        initValue: function () {

            var configDeploy = /w50ap|ap340/gi.test(top.CONFIG_PRODUCT.toLowerCase()),
                configTransmission = /w10ap|w15ap|w18ap|w30ap|w16ap|ap255|ap205|ap235/gi.test(top.CONFIG_PRODUCT.toLowerCase());

            if(top.CONFIG_INTERFERENCE_MODE == 'n') {
                $("#interface-set").addClass('none');
            } else {
                $("#interface-set").removeClass('none');
            }
            
            $.getJSON("/goform/getWrlRadioUpInfo?random=" + Math.random() + "&radio=" + top.RADIO, function (str) {
                var data = str;
                var helpStr = "";
                top.GLOBAL.ssidEnCount = data.ssidEnCount;

                //初始interference helpInfo
                helpStr = _("(Range: 0 ~ 3; Default: %s)", [str.defInterference]);
                $("#inteferenceHelp").html(helpStr);
                //调用公共初始化函数
                inputData(data);
                maxPower = data.maxPower;
                minPower = data.minPower;
                defPower = data.defPower;

                if (+top.GLOBAL.ssidEnCount > 6) {
                	$("#beaconInfo").html( _("(Range: 200 ~ 999; Default: 200)"));
                }
                //初始化速率控制
                var spiteNodes = new Array();
                spiteNodes = str.supportBG.split(',');

                if (str.supportBG.indexOf('0') == -1 && str.supportBG != '') {
                    $(".selectAllSpite").eq(1).attr("checked", "checked");
                    $(".selectAllSpite").eq(1).attr("flag", "1");
                }

                for (var j = 0; j < 12; j++) {
                    if (spiteNodes[j] == "1") {
                        $("#basicRate2").children().eq(j).attr("checked", "checked");
                    }
                }

                var forceNodes = new Array();
                forceNodes = str.supportBGforce.split(',');

                if (str.supportBGforce.indexOf('0') == -1 && str.supportBGforce != '') {
                    $(".selectAllSpite").eq(0).attr("checked", "checked");
                    $(".selectAllSpite").eq(0).attr("flag", "1");
                }

                for (var j = 0; j < 12; j++) {
                    if (forceNodes[j] == "1") {
                        $("#forceSpite2").children().eq(j).attr("checked", "checked");
                    }
                }
                //隐藏穿墙能力和部署方式
                $('#Transmission').hide();
                $('#deploy_type').hide();
            });
        },
                
        initEvent: function () {

            $(".spiteList input[type='checkbox']").on("click", function () {
            	var name = this.name;
            	var selected = this.checked ? true : false;
 	            var _id = this.id;
            	var index = _id.split("-")[1];
            	//强制速率选项是否全部选中
            	var forceAllSelected = advance.checkboxAllSelected;
            	//支持速率选项是否全部选中
            	var supportAllSelected = advance.checkboxAllSelected;

            	switch (name) {
            		case "force":
            			//选中该复选框
            			if (selected) {
            				//如果所有强制选项都处于选中状态，则将所有checkbox置于选中状态。
	            			if (forceAllSelected("force")) {
	            				$(".spiteList").find("input[type='checkbox']").attr("checked", "checked");
	            			//将对应的支持速率置于选中状态；
	            			} else {
	            				$("#support-" + index).attr("checked", "checked");
	            			}

	            			if (supportAllSelected("support")) {
	            				//$("#support-all").attr("checked", "checked");
	            				$("support-" + index).click();
	            			}

            			} else {
            
            				$("#force-all").removeAttr("checked");
            			}

            			break;
            		case "force-all":
            			if (selected) {
            				$(".spiteList").find("input[type='checkbox']").attr("checked", "checked");
            			} else {
            				$("#forceSpite2").find("input[type='checkbox']").removeAttr("checked");
            			}
            			break;
            		case "support":
            			if (selected) {
            				//如果所有支持选项都处于选中状态，则将所有checkbox置于选中状态。
	            			if (supportAllSelected("support")) {
	            				$("#basicRate2").find("input[type='checkbox']").attr("checked", "checked");
	            			}

            			} else {
            				$("#support-all, #force-all, #force-" + index).removeAttr("checked");
            			}
            			break;
            		case "support-all":
            			//选中时所有支持速率置于选中状态
            			if (selected) {
            				$("#basicRate2").find("input[type='checkbox']").attr("checked", "checked");
            			} else {
            				$(".spiteList").find("input[type='checkbox']").removeAttr("checked");
            			}
            			break;
            	}
            });

            $("#btnsubmit").on('click', advance.preSubmit);
        },

        checkboxAllSelected: function (name) {
        	var allSelected = true;	
        	//判断是否都处于选中状态；
        	$("input[name='" +name+ "']").each (function () {
        		this.checked ? "" : (allSelected = false);
        		if (!allSelected) {
        			return false;
        		}
        	});
        	return allSelected;
        },

        checkValue: function () {
            var rebootTag = false;
            var beaconStartVal = +top.GLOBAL.ssidEnCount > 6 ? 200 : 100;
            ret1 = "";
            ret2 = "";

            if (!checkRssiData(f.beacon, _("Beacon Interval"), beaconStartVal, 999)) {
                return false;
            }
            if (!checkRssiData(f.fragment, _("Fragment Threshold"), 256, 2346)) {
                return false;
            }
            if (!checkRssiData(f.rts, _("RTS Threshold"), 1, 2347)) {
                return false;
            }
            if (!checkRssiData(f.dtim, _("DTIM Interval"), 1, 255)) {
                return false;
            }
            if (!checkRssiData(f.RSSI, _("Receive Signal Strength"), -90, -60)) {
                return false;
            }
            if (f.RSSI.value == '-') {
                alert(_("%s is invalid %s range: %s ~ %s.They must be round numbers!", [_("Receive Signal Strength"), _("Receive Signal Strength"), -90, -60]));
                return false;
            }

            if (Number(maxPower) > 18) {
                if ($("[name='penetration']:checked").val() != f.reboot.value) {
                    rebootTag = true;
                } else {
                    rebootTag = false;
                }
                if (rebootTag) {
                    if (!confirm(_("Devices requiring a reboot to apply the change, reboot it now?"))) {
                        return false;
                    }
                }
            }
            if (rebootTag) {
                f.reboot.value = "1";
            } else {
                f.reboot.value = "0";
            }
            if (advance.checkSupportSpite()) {
                var ret1Arr = ret1.split(','),
                    ret2Arr = ret2.split(',');

                f.supportBGforce.value = ret2.slice(0, ret2.length - 1);
                f.supportBG.value = ret1.slice(0, ret1.length - 1);
                return true;
            } else {
                return false;
            }
        },

        checkSupportSpite: function () {
            var needNodes = 0;
            for (var i = 0; i < 12; i++) {
                if ($("#basicRate2").children().eq(i).is(':checked')) {
                    ret1 += 1 + ",";
                } else {
                    ret1 += 0 + ",";
                }

                if ($("#forceSpite2").children().eq(i).is(':checked')) {
                    ret2 += 1 + ",";
                } else {
                    if (i == 0 || i == 1 || i == 2 || i == 5) {
                        needNodes++;
                    }
                    ret2 += 0 + ",";
                }
            }

            if (needNodes == 4) {
                alert(_("At least one basic rate option (1M, 2M, 5.5M or 11M) should be enabled."));
                return false;
            } else {
                return true;
            }
        },

        preSubmit: function () {
            if (permission()) {
                if (advance.checkValue()) {
                    submitData("goform/setWrlRadioUpInfo");
                }
            } else {
                return false;
            }
        }
    };
    advance.init();
});