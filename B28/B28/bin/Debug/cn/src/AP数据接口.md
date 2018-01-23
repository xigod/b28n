## AP数据接口
###goform/getSysStatus
获取系统状态数据

	{
		"system": {
			"deviceName": "",			//设备名称
			"systemTime": "",			//系统时间
			"runningTime": "",			//运行时间
			"clientNum": "",			//客户端个数
			"hardVersion": "",			//硬件版本号
			"firmwareVersion": "",		//软件版本号
			"wrlMode": "ap/wds/apclient/pppoe",
		},
		"lan": {
			"lanMac": "",				//LAN IP
			"lanIp": "",
			"lanMask": "",
			"lanDns1": "",
			"lanDns2": ""
		},
		"wan": {
			"connectStatus": "disconnected/connecting/connected",
			"wanIp": "",
			"wanMask": "",
			"wanGw": "",
			"wanDns1": "",
			"wanDns2": ""
		}
	}
getWizardInfo 
###goform/getWrlStatus?radio=2.4G/5G

radio: 值为2.4G表示获取2.4G无线数据   5G表示获取5G数据
 
获取无线状态数据

	{
		"wrlMode": "ap/wds/apclient/pppoe",
		"baseNetMode": "",				//工作模式
		"baseChannel": "",				//
		"baseRadioEn": "",				//射频开关
		"noiseLevel": "",				//噪声水平(dBm)后台原参数noiseLevel
		"channelUtilizationRate": "",	//信道利用率(%) channel_Rate
		"upRate": "",					//TX(%) TxRate
		"downRate": "",					//RX(%) RxRate
		"ssidList": [{
			"ssid": "",					//SSID
			"mac": "",					//MAC地址
			"ssidEn":"",				//SSID开关
			"secMode": "none/wep/wpapsk/wpa2psk/wpawpa2psk/wpa/wpa2"				//SSID加密模式
		},{
			"ssid": "",
			"mac": "",
			"ssidEn":"",
			"secMode": ""
		}...],
		"wdsList":[{					//wds 列表
			"mac": "",
			"connectStatus": "up/down"
		}]
	}

###goform/getTrafficStatus?radio=2.4G/5G
获取AP报文统计

	{
		"ssidList": [{				
			"ssid": "",				//SSID
			"rxTraffic": "",		//总接收流量
			"rxPacketNum": "",		//总接收数据包
			"txTraffic": "",		//总发送流量
			"txPacketNum": "",		//总发送流量包
		},{
			"ssid": "",
			"rxTraffic": "",
			"rxPacketNum": "",
			"txTraffic": "",
			"txPacketNum": "",
		}]
	
	}

###goform/getWrlClients?radio=2.4G/5G&ssidIndex=1

ssidIndex: 需要获取的ssid信息

获取无线客户端

	{
		"ssidList": ["ssid1","ssid2","ssid3"],		//ssid列表
		"osEnable": "0/1"					//开关
		"clients": [{								//客户端列表
			"index": "1",							//序号
			"mac": "",								//MAC地址
			"ip": "",								//IP地址
			"connectTime": "",						//连接时间
			"sendSpeed": "",						//发送速率
			"receiveSpeed": "",						//接收速率
			"osType": ""
		}]
	}

###goform/getWizardInfo 

获取快速设置信息

	{
		"wrlRadio":"2.4G",						//无线频段
		"wrlMode": "ap/wds/apclient/pppoe",		//无线模式
		"enableClientNum": "",					//启用SSID的最大客户端个数
		"modeInfo": {
			ssid:"",				
			secMode:"none/wep/wpapsk/wpa2psk/wpawpa2psk/wpa/wpa2",
			wepAuth:"open/shared/802.1x",
			wepDefaultKey:"1/2/3/4",
			wepKey1:"",
			wepKey2:"",
			wepKey3:"",
			wepKey4:"",
			radiusServerIp:"",
			radiusPort:"",
			radiusPwd:"",
			cipherType:"aes/tkip/aes+tkip",
			wifiPwd:"",
			upLinkMac:"",							//上级MAC地址
			uplinkNetWork:"",					//上级网络模式
			uplinkChannel:"",					//上级无线信道
			uplinkExtendChannel:"",				//上级扩展信道
			uplinkBandwidth:"",					//上级带宽
			pppoeUser: "",
			pppoePwd: "",
			pppoeMTU: ""
		}
	}

