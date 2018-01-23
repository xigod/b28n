<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>QVLAN</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>

</head>
<body id="qvlan">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="/goform/QvlanSet" method="post" name="wireless_filter">
			<input type="hidden" id="GO" name="GO" value="wireless_qvlan.asp">
			<input name="wrlRadio" type="hidden" value="2.4G">
			<input type="hidden" id="maclist" name="maclist">
			<input type="hidden" name="wiredLanPort">
            <input type="hidden" name="ssidQvlan">
            <input type="hidden" name="ssidQvlan5G">
            <input type="hidden" name="trunkPort">
			<p class="w640 mt20 ml20">
				<span style="padding-left:123px; padding-right:43px">Enable</span><input type="checkbox" id="qvlanEn" name="qvlanEn">
			</p>
            
            <table id="div_pvid" class="myTable">
            	<tbody>
				<tr>
					<td align="right" class="w150 pr40">PVID</td>
					<td class="pl10"><input type="text" name="pvid" id="pvid" size="4" maxlength="4"></td>
				</tr>
			</tbody></table>
            <table id="div_manage_vlan" class="myTable">
            	<tbody>
				<tr>
					<td align="right" class="w150 pr40">Management VLAN</td>
					<td class="pl10"><input type="text" name="manageVlan" id="manageVlan" size="4" maxlength="4"></td>
				</tr>
			</tbody></table>
            <table id="div_trunk" class="myTable">
            	<tbody>
				<tr>
					<td align="right" class="w150 pr40">Trunk Port</td>
					<td class="pl10" id="port_trunk">
                    	<label id="lab-port0" class="radio none"><input type="checkbox" id="port0" name="port0">LAN0</label>
						<label id="lab-port1" class="radio none"><input type="checkbox" id="port1" name="port1">LAN1</label>
                        <label id="lab-port2" class="radio none"><input type="checkbox" id="port2" name="port2">LAN2</label>
                    </td>
				</tr>
			</tbody></table>
            
            <table class="w638 ml20 table-td" border="1">
				<tbody><tr class="a3">
					<td align="right" class="w150 pr40">LAN Port</td>
					<td class="pl10">VLAN ID (1~4094)</td>
				</tr>
				</tbody><tbody id="lan_port_wrap">
                 	<tr id="tr-lan0" class="none">
                        <td align="right" class="w150 pr40">LAN0</td>
                        <td class="pl10">
                        	<input type="text" name="lan_qvlan0" size="4" maxlength="4">
                        </td>
					</tr>
                    <tr id="tr-lan1" class="none">
                        <td align="right" class="w150 pr40">LAN1</td>
                        <td class="pl10">
                        	<input type="text" name="lan_qvlan1" size="4" maxlength="4">
                        </td>
					</tr>
                    <tr id="tr-lan2" class="none">
                        <td align="right" class="w150 pr40">LAN2</td>
                        <td class="pl10">
                        	<input type="text" name="lan_qvlan2" size="4" maxlength="4">
                        </td>
					</tr>    
                </tbody>
			</table>
			<table class="w638 ml20 mt10 table-td" border="1">
				<tbody><tr class="a3">
					<td align="right" class="w150 pr40">2.4G SSID</td>
					<td class="pl10">VLAN ID (1~4094)</td>
				</tr>
				</tbody><tbody id="qvlan_set">
                   	
                </tbody>
			</table>
            <table class="w638 ml20 mt10" border="1">
				<tbody><tr class="a3">
					<td align="right" class="w150 pr40">5G SSID</td>
					<td class="pl10">VLAN ID (1~4094)</td>
				</tr>
				</tbody><tbody id="qvlan_set_5g">
                   	
                </tbody>
			</table>
		</form>
		<div id="tail"></div>
	</div>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./js/wireless_qvlan.js?version=350"></script>


</body></html>