$(document).ready(init);

var fs = false;
var fsLoc = [0,0];

function init(){
    $('.square:nth-child(4)').on('click',minimize);
    $('.open-app').on('click',minimize);
    $('.square:nth-child(3)').on('click',maximize);

    $('.container').draggable({
        cancel: '.container div, .container div *'
    });

    $('.submit').on('click',enterChat);

    if (localStorage.getItem('userName')) {
        $('.mainbody').hide();
        $('iframe').attr('src','./main-chat.html');
        $('.chatbody').show();
    }

    $('.color').on('click',selectColor)
}

function minimize(){
    $('.container').toggle();

    $('.open-app').toggleClass('close-app');
}

function maximize(){
    if (fs) {
        $('.container').attr('style','top: '+fsLoc[0]+'; left: '+fsLoc[1]+';');
        fs = false;
    } else {
        fsLoc = [$('.container').css('top'),$('.container').css('left')]
        $('.container').css({'width':'100%','height':'100%','top':'0','left':'0'});
        fs = true;
    }
}

function enterChat(){
    let name = $('#namefield').val();
    localStorage.setItem('userName',name);
    $('#namefield').val('');
    $('.mainbody').hide();
    $('iframe').attr('src','./main-chat.html');
    $('.chatbody').show();
}

function selectColor(){
    $('.color').removeClass('selected');
    $(this).addClass('selected');
}
