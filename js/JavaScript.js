var windows = [];

(function main(Window) {
})(window);

function loaded()
{
    createDialogBox(document.getElementById("dialogBox"));

}

function registerWindowFromId(elementId) {
    registerWindow(document.getElementById(elementId));
}
function registerWindow(windowElement) {
    
}

function showWindow(id) {

}

function closeWindow(id) {

}

function getCurrentWindow() {

}

function closePost(elem)
{
    $(elem.parentElement).animate({ "opacity": "0" }, 1);
    setTimeout(function () {
        $(elem.parentElement).css({ "display": "none" });
    }, 300);
    document.removeChild()
}

function dlgBoxShow()
{
    
}

function dlgBoxClose()
{

}

function dlgBoxSend()
{

}