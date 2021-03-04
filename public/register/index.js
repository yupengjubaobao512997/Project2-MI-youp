var demo = $('form.demo-pwd').Validform({
	tiptype: 3,
	datatype: {
		"username": function(gets, obj, curform) {
			var reg = /^[a-zA-Z0-9_]{4,16}$/;
			if (!reg.test(gets)) return false;
			var results;
			$.myAjax({
				url: `/user/check_name/${gets}`,
				async: false,
				success: function(data) {
					console.log(data)
					results = data === 1 ? '用户名已存在' : true;
				}
			});
			return results;
		},
		"userPhone": function(gets, obj, curform) {
			var reg = /^1\d{10}$/;
			console.log(gets);
			if (!reg.test(gets)) return false;
			var result;
			$.myAjax({
				url: `/user/check_phone/${gets}`,
				async: false,
				success: function(data) {
					console.log(data)
					result = data === 1 ? '该手机号已存在' : true;
				}
			});
			return result;
		}
	}
});




$('button.btn-register-pwd').on('click', function() {
	var name = $("input.name").val();
	var pwd = $("input.pwd-input").val();
	var phone = $("input.phone-input").val();
	console.log(pwd);
	$.myAjax({
		url: "/user/register",
		type: "post",
		data: {
			name,
			pwd,
			phone
		},
		success: data => {
			console.log(1111);
			window.location.replace("/login/index.html")
		}
	})
});
$('button.btn-toggle').on('click', function() {
	console.log(1111)
	$('.phone, .pwd').toggleClass('show');
});
