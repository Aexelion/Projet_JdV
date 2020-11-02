"use strict"

function initBoutons() {
    let start_button = document.getElementById("start_button");
    start_button.addEventListener('click', debut);
    let stop_button = document.getElementById("stop_button");
    stop_button.addEventListener('click', stop);
    let step_button = document.getElementById("step_button");
    step_button.addEventListener('click', actualisation);
    let reset_button = document.getElementById("reset_button");
    reset_button.addEventListener('click', reinitialiser);
    let vitesse = document.querySelector("#vitesse");
    let vitesseAffiche = document.querySelector(".vitesse_actuelle");
    vitesseAffiche.textContent = vitesse.value;
    vitesse.addEventListener('input', function() {vitesseAffiche.textContent = vitesse.value});
}