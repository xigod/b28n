var webAuth = {
    postUrl: '/goform/apPortalAuth',
    tmpAuthUrl: '/goform/apPortalSetTmpAuth',
    phoneAuth: '/goform/apPortalPhoneAuth',
    qqAuth: '/goform/apPortalQqAuth',
    MSG: {
        'empty': "不能为空",
        'phoneNumErr': "手机号码格式有误",
        'validCodeErr': "验证码应该为4位数字",
        'accountEmpty': "帐号不能为空",
        'passwordEmpty': "密码不能为空",
        'phoneNumEmpty': "手机号码不能为空"
    },
    RetMSG: {
        'webUserError': "用户名或密码错误",
        'webTimeOut': "用户名已过期",
        'webMacError': "设备无权登录",
        'phoneBlack': "手机号在黑名单中",
        'phoneCodeError': "手机验证码错误",
        'success': "认证成功",
        'phoneWhite': '',
        'unknown': "未知错误",
        "accessCodeNumLimitOut": "随机密码认证用户已满",
        "WebUserNumLimitOut": "Portal认证用户已满"
    },
    _timeOutFlag: null,
    showMsg: function(str, timeout) {
        if (str) {
            $('#msgBox').show().find('.modal-body').text(str);
            setTimeout(function() {
                $('#msgBox').addClass('in');
            }, 15);

            clearTimeout(webAuth._timeOutFlag);
            if (timeout) {
                if (timeout > 0) {
                    webAuth._timeOutFlag = setTimeout(function() {
                        $('#msgBox').removeClass('in').hide();
                    }, timeout);
                }
            } else {
                webAuth._timeOutFlag = setTimeout(function() {
                    $('#msgBox').removeClass('in').hide();
                }, 2500);
            }
        } else
            $('#msgBox').hide();
    },
    showDialog: function($ele, visible) {
        if (visible !== false) {
            $ele.show();
            var diaTop = ($(window).height() - $ele.find('.modal-dialog').height()) / 2.5;
            $ele.find('.modal-dialog').css({
                'top': diaTop < 0 ? 1 : diaTop
            });
            $('.modal-backdrop').show();
        } else {
            $ele.hide().find('.modal-dialog').css('top', 0);
            $('.modal-backdrop').hide();
        }
    },
    validator: {
        phoneNo: function(str) {
            if ($.trim(str) == '') {
                webAuth.showMsg(webAuth.MSG.phoneNumEmpty);
                return false;
            }
            if (!/^(86)*0*1\d{10}$/.test(str)) {
                webAuth.showMsg(webAuth.MSG.phoneNumErr);
                return false;
            }
            return true;
        },
        validCode: function(str) {
            if (!/[\d]{4}/.test(str)) {
                webAuth.showMsg(webAuth.MSG.validCodeErr);
                return false;
            }
            return true;
        },
        account: function(str) {
            if ($.trim(str) == '') {
                webAuth.showMsg(webAuth.MSG.accountEmpty);
                return false;
            }
            return true;
        },
        password: function(str) {
            if ($.trim(str) == '') {
                webAuth.showMsg(webAuth.MSG.passwordEmpty);
                return false;
            }
            return true;
        }
    },
    init: function() {
        //认证失败后提示错误信息
		var url = window.location.href;
		
		if(url.indexOf("authType") != -1) {
			var urlArr = url.split('&'),
				authType, portalCode;
				
			for(var i = 0; i < urlArr.length; i++) {
				if(urlArr[i].indexOf("authType") != -1) {
					authType = urlArr[i].split('=')[1];
				}
				if(urlArr[i].indexOf("portalCode") != -1) {
					portalCode = urlArr[i].split('=')[1];
				}
			}
            webAuth.showMsg(webAuth.RetMSG[portalCode], 0);
		}
        webAuth.initEvent();
        getWXStatus();
        initEvent();
    },
    returnAction: {
        login: function(res) {
            if (res !== '') {
                res = $.parseJSON(res);
                if (res.portalCode == 'success') {
                    window.location.href = $('#redirect').html();
                } else {
                    webAuth.showMsg(webAuth.RetMSG[res.portalCode], 0);
                }
            } else {
                webAuth.showMsg(webAuth.RetMSG.unknown, 0);
            }
        }
    },
    loginType: {
        qq: function() {
            $.post(webAuth.qqAuth, {
                redirectUrl: $('#redirect').html().replace(/^\s+|\s+$/g, '')
            }, function(res) {
                if (res !== '') {
                    res = $.parseJSON(res);
                    if (res.portalCode == 'redirectUrl') {
                        window.location.href = decodeURIComponent(res.portalUrl);
                    }
                }
            });
        },
        sms: function() {
            webAuth.showDialog($('#modal-sms'));
        },
        weichat: function() {
            
        },
        QRCode: function() {

        },
        accessCode: function() {
            webAuth.showDialog($('#modal-accessCode'));
        }
    },
    timeOut: function(ele, time) {
        ele.text("" + time + "秒后重新获取");
        setTimeout(function() {
            if (time > 0) {
                webAuth.timeOut(ele, --time);
            } else {
                ele.text("获取验证码");
                ele.removeClass('disabled');
                $('#smsTip').hide();
            }
        }, 1000);
    },
    initEvent: function() {
        var url = window.location.href,
            len = "data=".length,
            newUrl = "http://",
            newUrlPos, url_re, info, infoArr;

        infoArr = url.split('/');
        for(var i = 0; i < infoArr.length; i++) {
            if(infoArr[i].indexOf('html') != -1) {
                info = infoArr[i];
            }
        }
        if($("#redirect").html().replace(/\s/g,'') == "http://") {
            newUrlPos = url.indexOf('data=') + len;
            newUrl += url.slice(newUrlPos);
            url_re = newUrl;
        } else {
            url_re = $("#redirect").html().trim();
        }
        //web提交
        $('#loginSubmit').on('click', function(e) {
            e.preventDefault();
            var container = $(this).parents('form'),
                account = container.find('input[name=webUserName]').val(),
                password = container.find('input[name=webUserPassword]').val();
            if (!webAuth.validator.account(account) || !webAuth.validator.password(password)) {
                return;
            }
			var url_re;
			var url = window.location.href,
                    len = "data=".length,
                    newUrl = "http://",
                    newUrlPos;

			if($("#redirect").html().replace(/\s/g,'') == "http://") {
				newUrlPos = url.indexOf('data=') + len;
				newUrl += url.slice(newUrlPos);
				url_re = newUrl;
			} else {
				url_re = $("#redirect").html().trim();
			}
			$("#url").val(url_re);
            $("#info").val(info);
            $("#loginForm").submit();
        });
        //accessCode提交
        $('#accessSubmit').on('click', function(e) {
            e.preventDefault();
            var container = $(this).parents('form'),
                password = container.find('input[name=accessCode]').val();
            if (!webAuth.validator.password(password)) {
                return;
            }
            $("#accessCodeUrl").val(url_re);
            $("#acceInfo").val(info);
            $("#accessCodeForm").submit();
        });
		//手机适配的form表单提交
		/*$('#loginSubmit1').on('click', function(e) {
            e.preventDefault();
            var container = $(this).parents('form'),
                account = container.find('input[name=webUserName]').val(),
                password = container.find('input[name=webUserPassword]').val();
            if (!webAuth.validator.account(account) || !webAuth.validator.password(password)) {
                return;
            }
            f = document.getElementById("loginSubmit1");
			
			$("#url1").val(url_re);
            $("#info1").val(info);
            $("#phoneLoginForm").submit();
        });*/

        $('#msgBox').on('click', function() {
            webAuth.showMsg();
        });

        $('#getValidCode').on('click', function(e) {
            e.preventDefault();
            var that = this;
            if ($(this).hasClass('disabled')) {
                return;
            }
            if (!webAuth.validator.phoneNo($('#phoneNo').val())) {
                return;
            }
            

            $(this).addClass('disabled');
            
            $.post(webAuth.phoneAuth, {
                action: 'getValidCode',
                phoneNo: $('#phoneNo').val(),
                validCode: ''
            }, function(res) {
                if (res !== '') {
                    res = $.parseJSON(res);

                    if (res.portalCode == 'redirectUrl') {
                        $.ajax({
                            url: res.portalUrl,
                            type: 'GET',
                            dataType: 'JSONP',
                            success: function() {}
                        });
                        webAuth.timeOut($(that), 30);
                        $('#smsTip').show();
                    } else {
                        webAuth.showMsg(webAuth.RetMSG[res.portalCode], 10000);
                        $(that).removeClass('disabled');
                    }

                } else {
                    webAuth.showMsg(webAuth.RetMSG.unknown, 0);
                    $(that).removeClass('disabled');
                }
            });
        });
        //短信认证提交
        $('#smsLogin').on('click', function(e) {
            e.preventDefault();
            if (!webAuth.validator.phoneNo($('#phoneNo').val()) || !webAuth.validator.validCode($('#validCode').val())) {
                return;
            }

            $("#smsUrl").val(url_re);
            $("#smsInfo").val(info);
            $("#smsForm").submit();
            /*$.post(webAuth.phoneAuth, {
                action: 'login',
                phoneNo: $('#phoneNo').val(),
                validCode: $('#validCode').val()
            }, function(res) {
                webAuth.returnAction.login(res);
            });*/
        });

        if (!$('#authType, #authType1').find('a').length) {
            $('#authType, #authType1').parent().empty();
        } else {
            $('#authType, #authType1').on('click', 'a', function(e) {
                e.preventDefault();
                if (this.id !== "") {
                    webAuth.loginType[this.id]();
                }
            });
        }


        $('#guide-list, #slider').on('click', 'a', function(e) {
            e.preventDefault();
            if($(this).attr('href') != 'http://') {
                window.location.href = webAuth.tmpAuthUrl + '?url=' + $(this).attr('href') + '&rd=' + Math.random();
            }
        });

        $('[data-dismiss]').on('click', function(e) {
            e.preventDefault();
            $('#smsTip').hide();
            webAuth.showDialog($('.dialog-container .modal').parent(), false);
        });
    }
};

