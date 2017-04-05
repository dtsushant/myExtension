
chrome.contextMenus.onClicked.addListener(function(info,tab){
   // console.log(window.getSelection().toString());
    var selectionText = info.selectionText
    if(isInt(selectionText))
    {
        var newURL = "https://deermine.deerwalk.com/issues/"+selectionText

    }else{
        var newURL = "https://deermine.deerwalk.com/search?q="+selectionText
    }
    chrome.tabs.create({ url: newURL });
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));

});


chrome.runtime.onInstalled.addListener(function() {
    /*var contexts = ["page","selection","link","editable","image","video",
        "audio"];*/
    var context = "selection";
    var title = "Search %s  in deermine";
    chrome.contextMenus.create({"title": title, "contexts":[context],
        "id": "context" + context
    });
});

function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

