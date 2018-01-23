// JavaScript Document
var pagesz = 15,
    entrynum = 0,
    editIndex = null,
    f = document.forms[0];

$(function() {
    var logadd = {
        init: function() {
            initHeadTail(12, "logsetting");
            logadd.initValue();
            logadd.initEvent();
        },

        initValue: function() {
            var itms = location.href.split("?")[1].split("&"),
                op = itms[0].split("="),
                idx;

            if (itms.length > 1) {
                idx = itms[1].split("=");
                if (op[1] == "edit") {
                    var itm = reqStr.split("~")[idx[1]],
                        em = itm.split(";");

                    f.op.value = "edit";
                    f.innerIP.value = em[0];
                    f.port.value = em[1];
                    f.isenable.checked = (em[2] == "1" ? true : false);
                    editIndex = idx[1];
                }
            } else {
                if (op[1] == "add") {
                    f.port.value = "514";
                }
            }
        },

        initEvent: function() {
            $("#btnsubmit").removeAttr('onclick');
            $("#btnsubmit").on('click', logadd.preSubmit);
        },

        validate: function() {
            var loc = "",
                t = /^\d{1,5}$/,
                items = reqStr.split("~");

            if (f.innerIP.value == "") {
                alert(_("Please enter an IP address."));
                return false;
            }
            if (f.port.value == "") {
                alert(_("Please enter a port number."));
                return false;
            }
            if (!checkIp(f.innerIP, _("Log Server IP"))) {
                return false;
            }
            f.innerIP.value = clearInvalidIpstr(f.innerIP.value);

            if (!t.test(+f.port.value) || +f.port.value < 1 || +f.port.value > 65535) {
                alert(_("Port number must be between 1 and 65535!"));
                return false;
            }
            if (f.innerIP.value == lanip) {
                alert(_("The log server IP entered is used by gateway. Please retry!"));
                return false;
            }

            loc = f.innerIP.value + ";" + f.port.value + ";" + (f.isenable.checked ? "1" : "0");
            for (var i = 0; i < items.length; i++) {
                if (editIndex == i) {
                    continue;
                } else if (items[i].split(";")[0] == f.innerIP.value) {
                    alert(_("No repeated log server!"));
                    return false;
                }
            }
            if (reqStr != "" && editIndex == null)
                loc = "~" + loc;
            if (editIndex == null) {
                reqStr += loc;
            } else {
                var lt = reqStr.split("~"),
                    sstr = "",
                    k;

                lt[editIndex] = loc;
                for (k = 0; k < (lt.length - 1); k++)
                    sstr += lt[k] + "~";
                sstr += lt[k];
                reqStr = sstr;
            }
            f.entrys.value = reqStr;
            return true;
        },

        preSubmit: function() {
            if (permission()) {
                if (logadd.validate()) {
                    f.submit();
                }
            } else {
                return false;
            }
        }
    };
    logadd.init();
})
