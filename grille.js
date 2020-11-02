"use strict"
const pas = 10;
let tableCellule = [];
let variableInterval;
window.onload = initialisation;

function initialisation() {
    initDessinGrille();
    initTable(tableCellule);
    initDessinTable();
}

function initDessinGrille(){
    let canvas = document.getElementById("grille");
    let ctx = canvas.getContext("2d");
    dessineGrille(canvas, ctx);
}

function initDessinTable(){
    let canvas = document.getElementById("table");
    let ctx = canvas.getContext("2d");
    canvas.addEventListener('click', tableOnClick);
    dessineTable(tableCellule, canvas, ctx);
}

function initTable(table) {
    for (let i=0; i<pas; i++) {
        let tmp = [];
        for (let j=0; j<pas; j++) {
            tmp.push(false);
        }
        table.push(tmp);
    }
}

function actualisation() {
    let canvas = document.getElementById("table");
    let ctx = canvas.getContext("2d");
    tableCellule = prochaineTable(tableCellule);
    dessineTable(tableCellule, canvas, ctx);
}

function nbVoisins(table, x, y) {
    let res = 0
    if (x > 0) {
        if (y > 0) {
            if (table[x-1][y-1]) res++;
        }
        if (table[x-1][y]) res++;
        if (y < pas-1) {
            if (table[x-1][y+1]) res++;
        }

    }
    if (y > 0) {
        if (table[x][y-1]) res++;
    }
    if (y < pas-1) {
        if (table[x][y+1]) res++;
    }
    if (x < pas-1) {
        if (y > 0) {
            if (table[x+1][y-1]) res++;
        }
        if (table[x+1][y]) res++;
        if (y < pas-1) {
            if (table[x+1][y+1]) res++;
        }
    }
    return res;
}

function prochaineTable(table1) {
    let table2 = [];
    for (let i=0; i<pas; i++) {
        let tmp = [];
        for (let j=0; j<pas; j++) {
            let voisins = nbVoisins(table1,i,j);
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

function dessineGrille(grille, context) {
    let pasWidth = grille.width/pas;
    let pasHeight = grille.height/pas;
    context.beginPath();

    for (let i = 1; i<pas; i++) {
        context.moveTo(pasWidth*i, 0);
        context.lineTo(pasWidth*i, grille.height);
    }

    for (let i =1; i<pas; i++) {
        context.moveTo(0, pasHeight*i);
        context.lineTo(grille.width, pasHeight*i);
    }
    context.strokeStyle = "#000000";
    context.lineWidth = 2;
    context.stroke();
}

function dessineTable(table, grille, context) {
    let pasWidth = grille.width/pas;
    let pasHeight = grille.height/pas;
    let rayon = Math.min(pasWidth, pasHeight)/2 - 2;
    for (let i=0; i<pas; i++) {
        for (let j=0; j<pas; j++) {
            if (table[i][j]) {
                context.beginPath();
                let centreX = pasWidth/2 + pasWidth*i;
                let centreY = pasHeight/2 + pasHeight*j;
                context.arc(centreX, centreY, rayon, 0, 2*Math.PI);
                context.fill();
            } else {
                context.clearRect(pasWidth*i, pasHeight*j, pasWidth, pasHeight);
            }
        }
    }
}

function start() {
    let timer = 1000;
    actualisation();
    variableInterval = setInterval(actualisation, timer);
}

function stop() {
    clearInterval(variableInterval);
}

function inverseCellule(table, x, y) {
    table[x][y] = !table[x][y];
    initDessinTable();
}

function tableOnClick(event) {
    let x = event.pageX;
    let y = event.pageY;
    alert('Hello world\n' + 'x :' + x );
}