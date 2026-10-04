// script create an animation using only inserted images. 
// make by hansy for FM

function LocalAnim(name) {
  try {
    return document.getElementById(name+" folder").style;
  } catch (e) {
    alert("fail to get '"+name+" folder' | reson :"+e)
  }
}

function IsStopped_LocalAnim(name) {
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

function stopLocalAnim(name,afterEnd) {
  if (afterEnd == true) {
    document.getElementById(name + " folder").style.paddingLeft = "0.11px";
  } else {
    document.getElementById(name + " folder").style.paddingLeft = "0.1px";
  }
}

function playLocalAnim(name) {
  try {
    if (global.pauseGameState == false) {
      document.getElementById(name + " folder").style.paddingTop = "0.1px";
    }
  } catch (e) {
    alert("fail to get '"+name+" folder' | reson :"+e)
  }
}

function makeLocalAnim(name,animScr,animLength,x,y,animScale,putIn,speed,isLoop, xx, yy, flip,iSpaddingLength,additionalCss = "") {
  var animData = document.createElement("div")
  animData.id = name+" folder";
  animData.style.position = "absolute";
  animData.style.left = "0px";
  animData.style.top = "0px";
  animData.style.transform = `translateX(${xx}px)`;
  animData.style.transform += `translateY(${yy}px)`;
  
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
      thing.style.cssText += additionalCss;
      /*
      thing.style.transform = `translateX(${xx}px)`;
      thing.style.transform += `translateY(${yy}px)`;*/
      if (flip == true) {
        thing.style.cssText += "-webkit-transform: scaleX(-1); transform: scaleX(-1);";
      }

      thing.onerror = function () {
        PreError("fail to load the characters '"+name+"' at the frame "+i+" | src: "+thing.src,false,false)
        return "error";
      }
      //thing.style.backgroundColor = "black";

      // do not modify 
      thing.id = name + i;
      //thing.style.visibility = "hidden";
      if (i <= 9) {
        if (iSpaddingLength == true) {
          thing.src = animScr +'000' +i + ".png";
        } else {
          thing.src = animScr +i + ".png";
        }
      } else {
        if (iSpaddingLength == true) {
          thing.src = animScr +'00' +i + ".png";
        } else {
          thing.src = animScr +i + ".png";
        }
      }
    
    }

  // make boyfriend all anim
  
  var animate = {
    loop: isLoop,
    i: 0,
    i2: 0,
    i3: 0,
    L2: null,
    animLength: animLength
  };
  
  var animLoop = setInterval(() => {
    if (global.pauseGameState == false) {
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
    if (global.pauseGameState == false) {
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
  }, global.frameLimite * 0.5)
}