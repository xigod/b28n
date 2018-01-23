<!DOCTYPE html>
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Cache-Control" content="no-cache">
<title>SSID</title>
<link rel="stylesheet" href="./public/style.css?version=4112">
<script src="./lang/b28n.js?version=4112"></script>
<script>B.setTextDomain("all");</script>
</head>
<body onload="init();">
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="goform/vacModeSet" method="post" name="deploy">
			<input type="hidden" id="GO" name="GO" value="vac_deploy.asp">
			<table class="myTable mt20">
			    <tbody><tr>
					<td>Virtual AC Function</td>
					<td>
					<div class="none">
						<input type="radio" name="vac_mode" value="slave">Standby AC</div>
					<input type="radio" name="vac_mode" value="master" style="margin-left:10px;">Enable<input type="radio" name="vac_mode" value="default" style="margin-left:10px;">Disable</td>
				</tr>

		     	<tr id="masterAC">
					<td>Virtual AC IP Address</td>
					<td style="width:265px;">
						<input type="text" class="vac-input" name="ACAddr" size="3" maxlength="3">.<input type="text" class="vac-input" name="ACAddr" size="3" maxlength="3">.<input type="text" class="vac-input" name="ACAddr" size="3" maxlength="3">.<input type="text" class="vac-input" name="ACAddr" size="3" maxlength="3">
						<input class="none" maxlength="15" name="vac_ip">
					</td>
					<td>
						<input type="button" id="enterAC" disabled="disabled" value="Virtual AC Login">
					</td>
				</tr>
			</tbody></table>
		</form>
		<div id="tail"></div>
	</div>
</div>
<script src="./public/gozila.js?version=4112"></script>
<script src="./public/menu.js?version=4112"></script>
<script src="./public/j.js?version=4112"></script>
<script src="./public/common.js?version=4112"></script>
<script>var ap_control_type ="<%getCloudApmngCfg("ap_control_type");%>",
dev_name = "<%getCloudApmngCfg("dev_name");%>",
ac_hostname_ip = "<%getCloudApmngCfg("ac_hostname_ip");%>",
ac_mangle_port = "<%getCloudApmngCfg("ac_mangle_port");%>",
ac_upgrade_port = "<%getCloudApmngCfg("ac_upgrade_port");%>";</script>
<script>var f = document.forms[0],
		segment = '';

	function init() {
		
		$("#head").html(tbl_head(37));
		$("#tail").html(tbl_tail("vac_deploy"));

		initValue();

		setTimeout(function() {
			$("#enterAC").removeAttr('disabled');
		}, 6000)

		$("#btnsubmit").on('click',preSubmit);
		$("[name=vac_mode").on('click', function() {
			if($("[name=vac_mode")[1].checked) {
				$("#masterAC").removeClass('none');
			} else {
				$("#masterAC").addClass('none');
			}
		});
		$("#enterAC").on('click', function() {
			$.get("/goform/vacHttpdCheck?r="+Math.random(),function(str) {
				if(str == 1) {
					var vac_ip = "";

					for(var i = 0; i < 3; i++) {
						vac_ip += $("[name=ACAddr]")[i].value + ".";
					}
					vac_ip += $("[name=ACAddr]")[3].value;
					
					top.location.href = 'http://' + vac_ip;
				} else if(str == 0) {
					alert(_("The virtual AC is starting. Please wait."));
				}
			});
		});
	}	

	
	function initValue() {
		$.get("/goform/vacModeGet?r="+Math.random(),function(str) {
			if(typeof str == "string") {
				var data = JSON.parse(str),
					addr = data.vac_ip.split('.');

				segment = addr[2];
				if(data.vac_mode == "master") {
					$("[name=vac_mode]")[1].checked = true;
					$("#masterAC").removeClass('none');
				} else if(data.vac_mode == "slave") {
					$("[name=vac_mode]")[0].checked = true;
					$("#masterAC").addClass('none');
				} else if(data.vac_mode == "default") {
					$("[name=vac_mode]")[2].checked = true;
					$("#masterAC").addClass('none');
				}

				for(var i = 0; i < 4; i++) {
					$("[name=ACAddr]")[i].value = addr[i];
				}
			} else {
				alert(_("Failed to obtain data."));
			}

		});
	}

	function permission() {
		if (!checkIp(f.vac_ip, _("IP Address"))) {
            return false;
        }

        return true;
	}
	
	function preSubmit() {
		if(segment != $("[name=ACAddr]")[2].value) {
			if(confirm(_("You have changed IP address of the virtual AC. Please change the IP address of your computer so that it belongs to the same network segment as the new IP address of the virtual AC. Then, you can log in to the web UI of the virtual AC with its new IP address."))) {
				submitData();
			}
		} else {
			submitData();
		}
	}

	function submitData() {
		var vac_ip = "";

		for(var i = 0; i < 3; i++) {
			vac_ip += $("[name=ACAddr]")[i].value + ".";
		}
		vac_ip += $("[name=ACAddr]")[3].value;

		f.vac_ip.value = vac_ip;

		if(permission()){
			f.submit();			
		}else{
			return false;
		}
	}</script>

</body></html>