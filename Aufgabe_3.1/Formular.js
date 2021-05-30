"use strict";
let myServerResponse;
async function mySubmitFunc() {
    let formData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("username"));
    console.log(formData.get("pwd"));
    console.log(formData.get("LogInfo"));
    await sendFormData2Url("http://localhost:8100", formData);
    console.log("Serverantwort: ");
    console.log(myServerResponse);
}
let button = document.getElementById("myButton");
button.addEventListener("click", function () { mySubmitFunc(); });
//Daten aus Browsercache (hier sessionStorage) an Server senden
async function sendFormData2Url(_myRequest, _myFormData) {
    let query = new URLSearchParams(_myFormData);
    _myRequest = _myRequest + "?" + query.toString();
    //myServerResponse = <string> <unknown>((await fetch(_myRequest)));
    myServerResponse = await (await fetch(_myRequest)).text();
}
//# sourceMappingURL=Formular.js.map