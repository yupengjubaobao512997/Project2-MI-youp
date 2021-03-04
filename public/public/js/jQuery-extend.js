$.extend({
    myAjax: function (userOptions) {
        var defaultOptions = {
            type: "get",
            headers: {
                "Authorization": sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        };
        var options = Object.assign({}, defaultOptions, userOptions);
        if (options.data) options.data = JSON.stringify(options.data);
        options.success = function (result) {
            if (result.code === 200) {
                userOptions.success(result.data);
            } else {
                alert(result.msg);
            }

        }
        $.ajax(options);
    },
    debounce: function (func, wait) {
        var lock = false;
        return function (args) {
            if (lock) return;
            lock = true;
            setTimeout(function () { lock = false }, wait);
            func.call(this,args);
        }
    }

})