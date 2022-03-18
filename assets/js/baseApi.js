// jQuery中的  
// jQuery.ajaxPrefilter( [dataTypes] , handler(options, originalOptions, jqXHR) ) 

// 每次发起ajax，post，get请求时都会先调用这个函数


// 参数options代表配置项
$.ajaxPrefilter(function(options) {
    // 拼接获取到的url地址

    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);
})