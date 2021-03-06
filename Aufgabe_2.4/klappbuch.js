"use strict";
var klappbuch;
(function (klappbuch) {
    //Seite erzeugen. Auswahlkriterium ist der "Title" der Seite, welcher identisch mit Ident des Interfaces Imagemap 
    //sein muss. Andernfalls wird nichts angezeigt.
    function createThePage(_book) {
        let theTitle = document.title;
        let theMap;
        //setzen der Variable theMap abhängig von der Seite die geladen wird
        if (theTitle === _book.heads.ident) {
            theMap = _book.heads;
        }
        else if (theTitle === _book.bodies.ident) {
            theMap = _book.bodies;
        }
        else if (theTitle === _book.legs.ident) {
            theMap = _book.legs;
        }
        else if (theTitle === "klappbuch") {
            createKlappbuch(klappbuch.book3);
        }
        //wenn Variable theMap gültig gesetzt, Seite erzeugen
        if (theMap) {
            createAllTheImages(theMap);
        }
    }
    //Erzeugen eines einzelnen Bildes unter dem <div> mit Id = _map.ident
    function createOneImage(_map, _id) {
        let image = document.createElement("img");
        image.setAttribute("src", _map.pictures[_id]);
        image.addEventListener("click", function () { onClickFunc(_map, _id); });
        document.getElementById(_map.ident).appendChild(image);
    }
    //Erzeugt alle Bilder (img) einer Kategorie (heads, bodies, legs)
    // unter dem <div> der id ident
    function createAllTheImages(_map) {
        for (let index = 0; index < _map.pictures.length; index++) {
            createOneImage(_map, index);
        }
    }
    //Eventlistener für click. SelectedItem im endsprechenden Interface wird auf den index
    //des Bildarrays (pictures) gesetzt, welche geclickt wurde
    function onClickFunc(_map, _zahl) {
        console.log("NEW CLICK"); //Testausgabe
        console.log("Index: " + _zahl); //Testausgabe des Index
        _map.selectedItem = _zahl;
        console.log(klappbuch.book3); //Ausgabe geändertes book auf Console
        overwriteImageLink(document.title + "sel", _map.pictures[_zahl]);
        //Alle ausgewählt
        if (checkAllSelected(klappbuch.book3) == true) {
            saveSession();
            window.open("klappbuch.html", "_self");
        }
    }
    function displayPreview(_book) {
        createPreviewImage(_book.heads);
        createPreviewImage(_book.bodies);
        createPreviewImage(_book.legs);
    }
    function createPreviewImage(_map) {
        let image = document.createElement("img");
        if (_map.selectedItem == -1) {
            image.setAttribute("src", "media/pictures/none.jpg");
        }
        else {
            image.setAttribute("src", _map.pictures[_map.selectedItem]);
        }
        image.setAttribute("id", _map.ident + "sel");
        image.addEventListener("click", function () { onClickFuncPreview(_map); });
        document.getElementById("preview").appendChild(image);
    }
    function onClickFuncPreview(_map) {
        saveSession();
        window.open(_map.ident + ".html", "_self");
    }
    function createKlappbuch(_book) {
        displayImage(_book.heads.pictures[_book.heads.selectedItem]);
        displayImage(_book.bodies.pictures[_book.bodies.selectedItem]);
        displayImage(_book.legs.pictures[_book.legs.selectedItem]);
        //Auswahl zurücksetzen
        _book.heads.selectedItem = -1;
        _book.bodies.selectedItem = -1;
        _book.legs.selectedItem = -1;
        saveSession();
    }
    function displayImage(_bild) {
        let image = document.createElement("img");
        image.setAttribute("src", _bild);
        document.getElementById("image").appendChild(image);
    }
    function checkAllSelected(_book) {
        if ((_book.heads.selectedItem != -1) && (_book.bodies.selectedItem != -1) && (_book.legs.selectedItem != -1)) {
            return true;
        }
        else {
            return false;
        }
    }
    function overwriteImageLink(_item, _newlink) {
        let element = document.getElementById(_item);
        element.setAttribute("src", _newlink);
    }
    //book Objekt im Cache des Browsers speichern
    //Da nur strings abgespeichert werden können, erzeugen eines JSON strings aus book und abspeichern dieses strings
    function saveSession() {
        sessionStorage.setItem("my", JSON.stringify(klappbuch.book3));
    }
    function restoreFromSession() {
        let bookFromJson;
        bookFromJson = JSON.parse(sessionStorage.getItem("my"));
        //Wenn gültig Objekt book ersetzten, sonst belassen (neu anfangen da Book initialisiert in data.ts)
        if (bookFromJson) {
            klappbuch.book3 = bookFromJson;
        }
    }
    //Die Seiteninhalte für die jeweilige Seite heads.html, bodies.html oder legs.html erzeugen
    restoreFromSession();
    createThePage(klappbuch.book3);
    displayPreview(klappbuch.book3);
    console.log(klappbuch.book3); //Ausgabe book auf console (Initialzustand)
    //######################## Aufgabe 1.a. JSON Test ##############################
    function convertFromJson(_jsonString) {
        return JSON.parse(_jsonString);
    }
    let book2;
    //Objekt book2 aus Json string (myJsonFromBook in data.ts)  erzeugen und ausgeben
    book2 = convertFromJson(klappbuch.myJsonFromBook1);
    console.log("book2");
    console.log(book2);
    //###################### END Aufgabe 1.a.  JSON Test##########################
})(klappbuch || (klappbuch = {}));
//# sourceMappingURL=klappbuch.js.map