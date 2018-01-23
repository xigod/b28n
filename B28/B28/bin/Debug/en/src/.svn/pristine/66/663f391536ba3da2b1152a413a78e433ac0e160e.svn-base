var f = document.forms[0];
var ssidClose = new Array();
var ssidIndex = new Array();
var str1 = "",
    str2 = "",
    str3 = "";

function initEvent() {
    $("[name=qosmode]").on('click', function() {
        switch ($(this).val()) {
            case '0':
                $("#intCtrContent").hide();
                $("#userCtrContent").hide();
                break;
            case '1':
                $("#intCtrContent").show();
                $("#userCtrContent").hide();
                break;
            case '2':
                $("#intCtrContent").hide();
                $("#userCtrContent").show();
                break;
        }
    });

    $("#intCtrSSIDList").on('change', function() {
        var selectedSSIDIndex = parseInt($(this).val());

        $("#intCtrSSID").html(ssidClose[selectedSSIDIndex][0]);
        if (ssidClose[selectedSSIDIndex][1] == "0" || ssidClose[selectedSSIDIndex][1] == "") {
            $("#intUpWidth").val("");
        } else {
            $("#intUpWidth").val(ssidClose[selectedSSIDIndex][1]);
        }

        if (ssidClose[selectedSSIDIndex][2] == "0" || ssidClose[selectedSSIDIndex][2] == "") {
            $("#intDownWidth").val("");
        } else {
            $("#intDownWidth").val(ssidClose[selectedSSIDIndex][2]);
        }

    });
    $("#userCtrSSIDList").on('change', function() {
        var selectedSSIDIndex = parseInt($(this).val());

        $("#userCtrSSID").html(ssidClose[selectedSSIDIndex][0]);
        if (ssidClose[selectedSSIDIndex][1] == "0" || ssidClose[selectedSSIDIndex][1] == "") {
            $("#userUpWidth").val("");
        } else {
            $("#userUpWidth").val(ssidClose[selectedSSIDIndex][1]);
        }
        if (ssidClose[selectedSSIDIndex][2] == "0" || ssidClose[selectedSSIDIndex][2] == "") {
            $("#userDownWidth").val("");
        } else {
            $("#userDownWidth").val(ssidClose[selectedSSIDIndex][2]);
        }
        if (ssidClose[selectedSSIDIndex][3] == "0" || ssidClose[selectedSSIDIndex][3] == "") {
            $("#userSelfUpWidth").val("");
        } else {
            $("#userSelfUpWidth").val(ssidClose[selectedSSIDIndex][3]);
        }
        if (ssidClose[selectedSSIDIndex][4] == "0" || ssidClose[selectedSSIDIndex][4] == "") {
            $("#userSelfDownWidth").val("");
        } else {
            $("#userSelfDownWidth").val(ssidClose[selectedSSIDIndex][4]);
        }
    });

    $("#netCtrSave").on("click", preSubmit);
}

