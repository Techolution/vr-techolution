window.onload = function() {   
    if(window.innerWidth >480){
    var coOrdinates = initScene();
    initialAnimation(coOrdinates);
    activateScreenTable();
}
else{
    initialAnimationMobile();
    activateScreenTable();

    
}

};

window.onresize = setScreen;
function initialAnimationMobile(){
    var storyAnime = new TimelineMax();
    var welcome = new TimelineMax({delay: 4});
    var welcomeText = new TimelineMax({delay: 4});
    // var scale = getScale();
    //  welcomeText.add(showTextTyping($('#hydMsg'), scale, 0, 0.7, true, 0.01));
    // welcomeText.add(showTextTyping($('#turnOnMsg'), scale, 0, 0.7, true, 0.01));
    // welcomeText.add(showTextTyping($('#visionMsg'), scale, 0, 0.7, false, 0.01));

   

    welcome.add(
        TweenMax.to('#projector', 0.1, {
            opacity: 1,
            delay: 0
        }));

    welcome.add(
        TweenMax.to($('#presentation-logo'), 0.15, {
            scale: 0,
            ease: Back.easeInOut
        }));
    welcome.add(function(){
        $('.vision2020').addClass('active');
    });
    welcome.add(TweenMax.staggerFromTo($('#presentationMenu li'), 1.2, {
            scale: 0,
            borderRadius: 100
        }, {
            opacity: 1,
            scale: 0.8,
            borderRadius: 0,
            ease: Power2.easeInOut
        }, 0.3));
}
function initScene() {
    console.log("windowsize", window.innerWidth);
    if (window.innerWidth > 480) {
        var init = setScreen();
        $('.blinker-arrow').hide();
        TweenLite.set($('#hall'), { scale: getElevatorScale(), transformOrigin: '50% 50%' });
        TweenLite.set($('#projector, #presentationMenu li'), { opacity: 0 });
        //TweenLite.to('body', 0.3, { opacity: 1 });
        textToSpan(document.getElementById('hydMsg'));
        textToSpan(document.getElementById('seatedMsg'));
        textToSpan(document.getElementById('turnOnMsg'));
        textToSpan(document.getElementById('turnOffMsg'));
        textToSpan(document.getElementById('visionMsg'));
        return init;
    } else {
        //return;
    }
}

function getElevatorScale() {
    var doorHeight = $('.centerwall').height();
    var officeHeight = $('#office').height();
    //officeHeight * scale = doorHeight
    var scale = doorHeight / officeHeight;
    return scale;
}

function getCenterWallScale() {
    var doorWidth = $('.centerwall').width();
    //doorWidth * scale = window.innerWidth
    return window.innerWidth / doorWidth;
}

function activateScreenTable() {
    $('#presentationMenu').on('click', '#team', function() {
        $('#presentationMenu li a.active').removeClass('active');
        $(this).addClass('active');

        $('.data-container > .active').removeClass('active');
        $('.PeopleData').addClass('active');
    });
    $('#presentationMenu').on('click', '#settings', function() {
        $('#presentationMenu li a.active').removeClass('active');
        $(this).addClass('active');

        $('.data-container > .active').removeClass('active');
        $('.vision2020').addClass('active');
    });
    $('#presentationMenu').on('click', '#location', function() {
        $('#presentationMenu li a.active').removeClass('active');
        $(this).addClass('active');

        $('#presentationMenu').hide();
        $('#mapmenu').show();

        $('.data-container > .active').removeClass('active');
        $('.contactUsData').addClass('active');
    });
    activateMapLocations();
}

function activateMapLocations() {
    //hyd, nyc, mu, singapore
    //india, ny, africa, sng
    $('#mapmenu').on('click', '#ny', function() {
        $('#mapmenu .active').removeClass('active');
        $(this).addClass('active');
        $('.contactUsData > .active').removeClass('active');
        $('.contactUsData #nyc').addClass('active');
    });
    $('#mapmenu').on('click', '#india', function() {
        $('#mapmenu .active').removeClass('active');
        $(this).addClass('active');
        $('.contactUsData > .active').removeClass('active');
        $('.contactUsData #hyd').addClass('active');
    });
    $('#mapmenu').on('click', '#africa', function() {
        $('#mapmenu .active').removeClass('active');
        $(this).addClass('active');
        $('.contactUsData > .active').removeClass('active');
        $('.contactUsData #mu').addClass('active');
    });
    $('#mapmenu').on('click', '#sng', function() {
        $('#mapmenu .active').removeClass('active');
        $(this).addClass('active');
        $('.contactUsData > .active').removeClass('active');
        $('.contactUsData #singapore').addClass('active');
    });

    /*backbutton*/
    $('#mapmenu').on('click', '#back', function() {
        $('#mapmenu').hide();
        $('#presentationMenu').show();
    });

}