if (window.location.href.indexOf('?edit') > -1) {
    //在覆盖之前禁用跳转，会在编辑广告那里出现域错误
    $("#slider a").addClass('point-event');
    $("#guide-list a").addClass('point-event');

    var script = document.createElement('script');
        script.src = '/ad/base/res/edit.js?' + Math.random();
        document.getElementsByTagName('body')[0].appendChild(script);
}

//微信认证所需参数
var appid = "wx8814556889e06a18",
    shopid = "4892590",
    ssid = "psst-SYWX-php",
    secretKey = "54395f651f8e32c3cb542e1790da4ab4",
    mac = "",
    flag = 0;//获取微信参数完成标志
var url = window.location.href,
        len = "url=".length,
        newUrl = "http://",
        newUrlPos, url_re;

    if($("#redirect").html().replace(/\s/g,'') == "http://") {
        newUrlPos = url.indexOf('url=') + len;
        newUrl += url.slice(newUrlPos);
        url_re = newUrl;
    } else {
        url_re = $("#redirect").html().trim();
    }

function initEvent() {

    $("#weichat").on('click', function() {

        if(flag == 1) {

            callWechatBrowser();

        } else {

            webAuth.showMsg('微信认证所需参数还未获取完毕，请稍后！');

        }

    });

    $("#QRCode").on("click", function() {

        if(flag == 1) {

            var wxArgsUrl = "http://10.1.0.6/goform/wxportalauth",
                data = {
                    "type": "qrcode"
                };

            $.ajax({ 
                type: "get", 
                data: data,
                async: false, 
                url: wxArgsUrl, 
                dataType: "jsonp", 
                jsonp: "callback",
                jsonpCallback:"wxportalauth",
                success: function(json){ 
                     
                }, 
                error: function(xml,status,err){ 

                  console.log(err);

                } 
            }); 

        } else {

            webAuth.showMsg('微信认证所需参数还未获取完毕，请稍后！');

        }

          

    });

}

