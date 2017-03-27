if (window.innerWidth > 480) {
    document.body.className += 'desktop';
}

window.addEventListener("orientationchange", function() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (document.body.className != 'desktop') {
            document.body.className = 'desktop';
        }
    }
}, false);

$('#presentationMenu #team').on('click touchstart', function() {
    $('#presentationMenu li a.active').removeClass('active');
    $(this).addClass('active');

    $('.data-container > .active').removeClass('active');
    $('.PeopleData').addClass('active');
});
$('#presentationMenu #settings, #logo').on('click touchstart', function() {
    $('#presentationMenu li a.active').removeClass('active');
    $('#settings').addClass('active');

    $('.data-container > .active').removeClass('active');
    $('.vision2020').addClass('active');
});
$('#presentationMenu #location').on('click touchstart', function() {
    $('#presentationMenu li a.active').removeClass('active');
    $(this).addClass('active');

    $('#presentationMenu').hide();
    $('#mapmenu').show();

    $('.data-container > .active').removeClass('active');
    $('.contactUsData').addClass('active');
});


//hyd, nyc, mu, singapore
//india, ny, africa, sng
//TweenLite.to('#mapmenu > a', 0.1, { z: 2 });
$('#mapmenu #ny').on('click touchstart', function() {
    $('#mapmenu .active').removeClass('active');
    $(this).addClass('active');
    $('.contactUsData > .active').removeClass('active');
    $('.contactUsData #nyc').addClass('active');
});
$('#mapmenu #india').on('click touchstart', function() {
    $('#mapmenu .active').removeClass('active');
    $(this).addClass('active');
    $('.contactUsData > .active').removeClass('active');
    $('.contactUsData #hyd').addClass('active');
});
$('#mapmenu #africa').on('click touchstart', function() {
    $('#mapmenu .active').removeClass('active');
    $(this).addClass('active');
    $('.contactUsData > .active').removeClass('active');
    $('.contactUsData #mu').addClass('active');
});
$('#mapmenu #sng').on('click touchstart', function() {
    $('#mapmenu .active').removeClass('active');
    $(this).addClass('active');
    $('.contactUsData > .active').removeClass('active');
    $('.contactUsData #singapore').addClass('active');
});

/*backbutton*/
$('#mapmenu #back').on('click touchstart', function() {
    $('#mapmenu').hide();
    $('#presentationMenu').show();
});


var commonDataVision = "To learn more about our expert consulting services & project development please reach out to <a href='mailto:consulting@techolution.com'>consulting@techolution.com</a>.";

$('.info-graphic-tile').click(function() {
    $('#m-vision-div').hide();
    $('#m-content').html(commonDataVision);
    $('#agilePassBigDataContainer').show();
});

function showAgilePassBigDataContent(service) {
    var data = "";
    if (service === 'agile') {
        data = commonDataVision;
    } else if (service === 'pass') {
        data = commonDataVision;
    } else if (service === 'bigdata') {
        data = commonDataVision;
    }

    document.getElementById("m-vision-div").style.display = "none";
    document.getElementById("agilePassBigDataContainer").style.display = "block";
    document.getElementById("m-content").innerHTML = data;
}

function hideAgilePassBigDataContent() {
    document.getElementById("m-vision-div").style.display = "block";
    document.getElementById("agilePassBigDataContainer").style.display = "none";
}

window.onload = function() {
    if (window.innerWidth < 481) {
        if ($('body').hasClass('desktop')) {
            $('body').removeClass('desktop');
        }
        initialAnimationMobile();
        // activateScreenTable();
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('safari') != -1) {
            if (userAgent.indexOf('chrome') > -1) {
                //browser is chrome
            } else if ((userAgent.indexOf('opera') > -1) || (userAgent.indexOf('opr') > -1)) {
                //browser is opera
            } else {

                $('body').addClass('safari');

            }
        }

    }

};

window.onresize = function() {
    if (window.innerWidth < 481) {
        if ($('body').hasClass('desktop')) {
            $('body').removeClass('desktop');
        }
    }
};

function initialAnimationMobile() {
    $('#projector').css('opacity', '1');
    $('#presentation-logo').css('transform', 'scale(1)');
    $('.vision2020').addClass('active');
    $('#screen').height('100%');
    $('#presentationMenu li').css({
        'opacity': '1',
        'transform': 'scale(.8)'
    });
}