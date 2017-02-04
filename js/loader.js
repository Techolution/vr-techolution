;(function(){
  function id(v){return document.getElementById(v); }
  function loadbar() {
    var ovrl = id("loaderElevator"),
        stat = id("currentFloor"),
        leftDoor = id("leftDoor"),
        rightDoor = id("rightDoor"),
        // img = document.images,
        c = 0;
        img = document.getElementsByTagName('*');
        tot = img.length;
        console.log(img);

    function imgLoaded(){
      c += 1;
      var perc = ((100/tot*c) << 0);
      var floorNum = perc*24/100;
      stat.innerHTML = Math.ceil(floorNum);
      if(c===tot) return doneLoading();
    }
    function doneLoading(){
      setTimeout(function(){
        ovrl.className += ' active';
        leftDoor.className += ' active';
        rightDoor.className += ' active';
      }, 500);
      setTimeout(function(){
        ovrl.style.display = "none";
      },4200);
    }
    for(var i=0; i<tot; i++) {
      var tImg     = new Object();
      tImg.onload  = imgLoaded();
      //tImg.onerror = imgLoaded;
      //tImg.src     = img[i].src;
    }
  }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());


// //this function executes everytime an image is complete
// function loadProgress(imgLoad, image) {
// 	//one more image has been loaded. this counts even for the images already loaded
// 	loadedCount++;
// 	//we put the image in correct position
// 	TweenMax.to(image.img, .5, {top:0});
//
// 	//since there could be other images in the container we check that
// 	//with this the progress bar and percentage loaded are updated by the
// 	//number of images being loaded and not the total in the container
// 	if( (loadedCount - currentImages.length) > 0 ) {
// 		currentProgress = progressUnit * (loadedCount - currentImages.length);
// 		TweenLite.to(progressTl, .7, {progress:currentProgress, ease:Linear.easeNone});
// 	}
// }
//
// //progress animation instance. the instance's time is irrelevant, can be anything but 0 to void  immediate render
// var progressTl = new TimelineMax({paused:true,onUpdate:progressUpdate,onComplete:loadComplete})
//
// progressTl
// 	//tween the progress bar width
// 	.to(progressBar, 1, {width:progBarWidth,ease:Linear.easeNone})
// 	//tween the amount of circle segments to set the cricle new angle
// 	.to(segmentObj, 1, {seg:totalSegments,ease:Linear.easeNone,roundProps:'seg',},0);
//
// //as the progress bar witdh updates and grows we put the precentage loaded in the screen
// function progressUpdate() {
// 	//the percentage loaded based on the tween's progress
// 	percentageLoaded = Math.round(progressTl.progress() * 100);
// 	//we put the percentage in the screen
// 	$("#percentageLoad").html(percentageLoaded + ' %');
//
// 	//circleUpdate();
// }
