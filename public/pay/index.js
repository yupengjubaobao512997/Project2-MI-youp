var str = window.location.search.substring(5);
console.log(str);
$.myAjax({
	url: `/order/account/${str}`,
	success: data => {
		$(".money-num").text(data);
		$(".amount-Num").text(data);
	}
})

var m = 2;
var n = 9;
var M = 5;
var N = 9;

setInterval(function() {
	N--
	if(N === 0){
		M--;
		N = 9;
		if(M === 0) {
			n--;
			M = 5;
			if(n === 0) {
				n = 9;
				m--;
				if(n === 0) {
					m--;
					if(m === 0) {}
				}
			}
		}
	}
	$(".countDown").text(String(m) + n + '：' + M + N);
}, 1000)

setTimeout(function () {
	window.location.replace("/order/index.html");
},1800000)
$(".Alipay").on("click", function() {
	$(this).find("i").addClass("show").parents(".Alipay").siblings().find("i").removeClass("show");
})
$(".mi-wallet").on("click", function() {
	$(this).find("i").addClass("show").parents(".mi-wallet").siblings().find("i").removeClass("show");
})
$(".payment-btn").on("click", function() {
	$.myAjax({
		url: `/order/pay/${str}`,
		success: data => {
			window.location.replace("/order/index.html");
		}
		
	})
});
$(".page-header-left").on("click", function(){
	window.location.href = "/order/index.html";
});