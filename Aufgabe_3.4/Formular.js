"use strict";
let myServerResponse4;
async function SubmitFuncRead() {
    let formData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("name"));
    console.log(formData.get("firstname"));
    console.log(formData.get("registration"));
    await sendReadRequest("https://yannicksgis.herokuapp.com");
    //await sendReadRequest ("http://localhost:8100");
}
async function SubmitFuncWrite() {
    let formData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("name"));
    console.log(formData.get("firstname"));
    console.log(formData.get("registration"));
    await sendFormDataToUrlWrite("https://yannicksgis.herokuapp.com", formData);
    //await sendFormDataToUrlWrite ("http://localhost:8100", formData);
}
let buttonwrite = document.getElementById("myButtonWrite");
buttonwrite.addEventListener("click", function () { SubmitFuncWrite(); });
let buttonread = document.getElementById("myButtonRead");
buttonread.addEventListener("click", function () { SubmitFuncRead(); });
async function sendReadRequest(_myRequest) {
    _myRequest = _myRequest + "/read";
    myServerResponse4 = await (await fetch(_myRequest)).text();
    displayHtmlSrvResp2(myServerResponse4);
    console.log("Serverantwort: ");
    console.log(myServerResponse4);
}
async function sendFormDataToUrlWrite(_myRequest, _myFormData) {
    let query = new URLSearchParams(_myFormData);
    _myRequest = _myRequest + "/write" + "?" + query.toString();
    console.log("Serverantwort: ");
    console.log(await (await fetch(_myRequest)).json());
}
//Alternativ vorherige Antwort löschen.
function cleanUp() {
    let element = document.getElementById("srvresp");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
function displayHtmlSrvResp2(_resp) {
    let text = document.createElement("div");
    text.innerText = _resp;
    cleanUp();
    document.getElementById("srvresp").appendChild(text);
}
//# sourceMappingURL=Formular.js.map