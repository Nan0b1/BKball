"use strict";

var winState = false

var holes = [];
var ropeDefault = 185;
var leftLoss = 0;
var oldleftLoss = 0;
var rightLoss = 0;
var oldrightLoss = 0;

var editionMode = false;


var actualLevel = 0;

if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem("Level") !== null) {
        actualLevel = parseInt(localStorage.getItem("Level"));
    }
} else {
  console.log("Sorry, no Web storage so you'll be reset each time!");
}



// ####################### key handling #######################
/**
 * modify the left rope value safely
 * @param {number} nbr 
 */
function pullLeft(nbr) {
    if (nbr > 0) {
        r = r + nbr;
    }
    else{
        if (r>4+nbr){
            r = r + nbr;
            if (r+R <= 130) {
                R = R +Math.abs(nbr);
            }
        }
    }
}

/**
 * modify the right rope value safely
 * @param {number} nbr 
 */
function pullRight(nbr) {
    if (nbr > 0) {
        R = R + nbr;
    }
    else{
        if (R>4+nbr){
            R = R + nbr;
            if (r+R <= 130) {
                r = r + Math.abs(nbr);
            }
        }
    }
}

/**
 * Handle keyboards / BKpad inputs
 * @param {*} evt 
 */
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
        disappear();
        changeLevel(actualLevel+1*winState);
    }
    actualize();
}

// ####################### gestures handling #######################
// modified from kirupa.com/html5/detecting_touch_swipe_gestures.htm

let svgCanvas = document.getElementById("board");
svgCanvas.addEventListener("touchstart", startTouch, false);
svgCanvas.addEventListener("touchmove", moveTouch, false);


var initialX = null;
var initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

