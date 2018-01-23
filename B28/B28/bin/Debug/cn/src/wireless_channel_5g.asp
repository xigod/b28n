<!DOCTYPE html>
<html style="display:none;">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Wireless | Wireless Settings</title>
	<link rel="stylesheet" href="./public/style.css?version=350" />
	<script src="./lang/b28n.js?version=350"></script>

</head>
<body id="channel">
	<div class="divbody">
		<div id="head"></div>
		<div style="min-width:880px">
			<form action="/goform/WifiRadioSet" method="post" name="wireless_channel" style="width:680px;">
				<input type="hidden" id="GO" name="GO" value="wireless_channel_5g.asp"/>
				<input name="wrlRadio" type="hidden" value="5G" />
				<div class="myTable mt20">
					<div class="control-group">
						<label class="control-label">Illegal AP Detection</label>
						<div class="controls">
							<input name="wlScan" id="wlScan" type="button" class="button1 bc button" value="Enable Scan" />
						</div>
					</div>
				</div>
				<!--<div class="tc">
				信道扫描:&nbsp;&nbsp;
				<input name="wlScan" id="wlScan" type="button" class="button bc" value="开启扫描" />
			</div>
			-->
			<table class="tc ml20 table-fixed table-td" border="1" id="wlScanTab" style="min-width:735px;width:97%;display:table;"></table>
			<div style="height:60px;width:100%"></div>
		</form>
		<div id="tail">
			<br>
			<input class="button" type="button" value="Help" onClick="doHelp('wl_channel')"></div>
	</div>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./public/common.js?version=4112"></script>
<script src="./js/wireless_channel.js?version=350"></script>
</body>
</html>