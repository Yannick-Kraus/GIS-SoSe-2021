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




//Seite erzeugen. Auswahlkriterium ist der "Title" der Seite, welcher identisch mit Ident des Interfaces Imagemap 
//sein muss. Andernfalls wird nichts angezeigt.
function createThePage(_book: TheBook): void {
    let theTitle: string = document.title; 
    let theMap: Imagemap;
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
        createKlappbuch(book);
    }
    
    //wenn Variable theMap gültig gesetzt, Seite erzeugen
    if (theMap) {
        createAllTheImages(theMap);
    }
  
}

//Erzeugen eines einzelnen Bildes unter dem <div> mit Id = _map.ident
function createOneImage(_map: Imagemap, _id: number): void {
    let image: HTMLElement = document.createElement("img");
    image.setAttribute("src", _map.pictures[_id]);
    image.addEventListener("click", function(): void {onClickFunc(_map, _id); });
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
function onClickFunc(_map: Imagemap, _zahl: number): void {
    console.log("NEW CLICK");   //Testausgabe
    console.log("Index: " + _zahl);          //Testausgabe des Index
    _map.selectedItem = _zahl;
    console.log(book);         //Ausgabe geändertes book auf Console
    overwriteImageLink(document.title + "sel", _map.pictures[_zahl]);

    //Alle ausgewählt
    if ( checkAllSelected(book) == true) {
        saveSession();
        window.open("klappbuch.html", "_self");
    }
    
        
    }


function displayPreview(_book: TheBook): void {
    createPreviewImage(book.heads);
    createPreviewImage(book.bodies);
    createPreviewImage(book.legs);

}   

function createPreviewImage(_map: Imagemap): void {
    let image: HTMLElement = document.createElement("img");
    if (_map.selectedItem == -1) {
        image.setAttribute("src", "media/pictures/none.jpg");   
    }
    else {
        image.setAttribute("src", _map.pictures[_map.selectedItem]);
    }
    
    image.setAttribute("id", _map.ident + "sel");
    image.addEventListener("click", function(): void {onClickFuncPreview(_map); });
    document.getElementById("preview").appendChild(image);  
    
    }

function onClickFuncPreview(_map: Imagemap): void {
    saveSession();
    window.open(_map.ident + ".html", "_self");
    
    }  


function createKlappbuch(_book: TheBook): void {
    displayImage(_book.heads.pictures[_book.heads.selectedItem]);
    displayImage(_book.bodies.pictures[_book.bodies.selectedItem]);
    displayImage(_book.legs.pictures[_book.legs.selectedItem]);
    //Auswahl zurücksetzen
    _book.heads.selectedItem = -1;
    _book.bodies.selectedItem = -1;
    _book.legs.selectedItem = -1;
    saveSession();


}

function displayImage(_bild: string): void {
    let image: HTMLElement = document.createElement("img");
    image.setAttribute("src", _bild);
    document.getElementById("image").appendChild(image);  

}
    
    
function checkAllSelected(_book: TheBook): boolean {
  if ((_book.heads.selectedItem != -1) && (_book.bodies.selectedItem != -1) && (_book.legs.selectedItem != -1)) {
      return true;
  }
  else {
      return false;
  }
    
 }    


function overwriteImageLink (_item: string, _newlink: string): void {
  let element: HTMLElement = document.getElementById(_item);  
  element.setAttribute("src", _newlink);
}

//book Objekt im Cache des Browsers speichern
//Da nur strings abgespeichert werden können, erzeugen eines JSON strings aus book und abspeichern dieses strings
function saveSession(): void {
    sessionStorage.setItem("my", JSON.stringify(book)); 
}

function restoreFromSession(): void {
let bookFromJson: TheBook;
bookFromJson = JSON.parse(sessionStorage.getItem("my"));
//Wenn gültig Objekt book ersetzten, sonst belassen (neu anfangen da Book initialisiert in data.ts)
if (bookFromJson) {
   book =  bookFromJson; 
}
}


//Die Seiteninhalte für die jeweilige Seite heads.html, bodies.html oder legs.html erzeugen
restoreFromSession();
createThePage(book);
displayPreview(book);
console.log(book);   //Ausgabe book auf console (Initialzustand)



//######################## Aufgabe 1.a. JSON Test ##############################

function convertFromJson(_jsonString: string): TheBook {
  return JSON.parse(_jsonString); 
}

let book2: TheBook;


//Objekt book2 aus Json string (myJsonFromBook in data.ts)  erzeugen und ausgeben
book2 = convertFromJson(myJsonFromBook);
console.log("book2");
console.log(book2);


//###################### END Aufgabe 1.a.  JSON Test##########################



}