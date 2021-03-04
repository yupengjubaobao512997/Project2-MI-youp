var cid = window.location.search.substring(5);
var sort = "desc";
var kind = "price";
var ordinal = 0;
var isLoading = true;
var Name = "";
console.log(Name);
var MyAjax = function () {
	$.myAjax({
		url: "/product/list",
		type: 'post',
		data: {
			name: Name,
			cid: `${cid}`,
			orderCol: kind,
			orderDir: sort,
			begin: ordinal,
			pageSize: 6
		},
		success: function (data) {
			if (data.length < 6) {
				isLoading = false;
			};
			data.forEach(function (item) {
				$(
					`
						<li>
							<a href="/detail/index.html?id=${item.id}" >
								<div class="page-content-list_left"><img src="${item.avatar}" ></div>
								<div class="page-content-list_right">
									<h3 class="productName">${item.name}</h3>
									<div class="brief">${item.brief}</div>
									<div class="features"></div>
									<div class="price">￥<span>${item.price}</span></div>
									<div class="sale">销量：<span>${item.sale}</span></div>
									<div class="comment">好评：<span>${item.rate}</span></div>
								</div>
							</a>
						</li>
				`
				).appendTo($("ul.page-content-list"))
			})
		}
	})
}
$(".search_input").on("change",function(){
	isLoading = true;
	$("ul.page-content-list").empty();
	Name = $(this).val();
	MyAjax();
})
MyAjax();
$(".page-content-options").on('click', "li", $.debounce(function () {
	ordinal = 0;
	isLoading = true;
	if ($(this).index() === 0) {
		$('.asc, .desc').toggleClass('appear');
		if (sort === "asc") {
			$("ul.page-content-list").empty();
			MyAjax();
			sort = "desc";
		} else if (sort === "desc") {
			$("ul.page-content-list").empty();
			MyAjax();
			sort = "asc";
		}
	} else if ($(this).index() === 1) {
		$(this).addClass('show').siblings().removeClass('show');
		if (kind === "price") {
			$("ul.page-content-list").empty();
			MyAjax();
		} else if (kind != "price") {
			$("ul.page-content-list").empty();
			kind = "price";
			MyAjax();
		}
	} else if ($(this).index() === 3) {
		$(this).addClass('show').siblings().removeClass('show');
		if (kind === "sale") {
			$("ul.page-content-list").empty();
			MyAjax();
		} else if (kind != "sale") {
			$("ul.page-content-list").empty();
			kind = "sale";
			MyAjax();
		}
	} else if ($(this).index() === 2) {
		$(this).addClass('show').siblings().removeClass('show');
		if (kind === "rate") {
			$("ul.page-content-list").empty();
			MyAjax();
		} else if (kind != "rate") {
			$("ul.page-content-list").empty();
			kind = "rate";
			MyAjax();
		}
	}
}, 1000));
$("div.page-content_buttum").scroll(function () {
	if (isLoading == false) return;
	var height = $(".page-content-list").innerHeight() - $(this).innerHeight();
	if ($(this).scrollTop() >= height - 1) {
		ordinal += 6;
		MyAjax();
		
	}
});
$(".model").on('click', function () {
	$('.iconList, .iconcate').toggleClass('show');
	var ul = $(".page-content-list");
	$(ul).toggleClass('cate');
	console.log(ul);
});
$('.back-btn').on("click", function () {
	window.location.href = "/category/index.html"
})