function preSubmit() {
    var t = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
    if (permission()) {
        if ($("[name=qosmode]:checked").val() == "0") {
            $("#userUpWidth").removeAttr("name");
            $("#userDownWidth").removeAttr("name");
            $("#userSelfUpWidth").removeAttr("name");
            $("#userSelfDownWidth").removeAttr("name");
            $("#apWidth").removeAttr("name");
            $("#intUpWidth").removeAttr("name");
            $("#intDownWidth").removeAttr("name");
            $("#selectedSSID").removeAttr("name");
        } else if ($("[name=qosmode]:checked").val() == "1") {
            $("#userUpWidth").removeAttr("name");
            $("#userDownWidth").removeAttr("name");
            $("#userSelfUpWidth").removeAttr("name");
            $("#userSelfDownWidth").removeAttr("name");
            f.ssid.value = $("#intCtrSSID").html();

            switch ($("#intCtrSSIDList").val()) {
                case $("#intCtrSSIDList").val():
                    f.ssidIndex.value = ssidIndex[$("#intCtrSSIDList").val()];
                    break;
            }
            if ($("#apWidth").val() != "") {
                //if (/[0-9]$/.test($("#apWidth").val()) == false) {
                if (t.test($("#apWidth").val()) == false) {
                    alert(_("Invalid total bandwidth of AP. It must be an integer!"));
                    return false;
                } else if (parseFloat($("#apWidth").val()) < 0.1 || $("#apWidth").val() > 100) {
                    alert(_("Range of total bandwidth of AP: 0.1~100."));
                    return false;
                }
            } else {
                // alert(_("Please specify the total bandwidth of AP."));
                // return false;
            }
            if ($("#intUpWidth").val() != "") {
                if (t.test($("#intUpWidth").val()) == false) {
                    alert(_("The max upload rate must be numeric."));
                    return false;
                } else if (parseFloat($("#intUpWidth").val()) < 0.1 || $("#intUpWidth").val() > 100) {
                    alert(_("Range of the max upload rate: 0.1~100."));
                    return false;
                }
            } else {
                // alert(_("Please specify the max upload rate."));
                // return false;
            }

            if ($("#intDownWidth").val() != "") {
                if (t.test($("#intDownWidth").val()) == false) {
                    alert(_("The max download rate must be numeric."));
                    return false;
                } else if (parseFloat($("#intDownWidth").val()) < 0.1 || $("#intDownWidth").val() > 100) {
                    alert(_("Range of the max download rate: 0.1~100."));
                    return false;
                }
            } else {
                // alert(_("Please specify the max download rate."));
                // return false;
            }
        } else {
            $("#apWidth").removeAttr("name");
            $("#intUpWidth").removeAttr("name");
            $("#intDownWidth").removeAttr("name");
            f.ssid.value = $("#userCtrSSID").html();

            switch ($("#userCtrSSIDList").val()) {
                case $("#userCtrSSIDList").val():
                    f.ssidIndex.value = ssidIndex[$("#userCtrSSIDList").val()];
                    break;
            }

            if ($("#userUpWidth").val() != "") {
                if (t.test($("#userUpWidth").val()) == false) {
                    alert(_("The max upload rate must be numeric."));
                    return false;
                } else if (parseFloat($("#userUpWidth").val()) < 0.1 || $("#userUpWidth").val() > 100) {
                    alert(_("Range of the max upload rate: 0.1~100."));
                    return false;
                }
            } else {
                // alert(_("Please specify the max upload rate."));
                // return false;
            }
            if ($("#userDownWidth").val() != "") {
                if (t.test($("#userDownWidth").val()) == false) {
                    alert(_("The max download rate must be numeric."));
                    return false;
                } else if (parseFloat($("#userDownWidth").val()) < 0.1 || $("#userDownWidth").val() > 100) {
                    alert(_("Range of the max download rate: 0.1~100."));
                    return false;
                }
            } else {
                // alert(_("Please specify the max download rate."));
                // return false;
            }

            if ($("#userSelfUpWidth").val() != "") {
                if (t.test($("#userSelfUpWidth").val()) == false) {
                    alert(_("The max user upload rate must be numeric."));
                    return false;
                } else if (parseFloat($("#userSelfUpWidth").val()) < 0.1 || $("#userSelfUpWidth").val() > 100) {
                    alert(_("Range of the max user upload rate: 0.1~100."));
                    return false;
                }
            } else {
                // alert(_("Please specify the max user upload rate."));
                // return false;
            }

            if ($("#userSelfDownWidth").val() != "") {
                if (t.test($("#userSelfDownWidth").val()) == false) {
                    alert(_("The max user download rate must be numeric."));
                    return false;
                } else if (parseFloat($("#userSelfDownWidth").val()) < 0.1 || $("#userSelfDownWidth").val() > 100) {
                    alert(_("Range of the max user download rate: 0.1~100."));
                    return false;
                }
            } else {
                // alert(_("Please specify the max user download rate."));
                // return false;
            }
        }
        submitData("goform/setQos");
    } else {
        return false;
    }
}

