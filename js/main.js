window.onload = function() {
    var coOrdinates = initScene();
    initialAnimation(coOrdinates);
    activateScreenTable();
};

window.onresize = setScreen;

function initScene() {
    var init = setScreen();
    TweenLite.set($('#projector, #presentationMenu li'), { opacity: 0 });
    TweenLite.to('body', 0.3, { opacity: 1 });
    textToSpan(document.getElementById('hydMsg'));
    return init;
}

function activateScreenTable() {
    $('#presentationMenu li a').on('click', function() {
        $('#presentationMenu li a.active').removeClass('active');
        $(this).addClass('active');
        TweenLite.to(this, 0.5, { scale: 1.3 });
        TweenLite.to('#projector', 1, { opacity: 1 });
    });
}

function initialAnimation(point) {
    var storyAnime = new TimelineMax();
    storyAnime
        .to(hall, 2, { // change while deployment
            scale: 1.8,//1.75,
            ease: SlowMo.ease.config(0.2, 0.2, false),
            delay: 2,
            transformOrigin: '50% 50%'
        })
        .fromTo($('.trapezoid'), 1.3, {
            scale: 0,
            opacity:0,
            borderRadius: 100
        }, {
            opacity: .3,
            scale: 1,
            borderRadius: 0,
            ease: Power2.easeInOut
        })
        .to($('.trapezoid'), .5, {
            opacity: 1,
            ease: Power2.easeInOut
        })
        .staggerFromTo($('#presentationMenu li'), 0.7, {
            scale: 0,
            borderRadius: 100
        }, {
            opacity: 1,
            scale: 1,
            borderRadius: 0,
            ease: Power2.easeInOut
        }, 0.3)
        .staggerTo($('#presentationMenu li a i'), 0.7, {
            css: { color: "rgb(104, 250, 233)" }
        }, 0.3)
        .staggerTo($('#presentationMenu li a i'), 0.7, {
            css: { color: "" },
        }, 0.3);
}

function setRoomLight(elem, brightness, delay) {
    TweenLite.to(elem, 1, { css: { 'filter': 'brightness(' + brightness + ')' }, delay: delay });
}

function textToSpan(ele) {
    ele.innerHTML = ele.innerHTML.trim().replace(/./g, "<span class='l'>$&</span>").replace(/\s/g, " ");
}

function setScreen() {
    var top, left, height, width, sideBuffer, perspectiveOriginX, perspectiveOriginY, currentScale;

    //save current scale
    currentScale = $('#hall')[0]._gsTransform ? $('#hall')[0]._gsTransform.scaleX : 1;

    //reset scale for calculation
    TweenLite.set('#hall', { scale: 1, perspective: 10000 });

    //ratio calc
    perspectiveOriginX = 900 * $('#officeroom').width() / 1800;
    perspectiveOriginY = 535 * $('#officeroom').height() / 1080;
    top = 303 * $('#officeroom').height() / 1080; //303
    trapezoidTop = 687 * $('#officeroom').height() / 1080; //303
    height = 424 * $('#officeroom').height() / 1080;
    left = 600 * $('#officeroom').width() / 1800;
    width = 610 * $('#officeroom').width() / 1800;
    right = 604 * $('#officeroom').width() / 1800;

    sideBuffer = 0;

    //set the values
    $('#screen').css({ top: top, left: left, height: height, width: width });
    $('.trapezoid').css({ top: trapezoidTop, transformOrigin: '50% 0' });
    $('#hall').css({
        perspective: 200,
        perspectiveOriginX: perspectiveOriginX,
        perspectiveOriginY: perspectiveOriginY
    });
    $('#office').css({height: $('#officeroom').height()});
    TweenLite.set('#hall', { scale: currentScale });
    TweenLite.set('#screenTable', { rotationX: 90 });

    return {
        x : perspectiveOriginX,
        y : perspectiveOriginY
    }
}