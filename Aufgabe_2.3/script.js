"use strict";
var Aufgabe2_3;
(function (Aufgabe2_3) {
    //==========Aufgabe 1==========
    function randomColor() {
        let color = "";
        let zahl = [];
        for (let i = 0; i < 3; i++) {
            zahl[i] = Math.floor(Math.random() * 255);
        }
        color = "rgb(" + zahl[0] + ", " + zahl[1] + ", " + zahl[2] + ")";
        return color;
    }
    function createRect() {
        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = (100 + Math.random() * 300) + "px"; //Buttons nicht übermalen
        div.style.left = (Math.random() * 300) + "px";
        div.style.width = (Math.random() * 500) + "px";
        div.style.height = (Math.random() * 500) + "px";
        div.style.backgroundColor = randomColor();
        document.getElementById("myOutline").appendChild(div);
    }
    function createReset() {
        let element = document.getElementById("myOutline");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    document.querySelector("#create").addEventListener("click", createRect);
    document.querySelector("#resetSide").addEventListener("click", createReset);
})(Aufgabe2_3 || (Aufgabe2_3 = {}));
//# sourceMappingURL=script.js.map