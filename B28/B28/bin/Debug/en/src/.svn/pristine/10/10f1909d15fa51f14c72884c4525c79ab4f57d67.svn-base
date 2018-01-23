<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Cache-Control" content="no-cache" />
	<title>Basic</title>
	<link rel="stylesheet" href="./public/style.css?version=350" />
	<script src="./lang/b28n.js?version=350"></script>
	<script>B.setTextDomain("all");</script>
</head>
<body>
	<div class="divbody">
		<div id="head"></div>
		<div class="w750">
			<form action="/goform/setCloudApMngCfg" method="post" name="deploy">
				<input type="hidden" id="GO" name="GO" value="deploy.asp" />
				<div class="myTable mt20">
					<div class="control-group">
						<label class="control-label">Deployment</label>
						<div class="controls">
							<input type="radio" name="deployType" value="local">
							Local
							<input type="radio" name="deployType" value="yun">Cloud</div>
					</div>

					<div class="control-group">
						<label class="control-label">Device Name</label>
						<div class="controls">
							<input type="text" id="apDeviceName" name="apDeviceName" size="15" maxlength="64"></div>
					</div>
					<div class="control-group">
						<label class="control-label">Cloud AC Address</label>
						<div class="controls">
							<input type="text" id="yunAcIp" name="yunAcIp" size="15" maxlength="256">(The WAN IP address of the router that the Root AC connects to.)</div>
					</div>
					<div class="control-group">
						<label class="control-label">Cloud AC Manage Port</label>
						<div class="controls">
							<input type="text" id="yunAcManagePort" name="yunAcManagePort" size="5" maxlength="5">(Valid Range: 1024~65535)</div>
					</div>
					<div class="control-group">
						<label class="control-label">Cloud AC Upgrade Port</label>
						<div class="controls">
							<input type="text" id="yunAcUpgradePort" name="yunAcUpgradePort" size="5" maxlength="5">(Valid Range: 1024~65535)</div>
					</div>

				</div>
			</form>
			<div id="tail"></div>
		</div>
	</div>
	<script src="./public/j.js?version=350"></script>
	<script src="./public/gozila.js?version=350"></script>
	<script src="./public/menu.js?version=350"></script>
	<script src="./js/deploy.js?version=350"></script>
</body>
</html>