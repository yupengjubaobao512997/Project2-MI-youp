$('ul.list-main').on('click', function (e) {
	var li = e.target.tagName === 'LI' ? e.target : e.target.parentNode;
	if ($(li).hasClass('active')) return;
	$('img.avatar').attr('src', li.dataset.avatar);
	$(li).addClass('active').siblings().removeClass('active');
	$.myAjax({
		url: `/category/list/${li.dataset.id}`,
		success: function (data) {
			$('ul.list-sub').empty().toggleClass('show', data.length > 0);
			$('p.empty').toggleClass('show', data.length === 0)
			data.forEach(function (item) {
				$(
					`
						<li>
							<a href="/list/index.html?cid=${item.id}">
								<img src="${item.avatar}" />
								<span>${item.name}</span>
							</a>
						</li>
					`
				).appendTo('ul.list-sub')
			})
		},

	})
})
$.myAjax({
	url: '/category/list/0',
	success: function (data) {
		//据回来的数据平成多个li放在ul.list-main中
			data.forEach(function (item) {
				$(
					`
					<li data-id=${item.id} data-avatar=${item.avatar}>
						<span>
							${item.name}
						</span>
					</li>
				`
				).appendTo($('ul.list-main'))
			});
			$('ul.list-main li').eq(0).trigger('click');
	}
});

