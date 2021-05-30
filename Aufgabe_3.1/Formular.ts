
let myServerResponse: string; 

async function mySubmitFunc(): Promise<void> {
    let formData: FormData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("username"));
    console.log(formData.get("pwd"));
    console.log(formData.get("LogInfo"));

    await sendFormData2Url ("http://localhost:8100", formData);
    console.log("Serverantwort: ");
    console.log(myServerResponse);



}

let button: HTMLElement = document.getElementById("myButton");
button.addEventListener("click", function(): void {mySubmitFunc(); });



//Daten aus Browsercache (hier sessionStorage) an Server senden
async function sendFormData2Url (_myRequest: RequestInfo, _myFormData: FormData): Promise<void> {
    let query: URLSearchParams = new URLSearchParams(<any> _myFormData);
    _myRequest = _myRequest + "?" + query.toString();
    //myServerResponse = <string> <unknown>((await fetch(_myRequest)));
    myServerResponse = <string> await (await fetch(_myRequest)).text();
 
}
