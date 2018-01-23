var G = {
    groupLen: null, //组数
    groupName: new Array, //组名
    groupRefer: new Array, //引用数
    urlFilterRules: null, //禁用组
    urlLen: null,
    groupNow: null
};

var GName = {
    _("Shopping"): "购物",
    _("Group Buying"): "团购",
    _("Video"): "视频",
    _("Chat and Email"): "聊天邮箱",
    _("Recruitment"): "招聘"
}
var flag = true;

function initHTML() {
    var data = null;
    var str = "<li class='a3'><span style='margin-left: 10px;'>" + _("Website Group") + "</span><label>" + _("Operation") + "</label></li><li class='uGroup' tindex='1'><label style='float:left;width:140px;margin-right: 0px;cursor:pointer;' name='gNameSpan' title='"+_("Shopping")+"'><span style='margin-left: 10px;'>" + _("Shopping") + "</span></label><label><input type='checkbox' name='enable'>" + _("Enable") + "</label></li><li class='uGroup' tindex='2'><label name='gNameSpan' title='"+_("Group Buying")+"' style='float:left;width:140px;margin-right: 0px;cursor:pointer;'><span style='margin-left: 10px;'>" + _("Group Buying") + "</span></label><label><input type='checkbox' name='enable'>" + _("Enable") + "</label></li><li class='uGroup' tindex='3'><label name='gNameSpan' title='"+_("Video")+"' style='float:left;width:140px;margin-right: 0px;cursor:pointer;'><span  style='margin-left: 10px;'>" + _("Video") + "</span></label><label><input type='checkbox' name='enable'>" + _("Enable") + "</label></li><li class='uGroup' tindex='4'><label name='gNameSpan' title='"+_("Chat and Email")+"' style='float:left;width:140px;margin-right: 0px;cursor:pointer;'><span style='margin-left: 10px;'>" + _("Chat and Email") + "</span></label><label><input type='checkbox' name='enable'>" + _("Enable") + "</label></li><li class='uGroup' tindex='5'><label name='gNameSpan' title='"+_("Recruitment")+"' style='float:left;width:140px;margin-right: 0px;cursor:pointer;'><span style='margin-left: 10px;'>" + _("Recruitment") + "</span></label><label><input type='checkbox' name='enable'>" + _("Enable") + "</label></li>";

    $.getJSON('./goform/getUrlGroupMenu?' + Math.random(), function(res) {

        data = res.urlGroupMenu;
        G.groupLen = data.length;
        G.groupName.length = 0;
        G.groupRefer.length = 0;
        for (var x in data) {
            G.groupName.push(data[x].urlGroupName);
            G.groupRefer.push(data[x].urlGroupRefer);
        }

        if (G.groupName.length != 5) {
            for (var i = 5; i < data.length; i++) {
                var sIndex = i + 1;
                if(data[i].urlGroupName.length > 12){
                    var nameShow = data[i].urlGroupName.slice(0,12)+"...";
                    str += "<li class='uGroup' tindex='" + sIndex + "'><label style='float:left;width:140px;margin-right: 0px;cursor:pointer;' name='gNameSpan' title='"+data[i].urlGroupName+"'><span style='margin-left: 10px;'>" + nameShow + "</span></label><label><input type='checkbox' name='enable'>" + _("Enable") + "</label><span class='grey_icon2' name='delete'></span></li>";
                }else{
                    str += "<li class='uGroup' tindex='" + sIndex + "'><label style='float:left;width:140px;margin-right: 0px;cursor:pointer;' name='gNameSpan' title='"+data[i].urlGroupName+"'><span style='margin-left: 10px;'>" + data[i].urlGroupName + "</span></label><label><input type='checkbox' name='enable'>" + _("Enable") + "</label><span class='grey_icon2' name='delete'></span></li>";
                }
            }
        }
        $("#groupNav").html(str);
        initGroupStatus();
        initUrlTab(1);
    });
}

