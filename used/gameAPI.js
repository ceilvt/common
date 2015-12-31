/**
 * Created by Administrator on 2015/11/10.
 */

window.ifPass = 0;

// 调用方法

function ToJson(date) {
    if (typeof (date) == "string") {
        return eval("(" + date + ")");
    }
    else {
        return date;
    }
}

var flag1 = false;
var flagTimeout = false;
//API1 获取游戏次数


function api1(){
    if(flag1){
        return;
    }
    setTimeout(function(){
        if(!flagTimeout){
            showTxt('请求超时！');
            return;
        }
        if(flag1){
            showTxt('网络异常！');
        }
    },10000); //10秒超时 网络异常

    flag1 = true;
    var url = configGame.baseURL+'draw/gameBegin';
    var param = {token:'back',gameId:1};
    //var jsondata = JSON.stringify(param);
    $.post(url, param, function (data) {
        //showTxt(data);
        flag1 = false;
        flagTimeout = false;
        if(data.status == -1){
            showTxt('系统异常,请重新登录');
        }else if(data.status == 0){
            showTxt('网络异常！');
        }else if(data.status == 1){
            if(data.num == 1){
                window['clearGuilder']['root']['clearGuilder']();
            }else{
                showTxt('3次机会已用完，记得明天再来！');
            }
        }
    });
}

var flag2 = false;
function api2(){
    setTimeout(function(){
        if(!flag2){
            showTxt('网络异常！');
            location.href = "game.html";
        }
    },10000); //10秒超时 网络异常

    //仅供测试
    //var arr = [1];
    //window.ifPass = arr[Math.round(Math.random()*arr.length)];
    //仅供测试


    var url = configGame.baseURL+'draw/gameEnd';
    var score = window.ifPass;
    var param = {token:'back',gameId:1,score:score};
    //var jsondata = JSON.stringify(obj);
    $.post(url, param, function (data) {
        flag2 = true;
        if(data.status == -1){
            showTxt('系统异常,请重新登录');
        }else if(data.status == 0){
            showTxt('游戏结束异常');
        }else if(data.status == 1){
            if(score == 1){
                location.href = '../game_success.html';
            }else{
                location.href = '../game_failure.html';
            }
        }
    });
}
function api3(){
    window.location = '../home.html';
}
//egret函数注册
function regestEgretAPI(name,func,root){
    window[name] = {
        'func':func,
        'root':root
    }
}
//显示提示文本
function showTxt(msg) {
    if(msg == ''){
        msg = '错误';
    }
    if($('.tips-panel').length == 0){
        $('body').append($('<div class="tips-panel" id="tips-panel"></div>'));
        $('.tips-panel').css({
            'font-size':'1rem',
            'display':'none',
            'opacity':0,
            'background':'#fff',
            'text-align':'center',
            'color':'#000',
            'padding':'10px',
            'position':'fixed',
            'z-index':'102',
            'left':'50%',
            'top': '50%',
            'width':'80%',
            '-webkit-box-sizing':'border-box',
            'box-sizing':'border-box',
            'max-width':'560px',
            '-webkit-transform':'translate(-50%,-50%)',
            'transform':'translate(-50%,-50%)',
            'border-radius':'0.2rem'
        });
    }
    $("#tips-panel").text(msg);
    $("#tips-panel").css({
        display: 'block'
    }).animate({
        opacity: 1
    });

    var timer = setTimeout(function () {
        $("#tips-panel").animate({ opacity: 0 }, function () {
            $(this).hide();
        });
    }, 3000);
}
