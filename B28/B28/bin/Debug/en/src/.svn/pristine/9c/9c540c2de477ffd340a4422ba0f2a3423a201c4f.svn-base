<!DOCTYPE html>
<html style="display:none;">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>System | System Log</title>
<link rel="stylesheet" href="./public/style.css?version=350" />
<script src="./lang/b28n.js?version=350"></script>
</head>
<body id="log">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="/goform/SysToolSysLog" method="post" name="frmSetup">
		<input type="hidden" name="TYPE" value="0" />
		<input type="hidden" name="page" value="log">
		<input type="hidden" name="op" value="0">
		<p class="mt20 ml20 w640 tr">Type of logs to display:
			<select id="syslogType" name="syslogType" style="display:inline">
				<option value="all">All</option>
				<option value="system">System</option>
			</select></p>
		<div id="logs"></div><br/>
		<div id="pages" class="pl30"></div>
		</form>
		<div id="tail"><br><input type="button" name="refresh" class="button" value="Refresh"><br><br>
			<input type="button" name="clear" class="button" value="Clear"><br><br>
			<input class="button" type="button" value="Help" onclick="doHelp('log_view')">
		</div>
	</div>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./js/system_log.js?version=350"></script>
</body>
</html>