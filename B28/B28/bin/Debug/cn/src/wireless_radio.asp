<!DOCTYPE html>
<html style="display:none;">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Wireless | Wireless Settings</title>
	<link rel="stylesheet" href="./public/style.css?version=350" />
	<script src="./lang/b28n.js?version=350"></script>

</head>
<body id="radio">
	<div class="divbody">
		<div id="head"></div>
		<div class="w750">
			<form action="/goform/WifiRadioSet" method="post" name="wireless_radio">
				<input type="hidden" id="GO" name="GO" value="wireless_radio.asp"/>
				<input name="wrlRadio" type="hidden" value="2.4G" />
				<div class="myTable mt20">
					<div class="control-group">
						<label class="control-label">Enable Wireless</label>
						<div class="controls">
							<input type="checkbox" name="wirelessEn" id="wirelessEn"></div>
					</div>
					<div class="control-group">
						<label class="control-label">Country</label>
						<div class="controls">
							<select name="country" id="country" size="1"></select>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Network Mode</label>
						<div class="controls">
							<select name="netMode" id="netMode" size="1">
								<option value="bg">11b/g mixed</option>
								<option value="b">11b</option>
								<option value="g">11g</option>
								<option value="bgn">11b/g/n mixed</option>
							</select>
						</div>
					</div>
					<div class="control-group" id="div_channel">
						<label class="control-label">Channel</label>
						<div class="controls">
							<select name="channel" id="channel"></select>
						</div>
					</div>
					<div class="control-group" id="channelBand">
						<label class="control-label">Channel Bandwidth</label>
						<div class="controls">
							<input type="radio" name="bandwidth" value="20">
							20
							<!--<label class="radioWrapper">
							-->
							<input type="radio" name="bandwidth" value="40">
							40
							<input type="radio" name="bandwidth" value="auto">
							20/40
							<!--</label>--></div>
					</div>
					<div class="control-group none" id="channelExtra">
						<label class="control-label">Extension Channel</label>
						<div class="controls">
							<select id="extendChannel" name="extendChannel" size="1"></select>
						</div>
					</div>
					<div class="control-group" >
						<label class="control-label">Channel Lockout</label>
						<div class="controls">
							<input type="checkbox" id="channelLockEn" name="channelLockEn"></div>
					</div>
					<div class="control-group none">
						<label class="control-label" >WMM</label>
						<div class="controls">
							<input type="radio" name="wmmEn" value="true">
							Enable
							<input type="radio" name="wmmEn" value="false"  style="margin-left:10px;">
							Disable
							<input type="radio" name="wmmMode" value="2">
							<input type="radio" name="wmmMode" value="1">
							<input type="radio" name="wmmMode" value="0">
						</div>
					</div>
					<!-- <div class="control-group" id="apsdCapable">
						<label class="control-label">APSD</label>
						<div class="controls">
							<input type="radio" name="apsdEn" value="true">
							Enable
							<input type="radio" name="apsdEn" value="false"  style="margin-left:10px;">Disable</div>
					</div> -->
					<div class="control-group">
						<label class="control-label">TX Power</label>
						<div class="controls">
							<select name="txPower" id="txPower">
								<option value="10">10</option>
								<option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
							</select>
							<span id="powerHelp" class="text-help">(dBm,Range: 10 - 20; Default: 20)</span>
						</div>
					</div>
					<div class="control-group" >
						<label class="control-label">Power Lockout</label>
						<div class="controls">
							<input type="checkbox" id="setPower" name="setPower" value="1">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Preamble</label>
						<div class="controls">
							<input type="radio" name="Plcp" value="1">
							Long Preamble
							<input type="radio" name="Plcp" value="0">Short Preamble
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Short GI</label>
						<div class="controls">
							<input type="radio" name="sgiTx" value="0">Disable
							<input type="radio" name="sgiTx" value="1">Enable
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Inter-SSID User Isolation</label>
						<div class="controls">
							<input type="radio" name="ssidIsolationEn" value="true" />
							Enable
							<input type="radio" name="ssidIsolationEn" value="false" checked="checked"  style="margin-left:10px;" />
							Disable
						</div>
					</div>
					<div class="control-group" id="chain_num">
						<label class="control-label">Transmission Link</label>
						<div class="controls">
							<input type="radio" name="txrxChain" value="1">
							1x1
							<input type="radio" name="txrxChain" value="2">2x2</div>
					</div>
					<div class="control-group" id="chain_port">
						<label class="control-label">Antenna</label>
						<div class="controls">
							<input type="radio" name="txrxChainPort" value="1">
							Antenna 0
							<input type="radio" name="txrxChainPort" value="2">Antenna 1</div>
					</div>
					<!-- <div class="control-group">
						<label class="control-label">Aging Time</label>
						<div class="controls">
							<select name="ageTime" id="ageTime">
								<option value="1">1 minute</option>
								<option value="5" selected>5 minutes</option>
								<option value="10">10 minutes</option>
								<option value="15">15 minutes</option>
							</select>
						</div>
					</div> -->
				</div>
			</form>
			<div id="tail"></div>
		</div>
	</div>
	<script src="./public/j.js?version=350"></script>
	<script src="./public/gozila.js?version=350"></script>
	<script src="./public/menu.js?version=350"></script>
	<script src="./js/country_code.js?version=350"></script>
	<script src="./js/wireless_radio.js?version=350"></script>
</body>
</html>