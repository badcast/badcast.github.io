(function menuDesign() {

})();


function main() {


    //Пока не рабочий
    return;

    function ulAction(v) {

        var li_s = v.childNodes;

        alert(li_s.Count);

        li_s.forEach(
            function (item, i, li_s) {
                if (item.nodeType != 1)
                    return;

                var a = getNode_a(item);

                console.log(a);
            });

    } 

    function getElementWidth(e)
    {

        return e;
    }

    function getNode_a(li) {
        var clds = li.childNodes;

        for (var i = 0; i < clds.length; i++) {
            var el = clds[i];

            if (el.localName == "a")
                return el;
        }

        return null;
    }

    var menuRoot_ul = document.getElementById("menu_parent").childNodes[1];
    ulAction(menuRoot_ul);

    for (var i = 0; i < length; i++) {
        elem.appendChild(l);
    }

}