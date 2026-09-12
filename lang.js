"use strict";

const default_lang = "en"
let lang = default_lang;
const l_map = new Map();


async function load_lang(lang) {
    const response = await fetch(`/langs/${lang}.txt`)
    const data = await response.text();

    const lines = data.split("\n");
    for (const line of lines) {
        let temp = line.split("~");
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
    let loc = l_map.get(el.dataset.loc);
    if (loc == undefined) {
        el.innerHTML = `{{ LOC ERROR, TRIED ${el.dataset.loc} }}`
        return;
    }
    loc = loc.replace("<n>", "\n<br />");
    el.innerHTML = loc;
}

async function init() {
    await load_lang(default_lang);
    updateLoc();
}


init();
const lang_selector = document.querySelector("#lang-select")
lang_selector.addEventListener("change", async () => {
    await load_lang(lang_selector.options[lang_selector.selectedIndex].value);
    updateLoc();
})