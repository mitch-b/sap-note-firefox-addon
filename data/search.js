//

// When the user hits return, send the "search"
// message to main.js.
// The message payload is the contents of the text box.
var txtSearch = document.getElementById("txtSearch");
txtSearch.addEventListener('keyup', function onkeyup(event) {
    if (event.keyCode == 13) {
        // Remove the newline.
        text = txtSearch.value.trim();
        self.port.emit("search", text);
        txtSearch.value = '';
    }
}, false);

// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text box so the user can
// just start typing.
self.port.on("show", function onShow() {
    debugger;
    txtSearch.focus();
});