function initEvent() {
    $("[name=urlEnable]").on('click', function() {
        showOrHide($(this).val());
    });
    $("#groupNav").delegate('input[name=enable]', 'click', function(e) {
        if (permission()) {
            var sIndex = $(this).parents("li").attr("tindex");
            var urlFilterEn = "";

            if (flag) {
                flag = false;
            } else {
                if ($(this).is(":checked")) {
                    $(this).removeAttr("checked");
                } else {
                    $(this).attr("checked", "checked");
                }
                return;
            }
            if ($(this).is(":checked")) {
                urlFilterEn = "groupIndex=" + sIndex + "&urlEnable=true";
            } else {
                urlFilterEn = "groupIndex=" + sIndex + "&urlEnable=false";
            }

            $.post("/goform/editUrlFilterRules", urlFilterEn, function(e) {
                if (e) {
                    flag = true;
                }
                // setTimeout(initGroupStatus, 100);
            });
        } else {
            if ($(this).is(":checked")) {
                $(this).removeAttr("checked");
            } else {
                $(this).attr("checked", 'checked');
            }
        }
    });

    $("#addMenu").on('click', function() {
        if (G.groupLen >= 10) {
            alert(_("A maximum of 5 new categories can be added."));
            return false;
        } else {
            $("#addGroupUL").show();
            $(this).attr("disabled", "disabled");
            $("#menuName").focus();
        }
    });
    $("#subMenu").on('click', function() {
        if (permission()) {
            var addGroupName = $("#menuName").val();
            if (addGroupName == "") {
                alert(_("Invalid website category name."));
                $("#menuName").focus();
                return false;
            } else {
                //过滤同名的用户组
                for (var i = 5; i < G.groupName.length; i++) {
                    if (addGroupName == G.groupName[i]) {
                        alert(_("The user group name exists."));
                        return false;
                    }
                }

                for (var x in GName) {
                    if (B.getLang() == "en" && addGroupName == x) {
                        alert(_("The user group name exists."));
                        return false;
                    } else if (B.getLang() == "cn" && addGroupName == GName[x]) {
                        alert(_("The user group name exists."));
                        return false;
                    }
                }

                if (validateCheck("groupName", addGroupName)) {
                    subStr = "urlGroupName=" + addGroupName;
                    $.post("/goform/addUrlGroup", subStr, function() {
                        // window.parent.frames[0].location.reload();
                        $("#addGroupUL").hide();
                        $("#addMenu").removeAttr("disabled");
                        $("#menuName").val("");
                        setTimeout(initHTML, 100);
                    });
                }
            }
        }

    });
    $("#cancelMenu").on('click', function() {
        $("#addGroupUL").hide();
        $("#menuName").val("");
        $("#addMenu").removeAttr("disabled");
    });
    $("#groupNav").delegate('label:[name=gNameSpan]', 'click', function(e) {
        var s = $(this).parent().attr("tindex");
        $("#addUrlMenu").removeAttr("disabled");
        initUrlTab(s);
    });
    $("#groupNav").delegate('span:[name=delete]', 'click', function(e) {
        if (permission()) {
            var s = $(this).parents("li").attr("tindex");
            // var dGroupName = $(this).parents("li").find('span').text();
            var dGroupName = $(this).parents("li").find('label').eq(0).attr("title");
            // if (!confirm(_("Do you want to delete this category?"))) {
            //     return false;
            // } else {
                var rindex = parseInt(s) - 1;
                var confirmMsg = "";
                // if (G.groupRefer[rindex] != 0) {
                if ($(this).parents("li").find('input').is(":checked")) {
                    confirmMsg = _("This group is enabled and cannot be deleted.");
                    alert(confirmMsg);
                    return;
                } else {
                    if (!confirm(_("Do you want to delete this category?"))) {
                        return false;
                    } else {
                    var delData = "urlGroupName=" + dGroupName;
                    $.post("/goform/delUrlGroup", delData, function() {
                        setTimeout(function() {
                            // window.parent.frames[0].location.reload();
                            if ($("#addMenu").is(":disabled")) {
                                $("#addMenu").removeAttr("disabled");
                            }
                            $("#addGroupUL").hide();
                            initHTML();
                        }, 100);
                    });
                }
            }
        }
    });
    /*为删除用户添加的url添加事件绑定*/
    $("#speContent").delegate("span[name=delUserUrl]", "click", function() {
        if (permission()) {
            if (!confirm(_("Do you want to delete the rule?"))) {
                return false;
            } else {
                var gindex = $("#groupNav").children().find("label[class=onRed]").parent().attr("tindex");
                var grName = G.groupNow;
                var delUrlIndex = $(this).attr("tindex");
                var delUrl = "urlGroupName=" + grName + "&urlIndex=" + delUrlIndex;
                $.post("/goform/delUserUrl", delUrl, function() {
                    setTimeout(function() {
                        initUrlTab(gindex);
                    }, 100);
                });
            }
        }

    });
    $("#addUrlMenu").on('click', function() {
        var groupIndex = $("#groupNav").children().find("span[class=onRed]").parent().attr("tindex");
        if (G.urlLen >= 10) {
            alert(_("A maximum of 10 URLs can be added."));
            return false;
        } else {
            if (G.urlLen == 0) {
                $("#noRuleMsg").hide();
            }
            $("#addUrlShow").show();
            $("#addUrlDescription").focus();
            $(this).attr("disabled", "disabled");
        }
    });
    $("#speContent").delegate(".save_icon", 'click', function() {
        if (permission()) {
            var groupIndex = $("#groupNav").children().find("label[class=onRed]").parent().attr("tindex");
            if (G.urlLen >= 10) {
                alert(_("A maximum of 10 URLs can be added."));
                return false;
            } else {
                var url = $.trim($("#addUrlName").val()),
                    description = $.trim($("#addUrlDescription").val());
                if (description == "") {
                    alert(_("Please enter a website name."));
                    return false;
                } else if (url == "") {
                    alert(_("Please enter a URL."));
                    return false;
                } else if (!validateCheck("url", url)) {
                    return false;
                } else if (!validateCheck("des", description)) {
                    return false;
                } else {
                    addUserUrl(G.groupNow, url, description, groupIndex);
                    $("#addUrlMenu").removeAttr("disabled");
                }
            }
        }

    });
    $("#speContent").delegate(".cancel_icon", 'click', function() {
        if (G.urlLen == 0) {
            $("#noRuleMsg").show();
        }
        $("#addUrlShow").hide();
        $("#addUrlDescription").val("");
        $("#addUrlName").val("");
        $("#addUrlMenu").removeAttr("disabled");
    });
    $("#urlCtrSave").on('click', function() {
        if (permission()) {
            var subData = "";
            if ($('[name=urlEnable]:checked').val() == '1') {
                subData = "urlEnable=true";
            } else {
                subData = "urlEnable=false";
            }

            $.post("/goform/setUrlFilterStatus", subData, function() {
                window.parent.frames[0].location.reload();
            });
        }
    });
}