(function() {
    $("#head").html(tbl_head(31));
    $.get("goform/getQosInfo?" + Math.random(), function (data) {
        var data = $.parseJSON(data),
            ssidList = data.list.split('%'),
            ssidListLen = ssidList.length - 1,
            ssidName = "";

        if (data.qosmode == "0") {
            f.qosmode[0].checked = true;
            $("#intCtrContent").hide();
            $("#userCtrContent").hide();
        } else if (data.qosmode == '1') {
            f.qosmode[2].checked = true;
            $("#intCtrContent").show();
            $("#userCtrContent").hide();
        } else {
            f.qosmode[1].checked = true;
            $("#intCtrContent").hide();
            $("#userCtrContent").show();
        }
        if (data.overAllBand == "" || data.overAllBand == "0") {
            f.apWidth.value = "";
        } else {
            f.apWidth.value = data.overAllBand;
        }

        for (var i = 0; i < ssidListLen; i++) {
            ssidClose.push(ssidList[i].split('<'));
            ssidIndex.push(ssidList[i].split('<')[5]);
            ssidName = ssidList[i].split('<');
            str1 += '<option value=' + i + '>' + decodeSSID(ssidName[0]) + '</option>';
        }

        $("#intCtrSSID").html(decodeSSID(ssidClose[0][0]));
        $("#userCtrSSID").html(decodeSSID(ssidClose[0][0]));
        if (ssidClose[0][1] == '0' || ssidClose[0][1] == "") {
            $("#intUpWidth").val("");
            $("#userUpWidth").val("");
        } else {
            $("#intUpWidth").val(ssidClose[0][1]);
            $("#userUpWidth").val(ssidClose[0][1]);
        }
        if (ssidClose[0][2] == '0' || ssidClose[0][2] == "") {
            $("#intDownWidth").val("");
            $("#userDownWidth").val("");
        } else {
            $("#intDownWidth").val(ssidClose[0][2]);
            $("#userDownWidth").val(ssidClose[0][2]);
        }
        if (ssidClose[0][3] == '0' || ssidClose[0][3] == "") {
            $("#userSelfUpWidth").val("");
        } else {
            $("#userSelfUpWidth").val(ssidClose[0][3]);
        }
        if (ssidClose[0][4] == '0' || ssidClose[0][4] == "") {
            $("#userSelfDownWidth").val("");
        } else {
            $("#userSelfDownWidth").val(ssidClose[0][4]);
        }

        for (var i = 0; i < ssidListLen; i++) {

            ssidName = ssidList[i].split('<');

            str2 += '<tr><td>' + decodeSSID(ssidName[0]) + '</td>';
            str3 += '<tr><td>' + decodeSSID(ssidName[0]) + '</td>';
            if (ssidName[1] == "" || ssidName[1] == "0") {
                if (ssidName[2] == "" || ssidName[2] == "0") {
                    str2 += '<td>' + _("unlimited") + '</td><td>' + _("unlimited") + '</td></tr>';
                    str3 += '<td>' + _("unlimited") + '</td><td>' + _("unlimited") + '</td>';
                } else {
                    str2 += '<td>' + _("unlimited") + '</td><td>' + ssidName[2] + '</td></tr>';
                    str3 += '<td>' + _("unlimited") + '</td><td>' + ssidName[2] + '</td>';
                }
            } else {
                if (ssidName[2] == "" || ssidName[2] == "0") {
                    str2 += '<td>' + ssidName[1] + '</td><td>' + _("unlimited") + '</td></tr>';
                    str3 += '<td>' + ssidName[1] + '</td><td>' + _("unlimited") + '</td>';
                } else {
                    str2 += '<td>' + ssidName[1] + '</td><td>' + ssidName[2] + '</td></tr>';
                    str3 += '<td>' + ssidName[1] + '</td><td>' + ssidName[2] + '</td>';
                }
            }
            if (ssidName[3] == "" || ssidName[3] == "0") {
                if (ssidName[4] == "" || ssidName[4] == "0") {
                    str3 += '<td>' + _("unlimited") + '</td><td>' + _("unlimited") + '</td></tr>';
                } else {
                    str3 += '<td>' + _("unlimited") + '</td><td>' + ssidName[4] + '</td></tr>';
                }
            } else {
                if (ssidName[4] == "" || ssidName[4] == "0") {
                    str3 += '<td>' + ssidName[3] + '</td><td>' + _("unlimited") + '</td></tr>';
                } else {
                    str3 += '<td>' + ssidName[3] + '</td><td>' + ssidName[4] + '</td></tr>';
                }
            }
        }


        $("#intCtrSSIDList").html(str1);
        $("#userCtrSSIDList").html(str1);
        $('#intCtrTabContent').html(str2);
        $('#userCtrTabContent').html(str3);
    });

    initEvent();
})();
