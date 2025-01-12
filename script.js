// DOM References
const saveButton = document.getElementById("save-entry");
const entryTitle = document.getElementById("entry-title");
const entryContent = document.getElementById("entry-content");
const entriesContainer = document.getElementById("entries");
const searchBar = document.getElementById("search-bar");

// Load entries from localStorage
function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entriesContainer.innerHTML = "";

  entries.forEach(entry => createEntry(entry));
}

// Save a new entry
function saveEntry() {
  const title = entryTitle.value.trim();
  const content = entryContent.value.trim();

  if (!title || !content) {
    alert("Please provide both title and content.");
    return;
  }

  const newEntry = {
    title,
    content,
    date: new Date().toLocaleString()
  };

  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.push(newEntry);

  localStorage.setItem("journalEntries", JSON.stringify(entries));

  // Clear the form
  entryTitle.value = "";
  entryContent.value = "";

  loadEntries();
}

// Create an entry element
function createEntry(entry) {
  const entryElement = document.createElement("div");
  entryElement.className = "entry";

  entryElement.innerHTML = `
    <h3>${entry.title}</h3>
    <p>${entry.content}</p>
    <small>${entry.date}</small>
    <button onclick="deleteEntry('${entry.date}')">Delete</button>
  `;

  entriesContainer.appendChild(entryElement);
}

// Delete an entry
function deleteEntry(date) {
  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries = entries.filter(entry => entry.date !== date);

  localStorage.setItem("journalEntries", JSON.stringify(entries));
  loadEntries();
}

// Search for entries
function searchEntries() {
  const searchTerm = searchBar.value.toLowerCase();
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  entriesContainer.innerHTML = "";
  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm) || 
    entry.content.toLowerCase().includes(searchTerm)
  );

  filteredEntries.forEach(entry => createEntry(entry));
}

// Event Listeners
saveButton.addEventListener("click", saveEntry);
searchBar.addEventListener("input", searchEntries);

// Initialize
loadEntries();
