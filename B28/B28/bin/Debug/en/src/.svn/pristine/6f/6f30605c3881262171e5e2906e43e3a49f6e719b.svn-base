// JavaScript Document
var pagesz = 10,
	entrynum = 0,
	editIndex = null,
	f = document.forms[0],
	initObj = {};

function initHtml() {
	$("#head").html(tbl_head(12));
}

function initEvent() {
	$("#syslogType").on("change", function () {
		getValue(f.syslogType.value);
	});

	$("input[name=refresh]").on("click", function () {
		getValue(f.syslogType.value);
	});

	$("input[name=clear]").on("click", function () {
		if (parent.userType == "user") {
			alert(_("You must log in as an administrator to make any change."));
			return false;
		}
		$.GetSetData.setData("goform/clearSysLog", "action=clear", function () {
			getValue(f.syslogType.value);
		});
	})
}

function getValue(logType) {
	$.GetSetData.getJson("goform/getSysLogInfo?syslogType=" + logType, initValue);
}

function initValue(obj) {
	initObj = obj;
	var page = 0;
	if(parseInt((obj.sysLogList.length) / pagesz) == 0) {
		page = 0;
	} else if(parseInt((obj.sysLogList.length) / pagesz) > 0) {
		if(parseInt((obj.sysLogList.length) % pagesz) == 0) {
			page = parseInt((obj.sysLogList.length) / pagesz) - 1;
			
		} else {
			page = parseInt((obj.sysLogList.length) / pagesz);
			
		}
	}
	showLog(page);

}

function showLog(pg) {
	var loghtm = '',
		page = 0,
		logtable = '',
		pagehtml = '',
		begin = pg * pagesz,
		end = (pg + 1) * pagesz,
		syslog_list = initObj.sysLogList,
		logsNum = (+initObj.maxLogNum),
		logs;
	if (syslog_list.length > logsNum) {
		syslog_list.splice(0, syslog_list.length - logsNum);
		//f.submit();
	}
	if (end > syslog_list.length) {
		end = syslog_list.length;
	}
	if (syslog_list != '') {
		for (var i = end - 1; i >= begin; i--) {
			logs = syslog_list[i];
			loghtm += '<tr><td>' + logs.index + '</td><td>' + logs.time + '</td><td>' +
				logs.type + '</td><td>' + logs.log + '</td></tr>';
		}
	}
	logtable += '<table border="1" class="w640 tc ml20 mt20 table-td"><thead>';
	logtable += '<tr class="a4"><td width="50">' + _("Index") + '</td><td width="170">' + _("Time") + '</td><td width="70">' + _("Type") + '</td><td>' + _("Log Content") + '</td></tr>';
	logtable += '</thead><tbody id="MyTable">';
	logtable += loghtm;
	logtable += '</tbody></table>';
	document.getElementById("logs").innerHTML = logtable;
	if(parseInt((syslog_list.length) / pagesz) == 0) {
		page = 0;
	} else if(parseInt((syslog_list.length) / pagesz) > 0) {
		if(parseInt((syslog_list.length) % pagesz) == 0) {
			page = parseInt((syslog_list.length) / pagesz) - 1;
			
		} else {
			page = parseInt((syslog_list.length) / pagesz);
			
		}
	}
	for (var i = page; i >= 0; i--) {
		if (pg == i) {
			pagehtml += '<a href="#" style="color:black" onclick="showLog(' + i + ')">' + (i + 1) + '</a> ';
		} else {
			pagehtml += '<a href="#" onclick="showLog(' + i + ')">' + (i + 1) + '</a> ';
		}
	}
	if (pagehtml == '') {
		return;
	}
	document.getElementById("pages").innerHTML = _('Page %s', [pagehtml]);
}

function init() {
	initHtml();
	initEvent();
	getValue();
}
window.onload = function () {
	init();
}