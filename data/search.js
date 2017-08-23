var note_url = "https://launchpad.support.sap.com/#/notes/";
var search_url = "https://launchpad.support.sap.com/#/solutions/notes/?q=";

var searchButton = document.getElementById('btnSearch');
var noteInput = document.getElementById("note");

function handleSearch() {
  var userInput = noteInput.value;
  if (isNaN(userInput))
    search(userInput);
  else
    openNote(userInput);
}

function openNote(noteNumber) {
  var note = note_url + noteNumber;
  browser.tabs.create({
      url: note
  });
}

function search(searchText) {
  var terms = encodeURIComponent(searchText);
  browser.tabs.create({
      url: search_url + terms
  });
}

noteInput.addEventListener("keypress", function(event) {
  if (event.keyCode == 13) handleSearch();
});

searchButton.onclick = handleSearch;
noteInput.focus();