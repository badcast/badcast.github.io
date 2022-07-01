var maskElement = null;
var image = null;

//Показывает предварительный просмотр
function ImageViewShow(imageUrl) {
    if (maskElement == null) {
        maskElement = document.createElement("ImageViewMask");
        maskElement.id = "ImageView";
        document.getElementById("main").appendChild(maskElement);
        var buttonClose = document.createElement("button");
        maskElement.appendChild(buttonClose);
        buttonClose.innerText = "x";
        buttonClose.onclick = ImageViewClose;
        buttonClose.title = "Close Image";
        image = document.createElement("img");
        maskElement.appendChild(image);
    }

    image.src = imageUrl;

    maskElement.style.display = "block";
    window.scroll(0, 0);
}

//Закрывает предварительный просмотр
function ImageViewClose() {
    maskElement.style.display = "none";
}