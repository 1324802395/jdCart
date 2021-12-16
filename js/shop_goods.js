// 定位信息 
$(function() {
    var local_cur = 5;
    // 鼠标移入显示位置信息
    $('.location').mouseenter(function() {
        $('.location .loca').css('display', 'block');
    })
    $('.location').mouseleave(function() {
        $('.location .loca').css('display', 'none');
    });
    // 鼠标点击下拉列表，改变定位信息
    $('.loca li').click(function() {
        local_cur = $(this).index();
        $('.local_name').html($(this).html());
        $(this).css({
            color: "#fff",
            backgroundColor: "#f10215",
            // 如果是复合属性则必须采取驼峰命名法，如果值不是数字，则需要加引号
        })
        $(this).siblings('li').css({
            color: "#999",
            backgroundColor: "#fff",
        })
    });
    $('.loca li').mouseenter(function() {
        $(this).css({
            color: "#e83632",
            backgroundColor: "rgba(0,0,0,.3)",
        });
        $(this).siblings('li').css({
            color: "#999",
            backgroundColor: "#fff",
        });
        $('.loca li').eq(local_cur).css({
            color: "#fff",
            backgroundColor: "#f10215",
        })
    })
    $('.loca li').mouseleave(function() {
        $('.loca li').css({
            color: "#999",
            backgroundColor: "#fff",
        });
        $('.loca li').eq(local_cur).css({
            color: "#fff",
            backgroundColor: "#f10215",
        })
    })
})

// 头部导航栏
$(function() {
    var n = 0;
    $('.user_tab_items .tab_item').each(function() {
        $(this).attr("nav_index", n);
        n += 1;
    })
    $('.user_tab_items .tab_item').mouseenter(function() {
        $('.user_tab_items .user_tab_menu').css('display', 'none');
        $('.user_tab_items .user_tab_menu').eq($(this).attr("nav_index")).css('display', 'block');

    })
    $('.user_tab_items .tab_item').mouseleave(function() {
        $('.user_tab_items .user_tab_menu').css('display', 'none');
    })
})

// 全部分类功能
$(function() {
    // 点击jd头像，跳转京东首页
    $('#icon_img').click(function() {
        window.location.href = 'index.html';
    })
    $('.total_class').mouseenter(function() {
        $('.nav_tab .w1').css("position", "static");
        $('.goods_msg .huawei_item').css("visibility", "hidden");
        $(this).find('.sanjiao').css('transform', 'rotate(225deg)');
        $(this).find('.class_tab').stop().fadeIn();
    })
    $('.total_class').mouseleave(function() {
        $('.nav_tab .w1').css("position", "relative");
        $('.goods_msg .huawei_item').css("visibility", "");
        $(this).find('.sanjiao').css('transform', 'rotate(45deg)');
        $(this).find('.class_tab').stop().fadeOut();
    })

})

// 店铺导航tab栏 
$(function() {
    // 全部商品
    $('.nav_total').mouseenter(function() {
        $(this).find('.item_toatl_msg').stop().fadeIn();
    })
    $('.nav_total').mouseleave(function() {
            $(this).find('.item_toatl_msg').stop().fadeOut();
        })
        // 系列tab栏
    $('.nav_tab .nav_tab_item').mouseenter(function() {
        $(this).find('.item_tab_msg').stop().fadeIn();
    })
    $('.nav_tab .nav_tab_item').mouseleave(function() {
        $(this).find('.item_tab_msg').stop().fadeOut();
    })
})

// 店铺客服信息与手机通讯tab栏
$(function() {
    $('.goods_msg .shop').mouseenter(function() {
        $('.goods_msg .shop_msg').stop().fadeIn();
    })
    $('.goods_msg .shop').mouseleave(function() {
        $('.goods_msg .shop_msg').stop().fadeOut();
    })
    $('.goods_msg .huawei_item').mouseenter(function() {
        $(this).find('.sanjiao').css({
            'margin-top': '8px',
            'transform': 'rotate(225deg)'
        });
        $(this).find('.more_goods').stop().fadeIn();
    })
    $('.goods_msg .huawei_item').mouseleave(function() {
        $(this).find('.sanjiao').css({
            'margin-top': '3px',
            'transform': 'rotate(45deg)'
        });
        $(this).find('.more_goods').stop().fadeOut();
    })
})

// 商品放大镜
$(function() {
    // 1. 当我们鼠标经过 mid_img 就显示和隐藏 mask 遮挡层 和 big 大盒子
    $('.product_details .mid_photo').mouseenter(function() {
        $('.product_details .mask').css('display', 'block');
        $('.product_details .big_photo').css('display', 'block');
    })
    $('.product_details .mid_photo').mouseleave(function() {
        $('.product_details .mask').css('display', 'none');
        $('.product_details .big_photo').css('display', 'none');
    });
    // 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    $('.product_details .mid_photo').mousemove(function(e) {
        let x = e.pageX - $(this).offset().left - $('.product_details .mask').height() / 2;
        let y = e.pageY - $('.product_details .mask').width() / 2 - $(this).offset().top;
        let maskX = $('.product_details .mid_photo').width() - $('.product_details .mask').width();
        let maskY = $('.product_details .mid_photo').height() - $('.product_details .mask').height();
        if (x <= 0) {
            x = 0;
        } else if (x >= maskX) {
            x = maskX;
        }
        if (y <= 0) {
            y = 0;
        } else if (y >= maskY) {
            y = maskY;
        }
        $('.product_details .mask').css({
            'top': y + 'px',
            'left': x + 'px'
        });
        // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        let imgX = $('.product_details .big_img').width() - $('.product_details .big_photo').width();
        let imgY = $('.product_details .big_img').height() - $('.product_details .big_photo').height();
        $('.product_details .big_img').css({
            'left': -1 * x * (imgX / maskX) + 'px',
            'top': -1 * y * (imgY / maskY) + 'px'
        })
    });

})

// 商品tab栏
$(function() {
    // 左右按钮切换商品
    $('.product_details .arrow_prev').click(function() {
        $('.product_details .list_item_menu').eq(1).stop().fadeOut();
        $('.product_details .list_item_menu').eq(0).stop().fadeIn();
    });
    $('.product_details .arrow_next').click(function() {
        $('.product_details .list_item_menu').eq(0).stop().fadeOut();
        $('.product_details .list_item_menu').eq(1).stop().fadeIn();
    });
    // 鼠标移动到小图片上，商品图和大图自动切换到对应图片
    let n = 0;
    $('.product_details .list_item_menu li').each(function() {
        $(this).attr('img_index', n);
        n++;
    })
    $('.product_details .list_item_menu li').mouseenter(function() {
        $('.product_details .list_item_menu li').removeClass('tab_current');
        $(this).addClass('tab_current');
        $('.product_details .mid_img').css('display', 'none');
        $('.product_details .mid_img').eq($(this).attr('img_index')).css('display', 'block');
        $('.product_details .big_img').css('display', 'none');
        $('.product_details .big_img').eq($(this).attr('img_index')).css('display', 'block');
    })
})

// 抢购数量按钮
$(function() {
    let n = $('.product_details .qianggou .count').html();
    console.log(n);
    $('.product_details .qianggou .add').click(function() {
        n++;
        $('.product_details .qianggou .count').html(n);
    })
    $('.product_details .qianggou .minus').click(function() {
        if (n == 1) {
            alert('已经是最少数量')
        } else {
            n--;
            $('.product_details .qianggou .count').html(n);
        }

    })
})