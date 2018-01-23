var template = {
    getViewPortHeight: function() {
        return $("#slideH").height();
    },

    resizeSection: function() {
        //$('section').css('height', template.getViewPortHeight());
    },

    throttle: function(func, context) {
        if (!func) return;
        clearTimeout(func.tId);
        func.tId = setTimeout(function() {
            func.call(context);
        }, 300);
    },

    initEvent: function() {
        $('#goAuth').on('click', function(e) {
            $('#mainBody').css('top', 0);
            setTimeout(function() {
              $('#mainBody').css('top', -template.getViewPortHeight());
            }, 100);
            e.preventDefault();
        });
        $('#back').on('click', function(e) {
            $('#mainBody').css('top', 0);
            e.preventDefault();
        });
    },

    rePaintPicList: function() {
        window.location.reload();
    },

    setSliderContainerHeight: function() {
        setTimeout(function() {
            if ($(window).width() > 767) {
                $('#slider').css('height', $('#slider img').height() + 30);
            }
            else {
                $('#slider').css('height', $('#slider img').height());
            }
            slider.containerHeight = $('#slider img').height();

            if ($('.goBtn')[0].getBoundingClientRect().bottom + 30 > $(window).height()) {
                $('.goBtn').hide();
                $('#mainBody').css('position', 'absolute');
            }

        }, 100);

    }
};


window.onload = function() {
    var slider = new Slider(),
        children = $("#auth").children(),
        otherChildren = $("#authType1").children(),
        picCount, picCountLen, spanArr, spanArrLen, text;

    slider.init();
    slider.setLength($('#slider .play-item').length);
    //title
    picCount = $("#slider").children().eq(1).children();
    spanArr = picCount.children();
    spanArrLen = spanArr.length;
    picCountLen = picCount.length;
    if(picCountLen == 2) {
        picCount.css("width","50%");
    } else if(picCountLen == 3) {
        picCount.css("width","33.3%");
    } if(picCountLen == 4) {
        picCount.css("width","25%");
    } 
    for(var i = 0; i < spanArrLen; i++) {
        text = spanArr.eq(i).text();
        spanArr.eq(i).attr('title', text);
    }

    if (slider.imgListLength <= 0) {
        $('#slider').parent().html("Image load failure!").css({
            'text-align': 'center',
            'height': '80px'
        });
    }

    $('#slider img').on('error', function() {
        $(this).parent().parent().remove();
        slider.setLength(slider.imgListLength - 1);
        if (slider.imgListLength <= 0) {
            $('#slider').parent().html("Failed to load slide  images!").css({
                'text-align': 'center',
                'height': '80px'
            });
        }
    });

    template.initEvent();

	setTimeout(function() {
		template.resizeSection();
		template.setSliderContainerHeight();
    
		webAuth.init();
	});

    //根据选择的验证方式改变页面显示
    if(children.length == 3) {  
        children.eq(0).removeClass('input-box col-md-offset-1 col-md-offset-2');
        children.eq(0).addClass('col-lg-offset-4 col-lg-4 col-md-offset-4');
    }

    if(otherChildren.length == 1) {
        $("#otherAuth").addClass('other-padding');
    }

    if($("#loginSubmit").length == 0 && $("#accessSubmit").length == 0) {
        $("#otherAuth").addClass('other-auth-only');
    }
    //
    $("#slider a").removeAttr('href','#');
    $("#guide-list a").removeAttr('href','#');

    window.slider = slider;
};
