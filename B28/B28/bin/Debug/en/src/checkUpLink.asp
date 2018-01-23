<!DOCTYPE html>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache">
<title>SSID</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
<script>B.setTextDomain("all");</script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="/goform/setUplinkInfo" method="post" name="uplink">
			<input type="hidden" id="GO" name="GO" value="checkUpLink.asp">
			<div class="myTable mt20">
				<div class="control-group">
					<label for="" class="control-label">Uplink Check</label>
					<div class="controls">
						<input type="checkbox" name="upLinkEn" id="upLinkEn">Enable</div>
				</div>
				<div class="control-group">
					<label for="" class="control-label">Host 1 to Ping</label>
					<div class="controls">
						<input type="text" id="pingHostIp1" name="pingHostIp1" size="15" maxlength="15">
					</div>
				</div>
				<div class="control-group">
					<label for="" class="control-label">Host 2 to Ping</label>
					<div class="controls">
						<input type="text" id="pingHostIp2" name="pingHostIp2" size="15" maxlength="15">
					</div>
				</div>
				<div class="control-group">
					<label for="" class="control-label">Ping Interval</label>
					<div class="controls">
						<input type="text" id="pingInterval" name="pingInterval" size="5" maxlength="3"><span class="text-help">m (Range: 10 to 100; Default: 10)</span>
					</div>
				</div>
			</div>
		</form>
		<div id="tail"></div>
	</div>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="js/checkUpLink.js?version=350"></script>
<script>/*var linkEn = "<%getLinkInfo("linkEn");%>",
	pingIp1 = "<%getLinkInfo("pingIp1");%>",
	pingIp2 = "<%getLinkInfo("pingIp2");%>",
	intervalTime = "<%getLinkInfo("intervalTime");%>"*/</script>
<!-- <script>
	var f = document.forms[0];
	function init() {
		f.linkEnable.onclick = changeEnable;
		initValue();
		$("#head").html(tbl_head(29));
		$("#tail").html(tbl_tail("uplink"));
	}

	function changeType(type) {
		var state = (type == '1' ? false : true);
		document.getElementsByName('ping1')[0].disabled = state;
		document.getElementsByName('ping2')[0].disabled = state;
		document.getElementsByName('intervalTime')[0].disabled = state;
	}
	
	function changeEnable() {
		changeType(~~f.linkEnable.checked); 	
	}
	
	function initValue() {
		changeType(linkEn);
		
		if (linkEn == '1') f.linkEnable.checked = true;
		else f.linkEnable.checked = false;
		f.ping1.value = pingIp1;
		f.ping2.value = pingIp2;
    	f.intervalTime.value = intervalTime;
	}
	
	function preSubmit() {
		if (parent.userType == "user") {
			alert(_("You must log in as an administrator to make any change."));
			return false;
		}
		if(f.linkEnable.checked) {

			if(f.ping1.value == "" && f.ping2.value == "") {
				alert(_("Please input a valid Ping IP address!"))
				return;
			}

			if(f.ping1.value != "") {
				if (!checkIp(f.ping1,_("Ping Host1"))) {
					return false;
				}
			}
			
			if(f.ping2.value != "") {
				if (!checkIp(f.ping2, _("Ping Host2"))) {
					return false;
				}
			}
			
			if (~~f.intervalTime.value < 10 || ~~f.intervalTime.value > 100) {
				alert(_("Please input a valid Ping interval!"));
				
				return false;
			}
			f.linkEn.value = "1";
		} else {
			f.linkEn.value = "0";
		}
		
		f.submit();
	}
</script> -->

</body></html>