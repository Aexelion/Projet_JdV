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
    const canvas = document.getElementById("table");
    canvaWidth = canvas.width;
    canvaHeight = canvas.height;
    initDessinGrille();
    initTable(tableCellule);
    initDessinTable();
}

function initDessinGrille(){
    const canvas = document.getElementById("grille");
    const ctx = canvas.getContext("2d");
    dessineGrille(ctx);
}

function initDessinTable(){
    const canvas = document.getElementById("table");
    const ctx = canvas.getContext("2d");
    dessineTable(tableCellule, ctx);
}

function initTable(table) {
    for (let i=0; i<nbCases; i++) {
        const tmp = [];
        for (let j=0; j<nbCases; j++) {
            tmp.push(false);
        }
        table.push(tmp);
    }
}

function initEventListner() {
    const canvas = document.getElementById("table");
    canvas.addEventListener('click', tableOnClick);
}

function actualisation() {
    const canvas = document.getElementById("table");
    const ctx = canvas.getContext("2d");
    tableCellule = prochaineTable(tableCellule);
    dessineTable(tableCellule, ctx);
}

function nbVoisinsVivants(table, ligne, colonne) {
    let res = 0
    for (let i = ligne-1; i<= ligne+1; i++) {
        for (let j = colonne-1; j<= colonne+1; j++) {
            if (!( (i<0) || (j<0) || (i>=nbCases) || (j>=nbCases) || (i==ligne && j==colonne) )) {
                res += table[i][j] ? 1 : 0;
            }
        }
    }
    return res;
}

function nbVoisinsVivantsTorique(table, ligne, colonne) {
    let res = 0;
    for (let i = ligne-1; i<= ligne+1; i++) {
        for (let j = colonne-1; j <= colonne+1; j++) {
            if (!(i == ligne && j == colonne)) {
                const iModifie = ((i%nbCases) +nbCases) % nbCases; // Renvois le modulo de i par nbCases (de même signe que nbCases)
                const jModifie = ((j%nbCases) +nbCases) % nbCases; // Idem avec j
                res = table[iModifie][jModifie] ? res+1 : res;
            }
        }
    }
    return res
}

function prochaineTable(table1) {
    const table2 = [];
    for (let i=0; i<nbCases; i++) {
        const tmp = [];
        for (let j=0; j<nbCases; j++) {
            const voisins = torique(table1,i,j);
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
    const pasWidth = canvaWidth/nbCases;
    const pasHeight = canvaHeight/nbCases;
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
    const pasWidth = canvaWidth/nbCases;
    const pasHeight = canvaHeight/nbCases;
    const rayon = Math.min(pasWidth, pasHeight)/2 - 2;
    for (let i=0; i<nbCases; i++) {
        for (let j=0; j<nbCases; j++) {
            if (table[i][j]) {
                context.beginPath();
                const centreX = pasWidth/2 + pasWidth*j;
                const centreY = pasHeight/2 + pasHeight*i;
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
    const pasWidth = canvaWidth/nbCases;
    const pasHeight = canvaHeight/nbCases;
    const ligne = Math.trunc(posY/pasHeight);
    const colonne = Math.trunc(posX/pasWidth);
    return [ligne, colonne];
}

function tableOnClick(event) {
    const canva = document.getElementById('dessin');
    const canvaLeft = canva.offsetLeft + canva.clientLeft;
    const canvaTop = canva.offsetTop + canva.clientTop;
    const x = event.pageX - canvaLeft;
    const y = event.pageY - canvaTop;
    const place = fromPosToCase(x,y);
    const ligne = place[0];
    const colonne =  place[1];
    inverseCellule(tableCellule, ligne, colonne);
}

function debut(t=1000) {
    stop();
    animationEnCours = true;
    actualisation();
    variableInterval = setInterval(actualisation, t);
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