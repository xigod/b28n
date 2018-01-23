<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>WDS</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./public/j.js?version=350"></script>
</head>
<body id="wds">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="/goform/wirelessSetWDS" method="post" name="wireless_wds" id="wireless_wds">
			<input type="hidden" id="GO" name="GO" value="wireless_wds.asp">
			<input name="wrlRadio" type="hidden" value="2.4G">
			<input type="hidden" id="ssid" name="ssid">
			<input type="hidden" id="rate" name="rate" value="2G">
            <input type="hidden" name="wdslist" value="c8:3a:35:3c:10:b8~~~">
			<table class="myTable mt20">
				<tbody><tr>
					<td>WDS</td>
					<td><select name="wds_mode" id="wds_mode" size="1">
							<option value="0" selected="selected">Disable</option>
							<!--<option value=4>Lazy Mode</option>
							<option value=2>Bridge Mode</option>-->
							<option value="3">Repeater Mode</option>
						</select></td>
				</tr>
				<tr id="wds_1">
					<td>MAC Address</td>
					<td><input type="text" name="wds_1" size="20" maxlength="17" value=""></td>
				</tr>
				<tr id="wds_2">
					<td class="head">MAC Address</td>
					<td><input type="text" name="wds_2" size="20" maxlength="17" value=""></td>
				</tr>
				<tr id="wds_3">
					<td class="head">MAC Address</td>
					<td><input type="text" name="wds_3" size="20" maxlength="17" value=""></td>
				</tr>
				<tr id="wds_4">
					<td class="head">MAC Address</td>
					<td><input type="text" name="wds_4" size="20" maxlength="17" value=""></td>
				</tr>
			</tbody></table>
			<table class="w640 ml20">
				<tbody><tr>
					<td><span><b>Note:</b>WDS Settings<br>1. In this mode, when you enable scan and save your configuration, the MAC address and SSID of the peer device will be populated automatically.  For stability, please ensure that the network mode, channel, and extension channel are the same as those of the peer device. You can change them on the Wireless &gt; Radio page.<br>2. If you want to configure the encryption, click "Wireless&gt;Basic" and remember to keep security mode and key the same as the remote one.<br>3. The primary SSID is used by default and as the only SSID for WDS connection.</span><br></td>
				</tr>
			</tbody></table>
			<p class="tc">
				<input name="wlScan" id="wlScan" type="button" class="button" value="Scan">
			</p>
			<table class="ml20 tc" border="1" style="min-width:640px" id="wlScanTab">
			</table>
		</form>
		<div id="tail"></div>
	</div>
</div>


<script src="./js/wireless.js?version=350"></script>
<script>var wdsMode = "<%wirelessGetWds("0", "wdsmode");%>",
	wdsList = "<%wirelessGetWds("0", "wdslist");%>",
	enablewireless = "<%wrlWizard("ap","enable");%>";</script>

</body></html>