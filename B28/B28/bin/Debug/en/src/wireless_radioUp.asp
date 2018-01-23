<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Wireless-radioUp</title>
<link rel="stylesheet" href="./public/style.css?version=4112">
<script src="./lang/b28n.js?version=4112"></script>
</head>
<body id="advance">
<div class="divbody">
    <div id="head"></div>
    <div class="w750">
        <form action="/goform/WifiAdvanceSet" method="post" name="wireless_advance">
            <input name="GO" type="hidden" value="wireless_radioUp.asp">
			<input name="wrlRadio" type="hidden" value="2.4G">
            <input type="hidden" id="reboot" name="reboot">
            <input name="supportBGforce" type="hidden">
            <input name="supportBG" type="hidden">
			<div class="myTable mt20">
				<div class="control-group">
					<label class="control-label">Beacon Interval</label>
					<div class="controls"><input type="text" id="beacon" name="beacon" size="5" maxlength="3">
						<span class="text-help" id="beaconInfo">ms (Range: 100 to 999; Default: 100)</span></div>
				</div>
				<div class="control-group">
					<label class="control-label">Fragment Threshold</label>
					<div class="controls"><input type="text" id="fragment" name="fragment" size="5" maxlength="4">
						<span class="text-help">(Range: 256 to 2346; Default: 2346)</span></div>
				</div>
				<div class="control-group">
					<label class="control-label">RTS Threshold</label>
					<div class="controls"><input type="text" id="rts" name="rts" size="5" maxlength="4">
						<span class="text-help">(Range: 1 to 2347; Default: 2347)</span></div>
				</div>
				<div class="control-group">
					<label class="control-label">DTIM Interval</label>
					<div class="controls"><input type="text" id="dtim" name="dtim" size="5" maxlength="3">
						<span class="text-help">(Range: 1 to 255; Default: 1)</span></div>
				</div>
				<div class="control-group">
					<label class="control-label">Minimum RSSI Threshold</label>
					<div class="controls"><input type="text" id="RSSI" name="RSSI" size="5" maxlength="4">
						<span class="text-help">dBm (Range: -90 to -60; Default: -90)</span></div>
				</div>
                <div class="control-group none" id="div_ap_led" name="div_ap_led">
                    <label class="control-label">Wireless LED</label>
                    <div class="controls">
                        <input type="radio" name="wlLed" value="true">Enable<input type="radio" name="wlLed" value="false" checked="checked" style="margin-left:10px;">Disable</div>
                </div>
                <div class="control-group" id="Transmission">
                    <label class="control-label">Signal Transmission</label>
                    <div class="controls">
                        <input type="radio" name="penetration" value="1">Coverage-oriented<input type="radio" name="penetration" value="0" checked="checked" style="margin-left:10px;">Capacity-oriented</div>
                </div>
                <div class="control-group" id="deploy_type">
                    <label class="control-label">Signal Reception</label>
                    <div class="controls">
                        <input type="radio" name="deploy" value="0">Default<input type="radio" name="deploy" value="1" checked="checked" style="margin-left:10px;">Coverage-oriented<input type="radio" name="deploy" value="2" checked="checked" style="margin-left:10px;">Capacity-oriented<script>if(top.CONFIG_PRODUCT == "ap355") {
                            document.write('<span style="margin-left: 10px;">'+_("Note: It is effective only after the interference mitigation mode is set to 2.")+'</span>');
                        }</script>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">Air Interface Scheduling</label>
                    <div class="controls">
                        <input type="radio" name="atf" value="1">Enable<input type="radio" name="atf" value="0" checked="checked" style="margin-left:10px;">Disable</div>
                </div>
                <div class="control-group none" id="interface-set"> 
					<label class="control-label">Interference Mitigation</label>
					<div class="controls"><!--<input type="text" name="txPower" size="5" maxlength="2" />-->
						<select id="interference" name="interference">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select><span id="inteferenceHelp" class="text-help">(Range: 0 to 3; Default: 3)</span>
                    </div>
				</div>
                <!-- 移植功能 -->
                <div class="control-group" id="apsdCapable">
                    <label class="control-label">APSD</label>
                    <div class="controls">
                        <input type="radio" name="apsd" value="1">Enable<input type="radio" name="apsd" value="0" checked="checked" style="margin-left:10px;">Disable</div>
                </div>
                <div class="control-group"> 
                    <label class="control-label">Client Timeout Interval</label>
                    <div class="controls"><!--<input type="text" name="txPower" size="5" maxlength="2" />-->
                        <select id="sta_timeout" name="sta_timeout">
                            <option value="1">1 minute</option>
                            <option value="5">5 minutes</option>
                            <option value="10" selected="">10 minutes</option>
                            <option value="15">15 minutes</option>
                            <option value="50">50 minutes</option>
                        </select>
                    </div>
                </div>
                <div class="control-group"> 
                    <label class="control-label">Mandatory Rate</label>
                    <div id="forceSpite2" class="controls spiteList">
                        <input type="checkbox" id="force-1" name="force">1<input type="checkbox" class="check_box" id="force-2" name="force">2<input type="checkbox" class="check_box" id="force-55" name="force">5.5<input type="checkbox" class="check_box" id="force-6" name="force">6<input type="checkbox" class="check_box" id="force-9" name="force">9<input type="checkbox" class="check_box" id="force-11" name="force">11<input type="checkbox" class="check_box" id="force-12" name="force">12<input type="checkbox" class="check_box" id="force-18" name="force">18<input type="checkbox" class="check_box" id="force-24" name="force">24<input type="checkbox" class="check_box" id="force-36" name="force">36<input type="checkbox" class="check_box" id="force-48" name="force">48<input type="checkbox" class="check_box" id="force-54" name="force">54<input type="checkbox" style="margin-left: 40px;" flag="0" name="force-all" id="force-all" class="selectAllSpite">All</div>
                </div>
                <div class="control-group"> 
                    <label class="control-label">Optional Rate</label>
                    <div id="basicRate2" class="controls spiteList">
                        <input type="checkbox" id="support-1" name="support">1<input type="checkbox" class="check_box" id="support-2" name="support">2<input type="checkbox" class="check_box" id="support-55" name="support">5.5<input type="checkbox" class="check_box" id="support-6" name="support">6<input type="checkbox" class="check_box" id="support-9" name="support">9<input type="checkbox" class="check_box" id="support-11" name="support">11<input type="checkbox" class="check_box" id="support-12" name="support">12<input type="checkbox" class="check_box" id="support-18" name="support">18<input type="checkbox" class="check_box" id="support-24" name="support">24<input type="checkbox" class="check_box" id="support-36" name="support">36<input type="checkbox" class="check_box" id="support-48" name="support">48<input type="checkbox" class="check_box" id="support-54" name="support">54<input type="checkbox" style="margin-left: 40px;" flag="0" id="support-all" class="selectAllSpite" name="support-all">All</div>
                </div>
                <!-- 移植end -->
            </div>
        </form>
        <div id="tail"></div>
    </div>
</div>

<script src="./public/j.js?version=4112"></script>
<script src="./public/gozila.js?version=4112"></script>
<script src="./public/menu.js?version=4112"></script>
<script src="./public/common.js?version=4112"></script>
<script src="./js/wireless_radioUp.js?version=4112"></script>

</body></html>