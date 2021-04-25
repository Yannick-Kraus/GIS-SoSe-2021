function a1(): void {
    let x: string = "Alles";
    console.log(x);
    func1_2();
    console.log(x);
    func1();
    //console.log(y);
    console.log(x);
    console.log("Logo!");
}

a1();

function func1(): void {
    console.log("Klar?");
}
//=========Aufgabe 1a+b==========
//Auf der Konsole wird erst "Alles" (Zeile 3) ausgegeben, danach springt er in die Funktion func1 (Zeile 4) und gibt "Klar?" aus (Zeile 11) und als letztes wird wieder in die Funktion a1 gesprungen und er gibt "Logo!" aus (Zeile 5).
//Bei den Variablennamen hat man fast freie Wahl. Man kann Ziffern (0-9), Buchstaben (A-Z) benutzen groß oder klein geschrieben, sowie Unterstriche oder das $ Zeichen. Nicht benutzt werden dürfen Bindestriche oder Leerzeichen, weiterhin dürfen auch keine Zahlen
//am anfang stehen oder Schlüsselwörter benutzt werden.


//==========Aufgabe 1c===========
function func1_2(): void {
    console.log("Gute!");
}


//==========Aufgabe 2============
function a2(): void {
    let i: number = 9;

    do {
        console.log(i);
        i = i - 1;
    } while ( i > 0);
}

a2();
//In der Funktion a2 wird der Variablen i ein Wert (9) zugewiesen. Die do while Schleife wird so lange durchlaufen, solange die Bedingung (i > 0) erfüllt ist. Bei jedem durchlauf wird zuerst der Wert der in i steht ausgegeben, danach wird der Wert in i um 1 reduziert.
//Dieser Vorgang wiederholt sich so lange bis die Bedingung nicht mehr zutrifft, dann springt man aus der Schleife heraus und die Funktion ist beendet.
//Es wird 9, 8, 7, 6, 5, 4, 3, 2, 1 ausgegeben bevor das Programm beendet ist.


//==========Aufgabe 3===========
//Mit Fehlern experimentiert z.B. "7:17 - error TS2304: Cannot find name y" --> für nicht deklarierte Variable, die in Zeile 7 benutzt wird


//==========Aufgabe 4a==========
//Zuerst wird "Hallo" ausgegeben, da in der globalen Variablen x der Wert "Hallo". Danach wird in func4 gesprungen, der Wert Hallo wird als Übergabeparameter an y übergeben, mit "Bla" überschrieben und ausgegeben, weil y den Wert "Bla" hat.
//Es wird wieder zurückgesprungen und "Hallo" ausgegeben, anschließend wird in func2 gesprungen.
//In func2 wird die lokale Variable x angelegt und mit "Blubb" initialisiert (!in der globalen Variablen x steht immer noch Hallo) und auch ausgegeben. Als letztes wird in die func3 gesprungen und die globale Variable x (hier steht Hallo) mit "Test" überschrieben
//beim der nächsten Ausgabe von x auf der Konsole wird "Test" ausgegeben.
let x: string = "Hallo";
console.log(x);
func4(x);
console.log(x);
func2();
func3();
console.log(x);

function func4(y: string): void {
    y = "Bla";
    console.log(y);
}

function func2(): void {
    let x: string = "Blubb";
    console.log(x);
}

function func3(): void {
    x = "Test";
}

//==========Aufgabe 4b==========
//Lokale Variablen in Funktionen sind von außen nicht aufrufbar, diese sind nur in der Funktion sichtbar und können auch nicht von außen geändert werden.
//Existiert eine globale Variable gleichen Namens hat die lokale vorrang.
//Globale Variablen sind von überall aufrufbar und auf sie kann auch in Funktionen zugegriffen werden.
//Übergabeparameter sind Variablen mit ihrem jeweiligen Typen die an Funktionen mitgegeben werden. Es wird eine Kopie übergeben. Übergabeparameter verhalten sich in Funktionen wie lokale Variablen.
//In Variablen werden Daten gespeichert, in Funktionen werden Befehle ausgeführt.

//==========Aufgabe 5a===========
//Tester Aufgabe 5
function test5(): void {
    let ergebnis: number;
    ergebnis = multiply(5, 3);
    console.log(ergebnis);
    ergebnis = max(7, 2);
    console.log(ergebnis);
    //hochzaehlen();
    random();
    ergebnis = factorial(0.5);
    console.log(ergebnis);
    ergebnis = factorial(4);
    console.log(ergebnis);
    leapyears();
}

