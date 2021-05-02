"use strict";
//==============================
//==========Aufgabe 1===========
//==============================
//Tester Aufgabe 1
function test1() {
    let numberArray = [22, 15, 12, 8, 34];
    let ergebnis;
    let ergebnis2;
    ergebnis = min(numberArray);
    console.log(ergebnis);
    ergebnis2 = isEven(10);
    console.log(ergebnis2);
}
test1();
//==========Aufgabe 1a==========
function min(_arr) {
    let kleinsteZahl = _arr[0];
    for (let i = 0; i < _arr.length; i++) {
        if (kleinsteZahl > _arr[i]) {
            kleinsteZahl = _arr[i];
        }
    }
    return kleinsteZahl;
}
//==========Aufgabe 1b==========
function isEven(_zahl) {
    let gerade;
    if (_zahl == 1) {
        gerade = false;
    }
    else if (_zahl == 0) {
        gerade = true;
    }
    else if (_zahl < 0) { //Lösung für das Problem, wenn die Zahl kleiner 0 ist
        gerade = isEven(_zahl + 2);
    }
    else {
        gerade = isEven(_zahl - 2);
    }
    return gerade;
}
let student1 = { vorname: "Martin", nachname: "Müller", studiengang: "MIB", matrikelnummer: 123456, alter: 20 };
let student2 = { vorname: "Jennifer", nachname: "Maier", studiengang: "OMB", matrikelnummer: 987654, alter: 22 };
let student3 = { vorname: "Thomas", nachname: "Schuster", studiengang: "MKB", matrikelnummer: 135790, alter: 19 };
let studenten = [student1, student2, student3];
studenten.push({ vorname: "Hans", nachname: "Dampf", studiengang: "MIB", matrikelnummer: 246800, alter: 21 });
for (let i = 0; i < studenten.length; i++) {
    console.log(studenten[i]);
    showInfo(studenten[i]);
}
function showInfo(_meinStudent) {
    console.log(_meinStudent.vorname);
    console.log(_meinStudent.nachname);
    console.log(_meinStudent.studiengang);
    console.log(_meinStudent.matrikelnummer);
    console.log(_meinStudent.alter);
}
//Oder als Klasse statt Interface 
class Student2 {
    constructor(_vorname, _nachname, _studiengang, _matrikelnummer, _alter) {
        this.vorname = _vorname;
        this.nachname = _nachname;
        this.studiengang = _studiengang;
        this.matrikelnummer = _matrikelnummer;
        this.alter = _alter;
    }
    showInfo() {
        console.log(this.vorname);
        console.log(this.nachname);
        console.log(this.studiengang);
        console.log(this.matrikelnummer);
        console.log(this.alter);
    }
}
//Test Klasse Student2
let myStudent = new Student2("Berta", "Holzer", "MIB", 123400, 86);
myStudent.showInfo();
//==============================
//==========Aufgabe 2===========
//==============================
//Tester Aufgabe 2
function test2() {
    let numberArray = [22, 15, 12, 8, 34];
    let numberArray2 = [90, 72, 37, 5, 12];
    let ergebnis;
    ergebnis = backwards(numberArray);
    console.log(ergebnis);
    ergebnis = join(numberArray, numberArray2);
    console.log(ergebnis);
    ergebnis = join2(numberArray, numberArray2, numberArray, numberArray2);
    console.log(ergebnis);
    ergebnis = split(numberArray, 2, 4);
    console.log(ergebnis);
}
test2();
//==========Aufgabe 2a==========
function backwards(_arr) {
    let neuesArray = [];
    for (let i = _arr.length - 1; i >= 0; i--) {
        neuesArray.push(_arr[i]);
    }
    return neuesArray;
}
//==========Aufgabe 2b==========
function join(_arr, _arr2) {
    let anhaengen = [];
    for (let i = 0; i < _arr.length; i++) {
        anhaengen.push(_arr[i]);
    }
    for (let i = 0; i < _arr2.length; i++) {
        anhaengen.push(_arr2[i]);
    }
    return anhaengen;
}
//Mit variabler Argumentenliste
function join2(...args) {
    let anhaengen = [];
    for (let j = 0; j < args.length; j++) {
        for (let i = 0; i < args[j].length; i++) {
            anhaengen.push(args[j][i]);
        }
    }
    return anhaengen;
}
//==========Aufgabe 2c==========
function split(_arr, index1, index2) {
    let neuesArray = [];
    let indexLow = 0;
    let indexHigh = 0;
    if (index1 < 0) {
        index1 = 0;
    }
    else if (index1 >= _arr.length) {
        index1 = _arr.length;
    }
    if (index2 < 0) {
        index2 = 0;
    }
    else if (index2 >= _arr.length - 1) {
        index2 = _arr.length - 1;
    }
    if (index1 <= index2) {
        indexLow = index1;
        indexHigh = index2;
    }
    else {
        indexLow = index2;
        indexHigh = index1;
    }
    for (indexLow; indexLow <= indexHigh; indexLow++) {
        neuesArray.push(_arr[indexLow]);
    }
    return neuesArray;
}
//==============================
//==========Aufgabe 3===========
//==============================
let canvas = document.getElementById("myFirstCanvas");
let context = canvas.getContext("2d");
//==========Aufgabe 3a==========
//Dicke der Linie
context.lineWidth = 5;
//Boden
context.fillStyle = "green";
context.fillRect(0, 300, 500, 100);
//Himmel
context.fillStyle = "skyblue";
context.fillRect(0, 0, 500, 300);
//Haus
context.fillStyle = "grey";
context.fillRect(75, 200, 125, 130);
//Haustür
context.fillStyle = "brown";
context.fillRect(115, 270, 40, 60);
//Dach
context.fillStyle = "black";
context.beginPath();
context.moveTo(70, 200);
context.lineTo(138, 130);
context.lineTo(205, 200);
context.closePath();
context.fill();
context.stroke();
//Wolken1
context.fillStyle = "white";
context.beginPath();
context.moveTo(85, 40);
context.bezierCurveTo(65, 50, 65, 75, 115, 75);
context.bezierCurveTo(125, 90, 160, 90, 170, 75);
context.bezierCurveTo(210, 75, 210, 60, 195, 50);
context.bezierCurveTo(215, 20, 185, 15, 170, 25);
context.bezierCurveTo(160, 2, 125, 10, 125, 25);
context.bezierCurveTo(100, 2, 75, 10, 85, 40);
context.fill();
//Wolke2
let dx = 250;
let dy = 0;
context.beginPath();
context.moveTo(85 + dx, 40 + dy);
context.bezierCurveTo(65 + dx, 50 + dy, 65 + dx, 75 + dy, 115 + dx, 75 + dy);
context.bezierCurveTo(125 + dx, 90 + dy, 160 + dx, 90 + dy, 170 + dx, 75 + dy);
context.bezierCurveTo(210 + dx, 75 + dy, 210 + dx, 60 + dy, 195 + dx, 50 + dy);
context.bezierCurveTo(215 + dx, 20 + dy, 185 + dx, 15 + dy, 170 + dx, 25 + dy);
context.bezierCurveTo(160 + dx, 2 + dy, 125 + dx, 10 + dy, 125 + dx, 25 + dy);
context.bezierCurveTo(100 + dx, 2 + dy, 75 + dx, 10 + dy, 85 + dx, 40 + dy);
context.fill();
//Wolke3
dx = 150;
dy = 80;
context.beginPath();
context.moveTo(85 + dx, 40 + dy);
context.bezierCurveTo(65 + dx, 50 + dy, 65 + dx, 75 + dy, 115 + dx, 75 + dy);
context.bezierCurveTo(125 + dx, 90 + dy, 160 + dx, 90 + dy, 170 + dx, 75 + dy);
context.bezierCurveTo(210 + dx, 75 + dy, 210 + dx, 60 + dy, 195 + dx, 50 + dy);
context.bezierCurveTo(215 + dx, 20 + dy, 185 + dx, 15 + dy, 170 + dx, 25 + dy);
context.bezierCurveTo(160 + dx, 2 + dy, 125 + dx, 10 + dy, 125 + dx, 25 + dy);
context.bezierCurveTo(100 + dx, 2 + dy, 75 + dx, 10 + dy, 85 + dx, 40 + dy);
context.fill();
//Baum
context.fillStyle = "brown";
context.fillRect(400, 220, 20, 100);
context.fillStyle = "green";
context.beginPath();
context.ellipse(410, 190, 40, 70, 0, 0, Math.PI * 2);
context.closePath();
context.fill();
//==========Aufgabe 3b/c/f========
class Rechteck {
    constructor() {
        this.width = 200 * Math.random();
        this.height = 150 * Math.random();
        this.xLeft = 100 * Math.random();
        this.yLeft = 100 * Math.random();
        this.color = "red";
        this.gefuellt = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    //==========Aufgabe 3d/f=========
    drawRect(ctx) {
        if (this.gefuellt == true) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.xLeft + this.offsetX, this.yLeft + this.offsetY, this.width, this.height);
        }
        else {
            ctx.strokeStyle = this.color;
            ctx.strokeRect(this.xLeft + this.offsetX, this.yLeft + this.offsetY, this.width, this.height);
        }
    }
    setOffset(_offsetX, _offsetY) {
        this.offsetX = _offsetX;
        this.offsetY = _offsetY;
    }
    setPosition(_xLeft, _yLeft) {
        this.xLeft = _xLeft;
        this.yLeft = _yLeft;
    }
    setSize(_width, _height) {
        this.width = _width;
        this.height = _height;
    }
    setOptions(_color, _fill) {
        this.color = _color;
        this.gefuellt = _fill;
    }
}
//==========Aufgabe 3e===========
//vier Rechteck Objekte anlegen
let myRect = new Rechteck();
let myRect1 = new Rechteck();
let myRect2 = new Rechteck();
let myRect3 = new Rechteck();
let myArray = [myRect, myRect1, myRect2, myRect3];
//Rechtecke verändern
myArray[1].setPosition(0, 0);
myArray[1].setSize(100, 100);
myArray[1].setOptions("green", true);
myArray[2].setOptions("yellow", false);
function drawNew() {
    context.clearRect(0, 0, 300, 300);
    for (let i = 0; i < myArray.length; i++) {
        myArray[i].drawRect(context);
    }
}
let offsetX = 2;
let offsetY = 1;
let posX = 0;
let posY = 0;
let myTimeout;
let myTimeoutStop;
function drawWithOffset() {
    posX += offsetX;
    posY += offsetY;
    for (let i = 0; i < myArray.length; i++) {
        myArray[i].setOffset(posX, posY);
    }
    drawNew();
}
function stop() {
    clearTimeout(myTimeout);
    clearTimeout(myTimeoutStop);
}
function aufgabe3() {
    drawNew();
    myTimeout = setInterval(drawWithOffset, 50);
    myTimeoutStop = setTimeout(stop, 3000);
}
//Auskommentieren um Bild aus Aufgabe 3a zu sehen
aufgabe3();
//# sourceMappingURL=script.js.map