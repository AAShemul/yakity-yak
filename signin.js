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
        $('input').val(localStorage.getItem('userName'));
    }

    $('.color').on('click',selectColor);
    timeNow()

    var timeKeeper = setInterval(timeNow,30000);
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
    if (name.length > 2) {
        $('.warning').text('');
        localStorage.setItem('userName',name);
        $('#namefield').val('');
        $('.mainbody').hide();
        $('iframe').attr('src','./main-chat.html');
        $('.chatbody').show();
    } else {
        $('.warning').text('User name must be at least 3 characters');
    }


}

function selectColor(){
    $('.color').removeClass('selected');
    $(this).addClass('selected');
    let color = $(this).attr('class').split(' ')[1];
    localStorage.setItem('color',color);
}


function timeNow(){
    let d = new Date();
    let hour = d.getHours();
    let min = d.getMinutes();
    let ampm = 'am';
    if (hour > 12){
        ampm = 'pm';
        hour -= 12;
    }
    if (min < 10 && min > 0){
        min = '0' + min;
    } else if (!min){
        min = '00';
    }
    $('.time-box span').text(`${hour}:${min}${ampm}`);
}
