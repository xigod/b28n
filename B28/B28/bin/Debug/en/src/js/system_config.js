$(function () {
	$("#head").html(tbl_head(13));
	$("#backup").on('click', DownLoadCfg);
	$("#restoreTo").on('click', UpLoadCfg);
	$("#restore").on("click", function () {
        if (parent.userType == "user") {
            alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
            return;
        }
		if (window.confirm(_("This device will restart automatically. The IP address will change to 192.168.0.254.") +
				_("The user name and password will change to admin. If this page is not refreshed automatically after this device restarts, update the network settings of your computer and try login again."))) {
			$.get("/goform/SysToolRestoreSet?r="+Math.random(), function () {});
			window.parent.reboot("http://192.168.0.254", 550, 0, "restore");
		}
	});
	/**
	 * @方法 UpLoadCfg
	 * @所属页面 system_backup.asp
	 * @描述 验证要导入的配置文件类型，如果正确导入文件
	 */
	function UpLoadCfg() {
		if (parent.userType == "user") {
			alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
			return;
		}
		var tmp = document.frmSetup.fileCfg.value.toLowerCase();
		var arr = tmp.split(".");
		/*	alert(arr);*/
		if (arr[0] == "") {
			alert(_("Please select a backup file."));
			return;
		} else if (arr[arr.length - 1] != "cfg") {
			alert(_("The extension of the configuration file to be imported must be .cfg."));
			return;
		}
		if (confirm(_("This device will restart after the configuration file is imported.")))
			document.frmSetup.submit();
	}
	/**
	 * @方法名称  UpLoadCfg
	 * @所属页面  system_backup.asp
	 * @功能描述  导出的配置文件，并默认把他保存电脑中的我的文档文件夹里。
	 */
	function DownLoadCfg() {
		if (parent.userType == "user") {
			alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
			return;
		}
		if (confirm(_("Please select a path to save the exported configuration file."))) {
			refresh("/cgi-bin/DownloadCfg/APCfm.cfg");
		}
	}
	/**
	 * @方法 init
	 * @所属页面 system_hostname.asp
	 * @参数 （objec）f 要初始化的表单对象
	 * @描述 在html元素加载完成后运行，初始化页面元素的值。
	 */
	function initSystemHostname() {
		$("#head").html(tbl_head(11));
		$("#tail").html(tbl_tail('time'));
		var t = time.split("-");
		if (checkTime == 1) {
			f.check.checked = true;
		} else {
			f.check.checked = false;
		}
		f.SETPRIO.value = setPeriod;
		f.TZ.value = timeZone;
		f.year.value = t[0];
		f.month.value = t[1];
		f.day.value = t[2];
		f.hour.value = t[3];
		f.minute.value = t[4];
		f.second.value = t[5];
	}
});