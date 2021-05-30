"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http"); //laden des Modul http
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server"); //Konsolenausgabe "Starting Server"
    let port = Number(process.env.PORT); //port einlesen
    if (!port) //wenn kein port(0), dann port auf 8100 setzen
        port = 8100;
    let server = Http.createServer(); //Server erzeugen
    server.addListener("request", handleRequest); //Listener für Request (Anfrage)
    server.addListener("listening", handleListen); //Listener für Listening (Verbindung)
    server.listen(port); //Server verbinden (mit port)
    function handleListen() {
        console.log("Listening"); //Konsolenausgabe
    }
    //Eventhandler eingehender Request
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); //Konsolenausgabe
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Header erzeugen
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Header erzeugen
        _response.write(_request.url); //Request URL auf Webseite ausgeben (Serverantwort)
        console.log(_request.url); //zusätzlich Serverantwort auch auf Konsole ausgeben
        _response.end(); //Antwort abschließen/beenden
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=P_3_1Server.js.map