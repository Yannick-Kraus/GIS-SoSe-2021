
let myServerResponse2: string; 


async function SubmitFuncHtml(): Promise<void> {
    let formData: FormData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("username"));
    console.log(formData.get("pwd"));
    console.log(formData.get("LogInfo"));

    await sendFormDataToUrlHtml ("https://yannicksgis.herokuapp.com", formData);
    //await sendFormDataToUrlHtml ("http://localhost:8100", formData);
    


}

async function SubmitFuncJson(): Promise<void> {
    let formData: FormData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("username"));
    console.log(formData.get("pwd"));
    console.log(formData.get("LogInfo"));

    await sendFormDataToUrlJson ("https://yannicksgis.herokuapp.com", formData);
    //await sendFormDataToUrlJson ("http://localhost:8100", formData);
    
}

let buttonhtml: HTMLElement = document.getElementById("myButtonhtml");
buttonhtml.addEventListener("click", function(): void {SubmitFuncHtml(); });

let buttonjson: HTMLElement = document.getElementById("myButtonjson");
buttonjson.addEventListener("click", function(): void {SubmitFuncJson(); });


async function sendFormDataToUrlHtml (_myRequest: RequestInfo, _myFormData: FormData): Promise<void> {
    let query: URLSearchParams = new URLSearchParams(<any> _myFormData);
    _myRequest = _myRequest + "/html" + "?" + query.toString();
    myServerResponse2 = <string> await (await fetch(_myRequest)).text();
    displayHtmlSrvResp(myServerResponse2);
    console.log("Serverantwort: ");
    console.log(myServerResponse2);

}


//Interface zum Server 
interface Respo {
    username?: string;
    pwd?: string;
    LogInfo?: string;
}

async function sendFormDataToUrlJson (_myRequest: RequestInfo, _myFormData: FormData): Promise<void> {
    let query: URLSearchParams = new URLSearchParams(<any> _myFormData);
    _myRequest = _myRequest + "/json" + "?" + query.toString();
    console.log("Serverantwort: ");
    console.log(<Respo> await (await fetch(_myRequest)).json());
    
}

//Alternativ vorherige Antwort löschen.
function removePrevious(): void {
    let element: HTMLElement = document.getElementById("srvresp");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function displayHtmlSrvResp(_resp: string): void { 

    let text: HTMLElement = document.createElement("div");
    text.innerText = _resp;
   // removePrevious();   //Zum Test lieber alle Antworten untereinander

    document.getElementById("srvresp").appendChild(text);  

}