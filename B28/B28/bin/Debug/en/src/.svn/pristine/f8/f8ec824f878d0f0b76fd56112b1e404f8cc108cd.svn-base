<!DOCTYPE html>
<html style="display:none;">
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>System | upgrading</title>
<link rel=stylesheet href=public/style.css>
<script src="./lang/b28n.js?version=350"></script>
<script>
B.setTextDomain("all");	

var lanip = "<%aspTendaGetStatus("lan","lan_ip");%>",
	upgrade_sslenable = "<%aspTendaGetStatus("lan","lan_webiplansslen");%>";
	str = _("Device is upgrading,this may take about 90 seconds. Please wait..."),
	num = 5;
	
function init() {
	setInterval(wait,2000);
	setTimeout(function(){
		var url = "http://" + lanip;
		if (upgrade_sslenable == 1) {
			url = "https://" + lanip;
		}
		window.location = url;
	},120000);
}

function wait() {
	var info = document.getElementById("waitInfo");
	if (num == 0) {
		num = 5;
	} else {
		num--;
	}
	info.innerHTML = str.substring(0,str.length - num);
}
</script>
</head>
<body onLoad="init()">
<table class="h200 mt50 bc" style="background-color:#ccc; border:1px #666 solid; width:640px;">
	<tr>
		<td class="p20" id="waitInfo">Device is upgrading,this may take about 2 minutes. Please wait...</td>
	</tr>
</table>
</body>
</html>