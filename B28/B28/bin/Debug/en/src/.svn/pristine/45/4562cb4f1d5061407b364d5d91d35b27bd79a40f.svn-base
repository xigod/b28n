var f = document.forms[0];

function getValue() {
    $.GetSetData.getJson("goform/getWrlBroadInfo", initHTML);
}

function initHTML(data){
    inputValue(data);
    if(data.filterMode == '1') {
        $("#filterMode").val('2');
    }
    changeMode(data.broadcastEn);
}

function initEvent(){
    $("[name=broadcastEn]").on('click',function(){
        var mode = $(this).val();
        changeMode(mode);
    });
    
    $("#bdctCtrSave").on("click", function() {
        if(permission()){
            submitData("goform/setWrlBroadInfo");
        }
    });    
}

function changeMode(mode){
    if(mode == "false"){
        f.broadcastEn[0].checked = true;
        $("#modeTable").hide();
    }else{
        f.broadcastEn[1].checked = true;
        $("#modeTable").show();
    }
}

(function() {
   $("#head").html(tbl_head(36));
   getValue();
   initEvent();
})();
