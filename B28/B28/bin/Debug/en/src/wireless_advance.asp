<!DOCTYPE html>
<html style="display:none;"><head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Advanced</title>
    <link rel="stylesheet" href="./public/style.css?version=4112">
	<script src="./lang/b28n.js?version=4112"></script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form name="frmSetup" method="post" action="/goform/setWrlBroadInfo">
        <input type="hidden" name="GO" value="broadcast.asp">
            <div class="myTable mt20">
                <div class="control-group">
                    <label class="control-label">Identify Client Type</label>
                    <div class="controls">
                        <input type="radio" name="oltEn" value="false">Disable<input type="radio" name="oltEn" value="true" checked="checked" style="margin-left:10px;">Enable</div>
                </div>
                <div class="control-group">
                    <label class="control-label">Broadcast Packet Filter</label>
                    <div class="controls">
                        <input type="radio" name="broadcastEn" value="false">Disable<input type="radio" name="broadcastEn" value="true" style="margin-left:10px;">Enable</div>
                </div>
                <div class="control-group" id="modeTable">
                    <label class="control-label">Filter Mode</label>
                    <div class="controls">
                        <select name="filterMode" id="filterMode" size="1">
                            <option value="2">Accept only DHCP and ARP packets</option>
                            <option value="3">Accept only ARP packets</option>
                        </select>
                    </div>
                </div>
            </div>
		</form>
		<div class="fl w80 ml10">
            <br>
            <input type="button" class="button" value="Save" id="bdctCtrSave">
            <br>
            <br>
            <input type="reset" class="button" value="Restore" ia="netCtrCancel" onclick="window.location.reload()">
            <br>
            <br>
            <input type="button" class="button" value="Help" name="help" onclick="doHelp('wl_broadcast')">
        </div>
	</div>
</div>

<script src="./public/j.js?version=4112"></script>
<script src="./public/menu.js?version=4112"></script>
<script src="./public/gozila.js?version=4112"></script>
<script src="./public/common.js?version=4112"></script>
<script src="./js/broadcast.js?version=4112"></script>


</body></html>