/**
 * Handles gestures imputs
 * @param {*} e 
 */
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
    
    if (false) { // desactivated because of not beign great
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
                pullLeft(8);
            } 
            else {
                pullRight(8);
            }
        }
        else {
            // swiped down
            if (initialX > window.screen.width/2) {
                pullLeft(-8);
            } 
            else {
                pullRight(-8);
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

/**
 * Check if the ball is in a hole, and if in a wining hole set winState to true
 * @returns true if in a hole, else false
 */
function checkHoles(){
    for (let i = 0; i < levels[actualLevel].length; i++) {
        if (collide([x, y+12], levels[actualLevel][i][0],levels[actualLevel][i][1])) {
            if(document.getElementById(holes[i].toString()).classList.contains("winHole")){
                winState = true;
            }
            return true;
        }
    }
    return false;
}

/**
 * Check if 2 points are less than dist distance
 * @param {Array} co1 
 * @param {Array} co2 
 * @param {number} dist 
 * @returns true if they are less than dist far, else false
 */
function collide (co1,co2,dist) {
    let x2 = (co1[0] - co2[0])**2;
    let y2 = (co1[1] - co2[1])**2;
    if (x2 + y2 <= dist**2) {
        return true;
    }
    return false;
}



// ####################### animations #######################

/**
 * Make the falling animation for the ball
 */
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

/**
 * Update segmennt's locations with an animation
 * @param {string} name 
 */
function updateSegment(name) {
    let segment = document.getElementById(name + "1");
    segment.setAttribute("values", "M"+old_x+" "+old_y+" q "+(5-old_x)+" "+(5-old_y+oldrightLoss)+" "+(5-old_x)+" "+(5-old_y)+";M "+x+" "+y+" q "+(5-x)+" "+(5-y+rightLoss)+" "+(5-x)+" "+(5-y));
    segment.beginElement();

    
    let segmenty = document.getElementById(name + "2");
    segmenty.setAttribute("values", "M"+old_x+" "+old_y+" q "+(135-old_x)+" "+(5-old_y+oldleftLoss)+" "+(135-old_x)+" "+(5-old_y)+";M "+x+" "+y+" q "+(135-x)+" "+(5-y+leftLoss)+" "+(135-x)+" "+(5-y));
    segmenty.beginElement();
}



// ####################### Level creation #######################

// levels hosts all the other levels
var levels = [];
var level0 = [[[50,50],15,true], [[80,70],10], [[105,70],10], [[130,70],10], [[80,95],10], [[80,120],10], [[100,90],10], [[115,105],10], [[130,120],10], [[145,135],10]];
var level1 = [[[10,70],15], [[20,25],12, true], [[30,110],15], [[65,140],12], [[40,60],13], [[80,100],13], [[130,90],20], [[120,140],12]];
var levelFinal = [[[50,50],15,true],[[90,50],15,true],[[15,110],11],[[30,127],11],[[51.5,133],11],[[69,118],11],[[87,132],11],[[109,127],11],[[125,111],11]]
levels.push(level0);
levels.push(level1);
levels.push(levelFinal);

var officialLevels = levels.length

if (typeof(Storage) !== "undefined") {
    var customsIDs = []
    for (var i = 0; i < localStorage.length; i++){
        if (localStorage.key(i).startsWith("CL")){
            customsIDs.push(localStorage.key(i).slice(2))
        }
    }
    customsIDs.sort();
    for (var i = 0; i < customsIDs.length; i++){
        levels.push(JSON.parse(localStorage.getItem("CL" + customsIDs[i])))
    }
} else {
  console.log("Sorry, no Web storage so you'll be reset each time!");
}




if (actualLevel > levels.length-1){
    actualLevel = levels.length-1;
}

var rotationRatio = 20 + (Math.random() - 0.5);

/**
 * make a new hole in the board with his proprieties
 * @param {Array} coordonates 
 * @param {number} radius 
 * @param {boolean} win 
 */
function makeHole(coordonates, radius, win) {
    let newHole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    newHole.setAttribute("cx", coordonates[0]);
    newHole.setAttribute("cy", coordonates[1]);
    newHole.setAttribute("r", radius);
    let textWin = "";
    if (win==true){
        textWin = ",true";
    }
    newHole.setAttribute("id", coordonates.toString() +"," + radius.toString()+textWin);
    if (win) {
        newHole.setAttribute("fill", "url(#Gradient2)");
        newHole.classList.add("winHole");
        holes.push([coordonates, radius,true]);
    }
    else {
        newHole.setAttribute("fill", "url(#Gradient1)");
        holes.push([coordonates, radius]);
    }
    newHole.classList.add("threed");
    document.getElementById("board").insertBefore(newHole, document.getElementById("left1"));
}

/**
 * set all the new holes in the board
 * @param {number} levelID 
 */
function makeLevel(levelID) {
    for (let i = 0; i < levels[levelID].length; i++) {
        makeHole(levels[levelID][i][0], levels[levelID][i][1],(levels[levelID][i].length>2));
    }
}

/**
 * remove all the holes present in the board
 */
function removeHoles(){
    for (let i = 0; i < holes.length; i++) {
        document.getElementById(holes[i].toString()).remove();
    }
    holes.length = 0 // reset without breaking refs
}

/**
 * One simple function to change level while erasing the old presence from the screen
 * @param {number} levelTo 
 */
function changeScene(levelTo) {
    removeHoles();
    actualLevel = levelTo;
    makeLevel(levelTo);
    actualize();
}

/**
 * One simple function to do all the changes before and after the scene change
 * @param {number} levelTo 
 */
async function changeLevel(levelTo) { //trust the async :) (it isn't engineered for that but no worries)
    if (levels.length > levelTo && levelTo >= 0) {
        await new Promise(r => setTimeout(r, 200));
        R = 185;
        r = 185;
        leftLoss = 0;
        rightLoss = 0;
        actualize();
        rotationRatio = 20 + (Math.random() - 0.5); //destroys animations so idk
        actualLevel = levelTo;
        changeScene(actualLevel);
        winState = false;
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

/**
 * Calculate where the ball sould be based off the ropes lenght and collisions with walls
 */
function ballTriangulation(){
    old_x = x;
    x = ((d ** 2) - (r ** 2) + (R ** 2)) / (2 * d) + 5;

    old_y = y
    let a = (1 / d) * ((-d + r - R) * (-d - r + R) * (-d + r + R) * (d + r + R)) ** (1 / 2);
    y = a / 2 +5;

    if (x < 5) {
        oldleftLoss = leftLoss;
        leftLoss = Math.abs(x - 5)
        x = 5;
        y = R;
    } 
    else if (x > 135) {
        oldrightLoss = rightLoss;
        rightLoss = Math.abs(x - 135)
        x = 135;
        y = r;
    }
    else {
        oldleftLoss = leftLoss;
        oldrightLoss = rightLoss;
    }
}

// ####################### frames updates #######################

/**
 * update the board visually
 */
function actualize() {

    ballTriangulation();

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

/**
 * Set the table selector in his container
 */
function makeLvlTable () {
    let lvlTable = document.getElementById("LvlTable");
    for (let i = 0; i < Math.floor(levels.length/6)+1 ; i++) {
        let node = document.createElement("tr");
        lvlTable.appendChild(node);
        if (i == Math.floor(levels.length/6)) {
            for (let j = 0; j < levels.length % 6 ; j++){
                let button = document.createElement("button");
                button.setAttribute("onclick", "changeLevel("+(6*i+j)+")");
                let textnode = document.createTextNode(6*i+j+1);
                button.appendChild(textnode);
                node.appendChild(button);

            }
        }
        else {
            for (let j = 0; j < 6 ; j++){
                let button = document.createElement("button");
                button.setAttribute("onclick", "changeLevel("+(6*i+j)+")");
                let textnode = document.createTextNode(6*i+j+1);
                button.appendChild(textnode);
                node.appendChild(button);
            }
        }
    }
}


// ####################### Level edition #######################

var tutoGame = document.getElementById("tutoGame");
var tutoEditor = document.getElementById("tutoEditor");

//gameModeD

/**
 * set a css class parameter, don't forget the dot :D
 * @param {string} style 
 * @param {string} param 
 * @param {*} value 
 */
function setClassParam(style, param, value){
    const stylesheet = document.styleSheets[0];
    let elementRules;

    // looping through all its rules and getting your rule
    for(let i = 0; i < stylesheet.cssRules.length; i++) {
    if(stylesheet.cssRules[i].selectorText === style) {
        elementRules = stylesheet.cssRules[i];
    }
    }
    // modifying the rule in the stylesheet
    elementRules.style.setProperty(param, value);
}

function editMode (){
    if (editionMode == false){
        R = ropeDefault;
        r = ropeDefault;
        if (actualLevel < officialLevels){
            levels.push(levels[actualLevel]);
            const lvlTable = document.getElementById("LvlTable");
            lvlTable.innerHTML = ''; // delete old table
            makeLvlTable();
            changeLevel(levels.length-1);
        }
        editModeUI();
    }
}

function editNewMode(){
    if (editionMode == false){
        R = ropeDefault;
        r = ropeDefault;
        levels.push([]);
        const lvlTable = document.getElementById("LvlTable");
        lvlTable.innerHTML = ''; // delete old table
        makeLvlTable();
        changeLevel(levels.length-1);
        
        editModeUI();
    }
}

function editModeUI(){
    tutoGame.setAttribute("style", "display:none;");
    tutoEditor.setAttribute("style", "");
    editionMode = true;
    document.getElementById("copyButton").setAttribute("style", "");
    document.getElementById("gameButton").setAttribute("style", "");
    document.getElementById("editButton").setAttribute("style", "display:none;");
    document.getElementById("makeNewButton").setAttribute("style", "display:none;");
    setClassParam(".gameMode","display","none");
    setClassParam(".gameModeD","visibility","hidden");
}

/**
 * Toggle edition mode and visual changes
 */
function toggleEdition(){
    if (editionMode == false){
        tutoGame.setAttribute("style", "display:none;");
        tutoEditor.setAttribute("style", "");
        editionMode = true;
        document.getElementById("copyButton").setAttribute("style", "");
        document.getElementById("gameButton").setAttribute("style", "");
        document.getElementById("editButton").setAttribute("style", "display:none;");
        document.getElementById("makeNewButton").setAttribute("style", "display:none;");
        setClassParam(".gameMode","display","none");
        setClassParam(".gameModeD","visibility","hidden");
    }
    else if (editionMode == true){
        tutoGame.setAttribute("style", "");
        tutoEditor.setAttribute("style", "display:none;");
        editionMode = false;
        document.getElementById("copyButton").setAttribute("style", "display:none;");
        document.getElementById("gameButton").setAttribute("style", "display:none;");
        document.getElementById("editButton").setAttribute("style", "");
        document.getElementById("makeNewButton").setAttribute("style", "");
        setClassParam(".gameMode","display","");
        setClassParam(".gameModeD","visibility","");

        localStorage.setItem("CL"+actualLevel, JSON.stringify(levels[actualLevel])); // CL for Custom Level :3
    }
}

/**
 * Add a visual circle
 * @param {number} level 
 * @param {number} circlex 
 * @param {number} circley 
 * @param {number} radius 
 */
function addCircle(level, circlex, circley, radius) {
    makeHole([circlex, circley],radius,false);
}


/**
 * Change clicked the gole status
 * @param {number} level 
 * @param {number} circleID 
 */
function clickCircle(level, circleID) {
    if (holes[circleID].length == 2) { // if circle not already green
        let newHole = document.getElementById(holes[circleID].toString());
        newHole.setAttribute("fill", "url(#Gradient2)");
        newHole.classList.add("winHole");
        holes[circleID].push(true);
        levels[actualLevel][circleID].push(true);
        newHole.setAttribute("id", holes[circleID].toString());
    } 
    else if (holes[circleID].length > 2) { // if circle already in green state delete
        document.getElementById(holes[circleID].toString()).remove();
        holes.splice(circleID,1);
        levels[actualLevel].splice(circleID,1);
    }
}

/**
 * returns the first hole visible touched, else return false
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @returns number or bool
 */
function touch(mouseX,mouseY) {
    for (let i = holes.length-1; i >= 0; i--) {
        if (collide([mouseX, mouseY], holes[i][0],holes[i][1])){
            return i;
        }
    }
    return false;
}

/**
 * Calculates where does the click happend inside of the board then do the action needed
 * @param {*} event 
 */
function boardClic(event) {
    let dims = document.getElementById("board").getBoundingClientRect();
    let clicx = (event.clientX - dims["x"])/(dims["x"]-dims["right"])*-140;
    let clicy = (event.clientY - dims["y"])/(dims["y"]-dims["height"])*-200;
    let touched = touch(clicx,clicy);
    if (editionMode) {
        if (touched === false){
            let rad = prompt("diameter")/2
            addCircle(actualLevel, Math.floor(clicx),Math.floor(clicy), rad);
            console.log([Math.floor(clicx),Math.floor(clicy)], rad)
            levels[actualLevel].push([[Math.floor(clicx), Math.floor(clicy)], rad]);
            console.log(levels[actualLevel])
        }
        else {
            clickCircle(actualLevel,touched);
        }
    }

}

/**
 * ask the user to import a level
 */
function importLevel() {
    levels.push(JSON.parse(prompt("level code:")));
    const lvlTable = document.getElementById("LvlTable");
    lvlTable.innerHTML = ''; // delete old table
    makeLvlTable();
    toggleEdition()
}


document.getElementById("board").addEventListener("click", boardClic);

makeLvlTable();


makeLevel(actualLevel);

actualize();
actualize(); // preferable for accessibility: disable the first animation

document.addEventListener("keypress", onKeyPress);

//  code from https://github.com/Nan0b1/BKball