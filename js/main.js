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
    textToSpan(document.getElementById('seatedMsg'));
    textToSpan(document.getElementById('turnOnMsg'));
    textToSpan(document.getElementById('turnOffMsg'));
    textToSpan(document.getElementById('visionMsg'));
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

function showTextTyping(ele, scale, initialDelay, timeScale, yoyo) {
    var $cursor = $(".text-caret"),
        revealInterval = 0.05,
        $chars = ele.find(".l"),
        tl = new TimelineMax({
            delay: initialDelay,
            repeat: yoyo?1:0,
            yoyo: yoyo,
            repeatDelay: 1,
            onRepeat: function() {
                tl.timeScale(1.8);
                TweenLite.set($cursor, { opacity: true });
            }
        });

    tl.call(blink); // this makes the cursor resume blinking after reversing
    tl.set($cursor, { opacity: 1 }, 0.1); // this makes it visible (not blinking) when playing forward

    //loop throug all the chars and make them visible AND set cursor to their right at same time
    $chars.each(function(index, element) {
        var $element = $(element);
        var offset = $element.position();
        var width = $element.width()/scale;
        tl.set($cursor, { left: offset.left + width + 2}, (index + 1) * revealInterval);
        tl.set($element, { autoAlpha: 1 }, (index + 1) * revealInterval);
    });

    tl.call(blink); // resume blinking after last character is revealed

    //enable the blinking cursor
    function blink() {
        TweenMax.fromTo($cursor, 0.5, { opacity: 0 }, { opacity: 1, repeat: -1, ease: SteppedEase.config(1) });
    }

    TweenLite.set(ele, { visibility: "visible" });
    tl.timeScale(timeScale);
    blink();
}

function getScale(){
    return 1.8;
}

function initialAnimation(point) {
    var scale = getScale();
    var storyAnime = new TimelineMax();
    var welcome = new TimelineMax({ delay: 0 });
    storyAnime
        .to(hall, 2, { // change while deployment
            scale: scale * 0.8,
            ease: SlowMo.ease.config(0.2, 0.2, false),
            delay: 6.3,
            transformOrigin: '50% 50%'
        })
        .to(hall, 1, { // change while deployment
            scale: scale,
            ease: SlowMo.ease.config(0.2, 0.2, false),
            delay: 5,
            transformOrigin: '50% 50%'
        })
        .fromTo($('.trapezoid'), 1.3, {
            scale: 0,
            opacity:0,
            borderRadius: 100
        }, {
            opacity: 0.3,
            scale: 1,
            borderRadius: 0,
            ease: Power2.easeInOut,
            delay:6
        })
        .to($('.trapezoid'), 0.5, {
            opacity: 1,
            ease: Power2.easeInOut
        })
        .to($('#presentation-logo'), 0.5, {
            autoAlpha: 1,
            ease: Power2.easeInOut
        })
        .to($('#presentation-logo'), 0.25, {
            scale: .3,
            ease: Back.easeInOut
        })
        .to($('#presentation-logo'), 0.25, {
            scale: .2,
            ease: Back.easeInOut,
            onComplete: function(){
                var elem = $('#officeroom, #chair');
                setRoomLight(elem, 0.6, 3);
            }
        })
        .to($('#presentation-logo'), 0.15, {
            scale: 0,
            delay:11,
            ease: Back.easeInOut
        })
        .staggerFromTo($('#presentationMenu li'), 0.7, {
            scale: 0,
            borderRadius: 100
        }, {
            opacity: 1,
            scale: 1,
            borderRadius: 0,
            ease: Power2.easeInOut,
            onComplete: function(){
                TweenLite.to('#projector', 1, { opacity: 1 });
            }
        }, 0.3);

    showTextTyping($('#hydMsg'), scale, 0, 0.5, true);
    showTextTyping($('#seatedMsg'), scale, 4, 0.6, true);
    showTextTyping($('#turnOnMsg'), scale, 8, 0.6, true);//real turn on :)
    showTextTyping($('#turnOffMsg'), scale, 12, 0.6, true);//it was quick! turn off now
    showTextTyping($('#visionMsg'), scale, 16, 0.6, false);
        /*

*/
}

function setRoomLight(elem, brightness, delay) {
    TweenLite.to(elem, 1, { css: { 'filter': 'brightness(' + brightness + ') hue-rotate(10deg) saturate(300%)' }, delay: delay });
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
    $('#office').css({ height: $('#officeroom').height() });
    TweenLite.set('#hall', { scale: currentScale });
    TweenLite.set('#screenTable', { rotationX: 90 });

    return {
        x: perspectiveOriginX,
        y: perspectiveOriginY
    };
}
