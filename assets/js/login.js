(function() {
    $(".tip_login").on("click", function() {
        $(".regbox").hide().siblings(".loginbox").show();
    })

    $(".tip_reg").on("click", function() {
        $(".loginbox").hide().siblings(".regbox").show();
    })


    var form = layui.form;

    // 使用layui的提示框组件
    var layer = layui.layer;

    //各种基于事件的操作，下面会有进一步介绍

    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        // 定义一个确认两次密码一致的规则
        repass: function(value) {
            if (value !== $(".reg_pwd").val()) {
                return '两次密码不一致';
            }

        }
    });

    // 监听注册表单的提交事件

    $(".reg_form").on("submit", function(e) {
        // 阻止默认事件
        e.preventDefault();
        // 发起get请求

        $.post(
            "/api/reguser", {
                username: $(".reg_user").val(),
                password: $(".reg_pwd").val()
            },

            function(res) {
                if (res.status != 0) {
                    // 使用提示框组件
                    layer.msg(res.message);
                    // console.log(res.message);
                } else {
                    // console.log('注册成功');
                    layer.msg('注册成功,请登录');
                    // 自动跳转到登录页面
                    $(".tip_login").click();
                }
            }

        )
    })

    // 监听登录表单的登录事件
    $(".login_form").on("submit", function(e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/api/login",
            data: $(".login_form").serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败")
                }

                layer.msg("登录成功");

                // 将登录成功的权限获取出来

                localStorage.setItem("token", res.token);

                // 跳转到首页
                // location.href = '/index.html';
            }
        })

        // $.post(
        //     "http://www.liulongbin.top:3007/api/login", {
        //         username: $(".login_user").val(),
        //         password: $(".login_pwd").val()
        //     },

        //     function(res) {
        //         if (res.status != 0) {
        //             // 使用提示框组件
        //             layer.msg(res.message);
        //             // console.log(res.message);
        //         } else {
        //             // console.log('注册成功');
        //             layer.msg('注册成功,请登录');
        //             // 自动跳转到登录页面
        //             // $(".tip_login").click();
        //         }
        //     }

        // )
    })

})();