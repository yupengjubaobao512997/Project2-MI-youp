var count, price, pricePer;
var totalPrice = 0;
var arr = [];
var id;
(function() {
	if(!sessionStorage.getItem("token")){
		window.location.replace('/login/index.html')
	}else
	$.myAjax({
		url: "/cart/list",
		type: "post",
		success: function(data) {
			data.forEach(function(item) {
				$(
					`
					<li class="goods-list-item" data-id="${item.id}">
						<div class="goods-list-item_content">
							<div class="goods-list-item_content-top">
								<div class="check-box content-check">
									<i class="iconfont iconduihao"></i>
								</div>
								<div class="productInformation">
									<div class="productImg">
										<img src="${item.avatar}" />
									</div>
									<div class="product-text">
										<div class="product-name">${item.name}</div>
										<div class="prodocut-price">
											<div class="price-item">
												￥
												<span>${item.price}</span>
											</div>
											<div class="pro-num" >
												<button class="dec-btn" >-</button>
												<input type="text" name="" class="amount_input" value="${item.count}" />
												<button class="add-btn">+</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				`
				).prependTo($("ul.goods-list"));
			});
			Fn();
		}
	});
})()

$(".back-btn").on("click", function() {
	window.history.back();
});
$(".editor-btn").on("click", function() {
	$(".page-container").find('.show').removeClass('show');
	$(".page-footer_right-account").removeClass("show").siblings(".page-footer_right-delete").addClass("show");
	$(this).removeClass('show').siblings(".accomplish-btn").addClass("show");
	arr = [];
});
$(".accomplish-btn").on("click", function() {
	$(".page-container").find('.show').removeClass('show');
	$(".page-footer_right-delete").removeClass("show").siblings(".page-footer_right-account").addClass("show");
	$(this).removeClass('show').siblings(".editor-btn").addClass("show");
	$(".total").text(0);
});

$("ul.goods-list").on("click", 'li', function(e) {
	var e = e || window.event
	id = this.dataset.id;
	count = $(this).find(".amount_input").val();
	price = $(this).find(".price-item span").text();
	if (e.target.tagName === "BUTTON") {
		if ($(e.target).hasClass("dec-btn")) {
			count--;
			if (count >= 1) {
				$(e.target).removeClass("darken").siblings(".add-btn").removeClass("darken");
				
				$.myAjax({
					url: `/cart/decrease/${id}`,
					type: "post",
					success: function(data) {}
				});
				$(this).find(".amount_input").val(count);
				if ($(this).find(".content-check").hasClass("show")) {
					pricePer = parseFloat(count) * parseFloat(price);
					totalPrice = parseFloat($('.total').text()) - parseFloat(price);
					$('.total').text(totalPrice);
				} else return;
			}else $(e.target).addClass("darken");
		} else if ($(e.target).hasClass("add-btn")) {
			count++;
			if (count <= 5) {
				$(e.target).removeClass("darken").siblings(".dec-btn").removeClass("darken");
				$.myAjax({
					url: `/cart/increase/${id}`,
					type: "post",
					success: function(data) {}
				});
				$(this).find(".amount_input").val(count);
				if ($(this).find(".content-check").hasClass("show")) {
					pricePer = parseFloat(count) * parseFloat(price);
					totalPrice = parseFloat($('.total').text()) + parseFloat(price);
					$('.total').text(totalPrice);
				} else return;
			} else $(e.target).addClass("darken").siblings(".dec-btn").removeClass("darken")

		}
	}
	if (e.target.tagName === "I") {
		var E = $(e.target).parent();
		console.log(id);
		if (E.hasClass("show")) {
			E.removeClass('show');
			pricePer = parseFloat(count) * parseFloat(price);
			totalPrice = parseFloat($('.total').text()) - pricePer;
			$('.total').text(totalPrice);
			if (!$(".accomplish-btn").hasClass("show")) {
				var j = arr.indexOf(id);
				arr.splice(j, 1);
			}
		} else {
			E.addClass('show');
			pricePer = parseFloat(count) * parseFloat(price);
			totalPrice = parseFloat($('.total').text()) + pricePer;
			$('.total').text(totalPrice);
			arr.push(id);
		}
		$.myAjax({
			url: "/cart/list",
			type: "post",
			success: function(data) {
				if ($('.goods-list').find('.show').length === data.length) {
					$(".item_title-check-box").addClass('show');
					$(".page-footer-check-box").addClass('show');
				} else if ($('.goods-list').find('.show').length != data.length) {
					$(".item_title-check-box").removeClass('show');
					$(".page-footer-check-box").removeClass('show');
				}
			}
		});
	}
});
$(".item_title-check-box").on("click", function() {
	totalPrice = 0;
	if ($(this).hasClass("show")) {
		$(this).removeClass('show');
		$(".content-check").removeClass('show');
		$(".page-footer-check-box").removeClass('show');
		$(".total").text('0');
		if ($(".accomplish-btn").hasClass('show')) {
			arr = [];
		}

	} else {
		$(this).addClass('show');
		$(".content-check").addClass('show');
		$(".page-footer-check-box").addClass('show');
		SUM();
		for (var i = 0; i < $(".goods-list-item").length; i++) {
			id = $(".goods-list-item")[i].dataset.id;
			arr.push(id);
		}
	}
});
$(".page-footer-check-box").on("click", function() {
	totalPrice = 0;
	if ($(this).hasClass("show")) {
		$(this).removeClass('show');
		$(".item_title-check-box").removeClass('show');
		$(".content-check").removeClass('show');
		$('.total').text("0");
	} else {
		$(this).addClass('show');
		$(".item_title-check-box").addClass('show');
		$(".content-check").addClass('show');
		SUM();
	}
});

function SUM() {
	for (var i = 0; i < $(".goods-list-item").length; i++) {
		price = parseFloat($('.price-item span')[i].innerText);
		count = parseFloat($('.amount_input')[i].value);
		pricePer = price * count;
		totalPrice += pricePer;
	}
	$('.total').text(totalPrice);
}


$(".delete-btn").on("click", function() {
	$.myAjax({
		url: "/cart/remove",
		type: "post",
		data: {
			ids: arr,
		},
		success: function() {
			console.log(arr);
			if (arr.length === $('.goods-list-item').length) {
				$(".container").children('.noGoods').addClass('active').siblings().removeClass('active');
				$(".page-footer-check-box").removeClass('show');
			} else {
				$(".container").find(".show").closest(".goods-list-item").remove();
			}
		}
	});
	Fn();
})

function Fn() {
	console.log($(".goods-list").find("li").length);
	if ($(".goods-list").find("li").length === 0) {
		$(".noGoods").addClass("active").siblings().removeClass("active");
	} else {
		$(".noGoods").removeClass("active").siblings().addClass("active");
	}
};
$(".settlement-btn").on("click", function() {
	if(arr.length == 0){}else{
		var str = arr.join("=");
		window.location.href = `/settlement/index.html?ids=${str}`;
	}
		
	
})
