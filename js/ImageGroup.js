var imageGroup = new Array(3);
var imageFiles = new Array();
var index = 0;
var lastIndex = 0;
function InitializeObject() {
    var path = "./images/media/img_ (";
    for (var i = 0; i < 10; i++) {
        imageFiles[i] = path + (i + 1) + ").JPG";
    }

    imageGroup[0] = document.getElementById("img_0");
    imageGroup[1] = document.getElementById("img_1");
    imageGroup[2] = document.getElementById("img_2");

    ImageDefPos();
}

function ImageDefPos() {
    for (var i = 0; i < imageGroup.length; i++) {
        SetBackgound(i, i);
    }
    lastIndex = index = 0;
}

function SetBackgound(index, imgIndex) {
    var elem = imageGroup[index];
    var a = elem.childNodes[0];
    a.innerText = elem.title = "Изображения " + (imgIndex + 1);
    a.onclick = function ()
    {
        ImageViewShow(imageFiles[imgIndex]);
    };
    elem.style.backgroundImage = "url('" + imageFiles[imgIndex] + "')";
}

function Img_Prev() {
    index--;
    if (index <= 0) {
        index = 0;
    }

    Set();
}

function Img_Next() {
    index++;
    var cnt = imageGroup.length;
    if (index >= imageFiles.length - cnt) {
        index = imageFiles.length - cnt;
    }

    Set();
}

function Set() {
    if (index == lastIndex)
        return;

    var count = imageFiles.length;

    for (var i = 0; i < imageGroup.length; i++)
        SetBackgound(i, i + index);

    lastIndex = index;
}