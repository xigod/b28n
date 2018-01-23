<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta http-equiv="pragma" content="no-cache">
<title>LOGIN</title>
<link rel="stylesheet" type="text/css" href="./public/reasy-ui.css?version=4093">
<script src="./public/j.js?version=4093"></script>
<script src="./lang/b28n.js?version=4093"></script>
</head>
<body class="login-body">
<div class="masthead">
  <div class="container">
    <div class="logo-head">
      <div class="navbar-inner">
        <p href="#" class="brand"></p>
      </div>
    </div>
  </div>
</div>
<div class="navbar-content login">
  <div class="login-title"></div>
  <div class="control-group">
    <div class="red message" id="loginMessage">&nbsp;</div>
  </div>
  <form method="post" action="/login/Auth" class="fn">
    <input type="hidden" name="usertype" id="usertype" value="admin">
	<input type="hidden" name="password" id="password">
    <input type="hidden" name="time" id="time">
    <div class="control-group text-box">
      <label class="control-label user-icon" for="username"></label>
      <div class="controls">
        <input type="text" id="username" name="username" maxlength="32" class="input-box input-medium" value="">
      </div>
    </div>
    <div class="control-group text-box">
      <label class="control-label password-icon" for="password"></label>
      <div class="controls">
        <input type="password" id="pass" maxlength="32" class="input-box input-medium" value="">
      </div>
    </div>
  </form>
  <div id="country-set">
    <div class="control-group text-box">
      <label class="control-label country-icon"></label>
      <div class="controls">
        <select id="country" class="input-box input-medium none">
        </select>
        <select id="select-lang" class="input-box input-medium none">
        </select>
      </div>
    </div>
  </div>
  <div class="btn-group">
    <input type="button" class="btn btn-small btn-login permit" id="save" value="Login">
    <div class="notice"> <a id="forgetpwd">Forget password?<span class="tip">Try logging in with the default user name and password. If login fails, hold down the RST or RESET button of the device for about 8 seconds, wait about 1 minute, and try login again.</span></a> </div>
  </div>
</div>
<script>B.setTextDomain("all");</script> 
<script src="./js/reasy-ui.js?version=4093"></script> 
<script src="./public/gozila.js?version=4093"></script>
<script src="./js/countryCode.js?version=4093"></script> 
<script src="./js/login.js?version=4093"></script>

</body></html>