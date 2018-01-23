<HTML>
<HEAD>
	<META http-equiv="Pragma" content="no-cache">
	<META http-equiv="Content-Type" content="text/html; charset=utf-8">
	<TITLE>System | reboot</TITLE>

	<link rel=stylesheet type=text/css href=public/style.css>
	<script src="./lang/b28n.js?version=350"></script>
	<script>B.setTextDomain("all");</script>
</HEAD>

<BODY onLoad="getValue();">

	<form name=frmSetup id="direct_reboot" method="POST"></FORM>
	<script src="./public/j.js?version=350"></script>
	<script type="text/javascript" src="./public/gozila.js?version=350"></script>
	<script type="text/javascript" src="./public/menu.js?version=350"></script>
	<script type="text/javascript">

function getValue() {
	$.GetSetData.getJson("goform/getLanIpInfo", initDirectrReboot);
}

function initDirectrReboot(data)
{
	if(data.webIpEn == 1)
	{
		var url = "http://" + data.lanIp + ":" + data.webPort;
		if (data.sslEnable == 1) {
			url = "https://" + data.lanIp + ":" + data.webPort;
		}	
	}
	else
	{
		var url = "http://" + data.lanIp;
		if (data.sslEnable == 1) {
			url = "https://" + data.lanIp;
		}
	}
    //550后台重启能起来，650恢复出厂能起来
	window.parent.reboot(url,550);
}
</script>
</BODY>
</HTML>
