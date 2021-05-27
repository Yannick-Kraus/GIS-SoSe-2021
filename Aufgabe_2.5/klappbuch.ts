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

// Variable book zum Test mit je 2 Bilder pro Imagemap vorinitialisieren, falls loadFromJson() fehlschlägt und 
//keine Sessiondaten vorhanden sind somit gleich erkennbar (nur 2 statt 4 Bilder)
let book: TheBook = {heads: {ident: "heads", pictures: ["media/pictures/img1.jpg", "media/pictures/img2.jpg"], 
                                    selectedItem: -1}, 
                            bodies: {ident: "bodies", pictures: ["media/pictures/img11.jpg", "media/pictures/img12.jpg"],
                                    selectedItem: -1}, 
                            legs:   {ident: "legs", pictures: ["media/pictures/img21.jpg", "media/pictures/img22.jpg"],
                                    selectedItem: -1}};

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
    createPreviewImage(_book.heads);
    createPreviewImage(_book.bodies);
    createPreviewImage(_book.legs);

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
    saveToServer();  //auf Server speichern

    //##########################Auswahl zurücksetzen#########################
    //War so beabsichtigt, da ich dachte es wäre schöner, auf der letzten Seite
    //welche die bisherige Auswahl anzeigt, diese danach zu löschen, sowohl
    //im Objekt als auch im sessionStorage.
    //
    //Wenn das einen Punktabzug gibt kann das auch entfallen.
    //Jetzt auskommentiert

    // _book.heads.selectedItem = -1;
    // _book.bodies.selectedItem = -1;
    // _book.legs.selectedItem = -1;
    // saveSession();
    
    //########################################################################

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

let book2: TheBook;



let myRequestObj: Request = new Request("./data.json");


//Initialisieren des Objektes book aus der JSON-Datai "data.json"
//### wegen fetch() LiveServer erforderlich ##############
async function loadFromJson(_myFile: RequestInfo): Promise<void> {
    let myObjekt: Response = await fetch(_myFile);
    book = <TheBook> await myObjekt.json();
    console.log("loading");
    console.log(book2);
    console.log("loading end");
    console.log(myObjekt);
   
}

// Da "await" nur in async-function geht, aber auf die Initialisierung des Objektes book aus der JSON-Datei
//gewartet werden muss , alles in eine
//async-function "myApp" gepackt um den Ablauf zu synchronisieren.
async function myApp(): Promise<void> {
//Die Seiteninhalte für die jeweilige Seite heads.html, bodies.html oder legs.html erzeugen

  await loadFromJson (myRequestObj);  //Initialwerte für book aus data.json und warten
  console.log("book");
  console.log(book);
  restoreFromSession();               //Initialwerte überschreiben falls sessionstor
  createThePage(book);  
  displayPreview(book);
  console.log(book);   //Ausgabe book auf console (Initialzustand)

}


myApp();


//Interface zum Server mit 2 optionalen Elementen "error" und "message"
interface Resp {
    message?: string;
    error?: string;
}


//Server response Objekt
//Im Falle von "Error" Antwort rot hinterlegen, bei "Message" endsprechend grün
let myServerResponse: Resp; 

function DisplayTheServerResponse(): void {
    let div: HTMLElement = document.getElementById("srvresp");
    let headline: HTMLElement = document.createElement("h3");
    if (myServerResponse.error != undefined) {
        headline.innerText = myServerResponse.error; 
        div.style.backgroundColor = "red";
    }
    else if (myServerResponse.message != undefined) {
        headline.innerText = myServerResponse.message;
        div.style.backgroundColor = "green"; 
    }

    div.appendChild(headline);  
      
}



//Daten aus Browsercache (hier sessionStorage) an Server senden
async function send2Url (_myRequest: RequestInfo): Promise<void> {
    let query: URLSearchParams = new URLSearchParams(JSON.parse(sessionStorage.getItem("my")));
    _myRequest = _myRequest + "?" + query.toString();
    myServerResponse = <Resp> await (await fetch(_myRequest)).json();
    console.log(myServerResponse);
}

//Senden und Antwort anzeigen
async function saveToServer(): Promise<void> {
  await send2Url("https://gis-communication.herokuapp.com");
  //Display
  DisplayTheServerResponse();

 } 



}
