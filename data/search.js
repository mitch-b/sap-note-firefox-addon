var txtSearch = document.getElementById("txtSearch");

function onkeyup(event) {
    if (event.keyCode == 13) {
        text = txtSearch.value.trim();
        self.port.emit("search", text);
        txtSearch.value = '';
        txtSearch.removeEventListener('keyup', onkeyup, false);
    }
}

function onShow() {
    txtSearch.focus();
    txtSearch.addEventListener('keyup', onkeyup, false);
}

self.port.on("show", onShow);
