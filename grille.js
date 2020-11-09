"use strict"
const nbCases = 10;
let animationEnCours = false;
let tableCellule = [];
let variableInterval;
let canvaWidth = 0;
let canvaHeight = 0;
window.onload = initialisation;

function initialisation() {
    initEventListner();
    initBoutons();
    let canvas = document.getElementById("table");
    canvaWidth = canvas.width;
    canvaHeight = canvas.height;
    initDessinGrille();
    initTable(tableCellule);
    initDessinTable();
}

function initDessinGrille(){
    let canvas = document.getElementById("grille");
    let ctx = canvas.getContext("2d");
    dessineGrille(ctx);
}

function initDessinTable(){
    let canvas = document.getElementById("table");
    let ctx = canvas.getContext("2d");
    dessineTable(tableCellule, ctx);
}

function initTable(table) {
    for (let i=0; i<nbCases; i++) {
        let tmp = [];
        for (let j=0; j<nbCases; j++) {
            tmp.push(false);
        }
        table.push(tmp);
    }
}

function initEventListner() {
    let canvas = document.getElementById("table");
    canvas.addEventListener('click', tableOnClick);
}

function actualisation() {
    let canvas = document.getElementById("table");
    let ctx = canvas.getContext("2d");
    tableCellule = prochaineTable(tableCellule);
    dessineTable(tableCellule, ctx);
}

function nbVoisinsVivants(table, ligne, colonne) {
    let res = 0
    for (let i = ligne-1; i<= ligne+1; i++) {
        for (let j = colonne-1; j<= colonne+1; j++) {
            if ( (i<0) || (j<0) || (i>=nbCases) || (j>=nbCases) || (i==ligne && j==colonne) ) {
                continue
            }
            res = table[i][j] ? res+1 : res;
        }
    }
    return res;
}

function nbVoisinsVivantsTorique(table, ligne, colonne) {
    let res = 0;
    for (let i = ligne-1; i<= ligne+1; i++) {
        for (let j = colonne-1; j <= colonne+1; j++) {
            if (i == ligne && j == colonne) {
                continue
            }
            let iModifie = ((i%nbCases) +nbCases) % nbCases; // Renvois le modulo positif de i par nbCases (de même signe que nbCases)
            let jModifie = ((j%nbCases) +nbCases) % nbCases; // Idem avec j
            res = table[iModifie][jModifie] ? res+1 : res;
        }
    }
    return res
}

function prochaineTable(table1) {
    let table2 = [];
    for (let i=0; i<nbCases; i++) {
        let tmp = [];
        for (let j=0; j<nbCases; j++) {
            let voisins = torique ? nbVoisinsVivantsTorique(table1, i, j) : nbVoisinsVivants(table1,i,j);
            if (voisins == 3) {
                tmp.push(true);
            } else if (voisins == 2) {
                tmp.push(table1[i][j]);
            } else {
                tmp.push(false);
            }
        }
        table2.push(tmp);
    }
    return table2;
}

function dessineGrille(context) {
    let pasWidth = canvaWidth/nbCases;
    let pasHeight = canvaHeight/nbCases;
    context.beginPath();

    for (let i = 1; i<nbCases; i++) {
        context.moveTo(pasWidth*i, 0);
        context.lineTo(pasWidth*i, canvaHeight);
    }

    for (let i =1; i<nbCases; i++) {
        context.moveTo(0, pasHeight*i);
        context.lineTo(canvaWidth, pasHeight*i);
    }
    context.strokeStyle = "#000000";
    context.lineWidth = 2;
    context.stroke();
}

function dessineTable(table, context) {
    let pasWidth = canvaWidth/nbCases;
    let pasHeight = canvaHeight/nbCases;
    let rayon = Math.min(pasWidth, pasHeight)/2 - 2;
    for (let i=0; i<nbCases; i++) {
        for (let j=0; j<nbCases; j++) {
            if (table[i][j]) {
                context.beginPath();
                let centreX = pasWidth/2 + pasWidth*j;
                let centreY = pasHeight/2 + pasHeight*i;
                context.arc(centreX, centreY, rayon, 0, 2*Math.PI);
                context.fill();
            } else {
                context.clearRect(pasWidth*j, pasHeight*i, pasWidth, pasHeight);
            }
        }
    }
}

function inverseCellule(table, ligne, colonne) {
    table[ligne][colonne] = !table[ligne][colonne];
    initDessinTable();
}

function fromPosToCase(posX, posY) {
    let pasWidth = canvaWidth/nbCases;
    let pasHeight = canvaHeight/nbCases;
    let ligne = Math.trunc(posY/pasHeight);
    let colonne = Math.trunc(posX/pasWidth);
    return [ligne, colonne];
}

function tableOnClick(event) {
    let canva = document.getElementById('dessin');
    let canvaLeft = canva.offsetLeft + canva.clientLeft;
    let canvaTop = canva.offsetTop + canva.clientTop;
    let x = event.pageX - canvaLeft;
    let y = event.pageY - canvaTop;
    let place = fromPosToCase(x,y);
    let ligne = place[0];
    let colonne =  place[1];
    inverseCellule(tableCellule, ligne, colonne);
}

function debut(t=1000) {
    let timer = t;
    stop();
    animationEnCours = true;
    actualisation();
    variableInterval = setInterval(actualisation, timer);
}

function stop() {
    animationEnCours = false;
    clearInterval(variableInterval);
}

function reinitialiser() {
    tableCellule = [];
    initTable(tableCellule);
    initDessinTable();
}