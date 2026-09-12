"use strict";

let lang = "en";
const l_map = new Map();


async function load_lang(lang) {
    const response = await fetch(`/langs/${lang}.txt`)
    const data = await response.text();

    const lines = data.split("\n");
    for (const line of lines) {
        let temp = line.split(":");
        let key = temp[0];
        let value = temp[1];
        l_map.set(key, value);
    }
}

function updateLoc() {
    let els = document.querySelectorAll(".loc");
    
    for (const el of els) {
        updateElLoc(el);
    }

}

function updateElLoc(el) {
    console.log(el.innerHTML);
    let loc = l_map.get(el.dataset.loc);
    el.innerHTML = loc;
}

async function init() {
    await load_lang("fr");
    updateLoc();
}


init();