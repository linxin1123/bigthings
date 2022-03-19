// jQuery中的  
// jQuery.ajaxPrefilter( [dataTypes] , handler(options, originalOptions, jqXHR) ) 

// 每次发起ajax，post，get请求时都会先调用这个函数


// 参数options代表配置项
$.ajaxPrefilter(function(options) {
    // 拼接获取到的url地址

    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);

    // 为由权限的接口设置请求头

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {

            Authorization: localStorage.getItem("token")

        }
    }

    options.complete = function(res) {
        // 获取服务器的响应数据
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1.清空本地存储
            localStorage.removeItem("token");
            // 跳转到登录页

            location.href = "../../login.html"
        }
    }
})