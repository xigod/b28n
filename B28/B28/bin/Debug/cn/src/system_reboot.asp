<!DOCTYPE html>
<html style="display:none;">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Reboot</title>
<link rel="stylesheet" href="./public/style.css?version=350" />
<script src="./lang/b28n.js?version=350"></script>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>		
	<form name='frmSetup' method="post" action='/goform/SysTimeReboot' id="system_reboot">
	<div style="margin:30px">
		<p>This page allows you to configure the rebooting time, or click the 'Reboot' button to restart your device.</p>
		<input class="button" value="Reboot" type="button" id="rebootBtn" />
	</div>
	<!-- <table width="640" class="ml20 mt20">
		<tr>
			<td colspan="2">This page allows you to configure the rebooting time, or click the 'Reboot' button to restart your device.</td>
		</tr>
			<td colspan="2">
		</tr>
	</table> -->
	</form>
</div>
</body>

<script src="./js/system_reboot.js?version=350"></script>
<script>
/*var lanip = "<%aspTendaGetStatus("lan","lan_ip");%>",
	reboot_sslenable = "<%aspTendaGetStatus("lan","lan_webiplansslen");%>",
	reboot_time = "<%aspTendaGetStatus("sys","reboot_time");%>";*/
</script>
</html>