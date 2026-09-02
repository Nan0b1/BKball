"use strict";

var actualLevel = 0



function onKeyPress(evt) {
    let char = String.fromCharCode(evt.charCode).toLowerCase();

    switch (char) {
        case "p":
            r = r + 2;
            break;
        case "o":
            r = r - 2;
            break;
        case "a":
            R = R + 2;
            break;
        case "z":
            R = R - 2;
            break;
    }
    console.log(r);
    if (checkHoles()){
        console.log("HOLE")
    }
    actualize();
}

function checkHoles(){
    for (let i = 0; i < levels[actualLevel].length; i++) {
        if (collide([x, y+12], levels[actualLevel][i][0],levels[actualLevel][i][1])) {
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
var d = 140;
// default length rope 100
var R = 190; // left
var r = 190; // right



var x = 0;
var old_x = x;

var y = 0;
var old_y = y;

function changeSegment(name) {
    let segment = document.getElementById(name + "1");
    segment.setAttribute("values", old_x + ";" + x);
    segment.beginElement();
    
    let segmenty = document.getElementById(name + "2");
    segmenty.setAttribute("values", old_y + ";" + y);
    segmenty.beginElement();
}

let holes = [];

function makeHole(coordonates, radius) {
    let newHole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newHole.setAttribute("cx", coordonates[0]);
    newHole.setAttribute("cy", coordonates[1]);
    newHole.setAttribute("r", radius);
    newHole.setAttribute("id", coordonates);
    newHole.setAttribute("fill", "#000000");
    newHole.classList.add("threed");
    document.getElementById("board").insertBefore(newHole, document.getElementById("left1"));
    
    holes.push([coordonates,radius]);
}

var levels = [];
var level0 = [[[50,50],15], [[10,50],5], [[50,10],3], [[30,25],5]];
levels.push(level0);

function makeLevel(levelID) {
    for (let i = 0; i < levels[levelID].length; i++) {
        makeHole(levels[levelID][i][0],levels[levelID][i][1]);
    }
}


makeLevel(actualLevel)


function removeHoles(){
    for (let i = 0; i < holes.length; i++) {
        console.log(holes[i].toString());
        document.getElementById(holes[i].toString()).remove();
    }
}

// removeHoles()


function actualize() {
    
    old_x = x;
    x = ((d ** 2) - (r ** 2) + (R ** 2)) / (2 * d);

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

}

actualize();
actualize();
