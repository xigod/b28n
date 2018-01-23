<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>behavior | appFilter</title>
    <link rel="stylesheet" href="./public/style.css?version=4112" />
    <script src="./lang/b28n.js?version=4112"></script>
    <script src="./public/gozila.js?version=4112"></script>
    <script src="./public/menu.js?version=4112"></script>
    <script src="./public/j.js?version=4112"></script>
    <script src="./public/common.js?version=4112"></script>
</head>

<body id="appFiterCtr">
    <div class="divbody">
        <div id="head"></div>
        <div class="w900">
            <form>
                <div class="control-group">
                    <label class="control-label">App Filter</label>
                    <div class="controls">
                        <input type="radio" name="appEnable" value="0">
                        Disable
                        <input type="radio" name="appEnable" value="1">
                        Enable</div>
                </div>
                <div id="appEnableShow">
                    <div class="control-group none">
                        <label class="control-label">P2P Filter</label>
                        <div class="controls">
                            <input type="radio" name="P2PFilter" value="0">
                            Disable
                            <input type="radio" name="P2PFilter" value="1">
                            Enable</div>
                    </div>
                    <table class="myTable">
                        <tr id="appNodes">
                            <td>IM Filter</td>
                            <td>
                                <label>
                                    <input type="checkbox" value="1">Microblog</label>
                                <label class="ml20">
                                    <input type="checkbox" value="2">Wechat</label>
                                <label class="ml20">
                                    <input type="checkbox" value="3">QQ</label>
                                <label class="ml28 none">
                                    <input type="checkbox" value="4">Twitter</label>
                                <label class="ml20 none">
                                    <input type="checkbox" value="5">Facebook</label>
<!--                                 <label class="ml40">
                                    <input type="checkbox" class="selectAll">全选</label> -->
                            </td>
                        </tr>
                    </table>
                    <table class="myTable" id="radioNodes">
                        <tr>
                            <td>Video Filter</td>
                            <td>
                                <label>
                                    <input type="checkbox" value="6">Youku</label>
                                <label class="ml44">
                                    <input type="checkbox" value="7">Tudou</label>
                                <label class="ml20">
                                    <input type="checkbox" value="8">Tencent</label>
                                <label class="ml20">
                                    <input type="checkbox" value="9">Thunder</label>
                                <label class="ml33">
                                    <input type="checkbox" value="10">iQIYI</label>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <label>
                                    <input type="checkbox" value="11">Letv</label>
                                <label class="ml44 none">
                                    <input type="checkbox" value="12">Hulu</label>
                                <label class="ml20 none">
                                    <input type="checkbox" value="13">HBO</label>
                                <label class="ml20 none">
                                    <input type="checkbox" value="14">Netflix</label>
                                <label class="ml23 none">
                                    <input type="checkbox" value="15">Youtube</label>
<!--                                 <label class="ml46">
                                    <input type="checkbox" class="selectAll">全选</label> -->
                            </td>
                        </tr>
                    </table>
                </div>
            </form>
            <div class="fl w80 ml10">
                <br>
                <input type="button" class="button" value="Save" id="appCtrSave">
                <br>
                <br>
                <input type="reset" class="button" value="Restore" onClick="window.location.reload()">
                <br>
                <br>
                <input type="button" class="button" value="Help" name="help" onclick="doHelp('qos_app')">
            </div>
        </div>
    </div>
    <script src="./js/appFilter.js?version=4112"></script>
</body>

</html>
