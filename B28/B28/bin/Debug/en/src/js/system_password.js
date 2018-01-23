var f = document.forms[0],
	initObj = {};
var addEvent = false;

function initHtml() {
	$("#head").html(tbl_head(14));
	$("#tail").html(tbl_tail('password'));
}

function getValue() {
	$.GetSetData.getJson("goform/getSysPwd", initValue);
}

function initValue(data) {
	initObj = data;
	parent.adminName = data.adminName;
	$("#admin").html(data.adminName);

	//是否存在普通用户
	if (data.userName && data.userName != "") {
		userExist = 1;
	} else {
		userExist = 0;
	}

	if (userExist == 1) {
		f.userEn.checked = true;
		$("button[name=moduser]").html(_("Edit"));
		$("#user").html(initObj.userName); //"user"
	}

    if (!addEvent) {
		$('[name=oldPwd]').initPassword();
		$('[name=newPwd]').initPassword();
		$('[name=newPwd2]').initPassword();
		addEvent = false;
	}
}

function initEvent() {
	$("button.moduser").on("click", function () {
		if (this.name == "modadmin") {
			f.usertype.value = "admin";
			f.action.value = "add";
			$("#olduserInfo,#newuserInfo").removeClass("none");
			$("input[name=oldUser]").val(parent.adminName); //"admin"
		} else {
			f.usertype.value = "user";
			if (userExist == 0) {
				f.action.value = "add";
				$("#olduserInfo").addClass("none");
				$("#newuserInfo").removeClass("none");
			} else {
				f.action.value = "add";
				$("#olduserInfo,#newuserInfo").removeClass("none");
				$("input[name=oldUser]").val(initObj.userName); //"user"
			}
		}
	});

	$("button.deluser").on("click", function () {
		f.userEn.checked = false;
		f.action.value = "del";
		f.usertype.value = "user";
		$("#olduserInfo,#newuserInfo").addClass("none");
	});
}

/**
 * @方法 preSubmit
 * @所属页面 system_password.asp
 * @参数 （objec）f 要操作的表单对象
 * @描述 验证数据，并向后台提交数据。
 */
function preSubmit() {
	if (parent.userType == "user") {
		alert(_("You are not allowed to make the change. Please log in as an administrator and try again."));
		return;
	}

	var r = /^[\w]+$/;
	//修改普通用户名时，不能与管理员用户名相同@edit by pjl
	if (f.newUser.value == parent.adminName && f.usertype.value == "user") {
		alert(_("The new user name and administrator user name cannot be the same."));
		return false;
	}

	//修改管理员用户名时，不能与普通用户名相同@edit by pjl
	if (f.usertype.value == "admin" && f.newUser.value == parent.userName) {
		alert(_("The Administrator account can't be the same with User account!"));
		return false;
	}

	if (f.action.value == "add") {
		if (f.usertype.value == "admin" && f.oldUser.value != parent.adminName) {
			alert(_("Incorrect old user name."));
			return false;
		}
		if (f.newUser.value == "") {
			alert(_("The new user name cannot be blank."));
			return false;
		}
		if (!r.test(f.newUser.value)) {
			alert(_("Only digits, letters, and underscores are allowed in the new user name."));
			return false;
		}
		if (!r.test(f.newPwd.value) || !r.test(f.newPwd2.value)) {
			alert(_("Only digits, letters, and underscores are allowed in the new password."));
			return false;
		}
		if (f.newPwd.value != f.newPwd2.value) {
			alert(_("The confirm password must be the same as the new password."));
			return false;
		}
	}

	//修改普通用户名时，需要更新保存在全局变量中的普通用户名@edit by pjl
	if (f.usertype.value == "user") {
		parent.userName = f.newUser.value;
	}

	var dataObj = getDefaultSubmitData();
	dataObj.radio = top.RADIO || '';
	$.GetSetData.setData("goform/setSysPwd", dataObj, function (data) {
		if ($.parseJSON(data).errCode == '0') {
			alert(_("Incorrect old password. Please enter the correct one."));
		} else {
			window.location.reload();
		}
	});
	//submitData("goform/setSysPwd", callback)
}

function init() {
	initHtml();
	initEvent();
	getValue();
}

window.onload = function () {
	init();
}