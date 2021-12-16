// 618广告关闭
$(function() {
    $('.ad_618 .close_ad').click(function() {
        $('.ad_618').css('display', 'none');
    })
})

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

// 头部固定搜索栏
$(function() {
    $(".fixed_search .num").html($(".search_tab .num").html());
    var toolTop = $(".jd_miaosha").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixed_search").fadeIn();
        } else {
            $(".fixed_search").fadeOut();
        };
    }

    $(window).scroll(function() {
        toggleTool();
    });
})

// 第一个轮播图
$(function() {
    var cur = 0;
    var l = $('.lunbotu .content li').width();
    //  鼠标经过focus 就显示隐藏左右按钮
    $('.lunbotu').mouseenter(function() {
        $('.lunbotu .btn_l').css('display', 'block');
        $('.lunbotu .btn_r').css('display', 'block');
        clearInterval(lunbotu_timer)
    });
    $('.lunbotu').mouseleave(function() {
        $('.lunbotu .btn_l').css('display', 'none');
        $('.lunbotu .btn_r').css('display', 'none');
        lunbotu_timer = setInterval(function() {
            $('.lunbotu .btn_r').click();
        }, 2000);
    });
    // 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    $('.lunbotu .content li').each(function(i, domEle) {
        // 1. 创建元素
        var li = $("<li></li>");
        // 2. 添加元素
        $('.lunbotu .dotted').append(li);
        li.click(function() {
            $(this).css('backgroundColor', '#666');
            $(this).siblings('li').css('backgroundColor', '#fff');
            cur = $(this).index();
            $('.lunbotu .content').stop().animate({ left: -1 * l * cur + 'px' });

        })
    });
    let len = $('.lunbotu .content li').length;
    // 克隆第一张图片(li)放到ul 最后面
    let first = $('.lunbotu .content li').eq(0).clone(true);
    $('.lunbotu .content').append(first);
    $('.lunbotu .btn_l').click(function() {
        if (cur == 0) {
            $('.lunbotu .content').css('left', len * l + "px");
            cur = len;
        }
        cur -= 1
        $('.lunbotu .content').stop().animate({ left: -1 * l * cur + 'px' });
        $('.lunbotu .dotted li').eq(cur).css('backgroundColor', '#666');
        $('.lunbotu .dotted li').eq(cur).siblings('li').css('backgroundColor', '#fff');
    });
    $('.lunbotu .btn_r').click(function() {
        if (cur == len) {
            cur = 0;
            $('.lunbotu .content').css('left', '0');
        }
        cur += 1;
        $('.lunbotu .content').stop().animate({ left: -1 * l * cur + 'px' });
        $('.lunbotu .dotted li').eq(cur).css('backgroundColor', '#666');
        $('.lunbotu .dotted li').eq(cur).siblings('li').css('backgroundColor', '#fff');
    });
    // 自动播放轮播图
    var lunbotu_timer = setInterval(function() {
        $('.lunbotu .btn_r').click();
    }, 2000);
})

// 第二个轮播图
$(function() {
    var right_lunbotu_cur = 0;
    var right_lunbotu_l = $('.right_lunbotu .right_content1 .col').width();
    let right_lunbotu_len = $('.right_lunbotu .right_content1 .col').length;
    // 克隆第一张图片(li)放到ul 最后面
    let first = $('.right_lunbotu .right_content1 .col').eq(0).clone(true);
    $('.right_lunbotu .right_content1').append(first);
    //  鼠标经过focus 就显示隐藏左右按钮
    $('.right_lunbotu').mouseenter(function() {
        $('.right_lunbotu .btn_l').css('display', 'block');
        $('.right_lunbotu .btn_r').css('display', 'block');
        clearInterval(right_lunbotu_timer)
    });
    $('.right_lunbotu').mouseleave(function() {
        $('.right_lunbotu .btn_l').css('display', 'none');
        $('.right_lunbotu .btn_r').css('display', 'none');
        right_lunbotu_timer = setInterval(function() {
            $('.right_lunbotu .btn_r').click();
        }, 2000);
    });
    $('.right_lunbotu .btn_l').click(function() {
        if (right_lunbotu_cur == 0) {
            $('.right_lunbotu .right_content1').css('left', right_lunbotu_len * right_lunbotu_l + "px");
            right_lunbotu_cur = right_lunbotu_len
        }
        right_lunbotu_cur -= 1;
        $('.right_lunbotu .right_content1').stop().animate({ left: -1 * right_lunbotu_l * right_lunbotu_cur + 'px' });
    });
    $('.right_lunbotu .btn_r').click(function() {
        if (right_lunbotu_cur == right_lunbotu_len) {
            right_lunbotu_cur = 0
            $('.right_lunbotu .right_content1').css('left', '0');
        }
        right_lunbotu_cur += 1;
        $('.right_lunbotu .right_content1').stop().animate({ left: -1 * right_lunbotu_l * right_lunbotu_cur + 'px' });
    });
    // 自动播放轮播图
    var right_lunbotu_timer = setInterval(function() {
        $('.right_lunbotu .btn_r').click();
    }, 2000);
})

