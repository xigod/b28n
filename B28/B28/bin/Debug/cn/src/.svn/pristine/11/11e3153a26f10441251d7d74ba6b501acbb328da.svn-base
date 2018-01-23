<!DOCTYPE html>
<html style="display:none;">
<head>
	<meta charset="utf-8" />
	<title>DHCP Setup</title>
	<link rel="stylesheet" href="./public/style.css?version=350" />
	<script src="./lang/b28n.js?version=350"></script>

</head>
<body>
	<div class="divbody">
		<div id="head"></div>
		<div class="w750">
			<form name="lanDhcp" method="post" action="/goform/DhcpSetSer">
				<input type="hidden" name="GO"  value="lan_dhcps.asp">
				<div class="myTable mt20">
					<div class="control-group">
						<label class="control-label">DHCP Server</label>
						<div class="controls">
							<input type="checkbox" id="dhcpEn"  name="dhcpEn" value=1>Enable</div>
					</div>
					<div class="control-group">
						<label class="control-label">Start IP</label>
						<div class="controls">
							<input type="text" id="dhcpStartIp" name="dhcpStartIp" class="text" maxlength="15" ></div>
					</div>
					<div class="control-group">
						<label class="control-label">End IP</label>
						<div class="controls">
							<input type="text" id="dhcpEndIp" name="dhcpEndIp" class="text" maxlength="15" ></div>
					</div>
					<div class="control-group">
						<label class="control-label">Lease Time</label>
						<div class="controls">
							<select id="dhcpLeaseTime" name="dhcpLeaseTime">
								<option value="604800">7 days</option>
								<option value="259200">3 days</option>
								<option value="86400">1 day</option>
								<option value="43200">12 hours</option>
								<option value="21600">6 hours</option>
								<option value="3600">1 hour</option>
								<option value="1800">30 minutes</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Subnet Mask</label>
						<div class="controls">
							<input type="text" id="dhcpMask" name="dhcpMask" class="text" maxlength="15" ></div>
					</div>
					<div class="control-group">
						<label class="control-label">Gateway</label>
						<div class="controls">
							<input id="dhcpGw" name="dhcpGw" class="text" maxlength="15"></div>
					</div>
					<div class="control-group">
						<label class="control-label">Primary DNS Server</label>
						<div class="controls">
							<input id="dhcpDns1" name="dhcpDns1" class="text" size=15 maxlength=15 ></div>
					</div>
					<div class="control-group">
						<label class="control-label">Secondary DNS Server (Optional)</label>
						<div class="controls">
							<input type="text" id="dhcpDns2" name="dhcpDns2" class="text" size=15 maxlength=15 ></div>
					</div>
				</div>
			</form>
			<div id="tail"></div>
		</div>
	</div>
	<script src="./public/j.js?version=350"></script>
	<script src="./public/gozila.js?version=350"></script>
	<script src="./public/menu.js?version=350"></script>
	<script src="./js/lan_dhcps.js?version=350"></script>
</body>
	
</html>