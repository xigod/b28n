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
            <input name="GO" type="hidden" value="wireless_radioUp_5g.asp">
            <input name="radio" type="hidden" value="5G">
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
                <div class="control-group">
                    <label class="control-label">Prioritize 5 GHz</label>
                    <div class="controls">
                        <input type="radio" name="prio_5" value="1">Enable<input type="radio" name="prio_5" value="0" checked="checked" style="margin-left:10px;">Disable</div>
                </div>
                <div class="control-group none" id="singalVal">
                    <label class="control-label">5 GHz Threshold</label>
                    <div class="controls">
                    <input type="text" name="prio_5_value" size="5" maxlength="4"><span class="text-help">(dBm)</span>
                    </div>
                </div>
               <div class="control-group">
                    <label class="control-label">Air Interface Scheduling</label>
                    <div class="controls">
                        <input type="radio" name="atf" value="1">Enable<input type="radio" name="atf" value="0" checked="checked" style="margin-left:10px;">Disable</div>
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
                    <div id="forceSpite5" class="controls spiteList">
                        <input type="checkbox" id="force-6" name="force">6<input type="checkbox" class="check_box" id="force-9" name="force">9<input type="checkbox" class="check_box" id="force-12" name="force">12<input type="checkbox" class="check_box" id="force-18" name="force">18<input type="checkbox" class="check_box" id="force-24" name="force">24<input type="checkbox" class="check_box" id="force-36" name="force">36<input type="checkbox" class="check_box" id="force-48" name="force">48<input type="checkbox" class="check_box" id="force-54" name="force">54<input type="checkbox" style="margin-left: 156px;" flag="0" class="selectAllSpite" id="force-all" name="force-all">All</div>
                </div>
                <div class="control-group"> 
                    <label class="control-label">Optional Rate</label>
                    <div id="basicRate5" class="controls spiteList">
                        <input type="checkbox" id="support-6" name="support">6<input type="checkbox" class="check_box" id="support-9" name="support">9<input type="checkbox" class="check_box" id="support-12" name="support">12<input type="checkbox" class="check_box" id="support-18" name="support">18<input type="checkbox" class="check_box" id="support-24" name="support">24<input type="checkbox" class="check_box" id="support-36" name="support">36<input type="checkbox" class="check_box" id="support-48" name="support">48<input type="checkbox" class="check_box" id="support-54" name="support">54<input type="checkbox" style="margin-left: 156px;" flag="0" class="selectAllSpite" id="support-all" name="support-all">All</div>
                </div>
            </div>
        </form>
        <div id="tail"></div>
    </div>
</div>

<script src="./public/j.js?version=4112"></script>
<script src="./public/gozila.js?version=4112"></script>
<script src="./public/menu.js?version=4112"></script>
<script src="./public/common.js?version=4112"></script>
<script src="./js/wireless_radioUp_5g.js?version=4112"></script>

</body></html>