// 点击jd头像，跳转京东首页
$(function() {
    $('#icon_img').click(function() {
        window.location.href = 'index.html';
    })
});

// 切换登陆方式
$(function() {
    $('#saoma').click(function() {
        $(this).addClass('cure');
        $('#zhanghu').removeClass('cure');
        $('.login_tab_ite').css('height', '300px');
        $('.login_tab_item .saoma').css('display', 'block');
        $('.login_tab_item .zhanghu').css('display', 'none');
    })
    $('#zhanghu').click(function() {
        $(this).addClass('cure');
        $('#saoma').removeClass('cure');
        $('.login_tab_ite').css('height', '250px');
        $('.login_tab_item .saoma').css('display', 'none');
        $('.login_tab_item .zhanghu').css('display', 'block');
    })
})

// 点击二维码，显示手机图片
$(function() {
    $('.login_tab_item .saoma_img').mouseenter(function() {
        $('.login_tab_item .phone_img').fadeIn();
        $('.login_tab_item .code_img').css('margin-left', '10px');
    });
    $('.login_tab_item .saoma_img').mouseleave(function() {
        $('.login_tab_item .phone_img').css('display', 'none');
        $('.login_tab_item .code_img').css('margin-left', '80px');
    })
})