test5();

test6();

function multiply(zahl1: number, zahl2: number): number {
    let ergebnis: number;
    ergebnis = zahl1 * zahl2;

    return ergebnis;
}

//==========Aufgabe 5b==========
function max(zahl1: number, zahl2: number): number {
    if (zahl1 > zahl2) {
        return zahl1;
    }
    else {
        return zahl2;
    }
}

//===========Aufgabe 5c==========
function hochzaehlen(): void {
    let zahl: number = 1;
    
    while (zahl <= 100) {
    console.log(zahl);
    zahl++;
    }
}

//==========Aufgabe 5d==========
function random(): void {
    let zahl: number;

    for (let i: number = 0; i < 10; i++) {
        zahl = Math.random() * 100;
        console.log(zahl);
    }
}

//==========Aufgabe 5e==========
function factorial(n: number): number {
    let zahl: number = 1;
    
    if (n < 1) {
        zahl = 1;
    }
    else {
        for (let i: number = 1; i <= n; i++) {
            zahl = zahl * i;
        }
    }

    return zahl;
}

//==========Aufgabe 5f==========
function leapyears(): void {
    let isLeapYear: boolean;

    for (let jahr: number = 1900; jahr < 2021; jahr++) {
        if (jahr % 400 == 0) {
            isLeapYear = true;
        }
        else if ((jahr % 4 == 0) && (jahr % 100 != 0)) {
            isLeapYear = true;
        }
        else {
            isLeapYear = false;
        }


        if (isLeapYear == true) {
            console.log(jahr);
        }
    }
}
//==========Aufgabe 6===========
//Tester
function test6(): void {
    treppe();
    fizzbuzz();
    fizzbuzz1();
    fizzbuzz2();
    console.log(schachbrett());
    console.log(schachbrett2(16));
}


//==========Aufgabe 6a==========
function treppe(): void {
    let text: string = "";
    for (let i: number = 0; i < 7; i++) {
        text = text + "#";
        console.log(text);
    }
}

//==========Aufgabe 6b==========
function fizzbuzz(): void {
    let text: string = "";
    for (let i: number = 1; i <= 100; i++) {
        text = "" + i;
        if (i % 3 == 0) {
            text = "Fizz";
        }
        else if (i % 5 == 0)  {
            text = "Buzz";
        }

        console.log(text);
    }
}

//==========Aufgabe 6c==========
function fizzbuzz1(): void {
    let text: string = "";
    for (let i: number = 1; i <= 100; i++) {
        text = "" + i;
        if ((i % 3 == 0) && (i % 5 != 0)) {
            text = "Fizz";
        }
        else if ((i % 5 == 0) && (i % 3 != 0)) {
            text = "Buzz";
        }
        else if ((i % 3 == 0) && (i % 5 == 0)) {
            text = "FizzBuzz";
        }

        console.log(text);
    }
}

//zweite Lösung
function fizzbuzz2(): void {
    let text: string = "";
    for (let i: number = 1; i <= 100; i++) {
        text = "" + i;
        if (i % 15 == 0) {
            text = "FizzBuzz";
        }
        else if (i % 3 == 0) {
            text = "Fizz";
        }
        else if ((i % 5 == 0) && (i % 3 != 0)) {
            text = "Buzz";
        }

        console.log(text);
    }
}

//==========Aufgabe 6d==========
function schachbrett(): string {
    let text: string = "";
    for (let i: number = 0; i < 8; i++) {
        text = text + "\n";
        for (let j: number = 0; j < 4; j++) {
            if (i % 2 == 0) {
                text = text + " #";
            }
            else {
                text = text + "# ";
            }
        }
    }

    return text;
}

//==========Aufgabe 6e==========
//nur einen Übergabeparameter, da Schachbrett immer quadratisch
function schachbrett2(anzahl: number): string {
let text: string = "";
for (let i: number = 0; i < anzahl; i++) {
    text = text + "\n";
    for (let j: number = 0; j < anzahl / 2; j++) {
        if (i % 2 == 0) {
            text = text + " #";
        }
        else {
            text = text + "# ";
        }
    }
}

return text;
}