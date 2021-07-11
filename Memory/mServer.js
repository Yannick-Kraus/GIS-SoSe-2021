"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mServer = void 0;
const Http = require("http"); //laden des Modul http
const Url = require("url");
const Mongo = require("mongodb");
var mServer;
(function (mServer) {
    let imglink = { imagelinks: "" };
    console.log("Starting mServer"); //Konsolenausgabe "Starting Server"
    let port = Number(process.env.PORT); //port einlesen
    if (!port) //wenn kein port(0), dann port auf 8100 setzen
        port = 8100;
    let server = Http.createServer(); //Server erzeugen
    server.addListener("request", handleRequest); //Listener für Request (Anfrage)
    server.addListener("listening", handleListen); //Listener für Listening (Verbindung)
    server.listen(port); //Server verbinden (mit port)
    let databaseUrl = "mongodb://localhost:27017";
    //let databaseUrl: string = "mongodb+srv://Yannick:test@yannick-gis.2e52g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    let cards;
    let scores;
    connectDb(databaseUrl);
    function handleListen() {
        console.log("Listening"); //Konsolenausgabe
    }
    //Eventhandler eingehender Request
    async function handleRequest(_request, _response) {
        let q = Url.parse(_request.url, true);
        let params = new URLSearchParams(q.search);
        console.log("I hear voices!");
        console.log(_request.url);
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Header erzeugen
        _response.setHeader("Access-Control-Allow-Origin", "*"); //Header erzeugen
        if (q.pathname === "/rd_links") {
            console.log("Bildlinks lesen");
            console.log(readLinksFromDatabase());
            console.log(JSON.stringify(await readLinksFromDatabase()));
            _response.write(JSON.stringify(await readLinksFromDatabase()));
        }
        else if (q.pathname === "/rd_score") {
            console.log("Highscores lesen");
            console.log(readScoresFromDatabase());
            console.log(JSON.stringify(await readScoresFromDatabase()));
            _response.write(JSON.stringify(await readScoresFromDatabase()));
        }
        else if (q.pathname === "/wr_link") {
            console.log("Bildlink hinzufügen");
            imglink.imagelinks = responseWithJson(params);
            console.log(imglink);
            storeLinkToDatabase(imglink);
            _response.write(JSON.stringify(await readLinksFromDatabase()));
        }
        else if (q.pathname === "/wr_delete") {
            console.log("Bildlink entfernen");
            imglink.imagelinks = responseWithJson(params);
            console.log(imglink);
            removeLinkFromDatabase(imglink);
            _response.write(JSON.stringify(await readLinksFromDatabase()));
        }
        else if (q.pathname === "/wr_score") {
            console.log("Scoring hinzufügen");
            console.log(responseWithJson(params));
            storeScoreToDatabase(JSON.parse(responseWithJson(params))); //TODO
            _response.write(JSON.stringify(await readScoresFromDatabase()));
        }
        else {
            _response.write(_request.url);
        }
        _response.end();
    }
    async function connectDb(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        console.log("Connecting database...");
        await mongoClient.connect();
        cards = mongoClient.db("Memory").collection("Cards");
        console.log("done for cards...", cards != undefined);
        scores = mongoClient.db("Memory").collection("Scores");
        console.log("done for Scores...", scores != undefined);
    }
    function storeLinkToDatabase(_card) {
        console.log("Add Bildlink");
        console.log(_card);
        cards.insert(_card);
    }
    function removeLinkFromDatabase(_card) {
        console.log("Remove Bildlink");
        console.log(_card);
        cards.deleteOne(_card);
    }
    function storeScoreToDatabase(_result) {
        console.log("Add Score result");
        console.log(_result);
        scores.insert(_result);
    }
    async function readLinksFromDatabase() {
        let cursor = cards.find();
        let result = await cursor.toArray();
        console.log(result);
        return result;
    }
    async function readScoresFromDatabase() {
        let cursor = scores.find();
        let result = await cursor.toArray();
        console.log(result);
        return result;
    }
    function responseWithJson(_mySearch) {
        let myString = "{";
        let newstring;
        for (var pair of _mySearch.entries()) {
            newstring = pair[0];
            myString += "\"" + pair[0] + "\":\"" + pair[1] + "\",";
        }
        myString = myString.slice(0, myString.length - 1);
        myString += "}";
        return newstring;
    }
})(mServer = exports.mServer || (exports.mServer = {}));
//# sourceMappingURL=mServer.js.map