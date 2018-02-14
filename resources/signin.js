$(document).ready(init);

var fs = false;
var fsLoc = [0,0];
var chatOpen = true;
var iconSelected = false;
var homeOpen = false;

function init(){
    $('.square:nth-child(4)').on('click',minimizeWindow);
    $('.open-app').on('click',barAppClick);
    $('.square:nth-child(3)').on('click',maximizeWindow);
    $('.begin-menu li').on('click',setWallpaper);
    $('.begin-button').on('click',openBeginMenu);
    $(document).on('click',deselect);
    $('.desktop-icon p').on('click',highlightIcon);
    $('.desktop-icon').on('dblclick',openApp);
    $('.square:nth-child(2)').on('click',closeWindow);
    $('.container , .home-container').on('mousedown',focusWindow);
    $('.color').on('click',selectColor);
    $('.submit').on('click',enterChat);

    $('.container').draggable({
        cancel: '.container div, .container div *, .home-container div, .home-container div *',
        revert: 'invalid',
        revertDuration: 200,
        scroll: false
    });

    $('#desktop').droppable({
        tolerance: 'pointer',
        accept: '.container'
    });

    if (localStorage.getItem('userName')) {
        $('input').val(localStorage.getItem('userName'));
    }

    if (localStorage.getItem('background')) {
        $('body').addClass(localStorage.getItem('background'));
    }

    if (localStorage.getItem('background') || localStorage.getItem('userName') || localStorage.getItem('color')){
        fillOutConfig();
    }

    timeNow()

    var timeKeeper = setInterval(timeNow,30000);
}

function minimizeWindow(){
    let app = $(this).parent().attr('class').split(' ')[1];
    $('.container.'+app).hide().css('z-index','10');
    $('.open-app.'+app).addClass('close-app');
}

function maximizeWindow(){
    app = $(this).parent().attr('class').split(' ')[1];

    if (fs) {
        $('#desktop > .'+app).attr('style','top: '+fsLoc[0]+'; left: '+fsLoc[1]+'; display: block; z-index: 20');
        fs = false;
    } else {
        fsLoc = [$('#desktop > .'+app).css('top'),$('#desktop > .'+app).css('left')]
        $('#desktop > .'+app).css({'width':'100%','height':'100%','top':'0','left':'0'});
        fs = true;
    }
}

function enterChat(){
    let name = $('#namefield').val();
    if (name.length > 2) {
        $('.warning').text('');
        localStorage.setItem('userName',name);
        // $('#namefield').val('');
        $('.mainbody').hide();
        $('iframe').attr('src','./main-chat.html');
        $('.chatbody').show();

        fillOutConfig();
    } else {
        $('.warning').css('color','red').text('User name must be at least 3 characters');
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

function setWallpaper(){
    let newClass = $(this).text();
    $('body').attr('class','');
    $('body').addClass(newClass);
    localStorage.setItem('background',newClass);
    fillOutConfig();
}

function openBeginMenu(event){
    event.stopPropagation();
    console.log('begin click');
    $('.begin-menu').toggle();
}

function deselect(){
    $('.begin-menu').hide();
    $('.desktop-icon p').removeClass('highlighted');
    iconSelected = false;
}

function highlightIcon(event){
    if (iconSelected){
        deselect();
    }
    event.stopPropagation();
    let icon = $(event.target).parent().attr('class').split(' ')[1];
    $('.desktop-icon.' + icon + ' p').addClass('highlighted');
    iconSelected = true;
}

function closeWindow(){
    let app = $(this).parent().attr('class').split(' ')[1];
    if (app === 'chatapp'){
        $('.mainbody').show();
        $('iframe').attr('src','');
        $('.chatbody').hide();
    }
    $('.open-app').addClass('close-app');
    $('.open-app.'+app).hide();
    $(this).parent().hide();
}

function openApp(){
    let app = $(this).attr('class').split(' ')[1];
    $('.container.'+app).show();
    $('.container').css('z-index','10');
    $('.container.'+app).css('z-index','20');
    $('.open-app').addClass('close-app');
    $('.open-app.'+app).css('display','inline-block').removeClass('close-app');
}

function focusWindow(){
    let target = $(this).attr('class').split(' ')[1];
    $('.container').css('z-index','10');
    $('.container.'+target).css('z-index','20');
    $('.open-app').addClass('close-app');
    $('.open-app.'+target).removeClass('close-app');
}

function barAppClick() {
    let app = $(this).attr('class').split(' ')[1];
    if ($('.open-app.'+app).hasClass('close-app')){
        $('.container.'+app).show();
        $('.container').css('z-index','10');
        $('.container.'+app).css('z-index','20');
        $('.open-app').addClass('close-app');
        $('.open-app.'+app).css('display','inline-block').removeClass('close-app');
    } else {
        $('.container.'+app).hide().css('z-index','10');
        $('.open-app.'+app).addClass('close-app');
    }
}


function fillOutConfig(){
    var $ul = $('<ul>');
    var $username = $('<li>').text('User Name: '+(localStorage.getItem('userName') || '[None Set]'));
    var $color = $('<li>').text('User Color: '+(localStorage.getItem('color') || '[None Set]'));
    var $bg = $('<li>').text('User Background: '+(localStorage.getItem('background') || '[None Set]'));
    $ul = $ul.append($username,$color,$bg);
    $('#userinfo').empty().append($ul,'<p>Username and color can be changed in the chat app. Background can be changed in the "Begin" menu.</p>');
}
