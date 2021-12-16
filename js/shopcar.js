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

// 点击jd头像，跳转京东首页
$(function() {
    $('#icon_img').click(function() {
        window.location.href = 'index.html';
    })
});

// 购物车
$(function() {
    var arr = [];
    var index;
    $('.shop_list').each(function(i, ele) {
        arr.push($(this).find('.cart-item').length);
    });
    $('.j-checkbox').each(function(i, ele) {
        $(this).attr('check', 1);
    });
    // 头部全部商品数量
    $('.cart-filter-bar .shop_count').html($('.j-checkbox').length);
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $('.checkall').change(function() {
        let that = this;
        $('.j-checkbox').each(function(i, ele) {
            if ($(this).attr('check') == 0) {
                $(this).prop('checked', false);
            } else {
                $(this).prop('checked', $(that).prop('checked'));
            }
        });
        // $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        $('.store-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        if ($('.checkall').prop('checked')) {
            $('.j-checkbox').parents('.cart-item').addClass('check-cart-item');
        } else {
            $('.j-checkbox').parents('.cart-item').removeClass('check-cart-item');
        }
        getSum();
    });
    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $('.j-checkbox').change(function() {
        let n = 0;
        $('.j-checkbox').each(function(i, ele) {
            if ($(this).attr('check') == 0) {
                n += 1;
            }
        })
        if ($('.j-checkbox:checked').length + n == $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        if ($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
        getSum();
    });
    // 3. 店铺全选按钮
    $('.store-checkbox').change(function() {
        let that = this;
        $(that).parents('.shop_list').find('.j-checkbox').each(function(i, ele) {
            if ($(this).attr('check') == 0) {
                $(this).prop('checked', false);
            } else {
                $(this).prop('checked', $(that).prop('checked'));
            }
        });
        // $(this).parents('.shop_list').find('.j-checkbox').prop('checked', $(this).prop('checked'));
        if ($(this).prop('checked')) {
            $(this).parents('.goods_store').siblings('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.goods_store').siblings('.cart-item').removeClass('check-cart-item');
        }
        if ($(this).parents('.cart-item-list').find('.store-checkbox').length == $(this).parents('.cart-item-list').find('.store-checkbox:checked').length) {
            $('.checkall').prop('checked', true);
        }
        getSum();
    });
    // 4. 如果小复选框被选中的个数等于店铺商品数量 就应该把店铺按钮选上，否则按钮不选。
    $('.j-checkbox').change(function() {
        let n = 0;
        $(this).parents('.shop_list').find('.j-checkbox').each(function(i, ele) {
            if ($(this).attr('check') == 0) {
                n += 1;
            }
        })
        if ($(this).parents('.shop_list').find('.j-checkbox:checked').length + n == $(this).parents('.shop_list').find('.j-checkbox').length) {
            $(this).parents('.shop_list').find('.store-checkbox').prop('checked', true);
        } else {
            $(this).parents('.shop_list').find('.store-checkbox').prop('checked', false);
        }
        if ($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    });
    // 5. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    $('.increment').click(function() {
        let m = $(this).siblings('.itxt').val();
        m++;
        $(this).siblings('.itxt').val(m);
        let p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (m * p).toFixed(2));
        getSum();
    });

    $('.decrement').click(function() {
        let m = $(this).siblings('.itxt').val();
        if (m == 1) {
            alert('不能再减少了')
        } else {
            m--;
            $(this).siblings('.itxt').val(m);
        }
        let p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (m * p).toFixed(2));
        getSum();
    });
    //6. 删除
    $('.p-action_x').click(function() {
        index = $(this).parents('.shop_list').index();
        arr[index] -= 1;
        if (arr[index] == 0) {
            $(this).parents('.shop_list').stop().fadeOut();
        } else {
            $(this).parents('.cart-item').stop().fadeOut();
        }
        // $(this).parents('.cart-item').find('.j-checkbox').prop('checked', false);
        $(this).parents('.cart-item').find('.j-checkbox').attr('check', 0);
        $(this).parents('.cart-item').find('.j-checkbox').click();
        getSum();
    });

    // 7. 全部删除
    $('.clear-all').click(function() {
        $('.checkall').prop('checked', false);
        $('.shop_list').stop().slideUp();
        $('.j-checkbox').prop('checked', false);
        $('.j-checkbox').attr('check', 0)
        getSum();
    });

    // 删除选中选项
    $('.remove-batch').click(function() {
        $('.checkall').prop('checked', false);
        $('.shop_list').each(function(i, ele) {
            if ($(this).find('.j-checkbox:checked').length == $(this).find('.j-checkbox').length) {
                $(this).stop().fadeOut();
            } else {
                $('.j-checkbox:checked').parents('.cart-item').stop().slideUp();
            }
        })
        $('.j-checkbox:checked').each(function(i, ele) {
            $(this).attr('check', 0);
        })
        $('.j-checkbox:checked').prop('checked', false);

        getSum()
    });

    // 结算金额
    function getSum() {
        var count = 0; // 计算总件数 
        var money = 0; // 计算总价钱
        $(".itxt").each(function(i, ele) {
            if ($(this).parents('.cart-item').find('.j-checkbox').prop('checked')) {
                count += parseInt($(ele).val());
            }
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i, ele) {
            if ($(this).siblings('.p-checkbox').find('.j-checkbox').prop('checked')) {
                money += parseFloat($(ele).text().substr(1));
            }
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    getSum();

})

// 结算 固定栏
$(function() {
    toggleTool();
    var w = window.screen.width;
    var h = $(window).height();
    var toolTop = $(".cart-floatbar").offset().top - h;

    function toggleTool() {
        if ($(document).scrollTop() <= toolTop) {
            $(".cart-floatbar").css({
                "position": ' fixed',
                'bottom': -50 + 'px',
                'left': '0',
                'width': w + 'px'
            });
        } else {
            $(".cart-floatbar").css({
                "position": '',
                'top': '',
                'left': '',
                'width': ''
            });
        }
    }

    $(window).scroll(function() {
        toggleTool();
    });
})