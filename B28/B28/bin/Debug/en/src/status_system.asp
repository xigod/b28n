<!DOCTYPE html>
<html style="display:none;"><head>
<meta charset="utf-8">
<title>SYSTEM | status</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
</head>
<body id="system">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<div class="fl">
			<div class="myTable mt20">
				<div class="control-group a3">
					<label class="control-label label-bold">System Status</label>
					<div class="controls">&nbsp;</div>
				</div>
				<div class="control-group">
					<label class="control-label">Device Name</label>
					<div class="controls" id="deviceName"></div>
				</div>
				<div class="control-group">
					<label class="control-label">System Time</label>
					<div class="controls" id="systemTime"></div>
				</div>
				<div class="control-group">
					<label class="control-label">Uptime</label>
					<div class="controls" id="runningTime"></div>
				</div>
				<div class="control-group">
					<label class="control-label">Number of Wireless Clients</label>
					<div class="controls" id="clientNum"></div>
				</div>
				<div class="control-group">
					<label class="control-label">Firmware Version</label>
					<div class="controls" id="firmwareVersion"></div>
				</div>
				<div class="control-group">
					<label class="control-label">Hardware Version</label>
					<div class="controls" id="hardVersion"></div>
				</div>
                <div class="control-group a3 wan_msg none">
                  	<label class="control-label">WAN Status</label>
                  	<div class="controls"></div>
                </div>
                <div class="control-group wan_msg">
                    <label class="control-label">Connection Status</label>
                    <div class="controls" id="connectStatus"></div>
                </div>
                <div class="control-group wan_msg">
                    <label class="control-label">IP Address</label>
                    <div class="controls" id="wanIp"></div>
                </div>
                <div class="control-group wan_msg">
                    <label class="control-label">Subnet Mask</label>
                    <div class="controls" id="wanMask"></div>
                </div>
                <div class="control-group wan_msg">
                    <label class="control-label">Default Gateway</label>
                    <div class="controls" id="wanGw"></div>
                </div>
                <div class="control-group wan_msg">
                    <label class="control-label">Primary DNS Server</label>
                    <div class="controls" id="wanDns1"></div>
                </div>
                <div class="control-group wan_msg">
                    <label class="control-label">Secondary DNS Server</label>
                    <div class="controls" id="wanDns2"></div>
                </div>
				<div class="control-group a3">
					<label class="control-label label-bold">LAN Status</label>
					<div class="controls"></div>
				</div>
				<div class="control-group">
					<label class="control-label">MAC Address</label>
					<div class="controls" id="lanMac"></div>
				</div>
				<div class="control-group">
					<label class="control-label">IP Address</label>
					<div class="controls" id="lanIp"></div>
				</div>
				<div class="control-group">
					<label class="control-label">Subnet Mask</label>
					<div class="controls" id="lanMask"></div>
				</div>
                <div class="control-group lan_msg">
					<label class="control-label">Primary DNS Server</label>
					<div class="controls" id="lanDns1"></div>
				</div>
				<div class="control-group lan_msg">
					<label class="control-label">Secondary DNS Server</label>
					<div class="controls" id="lanDns2"></div>
				</div>
			</div>
		</div>
		<div id="tail">
		<br>
		<input class="button" type="button" value="Help" onclick="doHelp('st_system')"></div>
	</div>
</div>
<script src="./js/macro_config.js?version=350"></script>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./js/status_system.js?version=350"></script>

</body></html>