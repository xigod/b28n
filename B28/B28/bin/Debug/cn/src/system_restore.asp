<!DOCTYPE html>
<html style="display:none;">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>System | Configuration Tools</title>
<link rel="stylesheet" href="./public/style.css?version=350" />
<script src="./lang/b28n.js?version=350"></script>

</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<div>
		<form name='frmSetup' method="post" action='/goform/SysToolRestoreSet' id="system_restore" style="width:680px;">
			<input type="hidden" name="CMD" value="SYS_CONF" />
			<input type="hidden" name="GO" value="system_reboot.asp" />
			<input type="hidden" name="CCMD" value="0" />

			<div class="mt20" style="margin-left: 20px;">
					<p>Click this button to reset the device to factory default values.</p>
					<div>
						<input id="restore" value="Restore to Factory Default" type="button" class="button1 button"/>
					</div>
			</div>
			<!-- <table width="640" class="ml20 mt20">
					<tr>
						<td>Click this button to reset the device to factory default values.</td>
					</tr>
					<tr>
						<td><input id="restore" value="Restore to Factory Default" type="button" class="button1"/></td>
					</tr>
				</table> -->	
		</form>
		<div id="tail"><input class="button mt20" type="button" value="Help" onClick="doHelp('restore')"></div>
	</div>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>

<script src="./js/system_config.js?version=350"></script>
</body>
</html>