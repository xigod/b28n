<!DOCTYPE html>
<html style="display:none;">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Wireless | wmm</title>
    <link rel="stylesheet" href="./public/style.css?version=4112" />
    <script src="./lang/b28n.js?version=4112"></script>
</head>

<body id="wmm">
    <div class="divbody">
        <div id="head"></div>
        <div class="w750">
            <form class="2g">
                <input name="wrlRadio" type="hidden" value="5G" />
                <input name="BE" type="hidden" value="" />
                <input name="BK" type="hidden" value="" />
                <input name="VI" type="hidden" value="" />
                <input name="VO" type="hidden" value="" />
                <input name="STABE" type="hidden" value="" />
                <input name="STABK" type="hidden" value="" />
                <input name="STAVI" type="hidden" value="" />
                <input name="STAVO" type="hidden" value="" />
                <div class="myTable mt20">
                    <div class="control-group">
                        <label class="control-label">WMM</label>
                        <div class="controls">
                            <input type="radio" name="wmmEn" value="false">
                            Disable
                            <input type="radio" name="wmmEn" value="true" style="margin-left:10px;">Enable</div>
                    </div>
                </div>
                <div id="wmmContent">
                    <div class="myTable">
                        <div class="control-group">
                            <label class="control-label">WMM Optimization Mode</label>
                            <div class="controls">
                                <input type="radio" name="wmmMode" value="throughput">Optimized For Throughput (Concurrent Users &lt;=10)</div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"></label>
                            <div class="controls">
                                <input type="radio" name="wmmMode" value="capacity" checked>Optimized For Capacity (Concurrent Users &gt;=10)</div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"></label>
                            <div class="controls">
                                <input type="radio" name="wmmMode" value="custom">Custom</div>
                        </div>
                    </div>
                    <div id="wmmMode3">
                        <div class="myTable">
                            <div class="control-group">
                                <label class="control-label">No ACK</label>
                                <div class="controls">
                                    <input type="checkbox" value="" name="noAckEn"></div>
                            </div>
                            <div class="control-group">
                                <label class="control-label">EDCA AP Parameters</label>
                                <div class="controls"></div>
                            </div>
                        </div>
                        <!-- <span style="padding-left: 88px;">EDCA AP Parameters</span>
                    -->
                    <table class="w640 tc ml20 mb10 table-td" border="1" id="wmmApTab">
                        <tr class="a3">
                            <th></th>
                            <th>CWmin</th>
                            <th>CWmax</th>
                            <th>AIFSN</th>
                            <th class="none">TXOP Limit</th>
                            <th>TXOP Limit</th>
                        </tr>
                        <tbody id="apwmm"></tbody>
                    </table>
                    <div class="myTable">
                        <div class="control-group">
                            <label class="control-label">EDCA STA Parameters</label>
                            <div class="controls"></div>
                        </div>
                    </div>
                    <!-- <span style="padding-left: 80px;">EDCA STA Parameters</span>
                -->
                <table class="w640 tc ml20 table-td" border="1" id="wmmUserTab">
                    <tr class="a3">
                        <th></th>
                        <th>CWmin</th>
                        <th>CWmax</th>
                        <th>AIFSN</th>
                        <th class="none">TXOP Limit</th>
                        <th>TXOP Limit</th>
                    </tr>
                    <tbody id="userwmm"></tbody>
                </table>
            </div>
        </div>
    </form>
    <div class="fl w80 ml10">
        <br>
        <input type="button" class="button" value="Save" id="wmmCtrSave">
        <br>
        <br>
        <input type="reset" class="button" value="Restore" id="wmmCtrCancel" onClick="window.location.reload()">
        <br>
        <br>
        <input type="button" class="button" value="Help" name="help" onclick="doHelp('wl_wmm')"></div>
</div>
</div>
<script src="./public/j.js?version=4112"></script>
<script src="./public/gozila.js?version=4112"></script>
<script src="./public/menu.js?version=4112"></script>
<script src="./js/wmmSetting.js?version=4112"></script>
</body>

</html>
