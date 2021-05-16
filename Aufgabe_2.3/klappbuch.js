"use strict";
var klappbuch;
(function (klappbuch) {
    //Erzeugen eines einzelnen Bildes unter dem <div> mit Id = _map.ident
    function createOneImage(_map, _id) {
        let image = document.createElement("img");
        image.setAttribute("src", _map.pictures[_id]);
        // tslint:disable-next-line: typedef
        //Mir ist völlig unklar wie ich über eine parameterlose Eventlistener Funktion sonst Rückschlüsse
        //auf das geclickte Element ziehen sollen. Es kann doch nicht das Ziel sein für jedes Element eine eignene 
        //parameterlose Funktion zu machen.
        //Mit Parameter ist in typescript ja möglich, dann kommt aber der LINT um`s Eck.
        //--> Habe mich für "LINT follows funktion" entschieden !
        //Über einen Tip würde ich mich freuen.
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
    function onClickFunc(_map, zahl) {
        console.log("NEW CLICK"); //Testausgabe
        console.log("Index: " + zahl); //Testausgabe des Index
        _map.selectedItem = zahl;
        console.log(klappbuch.book1); //Ausgabe geändertes book auf Console
    }
    //Alle Bilder für die Köpfe auf heads.html erzeugen
    createAllTheImages(klappbuch.book1.heads);
    console.log(klappbuch.book1); //Ausgabe book auf console (Initialzustand)
    //Später folgen die anderen Unterseiten und die Erzeugung deren Bilder in gleicher Weise
})(klappbuch || (klappbuch = {}));
//# sourceMappingURL=klappbuch.js.map