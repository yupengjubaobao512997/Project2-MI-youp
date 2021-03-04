var str = window.location.search.substring(5);
var addressId;
var ARR;
var arr;
if (document.referrer.indexOf("settlement") !== -1) {
	arr = str.split("=");
	addressId = arr[arr.length-1];
} else {
	addressId = str;
	console.log(addressId);
}


$.myAjax({
	url: `/address/model/${addressId}`,
	success: function(data) {
		$(".receiveName_input").val(data.receiveName);
		$(".receivePhone_input").val(data.receivePhone);
		$(".regions-picker").val(data.receiveRegion);
		$(".receiveDetail_input").val(data.receiveDetail);
	}
})

$('div.delete_btn').on('click', function() {
	layer.open({
		content: '请确认是否要删除',
		btn: ['删除', '取消'],
		yes: function(index) {
			$.myAjax({
				url: `/address/remove/${id}`,
				success: function(data) {}
			})
			layer.close(index);
			window.location.replace("/address/index.html");

		}

	});
})
$(".save_butn").on('click', function() {
	console.log(123213213)
	$.myAjax({
		url: "/address/update/",
		type: "post",
		data: {
			id: `${addressId}`,
			receiveName: $('.receiveName_input').val(),
			receivePhone: $('.receivePhone_input').val(),
			receiveRegion: $('.regions-picker').val(),
			receiveDetail: $('.receiveDetail_input').val()
		},
		success: function(data) {
			if (document.referrer.indexOf("settlement") !== -1) {
				window.location.replace(`/settlement/index.html?str=${str}`)
			} else {
				window.location.replace("/address/index.html");
			}
		}
	});

})
$('.iconback').on('click', function() {
	window.location.href = "/address/index.html";
})
