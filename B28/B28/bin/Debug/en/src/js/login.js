var G = {};

G.MSG = {
	userEmpty: _("Enter your user name."),
	userLenErr: _("Only a maximum of 32 characters is allowed in the user name."),
	pwdEmpty: _("Enter your password."),
	pwdLenErr: _("Only a maximum of 32 characters is allowed in the password."),
	userOrpwdErr: _("Incorrect user name or password."),
	pwdErr: _("Incorrect password.")
};
var login = {
	setUrl: "/login/Auth", //提交数据接口
	getUrl: "goform/getLoginInfo", //获取数据接口
	user: "username", //用户名 ID
	password: "pass", //密码 ID
	message: "loginMessage", //显示信息 ID
	save: "save", //保存 ID
	//cancel: "cancel", //取消 ID
	encode: true, //是否需要加密 密码
	hasUser: true, //是否需要输入用户名
	adminName: '',
	productName: '',
	countryShow: false,
	country : function(){
		var countryHtml = "",
			prop;
		for (prop in countryCode) {
			countryHtml += "<option value='" + prop + "'>" + countryCode[prop].name + "</option>";
		}
		$("#country").html(countryHtml);
	}
};

function Login(Encode) {
	var that = this;
	//验证数据
	this.checkData = function (username, password) {
		var i = 0,
			msg = "",
			elem, val;

		elem = password; //验证密码
		val = document.getElementById(elem).value;

		if (val == '') {
			msg = G.MSG.pwdEmpty;
			document.getElementById(elem).focus();
		} else {
			if (val.length > 32 || val.length < 1) {
				msg = G.MSG.pwdLenErr;
				document.getElementById(elem).focus();
			}
		}

		elem = null;
		elem = username; //验证用户名
		val = document.getElementById(elem).value;
		if ((elem == G.data.user) && G.data.hasUser) {
			if (val == '') {
				msg = G.MSG.userEmpty;
				document.getElementById(elem).focus();
			} else {
				if (val.length > 32 || val.length < 1) {
					msg = G.MSG.userLenErr;
					document.getElementById(elem).focus();
				}
			}
		}

		if (msg) { //显示错误信息
			document.getElementById(G.data.message).innerHTML = "&nbsp;";
			setTimeout(function () {
				document.getElementById(G.data.message).innerHTML = msg;
			}, 200);
			return false;
		}
		return true;
	}

	function showLoginCheck(str) {
		var num = str || "";
		if (num == "accountError" || num == "pwdError") {
			document.getElementById(G.data.message).innerHTML = "&nbsp;";
			if (G.data.hasUser) {
				setTimeout(function () {
					document.getElementById(G.data.message).innerHTML = G.MSG.userOrpwdErr;
				}, 200);
			} else {
				setTimeout(function () {
					document.getElementById(G.data.message).innerHTML = G.MSG.pwdErr;
				}, 200);
			}
			return;
		}
	}
	
	function getTimeData(){
		var today = new Date(),
			data = today.getFullYear().toString();
			
		data += ';'+(parseInt(today.getMonth(),10)+1);
		data += ';'+today.getDate();
		data += ';'+ today.getHours();
		data += ';'+today.getMinutes();
		data += ';'+today.getSeconds();
		return data;
	}

	//提交数据
	this.preSubmit = function () {
		var subStr = "",
			username = document.getElementById(G.data.user).value,
			password = document.getElementById(G.data.password).value;
			
		$("#password").val( Encode(password) );
		
		$("#usertype").val( (username == G.data.adminName ? "admin" : "user") );
		$("#time").val( getTimeData() );
		$("form").submit();
	}
	
	this.enterDown = function (events) {

		//解决火狐浏览器不支持event事件的问题。
		var e = events || window.event,
			char_code = e.charCode || e.keyCode;

		if (char_code == 13) { //判断是 “Enter”键
			if (e.preventDefault) { //阻止浏览器默认事件
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			this.preSubmit();
		}
		return false;
	}

	this.initHtml = function () {

		if (G.data.hasUser) {
			$("#" + G.data.user).val("");
			$("#" + G.data.user).parent().parent().removeClass("none");
			$("#" + G.data.user).addPlaceholder(_("Default user name: admin"));

		} else {
			$("#" + G.data.user).parent().parent().addClass("none");
			$("#" + G.data.user).val("admin");
		}
		$(".login-title").html(G.data.productName);
		$("#" + G.data.password).val("");
		$("#" + G.data.password).initPassword(_("Default password: admin"));
	};

	this.initEvent = function () {
		document.getElementById(G.data.save).onclick = this.preSubmit;
		//document.getElementById(G.data.cancel).onclick = this.cancel;


		//绑定事件
		document.onkeydown = function (e) {
			that.enterDown(e);
		};

		$(".input-box").on("focus", function () {
			$(this).parent().parent().addClass("text-focus");
		});

		$(".input-box").on("blur", function () {
			$(this).parent().parent().removeClass("text-focus");
		});
	};

	this.getData = function () {
		var country = "";
		$.getJSON(G.data.getUrl + "?" + Math.random(), function (obj) {
			country = obj.country || "";
			$("#country").val(country);
		})
	};
	
	function directLocation(){
		if (top != window) {
			top.location.reload(true);
		}
	}
	
	function initCountry(){
		if (G.data.countryShow) {
			//$("#country-set").css("display", "");
			this.getData();
			G.data.country();
			$("#country").show();
		} else {
			//$("#country-set").css("display", "none");
			$("#select-lang").show();
		}
	}
	
	this.init = function (data) { //初始化绑定事件
		login.adminName = data.username;
		login.productName = data.apName;
		G.data = login;
		var loginSta = window.location.toString().split('#')[1];
		
		directLocation();
		showLoginCheck(loginSta);
		this.initHtml();
		initCountry();
		this.initEvent();
	};
}

Encode = function () {
	var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	function utf16to8(str) {
		var out,
			i,
			len,
			c;

		out = "";
		len = str.length;
		for (i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i);
			} else if (c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
		}
		return out;
	}

	function base64encode(str) {
		var out,
			i,
			len;
		var c1,
			c2,
			c3;

		len = str.length;
		i = 0;
		out = "";
		while (i < len) {
			c1 = str.charCodeAt(i++) & 0xff;
			if (i == len) {
				out += base64EncodeChars.charAt(c1 >> 2);
				out += base64EncodeChars.charAt((c1 & 0x3) << 4);
				out += "==";
				break;
			}
			c2 = str.charCodeAt(i++);
			if (i == len) {
				out += base64EncodeChars.charAt(c1 >> 2);
				out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				out += base64EncodeChars.charAt((c2 & 0xF) << 2);
				out += '=';
				break;
			}
			c3 = str.charCodeAt(i++);
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			out += base64EncodeChars.charAt(c3 & 0x3F);
		}
		return out;
	}
	return function (s) {
		return base64encode(utf16to8(s));
	}
}

function getValue() {
	$.GetSetData.getJson("goform/getLoginInfo", callback);
}

function callback(data) {
	var encodeLogic = new Encode(),
		loginLogic = new Login(encodeLogic);

	loginLogic.init(data);
}

window.onload = function () {

	getValue();
	//loginLogic.init();

};