// 话费tab栏
$(function() {
    var n = 0;
    // 设置tab栏索引
    $('.right_menu .items_bar .col').each(function() {
        $(this).attr("nav_index", n);
        n += 1;
    })

    var m = 0;
    // 设置子tab栏索引
    $('.right_menu .items_bar .tab_bar_item').each(function() {
        $(this).attr("nav_index", m);
        m += 1;
    });
    // 鼠标移入tab栏，显示对应子tab栏内容
    $('.right_menu .items_bar .col').mouseenter(function() {
        $('.right_menu .items_bar .tab_bar_item').css('display', 'none');
        $('.right_menu .items_bar .tab_bar_item').eq($(this).attr("nav_index")).css('display', 'block');
    });
    // 点击关闭按钮，关闭对应子tab栏
    $('.right_menu .items_bar .tab_bar_item .close').click(function() {
        $(this).parents('.tab_bar_item').css('display', 'none');
    })

    // 三级tab栏转换
    n = 0;
    // 设置tab栏索引
    $('.right_menu .tab_bar_item .title_2_name').each(function() {
        $(this).attr("nav_index", n);
        n += 1;
    })

    n = 0;
    // 设置tab内容栏索引
    $('.right_menu .tab_bar_item .zi_tab_menu_msg').each(function() {
        $(this).attr("nav_index", n);
        n += 1;
    })

    // 点击tab栏,显示对应内容
    $('.right_menu .tab_bar_item .title_2_name').click(function() {
        $('.right_menu .tab_bar_item .zi_tab_menu_msg').css('display', 'none');
        $('.right_menu .tab_bar_item .zi_tab_menu_msg').eq($(this).attr("nav_index")).css('display', 'block');
    })
})

