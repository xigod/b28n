//二级目录
//二级目录
var G_deviceName = top.productName || "";
var version = '?version=4112';//版本号 用于清除缓存
var menu = new Array();
menu[0] = new Array("System Status:status_system.asp");
menu[1] = new Array("2.4GHz Wireless Status:status_wireless.asp","5GHz Wireless Status:status_wireless_5g.asp");
menu[2] = new Array("2.4GHz Traffic Statistics:status_ap.asp","5GHz Traffic Statistics:status_ap_5g.asp");
menu[3] = new Array("2.4GHz Client List:status_wirelesslist.asp","5GHz Client List:status_wirelesslist_5g.asp");
menu[4] = new Array(_("LAN Setup: lan.asp"));
menu[5] = new Array("Wireless Bridge:wireless_mode.asp");
menu[6] = new Array("2.4GHz SSID:wireless_basic.asp","5GHz SSID:wireless_basic_5g.asp");
menu[7] = new Array("2.4GHz Radio:wireless_radio.asp","5GHz Radio:wireless_radio_5g.asp");
menu[8] = new Array("2.4GHz Access Control:wireless_filter.asp","5GHz Access Control:wireless_filter_5g.asp");
menu[9] = new Array("2.4GHz Radio Optimizing:wireless_radioUp.asp","5GHz Radio Optimizing:wireless_radioUp_5g.asp");
menu[10] = new Array("Firmware Upgrade:system_upgrade.asp");
menu[11] = new Array("System Time:system_hostname.asp", "Login Timeout:system_overtime.asp");
menu[12] = new Array("View Logs:system_log.asp", "Log Setup:log_setting.asp");
menu[13] = new Array("Backup & Restore:system_backup.asp", "Restore to Factory Default:system_restore.asp");
menu[14] = new Array("User Name & Password:system_password.asp");
menu[15] = new Array("Diagnostics:system_checktool.asp");
menu[16] = new Array("SNMP:snmp.asp");
menu[17] = new Array("System Update:system_rebooting.asp");
menu[18] = new Array("Warning:error.asp");
menu[19] = new Array("Quick Setup:wizard.asp");
menu[20] = new Array("Help:#");
menu[21] = new Array("2.4GHz WDS:wireless_wds.asp","5GHz WDS:wireless_wds_5g.asp");
menu[22] = new Array("QVLAN:wireless_qvlan.asp");
menu[23] = new Array("DHCP Server:lan_dhcps.asp","DHCP Client List:lan_dhcp_clients.asp");
menu[24] = new Array("2.4GHz Signal Scan:wireless_channel.asp","5GHz Signal Scan:wireless_channel_5g.asp");
menu[25] = new Array("LED:system_led.asp");
menu[26] = new Array("Reboot:system_reboot.asp","Time Reboot:timing_reboot.asp");
menu[27] = new Array("无线抓包:wireless_packet.asp");
menu[28] = new Array("Deployment:deploy.asp");
menu[29] = new Array("Uplink Detection:checkUpLink.asp");
menu[31] = new Array("Traffic Control:qos_control.asp");
menu[30] = new Array("2.4GHz WMM:wmmSetting.asp","5GHz WMM:wmmSetting_5g.asp");
menu[32] = new Array("Broadcast/Multicast Control:broadcast.asp");
menu[33] = new Array("URL Filter:urlFilter.asp");
menu[34] = new Array("App Filter:appFilter.asp");
menu[35] = new Array("2.4GHz Frequency Analysis:wireless_rate.asp","5GHz Frequency Analysis:wireless_rate_5g.asp","2.4GHz Rogue AP Detection:wireless_channel.asp","5GHz Rogue AP Detection:wireless_channel_5g.asp");
menu[36] = new Array("Advanced:wireless_advance.asp");
menu[37] = new Array("Virtual AC:vac_deploy.asp");
if(top.max_ssid_5g_num == 0) {
	menu[1] = new Array("2.4GHz Wireless Status:status_wireless.asp");
	menu[2] = new Array("2.4GHz Traffic Statistics:status_ap.asp");
	menu[3] = new Array("2.4GHz Client List:status_wirelesslist.asp");
	menu[6] = new Array("2.4GHz Basic:wireless_basic.asp");
	menu[7] = new Array("2.4GHz Radio:wireless_radio.asp");
	menu[8] = new Array("2.4GHz Access Control:wireless_filter.asp");
	menu[9] = new Array("2.4GHz Advanced:wireless_advance.asp");
	menu[21] = new Array("2.4GHz WDS:wireless_wds.asp");
	menu[22] = new Array("2.4GHz QVLAN Setup:wireless_qvlan.asp");
	menu[24] = new Array("2.4GHz Signal Scan:wireless_channel.asp");
}

function Click() {
	window.event.returnValue = false;
}
document.oncontextmenu = Click;

function tbl_head(i) {
	var childName = window.location.toString().split("?")[0].split("/"),
		len_k = menu[i].length,
		k = 0,
		s = '<table><tr height="24"><td width=5></td>';
	for(; k < len_k; k++){	
		var m =	menu[i][k].split(":");
		if(childName[3] == m[1]){
			s += '<td class="menu-cubg1"></td><td class="menu-cubg3"><a id="menu_'+(m[1].split(".")[0])+'" href="'+(m[1]+version)+'" class="thirdMenu thick-bottom third-menu1"  target="_self">'+_(m[0])+'</a></td><td class="menu-cubg2"></td>';
		}else{
			s += '<td class="menu-bg1"></td><td class="menu-bg3"><a id="menu_'+(m[1].split(".")[0])+'" href="'+(m[1]+version)+'" class="thirdMenu orange-bottom third-menu2"  target="_self">'+ _(m[0])+'</a></td><td class="menu-bg2"></td>';
		}
	}
	s += '</tr></table><div id="red_line"></div>';
	return s;
}

$("body").delegate('.thirdMenu', 'click', function(e) {
	changeThirdMenu($(this).attr('href'));
})

//点击切换三级菜单
function changeThirdMenu(url) {
	if (url.indexOf("_5g") != -1) {
		top.RADIO = "5G";
	} else {
		top.RADIO = "2.4G";
	}
	top.$("[name='rightFrame']").attr("src", url + "?" + Math.random());
}

function tbl_tail(help) {
	var m = '<br><input class="button" type="button" id ="btnsubmit"value="' + _("Save") + '" onClick=preSubmit()>';
	m += '<br><br><input class=button type=button value="' + _("Restore") + '" onClick="window.location.reload()">';
	m += '<br><br><input class=button type=button value="' + _("Help") + '" onClick=doHelp("' + help + '")>';
	return m;
}

function doHelp(t) {
	window.location = 'do_help.htm?version=4112#' + t;
}