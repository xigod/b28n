var G = {};
G.clickFlag = true; // 处理点击间隔标志
G.hideMenu = {};
var GLOBAL = {};
GLOBAL.pc = 0;
GLOBAL.ssidEnCount = 0; //用于保存开启ssid个数，在无线射频设置中判断beacon的范围@edit by pjl
var version = '?version=4093'; //版本号 用于清除缓存
var userType = "admin",//"admin|user",//
    adminName = "admin",
    userName = "user",
    productName = "I21V1.0";

function getPageSize() {
	if (window.innerWidth) {
		return {
			pageWidth: window.innerWidth,
			pageHeight: window.innerHeight
		};
	} else if (typeof window.innerWidth != 'number') {
		if (document.compatMode == 'CSS1Compat') {
			return {
				pageWidth: document.documentElement.clientWidth,
				pageHeight: document.documentElement.clientHeight
			};
		} else {
			return {
				pageWidth: document.body.clientWidth,
				pageHeight: document.body.clientHeight
			};
		}
	}
}

function reboot(url, time, upgrade, restore) {
	//time指重启设备时间time*100/1000=time/10
	GLOBAL.my_url = url ? url : '';
	GLOBAL.my_time = time ? time : 300;
	//GLOBAL.ssl = ssl == 1 ? ssl : 0;
	GLOBAL.pageSize = getPageSize();
	$('body').append('<div id="loading_div" >' +
		'<div id="upgrade"><span class="upgrading"><span class="upgrade_pc"></span></span>' +
		'<br />' + _("Upgrading... Please do not power off the device.") + '<span id="upgrade_text"></span></div>' +
		'<div class="rebooting mt10"><span class="reboot_pc"></span></div><br />' +
		(restore == "restore" ? _('Restoring to factory default settings... Please wait!') : _('Rebooting...Please wait!')) +
		'<span id="reboot_text"></span></div>');
	$('body').append('<div id="gbx_overlay"></div>');
	var this_obj = $('#loading_div');
	var left = (GLOBAL.pageSize.pageWidth - this_obj.width()) / 2;

	this_obj.css({
		'left': left,
		'top': "200px"
	});
	if (upgrade) {
		this_obj.css("height", 180);
		upgrading();
	} else {
		$('#upgrade').hide();
		this_obj.css("height", 110);
		loadding();
	}
}

function upgrading() {
	GLOBAL.pc += 1;
	if (GLOBAL.pc > 100) {
		GLOBAL.pc = 0;
		clearTimeout(GLOBAL.time);
		loadding();
		return;
	}
	$(".upgrade_pc").css('width', GLOBAL.pc + "%");
	$("#upgrade_text").html(GLOBAL.pc + "%");
	GLOBAL.time = setTimeout("upgrading()", 550); //上传文件时间550*100/1000=55s
}

function loadding() {
	GLOBAL.pc += 1;
	if (GLOBAL.pc > 100) {
		GLOBAL.pc = 0;
		if (GLOBAL.my_url == "") {
			location.pathname = '';
		} else {
            setTimeout(function() {
                window.location.href = GLOBAL.my_url;
            }, 2000);
			
		}
		$("#gbx_overlay,#loading_div").remove();
		clearTimeout(GLOBAL.time);
		return;
	}
	$(".reboot_pc").css('width', GLOBAL.pc + "%");
	$("#reboot_text").html(GLOBAL.pc + "%");
	GLOBAL.time = setTimeout("loadding()", GLOBAL.my_time);
}

function viewportHeight() {
	var de = document.documentElement;

	return window.innerHeight || (de && de.clientHeight) || document.body.clientHeight || 0;
}

