<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>behavior | broadcast</title>
    <link rel="stylesheet" href="./public/style.css?version=4112" />
    <script src="./lang/b28n.js?version=4112"></script>
    <script src="./public/gozila.js?version=4112"></script>
    <script src="./public/menu.js?version=4112"></script>
    <script src="./public/j.js?version=4112"></script>
    <script>
    var broadcastEn = "<%getSysStatus("castFilterEn","Enable");%>";  // 0 1   表示开启或关闭
    var filterMode = "<%getSysStatus("castFilterEn","Mode");%>";  //1 2 3   表示三种模式
    </script>
</head>

<body>
    <div class="divbody">
        <div id="head"></div>
        <div class="w750">
            <form name="frmSetup" method="post" action="/goform/setBDCTRules">
                <input type="hidden" name="GO" value="broadcast.asp" />
                <div>
                    <table class="myTable mt20">
                            <tr>
                                <td>Broadcast/Multicast Control</td>
                                <td>
                                    <label class="pr20">
                                        <input type="radio" name="broadcastEn" value="0">Disable
                                    </label>
                                    <label class="pr20">
                                        <input type="radio" name="broadcastEn" value="1">Enable
                                    </label>
                                </td>
                            </tr>
                    </table>
                    <table class="myTable" id="modeTable">
                        <tr>
                            <td>Mode Option</td>
                            <td>
                                <select name="filterMode">
                                    <option value="1">All Filtered</option>
                                    <option value="2">Partially Filtered (excluding DHCP and ARP)</option>
                                    <option value="3">Partially Filtered (excluding ARP)</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
            </form>
            <div class="fl w80 ml10">
                <br>
                <input type="button" class="button" value="Save" id="bdctCtrSave">
                <br>
                <br>
                <input type="reset" class="button" value="Restore" ia="netCtrCancel" onClick="window.location.reload()">
                <br>
                <br>
                <input type="button" class="button" value="Help" name="help" onclick="doHelp('wl_wizard')">
            </div>
        </div>
    </div>
    <script src="./js/broadcast.js?version=4112"></script>
    <script src="./public/common.js?version=4112"></script>
</body>

</html>
