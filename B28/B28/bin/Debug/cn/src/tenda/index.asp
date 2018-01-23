<!DOCTYPE html>
<html class="main-html">
<head>
<meta charset="utf-8">
<meta http-equiv="pragma" content="no-cache" />
<title>Tenda</title>
<link rel="stylesheet" type="text/css" href="./public/reasy-ui.css?version=4093">
<link rel="stylesheet" type="text/css" href="./public/index.css?version=4093">
<script src="./lang/b28n.js?version=4093"></script>
<script src="./public/j.js?version=4093"></script> 
</head>
<body class="main-body">
	<div class="masthead">
		<div class="container">
			<div class="logo-head">
                <div class="navbar-inner">
                    <p href="#" class="brand"></p>
                </div>
				<div class="navbar-head"></div>
                <div class='fixed-top'>
					<p class="navbar-head-text"><span id="userType">User Name</span><span>:</span><span id="userName">admin</span></p>
				</div>
			</div>
		</div>
	</div> 	
	<div class="container main-container"> 
	  <div class="nav-menu"> 	
		  <div id="menu">
            <ul class="nav-content" id="sub_menu">
                <li class="nav-list" id="status"></li>
                <li class="nav-list" id="wizard"></li>
                <li class="nav-list" id="net"></li>
                <li class="nav-list" id="wireless"></li>
                <li class="nav-list none" id="control"></li>
                <li class="nav-list" id="advance"></li>
                <li class="nav-list" id="tool"></li>
            </ul>
      	 </div>
	  </div>
      <div class="main-right-content">
          <!-- <div id="head-legend"><span class="head-legend-active">Basic</span></div> -->
          <iframe name="rightFrame" id="iframe-set" src="" width="100%" min-height="100%" frameborder="no" scrolling="auto"></iframe>
      </div>
  </div>
  <div class="container">   
		<div class="navbar-bottom">
			<div class="fixed-bottom"></div>
		</div>
	</div>
<script src="./js/macro_config.js?version=4093"></script>
<script>
B.setTextDomain("all");	

var HEAD = $("#head-legend");
var FirwareVerion = CONFIG_FIRWARE_VERION;
var max_ssid_5g_num = CONFIG_5G_MAX_SSID_NUMBER;

/**var userType = "admin",//"admin|user",//
	adminName = "admin",
	userName = "user",
	productName = "I21V1.0";
var main_max_power_2g = "3",
	main_min_power_2g = "4",
	main_def_power_2g = "2",
	main_max_power_5g ="1",
	main_min_power_5g = "3",
	main_def_power_5g = "2";**/</script>
</script>
<script src="./js/mod.js?version=4093"></script>
<script src="./js/main.js?version=4093"></script>
</body>
</html>