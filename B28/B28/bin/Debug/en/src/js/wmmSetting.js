var f = document.forms[0];
var wrlRadio = f.wrlRadio.value;

function initHTML() {
    var data = "",
        dataAp = "",
        dataApStr = "",
        dataUser = "",
        dataUserStr = "",
        dataLine1 = "<tr class='be'><td>AC_BE</td>",
        dataLine2 = "<tr class='bk'><td>AC_BK</td>",
        dataLine3 = "<tr class='vi'><td>AC_VI</td>",
        dataLine4 = "<tr class='vo'><td>AC_VO</td>";

    $("#head").html(tbl_head(30));

    $.getJSON('./goform/getWrlWmmInfo?radio=' + wrlRadio + '&ra=' + Math.random(), function (data) {
        var dataAp1 = "",
            dataAp2 = "",
            dataAp3 = "",
            dataAp4 = "",
            dataUser1 = "",
            dataUser2 = "",
            dataUser3 = "",
            dataUser4 = "";
        //enable
        if (data.wmmEn == "true") {
            f.wmmEn[1].checked = true;
            $("#wmmContent").show();
        } else {
            f.wmmEn[0].checked = true;
            $("#wmmContent").hide();
        }

        //mode
        if (data.wmmMode == "throughput") {
            f.wmmMode[0].checked = true;
            $("#wmmMode3").hide();
        } else if (data.wmmMode == 'capacity') {
            f.wmmMode[1].checked = true;
            $("#wmmMode3").hide();
        } else {
            f.wmmMode[2].checked = true;
            $("#wmmMode3").show();
        }

        if(data.noAckEn == 'true') {
            $("[name=noAckEn]")[0].checked = true;
        } else {
            $("[name=noAckEn]")[0].checked = false;
        }


        //apwmm
        dataAp = data.wmmConfig;

        for (var i = 0; i < 5; i++) {
            if (wrlRadio == '5G' && i == 4) {
                dataAp1 += "<td class='none'><input type='text' class='w80' value=" + dataAp.BE.split(" ")[i] + "></td>";
                dataAp2 += "<td class='none'><input type='text' class='w80' value=" + dataAp.BK.split(" ")[i] + "></td>";
                dataAp3 += "<td class='none'><input type='text' class='w80' value=" + dataAp.VI.split(" ")[i] + "></td>";
                dataAp4 += "<td class='none'><input type='text' class='w80' value=" + dataAp.VO.split(" ")[i] + "></td>";
            } else if (wrlRadio == '2.4G' && i == 3) {
                dataAp1 += "<td class='none'><input type='text' class='w80' value=" + dataAp.BE.split(" ")[i] + "></td>";
                dataAp2 += "<td class='none'><input type='text' class='w80' value=" + dataAp.BK.split(" ")[i] + "></td>";
                dataAp3 += "<td class='none'><input type='text' class='w80' value=" + dataAp.VI.split(" ")[i] + "></td>";
                dataAp4 += "<td class='none'><input type='text' class='w80' value=" + dataAp.VO.split(" ")[i] + "></td>";
            } else {
                dataAp1 += "<td><input type='text' class='w80' value=" + dataAp.BE.split(" ")[i] + "></td>";
                dataAp2 += "<td><input type='text' class='w80' value=" + dataAp.BK.split(" ")[i] + "></td>";
                dataAp3 += "<td><input type='text' class='w80' value=" + dataAp.VI.split(" ")[i] + "></td>";
                dataAp4 += "<td><input type='text' class='w80' value=" + dataAp.VO.split(" ")[i] + "></td>";
            }
        }
        dataApStr = dataLine1 + dataAp1 + dataLine2 + dataAp2 + dataLine3 + dataAp3 + dataLine4 + dataAp4 + "</tr>";
        $("#apwmm").html(dataApStr);
        //userwmm
        dataUser = data.wmmStaConfig;
        for (var i = 0; i < 5; i++) {
            if (wrlRadio == '5G' && i == 4) {
                dataUser1 += "<td class='none'><input type='text' class='w80' value=" + dataUser.STABE.split(" ")[i] + "></td>";
                dataUser2 += "<td class='none'><input type='text' class='w80' value=" + dataUser.STABK.split(" ")[i] + "></td>";
                dataUser3 += "<td class='none'><input type='text' class='w80' value=" + dataUser.STAVI.split(" ")[i] + "></td>";
                dataUser4 += "<td class='none'><input type='text' class='w80' value=" + dataUser.STAVO.split(" ")[i] + "></td>";
            } else if (wrlRadio == '2.4G' && i == 3) {
                dataUser1 += "<td class='none'><input type='text' class='w80' value=" + dataUser.STABE.split(" ")[i] + "></td>";
                dataUser2 += "<td class='none'><input type='text' class='w80' value=" + dataUser.STABK.split(" ")[i] + "></td>";
                dataUser3 += "<td class='none'><input type='text' class='w80' value=" + dataUser.STAVI.split(" ")[i] + "></td>";
                dataUser4 += "<td class='none'><input type='text' class='w80' value=" + dataUser.STAVO.split(" ")[i] + "></td>";
            } else {
                dataUser1 += "<td><input type='text' class='w80' value=" + dataUser.STABE.split(" ")[i] + "></td>";
                dataUser2 += "<td><input type='text' class='w80' value=" + dataUser.STABK.split(" ")[i] + "></td>";
                dataUser3 += "<td><input type='text' class='w80' value=" + dataUser.STAVI.split(" ")[i] + "></td>";
                dataUser4 += "<td><input type='text' class='w80' value=" + dataUser.STAVO.split(" ")[i] + "></td>";
            }
        }
        dataUserStr = dataLine1 + dataUser1 + dataLine2 + dataUser2 + dataLine3 + dataUser3 + dataLine4 + dataUser4 + "</tr>";
        $("#userwmm").html(dataUserStr);
    });
}

