<!DOCTYPE html>
<html style="display:none;"><head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Access Control</title>
	<link rel="stylesheet" href="./public/style.css?version=350">
	<script src="./lang/b28n.js?version=350"></script>

</head>
<body id="filter">
	<div class="divbody">
		<div id="head"></div>
		<div class="w750">
			<form action="/goform/WifiMacFilterSet" method="post" name="wireless_filter">
				<input type="hidden" id="GO" name="GO" value="wireless_filter.asp">
				<input name="wrlRadio" type="hidden" value="2.4G">
				<input type="hidden" id="macList" name="macList">
				<p class="w640 mt20 ml20">You can specify MAC address filter rules to allow or disallow specified clients to connect to the wireless network of this device.</p>
				<div class="w640">
					<div class="control-group">
						<label class="control-label">SSID</label>
						<div class="controls">
							<select id="ssidIndex" name="ssidIndex">
								<option value="1">1</option>
								<option value="2"></option>
								<option value="3"></option>
								<option value="4"></option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">MAC Address Filter Mode</label>
						<div class="controls">
							<select size="1" name="filterMode" id="filterMode">
								<option value="disabled">Disable</option>
								<option value="allow">Allow</option>
								<option value="deny">Disallow</option>
							</select>
						</div>
					</div>
				</div>
				<table id="wrlFilter" width="640" border="1" class="ml20 tc table-td">
					<thead>
						<tr class="a3">
							<td width="10%">ID</td>
							<td width="25%">MAC Address</td>
							<td width="20%">IP Address</td>
							<!--<td width="15%">R加密</td>
						<td width="10%">带宽</td>
						-->
						<td width="20%">Connection Duration</td>
						<td width="25%">Add to List</td>
					</tr>
				</thead>
				<tbody id="clientList"></tbody>
			</table>
			<table id="filterTab" class="w640 ml20 tc">
				<tbody><tr>
					<td width="75%">MAC Address</td>
					<td width="25%">Operation</td>
				</tr>
				<tr>
					<td>
						<input type="text" class="input-mic-mini" name="mac1" size="2" maxlength="2">:<input type="text" class="input-mic-mini" name="mac2" size="2" maxlength="2">:<input type="text" class="input-mic-mini" name="mac3" size="2" maxlength="2">:<input type="text" class="input-mic-mini" name="mac4" size="2" maxlength="2">:<input type="text" class="input-mic-mini" name="mac5" size="2" maxlength="2">:<input type="text" class="input-mic-mini" name="mac6" size="2" maxlength="2">
					</td>
					<td>
						<input type="button" class="button" id="add" value="Add">
					</td>
				</tr>
				<tr>
					<td colspan="2" id="list"></td>
				</tr>
			</tbody></table>
		</form>
		<div id="tail"></div>
	</div>
</div>

<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./js/wireless_filter.js?version=350"></script>


</body></html>