function showTextTyping(ele, scale, initialDelay, timeScale, yoyo, revealInterval) {
    var $cursor = $(".text-caret"),
        $chars = ele.find(".l"),
        tl = new TimelineMax({
            delay: initialDelay,
            repeat: yoyo ? 1 : 0,
            yoyo: yoyo,
            repeatDelay: 1,
            onRepeat: function() {
                tl.timeScale(1.5);
                TweenLite.set($cursor, { opacity: true });
            }
        });

    //tl.add(blink); // this makes the cursor resume blinking after reversing
    //tl.set($cursor, { opacity: 1 }, 0.1); // this makes it visible (not blinking) when playing forward

    //loop throug all the chars and make them visible AND set cursor to their right at same time
    $chars.each(function(index, element) {
        var $element = $(element);
        //var offset = $element.position();
        //var width = $element.width() * scale;
        //console.log("scale", scale, width);
        //tl.set($cursor, { left: offset.left + width + 2 }, (index + 1) * revealInterval);
        tl.set($element, { autoAlpha: 1 }, (index + 1) * revealInterval);
    });

    //tl.add(blink); // resume blinking after last character is revealed

    //enable the blinking cursor
    function blink() {
        TweenMax.fromTo($cursor, 0.5, { opacity: 0 }, { opacity: 1, repeat: -1, ease: SteppedEase.config(1) });
    }

    tl.add(TweenLite.set(ele, { visibility: "visible" }));
    tl.timeScale(timeScale);
    //tl.add(blink);
    return tl;
}

function getScale() {
    var seatingPoint = 500 * $('#officeroom').height() / 1080;
    //seatingPoint * scale = window.innerHeight
    var scale = window.innerHeight / seatingPoint;
    return Math.max(scale, 1);
}

function initialAnimation(point) {
    var scale = getScale();
    var elevatorScale = getCenterWallScale();
    var storyAnime = new TimelineMax();
    var welcome = new TimelineMax({ delay: 3 });
    var welcomeText = new TimelineMax({ delay: 3 });
    welcome.timeScale(1);
    welcomeText.timeScale(1);

    welcome.add(TweenLite.to('#office', 1.2, {
        scale: elevatorScale,
        transformOrigin: '50% 50%',
        force3D: true
    }), "officeZoomWithElevator");

    welcome.add(TweenLite.to('#loaderElevator', 0.7, {
        scale: elevatorScale + 0.2,
        transformOrigin: '50% 50%',
        onComplete: function() {
            $('#loaderElevator').hide();
        }
    }), "elevatorZoom");

    welcome.add(TweenLite.to($('#office'), 0.4, {
        scale: scale,
        delay: 0.1,
        ease: SlowMo.ease.config(0.2, 0.2, false),
        transformOrigin: '50% 50%'
    }), "sitDownToTable");

    //ele, scale, initialDelay, timeScale, yoyo, revealInterval
    welcomeText.add(showTextTyping($('#hydMsg'), scale, 0, 0.7, true, 0.01));
    welcomeText.add(showTextTyping($('#visionMsg'), scale, 0, 0.7, false, 0.01));
    //welcomeText.add(showTextTyping($('#visionMsg'), scale, 0, 0.7, false, 0.01));

    welcome.add([TweenMax
        .fromTo($('.trapezoid'), 0.25, {
            scale: 0,
            opacity: 0,
            borderRadius: 100
        }, {
            opacity: 0.3,
            scale: 1,
            borderRadius: 0
        }), TweenMax.to($('.trapezoid'), 0.15, {
            opacity: 1,
            ease: Power2.easeInOut
        })
    ]);
    /*
    , setRoomLight($('#officeroom, #chair'), 0.6, 0.1),
            TweenMax.to($('#presentation-logo'), 0.1, {
                autoAlpha: 1,
                ease: Power2.easeInOut
            })
                welcome.add(
            TweenMax.to($('#presentation-logo'), 0.15, {
                scale: 0,
                ease: Back.easeInOut
            }));
    */
    welcome.add(
        TweenMax.to('#projector', 0.1, {
            opacity: 1,
            delay: 0
        }));


    welcome.add(function() {
        $('.vision2020').addClass('active');
    });
    welcome.add(TweenMax.staggerFromTo($('#presentationMenu li'), 1.2, {
        scale: 0,
        borderRadius: 100
    }, {
        opacity: 1,
        scale: 0.8,
        borderRadius: 0,
        ease: Power2.easeInOut
    }, 0.3));



    //ele, scale, initialDelay, timeScale, yoyo, revealInterval
    //showTextTyping($('#hydMsg'), scale, 1, 1, true, 0.01);
    //showTextTyping($('#seatedMsg'), scale, 4, 0.6, true, 0.01);
    //showTextTyping($('#turnOnMsg'), scale, 7, 0.6, true, 0.01); //real turn on :)
    //showTextTyping($('#turnOffMsg'), scale, 9, 0.6, true, 0.01); //it was quick! turn off now
    //showTextTyping($('#visionMsg'), scale, 12, 0.6, false, 0.02);
    /* Thrash
    welcome.add(
        TweenMax.to($('#presentation-logo'), 0.25, {
            scale: 0.3,
            ease: Back.easeInOut
        }));

    welcome.add(
        TweenMax.to($('#presentation-logo'), 0.15, {
            scale: 0.2,
            ease: Back.easeInOut
        }));
*/
}

function setRoomLight(elem, brightness, delay) {
    return TweenLite.to(elem, .7, { css: { 'filter': 'brightness(' + brightness + ') hue-rotate(10deg) saturate(300%)' }, delay: delay });
}

function textToSpan(ele) {
    ele.innerHTML = ele.innerHTML.trim().replace(/./g, "<span class='l'>$&</span>").replace(/\s/g, " ");
}

function setScreen() {
    var top, left, height, width, sideBuffer, perspectiveOriginX, perspectiveOriginY, currentScale;

    //save current scale
    currentScale = $('#hall')[0]._gsTransform ? getScale() : 1;

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
    TweenLite.set('#screenTable', { rotationX: 90, transformStyle: "preserve-3d" });

    return {
        x: perspectiveOriginX,
        y: perspectiveOriginY
    };
}