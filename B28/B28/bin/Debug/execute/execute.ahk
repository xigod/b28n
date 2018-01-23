
args = %1%
a:=RegExReplace(args,"^execute\:\/\/", "")
;MsgBox %a%
if %1%
{
	run %a%
} else {
	MsgBox, 3, 应用注册, 是否安装应用打开器?
	IfMsgBox Yes
	{
		RegWrite, REG_SZ, HKEY_CLASSES_ROOT, execute\shell\open\command, , %A_ScriptFullPath% "`%1"
		RegWrite, REG_SZ, HKEY_CLASSES_ROOT, execute\shell\open\command, URL Protocol
		MsgBox 安装成功!
	}
	IfMsgBox No
	{
		RegDelete, HKEY_CLASSES_ROOT, execute
		MsgBox 卸载成功!
	}
}

