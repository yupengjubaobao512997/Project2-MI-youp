
$.myAjax({
	url: "/order/list_all",
	success: data => {
		fn(data);
	}
});
var fn = (data) => {
	data.forEach((item, indexs) => {
		$(
			`
			<li class="order-list-item">
				<div class="item-title">
					<div class="item-title-text">小米有品</div>
					<div class="status">
						<div class="status-box payment show">待付款</div>
						<div class="status-box receiving">已付款</div>
					</div>
				</div>
				<div class="item-content">
					<div class="order-info">
						<div class="order-price">
							<span>共<span class="">${item.details.length}</span>种商品，</span>
							<span>总金额</span>
							<span class="total-price">
								￥
								<span>${item.account}</span>
								<span>.00</span>
							</span>
						</div>
					</div>
					
				</div>
			
				<div class="item-footer">
					<div class="delete-btn" data-orderNumber="${item.orderId}">删除订单</div>
					<div class="buy-btn" >
						<div class="againBuy-btn" data-orderNumbers="${item.orderId}">再次购买</div>
						<div class="pay-btn show" data-orderNumbers="${item.orderId}">去支付</div>
					</div>
			
				</div>
			
			</li>
		`
		).appendTo("ul.order-list");
		item.details.forEach(items => {
			$(
				`
				<div class="order-per-pro">
					<div class="product-img">
						<img src="${items.avatar}">
					</div>
					<div class="productInfo">
						<div class="product-text">
							<div class="product-name">${items.name}</div>
							<div class="product-model"></div>
						</div>
						<div class="price-num">
							<div>￥<span class="prePrice">${items.price}</span></div>
							<div>*<span class="num">${items.count}</span></div>
						</div>
					</div>
				</div>
			`
			).insertBefore($(".order-price").eq(indexs));
		});
		
		
		if (item.pay === 1) {
			console.log(111);
			console.log($(".receiving"));
			$(".receiving").addClass("show").siblings().removeClass("show");
			$(".againBuy-btn").addClass("show").siblings().removeClass("show");
		} else {
			console.log(1111)
			console.log($(".receiving"));
			if($(".receiving").hasClass("show")) return;
			$(".payment").addClass("show").siblings().removeClass("show");
			$(".pay-btn").addClass("show").siblings().removeClass("show");
		}
	});
}
$(".btn-list").on("click", "li", $.debounce(function() {
	$(".order-list").empty();
	$(this).find('span').addClass("show").parents("li").siblings().find("span").removeClass("show");
	if ($(this).index() === 0) {
		$.myAjax({
			url: "/order/list_all",
			success: data => {
				fn(data);
			}
		});
	} else if ($(this).index() === 1) {
		$.myAjax({
			url: "/order/list_unpay",
			success: data => {
				console.log(data)
				fn(data);
			}
		});
	} else if ($(this).index() === 2) {
		$.myAjax({
			url: "/order/list_pay",
			success: data => {
				console.log(data)
				fn(data);
			}
		});
	} else if ($(this).index() === 3) {

	} else if ($(this).index() === 4) {

	} else if ($(this).index() === 5) {

	}
},300));
$(".order-list").on("click", "div.delete-btn", function() {
	var orderId = $(this).attr("data-orderNumber");
	console.log(orderId);
	
	layer.open({
		content: '请确认是否要删除',
		btn: ['删除', '取消'],
		yes: index => {
			$.myAjax({
				url: `/order/remove/${orderId}`,
				success: data => {
					$(this).parents("li").remove();
				}
			});
			layer.close(index);
		}
	});
});
$(".order-list").on("click", "div.pay-btn", function() {
	var orderId = $(this).attr("data-orderNumbers");
	var str = orderId;
	console.log(str)
	layer.open({
		content: '请确认是否要付款',
		btn: ['确认', '取消'],
		yes: index => {
			layer.close(index);
			window.location.href = `/pay/index.html?str=${str}`;
		}
	});
});
$(".order-list").on("click", "div.pay-btn", function() {
	var orderId = $(this).attr("data-orderNumbers");
	var str = orderId;
	console.log(str)
	layer.open({
		content: '请确认是否要付款',
		btn: ['确认', '取消'],
		yes: index => {
			layer.close(index);
			window.location.href = `/pay/index.html?str=${str}`;
		}
	});
});
$(".order-list").on("click", "div.againBuy-btn", function() {
	var orderId = $(this).attr("data-orderNumbers");
	var str = orderId;
	console.log(str)
	layer.open({
		content: '请确认是否要再次购买',
		btn: ['确认', '取消'],
		yes: index => {
			layer.close(index);
			window.location.href = `/pay/index.html?str=${str}`;
		}
	});
});
$(".page-header-left").on("click", function(){
	window.location.href = "/profile/index.html";
});