// JavaScript Document
var pagesz = 15,
    entrynum = 0,
    editIndex = null,
    f = document.forms[0],
    logset = {};

$(function() {
    logset = {
        init: function() {
            initHeadTail(12, "logsetting");
            logset.initValue();
            logset.initEvent();
            logset.initList();
        },

        initValue: function() {
            f.check.checked = (ischeck == 1 ? true : false);
            f.logsNum.value = logsNum;
        },

        initList: function() {
            var strtmp = "",
                t = $("#List")[0],
                itms = reqStr.split("~"),
                i;

            if (reqStr == "") {
                entrynum = 0;
            } else {
                entrynum = itms.length; //赋予目前记录条数。
            }
            strtmp += '<table width="100%" class="tc">';
            strtmp += '<thead class="a4"><tr>' +
                '<td width="50">ID</td><td width ="180">' + _("Log Server IP") + '</td>' +
                '<td width ="120">' + _("Log Server Port") + '</td><td width ="100">' + _("Enable") + '</td><td>' + _("Action") + '</td>' +
                '</tr></thead><tbody id="MyTable">';
            for (i = 0; i < entrynum; i++) {
                var cl = itms[i].split(";");

                strtmp += '<tr align="center"><td>' + (i + 1) + '</td>';
                strtmp += '<td>' + cl[0] + '</td>';
                strtmp += '<td>' + cl[1] + '</td>';
                strtmp += '<td>' + (cl[2] == 0 ? _("Disable") : _("Enable")) + '</td>';
                strtmp += '<td><input type="button" class="button" value="' + _("Edit") + '" onclick="logset.onEdit(' + i + ')">' +
                    '<input type="button" class="button" value="' + _("Delete") + '" onclick="logset.onDel(' + i + ')"></td></tr>';
            }
            strtmp += "</tbody></table>"
            t.innerHTML = strtmp;
        },

        initEvent: function() {
            $("#addToList").on('click', function() {
                if (entrynum >= 4) {
                    alert(_("Up to 4 entries can be configured!"));
                } else {
                    window.location = "system_logadd.asp?opt=add";
                }
            });
            $("#btnsubmit").removeAttr('onclick');
            $("#btnsubmit").on('click', logset.preSubmit);
        },

        validate: function() {
            if (isNaN(f.logsNum.value) || f.logsNum.value > 300 || f.logsNum.value < 100) {
                alert(_("The number of logs must be between 100~300!"));
                return false;
            }
            f.isoncheck.value = f.check.checked ? "1" : "0";
            f.entrys.value = reqStr;
            return true;
        },

        preSubmit: function() {
            if (permission()) {
                if (logset.validate()) {
                    f.submit();
                }
            } else {
                return false;
            }

        },

        onDel: function(index) {
            if (window.confirm(_("Are you sure you want to delete this rule?"))) {
                var itms = reqStr.split("~");

                itms.splice(index, 1);
                reqStr = itms.join("~");
                logset.preSubmit(f);
            }
        },

        onEdit: function(index) {
            window.location = "system_logadd.asp?opt=edit&index=" + index;
        }
    };
    logset.init();
})
