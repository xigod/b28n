  var iframe;

    window.onload = function() {
        
        setTimeout(function() {//增加延时，防止 页面宽度获取错误
            if (window.document.body.scrollWidth>720 && window == top) {

                    var rate = document.getElementsByTagName('img')[0].clientHeight / document.getElementsByTagName('img')[0].clientWidth;

                    iframe = document.getElementsByTagName('iframe')[0];
                    iframe.height = window.document.body.parentNode.clientHeight - 5;
                    iframe.width = ~~(window.document.body.parentNode.clientHeight / rate);
                    iframe.src = window.location.href + '';

                    var container = document.getElementById('container');

                    container.style.width = iframe.width + 'px';
                    document.getElementById('container2').style.display = 'none';
            } else {
                document.getElementById('container').style.display = 'none';
                if (!$('#navbar li').length) {
                    $('.nav-bar-filter').remove();
                }
            }
        });

        setTimeout(function() {
            document.body.style.visibility = 'visible'; 
        }, 10);
        
    }
