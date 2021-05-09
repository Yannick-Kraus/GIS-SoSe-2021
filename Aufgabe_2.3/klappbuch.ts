namespace klappbuch {
 //------------------------------ Interface "Imagemap" ------------------------------------
 // ident: Identifikationsstring kann heads, bodies oder legs sein. Unter dem div mit dieser ident
 //         werden die Bilder erzeugt
 // pictures: string array mit den Pfaden wo die Bilder liegen
 // seleccted item: Das per click ausgewählte Bild
interface Imagemap {
    ident: string;
    pictures: string[];
    selectedItem: number;
}
//----------------------------- Interface gesamtes Buch ----------------------------------
// Keine weitern Attribute, TypeSkript soll nur funktionaler Teil sein, Design bleibt in CSS
// 3 mal Imagemap für Kopf, Körper unfd Beine
// heads: Interface Imagemap für den Kopf
// bodies: Interface Imagemap für den Body
// legs: Interface Imagemap für die Beine
//
//
export interface TheBook {
    heads: Imagemap;
    bodies: Imagemap;
    legs: Imagemap;
}

//Erzeugen eines einzelnen Bildes unter dem <div> mit Id = _map.ident
function createOneImage(_map: Imagemap, _id: number): void {
    let image: HTMLElement = document.createElement("img");
    image.setAttribute("src", _map.pictures[_id]);
    // tslint:disable-next-line: typedef
    //Mir ist völlig unklar wie ich über eine parameterlose Eventlistener Funktion sonst Rückschlüsse
    //auf das geclickte Element ziehen sollen. Es kann doch nicht das Ziel sein für jedes Element eine eignene 
    //parameterlose Funktion zu machen.
    //Mit Parameter ist in typescript ja möglich, dann kommt aber der LINT um`s Eck.
    //--> Habe mich für "LINT follows funktion" entschieden !
    //Über einen Tip würde ich mich freuen.
    image.addEventListener("click", function() {onClickFunc(_map, _id); });
    document.getElementById(_map.ident).appendChild(image);  
    
    }


//Erzeugt alle Bilder (img) einer Kategorie (heads, bodies, legs)
// unter dem <div> der id ident
function createAllTheImages(_map: Imagemap): void {
    for (let index: number = 0; index < _map.pictures.length; index++) {
         createOneImage(_map, index);
        
    }
}


//Eventlistener für click. SelectedItem im endsprechenden Interface wird auf den index
//des Bildarrays (pictures) gesetzt, welche geclickt wurde
function onClickFunc(_map: Imagemap, zahl: number): void {
    console.log("NEW CLICK");   //Testausgabe
    console.log("Index: " + zahl);          //Testausgabe des Index
    _map.selectedItem = zahl;
    console.log(book);         //Ausgabe geändertes book auf Console
    
    }


//Alle Bilder für die Köpfe auf heads.html erzeugen
createAllTheImages(book.heads);
console.log(book);   //Ausgabe book auf console (Initialzustand)

//Später folgen die anderen Unterseiten und die Erzeugung deren Bilder in gleicher Weise


}