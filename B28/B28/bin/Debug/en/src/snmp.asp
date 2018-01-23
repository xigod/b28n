<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>SNMP</title>
<link rel="stylesheet" href="./public/style.css?version=350">
<script src="./lang/b28n.js?version=350"></script>

</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form name="SetSnmp" method="POST" action="/goform/SetSnmp" id="system_snmp">
			<input type="hidden" name="GO" value="snmp.asp">
			<p class="ml20 mt20">You can configure SNMP settings here. SNMP v1 and SNMP V2C are supported.</p>
			<div class="myTable">
				<div class="control-group">
					<label class="control-label">SNMP Agent</label>
					<div class="controls"><input type="radio" name="snmpEn" value="false">Disable<input type="radio" name="snmpEn" value="true" checked="checked">Enable</div>
				</div>
				<div id="snmpWrap" class="none">
					<div class="control-group none">
						<label class="control-label">SNMP Version</label>
						<div class="controls"><input type="radio" name="snmpVer" value="1" checked="checked">SNMP V1&amp;V2<input type="radio" name="snmpVer" value="0">SNMP V3</div>
					</div>
					<div class="control-group">
						<label class="control-label">Administrator</label>
						<div class="controls"><input class="text" maxlength="32" name="snmpAdmin" id="snmpAdmin"></div>
					</div>
					<div class="control-group">
						<label class="control-label">Device Name</label>
						<div class="controls"><input class="text" maxlength="32" name="deviceName" id="deviceName"></div>
					</div>
					<div class="control-group">
						<label class="control-label">Location</label>
						<div class="controls"><input class="text" maxlength="32" name="location" id="location"></div>
					</div>
					<div class="control-group">
						<label class="control-label">Read Community</label>
						<div class="controls"><!--<select name="snmpGetcomm">
	                    		<option value="public">public</option>
	                            <option value="private">private</option>
	                        </select>-->
	                        <input class="text" maxlength="32" id="readCommunity" name="readCommunity">
	                    </div>
					</div>
					<div class="control-group">
						<label class="control-label">Read/Write Community</label>
						<div class="controls"><!--<select name="snmpSetcomm">
	                    		<option value="public">public</option>
	                            <option value="private">private</option>
	                        </select>-->
	                        <input class="text" maxlength="32" id="readWriteCommunity" name="readWriteCommunity">
	                    </div>
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
<script src="./js/snmp.js?version=350"></script>

</body></html>