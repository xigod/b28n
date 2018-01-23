<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>system | log add</title>
<link rel="stylesheet" href="./public/style.css?version=4112">
<script src="./lang/b28n.js?version=4112"></script>
</head>
<body id="logadd">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form name="frmSetup" method="POST" action="/goform/LogsSetting">
			<table class="myTable mt20" id="MyTable">
				<tbody><tr>
					<td>Log Server IP Address</td>
					<td><input class="text" type="text" name="innerIP"></td>
				</tr>
				<tr>
					<td>Log Server Port</td>
					<td><input class="text" type="text" name="port"></td>
				</tr>
				<tr>
					<td>Enable</td>
					<td><input type="checkbox" name="isenable"></td>
				</tr>
			</tbody></table>
			<input type="hidden" name="entrys">
			<input type="hidden" name="op" value="add">
		</form>
		<div id="tail"></div>
	</div>
</div>


<script src="./public/j.js?version=4112"></script>
<script src="./public/gozila.js?version=4112"></script>
<script src="./public/common.js?version=4112"></script>
<script src="./public/menu.js?version=4112"></script>
<script src="./js/system_logadd.js?version=4112"></script>
<script>var reqStr  = "<%TendaGetLongString("logs_list");%>",//"",//
	lanip = "<%aspTendaGetStatus("lan","lan_ip");%>",
	lanmask = "<%aspTendaGetStatus("lan","lan_mask");%>";</script>
</body></html>