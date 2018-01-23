$(function () {
	$("#head").html(tbl_head(13));
	$("#backup").on('click', DownLoadCfg);
	$("#restoreTo").on('click', UpLoadCfg);
	$("#restore").on("click", function () {
        if (parent.userType == "user") {
            alert(_("You must log in as an administrator to make any change."));
            return;
        }
		if (window.confirm(_("Device will restart automatically! The IP address will be reset to 192.168.0.254.") +
				_("User Name and Password will be reset to admin. Update your PC's TCP/IP settings and re-access the utility if the webpage is not refreshed."))) {
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
			alert(_("You must log in as an administrator to make any change."));
			return;
		}
		var tmp = document.frmSetup.fileCfg.value.toLowerCase();
		var arr = tmp.split(".");
		/*	alert(arr);*/
		if (arr[0] == "") {
			alert(_("Please first select a valid configuration file!"));
			return;
		} else if (arr[arr.length - 1] != "cfg") {
			alert(_("The file to import MUST have a file name suffix of cfg."));
			return;
		}
		if (confirm(_("To activate loaded settings, you need to reboot the device.")))
			document.frmSetup.submit();
	}
	/**
	 * @方法名称  UpLoadCfg
	 * @所属页面  system_backup.asp
	 * @功能描述  导出的配置文件，并默认把他保存电脑中的我的文档文件夹里。
	 */
	function DownLoadCfg() {
		if (parent.userType == "user") {
			alert(_("You must log in as an administrator to make any change."));
			return;
		}
		if (confirm(_("Please select a path on your computer to save the configuration file."))) {
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