<!DOCTYPE html>
<html style="display:none;">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>System | System Log</title>
<link rel="stylesheet" href="./public/style.css?version=350" />
</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form action="/goform/sysAutoReboot" method="post" name="frmSetup">
		<table>
			<tr>
				<td width="180px">开关</td>
				<td><input type="checkbox" id="en"></td>
			</tr>
			<tr>
				<td>自定义重启类型</td>
				<td>
					<select id="sched_type" onChange="changeSchedType()">
						<option value="0">按间隔时间段重启</option>
						<option value="1">定时重启</option>
					</select>
			   </td>
			</tr>
			<tr id="tr-1">
				<td>间隔时间</td>
				<td> <input type="text" id="interval_time" value=1440>（单位：分钟）必须大于10分钟以上</td>
			</tr>
			<tr id="tr-2">
				<td>星期</td>
				<td>
					<input type="checkbox" id="week1">一
					<input type="checkbox" id="week2">二
					<input type="checkbox" id="week3">三
					<input type="checkbox" id="week4">四
					<input type="checkbox" id="week5">五
					<input type="checkbox" id="week6">六
					<input type="checkbox" id="week7">七
				</td>
			</tr>
			<tr id="tr-3">
				<td>重启时间</td>
				<td>  	<input type="text" id="time" size="5" value="11:59">
						<label  style=" display: inline-block;">例如：11:30</label>
				</td>
			</tr>
		</table>
		<input type="hidden" name="enable">
		<input type="hidden" name="type">
		<input type="hidden" name="interval">
		<input type="hidden" name="weekday">
		<input type="hidden" name="start_time">
		</form>
		<div id="tail"><br><input type="button" name="refresh" class="button" value=" 保 存 " id="submit"><br><br>
			<input type="button" name="clear" class="button" value=" 帮 助 " onClick="doHelp('auto_reboot')"><br><br>
		</div>
	</div>
</div>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./public/j.js?version=350"></script>
<script type="text/javascript">


	
var enable = "<%aspAutoReboot("sys","schedulereboot_enable");%>",
	sched_type = "<%aspAutoReboot("sys","schedulereboot_type");%>",
	interval = "<%aspAutoReboot("sys","schedulereboot_interval");%>",
	start_time = "<%aspAutoReboot("sys","schedulereboot_start_time");%>",
	wday = "<%aspAutoReboot("sys","schedulereboot_wday");%>";

$(document).ready(function(){
var row = wday.split(';');
		document.getElementById("head").innerHTML = tbl_head(10);
		$('#en').attr('checked', !!(+enable));
		$('#time').val(start_time);
		$("#interval_time").val(interval);
		$("#sched_type").val(sched_type);
		for(i = 0;i < row.length;i++) {
			$('#week' + (i+1)).attr('checked', !!(+row[i]));	
		}
		changeSchedType();
	$("#submit").on("click",preSubmit);
});



function changeSchedType(){
	if(+$("#sched_type").val()){
		$("#tr-1").addClass("none");
		$("#tr-2").removeClass("none");
		$("#tr-3").removeClass("none");	
	}else{
		$("#tr-1").removeClass("none");
		$("#tr-2").addClass("none");
		$("#tr-3").addClass("none");	
	}
}

function preSubmit(){
	var day = [],
		s_time = $('#time').val(),
		type = $("#sched_type").val();
		
	if(type == '0' && (+$("#interval").val() < 10)){
		alert("间隔时间必须大于10分钟以上");
		return;	
	}
	if(+type && s_time ==""){
		alert("请填写重启时间");
		return;	
	}
	if(+type && (s_time.split(":").length != 2 || (s_time.split(":")[0]>24) || (s_time.split(":")[1] > 59)) ){
		alert("请填写正确的重启时间");
		return;
	}
	for(i = 1;i < 8;i++) {	
		day.push((!!$('#week'+i).attr('checked'))?1:0);
	}
	
	document.forms[0].enable.value = (!!$("#en").attr("checked"))?1:0;
	document.forms[0].type.value = $("#sched_type").val();
	document.forms[0].interval.value = $("#interval_time").val();
	document.forms[0].start_time.value = $("#time").val();
	document.forms[0].weekday.value = day.join(";");
	document.forms[0].submit();
	
}
</script>
</body>
</html>