function showOrHide(str) {
    if (str == "1") {
        $("[name=urlEnable]").eq(1).attr("checked", "checked");
        $("#urlContent").show();
    } else {
        $("[name=urlEnable]").eq(0).attr("checked", "checked");
        $("#urlContent").hide();
    }
}

function initGroupStatus() {
    var StatusNodes = new Array();
    $.getJSON('./goform/getUrlFilterRules?' + Math.random(), function(data) {
        if (data.urlFilterGroups != "") {
            $("#groupNav").children().find("input[type=checkbox]").removeAttr("checked");
            statusNodes = data.urlFilterGroups.split(",");
            for (var i = 0; i < statusNodes.length; i++) {
                var gIndex = parseInt(statusNodes[i]);
                $("#groupNav").children().eq(gIndex).find("input[type=checkbox]").attr("checked", "checked");
            }
        }
    });
}

function showUrlGroupList(name) {
    var data = "";
    var str1 = "",
        str2 = "";

    $.post('./goform/getUrls', 'urlGroupName=' + name + '&rd=' + Math.random(), function(res) {
        var data = $.parseJSON(res);
        G.urlLen = data.length;

        if (data.length == 0) {
            str1 = "<tr style='text-align:center;' id='noRuleMsg'><td colspan='4'>" + _("No URL") + "</td></tr>";
            $("#speContent").html(str1);
        } else {
            for (var x in data) {
                var lineIndex = parseInt(x) + 1;

                if(data[x].urlRemark.length > 8){
                    if(data[x].urlString.length > 20){
                        var reTemp = data[x].urlRemark.slice(0,8)+"...";
                        var strTemp = data[x].urlString.slice(0,20)+"...";
                        str1 += "<tr><td>" + lineIndex + "</td><td title='"+data[x].urlRemark+"'>" + reTemp + "</td><td title='"+data[x].urlString+"'><a href='http://" + data[x].urlString + "' target='_blank'>" + strTemp + "</a></td><td><span class='grey_icon user' tindex=" + lineIndex + " name='delUserUrl'></span></td></tr>";
                    }else{
                        var reTemp = data[x].urlRemark.slice(0,8)+"...";
                        str1 += "<tr><td>" + lineIndex + "</td><td title='"+data[x].urlRemark+"'>" + reTemp + "</td><td title='"+data[x].urlString+"'><a href='http://" + data[x].urlString + "' target='_blank'>" + data[x].urlString + "</a></td><td><span class='grey_icon user' tindex=" + lineIndex + " name='delUserUrl'></span></td></tr>";
                    }
                }else{
                    if(data[x].urlString.length > 20){
                        var strTemp = data[x].urlString.slice(0,20)+"...";
                        str1 += "<tr><td>" + lineIndex + "</td><td title='"+data[x].urlRemark+"'>" + data[x].urlRemark + "</td><td title='"+data[x].urlString+"'><a href='http://" + data[x].urlString + "' target='_blank'>" + strTemp + "</a></td><td><span class='grey_icon user' tindex=" + lineIndex + " name='delUserUrl'></span></td></tr>";
                    }else{
                        str1 += "<tr><td>" + lineIndex + "</td><td title='"+data[x].urlRemark+"'>" + data[x].urlRemark + "</td><td title='"+data[x].urlString+"'><a href='http://" + data[x].urlString + "' target='_blank'>" + data[x].urlString + "</a></td><td><span class='grey_icon user' tindex=" + lineIndex + " name='delUserUrl'></span></td></tr>";
                    }
                }
            }
            $("#speContent").html(str1);
        }
        str2 = "<tr id='addUrlShow'><td></td><td><input type='text' id='addUrlDescription' style='width:80px'></td><td><input type='text' id='addUrlName'></td><td><span class='save_icon' id='addUserUrl'></span><span class='cancel_icon' id='cancelUserUrl'></span></td></tr>";
        $("#speContent").append(str2);
        $("#addUrlShow").hide();
    });
}

