<!DOCTYPE html>
<html style="display:none;">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>System | Firmware Upgrade</title>
<link rel="stylesheet" href="./public/style.css?version=350" />
<script src="./lang/b28n.js?version=350"></script>

</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<form name="frmSetup" method="post" action="/cgi-bin/upgrade" enctype="multipart/form-data" id="system_upgrade" class="w750">
		<table width="640" class="ml20 mt20">
			<tr>
				<td>Use this section to update device's firmware for better functionalities or new features.</td>
			</tr>
			<tr>
				<td>Select a Firmware File:
				<input type="file" name="upgradeFile"/>&nbsp;&nbsp;
				<input id="fwsubmit" type="button" class="button" value="Upgrade" onClick="preSubmit(document.frmSetup)"/>
				</td>
			</tr>
			<tr>
				<td id="fireware"></td>
			</tr>
			<tr>
				<td>Note: Do not disconnect the device from power and network connections while upgrade is in process, otherwise it may be permanently damaged. When upgrade is complete, the device restarts automatically. Upgrade may take about 90 seconds. Please wait.</td>
			</tr>
		</table>
	</form>
</div>

<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./js/system.js?version=350"></script>
<script src="./js/macro_config.js?version=350"></script>
<script>
var FirwareVerion = CONFIG_FIRWARE_VERION,//升级包版本
	FirwareDate = CONFIG_FIRWARE_DATE;//升级日期
</script>
</body>
</html>