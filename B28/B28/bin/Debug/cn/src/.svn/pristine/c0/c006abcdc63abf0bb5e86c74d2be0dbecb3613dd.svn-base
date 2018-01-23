<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-cache" />
<title>Basic</title>
<link rel="stylesheet" href="./public/style.css?version=350" />
<script src="./lang/b28n.js?version=350"></script>
</head>
<body onLoad="init();">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="/goform/setApClientPacket" method="post" name="wireless_packet">
			<input type="hidden" id="GO" name="GO" value="wireless_packet.asp" />
			<input type="hidden" id="enable_packet" name="enable_packet" />
			<table class="myTable mt20">
            	<tr>
					<td>Enable</td>
					<td><input type="checkbox" value="1" name="enable" id= "enable"></td>
				</tr>
                <tr>
					<td>服务器IP</td>
					<td><input type="text" name="packet_serverip" size="15" maxlength="15">(必须与lan口ip同网段)
					</td>
				</tr>
                <tr>
					<td>服务器端口</td>
					<td><input type="text" name="packet_serverport" size="5" maxlength="5">(取值范围: 1-65535)
					</td>
				</tr>
			</table>
		</form>
		<div id="tail"></div>
	</div>
</div>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./public/j.js?version=350"></script>
<script>
var enable ="<%getApClientPacket("packet_enable");%>",
	server_ip = "<%getApClientPacket("packet_serverip");%>",
	server_port = "<%getApClientPacket("packet_serverport");%>";
</script>
<script>
	var f = document.forms[0];
	function init() {
		$("#enable").on("click", changeEnable);
		initValue();
		
		$("#head").html(tbl_head(27));
		$("#tail").html(tbl_tail("wirelesspacket"));

		
	}
	
	function changeEnable() {
		if(f.enable.checked) {
			f.packet_serverip.disabled = false;	
			f.packet_serverport.disabled = false;
		} else {
			f.packet_serverip.disabled = true;
			f.packet_serverport.disabled = true;			
		}
	}
	
	function initValue() {
		if(enable == "1") {
			f.enable.checked = true;	
		} else {
			f.enable.checked = false;		
		}
		changeEnable();
		f.packet_serverip.value = server_ip;
		f.packet_serverport.value = server_port;
	}
	
	function preSubmit() {
		if(f.enable.checked) {
			f.enable_packet.value = "1";
			if (!checkIp(f.packet_serverip,_("IP Address"))) {
				return false;
			}
			
			if (isNaN(f.packet_serverport.value) || f.packet_serverport.value < 1 || f.packet_serverport.value > 65535 || f.packet_serverport.value == "") {
				alert("请输入一个合法的服务器端口");
				return false;
			}	
		} else {
			f.enable_packet.value = "0";	
		}
		
		f.submit();
	}
</script>
</body>
</html>