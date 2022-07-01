(function Main() {


    Update();
})();

function BodyLoaded()
{
    var query = GetQueryParameters();
    //Params
    if (query != null) {
        var param = query.text;
        if (param != null && param.toString().length > 0) {
            var find = document.getElementById("__FIND");
            if (find) {
                find.value = param;
            }
        }
    }
}

function Update() {
    try {
    } catch (e) {

    }
    //Refresh
    setTimeout(Update, 10, null);
}


var back_inited = false;
var back_sec = 0;
var back_pos = 0;
var back_images = new Array();
var length = 3;
var back_urlFolder = "./images/backgrounds";
function BackgroundImageChanage() {
    if (!back_inited) {

        for (var i = 0; i < length; i++) {
            back_images[i] = back_urlFolder + "/background_0" + (i + 1).toString() + ".jpg";
        }

        back_inited = true;
    }

    if (back_sec > length - 1) {

        back_sec = 0;
    }

    ImageIndex(back_sec);

    setTimeout(BackgroundImageChanage, 5000, null);

    back_sec++;
}

function ImageIndex(index) {

    document.body.style.backgroundImage = "url(" + back_images[index] + ")";
}


/**********SYSTEM**********/


function GetQueryParameters() {
    var parameters = new Object();
    var l = window.location.search.substr(1).replace(/\+/g, ' ').split(/[&;]/);
    for (var i = 0; i < l.length; i++) {
        var p = l[i].split(/=/, 2);
        parameters[unescape(p[0])] = unescape(decodeURIComponent(p[1]));
    }
    return parameters;
}