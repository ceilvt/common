//先将jquery文件引入
//@musicDir mp3,play.png,pause.png目录
//@musicName mp3名字
function addMusic(musicDir,musicName){
    var style='#music_wrap{width:30px;position:absolute;top:20px;right:20px;font-size:0}.musicRotate{animation:1s linear infinite linerotate;-webkit-animation:1s linear infinite linerotate}@keyframes linerotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@-webkit-keyframes linerotate{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}#music_wrap img{width:100%;display:block}';
    var music_style = $('<style></style>');
        music_style.attr({'type':'text/css'});
        music_style.html(style);
    var music_div = $('<div id="music_wrap"><img src="'+musicDir+'play.png"'+'></div>');
        music_div.addClass('musicRotate');
    var audio = $('<audio id="music"></audio>');
        audio.attr({'src':musicDir+'/'+musicName+'.mp3','autoplay':'true','loop':true});
    $('body').append(audio);
    $('body').append(music_div);
    $('head').append(music_style);
    $("body").delegate("#music_wrap","touchstart",function(){
        //$(this).toggleClass('musicRotate');
        if($('#music')[0].paused){
            $(this).addClass('musicRotate');
            $('#music_wrap img').attr({'src':musicDir+'play.png'});
            $('#music')[0].play();
        }else{
            $(this).removeClass('musicRotate');
            $('#music_wrap img').attr({'src':musicDir+'pause.png'});
            $('#music')[0].pause();
        };
    });

}