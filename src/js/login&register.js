//点击之后改变标题对应的样式以及下划线
function loginTitle(){
    $('#larBox .larBoxTitle span:eq(0)').attr('class','bottomLine').css("font-size","28px");
    $('#larBox .larBoxTitle span:eq(1)').css("font-size","26px").removeClass('bottomLine');
}
function registerTitle(){
    $('#larBox .larBoxTitle span:eq(1)').attr('class','bottomLine').css("font-size","28px");
    $('#larBox .larBoxTitle span:eq(0)').css("font-size","26px").removeClass('bottomLine');
};
//登录标题
$('#larBox .larBoxTitle span:eq(0)').on('click',function(){
    loginTitle();
    $('#larBox .login').css("display","block");
    $('#larBox .register').css("display","none");
});
//注册标题
$('#larBox .larBoxTitle span:eq(1)').on('click',function(){
    registerTitle();
    $('#larBox .register').css("display","block");
    $('#larBox .login').css("display","none");
});