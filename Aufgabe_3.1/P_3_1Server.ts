import * as Http from "http";                           //laden des Modul http

export namespace P_3_1Server {
    console.log("Starting server");                     //Konsolenausgabe "Starting Server"
    let port: number = Number(process.env.PORT);        //port einlesen
    if (!port)                                          //wenn kein port(0), dann port auf 8100 setzen
        port = 8100;        

    let server: Http.Server = Http.createServer();      //Server erzeugen
    server.addListener("request", handleRequest);       //Listener für Request (Anfrage)
    server.addListener("listening", handleListen);      //Listener für Listening (Verbindung)
    server.listen(port);                                //Server verbinden (mit port)

    function handleListen(): void {                     //Eventhandler Listening
        console.log("Listening");                       //Konsolenausgabe
    }

    //Eventhandler eingehender Request
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");                                          //Konsolenausgabe
        _response.setHeader("content-type", "text/html; charset=utf-8");        //Header erzeugen
        _response.setHeader("Access-Control-Allow-Origin", "*");                //Header erzeugen
        _response.write(_request.url);                                          //Request URL auf Webseite ausgeben (Serverantwort)
        console.log(_request.url);                                              //zusätzlich Serverantwort auch auf Konsole ausgeben
        _response.end();                                                        //Antwort abschließen/beenden
    }
}