function MainLogic() {
	var speed = 600; //显示、隐藏时间
	var that = this;
	this.createMenu = function () {
		var menuObj,
			prop,
			str = "",
			i = 0,
			len,
			id,
			url,
			name,
			className,
			menuClass;

		menuObj = menuMod;
		for (prop in menuObj) {
			str = "";
			len = menuObj[prop].length;
			if (len === 1) {
				menuClass = "icon-menu-text";
			} else {
				menuClass = "icon-menu";
			}


			for (i = 0; i < len; i++) {
				id = menuObj[prop][i]["id"];
				url = menuObj[prop][i]["url"];
				name = menuObj[prop][i]["name"];
				hasModule = menuObj[prop][i]["hasModule"];

				//无该功能
				if (hasModule && hasModule == "n") {
					continue;
				}

				if (G.hideMenu[id]) { //判断是否为隐藏功能
					continue;
				}
				if (i === 0) {
					className = menuObj[prop][i]["class"];
					className = "img-icons " + className;
					str += '<a target="rightFrame" id="' + id + '" href="' + (url + version) + '" class="' + className + '"><div class="' + menuClass + '">' + name + '</div></a>';
					str += "<ul style='display: none;' class=''>";
				} else {
					str += '<li><a target="rightFrame" id="' + id + '" href = "' + (url + version) + '">' + name + '</a></li>';
				}
			}
			str += "</ul>";
			$("#" + prop).append(str);
		}
		$("#sub_menu").find("a").eq(0).click();
	};
	this.clickMenu = function () {
		var $parent = $(this).parent(),
			id = $(this).attr("id"),
			url = $(this).attr("href");
		if (!G.clickFlag) { //正在收缩或展开时 点击无效
			return;
		}
		var location = $("#" + id).attr("href");
		var locArry = $("#" + id).attr("href").split("/");
		var tagetId = locArry[locArry.length - 1].split(".")[0];

		$("#iframe-set").attr("src", location);
		$(".active").removeClass("active");
		if (url.indexOf("_5g") != -1) {
			top.RADIO = "5G";
		} else {
			top.RADIO = "2.4G";
		}
		if ($parent.hasClass("nav-list")) { //点击主菜单
			$(".menu-active").removeClass("menu-active"); //
			if ($(this).children().eq(0).hasClass("icon-menu")) { //点击展开
				G.clickFlag = false;
				$parent.children().eq(0).addClass("menu-active");
				if ($(".nav-list").find(".icon-menu-open").length === 0) { //没有展开的菜单时
					$parent.find("ul").show();
					G.clickFlag = true;
				} else {
					$(".nav-list").find(".icon-menu-open").addClass("icon-menu").removeClass("icon-menu-open");
					$(".nav-list").find("ul").animate({
						height: 0
					}, speed, function () {
						$(".nav-list").find("ul").hide();
						$parent.find("ul").show();
						G.clickFlag = true;
					});
				}
				$(this).children().eq(0).attr("class", "icon-menu-open");
                //解决系统工具菜单过高导致最后菜单显示不出来
                var extH = $parent.attr('id') == 'tool'  ? 54 : 0;
                if(extH == 30) {
                    //加高菜单ul后，右边框架出现空白，需统一高度
                    setTimeout(function() {
                        $(".main-right-content").css('height', parseInt($(".nav-menu").css('height'), 10));
                    },700);
                }
				$parent.find("ul").animate({
					height: ($parent.find("ul").children().length * 30 + extH)
				}, speed, function () {
					//$parent.find("ul").show();
				})
				$parent.find("ul").children().eq(0).addClass("active");

			} else if ($(this).children().eq(0).hasClass("icon-menu-open")) { //点击收缩
				$(this).children().eq(0).attr("class", "icon-menu");
				$parent.children().eq(0).addClass("menu-active");
				G.clickFlag = false;
				$parent.find("ul").animate({
					height: 0
				}, speed, function () {
					$parent.find("ul").hide();
					G.clickFlag = true;
				})

			} else { //点击没有子菜单的 主菜单
				$parent.addClass("active");
				$(".nav-list").find(".icon-menu-open").addClass("icon-menu").removeClass("icon-menu-open"); //
				G.clickFlag = false;
				$(".nav-list").find("ul").animate({
					height: 0
				}, speed, function () {
					$(".nav-list").find("ul").hide();
					G.clickFlag = true;
				})
			}

		} else { //点击子菜单 
			$(this).parent().addClass("active");
		}
	};

	this.reInitFrameHeight = function () {
		var mainHeight,
			viewHeght,
			menuHeight,
			frameHeight,
			height,
			minHeight,
			newArry = [];

		viewHeght = viewportHeight();
		mainHeight = $(".main-right-content").height();
		menuHeight = $("#sub_menu").height();
		frameHeight = $("#iframe-set").contents().find("fieldset").height();

		height = Math.max(menuHeight, frameHeight);

		if (height >= (viewHeght - 217)) {
			height = height + 10;

		} else {
			height = viewHeght - 217;
		}

		$(".main-right-content").css("min-height", height + 117 + "px");
		$("#iframe-set").css("min-height", height + 59 + "px");
		$("#menu").css("min-height", height + 133 + "px");

	};

	this.initValue = function () {
		that.createMenu();
	};

	this.initEvent = function () { //绑定事件
		$("#menu").delegate("a", "click", this.clickMenu);

		$(window).resize(this.reInitFrameHeight);
	};
	this.init = function () {

		if (CONFIG_NET_WAN_PPPOE == "y") {
			G.hideMenu = {
				"adv-0": true
			}
		}
		this.initEvent();
		this.initValue();
		this.reInitFrameHeight();
		window.mainLogic = this;


	};
}

$(function () {
    $.GetSetData.getJson("goform/getUserInfo", function(data) {
        var mainLogic;

        userType = data.userType;
        adminName = data.adminName,
        userName = data.userName,
        productName = data.productName;
        if (userType == "admin") {
            $('#userType').html(_("Administrator"));
            $('#userName').text(adminName);
        } else {
            $('#userType').html(_("User"));
            $('#userName').text(userName);
        }
        document.title = productName;
        mainLogic = new MainLogic();
        window.mainLogic = mainLogic;
        mainLogic.init();
    });
	
});