<!DOCTYPE html>
<html style="display:none;"><head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Qos Control</title>
    <link rel="stylesheet" href="./public/style.css?version=4112">
    <script src="./public/j.js?version=4112"></script>
    <script src="./lang/b28n.js?version=4112"></script>
    <script src="./public/gozila.js?version=4112"></script>
    <script src="./public/menu.js?version=4112"></script>
</head>

<body id="netCtr">
    <div class="divbody">
        <div id="head"></div>
        <div class="w750">
            <form name="frmSetup" method="post" style="width:660px;" action="/goform/setQos">
                <input type="hidden" name="GO" value="qos_control.asp">
                <input type="hidden" id="selectedSSID" name="ssid" value="">
                <input type="hidden" id="selectedSSIDIndex" name="ssidIndex" value="">
                <div class="myTable mt20">
                <div class="control-group" id="netCtrRadioList">
                    <label class="control-label">Traffic Control</label>
                    <div class="controls">
                        <input type="radio" name="qosmode" value="0">Disable (Default)<input type="radio" name="qosmode" value="2">Manual<input type="radio" name="qosmode" value="1">Automatic</div>
                </div>
                <div id="intCtrContent">
                    <div class="control-group">
                        <label class="control-label">Total AP Bandwidth</label>
                        <div class="controls">
                            <input type="text" id="apWidth" name="overAllBand" maxlength="32" value=""><span class="text-help">Mbps (Range: 0.1 to 100)</span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">Select SSID</label>
                        <div class="controls">
                            <select id="intCtrSSIDList">
                            </select>
                        </div>
                    </div>
                    <div class="control-group">
                        <label id="intCtrSSID" class="control-label"></label>

                        <div class="controls">Max. Upload Rate<input type="text" class="input-mini" id="intUpWidth" name="ssid_uprate" maxlength="32" value=""><span class="text-help">Mbps (Range: 0.1 to 100)</span>
                        </div>

                    </div>
                    <div class="control-group">
                        <label class="control-label"></label>
                        <div class="controls">Max. Download Rate<input type="text" class="input-mini" id="intDownWidth" name="ssid_downrate" maxlength="32" value=""><span class="text-help">Mbps (Range: 0.1 to 100)</span>
                        </div>
                    </div>

                    <table class="w640 tc ml20" border="1" id="intCtrTab">
                        <tbody><tr class="a3">
                            <td>SSID</td>
                            <td>Max. Upload Rate</td>
                            <td>Max. Download Rate</td>
                        </tr>
                        </tbody><tbody id="intCtrTabContent"></tbody>
                    </table>
                </div>
                <div id="userCtrContent">
                    <div class="control-group">
                        <label class="control-label">Select SSID</label>
                        <div class="controls">
                            <select id="userCtrSSIDList">
                                </select>
                        </div>
                    </div>
                    <div class="control-group">
                        <label id="userCtrSSID" class="control-label"></label>
                        <div class="controls">Max. Upload Rate<input type="text" class="input-mini" id="userUpWidth" name="ssid_uprate" maxlength="32" value=""><span class="text-help">Mbps (Range: 0.1 to 100)</span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"></label>
                        <div class="controls">Max. Download Rate<input type="text" class="input-mini" id="userDownWidth" name="ssid_downrate" maxlength="32" value=""><span class="text-help">Mbps (Range: 0.1 to 100)</span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">User Rate</label>
                        <div class="controls">Max. Upload Rate<input type="text" class="input-mini" id="userSelfUpWidth" name="guest_uprate" maxlength="32" value=""><span class="text-help">Mbps (Range: 0.1 to 100)</span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label id="userCtrSSID" class="control-label"></label>
                        <div class="controls">Max. Download Rate<input type="text" class="input-mini" id="userSelfDownWidth" name="guest_downrate" maxlength="32" value=""><span class="text-help">Mbps (Range: 0.1 to 100)</span>
                        </div>
                    </div>

                    <table class="w640 tc ml20 table-td" border="1" id="userCtrTab">
                        <tbody><tr class="a3">
                            <td>SSID</td>
                            <td>Max. Upload Rate</td>
                            <td>Max. Download Rate</td>
                            <td>User Upload Rate</td>
                            <td>User Download Rate</td>
                        </tr>
                        </tbody><tbody id="userCtrTabContent"></tbody>
                    </table>
                </div>
                </div>
            </form>
            <div class="fl w80 ml10">
                <br>
                <input type="button" class="button" value="Save" id="netCtrSave">
                <br>
                <br>
                <input type="reset" class="button" value="Restore" id="netCtrCancel" onclick="window.location.reload()">
                <br>
                <br>
                <input type="button" class="button" value="Help" name="help" onclick="doHelp('qos_qos')">
            </div>
        </div>
    </div>
    <script src="./js/qos_control.js?version=4112"></script>
    <script src="./public/common.js?version=4112"></script>



</body></html>