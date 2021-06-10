"use strict";
let myServerResponse2;
async function SubmitFuncHtml() {
    let formData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("username"));
    console.log(formData.get("pwd"));
    console.log(formData.get("LogInfo"));
    await sendFormDataToUrlHtml("https://yannicksgis.herokuapp.com", formData);
    //await sendFormDataToUrlHtml ("http://localhost:8100", formData);
}
async function SubmitFuncJson() {
    let formData = new FormData(document.forms[0]);
    console.log("Einbegebene Daten:");
    console.log(formData.get("username"));
    console.log(formData.get("pwd"));
    console.log(formData.get("LogInfo"));
    await sendFormDataToUrlJson("https://yannicksgis.herokuapp.com", formData);
    //await sendFormDataToUrlJson ("http://localhost:8100", formData);
}
let buttonhtml = document.getElementById("myButtonhtml");
buttonhtml.addEventListener("click", function () { SubmitFuncHtml(); });
let buttonjson = document.getElementById("myButtonjson");
buttonjson.addEventListener("click", function () { SubmitFuncJson(); });
async function sendFormDataToUrlHtml(_myRequest, _myFormData) {
    let query = new URLSearchParams(_myFormData);
    _myRequest = _myRequest + "/html" + "?" + query.toString();
    myServerResponse2 = await (await fetch(_myRequest)).text();
    displayHtmlSrvResp(myServerResponse2);
    console.log("Serverantwort: ");
    console.log(myServerResponse2);
}
async function sendFormDataToUrlJson(_myRequest, _myFormData) {
    let query = new URLSearchParams(_myFormData);
    _myRequest = _myRequest + "/json" + "?" + query.toString();
    console.log("Serverantwort: ");
    console.log(await (await fetch(_myRequest)).json());
}
//Alternativ vorherige Antwort löschen.
function removePrevious() {
    let element = document.getElementById("srvresp");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
function displayHtmlSrvResp(_resp) {
    let text = document.createElement("div");
    text.innerText = _resp;
    // removePrevious();   //Zum Test lieber alle Antworten untereinander
    document.getElementById("srvresp").appendChild(text);
}
//# sourceMappingURL=Formular.js.map