<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>System | Firmware Upgrade</title>
<link href="./public/style.css?version=350" rel="stylesheet">
<script src="./lang/b28n.js?version=350"></script>
<script>B.setTextDomain("all");	

var FirwareVerion = "<%aspTendaGetStatus("sys","sysver");%>",//升级包版本
	FirwareDate="<%aspTendaGetStatus("sys","compimetime");%>";//升级日期
	
function preSubmit(f)
{
	if (f.upgradeFile.value == "") {
		alert(_("Please select a firmware file."));
		return;
	}
	if (confirm(_("Do you want to upgrade this device?"))) {
	   f.fwsubmit.disabled = true;
	   f.submit();
	}
}</script>
</head>
<body style="background-color:#e5e5e5">
<form name="frmSetup" method="post" action="/cgi-bin/upgrade" enctype="multipart/form-data" class="fn bc w750 mt20">
	<h3>Firmware Upgrade</h3>
	<hr>
	<table class="myTable" width="100%" id="MyTable">
		<tbody><tr>
			<td align="left" id="file">File</td>
			<td><input type="file" name="upgradeFile"></td>
		</tr>
		<tr>
			<td align="left" id="currenttype">Current Firmware Version</td>
			<td><script>document.write( FirwareVerion+"Release Date："+FirwareDate )</script></td>
		</tr>
		<tr>
			<td colspan="2"></td>
		</tr>
	</tbody></table>
	<hr>
	<br>
	<input name="fwsubmit" type="button" class="button" value="Upgrade" onclick="preSubmit(document.frmSetup)">
</form>

</body></html>