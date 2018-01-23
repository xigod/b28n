// JavaScript Document
var GLOBAL = {};
GLOBAL.pc = 0;
var userType = "admin",//"admin|user",//
    adminName = "admin",
    userName = "user",
    productName = "I21V1.0";
//当DOM元素加载完后运行

$(document).ready(function () {
	$.GetSetData.getJson("goform/getUserInfo", function(data) {
        userType = data.userType;
        adminName = data.adminName,
        userName = data.userName,
        productName = data.productName;
        init();
    }
});

function init() {
    if (navigator.userAgent.indexOf("MSIE 6.0") != -1) {
        alert(_("Please access the web UI using Internet Explorer 6.0 or a later version."));
    }
    if (userType == "admin") {
        $('#userType').html(_("Administrator"));
        $('#userName').text(adminName);
    } else {
        $('#userType').html(_("User"));
        $('#userName').text(userName);
    }

    if (top.CONFIG_WIFI_PACKET == "y") {
        $("#packet_menu").css("display", "");
    } else {
        $("#packet_menu").css("display", "none");
    }

    if (top.CONFIG_NET_WAN_PPPOE == "y") {
        $("#snmp_menu").css("display", "none");
    } else {
        $("#snmp_menu").css("display", "");
    }

    //document.getElementById("devTitle").innerHTML = (productName);
    document.title = productName;
    $('#FirwareVerion').text('Version:' + FirwareVerion);
    $("#middle_left li > a").on("click", function () {
        var url = $(this).attr("data-test");
        if ($(this).parent().hasClass("Bborder")) { //点击一级菜单
            $(".Bborder span.red").removeClass("red");
            $(this).prev().addClass("red").closest("ul").find("ul").addClass("none");

            if ($(this).next().length != 0) {
                $(this).siblings("ul").removeClass("none").find("li span").removeClass("yellow").first().addClass("yellow");
            }
        } else {
            $(this).prev().addClass("yellow").parent().siblings("li").children("span.yellow").removeClass("yellow");
        }
        if (url.indexOf("_5g") != -1) {
            top.RADIO = "5G";
        } else {
            top.RADIO = "2.4G";
        }
        $("[name='rightFrame']").attr("src", url + "?" + Math.random());
    });
    $("#middle_left a:eq(5)").click();
}

function reboot(url, time, upgrade, restore) { //time指重启设备时间time*100/1000=time/10
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
	GLOBAL.time = setTimeout("upgrading()", 450); //上传文件时间450*100/1000=45s
}

function loadding() {
	GLOBAL.pc += 1;
	if (GLOBAL.pc > 100) {
		GLOBAL.pc = 0;
		if (GLOBAL.my_url == "") {
			location.pathname = '';
		} else {
			window.location = GLOBAL.my_url;
		}
		$("#gbx_overlay,#loading_div").remove();
		clearTimeout(GLOBAL.time);
		return;
	}
	$(".reboot_pc").css('width', GLOBAL.pc + "%");
	$("#reboot_text").html(GLOBAL.pc + "%");
	GLOBAL.time = setTimeout("loadding()", GLOBAL.my_time);
}
