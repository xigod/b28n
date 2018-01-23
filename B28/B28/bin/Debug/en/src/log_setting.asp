<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>System | log set</title>
<link rel="stylesheet" href="public/style.css">
<script src="./lang/b28n.js?version=4112"></script>
</head>
<body id="logset">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form name="frmSetup" method="POST" action="/goform/LogsSetting">
			<table class="w640 mt20 ml20 table-td">
				<tbody><tr>
					<td><span class="w110 fl">Number of Logs</span><input type="text" maxlength="3" name="logsNum"><span class="text-help">(Range: 100 to 300; Default: 150)</span></td>
				</tr>
				<tr>
					<td><input type="checkbox" name="check">Enable<font color="#FF0000">Log Service</font></td>
				</tr>
				<tr>
					<td><div id="List"></div></td>
				</tr>
			</tbody></table>
			<div class="m20 tr" style="text-align:center">
				<input type="button" class="button1 button" value="Add" id="addToList">
			</div>
			<input type="hidden" name="isoncheck">
			<input type="hidden" name="entrys">
		</form>
		<div id="tail"></div>
	</div>
</div>


<script src="./public/j.js?version=4112"></script>
<script src="./public/gozila.js?version=4112"></script>
<script src="./public/common.js?version=4112"></script>
<script src="./public/menu.js?version=4112"></script>
<script src="./js/log_setting.js?version=4112"></script>
<script>var reqStr  = "<%TendaGetLongString("logs_list");%>",//"",//
	ischeck = "<%aspTendaGetStatus("adv","logs_en");%>",//"1";//
	logsNum = "<%aspTendaGetStatus("sys","logsnum");%>";</script>
</body></html>