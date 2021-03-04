var reg = /.+\/(.+?)\/index.html$/;
var pageName = window.parent.location.href.match(reg)[1];
$(`li[data-page = ${pageName}]`).addClass('active');
$('li').on('click', function() {
	window.parent.location.href = `/${this.dataset.page}/index.html`
})