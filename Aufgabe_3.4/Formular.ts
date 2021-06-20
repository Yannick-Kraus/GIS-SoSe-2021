
let myServerResponse4: string; 


async function SubmitFuncRead(): Promise<void> {
    let formData: FormData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("name"));
    console.log(formData.get("firstname"));
    console.log(formData.get("registration"));
    await sendReadRequest ("https://yannicksgis.herokuapp.com");
    //await sendReadRequest ("http://localhost:8100");
}


async function SubmitFuncWrite(): Promise<void> {
    let formData: FormData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("name"));
    console.log(formData.get("firstname"));
    console.log(formData.get("registration"));

    await sendFormDataToUrlWrite ("https://yannicksgis.herokuapp.com", formData);
    //await sendFormDataToUrlWrite ("http://localhost:8100", formData);
    
}

let buttonwrite: HTMLElement = document.getElementById("myButtonWrite");
buttonwrite.addEventListener("click", function(): void {SubmitFuncWrite(); });

let buttonread: HTMLElement = document.getElementById("myButtonRead");
buttonread.addEventListener("click", function(): void {SubmitFuncRead(); });


async function sendReadRequest (_myRequest: RequestInfo): Promise<void> {
    _myRequest = _myRequest + "/read";
    myServerResponse4 = <string> await (await fetch(_myRequest)).text();
    displayHtmlSrvResp2(myServerResponse4);
    console.log("Serverantwort: ");
    console.log(myServerResponse4);

}

//Interface zum Server 
interface Respo {
    name: string;
    firstname: string;
    registration: string;
}

async function sendFormDataToUrlWrite (_myRequest: RequestInfo, _myFormData: FormData): Promise<void> {
    let query: URLSearchParams = new URLSearchParams(<any> _myFormData);
    _myRequest = _myRequest + "/write" + "?" + query.toString();
    console.log("Serverantwort: ");
    console.log(<Respo> await (await fetch(_myRequest)).json());
    
}

//Alternativ vorherige Antwort löschen.
function cleanUp(): void {
    let element: HTMLElement = document.getElementById("srvresp");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function displayHtmlSrvResp2(_resp: string): void { 

    let text: HTMLElement = document.createElement("div");
    text.innerText = _resp;
    cleanUp();

    document.getElementById("srvresp").appendChild(text);  

}