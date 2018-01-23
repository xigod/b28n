var timeOut = function() {
        var leftTime = 10,
            auth = $('#auth'),
            waitting = $('#waitting i');

        function count() {
            setTimeout(function() {
                waitting.text(--leftTime);
                if (leftTime < 0) {
                    auth.removeClass('none');
                    waitting.parent().addClass('none');
                } else {
                    count();
                }
            }, 1000);
        }
        count();
    };


    (function($, window, document) {
        var redFlag = 0;

        $(function() {
            var slider = new Slider({
                length: $('#slider .play-item').length
            }).init(),
            oneKeyUrl = '/goform/apPortalOneKeyAuth',
            tmpAuthUrl = '/goform/apPortalSetTmpAuth';
            $('.nav-bar-filter').addClass('show');
            timeOut();
            var img = $('#slider img');
            if (img.length > 0) {
                $('#slider').removeClass('hidden');
                var itemHeight = !!$('.play-item.active img').length ? $('.play-item.active img')[0].getBoundingClientRect().bottom : $('.play-item img')[0].getBoundingClientRect().bottom;
                var height = $(window).height() - itemHeight;
                /*if (height > 0)
                    $('.slide-position')[0].style.bottom = 25 + height + 'px';*/
            }
            window.slider = slider;
            $('#auth a').on('click', function(e) {
                e.preventDefault();

                if(redFlag === 0 && top.document.body.scrollWidth > 720) {
                    var iframe = document.getElementsByTagName('iframe')[0];
                    
                    redFlag += 1;
                    iframe.src = "";
                    
                    //document.getElementById('container').style.display = '';
                    top.document.getElementById('container').style.display = 'none';
                    top.document.getElementById('container2').style.display = '';
                    if (!$('#navbar li').length) {
                        $('.nav-bar-filter').remove();
                    }

                    top.$('#auth a')[0].click();
                }



                var url = window.location.href,
                    len = "data=".length,
                    newUrl = "http://",
                    newUrlPos, url_re, info, infoArr;

                infoArr = url.split('/');
                for(var i = 0; i < infoArr.length; i++) {
                    if(infoArr[i].indexOf('html') != -1) {
                        info = infoArr[i];
                    }
                }
                if($("#redirect").html().replace(/\s/g,'') == "http://") {
                    newUrlPos = url.indexOf('data=') + len;
                    newUrl += url.slice(newUrlPos);
                    url_re = newUrl;
                } else {
                    url_re = $("#redirect").html();
                }

                $("#url").val(url_re);
                $("#oneKeyInfo").val(info);
                $("#loginForm").submit();
            });
            $('.play-item img').on('click', function(e) {
                e.preventDefault();
                if($(this).parent().attr('href') != 'http://') {
                    top.location.href = tmpAuthUrl + '?url=' + $(this).parent().attr('href') + '&rd=' + Math.random();
                }
            });
            $('#navbar').on('click', 'a', function(e) {
                e.preventDefault();
                if($(this).attr('href') != 'http://') {
                    top.location.href = tmpAuthUrl + '?url=' + $(this).attr('href') + '&rd=' + Math.random();
                }
            });
        });
    }($, window, document));
