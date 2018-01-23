<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="refresh" content="300">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>SYSTEM | status</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
</head>
<body id="ap_5g">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<div class="fl">
			<table width="640" class="ml20 mt20 tc table-td" border="1">
				<thead class="a4">
					<tr>
						<td width="30%">SSID</td>
						<td>Received Traffic</td>
						<td>Received Packets</td>
						<td>Transmitted Traffic</td>
						<td>Transmitted Packets</td>
					</tr>
				</thead>
				<tbody id="StatisticList">
				</tbody>
			</table>
		</div>
		<div id="tail">
			<br><input class="button" type="button" value="Help" onclick="doHelp('st_ap')">
			<br><br><input type="button" class="button" value="Refresh" onclick="location.reload()">
		</div>
	</div>
</div>

<script src="./public/j.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./js/status_ap.js?version=350"></script>

</body></html>