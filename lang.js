"use strict";

let lang = "en";
const l_map = new Map();


function load_lang(lang) {
    fetch(`/langs/${lang}.txt`)
    .then(response => response.text())
    .then((data) => {
        const lines = data.split("\n");
        for (const line of lines) {
            let temp = line.split(":");
            let key = temp[0];
            let value = temp[1];
            l_map.set(key, value);
        }
    })

}

function updateLoc() {
    let els = document.querySelectorAll(".loc");
    
    for (const el of els) {
        el.innerHTML = "a";
    }

}

function updateElLoc(el) {

}

load_lang("en")
updateLoc();