// 京东秒杀计时器
$(function() {
    var time = new Date();
    var inputTime = time.toLocaleDateString(); // 返回的是用户输入时间总的毫秒数
    var now_hour = time.getHours();
    if (now_hour < 6) {
        $('.jd_miaosha .goal_time').html(6 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "none");
        inputTime += " " + 6 + ":00:00";
    } else if (now_hour < 7) {
        $('.jd_miaosha .goal_time').html(6 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "none");
        inputTime += " " + 7 + ":00:00";
    } else if (now_hour < 10) {
        $('.jd_miaosha .goal_time').html(10 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "none");
        inputTime += " " + 10 + ":00:00";
    } else if (now_hour < 11) {
        $('.jd_miaosha .goal_time').html(10 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "none");
        inputTime += " " + 11 + ":00:00";
    } else if (now_hour < 14) {
        $('.jd_miaosha .goal_time').html(14 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "none");
        inputTime += " " + 14 + ":00:00";
    } else if (now_hour < 15) {
        $('.jd_miaosha .goal_time').html(14 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "none");
        inputTime += " " + 15 + ":00:00";
    } else if (now_hour < 16) {
        $('.jd_miaosha .goal_time').html(16 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "none");
        inputTime += " " + 16 + ":00:00";
    } else if (now_hour < 17) {
        $('.jd_miaosha .goal_time').html(16 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "none");
        inputTime += " " + 17 + ":00:00";
    } else if (now_hour < 18) {
        $('.jd_miaosha .goal_time').html(18 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "none");
        inputTime += " " + 18 + ":00:00";
    } else if (now_hour < 19) {
        $('.jd_miaosha .goal_time').html(18 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "none");
        inputTime += " " + 19 + ":00:00";
    } else if (now_hour < 20) {
        $('.jd_miaosha .goal_time').html(20 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "none");
        inputTime += " " + 20 + ":00:00";
    } else if (now_hour < 21) {
        $('.jd_miaosha .goal_time').html(20 + ':00');
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "none");
        inputTime += " " + 21 + ":00:00";
    } else if (now_hour < 24) {
        $('.jd_miaosha .goal_time').html('零');
        $('.jd_miaosha .time .miaosha_time').eq(0).css("display", "block");
        $('.jd_miaosha .time .miaosha_time').eq(1).css("display", "none");
        inputTime += " " + 24 + ":00:00";
    }
    inputTime = +new Date(inputTime);
    countDown(); // 我们先调用一次这个函数，防止第一次刷新页面有空白 
    // 2. 开启定时器
    setInterval(countDown, 1000);

    function countDown() {
        var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
        var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数 
        var h = parseInt(times / 60 / 60 % 24); //时
        h = h < 10 ? '0' + h : h;
        $('.jd_miaosha .hour').html(h);
        var m = parseInt(times / 60 % 60); // 分
        m = m < 10 ? '0' + m : m;
        $('.jd_miaosha .minute').html(m);
        var s = parseInt(times % 60); // 当前的秒
        s = s < 10 ? '0' + s : s;
        $('.jd_miaosha .seconds').html(s);
        if (h == 0 && m == 0 && s == 0) {
            location.reload(true);
        }

    }
});

// 京东秒杀轮播图
$(function() {
    var jd_miaosha_cur = 0;
    var jd_miaosha_l = $('.jd_miaosha .miaosha_content .col').width();
    let jd_miaosha_len = $('.jd_miaosha .miaosha_content .col').length - 1;
    $('.jd_miaosha .btn_l').click(function() {
        if (jd_miaosha_cur == 0) {
            $('.jd_miaosha .miaosha_content').css('left', jd_miaosha_len * jd_miaosha_l + "px");
            jd_miaosha_cur = jd_miaosha_len;
        }
        jd_miaosha_cur -= 1
        $('.jd_miaosha .miaosha_content').stop().animate({ left: -1 * jd_miaosha_l * jd_miaosha_cur + 'px' });
    });
    $('.jd_miaosha .btn_r').click(function() {
        if (jd_miaosha_cur == jd_miaosha_len) {
            $('.jd_miaosha .miaosha_content').css('left', '0');
            jd_miaosha_cur = 0;
        }
        jd_miaosha_cur += 1;
        $('.jd_miaosha .miaosha_content').stop().animate({ left: -1 * jd_miaosha_l * jd_miaosha_cur + 'px' });
    });

})

// 电梯导航版
//若卷去窗口部分等于秒杀到顶部距离时，导航栏出现
$(function() {
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
    // 节流阀  互斥锁 
    var flag = true;
    // 1.显示隐藏电梯导航
    var toolTop = $(".jd_miaosha").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };
    }

    $(window).scroll(function() {
        toggleTool();
        // 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名

        if (flag) {
            if ($(document).scrollTop() >= $("#for_you_menu").offset().top) {
                $(".fixedtool li").children('a').removeClass("current_1");
                $(".fixedtool li").eq(3).children('a').addClass("current_1");
            } else if ($(document).scrollTop() >= $("#pindao").offset().top) {
                $(".fixedtool li").children('a').removeClass("current_1");
                $(".fixedtool li").eq(2).children('a').addClass("current_1");
            } else if ($(document).scrollTop() >= $("#youxuan").offset().top) {
                $(".fixedtool li").children('a').removeClass("current_1");
                $(".fixedtool li").eq(1).children('a').addClass("current_1");
            } else if ($(document).scrollTop() >= $("#jd_miaosha").offset().top) {
                $(".fixedtool li").children('a').removeClass("current_1");
                $(".fixedtool li").eq(0).children('a').addClass("current_1");
            }
        }
    });

    $(".fixedtool li").click(function() {
        $(".fixedtool li").children('a').removeClass("current_1");
        $(".fixedtool li").eq($(this).index()).children('a').addClass("current_1");
    })

})

