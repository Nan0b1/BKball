"use strict";

function showKeyPress(evt) {
    let char = String.fromCharCode(evt.charCode)

    if (char == "p") {
        r = r + 2
    }
    if (char == "o") {
        r = r - 2
    }
    if (char == "a") {
        R = R + 2
    }
    if (char == "z") {
        R = R - 2
    }

    actualize()
}


document.addEventListener("keypress", showKeyPress);
let circle = document.getElementById("myCircle");




// https://mathworld.wolfram.com/Circle-CircleIntersection.html<
// (0,0) (0,140) -> d=140
let d = 140
// default lenght rope 100
let R = 190 // gauche
let r = 190 // droit



let x = 0
let old_x = x

let y = 0
let old_y = y

function changeSegment(name) {
    let segment = document.getElementById(name + "1");
    segment.setAttribute("values", old_x + ";" + x);
    segment.beginElement();
    
    let segmenty = document.getElementById(name + "2");
    segmenty.setAttribute("values", old_y + ";" + y);
    segmenty.beginElement();
    console.log(name)
}

var holes = []

function boardHole(coordonates, radius) {
    var newHole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newHole.setAttribute("cx", coordonates[0])
    newHole.setAttribute("cy", coordonates[1])
    newHole.setAttribute("r", radius)
    newHole.setAttribute("id", coordonates)
    newHole.setAttribute("fill", "#000000")
    document.getElementById("board").appendChild(newHole);
    
    holes.push(coordonates)
}
boardHole([50,50],15)

function removeHoles(){
    for (let i = 0; i < holes.length; i++) {
        document.getElementById(holes[i]).remove()}
}
removeHoles()
function actualize() {
    old_x = x
    x = ((d ** 2) - (r ** 2) + (R ** 2)) / (2 * d)

    old_y = y
    let a = (1 / d) * ((-d + r - R) * (-d - r + R) * (-d + r + R) * (d + r + R)) ** (1 / 2)
    y = a / 2

    if (x < 5) {
        x = 5
    } else if (x > 135) {
        x = 135
    }



    /*
    var newAnimatex = document.createElement("animate");
    var currentAnimatex = document.getElementById(name);
    currentAnimatex.appendChild(newAnimatex);
    newAnimatex.setAttribute("dur", " 0.2s")
    // newAnimatex.setAttribute("fill", "freeze")
    newAnimatex.setAttribute("begin", "0s")
    newAnimatex.setAttribute("attributeName", "x1")
    newAnimatex.setAttribute("values", x)
    var newAnimatey = document.createElement("animate", {attributeName:"y1", values:y, dur:" 0.2s", fill:"freeze"});
    var currentAnimatey = document.getElementById(name);
    currentAnimatey.appendChild(newAnimatey);
    newAnimatey.setAttribute("dur", " 0.2s")
    // newAnimatey.setAttribute("fill", "freeze")
    newAnimatey.setAttribute("attributeName", "y1")
    newAnimatey.setAttribute("values", y) */

    changeSegment("right1")
    changeSegment("right2")
    changeSegment("right3")
    changeSegment("left1")
    changeSegment("left2")
    changeSegment("left3")


    // var segment = document.getElementById("right11");
    // segment.setAttribute("x1", x);
    // var segment = document.getElementById("right12");
    // segment.setAttribute("y1", y);
    /*
    var right = document.getElementById("right2");
    right.setAttribute("x1", x);
    right.setAttribute("y1", y);
    var right = document.getElementById("right3");
    right.setAttribute("x1", x);
    right.setAttribute("y1", y);
    var left = document.getElementById("left1");
    left.setAttribute("x1", x);
    left.setAttribute("y1", y);
    var left = document.getElementById("left2");
    left.setAttribute("x1", x);
    left.setAttribute("y1", y);
    var left = document.getElementById("left3");
    left.setAttribute("x1", x);
    left.setAttribute("y1", y);*/
    let segment = document.getElementById("circleAnimate");
    segment.setAttribute("from", old_x + " " + old_y);
    segment.setAttribute("to", x + " " + y);
    segment.beginElement();
    // console.log('circle.setAttribute("transform", "translate('+x+','+ y+')")')


}

actualize()