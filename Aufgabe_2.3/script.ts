namespace Aufgabe2_3 {

//==========Aufgabe 1==========

function randomColor(): string {
    let color: string = "";
    let zahl: number[] = [];

    for (let i: number = 0; i < 3; i++) {
        zahl[i] = Math.floor(Math.random() * 255);
    }

    color = "rgb(" + zahl[0] + ", " + zahl[1] + ", " + zahl[2] + ")";
    
    return color;
}


function createRect(): void {
        let div: HTMLElement = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = (100 + Math.random() * 300) + "px";             //Buttons nicht übermalen
        div.style.left = (Math.random() * 300) + "px";
        div.style.width = (Math.random() * 500) + "px";
        div.style.height = (Math.random() * 500) + "px";
        div.style.backgroundColor = randomColor();
        document.getElementById("myOutline").appendChild(div);        
}

function createReset(): void {
    let element: HTMLElement = document.getElementById("myOutline");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

document.querySelector("#create").addEventListener("click", createRect);
document.querySelector("#resetSide").addEventListener("click", createReset);
}