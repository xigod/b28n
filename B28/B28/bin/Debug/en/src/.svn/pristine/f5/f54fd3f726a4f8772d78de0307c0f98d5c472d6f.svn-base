<!DOCTYPE html>
<html style="display:none;">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Quick Setup</title>
	<link rel="stylesheet" href="./public/style.css?version=350" />
	<script src="./lang/b28n.js?version=350"></script>

</head>
<body id="mode">
	<div class="divbody">
		<div id="head"></div>
		<div class="w750">
			<form name="frmSetup" method="post" action="/goform/wifiWizard">
				<!--<input type="hidden" name="wrlRadio" value="0">
				-->
				<input type="hidden" name="extend_wl">
				<div>
					<div class="myTable mt20" >
						<div class="control-group" id="radio-set">
							<label class="control-label">WIFI Radio</label>
							<div class="controls">
								<select name="wrlRadio" id="wrlRadio">
									<option value="2.4G">2.4GHz</option>
									<option value="5G">5GHz</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">Mode</label>
							<div class="controls">
								<label class="pr20">
									<input type="radio" name="wrlMode" value="ap" checked>AP Mode</label>
								<label class="pr20 none">
									<input type="radio" name="wrlMode" value="wds">WDS Mode</label>
								<label class="pr20">
									<input type="radio" name="wrlMode" value="apclient">APClient Mode</label>
								<label class="pr20" id="pppoe_set">
									<input type="radio" name="wrlMode" value="pppoe">PPPoE Mode</label>
							</div>
						</div>
					</div>
				</div>
				<div id="ssidWrap">
					<div class="myTable" >
						<div class="control-group">
							<label class="control-label">SSID</label>
							<div class="controls">
								<input type="text" id="ssid" name="ssid" maxlength="32" value=""></div>
						</div>
						<div class="control-group none">
							<label class="control-label">ssidEncode</label>
							<div class="controls">
								<input type="text" id="ssidEncode" name="ssidEncode" maxlength="32" value=""></div>
						</div>
						<div class="control-group">
							<label class="control-label">Security Mode</label>
							<div class="controls">
								<select name="secMode" id="secMode">
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
							<label class="control-label">RADIUS Server:</label>
							<div class="controls">
								<input type="text" id="radiusServerIp" name="radiusServerIp" size="15" maxlength="15"></div>
						</div>
						<div class="control-group">
							<label class="control-label">RADIUS Port:</label>
							<div class="controls">
								<input type="text" id="radiusPort" name="radiusPort" size="5" maxlength="5"></div>
						</div>
						<div class="control-group">
							<label class="control-label">RADIUS Password:</label>
							<div class="controls">
								<input id="radiusPwd" name="radiusPwd" maxlength="64" type="password"></div>
						</div>

					</div>
					<!-- WEP -->
					<div id="div_wep" class="myTable none">
						<div class="control-group">
							<label class="control-label">Default Key</label>
							<div class="controls" colspan="2">
								<select name="wepDefaultKey" id="wepDefaultKey">
									<option value="1" selected="selected">Security Key 1</option>
									<option value="2">Security Key 2</option>
									<option value="3">Security Key 3</option>
									<option value="4">Security Key 4</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">WEP Key 1</label>
							<div class="controls">
								<input type="password" id="wepKey1" name="wepKey1" maxlength="26"/>

								<select id="wepKey1Type" name="wepKey1Type">
									<option value="1">ASCII</option>
									<option value="0">Hex</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">WEP Key 2</label>
							<div class="controls">
								<input type="password" id="wepKey2" name="wepKey2" maxlength="26" />

								<select id="wepKey2Type" name="wepKey2Type">
									<option value="1">ASCII</option>
									<option value="0">Hex</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">WEP Key 3</label>
							<div class="controls">
								<input type="password" id="wepKey3" name="wepKey3" maxlength="26"/>

								<select id="wepKey3Type" name="wepKey3Type">
									<option value="1">ASCII</option>
									<option value="0">Hex</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">WEP Key 4</label>
							<div class="controls">
								<input type="password" id="wepKey4" name="wepKey4" maxlength="26"/>

								<select id="wepKey4Type" name="wepKey4Type">
									<option value="1">ASCII</option>
									<option value="0">Hex</option>
								</select>
							</div>
						</div>
					</tbody>
				</div>
				<!-- WPA -->
				<div id="div_wpa" class="myTable none">
					<div class="control-group">
						<label class="control-label">Cipher Type</label>
						<div class="controls">
							<input name="cipherType" value="aes" type="radio" checked="checked" />
							AES &nbsp;
							<input name="cipherType" value="tkip" type="radio" />
							TKIP &nbsp;
							<input name="cipherType" value="aes+tkip" type="radio" />
							TKIP&amp;AES
						</div>
					</div>
					<div class="control-group" id="wpaPasswd">
						<label class="control-label">Security Key</label>
						<div class="controls">
							<input type="password" id="wifiPwd" name="wifiPwd" size="28" maxlength="64"/>
						</div>
					</div>
					<!--<tr>
					<td>密钥更新周期</td>
					<td>
						<input name="keyPeriod" size="4" maxlength="5"/>
						秒（范围：60—99999，0代表不更新。）
					</td>
				</tr>
				-->
			</div>
			<div id="wdsWrap" class="none">
				<div class="myTable" id="wdsMac">
					<div class="control-group none">
						<label class="control-label">MAC Address</label>
						<div class="controls">
							<input type="text" name="wdsMac1" size=20 maxlength=17 value="">
							(Status:
							<span id="macSta1"></span>
							)
							<input type="hidden" name="wdslist" value="c8:3a:35:3c:10:b8~~~"></div>
					</div>
					<div class="control-group none">
						<label class="control-label">MAC Address</label>
						<div class="controls">
							<input type="text" name="wdsMac2" size=20 maxlength=17 value="">
							(Status:
							<span id="macSta2"></span>
							)
						</div>
					</div>
					<div class="control-group none">
						<label class="control-label">MAC Address</label>
						<div class="controls">
							<input type="text" name="wdsMac3" size=20 maxlength=17 value="">
							(Status:
							<span id="macSta3"></span>
							)
						</div>
					</div>
					<div class="control-group none">
						<label class="control-label">MAC Address</label>
						<div class="controls">
							<input type="text" name="wdsMac4" size=20 maxlength=17 value="">
							(Status:
							<span id="macSta4"></span>
							)
						</div>
					</div>
					<div class="control-group none" id="apclientMac">
						<label class="control-label">Uplink AP MAC Address</label>
						<div class="controls">
							<input type="text" name="upLinkMac" size=20 maxlength=17 value=""></div>
					</div>
					<div class="control-group none" id="apNetmode">
						<label class="control-label">The Upstream AP's Network Mode</label>
						<div class="controls">
							<input type="text" name="uplinkNetWork" id="uplinkNetWork" readOnly></div>
					</div>
					<div class="control-group" id="apChannel">
						<label class="control-label">Upstream AP Channel</label>
						<div class="controls">
							<input type="text" name="uplinkChannel" id="uplinkChannel" readOnly></div>
					</div>
					<div class="control-group none" id="apWdsChannel">
						<label class="control-label">The Uplink AP's Channel Bandwidth</label>
						<div class="controls">
							<input type="text" id="uplinkBandwidth" name="uplinkBandwidth" readOnly></div>
					</div>

					<div class="control-group none" id="extend">
						<label class="control-label">The Upstream AP's Extension Channel</label>
						<div class="controls">
							<input type="text" id="uplinkExtendChannel" name="uplinkExtendChannel" readOnly></div>
					</div>
				</div>
			</div>
		</div>
		<div id="div_pppoe" class="myTable none">
			<div class="control-group">
				<label class="control-label">Username</label>
				<div class="controls">
					<input type="text" id="pppoeUser" name="pppoeUser" maxlength="64" value=""></div>
			</div>
			<div class="control-group">
				<label class="control-label">Password</label>
				<div class="controls">
					<input type="text" id="pppoePwd" name="pppoePwd" maxlength="64" value=""></div>
			</div>
			<div class="control-group">
				<label class="control-label">MTU</label>
				<div class="controls">
					<input type="text" id="pppoeMTU" name="pppoeMTU" maxlength="4" value="">(Range:256~1492)</div>
			</div>
			<div class="control-group">
				<label class="control-label">MPPE</label>
				<div class="controls">
					<input type="checkbox" id="mppeEn" name="mppeEn">Enable</div>
			</div>
		</div>
	</form>
	<div id="stepNext" class="fl w80 ml10">
		<br>
		<input type="button" class="button" value="Save" name="save">
		<br>
		<br>
		<input type="reset" class="button" value="Restore" name="cancel" onClick="window.location.reload()">
		<br>
		<br>
		<input type="button" class="button" value="Help" name="help"  onclick="doHelp('wl_wizard')"></div>
</div>
<!--scan-->
<div class="tc" style="width:640px; clear:both">
	<input name="wlScan" id="wlScan" type="button" class="button1 bc button" value="Enable Scan" />
</div>
<table class="tc ml20 table-fixed table-td" style="width: 97%; display: table;" border="1" id="wlScanTab">&nbsp;</table>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./js/reasy-ui.js?version=4093"></script> 
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./js/wizard.js?version=350"></script>
</body>
</html>