"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_2Server = void 0;
const Http = require("http"); //laden des Modul http
const Url = require("url");
var P_3_2Server;
(function (P_3_2Server) {
    console.log("Starting server P3_2"); //Konsolenausgabe "Starting Server"
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
        //!!!!!!!!!!!!!!!! Was bedeutet das durchgestrichene "parse" mit Info "veraltet" ? Wie würde man das aktuell machen? !!!!!!!!!!!!!!
        let q = Url.parse(_request.url, true);
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!                           
        let params = new URLSearchParams(q.search);
        console.log("I hear voices!");
        console.log(_request.url);
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Header erzeugen
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Header erzeugen
        if (q.pathname === "/html") {
            console.log("HTML empfangen");
            _response.write(responseWithHtml(params));
        }
        else if (q.pathname === "/json") {
            console.log("JSON empfangen");
            _response.write(responseWithJson(params));
        }
        else {
            _response.write(_request.url);
        }
        _response.end();
    }
    function responseWithHtml(_mySearch) {
        let myString = "";
        for (var pair of _mySearch.entries()) {
            myString += "    " + pair[0] + "  IS  " + pair[1] + "         ";
        }
        return myString;
    }
    function responseWithJson(_mySearch) {
        let myString = "{";
        for (var pair of _mySearch.entries()) {
            myString += " \" " + pair[0] + " \" : \" " + pair[1] + "\" ,";
        }
        myString = myString.slice(0, myString.length - 1);
        myString += "}";
        return myString;
    }
})(P_3_2Server = exports.P_3_2Server || (exports.P_3_2Server = {}));
//# sourceMappingURL=P_3_2Server.js.map