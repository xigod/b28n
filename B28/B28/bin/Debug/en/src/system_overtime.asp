<!DOCTYPE html>
<html style="display:none;"><head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title>Login Timeout Interval</title>
<link href="./public/style.css?version=350" rel="stylesheet">
<script src="./lang/b28n.js?version=350"></script>
<script>B.setTextDomain("all");</script>
</head>
<body>
<div class="divbody">
	<div id="head"></div>
	<div class="w750">
		<form method="post" name="frmform" action="/goform/setWebTimeout" id="system_overtime">
			<div class="myTable mt20">
				<div class="control-group"> 
					<label class="control-label">Login Timeout Interval:</label>  
					<div class="controls"><input class="text" maxlength="2" name="timeoutTime" id="timeoutTime" style="width:40px" size="4"><span class="text-help">m (Range: 10 to 7200)</span></div>
				</div>
			</div>
		</form>
		<div id="tail"></div>
	</div>
</div>
<script src="./public/j.js?version=350"></script>
<script src="./public/gozila.js?version=350"></script>
<script src="./public/menu.js?version=350"></script>
<script src="./js/system_overtime.js?version=350"></script>


</body></html>