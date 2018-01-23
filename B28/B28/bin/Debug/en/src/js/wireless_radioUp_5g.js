var f = document.forms[0];

$(function () {
    var ret1 = "",
        ret2 = "";
    var advance5g = {
        init: function () {
            initHeadTail(9, "wl_advance");
            $("#btnsubmit").removeAttr('onClick');
            advance5g.initHtml();
            advance5g.initValue();
            advance5g.initEvent();
        },

        initHtml: function () {},

        initValue: function () {
            $.getJSON("/goform/getWrlRadioUpInfo?random=" + Math.random() + "&radio=" + top.RADIO, function (str) {
                var data = str;

                top.GLOBAL.ssidEnCount = data.ssidEnCount;
                //调用公共初始化函数
                inputValue(data);
                if (+top.GLOBAL.ssidEnCount > 6) {
                    $("#beaconInfo").html(_("ms (Range: 200 to 999; Default: 200)"));
                }

                //初始化速率控制
                var spiteNodes = new Array();
                spiteNodes = str.supportBG.split(',');

                if (str.supportBG.indexOf('0') == -1 && str.supportBG != '') {
                    $(".selectAllSpite").eq(1).attr("checked", "checked");
                    $(".selectAllSpite").eq(1).attr("flag", "1");
                }

                for (var j = 0; j < 8; j++) {
                    if (spiteNodes[j] == "1") {
                        $("#basicRate5").children().eq(j).attr("checked", "checked");
                    }
                }

                var forceNodes = new Array();
                forceNodes = str.supportBGforce.split(',');

                if (str.supportBGforce.indexOf('0') == -1 && str.supportBGforce != '') {
                    $(".selectAllSpite").eq(0).attr("checked", "checked");
                    $(".selectAllSpite").eq(0).attr("flag", "1");
                }

                for (var j = 0; j < 8; j++) {
                    if (forceNodes[j] == "1") {
                        $("#forceSpite5").children().eq(j).attr("checked", "checked");
                    }
                }

                if (data.prio_5 == '1') {
                    $("#singalVal").removeClass("none");
                }
            });
        },

        initEvent: function () {

            $("[name=prio_5]").click(function () {
                if ($(this).val() == "1") {
                    $("#singalVal").removeClass("none");
                } else {
                    $("#singalVal").addClass("none");
                }
            });
            $(".spiteList input[type='checkbox']").on("click", function () {
            	var name = this.name;
            	var selected = this.checked ? true : false;
 	            var _id = this.id;
            	var index = _id.split("-")[1];
            	//强制速率选项是否全部选中
            	var allSelected = advance5g.checkboxAllSelected;

            	switch (name) {
            		case "force":
            			//选中该复选框
            			if (selected) {
            				//如果所有强制选项都处于选中状态，则将所有checkbox置于选中状态。
	            			if (allSelected("force")) {
	            				$(".spiteList").find("input[type='checkbox']").attr("checked", "checked");
	            			//将对应的支持速率置于选中状态；
	            			} else {
	            				$("#support-" + index).attr("checked", "checked");
	            			}

	            			if (allSelected("support")) {
	            				$("#support-all").attr("checked", "checked");
	            			}

            			} else {
            				$("#force-all").removeAttr("checked");
            			}

            			break;
            		case "force-all":
            			if (selected) {
            				$(".spiteList").find("input[type='checkbox']").attr("checked", "checked");
            			} else {
            				$("#forceSpite5").find("input[type='checkbox']").removeAttr("checked");
            			}
            			break;
            		case "support":
            			if (selected) {
            				//如果所有支持选项都处于选中状态，则将所有checkbox置于选中状态。
	            			if (allSelected("support")) {
	            				$("#basicRate5").find("input[type='checkbox']").attr("checked", "checked");
	            			}

            			} else {
            				$("#support-all, #force-all, #force-" + index).removeAttr("checked");
            			}
            			break;
            		case "support-all":
            			//选中时所有支持速率置于选中状态
            			if (selected) {
            				$("#basicRate5").find("input[type='checkbox']").attr("checked", "checked");
            			} else {
            				$(".spiteList").find("input[type='checkbox']").removeAttr("checked");
            			}
            			break;
            	}
            });

            $("#btnsubmit").on('click', advance5g.preSubmit);
        },

        checkboxAllSelected: function (_name) {
        	var allSelected = true;	
        	//判断是否都处于选中状态；
        	$("input[name='" + _name + "']").each (function () {
        		this.checked ? "" : (allSelected = false);
        		if (!allSelected) {
        			return false;
        		}
        	});
        	return allSelected;
        },



        checkSupportSpite: function () {
            var needNodes = 0;
            for (var i = 0; i < 8; i++) {
                if ($("#basicRate5").children().eq(i).is(':checked')) {
                    ret1 += 1 + ",";
                } else {
                    ret1 += 0 + ",";
                }

                if ($("#forceSpite5").children().eq(i).is(':checked')) {
                    ret2 += 1 + ",";
                } else {
                    if (i == 0 || i == 2 || i == 4) {
                        needNodes++;
                    }
                    ret2 += 0 + ",";
                }
            }

            if (needNodes == 3) {
                alert(_("Select at least the mandatory rate of 6 Mbps, 12 Mbps, or 24 Mbps."));
                return false;
            } else {
                return true;
            }
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
            if (!checkRssiData(f.RSSI, _("Minimum RSSI Threshold"), -90, -60)) {
                return false;
            }
            if (f.RSSI.value == '-') {
                alert(_(_("%s is invalid. %s must be an integer from %s through %s. "), [_("Minimum RSSI Threshold"), _("Minimum RSSI Threshold"), -90, -60]));
                return false;
            }
            if ($("[name=prio_5]:checked").val() == "1" && !checkRssiData(f.prio_5_value, _("5 GHz Threshold"), -90, -20)) {
                return false;
            }

            if (advance5g.checkSupportSpite()) {
                var ret1Arr = ret1.split(','),
                    ret2Arr = ret2.split(',');

                f.supportBGforce.value = ret2.slice(0, ret2.length - 1);
                f.supportBG.value = ret1.slice(0, ret1.length - 1);
                return true;
            } else {
                return false;
            }
        },

        preSubmit: function () {
            if (permission()) {
                if (advance5g.checkValue()) {
                    submitData("goform/setWrlRadioUpInfo");
                }
            } else {
                return false;
            }
        }
    };
    advance5g.init();
});