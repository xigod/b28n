<!DOCTYPE html>
<html style="display:none;">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>System | System Time</title>
	<link rel="stylesheet" href="./public/style.css?version=350" />
	<script src="./lang/b28n.js?version=350"></script>

</head>
<body>
	<div class="divbody">
		<div id="head"></div>
		<div class="w750">
			<form name='frmSetup' style="width:666px;" method='post' id="system_hostname" action='/goform/SysToolTime'>
				<input type="hidden" name="GO" value="system_hostname.asp" />
				<input type="hidden" name="systemTime" />
				<div width="640" class="ml20 mt20">
					<div class="control-group">
						<p>
							This page is used to set the device's system time. You can select either to set the time manually or get the GMT time from Internet and system will automatically connect to NTP server to synchronize the time.
						</p>
					</div>
					<div class="control-group">
						<p>
							Note: System time will be lost when the device is disconnected from power supply. However, it will be updated automatically when the device reconnects to Internet.
						</p>
					</div>
					<div class="control-group">
						<div style="float:left; width: 50%;">
							<input type="checkbox" id="checkTimeEn" name="checkTimeEn" checked="checked" />
							Sync with Internet time servers
						</div>
						<div style="float:left;">
							Sync Interval:
							<select id="checkTimeInterval" name="checkTimeInterval" size="1">
								<!--setPeriod-->
								<option value="1800">30 minutes</option>
								<option value="3600">1 hour</option>
								<option value="7200">2 hours</option>
								<option value="43200">12 hours</option>
								<option value="86400">1 day</option>
								<option value="172800">2 days</option>
								<option value="604800">1 week</option>
								<option value="1209600">2 weeks</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<div>
							Time Zone:
							<select class="list" name="timeZone" id="timeZone">
								<option value="0">(GMT-12:00) Enewetak Island</option>
								<option value="1">(GMT-11:00) Samoa</option>
								<option value="2">(GMT-10:00) Hawaii</option>
								<option value="3">(GMT-09:00) Alaska</option>
								<option value="4">(GMT-08:00) San Francisco</option>
								<option value="5">(GMT-07:00) Denver</option>
								<option value="6">
									(GMT-06:00) Mexico City, Guatemala, Costarica, Salvador, Nicaragua
								</option>
								<option value="7">(GMT-05:00) New York, Ottawa</option>
								<option value="8">(GMT-04:00) Chile, Brazil</option>
								<option value="9">(GMT-03:00) Buenos Aires</option>
								<option value="10">(GMT-02:00) Mid-Atlantic</option>
								<option value="11">(GMT-01:00) Cape Verde Islands</option>
								<option value="12">(GMT) Greenwich Mean Time</option>
								<option value="13">
									(GMT+01:00) Denmark, Germany, Norway, Hungary, France, Belgium
								</option>
								<option value="14">(GMT+02:00) Israel, Egypt, Bucharest</option>
								<option value="15">(GMT+03:00) Moscow</option>
								<option value="16">(GMT+04:00) Sultanate of Oman, Mauritania, Reunion Island</option>
								<option value="17">(GMT+05:00) Pakistan, Novaya Zemlya, Maldives</option>
								<option value="17.5">(GMT+05:30) Madras,Calcutta,Bombay,New Delhi</option>
								<option value="18">(GMT+06:00) Colombo</option>
								<option value="19">(GMT+07:00) Bangkok, Jakarta</option>
								<option value="20">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumuqi, Taipei</option>
								<option value="21">(GMT+09:00) Tokyo, Pyongyang</option>
								<option value="22">(GMT+10:00) Sydney, Guam</option>
								<option value="23">(GMT+11:00) Solomon Islands</option>
								<option value="24">(GMT+12:00) Wellington</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<p>
							(Note: GMT time will be updated automatically only when the device is connected to Internet)
						</p>
					</div>
					<div class="control-group">
						<p>Set Time and Date Manually:</p>
					</div>
					<div>
						<p id="setTab">
							<input type="text" class="input-mini" name="year" size="4" maxlength="4" onKeyUp="value=this.value.replace(/[^0-9]/g,'')" />
							Year
							<input class="input-mic-mini" type="text" name="month" size="2" maxlength="2" onKeyUp="value=this.value.replace(/[^0-9]/g,'')" />
							Month
							<input class="input-mic-mini" type="text" name="day" size="2" maxlength="2" onKeyUp="value=this.value.replace(/[^0-9]/g,'')" />
							Day
							<input class="input-mic-mini" type="text" name="hour" size="2" maxlength="2" onKeyUp="value=this.value.replace(/[^0-9]/g,'')" />
							h
							<input class="input-mic-mini" type="text" name="minute" size="2" maxlength="2" onKeyUp="value=this.value.replace(/[^0-9]/g,'')" />
							m
							<input class="input-mic-mini" type="text" name="second" size="2" maxlength="2" onKeyUp="value=this.value.replace(/[^0-9]/g,'')" />
							s
							<input type="button" value="Sync with Your PC" class="button1 button" onClick="cplocaltime()" style="margin-left: 10px;"/>
						</p>
					</div>
				</div>
			</form>
			<div id="tail"></div>
		</div>
	</div>
	<script src="./public/j.js?version=350"></script>
	<script src="./public/gozila.js?version=350"></script>
	<script src="./public/menu.js?version=350"></script>
	<script src="./js/system_hostname.js?version=350"></script>
</body>
</html>