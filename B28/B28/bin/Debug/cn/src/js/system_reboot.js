$(function () {
	$("#head").html(tbl_head(26));
	$("#rebootBtn").on("click", submitSystemReboot);
	/**
	 * @方法 submitSystemReboot
	 * @所属页面 system_reboot.asp
	 * @参数 （objec）f 要操作的表单对象
	 * @描述 验证数据，并向后台提交数据,页面跳转到direct_reboot.asp。
	 */
	function submitSystemReboot() {
        if (parent.userType == "user") {
            alert(_("You must log in as an administrator to make any change."));
            return;
        }
		if (window.confirm(_("System will be redirected to home page in 1 minute."))) {
			//var url = "http://" + lanip;
			$.get("/goform/SysToolReboot?r="+Math.random(), function () {
				window.parent.reboot('', 450, 0);
			});
		} else return;
	}
});