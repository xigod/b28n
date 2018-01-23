<!DOCTYPE html>
<html style="display:none;">
<head>
<meta http-equiv=Content-Type content="text/html; charset=utf-8">
<title id="html_title">Time Reboot</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>
		<form action="/goform/sysAutoReboot" method="post" name="frmSetup">
			<div class="myTable mt20">

		<div class="control-group">
			<label for="" class="control-label">Enable Auto Reboot</label>
			<div class="controls">
				<input type="checkbox" id="en">
			</div>
		</div>
		<div class="control-group">
			<label for="" class="control-label">AUTO Reboot Type</label>
			<div class="controls">
				<select id="sched_type">
					<option value="interval">As Interval</option>
					<option value="timing">As Scheduled</option>
				</select>
			</div>
		</div>
		<div class="control-group" id="tr-1">
			<label for="" class="control-label">Reboot Interval</label>
			<div class="controls">
				<input type="text" id="interval_time" onKeyUp="filterV('interval_time');" value="1440"><span class="text-help;">(minute, range: 10~7200)</span>
			</div>
		</div>
		<div class="control-group" id="tr-2">
			<label for="" class="control-label">Time Reboot on</label>
			<div class="controls">
				<label class="radio">
					<input type="checkbox" id="everyday">Everyday
				</label>
				<label class="radio">
					<input type="checkbox" id="week1">Mon
				</label>
				<label class="radio">
					<input type="checkbox" id="week2">Tue
				</label>
				<label class="radio">
					<input type="checkbox" id="week3">Wed
				</label>
				<label class="radio">
					<input type="checkbox" id="week4">Thur
				</label>
				<label class="radio">
					<input type="checkbox" id="week5">Fri
				</label>
				<label class="radio">
					<input type="checkbox" id="week6">Sat
				</label>
				<label class="radio">
					<input type="checkbox" id="week7">Sun
				</label>
			</div>
		</div>
		<div class="control-group" id="tr-3">
			<label for="" class="control-label">Time Reboot at</label>
			<div class="controls">
				<input type="text" id="time" size="5" value="11:59">
				<label  style="display: inline-block;"><span class="text-help;">eg: 23:59</span></label>
			</div>
		</div>

		<!-- <table style="margin-left: 20px;margin-top: 20px;">
			<tr>
				<td width="180px">Enable Auto Reboot</td>
				<td><input type="checkbox" id="en"></td>
			</tr>
			<tr>
				<td>AUTO Reboot Type</td>
				<td>
					<select id="sched_type">
						<option value="interval">As Interval</option>
						<option value="timing">As Scheduled</option>
					</select>
			   </td>
			</tr>
			<tr id="tr-1">
				<td>Reboot Interval</td>
				<td> 
				<input type="text" id="interval_time" onKeyUp="filterV('interval_time');" value="1440">(minute, range: 10~7200)
				</td>
			</tr>
			<tr id="tr-2">
				<td>Time Reboot on</td>
				<td>
					<label class="radio"><input type="checkbox" id="everyday">Everyday</label>
					<label class="radio"><input type="checkbox" id="week1">Mon</label>
					<label class="radio"><input type="checkbox" id="week2">Tue</label>
					<label class="radio"><input type="checkbox" id="week3">Wed</label>
					<label class="radio"><input type="checkbox" id="week4">Thur</label>
					<label class="radio"><input type="checkbox" id="week5">Fri</label>
					<label class="radio"><input type="checkbox" id="week6">Sat</label>
					<label class="radio"><input type="checkbox" id="week7">Sun</label>
				</td>
			</tr>
			<tr id="tr-3">
				<td>Time Reboot at</td>
				<td>  	<input type="text" id="time" size="5" value="11:59">
						<label  style=" display: inline-block;">eg: 23:59</label>
				</td>
			</tr>
		</table> -->
		</div>
		<input type="hidden" name="manualRebootEn">
		<input type="hidden" name="rebootType">
		<input type="hidden" name="intervalTime">
		<input type="hidden" name="rebootDate">
		<input type="hidden" name="rebootTime">
		</form>
		<div id="tail">
		</div>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>

<script src="./js/timing_reboot.js?version=350"></script>

</body>
</html>