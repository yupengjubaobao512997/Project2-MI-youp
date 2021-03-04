var str = window.location.search.substring(5);
var STR
var ARR
var arr;
var editID;
var price, num;
var totalPrice = 0;
var addId;
var isD;

if (document.referrer.indexOf("editAddress") !== -1) {
	ARR = str.split('=');
	console.log(ARR);
	arr = ARR.slice(0, ARR.length - 1);
	str = arr.join("=");
	addId = ARR[ARR.length - 1];
	$.myAjax({
		url: `/address/model/${addId}`,
		success: data => {
			addId = data.id;
			$(
				`
				<div class="user-info">
					<div class="user-name">${data.receiveName}</div>
					<div class="user-phone">${data.receivePhone}</div>
				</div>
				<div class="address">
					<p class="address-content">
						${data.receiveRegion}${data.receiveDetail}
					</p>
				</div>
			`
			).appendTo($(".address-info"));
		}
	});
} else if(document.referrer.indexOf("newAddress") !== -1) {
	ARR = str.split('=');
	console.log(ARR);
	arr = ARR.slice(0, ARR.length - 1);
	str = arr.join("=");
	addId = ARR[ARR.length - 1];
	$.myAjax({
		url: `/address/model/${addId}`,
		success: data => {
			addId = data.id;
			$(
				`
				<div class="user-info">
					<div class="user-name">${data.receiveName}</div>
					<div class="user-phone">${data.receivePhone}</div>
				</div>
				<div class="address">
					<p class="address-content">
						${data.receiveRegion}${data.receiveDetail}
					</p>
				</div>
			`
			).appendTo($(".address-info"));
		}
	});
} else {
	arr = str.split('=');
	$.myAjax({
		url: "/address/get_default",
		success: data => {
			addId = data.id;
			console.log(addId);
			$(
				`
				<div class="user-info">
					<div class="user-name">${data.receiveName}</div>
					<div class="user-phone">${data.receivePhone}</div>
				</div>
				<div class="address">
					<p class="address-content">
						${data.receiveRegion}${data.receiveDetail}
					</p>
				</div>
			`
			).appendTo($(".address-info"));
		}
	});
}


$.myAjax({
	url: "/cart/list_ids",
	type: "post",
	data: {
		ids: arr
	},
	success: data => {
		data.forEach(item => {
			console.log(item.id)
			$(
				`
				<li class="product-list-item">
					<div class="product-info-content">
						<div class="product-img">
							<img src="${item.avatar}">
						</div>
						<div class="product-text">
							<h3 class="product-name">${item.name}</h3>
							<p class="product-price">
								<span class="product-per-price">￥<span class="price-num">${item.price}</span></span>
								<span class="product-num">*<span class="num">${item.count}</span></span>
							</p>
							<p class="salesReturn">7天无理由退货</p>
						</div>
					</div>
				</li>
			`
			).appendTo($(".product-list"))
		});
		fn();
		$(".price-Num").text(totalPrice);
	}
});
$.myAjax({
	url: "/address/list",
	success: data => {
		data.forEach(item => {
			isD = item.isDefault;
			$(
				`
					<li class="address-lest-item" data-addId="${item.id}">
						<div class="address-lest-item-container">
							<div class="address-lest-item_left">
								<div class="check">
									<i class="iconfont iconduihao"></i>
								</div>
								<div class="address-ifo">
									<div class="userIfo">
										<div class="userName">${item.receiveName}</div>
										<div class="userPhone">${item.receivePhone}</div>
									</div>
									<p class="userAddressIfo">${item.receiveRegion}${item.receiveDetail}</p>
								</div>
							</div>
							<div class="address-lest-item_right">
								<button class="modification-btn">
									<i class="iconfont iconxiugai"></i>
								</button>
							</div>
						</div>
					</li>
				`
			).appendTo($(".address-lest"));
			if (isD === 1) {
				$(".check").addClass("show");
			}
		});
	}
});
// $.myAjax({
// 	url: "/order/list_all",
// 	success: data => {
// 		console.log(data)
// 	}
// });
var fn = () => {
	for (var i = 0; i < $(".product-list-item").length; i++) {
		price = Number($(".price-num")[i].innerHTML);
		num = Number($(".num")[i].innerHTML);
		totalPrice += price * num;
		console.log(totalPrice);
	}
}

$(".submit-btn").on("click", function() {
	$.myAjax({
		url: "/order/confirm",
		type: "post",
		data: {
			ids: arr,
			account: `${totalPrice}`,
			addressId: `${addId}`
		},
		success: data => {
			console.log(data);
			var Str = data;
			window.location.href = `/pay/index.html?str=${Str}`;
		}
	});
	
})
$(".address-info").on("click", function() {
	$(".page-address").addClass("show");
})
$(".delete-btn").on("click", function() {
	$(".page-address").removeClass("show");
})
// $.myAjax({
// 	url: "/order/list_all",
// 	success: data => {
// 		console.log(data)
// 	}
// });

$("ul.address-lest").on("click", "li", function(e) {
	var e = e || window.event;
	editID = $(this).attr("data-addId");
	STR = str + "=" + editID;
	if ($(e.target).hasClass('iconxiugai')) {
		window.location.href = `/editAddress/index.html?str=${STR}`;
	}
	if ($(this).find('.check').hasClass('show')) {} else {
		$(this).find('.check').addClass("show").closest(".address-lest-item").siblings().find('.show').removeClass("show")
	}
	$.myAjax({
		url: `/address/model/${editID}`,
		success: data => {
			addId = data.id;
			$(".user-name").text(`${data.receiveName}`);
			$(".user-phone").text(`${data.receivePhone}`);
			$(".address-content").text(`${data.receiveRegion}${data.receiveDetail}`);
		}
	});
});
$(".newAdd-btn").on("click", function() {
	STR = str +"=" + addId;
	window.location.href = `/newAddress/index.html?str=${STR}`;
});
$(".page-header-container_left").on("click", function(){
	window.location.href = "/profile/index.html";
});