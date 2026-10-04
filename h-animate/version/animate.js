// script create an animation using only inserted images. 
// make by hansy2577b for FM

function animate_getAnim(name) {
  return document.getElementById(name+" folder");
}

function animate_IsStopped(name) {
  try {
    if (document.getElementById(name+" folder").style.paddingBottom == "0.1px") {
      return "true";
    } else {
      return "false";
    }
  } catch (e) {
    alert("fail to get '"+name+" folder' | reson :"+e)
  }
}

function animate_stopAnim(name,afterEnd) {
  if (afterEnd == true) {
    document.getElementById(name + " folder").style.paddingLeft = "0.11px";
  } else {
    document.getElementById(name + " folder").style.paddingLeft = "0.1px";
  }
}

function animate_playAnim(name) {
  try {
    if (global.pauseGameState == false) {
      document.getElementById(name + " folder").style.paddingTop = "0.1px";
    }
  } catch (e) {
    alert("fail to get '"+name+" folder' | reson :"+e)
  }
}

function animate_makeAnim(name,animScr = "myAnim",{ delay = 0, animScale = 1, putIn = "",speed = "50",animLength = "5",x = 0,y = 0,isLoop = true,iSpaddingLength = false }) {
  var animData = document.createElement("div")
  animData.id = name+" folder";
  animData.style.position = "absolute";
  animData.style.left = "0px";
  animData.style.top = "0px";
  
  if (document.getElementById(putIn) == undefined) {
    document.body.appendChild(animData);
  } else {
    document.getElementById(putIn).appendChild(animData);
  }
  
  console.info("[animate.js]: '"+name+" folder' make ! | "+animScr+ " | "+putIn)
  
  for (var i = 0; i < animLength + 1; i++) {
      var thing = document.createElement("img");
      document.getElementById(name+" folder").appendChild(thing);

      // custom setting
      thing.style.scale = animScale;
      thing.style.position = "absolute";
      thing.style.top = y+"px"
      thing.style.left = x+"px"
      thing.style.zindex = "4";
      /*
      thing.style.transform = `translateX(${xx}px)`;
      thing.style.transform += `translateY(${yy}px)`;
      if (flip == true) {
        thing.style.cssText += "-webkit-transform: scaleX(-1); transform: scaleX(-1);";
      }*/

      thing.onerror = function (e) {
        console.error("fail to load the characters '"+name+"' at the frame "+i+" | src: "+thing.src)
        return "error";
      }
      //thing.style.backgroundColor = "black";

      // do not modify 
      thing.id = name + i;
      //thing.style.visibility = "hidden";
      if (i <= 9) {
        if (iSpaddingLength == true) {
          thing.src = animScr +'000' +(i - delay) + ".png";
        } else {
          thing.src = animScr +(i - delay) + ".png";
        }
      } else {
        if (iSpaddingLength == true) {
          thing.src = animScr +'00' +(i - delay) + ".png";
        } else {
          thing.src = animScr +(i - delay) + ".png";
        }
      }
    
    }

  // anim it
  
  var animate = {
    loop: isLoop,
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: animLength
  };
  
  var animLoop = setInterval(() => {
    if (true) {
    if (animate.i <= animate.animLength) {
      if (animate.i2 == 0) {
        //document.getElementById(name + animate.i).style.zindex = "5px";
        //document.getElementById(name + animate.i).style.opacity = 0.5;
       
        document.getElementById(name + animate.i).style.visibility = "visible"
      
        if (animate.i == 0) {
          for (var i = 1; i < animate.animLength + 1; i++) {
            document.getElementById(name + i).style.visibility = "hidden";
          }
        }
      
        animate.i2 = 1;
      } else {
        // document.getElementById(name + animate.i).style.zindex = "0"
        // document.getElementById(name + animate.i).style.opacity = 1;
        document.getElementById(name + animate.i).style.visibility = "hidden"
      
        animate.i2 = 0;
        animate.i++;  
        animate.i3 = animate.i + 1;
      }
    }
  
    if (animate.i >= animate.animLength) {
      if (animate.loop == true) {
        animate.i = 0;
        animate.i2 = 0;
        animate.i3 = 0;
        
        document.getElementById(name + animate.i).style.visibility = "visible";
      } else {
        animate.i = animate.animLength; animate.i2 = animate.animLength; animate.i3 = animate.animLength;
        document.getElementById(name + " folder").style.paddingBottom = "0.1px";
        
        document.getElementById(name + animate.i).style.visibility = "visible";
      }
      //clearInterval(loop);
    } else {
      
      document.getElementById(name + animate.i).style.visibility = "visible";
    }
    //console.log(animate.i,document.getElementById("bf" + animate.i).style.zindex)
    }
  }, speed)
    
  var otherLoop = setInterval(() => {
    if (true) {
    if (document.getElementById(name + " folder").style.paddingTop == "0.1px") {
      for (var i = 0; i < animLength + 1; i++) {
        document.getElementById(name+i).style.visibility = "hidden";
      }

      animate.i = 0;
      animate.i2 = 0;
      animate.i3 = 0;
      document.getElementById(name + " folder").style.paddingTop = "0px";
      document.getElementById(name + " folder").style.paddingBottom = "0px";

      document.getElementById(name + animate.i).style.visibility = "visible";
    }

    if (document.getElementById(name + " folder").style.paddingLeft == "0.1px") {
      //clearInterval(animLoop); document.getElementById(name + " folder").style.paddingLeft = "0px";
      animate.i = animate.animLength; animate.i2 = animate.animLength; animate.i3 = animate.animLength;
    }
    
    if (document.getElementById(name + " folder").style.paddingLeft == "0.11px") {
      animate.loop = false;
    }
    }
  }, 10)
}