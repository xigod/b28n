var f = document.forms[0],
    DFSAuth = ["0","0"];

function init(data) {
    $("#wlChannelScan").on("click", function(){
        // $("#conMsg5").show();
        var type = "5";
      wlChannelScan(data.country, type, data.band);
    });
}


function getValue() {
    $.GetSetData.getJson("goform/getRate?radio=" + top.RADIO, init);
}

window.onload = function() {
    $("#head").html(tbl_head(35));
    top.RADIO = "5G";
    $(".conMsg").hide();
    getValue();
}