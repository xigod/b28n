var webAuth = {
    postUrl: '/goform/apPortalAuth',
    tmpAuthUrl: '/goform/apPortalSetTmpAuth',
    phoneAuth: '/goform/apPortalPhoneAuth',
    qqAuth: '/goform/apPortalQqAuth',
    MSG: {
        'empty': "This field can not be blank.",
        'phoneNumErr': "Please enter valid Mobile number format!",
        'validCodeErr': "Verification code should be a 4-digit number.",
        'accountEmpty': "The account can not be blank.",
        'passwordEmpty': "The password can not be blank.",
        'phoneNumEmpty': "The Mobile No. can not be blank."
    },
    RetMSG: {
        'webUserError': "Account or password error",
        'webTimeOut': "Expired account",
        'webMacError': "No access right",
        'phoneBlack': "The Mobile No. is in the black list.",
        'phoneCodeError': "Verification code error.",
        'success': "Authenticated successfully!",
        'phoneWhite': '',
        'unknown': "Unknown error.",
        "accessCodeNumLimitOut": "No more users can be added for Voucher.",
        "WebUserNumLimitOut": "No more users can be added for Portal authentication."
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
			//alert("authType is " + authType + " and portalCode is " + portalCode);
		}
        webAuth.initEvent();
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
        weixin: function() {
            webAuth.showDialog($('#modal-weixin'));
        },
        weibo: function() {

        },
        accessCode: function() {
            webAuth.showDialog($('#modal-accessCode'));
        }
    },
    timeOut: function(ele, time) {
        ele.text("Re-obtain after " + time + " seconds");
        setTimeout(function() {
            if (time > 0) {
                webAuth.timeOut(ele, --time);
            } else {
                ele.text("Obtain the verification code");
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
		 $('#loginSubmit1').on('click', function(e) {
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
        });

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


       /* $('#guide-list, #slider').on('click', 'a', function(e) {
            e.preventDefault();
            window.location.href = webAuth.tmpAuthUrl + '?url=' + $(this).attr('href') + '&rd=' + Math.random();
        });*/

        $('[data-dismiss]').on('click', function(e) {
            e.preventDefault();
            $('#smsTip').hide();
            webAuth.showDialog($('.dialog-container .modal').parent(), false);
        });
    }
};
