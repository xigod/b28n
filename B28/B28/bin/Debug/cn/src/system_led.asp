<!DOCTYPE html>
<html style="display:none;">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>System | backup</title>
<link rel="stylesheet" href="./public/style.css?version=350" />
<script src="./lang/b28n.js?version=350"></script>

</head>
<body>
<div class="divbody">
	<div id="head"></div>
		<form name="frmSetup" method="post" action="/goform/setLedInfo" id="system_led">
			<input type="hidden" name="GO" value="system_led.asp" />
			<input type="hidden" name="action" value="1" />
			<table width="640" class="ml20 mt20">
				<tr>
					<td colspan="2" align="center"><br><input type="button" class="button1 fb button" value="Enable all LEDs" name="ledStatus"/></td>
				</tr>
			</table>
		</form>
		<div id="tail"><br><input class="button" type="button" value="Help" onClick="doHelp('led')"></div>
</div>

<script>
B.setTextDomain("all");
/*// var ledStatus = "<%aspTendaGetStatus("sys","ledstatus");%>";
document.getElementById("head").innerHTML = tbl_head(25);
if (ledStatus == "1") {
	document.frmSetup.ledStatus.value = _("Disable all LEDs");
}*/
</script>
<!-- <script>
	function clickLed() {
		if (parent.userType == "user") {
			alert(_("You must log in as an administrator to make any change."));
			return false;
		}
		if (ledStatus == "1") {
			document.frmSetup.ledStatus.value = _("Disable all LEDs");
			document.frmSetup.led.value = "0";
		}
		document.frmSetup.submit();
	}
</script> -->
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="js/system_led.js"></script>
</body>
</html>

