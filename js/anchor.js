/**
 * Created by josesolorzano on 12/17/15.
 */


var getParentAnchor = function (element) {
    while (element !== null) {
        if (element.tagName.toUpperCase() === "A") {
            return element;
        }
        element = element.parentNode;
    }
    return null;
};

document.querySelector("body").addEventListener('click', function(e) {
    var anchor = getParentAnchor(e.target);
    if(anchor !== null) {

        var href = $(anchor).attr('href')

        if(href.match("javascript:") == null)
        {
            e.preventDefault()
            e.stopPropagation()
            cordova.InAppBrowser.open(href,"_system");
        }

    }
}, false);