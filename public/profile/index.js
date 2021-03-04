$('div.page_outbox').on('click', function() {
	$('div.agree').css('display', 'flex');
})
$('div.agree-content_footer_left').on('click', function() {
	$('div.agree').css('display', 'none');
})
$('div.agree-content_footer_right').on('click', function() {
	window.location.href = "/login/index.html"
})
sessionStorage.getItem('token') ? $('.page-header_name').html(`<span>${sessionStorage.getItem('name')}</span>`).parent()
	.off() : $('.page-header_name').html(`<a href="" class="">请登录</a>`);
$('div.address').on('click', function() {
	window.location.href = "/address/index.html"
})
