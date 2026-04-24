const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function createNoteStructure() {
    let noteWrapper = document.createElement("div");
    noteWrapper.className = "note-wrapper";

    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    let iconsDiv = document.createElement("div");
    iconsDiv.className = "icons-container";

    let saveImg = document.createElement("img");

    saveImg.src = "save.jpg"; 
    saveImg.className = "save-btn";

    let delImg = document.createElement("img");
    delImg.src = "delete.png";
    delImg.className = "delete-btn";

    iconsDiv.appendChild(saveImg);
    iconsDiv.appendChild(delImg);
    
    noteWrapper.appendChild(inputBox);
    noteWrapper.appendChild(iconsDiv);
 
    notesContainer.prepend(noteWrapper);
    inputBox.focus();
}

createBtn.addEventListener("click", () => {
    createNoteStructure();
    updateStorage();
});

notesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        e.target.closest(".note-wrapper").remove();
        updateStorage();
    } 
    else if (e.target.classList.contains("save-btn")) {
        updateStorage();
        createNoteStructure(); 
    }
});

// This saves as you type so you never lose work
notesContainer.addEventListener("input", updateStorage);

document.addEventListener("keydown", event => {
    if (event.key === "Enter" && document.activeElement.classList.contains("input-box")) {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
