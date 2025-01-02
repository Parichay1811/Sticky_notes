// Select necessary DOM elements
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");
const colorPicker = document.querySelector(".color-picker");

// Load existing notes from localStorage and render them
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

// Add event listener for adding a new note
addNoteButton.addEventListener("click", () => addNote());

// Retrieve notes from localStorage
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// Save notes to localStorage
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// Create a note element
function createNoteElement(id, content) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Add note";
    element.spellcheck = true;

    // Set the background color of the note
    element.style.backgroundColor = colorPicker.value;

    // Update note content on change
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    // Delete note on double-click
    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Do you want to delete this note?");
        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

// Add a new note
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

// Update a note's content
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.find(note => note.id === id);
    if (targetNote) {
        targetNote.content = newContent;
        saveNotes(notes);
    }
}

// Delete a note
function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id !== id);
    saveNotes(notes);
    notesContainer.removeChild(element);
}
