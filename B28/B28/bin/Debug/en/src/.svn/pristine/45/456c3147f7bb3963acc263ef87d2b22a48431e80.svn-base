(function() {
    var slider = new Slider({
            speed: 5000,
            length: $('#slider .play-item').length
        }).init();

    if (slider.imgListLength <= 0) {
        $('#slider').parent().html('Image load failure!').css({
            'text-align': 'center',
            'height': '80px'
        });
    }

    $('.switch input').on('click', function() {
        if (this.checked) slider.setSpeed(5000);
        else slider.setSpeed(0);
    });
    if ($('#guide-list a').length < 1) {
        $('#guide-list').hide();
        $('#mainBody').css('paddingTop', '60px');
    }
    $('#slider img').on('error', function() {
        $(this).parent().parent().remove();
        slider.setLength(slider.imgListLength - 1);
        if (slider.imgListLength <= 0) {
            $('#slider').parent().html('Failed to load slide images!').css({
                'text-align': 'center',
                'height': '80px'
            });
        }
    });
    webAuth.init();

    //根据选择的验证方式改变页面显示
    if($("#loginSubmit").length == 0) {
        $("#accessCodeForm").addClass('access-form');
    }
    //
    $("#slider a").removeAttr('href','#');
    $("#guide-list a").removeAttr('href','#');
    
    window.slider = slider;
}());
