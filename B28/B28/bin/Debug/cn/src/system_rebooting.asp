<!DOCTYPE html>
<html style="display:none;">
<head>
<meta charset="utf-8" />
<title>System | System Update</title>
<link rel="stylesheet" href="./public/style.css?version=350" />
<script src="./lang/b28n.js?version=350"></script>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<form name="frmSetup" method="post" id="system_rebooting" action="/goform/SysToolReboot">
	<table width="640" class="ml20 mt20 none">
		<tr>
			<td>You need to reboot this device to save your configurations.</td>
		</tr>
		<tr>
			<td aligh="center">
			<input class="button" type="button" name="continue" onClick="history.back()" value="Continue"/>
			<input class="button" type="submit" name="reboot"  value="Reboot Now"/>
			</td>
		</tr>
	</table>
	</form>
</div>
</body>

<script src="./js/system.js?version=350"></script>
<script>
var lanip = "<%aspTendaGetStatus("lan","lan_ip");%>",//"192.168.0.1",//
	sslenable = "<%aspTendaGetStatus("lan","lan_webiplansslen");%>",//0,//
	rebootUrl = sslenable == 0 ? ("http://" + lanip) : ("https://" + lanip),
	ipMode = "<%aspTendaGetStatus("lan","lan_connecttype");%>";
</script>
</html>