// 发现好货轮播图
$(function() {
    var cur = 0;
    let l = $('.find_lunbo ul li').width();
    //  鼠标经过focus 就显示隐藏左右按钮
    $('.find_lunbo').mouseenter(function() {
        clearInterval(lunbotu_timer)
    });
    $('.find_lunbo').mouseleave(function() {
        lunbotu_timer = setInterval(function() {
            find_tab();
        }, 2000);
    });
    let len = $('.find_lunbo ul li').length - 6;
    var find_tab = function() {
            if (cur == len) {
                cur = 0;
                $('.find_lunbo ul').css('left', '0');
            }
            cur += 1;
            $('.find_lunbo ul').stop().animate({ left: -1 * l * cur + 'px' });
        }
        // 自动播放轮播图
    var lunbotu_timer = setInterval(function() {
        find_tab();
    }, 2000);
})

// 每日特价 tab栏
$(function() {
    var n = 0;
    // 设置tab栏索引
    $('.everyday_bargain .bargain_item_name').each(function() {
        $(this).attr("nav_index", n);
        n += 1;
    })

    var m = 0;
    // 设置子tab栏索引
    $('.everyday_bargain .bargain_tab_items').each(function() {
        $(this).attr("nav_index", m);
        m += 1;
    });
    // 鼠标移入tab栏，显示对应子tab栏内容
    $('.everyday_bargain .bargain_item_name').mouseenter(function() {
        $('.everyday_bargain .bargain_item_name').css({
            'textDecoration': 'none',
            'color': '#999'
        });
        $(this).css({
            'textDecoration': 'underline',
            'color': '#e3201b'
        });
        $('.everyday_bargain .bargain_tab_items').css('display', 'none');
        $('.everyday_bargain .bargain_tab_items').eq($(this).attr("nav_index")).css('display', 'block');
    });
})

// joy tab栏
$(function() {
    var n = 0;
    // 设置tab栏索引
    $('.joy_items .item_name').each(function() {
        $(this).attr("nav_index", n);
        n += 1;
    })

    var m = 0;
    // 设置子tab栏索引
    $('.joy_items .joy_tab').each(function() {
        $(this).attr("nav_index", m);
        m += 1;
    });
    // 鼠标移入tab栏，显示对应子tab栏内容
    $('.joy_items .item_name').mouseenter(function() {
        $('.joy_items .item_name').css({
            'backgroundColor': '#f6f6f6',
            'color': '#666'
        });
        $(this).css({
            'backgroundColor': '#e1251b',
            'color': '#fff'
        });
        $('.joy_items .joy_tab').css('display', 'none');
        $('.joy_items .joy_tab').eq($(this).attr("nav_index")).css('display', 'block');
    });
})

// 为你推荐 固定栏
$(function() {
    var toolTop = $(".for_you_tab").offset().top;
    toggleTool();
    var w = window.screen.width;

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".for_you_menu").css({
                "position": ' fixed',
                'top': '50px',
                'left': '0',
                'width': w + 'px'
            });
        } else {
            $(".for_you_menu").css({
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

//为你推荐 tab栏
$(function() {
    var n = 0;
    // 设置tab栏索引
    $('.for_you_menu .for_tab_index').each(function() {
        $(this).attr("nav_index", n);
        n += 1;
    })

    var m = 0;
    // 设置子tab栏索引
    $('.for_you_tab').each(function() {
        $(this).attr("nav_index", m);
        m += 1;
    });
    // 鼠标移入tab栏，显示对应子tab栏内容
    $('.for_you_menu .for_tab_index').click(function() {
        $('.for_you_menu .for_tab_index').children('a').removeClass('for_you_current');
        $(this).children('a').addClass('for_you_current');
        $('.for_you_tab').css('display', 'none');
        $('.for_you_tab').eq($(this).attr("nav_index")).css('display', 'block');
    });
})