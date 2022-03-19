$(function() {

    // 获取用户信息的函数

    function getUserMeg() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',

            // 权限的接口的请求头
            // 将请求头放置在baseAPI中，有权限的接口才设置
            // headers: {
            //     Authorization: localStorage.getItem("token")
            // },

            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户信息失败")
                }

                renderAvatar(res.data);


            },

            // 在baseAPI中挂载complete函数

            // 控制用户的访问权限，不登录时不可以访问首页
            // 使用complete函数，无论请求成功或失败都会执行
            // complete: function(res) {
            //     // 获取服务器的响应数据
            //     console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //         // 1.清空本地存储
            //         localStorage.removeItem("token");
            //         // 跳转到登录页

            //         location.href = "../../login.html"
            //     }
            // }
        })
    }

    getUserMeg();

    // 渲染头像部分
    function renderAvatar(user) {
        var uname = user.nickname || user.username

        $(".avatar .welcome").html(uname);


        if (user.user_pic) {
            $(".layui-nav-img").attr('src', user.user_pic).show;
            $(".text-avatar").hide();
        } else {
            $(".layui-nav-img").hide();


            var ch = uname[0].toUpperCase();
            $(".text-avatar").html(ch).show();
        }



    }

    // 用户退出部分
    var layer = layui.layer;
    $(".signOut").on("click", function() {

        // 询问是否需要退出
        layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function(index) {

            // 清除本地存储

            localStorage.removeItem("token");

            // 2.跳转到登录页

            location.href = '../../login.html'

            layer.close(index);
        });


    })



})