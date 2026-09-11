"use strict";

var winState = false

var holes = [];
var ropeDefault = 185


var actualLevel = 0

if (typeof(Storage) !== "undefined") {
    console.log(localStorage.getItem("Level"))
  if (localStorage.getItem("Level") !== "null") {
    actualLevel = localStorage.getItem("Level")
  }
} else {
  console.log("Sorry, no Web storage so you'll be reset each time!");
}






// ####################### key handling #######################

function onKeyPress(evt) {
    let char = evt.code;

    switch (char) {
        case "KeyP":
            r = r + 2;
            break;
        case "KeyO":
            if (r>6){
                r = r - 2;
                if (r+R <= 130) {
                    R = R + 2;
                }
            }
            break;
        case "KeyQ":
            R = R + 2;
            break;
        case "KeyW":
            if (R>6){
                R = R - 2;
                if (r+R <= 130) {
                    r = r + 2;
                }
            }  
            break;
        case "KeyN":
            changeLevel(actualLevel+1);
            return;
        case "KeyZ":
            changeLevel(actualLevel-1);
            return;
        case _:
            return;
    }
    if (checkHoles()){
        disappear()
        changeLevel(actualLevel+1*winState)
    }
    actualize();
}

// 

myElement.addEventListener("touchstart", startTouch, false);
myElement.addEventListener("touchmove", moveTouch, false);
 
// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
 
function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};
 
function moveTouch(e) {
  if (initialX === null) {
    return;
  }
 
  if (initialY === null) {
    return;
  }
 
  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;
 
  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
 
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      console.log("swiped left");
    } else {
      // swiped right
      console.log("swiped right");
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      console.log("swiped up");
    } else {
      // swiped down
      console.log("swiped down");
    }  
  }
 
  initialX = null;
  initialY = null;
   
  e.preventDefault();
};

// ####################### physics detections #######################

function checkHoles(){
    for (let i = 0; i < levels[actualLevel].length; i++) {
        if (collide([x, y+12], levels[actualLevel][i][0],levels[actualLevel][i][1])) {
            if(document.getElementById(holes[i].toString()).classList.contains("winHole")){
                winState = true
            }
            return true
        }
    }
    return false
}

function collide (co1,co2,dist) {
    let x2 = (co1[0] - co2[0])**2;
    let y2 = (co1[1] - co2[1])**2;
    if (x2 + y2 <= dist**2) {
        return true
    }
    return false
}



// ####################### animations #######################

function disappear () {
    let bk = document.getElementById("BKanimate");
    bk.setAttribute("from", old_x/6.28319*Math.abs(rotationRatio) +" 0 13");

    rotationRatio = rotationRatio + 1110;

    bk.setAttribute("to", x/6.28319*Math.abs(rotationRatio) +" 0 13");
    bk.beginElement();
}

const segmentsName = [ // rope segments
    "right1",
    "right2",
    "right3",
    "left1",
    "left2",
    "left3"
];

function updateSegment(name) {
    let segment = document.getElementById(name + "1");
    segment.setAttribute("values", old_x + ";" + x);
    segment.beginElement();
    
    let segmenty = document.getElementById(name + "2");
    segmenty.setAttribute("values", old_y + ";" + y);
    segmenty.beginElement();
}



// ####################### Level creation #######################

var levels = [];
var level0 = [[[50,50],15,true], [[80,70],10], [[105,70],10], [[130,70],10], [[80,95],10], [[80,120],10], [[100,90],10], [[115,105],10], [[130,120],10], [[145,135],10]];
var level1 = [[[10,70],15], [[20,25],12, true], [[30,110],15], [[65,140],12], [[40,60],13], [[80,100],13], [[130,90],20], [[120,140],12]];
var levelFinal = [[[50,50],15,true], [[90,50],15,true], [[15,110],11], [[30,127],11], [[51.5,133],11]]
levels.push(level0);
levels.push(level1);
levels.push(levelFinal);

var rotationRatio = 20 + (Math.random() - 0.5);

/*  */

function makeHole(coordonates, radius, win) {
    let newHole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newHole.setAttribute("cx", coordonates[0]);
    newHole.setAttribute("cy", coordonates[1]);
    newHole.setAttribute("r", radius);
    newHole.setAttribute("id", coordonates.toString() +"," + radius.toString());
    if (win) {
        newHole.setAttribute("fill", "url(#Gradient2)");
        newHole.classList.add("winHole");
    }
    else {
        newHole.setAttribute("fill", "url(#Gradient1)");
    }
    newHole.classList.add("threed");

    document.getElementById("board").insertBefore(newHole, document.getElementById("left1"));
    holes.push([coordonates, radius]);
}

function makeLevel(levelID) {
    for (let i = 0; i < levels[levelID].length; i++) {
        makeHole(levels[levelID][i][0], levels[levelID][i][1],(levels[levelID][i].length>2));
    }
}

function removeHoles(){
    for (let i = 0; i < holes.length; i++) {
        document.getElementById(holes[i].toString()).remove();
    }
    holes.length = 0 // reset without breaking refs
}

function changeScene(levelTo) {
    removeHoles()
    actualLevel = levelTo
    makeLevel(levelTo)
    actualize()
}

async function changeLevel(levelTo) { //trust the async :) (it isn't engineered for that but no worries)
    if (levels.length > levelTo && levelTo >= 0) {
        await new Promise(r => setTimeout(r, 200));
        R = 185;
        r = 185;
        actualize()
        rotationRatio = 20 + (Math.random() - 0.5); //destroys animations so idk
        actualLevel = levelTo;
        changeScene(actualLevel)
        winState = false
        localStorage.setItem("Level", levelTo);
    }
}


// ####################### Ball location triangulation #######################

// https://mathworld.wolfram.com/Circle-CircleIntersection.html
// (0,5) (0,135) => d=130
var d = 130;

var R = ropeDefault; // left
var r = ropeDefault; // right


var x = 0;
var old_x = x;
var y = 5;
var old_y = y;

function ballTriangulation(){
    old_x = x;
    x = ((d ** 2) - (r ** 2) + (R ** 2)) / (2 * d) + 5;

    old_y = y
    let a = (1 / d) * ((-d + r - R) * (-d - r + R) * (-d + r + R) * (d + r + R)) ** (1 / 2);
    y = a / 2;

    if (x < 5) {
        x = 5;
    } 
    else if (x > 135) {
        x = 135;
    }
}

// ####################### frames updates #######################

function actualize() {

    ballTriangulation()

    for (const currentSegment of segmentsName) {
        updateSegment(currentSegment);
    }

    let segment = document.getElementById("circleAnimate");
    segment.setAttribute("from", old_x + " " + old_y);
    segment.setAttribute("to", x + " " + y);
    segment.beginElement();

    
    let bk = document.getElementById("BKanimate");
    bk.setAttribute("from", old_x/6.28319*Math.abs(rotationRatio) +" 0 13");

    rotationRatio = rotationRatio + (Math.random() - 0.5)*1.8;

    bk.setAttribute("to", x/6.28319*Math.abs(rotationRatio) +" 0 13");
    bk.beginElement();

}


makeLevel(actualLevel)

actualize();
actualize(); // preferable for accessibility: disable the first animation

document.addEventListener("keypress", onKeyPress);