var f = document.forms[0],
    DFSAuth = ["0","0"];

function init(data) {
    $("#wlChannelScan").on("click", function() {
        // $("#conMsg").show();
        var type = "2";
        wlChannelScan(data.country, type);
    });
}


function getValue() {
    $.GetSetData.getJson("goform/getRate?radio=" + top.RADIO, init);
}

window.onload = function() {
    $("#head").html(tbl_head(35));
    $(".conMsg").hide();
    getValue();
}
