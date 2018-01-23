<!DOCTYPE html>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>System | Error</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<table width="640" class="ml20 mt20">
		<tbody><tr>
			<td colspan="2" id="errorInfo" class="red"></td>
		</tr>
	</tbody></table>
</div>


<script>var error_msg = {
	"err_": _("Error"),
	"err_1000": _("OK"),
	"err_1001": _("Format error."),
	"err_1002": _("Format error (CRC error)"),
	"err_1003": _("Format error (excessively large upgrade file)"),
	"err_1004": _("Upgrade failed."),
	"err_2000": _("OK"),
	"err_2001": _("An error occurred during configuration file upgrade."),
	"err_2002": _("Format error."),
	"err_3000": _("OK"),
	"err_3001": _("A transmission error occurred during policy file upgrade."),
	"err_3002": _("Policy file format error"),
	"err_3003": _("The policy file cannot be upgraded."),
	"err_3004": _("Policy file upgrade failed. An error occurred when writing data to the flash memory."),
	"err_4001": _("Incorrect old password. Please enter the correct one.")
};

window.onload = function(){
	var pathname_arr = window.location.toString().split('?'),
		my_error_id = "err_" + (pathname_arr[1] ? pathname_arr[1] : "");
	document.getElementById("head").innerHTML = tbl_head(18);
	document.getElementById("errorInfo").innerHTML = error_msg[my_error_id];
}</script>
</body></html>