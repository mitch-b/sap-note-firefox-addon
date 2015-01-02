var note_url = "http://service.sap.com/sap/support/notes/";
var search_url = "https://support.sap.com/content/sap-root/search-result-page.html?search=";

var { ToggleButton } = require("sdk/ui/button/toggle");
var tabs = require("sdk/tabs");
var panels = require("sdk/panel");
var self = require("sdk/self");


var button = ToggleButton({
    id: "sap-search",
    label: "Search SAP",
    icon: {
        "16": "./icon_16.png",
        "32": "./icon_32.png",
        "48": "./icon_48.png",
        "128": "./icon_128.png"
    },
    onChange: handleChange
});

var panel = panels.Panel({
    width: 220,
    height: 140,
    contentURL: self.data.url("search.html"),
    contentScriptFile: self.data.url("search.js"),
    contentStyleFile: self.data.url("styles.css"),
    onHide: handleHide
});

function handleHide() {
    button.state('window', { checked: false });
}

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
panel.on("show", function() {
    panel.port.emit("show");
});

// Listen for messages called "search" coming from
// the content script. The message payload is the text the user
// entered.
panel.port.on("search", function (text) {
    console.log(text);
    if (isNaN(text))
        search(text);
    else
        openNote(text);
    panel.hide();
});

//   tabs.open("https://developer.mozilla.org/");

function openNote(noteNumber) {
    var note = note_url + noteNumber;
    tabs.open(note);
}

function search(searchText) {
    var terms = encodeURIComponent(searchText);
    tabs.open(
        search_url + terms + "&_charset=UTF-8"
    );
}