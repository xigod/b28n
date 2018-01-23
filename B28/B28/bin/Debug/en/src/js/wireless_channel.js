var f = document.forms[0];
$(function() {
    $("#head").html(tbl_head(35));

    $("#wlScan").on("click", channelScan);
});
