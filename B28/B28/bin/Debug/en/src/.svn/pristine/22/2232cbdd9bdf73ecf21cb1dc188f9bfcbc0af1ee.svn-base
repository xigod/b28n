var f = document.forms[0];

function initHTML() {
    $.getJSON('./goform/getWebAppFilterRules?' + Math.random(), function(res) {
        var data = res;
        var appNodes = data.appData.split(";")[0].split(","),
            p2pEn = data.appData.split(";")[1],
            emailEn = data.appData.split(";")[2],
            filterEn = data.appData.split(";")[3];


        if (filterEn == 'true') {
            showOrhide(true);
        } else {
            showOrhide(false);
        }
        for (var i = 0; i < appNodes.length; i++) {
            var appIndex = parseInt(appNodes[i]) - 1;
            if (appNodes[i] < 6) {
                if ($("#appNodes").find("input:checkbox").eq(appIndex).val() == appNodes[i]) {
                    $("#appNodes").find("input:checkbox").eq(appIndex).attr("checked", "checked");
                }
            } else {
                var rIndex = appIndex - 5;
                if ($("#radioNodes").find("input:checkbox").eq(rIndex).val() == appNodes[i]) {
                    $("#radioNodes").find("input:checkbox").eq(rIndex).attr("checked", "checked");
                }
            }
        }

        if (p2pEn == 'true') {
            $('[name=P2PFilter]').eq(1).attr("checked", "checked");
        } else {
            $('[name=P2PFilter]').eq(0).attr("checked", "checked");
        }

        if (emailEn == 'true') {
            $('[name=emailFilter]').eq(1).attr("checked", "checked");
        } else {
            $('[name=emailFilter]').eq(0).attr("checked", "checked");
        }
    });
}

function initEvent() {

    $("[name=appEnable]").on('click', function() {
        var subData = "";
        if ($(this).val() == "0") {
            showOrhide(false);
        } else {
            showOrhide(true);
        }
    });

    $("#appCtrSave").on('click', function() {
        if (permission()) {
            var modeValue = "";
            var appNode = 0;
            for (var i = 0; i < 5; i++) {
                if ($("#appNodes").find("input:checkbox").eq(i).is(':checked')) {
                    modeValue += $("#appNodes").find("input:checkbox").eq(i).val() + ",";
                    appNode++;
                }
            }
            for (var i = 0; i < 10; i++) {
                if ($("#radioNodes").find("input:checkbox").eq(i).is(':checked')) {
                    modeValue += $("#radioNodes").find("input:checkbox").eq(i).val() + ",";
                    appNode++;
                }
            }
            if(appNode == 0){
                modeValue = "0";
            }else{
                modeValue = modeValue.slice(0, modeValue.length - 1);
            }
            
            if ($("[name=P2PFilter]:checked").val() == '1') {
                modeValue += ";true;";
            } else {
                modeValue += ";false;";
            }
            if ($("[name=emailFilter]:checked").val() == '1') {
                modeValue += "true;";
            } else {
                modeValue += "false;";
            }
            if ($("[name=appEnable]:checked").val() == '1') {
                modeValue += "true";
            } else {
                modeValue += "false";
            }
            var subData = "appData=" + modeValue;
            $.post("/goform/setWebAppFilterRules", subData, function() {
                window.parent.frames[0].location.reload();
            });
        }
    });
}

function showOrhide(str) {
    if (str) {
        $("#appEnableShow").show();
        f.appEnable[1].checked = true;
    } else {
        $("#appEnableShow").hide();
        f.appEnable[0].checked = true;
    }
}
(function() {
    $("#head").html(tbl_head(34));
    if(B.getLang() == "en"){
        $("#radioNodes").find("label").eq(1).css("margin-left","25px");
        $("#radioNodes").find("label").eq(2).css("margin-left","25px");
        $("#radioNodes").find("label").eq(4).css("margin-left","11px");
        $("#radioNodes").find("label").eq(6).css("margin-left","37px");
        $("#radioNodes").find("label").eq(7).css("margin-left","35px");
        $("#radioNodes").find("label").eq(8).css("margin-left","41px");
        $("#radioNodes").find("label").eq(9).css("margin-left","22px");
        $("#appNodes").find("label").eq(1).css("margin-left","6px");
        $("#appNodes").find("label").eq(3).css("margin-left","46px");
    }
    initHTML();
    initEvent();
})();
