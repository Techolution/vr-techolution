// ;(function(){
//   function id(v){return document.getElementById(v); }
//   function loadbar() {
//     var ovrl = id("loaderElevator"),
//         stat = id("currentFloor"),
//         leftDoor = id("leftDoor"),
//         rightDoor = id("rightDoor"),
//         loadingTechoMsg = id("loadingTechoMsg"),
//         img = document.images,
//         c = 0;
//         //img = document.getElementsByTagName('*')
//         tot = img.length;
//         console.log(img);
//
//     function imgLoaded(){
//       c += 1;
//       var perc = ((100/tot*c) << 0);
//       var floorNum = perc*24/100;
//       stat.innerHTML = Math.ceil(floorNum);
//       if(c===tot) return doneLoading();
//     }
//     function doneLoading(){
//       setTimeout(function(){
//         //ovrl.className += ' active';
//         leftDoor.className += ' active';
//         rightDoor.className += ' active';
//         loadingTechoMsg.className += ' active';
//       }, 500);
//       // setTimeout(function(){
//       //   ovrl.style.display = "none";
//       // },4200);
//     }
//     for(var i=0; i<tot; i++) {
//       var tImg     = new Image();
//       tImg.onload  = imgLoaded;
//       tImg.onerror = imgLoaded;
//       tImg.src     = img[i].src;
//     }
//   }
//   document.addEventListener('DOMContentLoaded', loadbar, false);
// }());

// ;(function(){
// var imgContainer = document.getElementById("office"),
// 	//progressBar = $("#currentFloor"),
//
// 	//images variables
// 	imagesAmount = document.images.length,//total images being loaded
// 	loadedCount = 0,//current number of images loaded
// 	currentImages,//images already present in the container
//
// 	//we get the full width of the progress bar it depens on display width
// 	//progBarWidth = progressBar.text(),
// 	//how much progress every image means
// 	progressUnit = 1 / imagesAmount,
// 	currentProgress,//the current progress of the total images being downloaded
// 	percentageLoaded = 0;//total percent of images already loaded
//   currentImages = imgContainer.find("img"); //how many images there are
//   imgContainer.imagesLoaded()  //we set up the images loaded instance to work in the image container
//     .progress(loadProgress);
//
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
// 	//.to(progressBar, 1, {width:progBarWidth,ease:Linear.easeNone})
// 	//tween the amount of circle segments to set the cricle new angle
// 	.to(segmentObj, 1, {seg:totalSegments,ease:Linear.easeNone,roundProps:'seg',},0);
//
// //as the progress bar witdh updates and grows we put the precentage loaded in the screen
// function progressUpdate() {
// 	//the percentage loaded based on the tween's progress
// 	percentageLoaded = Math.round(progressTl.progress() * 100);
// 	//we put the percentage in the screen
// 	document.getElementById("currentFloor").innerHTML(percentageLoaded + ' %');
//
// 	//circleUpdate();
// }
// }());

;(function(){
  function id(v){return document.getElementById(v); }
  function loadbar() {
        var ovrl = id("loaderElevator"),
        stat = id("currentFloor"),
        leftDoor = id("leftDoor"),
        loadingTechoMsg = id("loadingTechoMsg"),
        rightDoor = id("rightDoor");
        // img = document.images,
        // c = 0;
        // tot = img.length;
        // console.log(img);

    // function imgLoaded(){
      // c += 1;
      // var perc = ((100/tot*c) << 0);
      // var floorNum = perc*24/100;
      // stat.innerHTML = Math.ceil(floorNum);
      // if(c===tot) return doneLoading();
    // }
    // function doneLoading(){
      // setTimeout(function(){
        // ovrl.className += ' active';
        // leftDoor.className += ' active';
        // rightDoor.className += ' active';
      // }, 500);
      // setTimeout(function(){
        // ovrl.style.display = "none";
      // },4200);
    // }
    // for(var i=0; i<tot; i++) {
      // var tImg     = new Image();
      // tImg.onload  = imgLoaded;
      // tImg.onerror = imgLoaded;
      // tImg.src     = img[i].src;
    // }
	var countImages = $('body img').length;
	$('body').imagesLoaded()
	  .always( function( instance ) {
		console.log('all images loaded');
    setTimeout(function(){
			ovrl.className += ' active';
			leftDoor.className += ' active';
			rightDoor.className += ' active';
      loadingTechoMsg.className += ' active';
		  }, 500);
		  setTimeout(function(){
			ovrl.style.display = "none";
		  },4200);
	  })
	  .done( function( instance ) {
		console.log('all images successfully loaded');

	  })
	  .fail( function() {
		console.log('all images loaded, at least one is broken');
	  })
	  .progress( function( instance, image ) {
		//var result = image.isLoaded ? 'loaded' : 'broken';
		//console.log( 'image is ' + result + ' for ' + image.img.src );
		if(image.isLoaded) {
			$(image.img).addClass('loaded');

			var countLoadedImages = $('body img.loaded').length;

			var perc = 100 * (countLoadedImages / countImages);
			//console.log(width)
			var floorNum = perc*24/100;
			console.log(Math.floor(floorNum))
            stat.innerHTML = Math.ceil(floorNum);
		  }
	  });
    }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());
