"use strict";

var winState = false

var holes = [];
var ropeDefault = 185
var leftLoss = 0
var oldleftLoss = 0
var rightLoss = 0
var oldrightLoss = 0


var actualLevel = 0

if (typeof(Storage) !== "undefined") {
  if (localStorage.getItem("Level") !== null) {
    actualLevel = parseInt(localStorage.getItem("Level"))
  }
} else {
  console.log("Sorry, no Web storage so you'll be reset each time!");
}



// ####################### key handling #######################
function pullLeft(nbr) {
    if (nbr > 0) {
        r = r + nbr;
    }
    else{
        if (r>4+nbr){
                r = r + nbr;
                if (r+R <= 130) {
                    console.log(r+R)
                    R = R +Math.abs(nbr);
                    console.log(r+R)
            }
        }
    }
}
    
function pullRight(nbr) {
    if (nbr > 0) {
        R = R + nbr;
    }
    else{
            if (R>4+nbr){
                R = R + nbr;
                if (r+R <= 130) {
                    console.log(r+R)
                    r = r + Math.abs(nbr);
                    console.log(r+R)
                }
            }
    }
}

function onKeyPress(evt) {
    let char = evt.code;

    switch (char) {
        case "KeyP":
            pullLeft(2);
            break;
        case "KeyO":
            pullLeft(-2);
            break;
        case "KeyQ":
            pullRight(2);
            break;
        case "KeyW":
            pullRight(-2);
            break;
        case "KeyN":
            changeLevel(actualLevel+1);
            return;
        case "KeyZ":
            changeLevel(actualLevel-1);
            return;
        default:
            return;
    }
    if (checkHoles()){
        disappear()
        changeLevel(actualLevel+1*winState)
    }
    actualize();
}

// ####################### gestures handling #######################
// modified from kirupa.com/html5/detecting_touch_swipe_gestures.htm

let svgCanvas = document.getElementById("board")
svgCanvas.addEventListener("touchstart", startTouch, false);
svgCanvas.addEventListener("touchmove", moveTouch, false);


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
    
    if (Math.abs(diffX)/2 > Math.abs(diffY)) { // /2 to not accidently change
        // sliding horizontally

        if (diffX > 0) {
            // swiped left
            changeLevel(actualLevel+1)
        } else {
            // swiped right
            changeLevel(actualLevel-1);
        }  

    } else {
        // sliding vertically
        if (diffY > 0) {
            // swiped up
            if (initialX > window.screen.width/2) {
                pullLeft(4)
            } 
            else {
                pullRight(4);
            }
        }
        else {
            // swiped down
            if (initialX > window.screen.width/2) {
                pullLeft(-4)
            } 
            else {
                pullRight(-4);
            }
        }
        if (checkHoles()){
        disappear()
        changeLevel(actualLevel+1*winState)
        }
    }
  
 
  initialX = null;
  initialY = null;
   
  e.preventDefault();
  actualize();
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
    "segment1",
    "segment2",
    "segment3",
];

function updateSegment(name) {
    let segment = document.getElementById(name + "1");
    segment.setAttribute("values", "M"+old_x+" "+old_y+" q "+(5-old_x)+" "+(5-old_y+oldrightLoss)+" "+(5-old_x)+" "+(5-old_y)+";M "+x+" "+y+" q "+(5-x)+" "+(5-y+rightLoss)+" "+(5-x)+" "+(5-y));
    segment.beginElement();

    
    let segmenty = document.getElementById(name + "2");
    segmenty.setAttribute("values", "M"+old_x+" "+old_y+" q "+(135-old_x)+" "+(5-old_y+oldleftLoss)+" "+(135-old_x)+" "+(5-old_y)+";M "+x+" "+y+" q "+(135-x)+" "+(5-y+leftLoss)+" "+(135-x)+" "+(5-y));
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
    console.log(levels)
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
        leftLoss = 0
        rightLoss = 0
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
    y = a / 2 +5;

    if (x < 5) {
        oldleftLoss = leftLoss
        leftLoss = Math.abs(x - 5)
        x = 5;
        y = R;
    } 
    else if (x > 135) {
        oldrightLoss = rightLoss
        rightLoss = Math.abs(x - 135)
        x = 135;
        y = r;
    }
    else {
        oldleftLoss = leftLoss
        oldrightLoss = rightLoss
    }
    // if (r+R <= 130 || isNaN(y) || isNaN(x)) {
    //     R += 1
    //     r += 1
    //     ballTriangulation()
    // }
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

    
    if (leftLoss+rightLoss==0 || old_y != y){
        rotationRatio = rotationRatio + (Math.random() - 0.5)*1.8;
    }

    bk.setAttribute("to", x/6.28319*Math.abs(rotationRatio) +" 0 13");
    bk.beginElement();

}

function makeLvlTable () {
    let lvlTable = document.getElementById("LvlTable")
    for (let i = 0; i < Math.floor(levels.length/6)+1 ; i++) {
        let node = document.createElement("tr");
        lvlTable.appendChild(node)
        if (i == Math.floor(levels.length/6)) {
            for (let j = 0; j < levels.length % 6 ; j++){
                let button = document.createElement("button");
                button.setAttribute("onclick", "changeLevel("+(6*i+j)+")");
                let textnode = document.createTextNode(6*i+j+1)
                button.appendChild(textnode)
                node.appendChild(button);

            }
        }
        else {
            for (let j = 0; j < 6 ; j++){
                let button = document.createElement("button");
                button.setAttribute("onclick", "changeLevel("+(6*i+j)+")");
                let textnode = document.createTextNode(6*i+j+1)
                button.appendChild(textnode)
                node.appendChild(button);
            }
        }
    }
}

makeLvlTable()


makeLevel(actualLevel)

actualize();
actualize(); // preferable for accessibility: disable the first animation

document.addEventListener("keypress", onKeyPress);