function initUrlTab(index) {
    var nowGroupIndex = parseInt(index);
    var name = $("#groupNav").children().eq(nowGroupIndex).find("label").eq(0).attr("title");
    $("#groupNav").children().find("label:[name=gNameSpan]").removeClass("onRed");
    $("#groupNav").children().eq(nowGroupIndex).find("label").eq(0).addClass("onRed");
    if (nowGroupIndex < 6 && B.getLang() == "en") {
        G.groupNow = GName[name];
        showUrlGroupList(GName[name]);
    } else {
        G.groupNow = name;
        showUrlGroupList(name);
    }
}

function addUserUrl(groupName, url, des, groupIndex) {
    var addUrl = "urlGroupName=" + groupName + "&urlString=" + url + "&urlRemark=" + des;
    $.post("/goform/addUserUrl", addUrl, function() {
        setTimeout(function() {
            $("#addUrlName").val("");
            $("#addUrlDescription").val("");
            initUrlTab(groupIndex);
        }, 100);
    });
}

function validateCheck(type, str) {
    var t = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, //仅支持数字、字母、下划线和中文
        h = /^[a-zA-Z0-9.\u4e00-\u9fa5]+$/, //仅支持数字、字母和‘.’
        f = /^[-_~\|\#\?&\\\/\.%0-9a-z\u4e00-\u9fa5]+$/ig; //有效字符串

    if (type == "groupName" || type == "des") {
        var length = str.length;
        if (length > 32) {
            if (type == "groupName") {
                alert(_("Only a maximum of 32 bytes are allowed in a category name."));
            } else {
                alert(_("Only a maximum of 32 bytes are allowed in a website name."));
            }
            return false;
        } else if (!t.test(str)) {
            if (type == "groupName") {
                alert(_("Only digits, letters, and underscores are allowed in a category name."));
            } else {
                alert(_("Only digits, letters, and underscores are allowed in a website name."));
            }
            return false;
        } else {
            var length = str.replace(/[^\x00-\xff]/g, 'aaa').length;
            if (length > 32) {
                if (type == "groupName") {
                    alert(_("Only a maximum of 32 bytes are allowed in a category name."));
                } else {
                    alert(_("Only a maximum of 32 bytes are allowed in a website name."));
                }
                return false;
            } else {
                return true;
            }
        }
    }

    if (type == "url") {
        if (str.length > 64) {
            alert(_("Only a maximum of 64 characters are allowed in a URL."));
            return false;
        } else if (!h.test(str)) {
            alert(_("Only digits, letters, and dots are allowed in a URL."));
            return false;
        } else if (f.test(str)) {
            if (/.+\..+/ig.test(str) || str == "localhost") {
                return true;
            } else {
                alert(_("Incorrect URL format."));
                return false;
            }
        } else {
            alert(_("Incorrect URL format."));
            return false;
        }
    }
}

function init(data) {
    $("#head").html(tbl_head(33));
    showOrHide(data.urlEnable);
    $("#addGroupUL").hide();
    initHTML();
    initEvent();
}

function getValue() {
    $.GetSetData.getJson("goform/getFilterEn?", init);
}

window.onload = function() {
    getValue();
}
