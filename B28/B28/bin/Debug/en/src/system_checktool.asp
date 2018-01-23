<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Diagnostics Tool</title>
<link rel="stylesheet" type="text/css" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<form name="frmSetup" method="post" action="/goform/exeCommand" id="system_checktool" class="myTable mt20">
	<input type="hidden" name="cmd" value="checktools.asp">
	<p style="margin-left:122px">Enter an IP address (such as 192.168.0.254) or a domain name (such as www.google.com).</p>
	<div class="control-group">
		<label class="control-label">IP Address/Domain Name</label>
		<div class="controls">
			<input type="text" class="text" id="ipaddress" maxlength="69" value="ping ">
			<input name="pingbutton" type="button" class="button ml15" value="ping">
		</div>
	</div>
	<textarea name="result" cols="70" rows="10" class="p10" readonly="readonly" style="background:#000; margin-left:122px;color:#FFF;width:326px;height:222px;"></textarea>
	</form>
</div>

<script src="./public/j.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./js/system_checktool.js?version=350"></script>

</body></html>