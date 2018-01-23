<!DOCTYPE html>
<html style="display:none;">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>System | Administrator Settings</title>
	<link rel="stylesheet" href="./public/style.css?version=350" />
	<script src="./lang/b28n.js?version=350"></script>

</head>
<body>
	<div class="divbody">
		<div id="head"></div>
		<div class="w750">
			<form name='frmSetup' method='post' action='/goform/SysToolChangePwdNew' id="system_password">
				<input type="hidden" name="GO" value="system_password.asp" />
				<input type="hidden" name="action">
				<input type="hidden" name="usertype">
				<table width="640" class="ml20 mt20 table-td">
					<tr>
						<td colspan="2" nowrap="nowrap">
							Use this section to change your login user name and password.
							<br />
							Note: User name and password can only include 1～32 letters, numbers or underscore!
						</td>
					</tr>
				</table>
				<table id="userInfo" border="1" class="ml20 tc table-td">
					<tr>
						<td width="80">Access Mode</td>
						<td width="120">User Name</td>
						<td width="80">Enable</td>
						<td width="140">Action</td>
					</tr>
					<tr>
						<td>Administrator</td>
						<td id="admin"></td>
						<td>
							<input type="checkbox" name="adminEn" checked disabled></td>
						<td>
							<button type="button" class="button1 moduser button" name="modadmin">Change</button>
						</td>
					</tr>
					<tr>
						<td>User</td>
						<td id="user"></td>
						<td>
							<input type="checkbox" name="userEn" value="1" disabled></td>
						<td>
							<button type="button" id="delUser" class="button1 deluser button">Delete</button>
							<button type="button" class="button1 moduser button" name="moduser">Add</button>
						</td>
					</tr>
				</table>
				<div id="olduserInfo" class=" none">
					<div class="control-group">
						<label class="control-label">Old User Name</label>
						<div class="controls">
							<input class="text" type="text" maxlength="32" name="oldUser" id="oldUser" size="15" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">Old Password</label>
						<div class="controls">
							<input class="text" type="password" maxlength="32" name="oldPwd" id="oldPwd"  size="15" />
						</div>
					</div>
				</div>

				<div id="newuserInfo" class="none">
					<div class="control-group">
						<label for="" class="control-label">New User Name</label>
						<div class="controls">
							<input class="text" type="text" maxlength="32" name="newUser" id="newUser" size="15" />
						</div>
					</div>
					<div class="control-group">
						<label for="" class="control-label">New Password</label>
						<div class="controls">
							<input class="text" type="password" maxlength="32" name="newPwd" size="15" />
						</div>
					</div>
					<div class="control-group">
						<label for="" class="control-label">Confirm New Password</label>
						<div class="controls">
							<input class="text" type="password" maxlength="32" name="newPwd2" size="15" />
						</div>
					</div>
				</div>
			</form>
			<div id="tail"></div>
		</div>
	</div>
	<script src="./public/j.js?version=350"></script>
	<script src="./js/reasy-ui.js?version=4093"></script> 
	<script src="./public/gozila.js?version=350"></script>
	<script src="./public/menu.js?version=350"></script>
	<script src="./js/system_password.js?version=350"></script>
</body>
</html>