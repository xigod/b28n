<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Wireless Clients</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
</head>
<body id="wirelessList_5g">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<div class="fl">
			<table width="640" class="ml20 mt20">
				<tbody><tr>
					<td colspan="2">You can view information about connected wireless clients here.</td>
				</tr>
				<tr>
					<td>Connected Hosts</td>
					<td align="right"><select name="index" id="index"></select></td>
				</tr>
			</tbody></table>
			<table width="640" border="1" class="ml20 tc table-td">
			<thead>
				<tr class="a3">
					<td width="10%">ID</td>
					<td width="25%">MAC Address</td>
					<td width="20%">IP Address</td>
					<!--<td width="25%">Encryption</td>
					<td width="10%">Bandwidth</td>-->
					<td width="10%">Connection Duration</td>
					<td width="10%">Transmit Speed</td>
					<td width="10%">Receive Speed</td>
                    <td width="20%" id="os_type" style="display:none;">Client Type</td>
                    <td width="10%">踢下线</td>
				</tr>
			</thead>     
			<tbody id="list"></tbody>
			</table>
		</div>
		<div id="tail"><br><input class="button" type="button" value="Help" onclick="doHelp('st_wirelesslist')"></div>
	</div>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./js/status_wirelesslist.js?version=350"></script>

</body></html>