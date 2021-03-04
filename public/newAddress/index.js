var str = window.location.search.substring(5);
console.log(window.location.search.substring(5))
var STR
var ARR
var arr;

if (document.referrer.indexOf("settlement") !== -1) {
	ARR = str.split("=");
	console.log(str)
} else {}
$('.save_butn').on('click', function() {
	
	if ($("input").text() != "") {
		$.myAjax({
			url: "/address/add",
			type: "post",
			data: {
				receiveName: $('.receiveName_input').val(),
				receivePhone: $('.receivePhone_input').val(),
				receiveRegion: $('.regions-picker').val(),
				receiveDetail: $('.receiveDetail_input').val()
			},
			success: function(data) {
				arr = ARR.slice(0, ARR.length - 1);
				str = arr.join("=");
				console
				if (document.referrer.indexOf("settlement") !== -1) {
					$.myAjax({
						url: "/address/list",
						success: function(data) {
							var newAdd = data[data.length - 1].id;
							STR = str + "=" + newAdd;
							window.location.replace(`/settlement/index.html?str=${STR}`);
						}
					})
				} else {
					window.location.replace("/address/index.html")
				}
			}
		})
	} else {
		if (document.referrer.indexOf("settlement") !== -1) {
			STR = str;
			console.log(str);
			window.location.replace(`/settlement/index.html?str=${STR}`);
		} else {
			window.location.replace("/address/index.html")
		}
	}
})
$(".iconback").on('click', function() {
	if (document.referrer.indexOf("settlement") !== -1) {
		STR = str;
		window.location.replace(`/settlement/index.html?str=${STR}`);
	} else {
		window.location.replace("/address/index.html")
	}

})
