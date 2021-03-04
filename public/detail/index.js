var num = 1;
var id = window.location.search.substring(4);
$.myAjax({
    url: `/product/model/${id}`,
    success: function (data) {
        data.bannerImgs.split(",").forEach(function (item) {
            $(`
                <div class="swiper-slide">
                <img src="${item}" />
                </div>
            `).appendTo($("div.swiper-wrapper"))
        })
        var mySwiper = new Swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            autoplay: {
                //用户操作之后自动切换
                disableOnInteraction: false,
                delay: 3000,
                stopOnLastSlide: false,
            },
            // effect : 'fade',
            pagination: {
                el: '.swiper-pagination',
                // type: 'bullets',
                type: 'fraction',
                //type : 'progressbar',
                //type : 'custom',
            },
            loop: true, // 循环模式选项
        });
        $(` <div class="price">￥<span>${data.price}</span></div> `).prependTo($(".item_price"));
        $(`
            <h3 class="prodocut-name">
                <span><img src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/common/tag_self.png" alt=""></span>
                ${data.name}
            </h3>
            <p class="prodocut-introduce">${data.brief}</p>
        `).appendTo($(".item_introduce"));

        $(`
            <div class="content_top_right-price">￥<span>${data.price}</span></div>
            <div class="content_top_right-num">已选：<span>1</span>件</div>
        `).appendTo($(".content_top_right"));
        $(`<img src="${data.bannerImgs.split(",")[0]}" alt="" />`).appendTo($('.content_top-img'));
        data.otherImgs.split(",").forEach(function (item) {
            $(`<img src="${item}" alt="" />`).appendTo($('.productDetails'));
        });

    }
});
$(".item_installment").on('click', function () {
    $(".amortize").addClass('active');
});
$(".item_quantity").on('click', function () {
    $(".addCart").addClass('active');
});
$(".addCart-btn").on('click', function () {
    $(".amortize").addClass('active');
});
$(".content_top_close").on('click', function () {
    $(".amortize").removeClass('active');
    $(".addCart").removeClass('active');
});
$(".amount_input").val(num);
$(".dec-btn").on('click', function () {
    num--;
    if (num <= 1) {
        num = 1;
        $(this).addClass('active');
    }
    $(".add-btn").removeClass('active');
    $(".amount_input").val(num);
    $(".item_right_left span").text(num);
    $(".content_top_right-num span").text(num);
});
$(".add-btn").on('click', function () {
    num++;
    if (num >= 5) {
        num = 5;
        $(this).addClass('active');
    }
    $(".dec-btn").removeClass('active');
    $(".amount_input").val(num);
    $(".item_right_left span").text(num);
    $(".content_top_right-num span").text(num);
});
$(".favorite").on('click', function () {
    $('.iconstar,.iconstar1').toggleClass("show");
});
$(".conceal").on('click', function () {
    $('.conceal_list').toggleClass("show");
});
// $.myAjax({
//     url: "/cart/total",
//     type: "get",
//     success: function (data) {
//         if(data <= 0) return;
//         $(".count").text(data);
//         $(".count").addClass("show");
//     }
// });
function fnAjax(){
    $.myAjax({
        url: "/cart/total",
        type: "get",
        success: function (data) {
            if(data <= 0) return;
            $(".count").text(data);
            $(".count").addClass("show");
        }
    });
}
function fn(){
	$(".amortize").removeClass('active');
	$(".addCart").removeClass('active');
	if(!sessionStorage.getItem("token")) {
		layer.open({
		    content: '添加购物车失败，请登录后再操作',
		    skin: 'msg',
		    time: 2 //2秒后自动关闭
		});
		window.location.href = `/login/index.html?id=${id}`;
	}else{
		$.myAjax({
		    url:"/cart/add",
		    type: "post",
		    data: {
		        pid:`${id}`,
		        count: num ,
		    },
		    success: function(data){
		        fnAjax()
				layer.open({
				    content: '添加购物车成功',
				    skin: 'msg',
				    time: 2 //2秒后自动关闭
				});
		    }
		});
	}
   
}
$(".footer-confirm-btn").on("click", function () {
    fn();
});
$(".footer-addCart-btn").on("click", function () {
	if(!sessionStorage.getItem("token")){
		window.location.replace('/login/index.html')
	}else{
		fn();
	}
    
});
$(".page-header_back-btn").on("click",function(){
    window.history.back();
});


