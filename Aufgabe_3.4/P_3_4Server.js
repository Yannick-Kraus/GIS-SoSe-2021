"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_4Server = void 0;
const Http = require("http"); //laden des Modul http
const Url = require("url");
const Mongo = require("mongodb");
var P_3_4Server;
(function (P_3_4Server) {
    console.log("Starting server P3_4"); //Konsolenausgabe "Starting Server"
    let port = Number(process.env.PORT); //port einlesen
    if (!port) //wenn kein port(0), dann port auf 8100 setzen
        port = 8100;
    let server = Http.createServer(); //Server erzeugen
    server.addListener("request", handleRequest); //Listener für Request (Anfrage)
    server.addListener("listening", handleListen); //Listener für Listening (Verbindung)
    server.listen(port); //Server verbinden (mit port)
    //let databaseUrl: string = "mongodb://localhost:27017";
    let databaseUrl = "mongodb+srv://Yannick:test@yannick-gis.2e52g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    let students;
    connectDb(databaseUrl);
    function handleListen() {
        console.log("Listening"); //Konsolenausgabe
    }
    //Eventhandler eingehender Request
    async function handleRequest(_request, _response) {
        //!!!!!!!!!!!!!!!! Was bedeutet das durchgestrichene "parse" mit Info "veraltet" ? Wie würde man das aktuell machen? !!!!!!!!!!!!!!
        let q = Url.parse(_request.url, true);
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!                           
        let params = new URLSearchParams(q.search);
        console.log("I hear voices!");
        console.log(_request.url);
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Header erzeugen
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Header erzeugen
        if (q.pathname === "/read") {
            console.log("Daten lesen");
            console.log(readFromDatabase());
            console.log(JSON.stringify(await readFromDatabase()));
            _response.write(JSON.stringify(await readFromDatabase()));
        }
        else if (q.pathname === "/write") {
            console.log("Daten schreiben");
            storeToDatabase(JSON.parse(responseWithJson(params)));
            _response.write(responseWithJson(params));
        }
        else {
            _response.write(_request.url);
        }
        _response.end();
    }
    function responseWithJson(_mySearch) {
        let myString = "{";
        for (var pair of _mySearch.entries()) {
            myString += "\"" + pair[0] + "\":\"" + pair[1] + "\",";
        }
        myString = myString.slice(0, myString.length - 1);
        myString += "}";
        return myString;
    }
    async function connectDb(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        console.log("Connectimg database...");
        await mongoClient.connect();
        students = mongoClient.db("Test").collection("Students");
        console.log("done...", students != undefined);
    }
    function storeToDatabase(_student) {
        console.log("Store");
        console.log(_student);
        students.insert(_student);
    }
    async function readFromDatabase() {
        let cursor = students.find();
        let result = await cursor.toArray();
        console.log(result);
        return result;
    }
})(P_3_4Server = exports.P_3_4Server || (exports.P_3_4Server = {}));
//# sourceMappingURL=P_3_4Server.js.map