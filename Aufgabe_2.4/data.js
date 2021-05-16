"use strict";
//Variable book des Interfaces TheBook
//Hier sind die Daten an einer Stelle
//Testweise wurden für bodies und legs dieselben Bilder verwendet
//um die Verwendung zu demonstrieren  
var klappbuch;
(function (klappbuch) {
    klappbuch.book = { heads: { ident: "heads", pictures: ["media/pictures/img1.jpg", "media/pictures/img2.jpg",
                "media/pictures/img3.jpg", "media/pictures/img4.jpg"],
            selectedItem: -1 },
        bodies: { ident: "bodies", pictures: ["media/pictures/img11.jpg", "media/pictures/img12.jpg",
                "media/pictures/img13.jpg", "media/pictures/img14.jpg"],
            selectedItem: -1 },
        legs: { ident: "legs", pictures: ["media/pictures/img21.jpg", "media/pictures/img22.jpg",
                "media/pictures/img23.jpg", "media/pictures/img24.jpg"],
            selectedItem: -1 } };
    //Manuell konvertiertes book Objekt in JSON
    klappbuch.myJsonFromBook = `
{
        "heads":{
            "ident":"heads",
            "pictures":[
                "media/pictures/img1.jpg",
                "media/pictures/img2.jpg",
                "media/pictures/img3.jpg",
                "media/pictures/img4.jpg"],
            "selectedItem":-1},
        "bodies":{
            "ident":"bodies",
            "pictures":[
                "media/pictures/img11.jpg",
                "media/pictures/img12.jpg",
                "media/pictures/img13.jpg",
                "media/pictures/img14.jpg"],
            "selectedItem":-1},
        "legs":{"ident":"legs",
        "pictures":[
            "media/pictures/img21.jpg",
            "media/pictures/img22.jpg",
            "media/pictures/img23.jpg",
            "media/pictures/img24.jpg"],
        "selectedItem":-1}
    }
 `;
})(klappbuch || (klappbuch = {}));
//# sourceMappingURL=data.js.map