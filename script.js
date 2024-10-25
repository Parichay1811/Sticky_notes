
const noteInput = document.getElementById('note-input');
const colorPicker = document.getElementById('color-picker');
const addNoteButton = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');
function createNote() {
    const noteText = noteInput.value;
    const noteColor = colorPicker.value;

    
    if (noteText.trim() !== '') {
        
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = noteColor;

        
        const noteContent = document.createElement('span');
        noteContent.textContent = noteText;
        noteElement.appendChild(noteContent);

       
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = function () {
            notesContainer.removeChild(noteElement);
        };

        noteElement.appendChild(deleteButton);
        notesContainer.appendChild(noteElement);
        noteInput.value = '';
    } else {
        alert('Please enter a note.');
    }
}
addNoteButton.addEventListener('click', createNote);
