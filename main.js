window.onload = function() {
    setScreen();

    textToSpan(document.getElementById('hydMsg'));
    var width = window.innerWidth;
    console.log('width ' + width);
    var logoX = width / 2 - 150;
    var options = {
        delay: 0
    };
    var officeAnime = new TimelineMax({
        options
    });
    var storyAnime = new TimelineMax({
        options
    });
    var nybg = new Image();
    nybg.src = 'img/nybg.jpg';
    if (nybg) { console.log('return true'); }

    var hall = $('#hall');

    storyAnime
        .to(hall, 3, { // change while deployment
            scale: 1.3,
            ease: Quad.easeIn,
            delay: .4,
        });

    $('#presentationMenu li').click(function() {
        $('#projector .data-container > *').removeClass('active');
        var menuId = $(this).attr('id').split('menuItem');
        var rawDataId = menuId[1];
        var dataId = '#projector .data-container .' + rawDataId + 'Data';
        $(dataId).toggleClass('active');
    });
};

function setRoomLight(elem, brightness) {
    console.log('called');
    TweenLite.to(elem, 1, { css: { 'filter': 'brightness(' + brightness + ')' }, delay: 14.5 });
}

function textToSpan(ele) {
    ele.innerHTML = ele.innerHTML.trim().replace(/./g, "<span class='l'>$&</span>").replace(/\s/g, " ");
}

function setScreen() {
    var top, left, height, width, sideBuffer;
    top = 303 * $('#officeroom').height() / 1080;//303
    height = 500 * $('#officeroom').height() / 1080;
    left = 600 * $('#officeroom').width() / 1800;
    width = 610 * $('#officeroom').width() / 1800;
    right = 604 * $('#officeroom').width() / 1800;
    sideBuffer = 30;
    $('#screen').css({ top: top, left: left, height: height, width: width });
}