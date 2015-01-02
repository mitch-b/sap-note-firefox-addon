var txtSearch = document.getElementById("txtSearch");
txtSearch.addEventListener('keyup', function onkeyup(event) {
    if (event.keyCode == 13) {
        text = txtSearch.value.trim();
        self.port.emit("search", text);
        txtSearch.value = '';
    }
}, false);

self.port.on("show", function onShow() {
    txtSearch.focus();
});
