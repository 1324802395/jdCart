// 点击jd头像，跳转京东首页
$(function() {
    $('#icon_img').click(function() {
        window.location.href = 'index.html';
    })
});

// 京东用户注册协议和隐私政策 
$(function() {
    var w = window.screen.width;
    var h = window.innerHeight;
    let x = (w - $('.agreement').width()) / 2;
    let y = (h - $('.agreement').height()) / 2;
    $('.agreement').css({
        'left': x + 'px',
        'top': y + 'px'
    });
    $('.agreement').stop().fadeIn();
    $('.agreement .agree').click(function() {
        $('.agreement').stop().fadeOut();
    })
})

//第一步
$(function() {
    // 鼠标焦点进入手机号输入框，显示清除按钮和提示
    $('.now_progress_one .code').focus(function() {
        $('.now_progress_one .tip_right').stop().fadeOut();
        $('.now_progress_one .geshi_tip_wrong').stop().fadeOut();
        $('.now_progress_one .tip_wrong').stop().fadeIn();
        $('.now_progress_one .geshi_tip_yanzheng').stop().fadeIn();
    });
    //清空手机号输入
    $('.now_progress_one .tip_wrong').click(function() {
        $('.now_progress_one .code').val('');
    });
    // 手机号输入正确，焦点离开，去除清除按钮，显示输入正确按钮
    $('.now_progress_one .code').blur(function() {
        $('.now_progress_one .tip_wrong').stop().fadeOut();
        $('.now_progress_one .geshi_tip_yanzheng').stop().fadeOut();
        let s = $(this).val();
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        // 手机号输入正确，显示输入正确按钮
        if (reg.test(s + '')) {
            $('.now_progress_one .tip_right').stop().fadeIn();
        } else {
            $('.now_progress_one .geshi_tip_wrong').stop().fadeIn();
        }
    });
    // 鼠标点击按钮进行验证，显示验证框
    $('.now_progress_one .btn_yanzheng').click(function() {
        let s = $('.now_progress_one .code').val();
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (reg.test(s + '')) {
            $('.now_progress_one .container').stop().fadeIn();
        };
    })

    //手机验证码输入框
    $('.code_yanzheng .phonecode').focus(function() {
        $('.code_yanzheng .i-cancel').stop().fadeIn();
    });
    $('.code_yanzheng .phonecode').blur(function() {
        $('.code_yanzheng .i-cancel').stop().fadeOut();
    });
    $('.code_yanzheng .i-cancel').click(function() {
        $('.code_yanzheng .phonecode').val('');
    });
    // 重新获取
    var count = $('.code_yanzheng .yanzheng_count').text() - 0;
    $('.code_yanzheng .btn-phonecode').click(function() {
        count--;
        console.log(count);
        if (count > 0) {
            $('.code_yanzheng .yanzheng_count').text(count);
            let n_s = 120;
            var btn_set = setInterval(() => {
                if (n_s > 0) {
                    let s = $('.code_yanzheng .btn-phonecode').text();
                    $('.code_yanzheng .btn-phonecode').text(n_s + 's后重新获取');
                    $('.code_yanzheng .audio-tip').stop().fadeOut();
                    $('.code_yanzheng .i-status').stop().fadeIn();
                } else {
                    $('.code_yanzheng .btn-phonecode').text('重新获取');
                    $('.code_yanzheng .i-status').stop().fadeOut();
                    $('.code_yanzheng .audio-tip').stop().fadeIn();
                    clearInterval(btn_set);
                }
                n_s--;
            }, 1000);
            btn_set;
        } else {
            alert('已经没有验证次数')
        }

    });

})