<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>QVLAN</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./public/j.js?version=350"></script>
</head>
<body id="qvlan_5g">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="/goform/QvlanSet5g" method="post" name="wireless_filter">
			<input type="hidden" id="GO" name="GO" value="wireless_qvlan.asp">
			<input name="wrlRadio" type="hidden" value="2.4G">
			<input type="hidden" id="maclist" name="maclist">
			<input type="hidden" name="enable_qvlan">
			<p class="w640 mt20 ml20">
				<span style="padding-left:130px; padding-right:50px">Enable</span><input type="checkbox" name="enable_qv">
			</p>
			<table id="div_tag" class="myTable table-td">
            	<tbody>
				<!--<tr style="display:none">
					<td align="right" class="w150 pr40">VLAN1 Tag</td>
					<td class="pl10"><select name="tag">
							<option value="1">tagged</option>
							<option value="0">Untagged</option>
						</select>
                   	</td>
				</tr>-->
			</tbody></table>
			<table class="w638 ml20 table-td" border="1">
				<tbody><tr class="a3">
					<td align="right" class="pr40" width="200px">SSID</td>
					<td class="pl10">VLAN ID (1-4094)</td>
				</tr>
                </tbody><tbody id="qvlan_set">
                   
                </tbody>
			</table>
		</form>
		<div id="tail"></div>
	</div>
</div>

<script src="./js/wireless.js?version=350"></script>


</body></html>