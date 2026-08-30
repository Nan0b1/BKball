function showKeyPress(evt) {
    if (String.fromCharCode(evt.charCode) == "p") {
        r = r + 2
    }
    if (String.fromCharCode(evt.charCode) == "o") {
        r = r - 2
    }
    if (String.fromCharCode(evt.charCode) == "a") {
        R = R + 2
    }
    if (String.fromCharCode(evt.charCode) == "z") {
        R = R - 2
    }
    actualize()
}


function doThing() {
    // test but not used
    var segment = document.getElementById("circleAnimate");
    segment.setAttribute("from", old_x + " " + old_y);
    segmenty.setAttribute("to", x + " " + y);
    segmenty.beginElement();
}


document.addEventListener("keypress", showKeyPress);
var circle = document.getElementById("myCircle");




// https://mathworld.wolfram.com/Circle-CircleIntersection.html
// (0,0) (0,140) -> d=140
var d = 140
// default lenght rope 100
var R = 190 // gauche
var r = 190 // droit



var x = 0
var old_x = x

var y = 0
var old_y = y

function changeSegment(name) {

    var segment = document.getElementById(name + "1");
    segment.setAttribute("values", old_x + ";" + x);
    segment.beginElement();
    var segmenty = document.getElementById(name + "2");
    segmenty.setAttribute("values", old_y + ";" + y);
    segmenty.beginElement();
    console.log(name)
}

function actualize() {
    old_x = x
    x = ((d ** 2) - (r ** 2) + (R ** 2)) / (2 * d)

    old_y = y
    var a = (1 / d) * ((-d + r - R) * (-d - r + R) * (-d + r + R) * (d + r + R)) ** (1 / 2)
    y = a / 2

    if (x < 5) {
        x = 5
    } else if (x > 135) {
        x = 135
    }

    // var circle = document.getElementById("circlexy");
    // circle.setAttribute("values", "translate("+x+","+ y+")");


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



    function boardHole(coordonates, radius) {
        var newAnimatex = document.createElement("animate");
        var currentAnimatex = document.getElementById(name);
        currentAnimatex.appendChild(newAnimatex);
        newAnimatex.setAttribute("dur", " 0.2s")
    }

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
    var segment = document.getElementById("circleAnimate");
    segment.setAttribute("from", old_x + " " + old_y);
    segment.setAttribute("to", x + " " + y);
    segment.beginElement();
    // console.log('circle.setAttribute("transform", "translate('+x+','+ y+')")')


}

actualize()