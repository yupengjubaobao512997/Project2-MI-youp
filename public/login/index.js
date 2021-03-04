var id = window.location.search.substring(4);
$('button.btn-toggle').on('click', function () {
    $('.login-phone, .login-pwd').toggleClass('show');
});
$('button.btn-login-phone').on('click', function () {
    alert('手机号验证码登陆功能暂未开放，请切换为用户名和密码登录！');
});
$('button.btn-login-pwd').on('click', function () {
    $.ajax({
        url: "/user/login_pwd",
        type: "post",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            name: $('input.name').val().trim(),
            pwd: $('input.pwd').val()
        }),
        success: function (result) {
            if (result.code === 200) {
                sessionStorage.setItem("token", result.data);
                sessionStorage.setItem("name", $('input.name').val().trim());
				if (document.referrer.indexOf("cart") !== -1) {
					window.location.replace("/cart/index.html")
				} else if(document.referrer.indexOf("detail") !== -1){
					window.location.replace(`/detail/index.html?id=${id}`)
				} else if(document.referrer.indexOf("address") !== -1){
					window.location.replace(`/address/index.html`)
				}else {
					window.location.replace("/profile/index.html");
				}
            } else {
                alert(result.msg)
            }
        }
    })
});
$('p.register-btn').on('click', function () {
    window.location.replace("/register/index.html");
});