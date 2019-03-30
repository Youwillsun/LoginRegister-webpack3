//注册页面的交互
$(function () {
    //1.正则表达式，用户输入的数据是否合法
    //正则表达式————验证账号格式
    var isUserAccount = /^\d{9}$/;
    //正则表达式————密码是否为10~16位
    var isUserPassword = /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{10,16}/;
    //正则表达式————判断手机号格式
    var isUserPhoneNumber = /^1(3|4|5|7|8)\d{9}$/;

    //总体判断，当输入正确，阀门值为true，否则为false
    var flag = true;

    //2.获取文本框值
    //判断账号
    $('#larBox #registerForm #account').on('blur', function () {
        if (isUserAccount.test($('#larBox #registerForm #account').val())) {
            $('#larBox #registerForm #account').attr('class', 'form-control');
            flag = true;
        } else {
            $('#larBox #registerForm #account').attr('class', 'form-control warnAccount');
            flag = false;
        }
    });
    //判断初次密码，密码的任何改变都以初次输入的密码为准
    $('#larBox #registerForm #password').on('blur', function () {
        var userPassword = isUserPassword.test($('#larBox #registerForm #password').val());
        //如果再次输入密码框为空，则只判断格式
        if ($('#larBox #registerForm #againPassword').val() == '') {
            if (userPassword) {
                $('#larBox #registerForm #password').attr('class', 'form-control');
                flag = true;
            } else {
                $('#larBox #registerForm #password').attr('class', 'form-control warnPassword');
                flag = false;
            }
        } else {
            //如果再次输入密码框不为空，判断二者是否相等
            var againUserPasword = isUserPassword.test($('#larBox #registerForm #againPassword').val());
            if ($('#larBox #registerForm #password').val() === $(
                    '#larBox #registerForm #againPassword')
                .val() && userPassword && againUserPasword) {
                $('#larBox #registerForm #password').attr('class', 'form-control');
                $('#larBox #registerForm #againPassword').attr('class', 'form-control');
                flag = true;
            } else {
                $('#larBox #registerForm #againPassword').attr('class', 'form-control warnPassword');
                flag = false;
            }
        }
    });
    //判断两次输入的密码是否一致
    $('#larBox #registerForm #againPassword').on('blur', function () {
        var againUserPasword = isUserPassword.test($('#larBox #registerForm #againPassword').val());
        if ($('#larBox #registerForm #againPassword').val() === $('#larBox #registerForm #password')
            .val() && againUserPasword) {
            $('#larBox #registerForm #againPassword').attr('class', 'form-control');
            flag = true;
        } else {
            $('#larBox #registerForm #againPassword').attr('class', 'form-control warnPassword');
            flag = false;
        }
    });
    //判断手机号格式是否正确
    $('#larBox #registerForm #phoneNumber').on('blur', function () {
        var userPhoneNumber = isUserPhoneNumber.test($('#larBox #registerForm #phoneNumber').val());
        if (userPhoneNumber) {
            $('#larBox #registerForm #phoneNumber').attr('class', 'form-control');
            flag = true;
        } else {
            $('#larBox #registerForm #phoneNumber').attr('class', 'form-control warnPhoneNumber');
            flag = false;
        }
    });

    //3.防止出现文本出错但未修改情况，以及文本为空，
    //进行本地存储
    $('#larBox #registerBtn').on('click', function () {
        if (!flag) {
            alert('注册文本有误，请修改！');
            return false;
        } else if (flag) {
            if ($('#larBox #registerForm #account').val() == '' || $(
                    '#larBox #registerForm #password').val() == '' || $(
                    '#larBox #registerForm #againPassword').val() == '' || $(
                    '#larBox #registerForm #phoneNumber').val() == '') {
                alert('文本不能为空');
                return false;
            } else {
                //获取账号和密码
                var account = $('#larBox .register #account').val();
                var password = $('#larBox .register #password').val();
                //把账号和密码存入localStorage中保存
                localStorage.setItem('Account', account);
                localStorage.setItem('Password', password); 
                alert('注册成功');
                window.location.reload();
            }
        }
    });
});

//登录页面的交互
$(function () {
    $('#larBox #loginBtn').on('click', function () {
        // 获取本地存储中的账号和密码
        var account = localStorage.getItem('Account');
        var password = localStorage.getItem('Password');
        if (account == null || password == null) {
            alert('您还未注册账号!');
        }
        // 如果密码为空则进行提示
        else if ($('#larBox #login #loginAccount').val() == '' || $('#larBox #login #loginPassword').val() == '') {
            alert('账号或密码不能为空！');
        } else if ($('#larBox #login #loginAccount').val() != account || $('#larBox #login #loginPassword').val() != password) {
            alert('账号或密码有误!');
        } else {
            alert('你已经登录成功啦！');
        }
    });
});
//登录界面密码提示
$('#larBox .prompt .forgetPwd').on('click',function(){
    window.event.preventDefault();
    passwordTips();
})
$('#larBox .prompt .logonProblem').on('click',function(){
    window.event.preventDefault();
    passwordTips();
})
function passwordTips() {
    var account = localStorage.getItem('Account');
    var password = localStorage.getItem('Password');
    if (account == null || password == null) {
        alert('您还未注册账号！');
    } else {
        alert('账号：' + account + '密码：' + password);
    }
}