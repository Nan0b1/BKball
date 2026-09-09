"use strict";

var actualLevel = 0



function onKeyPress(evt) {
    let char = String.fromCharCode(evt.charCode).toLowerCase();

    switch (char) { // 142 min value
        case "p":
            r = r + 2;
            break;
        case "o":
            if (r>6){
                r = r - 2;
                if (r+R <= 130) {
                    R = R + 2;
                }
            }
            break;
        case "a":
            R = R + 2;
            break;
        case "z":
            if (R>6){
                R = R - 2;
                if (r+R <= 130) {
                    r = r + 2;
                }
            }  
            break;
        case "n":
            changeLevel(actualLevel+1);
            break;
        case "w":
            changeLevel(actualLevel-1);
            break;
    }
    if (checkHoles()){
        desapear()
        changeLevel(actualLevel+1*winState)
    }
    actualize();
}

function desapear () {
    let bk = document.getElementById("BKanimate");
    bk.setAttribute("from", old_x/6.28319*Math.abs(rotationRatio) +" 0 13");

    rotationRatio = rotationRatio + 1110;

    bk.setAttribute("to", x/6.28319*Math.abs(rotationRatio) +" 0 13");
    bk.beginElement();
}

var winState = false

function checkHoles(){
    for (let i = 0; i < levels[actualLevel].length; i++) {
        if (collide([x, y+12], levels[actualLevel][i][0],levels[actualLevel][i][1])) {
            if(document.getElementById(holes[i].toString()).classList.contains("winHole")){
                winState = true
                console.log(67)
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

document.addEventListener("keypress", onKeyPress);
let circle = document.getElementById("myCircle");
const segmentsName = [
    "right1",
    "right2",
    "right3",
    "left1",
    "left2",
    "left3"
];



// https://mathworld.wolfram.com/Circle-CircleIntersection.html
// (0,0) (0,140) -> d=140
var d = 130;
// default length rope 100
var R = 185; // left
var r = 185; // right



var x = 0;
var old_x = x;

var y = 5;
var old_y = y;

function changeSegment(name) {
    let segment = document.getElementById(name + "1");
    segment.setAttribute("values", old_x + ";" + x);
    segment.beginElement();
    
    let segmenty = document.getElementById(name + "2");
    segmenty.setAttribute("values", old_y + ";" + y);
    segmenty.beginElement();
}

var holes = [];

function makeHole(coordonates, radius, win) {
    let newHole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newHole.setAttribute("cx", coordonates[0]);
    newHole.setAttribute("cy", coordonates[1]);
    newHole.setAttribute("r", radius);
    newHole.setAttribute("id", coordonates.toString() +"," + radius.toString());
    if (win) {
        newHole.setAttribute("fill", "#2e532b");
        newHole.classList.add("winHole");
    }
    else {
        newHole.setAttribute("fill", "#000000");
    }
    newHole.classList.add("threed");

    document.getElementById("board").insertBefore(newHole, document.getElementById("left1"));
    holes.push([coordonates, radius]);
}

var levels = [];
var level0 = [[[50,50],15,true], [[10,50],5], [[50,10],3], [[30,25],5]];
var level1 = [[[50,70],15], [[80,50],15], [[50,100],13], [[90,90],15]];
levels.push(level0);
levels.push(level1);

function makeLevel(levelID) {
    for (let i = 0; i < levels[levelID].length; i++) {
        makeHole(levels[levelID][i][0], levels[levelID][i][1],(levels[levelID][i].length>2));
    }
}


async function changeLevel(levelTo) {
    if (levels.length > levelTo && levelTo >= 0) {
        await new Promise(r => setTimeout(r, 200));
        R = 185;
        r = 185;
        actualize()
        rotationRatio = 20 + (Math.random() - 0.5); //destroys animations so idk
        actualLevel = levelTo;
        changeScene(actualLevel)
        winState = false
    }
}

function changeScene(levelTo) {
    removeHoles()
    actualLevel = levelTo
    makeLevel(levelTo)
    actualize()
}

makeLevel(actualLevel)


function removeHoles(){
    for (let i = 0; i < holes.length; i++) {
        document.getElementById(holes[i].toString()).remove();
    }
    holes.length = 0 // reset without breaking refs
}

// removeHoles()
var rotationRatio = 20 + (Math.random() - 0.5);

function actualize() {
    
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

    for (const currentSegment of segmentsName) {
        changeSegment(currentSegment);
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

actualize();
actualize(); // preferable for accessibility: disable the first animation
// removeHoles()