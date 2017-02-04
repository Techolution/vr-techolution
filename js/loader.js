// ;(function(){
//   function id(v){return document.getElementById(v); }
//   function loadbar() {
//     var ovrl = id("loaderElevator"),
//         stat = id("currentFloor"),
//         leftDoor = id("leftDoor"),
//         rightDoor = id("rightDoor"),
//         img = document.images,
//         c = 0;
//         tot = img.length;
//         console.log(img);
//
//     function imgLoaded(){
//       c += 1;
//       var perc = ((100/tot*c) << 0);
//       var floorNum = perc*24/100;
//       stat.innerHTML = Math.floor(floorNum);
//       if(c===tot) return doneLoading();
//     }
//     function doneLoading(){
//       setTimeout(function(){
//         ovrl.className += ' active';
//         leftDoor.className += ' active';
//         rightDoor.className += ' active';
//       }, 500);
//       setTimeout(function(){
//         ovrl.style.display = "none";
//       },4200);
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


;(function(){
  function id(v){return document.getElementById(v); }
  function loadbar() {
    var ovrl = id("loaderElevator"),
        stat = id("currentFloor"),
        leftDoor = id("leftDoor"),
        rightDoor = id("rightDoor"),
        img = '',
        c = 0;
        img = document.getElementsByTagName('*');
        tot = img.length;
        console.log(img);
        console.log(tot);

    function imgLoaded(){
      c += 1;
      //var perc = ((100/tot*c) << 0);
      var perc = (c*100)/tot;
      console.log('perc'+perc+'c'+c);
      var floorNum = perc*24/100;
      stat.innerHTML = Math.round(floorNum);
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
      //console.log('called');
      var tImg     = new Object();
      tImg.onload  = imgLoaded();
      //console.log('called on load');
      //tImg.onerror = imgLoaded;
      //console.log('called on error');
      //tImg.src     = img[i].src;
    }
  }
  document.addEventListener('DOMContentLoaded', loadbar, false);
}());
