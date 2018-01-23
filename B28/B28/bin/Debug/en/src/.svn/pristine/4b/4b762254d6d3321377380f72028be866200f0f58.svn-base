<!DOCTYPE html>
<html style="display:none;">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Wireless-Advanced</title>
	<link rel="stylesheet" href="./public/style.css?version=350" />
	<script src="./lang/b28n.js?version=350"></script>
</head>
<body id="advance">
	<div class="divbody">
		<div id="head"></div>
		<div class="w750">
			<form action="/goform/WifiAdvanceSet" method="post" name="wireless_advance" >
				<input name="GO" type="hidden" value="wireless_advance_5g.asp" />
				<input name="wrlRadio" type="hidden" value="5G" />
				<div class="myTable mt20">
					<div class="control-group">
						<label class="control-label">Beacon Interval</label>
						<div class="controls">
							<input type="text" id="beacon" name="beacon" size="5" maxlength="3" />
							(Range: 100 ~ 999; Default: 100)
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Fragment Threshold</label>
						<div class="controls">
							<input type="text" id="fragment" name="fragment" size="5" maxlength="4" />
							(Range: 256 ~ 2346; Default: 2346)
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">RTS Threshold</label>
						<div class="controls">
							<input type="text" id="rts" name="rts" size="5" maxlength="4" />
							(Range: 1 ~ 2347; Default: 2347)
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">DTIM Interval</label>
						<div class="controls">
							<input type="text" id="dtim" name="dtim" size="5" maxlength="3" />
							(Range: 1 ~ 255; Default: 1)
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Receive Signal Strength</label>
						<div class="controls">
							<input type="text" id="RSSI" name="RSSI" size="5" maxlength="4" />
							(dBm,Range: -90 - -60; Default: -90)
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">TX Power</label>
						<div class="controls">
							<!--<input type="text" name="txPower" size="5" maxlength="2" />
							-->
							<select id="txPower" name="txPower">
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
							</select>
							<span id="powerHelp">(dBm,Range: 17 - 23; Default: 23)</span>
						</div>
					</div>

					<div class="control-group">
						<label class="control-label">Power Lockout</label>
						<div class="controls">
							<input type="checkbox" id="powerLockEn" name="powerLockEn" value="true"></div>
					</div>
					<div class="control-group none" id="div_ap_led" name="div_ap_led">
						<label class="control-label">Wireless LED</label>
						<div class="controls">
							<input type="radio" name="wrlLed" value="true" checked="">
							Enable
							<input type="radio" name="wrlLed" value="false" style="margin-left:10px;">Disable</div>
					</div>
					<div class="control-group">
						<label class="control-label">Preamble</label>
						<div class="controls">
							<input type="radio" name="Plcp" value="1" checked="">
							Long Preamble
							<input type="radio" name="Plcp" value="0" style="margin-left:10px;">Short Preamble</div>
					</div>
					<div class="control-group">
						<label class="control-label">5GHz SSID Priority</label>
						<div class="controls">
							<input type="radio" name="prio_5" value="1" checked="">
							Enable
							<input type="radio" name="prio_5" value="0" style="margin-left:10px;">Disable</div>
					</div>
					<div class="control-group" id="atf_type_5g">
						<label class="control-label">Airtime Scheduling</label>
						<div class="controls">
							<input type="radio" name="atf" value="1" checked="">
							Enable
							<input type="radio" name="atf" value="0" style="margin-left:10px;">Disable</div>
					</div>
				</div>
			</form>
			<div id="tail"></div>
		</div>
	</div>
	<script src="./public/j.js?version=350"></script>
	<script src="./public/gozila.js?version=350"></script>
	<script src="./public/menu.js?version=350"></script>
	<script src="./js/wireless.js?version=350"></script>
</body>
</html>