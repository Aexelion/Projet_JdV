"use strict"
let timer = 1000;
let torique = nbVoisinsVivants;

function initBoutons() {
    let start_button = document.getElementById("start_button");
    start_button.addEventListener('click', function() {debut(timer);});
    let stop_button = document.getElementById("stop_button");
    stop_button.addEventListener('click', stop);
    let step_button = document.getElementById("step_button");
    step_button.addEventListener('click', function() {stop(); actualisation()});
    let reset_button = document.getElementById("reset_button");
    reset_button.addEventListener('click', function() {stop() ;reinitialiser()});
    let torique_check = document.getElementById("torique");
    torique = torique_check.checked ? nbVoisinsVivantsTorique : nbVoisinsVivants;
    torique_check.addEventListener('input', function() {torique = torique_check.checked ? nbVoisinsVivantsTorique : nbVoisinsVivants});
    let vitesse = document.querySelector("#vitesse");
    let vitesseAffiche = document.querySelector(".vitesse_actuelle");
    vitesseAffiche.textContent = vitesse.value;
    vitesse.addEventListener('input', function() {vitesseAffiche.textContent = vitesse.value; modifieTimer(vitesse.value)});
}

function modifieTimer(vitesse) {
    timer = 1175 - vitesse*175
    if (animationEnCours) {
        debut(timer)
    }
}