"use strict";

function showKeyPress(evt) {
    let char = String.fromCharCode(evt.charCode);

    if (char == "p") {
        r = r + 2;
    }
    if (char == "o") {
        r = r - 2;
    }
    if (char == "a") {
        R = R + 2;
    }
    if (char == "z") {
        R = R - 2;
    }

    actualize();
}

function collide (co1,co2,dist) {
    x2 = (co1[0][0] - co2[0][0])**2;
    y2 = (co1[1][0] - co2[1][0])**2;
    if (x2 + y2 <= dist**2)
}

document.addEventListener("keypress", showKeyPress);
let circle = document.getElementById("myCircle");




// https://mathworld.wolfram.com/Circle-CircleIntersection.html<
// (0,0) (0,140) -> d=140
let d = 140;
// default lenght rope 100
let R = 190; // gauche
let r = 190; // droit



let x = 0;
let old_x = x;

let y = 0;
let old_y = y;

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

makeLevel(0)


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

    changeSegment("right1");
    changeSegment("right2");
    changeSegment("right3");
    changeSegment("left1");
    changeSegment("left2");
    changeSegment("left3");

    let segment = document.getElementById("circleAnimate");
    segment.setAttribute("from", old_x + " " + old_y);
    segment.setAttribute("to", x + " " + y);
    segment.beginElement();


}

actualize();
actualize();