###goform/setWizardInfo 

提交快速设置信息

	"wrlRadio":"2.4G",
	"wrlMode": "ap/wds/apclient/pppoe",
	"enableClientNum": "",
	
	ssid:"",
	secMode:"none/wep/wpapsk/wpa2psk/wpawpa2psk/wpa/wpa2",
	wepAuth:"open/shared",
	wepDefaultKey:"1/2/3/4",
	wepKey1:"",
	wepKey2:"",
	wepKey3:"",
	wepKey4:"",
	radiusServerIp:"",
	radiusPort:"",
	radiusPwd:"",
	cipherType:"",
	wifiPwd:"",
	macAddr:"",
	uplinkNetWork:"",
	uplinkChannel:"",
	uplinkExtendChannel:"",
	uplinkBandwidth:""

###goform/getLanInfo
获取LAN口信息
	{
		"lanMode": "static/dhcp",		//IP地址类型
		"lanIp": "",					//LAN IP
		"lanMask": "",					//LAN MASK
		"lanGw": "",
		"lanMac": "",
		"lanDns1": "",
		"lanDns2": "",
		"apName": "",					//AP名称
		"ethMode": "auto/10M"			//端口能力
	}

###goform/setLanInfo
设置LAN口信息

	"lanMode": "static/dhcp",
	"lanIp": "",
	"lanMask": "",
	"lanGw": "",
	"lanDns1": "",
	"lanDns2": "",
	"apName": "",
	"ethMode": "auto/10M"

###goform/getDhcpInfo
获取dhcp信息

	{
		"lanIp": "",				//LAN IP
		"lanMask": "",				//LAN MASK
		"dhcpEn": "true/false",		//DHCP服务器开关
		"dhcpGw": "",				//DHCP网关
		"dhcpDns1": "",				//DHCP DNS1
		"dhcpDns2": "",
		"dhcpStartIp": "",			//地址池起始IP
		"dhcpEndIp": "",			//地址池结束IP
		"dhcpMask": "",				//dhcp子网掩码
		"dhcpLeaseTime": ""			//租约时间
	}

###goform/setDhcpInfo
设置dhcp信息

	"dhcpEn": "true/false",
	"dhcpGw": "",
	"dhcpDns1": "",
	"dhcpDns2": "",
	"dhcpStartIp": "",
	"dhcpEndIp": "",
	"dhcpMask": "",
	"dhcpLeaseTime": ""

###goform/getDhcpList

获取dhcp客户端列表  5s刷新

	{
		"dhcpList": [{
			"hostName": "",		//主机名
			"ip": "",			//IP地址
			"mac": "",			//MAC地址
			"leaseTime": ""		//租约时间
		},{
			"hostName": "",
			"ip": "",
			"mac": "",
			"leaseTime": ""
		}]
	}

###goform/getWrlBasicInfo?radio=2.4G/5G&ssidIndex=1

