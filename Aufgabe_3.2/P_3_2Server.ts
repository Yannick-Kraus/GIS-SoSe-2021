import * as Http from "http";                           //laden des Modul http
import * as Url from "url";


export namespace P_3_2Server {
    console.log("Starting server P3_2");                //Konsolenausgabe "Starting Server"
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
        //!!!!!!!!!!!!!!!! Was bedeutet das durchgestrichene "parse" mit Info "veraltet" ? Wie würde man das aktuell machen? !!!!!!!!!!!!!!
        let q = Url.parse(_request.url, true);     
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!                           
        let params: URLSearchParams = new URLSearchParams(q.search);
       
        console.log("I hear voices!");  
        console.log(_request.url);    
        _response.setHeader("content-type", "text/html; charset=utf-8");        //Header erzeugen
        _response.setHeader("Access-Control-Allow-Origin", "*");                //Header erzeugen
        
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

    function responseWithHtml(_mySearch: URLSearchParams): string {
        let myString: string = "";

        for (var pair of _mySearch.entries()) {
            myString += "    " + pair[0] + "  IS  " + pair[1] + "         ";
           
        }

        return myString;
    }


    function responseWithJson(_mySearch: URLSearchParams): string {
        let myString: string = "{";

        for (var pair of _mySearch.entries()) {
            myString += " \" " + pair[0] + " \" : \" " + pair[1] + "\" ,";
            
        }
        myString = myString.slice(0, myString.length - 1);
        myString += "}";
        return myString;
    }
}