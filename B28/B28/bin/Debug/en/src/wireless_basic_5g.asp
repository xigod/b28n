<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache">
<title>SSID</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
</head>
<body id="basic">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="/goform/wifiSSIDset" method="post" name="wireless_basic">
			<input type="hidden" id="GO" name="GO" value="wireless_basic_5g.asp">
			<input name="wrlRadio" type="hidden" value="5G">
			<input type="hidden" id="enableWireless" name="enableWireless">
			<input type="hidden" id="broadcast" name="broadcast">
				<div class="myTable mt20">
					<div class="control-group">
						<label class="control-label">SSID</label>
						<div class="controls">
							<select id="ssidIndex" name="ssidIndex">
							<option value="1"></option>
							<option value="2"></option>
							<option value="3"></option>
								<option value="4"></option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Enable</label>
						<div class="controls">
							<input type="checkbox" value="1" id="ssidEn" name="ssidEn"></div>
					</div>
					<div class="control-group none">
						<label class="control-label">Hide SSID Automatically</label>
						<div class="controls">
							<input type="checkbox" value="1" name="hideSsid"></div>
					</div>
					<div class="control-group">
						<label class="control-label">Broadcast SSID</label>
						<div class="controls">
							<select id="broadcastSsidEn" name="broadcastSsidEn">
								<option value="false">Disable</option>
								<option value="true">Enable</option>
							</select>
						</div>
				<!--<tr>
					<td>当前工作模式</td>
					<td><input type="text" name="wlMode" readonly /></td>
				</tr>-->
					</div>
					<div class="control-group">
						<label class="control-label">Isolate Client</label>
						<div class="controls">
							<input type="radio" name="apIsolationEn" value="false" checked="checked">Disable<input type="radio" name="apIsolationEn" value="true">Enable</div>
					</div>
					<div class="control-group">
						<label class="control-label">WMF</label>
						<div class="controls">
							<input type="radio" name="wmfEn" value="false" checked="checked">Disable<input type="radio" name="wmfEn" value="true">Enable</div>
					</div>
					<div class="control-group">
						<label class="control-label">Suppress Broadcast Probe Response</label>
						<div class="controls">
							<input type="radio" name="probeEn" value="false" checked="checked">Disable<input type="radio" name="probeEn" value="true">Enable</div>
					</div>
					<div class="control-group">
						<label class="control-label">Max. Number of Clients</label>
						<div class="controls">
							<input type="text" id="maxClients" name="maxClients" size="5" maxlength="3" value="10">
							<span id="clientHelp" class="text-help">(Range:1-64)</span>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">SSID</label>
						<div class="controls">
							<input type="text" id="ssid" name="ssid" maxlength="32"></div>
					</div>
					<div class="control-group">
						<label class="control-label">Chinese SSID Encoding</label>
						<div class="controls">
							<select id="ssidEncode" name="ssidEncode">
								<option value="utf-8">UTF-8</option>
								<option value="gb2312">GB2312</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Security Mode</label>
						<div class="controls">
							<select id="secMode" name="secMode">
								<option value="none">None</option>
								<option value="wep">WEP</option>
								<option value="wpapsk">WPA-PSK</option>
								<option value="wpa2psk">WPA2-PSK</option>
								<option value="wpawpa2psk">Mixed WPA/WPA2-PSK</option>
								<option value="wpa">WPA</option>
								<option value="wpa2">WPA2</option>
							</select>
						</div>
					</div>
					<div class="control-group" id="wepAuthWrap">
						<label class="control-label">Authentication Type</label>
						<div class="controls">
							<select name="wepAuth" id="wepAuth">
								<option value="open">Open</option>
								<option value="shared">Shared</option>
								<option value="802.1x">802.1x</option>
							</select>
						</div>
					</div>
				</div>
			<!-- 802.1x -->
				<div id="div_802" class="myTable none">

					<div class="control-group">
						<label class="control-label">RADIUS Server</label>
						<div class="controls">
							<input type="text" name="radiusServerIp" id="radiusServerIp" size="15" maxlength="15"></div>
					</div>
					<div class="control-group">
						<label class="control-label">RADIUS Port</label>
						<div class="controls">
							<input type="text" name="radiusPort" id="radiusPort" size="5" maxlength="5"><span class="text-help">(Range: 1025 to 65535; Default: 1812)</span></div>
					</div>
					<div class="control-group">
						<label class="control-label">RADIUS Password</label>
						<div class="controls">
							<input name="radiusPwd" id="radiusPwd" maxlength="64" type="password"></div>
					</div>
				</div>
				<!-- WEP -->
				<div id="div_wep" class="myTable none">
					<div class="control-group">
						<label class="control-label">Default Key</label>
						<div class="controls">
							<select name="wepDefaultKey" id="wepDefaultKey">
								<option value="1" selected="selected">Key 1</option>
								<option value="2">Key 2</option>
								<option value="3">Key 3</option>
								<option value="4">Key 4</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Key 1</label>
						<div class="controls">
							<input name="wepKey1" type="password" id="wepKey1" maxlength="26">
							<select id="wepKey1Type" name="wepKey1Type">
								<option value="1">ASCII</option>
								<option value="0">Hex</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Key 2</label>
						<div class="controls">
							<input id="wepKey2" type="password" name="wepKey2" maxlength="26">
							<select id="wepKey2Type" name="wepKey2Type">
								<option value="1">ASCII</option>
								<option value="0">Hex</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Key 3</label>
						<div class="controls">
							<input id="wepKey3" type="password" name="wepKey3" maxlength="26">
							<select id="wepKey3Type" name="wepKey3Type">
								<option value="1">ASCII</option>
								<option value="0">Hex</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Key 4</label>
						<div class="controls">
							<input id="wepKey4" type="password" name="wepKey4" maxlength="26">
							<select id="wepKey4Type" name="wepKey4Type">
								<option value="1">ASCII</option>
								<option value="0">Hex</option>
							</select>
						</div>
					</div>
				</div>
				<!-- WPA -->
				<div id="div_wpa" class="myTable none">
					<div class="control-group">
						<label class="control-label" width="180">Encryption Algorithm</label>
						<div class="controls">
							<input name="cipherType" value="aes" type="radio" checked="checked">AES<input name="cipherType" value="tkip" type="radio">TKIP<input name="cipherType" value="aes+tkip" type="radio">TKIP&amp;AES</div>
					</div>
					<div class="control-group" id="wpaPasswd">
						<label class="control-label">Key</label>
						<div class="controls">
							<input type="password" id="wifiPwd" name="wifiPwd" size="28" maxlength="64">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Key Update Interval</label>
						<div class="controls">
							<input type="text" id="keyPeriod" name="keyPeriod" size="4" maxlength="5"><span class="text-help" style="margin-left:3px;">s (Range: 60 to 99999 seconds. 0 indicates no update.)</span>
						</div>
					</div>
				</div>
			</form>
			<div id="tail"></div>
		</div>
	</div>
		<script src="./public/j.js?version=350"></script>
	<script src="./js/reasy-ui.js?version=4093"></script> 

	<script src="./public/gozila.js?version=350"></script>
	<script src="./public/menu.js?version=350"></script>
	
	<script src="./js/wireless_basic.js?version=350"></script>


</body></html>