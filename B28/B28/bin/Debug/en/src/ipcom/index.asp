<!DOCTYPE html>
<html><head>
	<meta charset="utf-8">
	<title></title>
	<link href="./public/style.css?version=350" rel="stylesheet">
	<link href="./public/index.css?version=350" rel="stylesheet">
	<link href="./public/reasy-ui.css?version=350">
	<script src="./lang/b28n.js?version=350"></script>
	<meta name="msapplication-TileColor" content=" #009900">

	<script src="./js/macro_config.js?version=350"></script>
	<!--[if IE 6]>

	<style>
     .nav_top{behavior: url("./public/csshover3.htc?version=350");}
    </style>
	<![endif]-->
</head>
<body class="topbody">
	<div id="top">
		<div id="top_left"></div>
		<div id="top_right"></div>
	</div>
	<div id="middle">
		<div id="top_right_title">
			<span id="userType">User Name:</span>[<span style="color: #FF0000;font-weight: bold;" id="userName">admin</span>]<span id="FirwareVerion"></span>
		</div>
		<div id="middle_left">
			<ul>
				<li class="Bborder">
					<span class="red"></span>
					<a name="status" data-test="status_system.asp" id="sta-0">Status</a>
					<ul class="none ml20">
						<li>
							<span></span>
							<a data-test="status_system.asp" id="sta-sys">System Status</a>
						</li>
						<li>
							<span></span>
							<a data-test="status_wireless.asp" id="sta-wifi">Wireless Status</a>
						</li>
						<li>
							<span></span>
							<a id="sta-qos" data-test="status_ap.asp">Traffic Statistics</a>
						</li>
						<li>
							<span></span>
							<a data-test="status_wirelesslist.asp" id="sta-wifiClient">Wireless Clients</a>
						</li>
					</ul>
				</li>
				<li class="Bborder">
					<span></span>
					<a data-test="wizard.asp" id="wiz-0">Quick Setup</a>
				</li>
				<li class="Bborder">
					<span></span>
					<a id="net-0" data-test="lan.asp">Network</a>
					<ul class="none ml20">
						<li>
							<span></span>
							<a data-test="lan.asp" id="net-lan">LAN Setup</a>
						</li>
						<li>
							<span></span>
							<a data-test="lan_dhcps.asp" id="net-dhcps">DHCP Server</a>
						</li>
					</ul>
				</li>
				<li class="Bborder">
					<span></span>
					<a data-test="wireless_basic.asp" id="wrl-0">Wireless</a>
					<ul id="wl" class="none ml20">
						<!--<li>
						<span></span>
						<a target="rightFrame" href="wireless_mode.asp?version=350" data-test=".asp">无线桥接</a>
					</li>
					-->
					<li>
						<span></span>
						<a data-test="wireless_basic.asp" id="wrl-basic">SSID</a>
					</li>
					<li>
						<span></span>
						<a data-test="wireless_radio.asp" id="wrl-rd">Radio Status</a>
					</li>
					<li>
						<span></span>
						<a data-test="wireless_radioUp.asp" id="wrl-rdup">Radio Optimization</a>
					</li>
					<li>
						<span></span>
						<a data-test="wireless_rate.asp" id="wrl-scan">Frequency Analysis</a>
					</li>
					<li>
						<span></span>
						<a data-test="wmmSetting.asp" id="wrl-WMM">WMM</a>
					</li>
					<!--<li>
					<span></span>
					<a target="rightFrame" href="wireless_wds.asp?version=350" data-test=".asp">WDS</a>
				</li>
				-->
				<li>
						<span></span>
						<a data-test="wireless_filter.asp" id="wrl-filter">Access Control</a>
					</li>
				<li>
					<span></span>
					<a data-test="wireless_advance.asp" id="wrl-adv">Advanced</a>
				</li>
				<li>
					<span></span>
					<a data-test="wireless_qvlan.asp" id="wrl-qvlan">QVLAN</a>
				</li>
				<li id="packet_menu">
					<span></span>
					<a data-test="wireless_packet.asp" id="wirelessPacket">无线抓包</a>
				</li>
			</ul>
		</li>
		<li id="network" class="Bborder">
			<span></span>
			<a data-test="qos_control.asp" id="qos-0">Traffic Control</a>
		</li>
		<li id="advance" class="Bborder">
			<span></span>
			<a data-test="snmp.asp" id="adv-0">SNMP</a>
		</li>
		<script>if (CONFIG_AP_MANAGE_V2 == 'y'||CONFIG_AP_MANAGE_V3 == 'y') {
			if (CONFIG_AP_MANAGE_V3 == 'y') {
				document.writeln('<li class="Bborder"><span></span><a  data-test="deploy.asp">Deployment</a><ul id="deploy" class="none ml20">'
					);
				/*if (CONFIG_AC_MANAGEMENT == 'y') {
					document.writeln('<li><span></span><a  data-test="vac_deploy.asp id="vacDeploy"">Virtual AC</a></li>');
				}*/
				document.writeln('</ul></li>')

			}
		}</script>
		<li class="Bborder" id="tool">
			<span></span>
			<a data-test="system_upgrade.asp" id="tool-0">Tools</a>
			<ul class="none ml20">
				<li>
					<span></span>
					<a data-test="system_upgrade.asp" id="sys-upgrade">Firmware Upgrade</a>
				</li>
				<li>
					<span></span>
					<a data-test="system_hostname.asp" id="sys-time">Date &amp; Time</a>
				</li>
				<li>
					<span></span>
					<a data-test="system_log.asp" id="sys-log">Logs</a>
				</li>
				<li>
					<span></span>
					<a data-test="system_backup.asp" id="sys-config">Configuration</a>
				</li>
				<li>
					<span></span>
					<a data-test="system_password.asp" id="sys-password">User Name &amp; Password</a>
				</li>
				<li>
					<span></span>
					<a data-test="system_checktool.asp" id="sys-check">Diagnostics Tool</a>
				</li>
				<li>
					<span></span>
					<a data-test="system_reboot.asp" id="sys-reboot">Reboot</a>
				</li>
				<li>
					<span></span>
					<a data-test="system_led.asp" id="sys-led">LED Control</a>
				</li>
			</ul>
		</li>
	</ul>
</div>
<div id="middle_right">
	<!--<div id="iframe_contain">
	-->
	<iframe data-test="status_system.asp" name="rightFrame" width="100%" height="100%" frameborder="no" scrolling="auto"></iframe>
	<!--</div>--></div>

</div>
<div style=" position: absolute; top: 92%; height: 8%; left: 202px; background: #fafafa; width: 100%;">
<hr> <i>Copyright (c) 2017 IP-COM Networks Co., Ltd. All Rights Reserved.</i> 
</div>

<script>var FirwareVerion = CONFIG_FIRWARE_VERION;
var max_ssid_5g_num = CONFIG_5G_MAX_SSID_NUMBER;

var userType = "admin",//"admin|user",//
	adminName = "admin",
	userName = "user",
	productName = "I21V1.0";
var main_max_power_2g = "3",
	main_min_power_2g = "4",
	main_def_power_2g = "2",
	main_max_power_5g ="1",
	main_min_power_5g = "3",
	main_def_power_5g = "2";</script>

<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>

<script src="./js/index.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>


</body></html>