获取无线基本信息

	{
		"wrlMode": "ap/wds/apclient/pppoe",		//无线模式
		"ssidList": ["ssid1', "ssid2"],			//ssid列表
		"ssidEn": "true/false",					//ssid开关
		"broadcastSsidEn": "true/false",		//广播开关
		"apIsolationEn": "true/false",			//用户隔离
		"wmfEn": "true/false",					//组播转单播开关
		"probeEn": "true/false",				//探测广播报文回复抑制
		"maxClients": "",						//最大用户数量
		"otherEnableClients": "",				//其他开启ssid的客户端个数
		"ssid": "",								//SSID
		"ssidEncode": "gb2312/utf-8",			//ssid编码格式
		"secMode": "none/wep/wpapsk/wpa2psk/wpawpa2psk/wpa/wpa2",	//加密方式
		wepAuth:"open/shared",					//WEP加密类型
		wepDefaultKey:"1/2/3/4",				//WEP默认key
		wepKey1:"",		
		wepKey2:"",
		wepKey3:"",
		wepKey4:"",
		radiusServerIp:"",						//radius服务器IP
		radiusPort:"",							//radius端口
		radiusPwd:"",							//radius密码
		cipherType:"aes/tkip/aes+tkip",			//加密类型
		wifiPwd:"",								//无线密码
		keyPeriod: ""							//密钥更新周期
	}

###goform/setWrlBasicInfo
设置无线基本设置

	ssidIndex: "",
	radio: "2.4G/5G",
	"ssidEn": "true/false",
	"broadcastSsidEn": "true/false",
	"apIsolationEn": "true/false",
	"wmfEn": "true/false",
	"maxClients": "",
	"ssid": "",
	"ssidEncode": "gb2312/utf-8",
	"secMode": "none/wep/wpapsk/wpa2psk/wpawpa2psk/wpa/wpa2",
	wepAuth:"open/shared",
	wepDefaultKey:"1/2/3/4",
	wepKey1:"",
	wepKey2:"",
	wepKey3:"",
	wepKey4:"",
	radiusServerIp:"",
	radiusPort:"",
	radiusPwd:"",
	cipherType:"aes/tkip/aes+tkip",
	wifiPwd:"",
	keyPeriod: ""


###goform/getWrlRadioInfo?radio=2.4G/5G

获取无线射频信息

	{
		"wirelessEn": "",				//射频开关
		"country": "",					//国家
		"netMode": "",					//网络模式
		"channel": "",					//信道
		"bandwidth": "",				//带宽
		"extendChannel": "",			//扩展信道
		"channelLockEn": "true/false",	//锁定信道开关
		"ssidIsolationEn": "true/false",	//ssid隔离开关
		"wmmEn": "true/false",
		"apsdEn": "true/false",
		"txPower": "17",
		"setPower": "true/false",		//Power Lockout
		"Plcp": "0/1"					//Preamble
		"sgiTx": "0/1/-1",				//Short GI
		"ageTime": ""					//用户老化时间
		"txrxChain": "1/2", 			//Transmission Link,
		"txrxChainPort": "1/2",			//Antenna
	}

###goform/setWrlRadioInfo

提交无线射频数据

	"radio": "2.4G/5G",
	"wirelessEn": "",
	"country": "",
	"netMode": "",
	"channel": "",
	"bandwidth": "",
	"extendChannel": "",
	"channelLockEn": "true/false",
	"ssidIsolationEn": "true/false",
	"wmmEn": "true/false",
	"apsd": "true/false",
	"ageTime": ""

###goform/getWrlRadioUpInfo?radio=2.4G/5G

获取无线射频优化信息

	{
		"RSSI": "-90",				//RSSI
		"apsd": "0",				//APSD
		"atf": "1",					//空口调度
		"beacon": "100",			//Beacon间隔
		"deploy": "0",				//部署方式
		"dtim": "1",				//DTIM间隔
		"fragment": "2346",			//Fragment阀值
		"interference": "4",		//Interference模式
		"wlLed": "true/false",		//LEB开关
		"lockpower": "true/false",	//功率锁定
		"penetration": "1",			//穿墙能力
		"plcphdr": "1",				
		"power": "22"				//功率
		"prio_5": "",				//5GHZ优先
		"prio_5_value": ""			//5GHZ阀值
		"rts": "2437", 				//RTS门限
		"signalLevel": "0",			//信号接收能力
		"sta_timeout": "5",			//客户端老化时间
		"minPower": "",
		"maxPower": "",
		"defPower": "",
		"supportBG": "0,0,0,1,1,0,1,1,1,1,1,1",					//支持速率
		"supportBGforce": "1,1,1,0,0,1,0,0,0,0,0,0"				//强制速率
	}

###goform/setWrlRadioUpInfo

设置无线射频优化信息

	{
		"radio": "2.4G/5G"
		"RSSI": "-90",				//RSSI
		"apsd": "0",				//APSD
		"atf": "1",					//空口调度
		"beacon": "100",			//Beacon间隔
		"deploy": "0",				//部署方式
		"dtim": "1",				//DTIM间隔
		"fragment": "2346",			//Fragment阀值
		"interference": "4",		//Interference模式
		"wlLed": "true/false",		//LEB开关
		"lockpower": "true/false",	//功率锁定
		"penetration": "1",			//穿墙能力
		"plcphdr": "1",				
		"power": "22"				//功率
		"prio_5": "",				//5GHZ优先
		"prio_5_value": ""			//5GHZ阀值
		"rts": "2437", 				//RTS门限
		"signalLevel": "0",			//信号接收能力
		"sta_timeout": "5",			//客户端老化时间
		"minPower": "",
		"maxPower": "",
		"defPower": "",
		"supportBG": "0,0,0,1,1,0,1,1,1,1,1,1",					//支持速率
		"supportBGforce": "1,1,1,0,0,1,0,0,0,0,0,0"				//强制速率
	}

###goform/scanSsidInfo?radio=2.4G/5G
无线扫描

	{
		"scanList": [{	//扫描列表
			"ssid": "",	//ssid
			"mac": "",	
			"netMode": "",
			
			"bandwidth": "",
			"channel": "",
			"extChannel": "",
			"secMode": "",
			"signal": ""
		},{
			"ssid": "",
			"mac": "",
			"netMode": "",
			"channel": "",
			"bandwidth": "",
			"secMode": "",
			"signal": ""
		}]
	}

###goform/wifiWDS?radio=2.4G/5G
非法AP检查（按原有接口返回）

###goform/getWrlWmmInfo?radio=2.4G/5G

	{
		"wmmEn": "true/false",
		"wmmMode": "throughput/capacity/custom", //一般用户场景/密集用户场景/自定义
		"noAckEn": "true/false",
		"wmmConfig": {
			"BE": "1 2 33 45",
			"BK": "12 33 44 55",
			"VI": "22 33 12 34",
			"VO": "33 21 12 32" 
		},
		"wmmStaConfig": {
			"STABE": "1 2 33 45",
			"STABK": "12 33 44 55",
			"STAVI": "22 33 12 34",
			"STAVO": "33 21 12 32" 
		}
	}

######goform/setWrlWmmInfo?radio=2.4G/5G

	wrlRadio: "2.4G/5G",
	wmmEn: "true/false",
	wmmMode:"",
	noAckEn: "",
	BE: 1 3 6 128 0,
	BK: 1 5 8 102 0,
	VI: 7 15 1 6016 3008,
	VO: 3 7 1 3264 1504,
	STABE: 2 5 8 100 0,
	STABK: 15 1023 7 0 0,
	STAVI: 7 15 2 6016 3008,
	STAVO: 3 7 2 3264 1504

###goform/getWrlBroadInfo

获取新无线高级设置信息（广播页面）

	{
		"broadcastEn":"",					
		"filterMode": "",				
		"oltEn": ""					
	}

###goform/setWrlBroadInfo

设置新无线高级设置信息（广播页面）

	{
		"broadcastEn":"",				
		"filterMode": "",				
		"oltEn": ""						
	}

###goform/getWrlAdvancedInfo?radio=2.4G/5G

获取无线高级设置信息

	{
		"beacon":"",					//beacon
		"fragment": "",					//fraggetTrafficStatusment
		"rts": "",						//rts门限
		"dtim": "",						//dtim
		"RSSI": "",			//接入信号强度限制
		"txPower": "",					//TX功率
		"interference": "",				//
		"signalLevel": "",
		"powerLockEn": "true/false",	//锁定功率开关
		"wrlLed": "",					//无线LED开关
		"preamble": "long/short"		//无线前导码  长导码/短导码
		"penetration": ""				//
		"deploy": "",
		"minPower": "",
		"maxPower": "",
		"defPower": "",
		"atfEn": "true/false"
	}

###goform/setWrlAdvancedInfo

提交无线高级设置数据

	"radio": "2.4G/5G",
	"beacon":"",
	"fragment": "",
	"rst": "",
	"dtim": "",
	"RSSI": "",
	"txPower": "",
	"powerLockEn": "true/false",
	"preamble": "long/short"

###宏控制增加
	
	CONFIG_TRANSMISSION  //是否支持穿墙能力
	CONFIG_DEPLOY		 //是否支持部署模式
	CONFIG_INTERFACE	 //是否支持干扰抑制模式
	CONFIG_TRANSMISSION_LEVEL	 //是否支持信号接收能力

###goform/getWrlAccessList?radio=2.4G/5G&ssidIndex=1 

ssidIndex表示获取第几个ssid的数据

获取无线访问控制信息

 	{
		"ssidList": ["ssid1", "ssid2"],    		//ssid列表
		"filterMode": "disabled/allow/deny",	//当前ssid的MAC过滤模式
		"wrlClientList": [{						//当前SSID的无线客户端
			"mac": "",							//MAC地址
			"ip": "",							//IP地址
			"connectTime": ""					//连接时间
		}],
		"macList": [{  //添加的MAC地址列表
			"mac": "",
			"enable": "true/false"
		}]
	}

###goform/setWrlAccessList

提交数据

	ssidIndex: "",
	radio: "",
	"filterMode": "",
	"macList": mac;true \n mac;false  //mac \r enable

###goform/getWrlQvlanInfo

获取Qvlan信息

	{
		"qvlanEn": "true/false",  	//Qvlan开关
		"wrlMode": "ap/apclient/wds/pppoe",
		"wrlMode5G": "ap/apclient/wds/pppoe", //5G工作模式
		"pvid": "",					//PVID
		"manageVlan": "",			//管理VLAN
		"trunkPort": "1;0",	//Trunk类型
		"wiredLanPort": [{			//有线LAN口
			"portName": "LAN0",		//LAN名称
			
			"vlanId": ""			//LAN口 VLAN
		},{
			"portName": "LAN1",
			
			"vlanId": ""
		}],
		"ssidQvlan": [{				//无线VLAN 没有时数组为[]
			"ssid": "xxxx",			//ssid
			"vlanId": "1",			//vlan id
			"ssidEn": "true"
		},{
			"ssid": "xxxx",
			"vlanId": "1",
			"ssidEn": "false"
		}],
		"ssidQvlan5G": [{				//无线VLAN 没有时数组为[]
			"ssid": "xxxx",			//ssid
			"vlanId": "1",			//vlan id
			"ssidEn": "false"
		},{
			"ssid": "xxxx",
			"vlanId": "1",
			"ssidEn": "true"
		}]
	}

###goform/setWrlQvlanInfo?radio=2.4G/5G
提交Qvlan数据

	//"radio": "2.4G/5G",
	"qvlanEn": "true/false",
	"pvid": "",
	"manageVlan": "",
	"trunkPort": "1;1",
	"wiredLanPort": "vlan1 \t vlan2",
	"ssidQvlan": "ssidvlan1 \t ssidvlan2 \t",
	"ssidQvlan5G": ""ssidvlan1 \t ssidvlan2 \t"


###goform/getSnmpInfo

	{
		"snmpEn": "true/false",	//snmp开关
		"snmpAdmin": "",		//snmp管理员名称
		"deviceName": "",		//设备名称
		"location": "",			//位置
		"readCommunity": "",	//读community
		"readWriteCommunity": ""	//读写community
	}

###goform/setSnmpInfo

获取SNMP信息

	"snmpEn": "true/false",		//snmp开关
	"snmpAdmin": "",			//snmp管理员名称
	"deviceName": "",			//设备名称
	"location": "",				//位置
	"readCommunity": "",		//读community
	"readWriteCommunity": ""	//读写community

###goform/getDeployInfo

获取部署模式信息

	{
		"deployType": "local/yun",		//部署类型 本地、云端
		"apDeviceName": "",				//AP设备名称
		"yunAcIp": "",					//AC控制器地址
		"yunAcManagePort": "",			//云端AC管理端口
		"yunAcUpgradePort": ""			//云端AC升级端口
	}

###goform/setDeployInfo

	"deployType": "local/yun",
	"apDeviceName": "",
	"yunAcIp": "",
	"yunAcManagePort": "",
	"yunAcUpgradePort": ""

###goform/getSysTimeInfo

获取系统时间设置信息

	{
		"checkTimeEn": "true/false",	//是否启用网络校时
		"checkTimeInterval": "",		//校时周期
		"timeZone": "",					//时区
		"systemTime": ""				//系统时间
	}

###goform/setSysTimeInfo

	"checkTimeEn": "true/false",
	"chexkTimeInterval": "",
	"timeZone": "",
	"systemTime": ""

###goform/getWebTimeout

获取超时时间

	"timeoutTime": ""

###goform/setWebTimeout

设置超时时间

	"timeoutTime": ""

###goform/getSysLogInfo?syslogType=all/system

获取系统日志

	{
		"maxLogNum": "150",	//最大日志数量
		"sysLogList": [{  //日志列表
			"index": "",	//序号
			"time": "",		//时间
			"type": "",		//日志类型
			"log": ""		//日志信息
		},{
			"index": "",
			"time": "",
			"type": "",
			"log": ""
		}]
	}

###goform/clearSysLog

清除系统日志

###goform/getSysSetting

获取日志设定信息

	{
		"syslogNum": "",  //日志条数
		"sysRuleEn": "true/false",	//是否启用规则
		"lanIp": "xxx",
		"logRuleList": [{	//规则列表
			"index": "",
			"logIp": "",
			"logPort": "",
			"enable": "true/false"
		}]
	}

###goform/setSysSetting

保存日志设定信息
	
	"syslogNum": "",  			//日志条数
	"sysRuleEn": "true/false",	//是否启用规则


###goform/setSysLogRule

添加系统日志配置
	
	"action": "modify/add/del",
	"index": "0/1/2/3", //  编辑时修改第几条数据
	"logIp": "",  	//IP地址
	"logPort": "",	//端口
	"enable": "true/false" //是否启用

###goform/getSysPwd

获取用户名信息

	{
		"adminName": "",
		"userName": "" //为空表示没有普通用户
	}

###goform/setSysPwd
	
设置用户名和密码

	action: add/del			//新增还是删除
	userType: admin/user	//修改的用户类型
	oldUser:				//旧用户名
	oldPwd:					//旧密码
	newUser:user			//新用户名
	newPwd:admin			//新密码

###goform/getDiagnoseInfo

获取ping诊断内容

	{
		"msg": "xxx \n xxx \n"
	}

###goform/setDiagnoseInfo
	"cmd": "ping 192.168.0.3"

###goform/getManualReboot
自动重启设置

	{
		"manualRebootEn": "true/false",  //自动重启开关
		"rebootType": "interval/timing",	//重启类型
		"intervalTime": "",					//间隔时间
		"rebootTime": "",					//重启时间
		"rebootDate": "1001011"				//重启日期 1表示选中 周一到周日
	}

###goform/setManualReboot

获取自动重启数据

	"manualRebootEn": "true/false",  //自动重启开关
	"rebootType": "interval/timing",	//重启类型
	"intervalTime": "",					//间隔时间
	"rebootTime": "",					//重启时间
	"rebootDate": "1001011"				//重启日期 1表示选中 周一到周日

###goform/getLedInfo
	
获取当前LED状态

	{
		"ledType": "open/close"
	}

###goform/setLedInfo
	
提交数据： 

	action=open/close //开启还是关闭动作

###goform/getUplinkInfo
	
获取上行链路数据

	{
		"upLinkEn": "true/false", //上行链路检测开关
		"pingHostIp1": "",		//主机1 IP地址
		"pingHostIp2": "",		//主机2 IP地址
		"pingInterval": ""		//ping间隔时间
	}
S
###goform/setUplinkInfo

	"upLinkEn": "true/false",
	"pingHostIp1": "",
	"pingHostIp2": "",
	"pingInterval": ""

###goform/getLanIpInfo
获取direct_reboot.asp页面参数
	{
		"lanIp": "192.168.0.1", //lanip
		"sslEnable": "true/false",		//webiplansslen
		"webIpEn": "true/false",		//webipen
		"webPort": "8801"		//webport
	}
###goform/getLoginInfo
获取login.asp页面参数
	{
		"username": "admin", 
		"baseUsername": "user",		
		"apName": "I21"
	}

###goform/getWebAppFilterRules
获取应用过滤页面参数
	{
		"appData":"2,7,8,9;false;false;true"  （原有接口没变）
	}
###goform/setWebAppFilterRules
设置应用过滤页面参数
	{
		"appData":"2,7,8,9;false;false;true"  （原有接口没变）
	}

###goform/getQosInfo
获取流量控制页面参数
	{
		"qosmode":"",		//流控模式
		"overAllBand":"",  	//overAllBand
		"list":""  			//ssid
	}
###goform/setQos
设置流控页面参数
	{
		"ssid":""，				//设置的SSID
		"ssidIndex":""，			//SSID索引
		"qosmode":"0/1/2"，		//流控模式
		"ssid_uprate":""，		//上传速度
		"ssid_downrate":""，		//下载速度
		"guest_uprate":""，		//用户上传速度		
		"guest_downrate":""，	//用户下载速度
		"overAllBand":""		//总带宽
	}

###goform/getFilterEn
获取网站过滤开关
	{
		"urlEnable":"0/1"				//网站过滤开关

	}


###goform/getUrlGroupMenu
获取网站过滤分组(原有接口)
	{
		"urlGroupMenu": [{ 
			"urlGroupId": "1",	//id
			"urlGroupName": "购物",		//name	
			"urlGroupRefer": "0"
		},{ 
			"urlGroupId": "2",	//id
			"urlGroupName": "视频",		//name	
			"urlGroupRefer": "0"
		}]
	}

###goform/editUrlFilterRules
编辑网站过滤分组(原有接口)
	{
		"groupIndex": "2",
		"urlEnable": "true"
	}


###goform/addUrlGroup
添加网站过滤分组(原有接口)
	{
		"urlGroupName": "旅行"
	}

###goform/delUrlGroup
删除网站过滤分组(原有接口)
	{
		"urlGroupName": "旅行"
	}

###goform/delUserUrl
删除网站过滤网址(原有接口)
	{
		"urlGroupName": "购物"，
		"urlIndex": "10"
	}

###goform/setUrlFilterStatus
保存网站过滤状态(原有接口)
	{
		"urlEnable": "true/false"
	}

###goform/getUrlFilterRules
获取网站过滤规则(原有接口)



###goform/getUrls
获取网站过滤网站(原有接口)
	{
		[{ 
			"urlRemark": "淘宝网",	
			"urlString": "www.taobao.com"		

		},{ 
			"urlRemark": "亚马逊",	
			"urlString": "www.amazon.com"		

		}]
	}

###goform/addUserUrl
添加网站过滤网站(原有接口)
	{
		"urlGroupName": "购物"，
		"urlIndex": "10"，
	}


###goform/getRate?radio=2.4G/5G
获取频谱分析参数
	{
		"country": ""，
		"band": ""，
	}