(function() {
	if(!sessionStorage.getItem("token")){
		window.location.replace('/login/index.html')
	}else{
		$.myAjax({
		    url: "/address/list",
		    success: function (data) {
		        console.log(data.isDefault);
		        data.forEach(function (item) {
		            console.log(item.isDefault)
		            if (item.isDefault === 1) {
		                $(`
		                    <li class="address-item">
		                        <a href="/editAddress/index.html?str=${item.id}">
		                            <div class="address-list_left" >
		                                <div  class="address-list_left_top">
		                                    <div class="receiveName">${item.receiveName}</div>
		                                    <div class="receivephone">${item.receivePhone}</div>
		                                </div>
		                                <div class="address">
		                                    <span class="receiveRegion">${item.receiveRegion}</span>
		                                    <span class="receiveDetail">${item.receiveDetail}</span>
		                                </div>
		                            </div>
		                            <div class="sign">
		                                <img src="https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_edit_gray.png">
		                            </div>
		                        </a>
		                        <div class="default" data-id=${item.id}>
		                            <span class="default-show show">默认地址</span>
									<button class="default-btn" data-id=${item.id}>设为默认地址</button>
		                        </div>
		                    </li>
		                `).appendTo($("ul.address-list"));
		            }else{
		                $(`
		                    <li class="address-item">
		                        <a href="/editAddress/index.html?str=${item.id}">
		                            <div class="address-list_left" >
		                                <div  class="address-list_left_top">
		                                    <div class="receiveName">${item.receiveName}</div>
		                                    <div class="receivephone">${item.receivePhone}</div>
		                                </div>
		                                <div class="address">
		                                    <span class="receiveRegion">${item.receiveRegion}</span>
		                                    <span class="receiveDetail">${item.receiveDetail}</span>
		                                </div>
		                            </div>
		                            <div class="sign">
		                                <img src="https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_edit_gray.png">
		                            </div>
		                        </a>
		                        <div class="default">
									<span class="default-show">默认地址</span>
		                            <button class="default-btn show" data-id=${item.id}>设为默认地址</button>
		                        </div>
		                    </li>
		                `).appendTo($("ul.address-list"));
		            }
		
		        });
		    }
		});
	}
})()

$('.address-content_btn').on('click', function () {
    window.location.href = "/newAddress/index.html";
})
$('.iconback').on('click', function () {
    window.location.href = "/profile/index.html";
})
$('ul.address-list').on('click',".default-btn", function () {
    var addressId= this.dataset.id;
	console.log(addressId)
    $.myAjax({
        url: `/address/set_default/${addressId}`,
        success:  data => {
			var a = $(this).removeClass("show").siblings().addClass("show")
				.parents(".address-item")
				.siblings().find(".default-show")
				.removeClass("show").siblings().addClass("show");
        }
    })
    
})

