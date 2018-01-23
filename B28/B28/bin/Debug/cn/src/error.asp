<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>System | Error</title>
<link rel="stylesheet" href="./public/style.css?version=350" />
<script src="./lang/b28n.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<table width="640" class="ml20 mt20">
		<tr>
			<td colspan="2" id="errorInfo" class="red"></td>
		</tr>
	</table>
</div>
</body>

<script>
var error_msg = {
	"err_": _("An error is found!"),
	"err_1000": _("OK"),
	"err_1001": _("Error!"),
	"err_1002": _("Error（CRC error)!"),
	"err_1003": _("Error (Upgrade file is oversized)!"),
	"err_1004": _("Upgrade failed!"),
	"err_2000": _("OK"),
	"err_2001": _("ERROR"),
	"err_2002": _("Error!"),
	"err_3000": _("OK"),
	"err_3001": _("An error occurred during policy upgrade (transmission error)."),
	"err_3002": _("Policy file is in wrong format!"),
	"err_3003": _("Old-version policy file cannot be upgraded!"),
	"err_3004": _("Policy upgrade failed (An error occurred when writing flash)."),
	"err_4001": _("Please enter the right password!")
};

window.onload = function(){
	var pathname_arr = window.location.toString().split('?'),
		my_error_id = "err_" + (pathname_arr[1] ? pathname_arr[1] : "");
	document.getElementById("head").innerHTML = tbl_head(18);
	document.getElementById("errorInfo").innerHTML = error_msg[my_error_id];
}
</script>
</html>