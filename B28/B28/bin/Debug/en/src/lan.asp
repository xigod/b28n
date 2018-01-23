<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>LAN Setup</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>

</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="/goform/AdvSetLan" method="post" name="lan">
			<input type="hidden" name="GO" value="lan.asp">
			<input type="hidden" name="reboot" value="1">
			<div class="myTable mt20">
				<div class="control-group">
					<label class="control-label">MAC Address</label>
					<div class="controls" id="lanMac"></div>
				</div>
				<div class="control-group">
					<label class="control-label">IP Address Type</label>
					<div class="controls"><select name="lanMode" id="lanMode">
							<option value="dhcp">DHCP</option>
							<option value="static" selected="">Static IP Address</option>
						</select></div>
				</div>
				<div class="control-group" id="ipAddr">
					<label class="control-label">IP Address</label>
					<div class="controls"><input class="text" maxlength="15" name="lanIp" id="lanIp"><span class="text-help">Example: 192.168.1.254</span></div>
				</div>
				<div class="control-group" id="subnet">
					<label class="control-label">Subnet Mask</label>
					<div class="controls"><input class="text" maxlength="15" name="lanMask" id="lanMask"><span class="text-help">Example: 255.255.255.0</span></div>
				</div>
				<div class="control-group" id="gateWay">
					<label class="control-label">Default Gateway</label>
					<div class="controls"><input class="text" maxlength="15" name="lanGw" id="lanGw"></div>		 
				</div>
                <div class="control-group" id="lan_dns1">
					<label class="control-label" width="35%">Primary DNS Server</label>
					<div class="controls"><input name="lanDns1" id="lanDns1" class="text" size="15" maxlength="15"></div>
				</div>
				<div class="control-group" id="lan_dns2">
					<label class="control-label">Secondary DNS Server (optional)</label>
					<div class="controls"><input name="lanDns2" id="lanDns2" class="text" size="15" maxlength="15"></div>
				</div>
				<div class="control-group">
					<label class="control-label">Device Name</label>
					<div class="controls"><input name="apName" class="text" maxlength="32"></div>
				</div>
                <div class="control-group">
					<label class="control-label">Ethernet Mode</label>
					<div class="controls">
						<input type="radio" name="ethMode" value="auto">Auto Negotiation<input type="radio" name="ethMode" value="10M" checked="">10 Mbps Half Duplex</div>
				</div>
			</div>
		</form>
		<div id="tail"></div>
	</div>
</div>
<div class="divbody greater-label none" id="lan-wait">
    <div class="control-notice">
        <p>Please wait about 10 seconds for saving the new IP address.</p>
        <p style="margin-top:15px; text-align:right">
            <input type="button" id="continu-lan" class="button1" value="Back" style="font-weight:normal">
        </p>
    </div>
</div>

<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./js/lan.js?version=350"></script>
</body></html>