<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>DHCP Clients</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form name="lanDhcpClients">
			<table width="640" class="ml20 mt20 table-td">
				<tbody><tr>
					<td>After the DHCP server is enabled, this list is updated every five seconds.<input type="button" style="margin-left:8px;" class="button" value="Refresh" id="refresh">
					</td>
				</tr>
			</tbody></table>
			<table width="640" border="1" class="ml20 tc table-td" id="dhcps_table">
			<thead>
				<tr class="a3">
					<td width="10%">ID</td>
					<td width="25%">Host Name</td>
					<td width="25%">IP Address</td>
					<td width="25%">MAC Address</td>
					<td width="15%">Lease Time</td>
				</tr>
			</thead>     
			<tbody id="list"></tbody>
			</table>
		</form>
	</div>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./js/lan_dhcp_clients.js?version=350"></script>

</body></html>