function initEvent() {
    $("[name=wmmEn]").on('click', function () {
        if (this.value == "false") {
            $("#wmmContent").hide();
        } else {
            $("#wmmContent").show();
        }
    });

    $("[name=wmmMode]").on('click', function () {
        if (this.value == "custom") {
            $("#wmmMode3").show();
        } else {
            $("#wmmMode3").hide();
        }
    });

    $("#wmmCtrSave").on('click', function () {

        if ($("[name=wmmEn]")[1].checked && $("[name=wmmMode]")[2].checked) {
            //when not costom , do not check
            for (var i = 0; i < 4; i++) {
                for (var j = 1; j < 6; j++) {
                    var apValue = $("#apwmm").find("tr").eq(i).find("td").eq(j).find("input").val();
                    if (apValue.length == 0 || apValue < 0 || apValue > 65535) {
                        if (j == 1) {
                            alert(_("Please specify a CWmin value from 0 through 65535."));
                            $("#apwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        } else if (j == 2) {
                            alert(_("Please specify a CWmax value from 0 through 65535."));
                            $("#apwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        } else if (j == 3) {
                            alert(_("Please specify an AIFSN value from 0 through 65535."));
                            $("#apwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        } else if (j == 5 && f.wrlRadio.value == '2.4G') {
                            alert(_("Please specify a TXOP Limit value from 0 through 65535."));
                            $("#apwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        } else if (j == 4 && f.wrlRadio.value == '5G') {
                            alert(_("Please specify a TXOP Limit value from 0 through 65535."));
                            $("#apwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        }
                    }
                }
            }
            for (var i = 0; i < 4; i++) {
                for (var j = 1; j < 6; j++) {
                    var staValue = $("#userwmm").find("tr").eq(i).find("td").eq(j).find("input").val();
                    if (staValue.length == 0 || staValue < 0 || staValue > 65535) {
                        if (j == 1) {
                            alert(_("Please specify a CWmin value from 0 through 65535."));
                            $("#userwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        } else if (j == 2) {
                            alert(_("Please specify a CWmax value from 0 through 65535."));
                            $("#userwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        } else if (j == 3) {
                            alert(_("Please specify an AIFSN value from 0 through 65535."));
                            $("#userwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        } else if (j == 5 && f.wrlRadio.value == '2.4G') {
                            alert(_("Please specify a TXOP Limit value from 0 through 65535."));
                            $("#userwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        } else if (j == 4 && f.wrlRadio.value == '5G') {
                            alert(_("Please specify a TXOP Limit value from 0 through 65535."));
                            $("#userwmm").find("tr").eq(i).find("td").eq(j).find("input").focus();
                            return false;
                        }
                    }
                }
            }
        }
        setSubData();

    });
}

function setSubData() {
    if (parent.userType == "user") {
        alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
        return false;
    }
    var subData = "",
        apSubData = "",
        BE = "",
        BK = "",
        VI = "",
        VO = "",
        userSubData = "",
        STABE = "",
        STABK = "",
        STAVI = "",
        STAVO = "",
        wrlRadio = f.className == "2g" ? "2.4G" : "5G",
        wmmCapable = $("[name=wmm_capable]:checked").val() == "0" ? "false" : "true",
        wmmMode = $("[name=wmmMode]:checked").val(),
        noAckSel = $("[name=ackEnable]").attr("checked") == "checked" ? "on" : "off";
    for (var i = 0; i < 5; i++) {
        BE += $("#apwmm").find(".be input:text").eq(i).val() + " ";
        BK += $("#apwmm").find(".bk input:text").eq(i).val() + " ";
        VI += $("#apwmm").find(".vi input:text").eq(i).val() + " ";
        VO += $("#apwmm").find(".vo input:text").eq(i).val() + " ";
        STABE += $("#userwmm").find(".be input:text").eq(i).val() + " ";
        STABK += $("#userwmm").find(".bk input:text").eq(i).val() + " ";
        STAVI += $("#userwmm").find(".vi input:text").eq(i).val() + " ";
        STAVO += $("#userwmm").find(".vo input:text").eq(i).val() + " ";
    }
    /*BE += "off off";
    BK += "off off";
    VI += "off off";
    VO += "off off";
    STABE += "off off";
    STABK += "off off";
    STAVI += "off off";
    STAVO += "off off";*/
    f.wrlRadio.value = wrlRadio;
    f.BE.value = BE;
    f.BK.value = BK;
    f.VI.value = VI;
    f.VO.value = VO;
    f.STABE.value = STABE;
    f.STABK.value = STABK;
    f.STAVI.value = STAVI;
    f.STAVO.value = STAVO;


    submitData("goform/setWrlWmmInfo");
}

(function () {
    $("#head").html(tbl_head(28));

    $("#wmmContent").hide();
    initHTML();
    initEvent();
})();