function wxportalauth(res) {//回调

    if(res.type == 'qrcode') {//二维码回调

        if(res.flag == 'success') {

            showQRCode();

        } else {

            webAuth.showMsg('二维码请求失败,请重试！');

        }
        

    } else if(res.type == 'wechat') {

        if(res.flag == 'success') {

            if (mac == ""){
                return;
            }

            var extend = "wxWifiPortalAuth",
                authUrl = "http://10.1.0.6/goform/wx3auth?data=" + url_re,
                timestamp = new Date().getTime();

            var sign  = $.md5(appid + extend + timestamp + shopid + authUrl + mac + ssid + secretKey);
            
            Wechat_GotoRedirect(appid, extend, timestamp, sign, shopid, authUrl, mac, ssid); 

        } else {

            webAuth.showMsg('微信认证请求失败,请重试！');

        }

    }

}

function showQRCode() {

    if($(".weichart-main-content").hasClass("none")) {

        $(".weichart-main-content").removeClass("none");

        JSAPI.auth({
            target : document.getElementById('qrcode_zone'),
            appId : appid,
            shopId : shopid,
            extend : 'wxWifiPortalAuthpc',
            authUrl : 'http://10.1.0.6/goform/wx3auth?data=' + url_re
        });

    } else {

        $(".weichart-main-content").addClass("none");

    } 

}

function getWXStatus() {//判断此广告是否开启微信认证

    var wxStatusUrl = "http://10.1.0.6/goform/wxenable";

    $.ajax({ 
        type: "get", 
        async: false, 
        url: wxStatusUrl, 
        dataType: "jsonp", 
        jsonp: "callback",
        jsonpCallback:"wxenable",
        success: function(json){ 
             
        }, 
        error: function(xml,status,err){ 

          console.log(err);

        } 
    });   

}

function wxenable(res) {
    try {

        var status = res.WxEable;

        if(status == 1) {

            $("#weichat, #QRCode").parent().removeClass('none');

            ssid = res.SSID;
            appid = res.AppId;
            mac = res.PhoneMAC;
            shopid = res.ShopId;
            secretKey = res.SecretKey;

            flag = 1;

        }

    } catch(e) {

        webAuth.showMsg('未知错误');

    }
}

function callWechatBrowser(){

    var wxStartUrl = "http://10.1.0.6/goform/wxportalauth",
        data = {
                "type": "wechat"
            };

    $.ajax({ 
        type: "get", 
        data: data,
        async: false, 
        url: wxStartUrl, 
        dataType: "jsonp", 
        jsonp: "callback",
        jsonpCallback:"wxportalauth",
        success: function(json){ 
             
        }, 
        error: function(xml,status,err){ 

          console.log(err);

        } 
    });    

}



