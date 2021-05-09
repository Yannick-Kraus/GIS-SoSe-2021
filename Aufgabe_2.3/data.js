"use strict";
//Variable book des Interfaces TheBook
//Hier sind die Daten an einer Stelle
//Testweise wurden für bodies und legs dieselben Bilder verwendet
//um die Verwendung zu demonstrieren
var klappbuch;
(function (klappbuch) {
    klappbuch.book = { heads: { ident: "heads", pictures: ["media/pictures/img1.jpg", "media/pictures/img4.jpg",
                "media/pictures/img2.jpg", "media/pictures/img3.jpg"],
            selectedItem: -1 },
        bodies: { ident: "bodies", pictures: ["media/pictures/img1.jpg", "media/pictures/img4.jpg"],
            selectedItem: -1 },
        legs: { ident: "legs", pictures: ["media/pictures/img1.jpg", "media/pictures/img4.jpg"],
            selectedItem: -1 } };
})(klappbuch || (klappbuch = {}));
//# sourceMappingURL=data.js.map