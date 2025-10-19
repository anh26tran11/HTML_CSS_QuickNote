//Tạo tên biến cho id="theme_btn"
const theme_btn = document.getElementById("theme_btn");
const dialog_note = document.getElementById("dialog_note");
const close_btn = document.getElementById("close_btn");
const add_btn = document.getElementById("add_btn");
const add_new_btn = document.getElementById("add_new_btn");
const cancel_btn = document.getElementById("cancel_btn");
const save_btn = document.getElementById("save_btn");
const dialog_body = document.getElementById("dialog_body");
const note_state = document.getElementById("note_state");

let currentEditId = null; // Biến lưu ID note đang edit

//Kiểm tra localStorage khi tải trang
if (localStorage.getItem("theme") == "dark-theme") {
  document.body.classList.add("dark-theme");
  theme_btn.querySelector(".icon-light").style.display = "none";
  theme_btn.querySelector(".icon-dark").style.display = "block";
} else {
  document.body.classList.remove("dark-theme");
  theme_btn.querySelector(".icon-light").style.display = "block";
  theme_btn.querySelector(".icon-dark").style.display = "none";
}

//Tạo click cho id="theme_btn"
theme_btn.addEventListener("click", () => {
  //Tạo class dark-theme
  document.body.classList.toggle("dark-theme");

  //Lưu vào localStorage và cập nhật icon
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme");
    theme_btn.querySelector(".icon-light").style.display = "none";
    theme_btn.querySelector(".icon-dark").style.display = "block";
  } else {
    localStorage.setItem("theme", "light-theme");
    theme_btn.querySelector(".icon-light").style.display = "block";
    theme_btn.querySelector(".icon-dark").style.display = "none";
  }
});

//Tạo click cho id="add_btn"
add_btn.addEventListener("click", () => {
  currentEditId = null; // Reset edit mode
  dialog_body.reset();
  document.querySelector(".dialog_header div").textContent = "Add New Note";
  dialog_note.show();
});

//Tạo click cho id="close_btn"
close_btn.addEventListener("click", () => {
  dialog_note.close();
  dialog_body.reset();
  currentEditId = null;
});

//Tạo click cho id="add_new_btn"
add_new_btn.addEventListener("click", () => {
  currentEditId = null;
  dialog_body.reset();
  document.querySelector(".dialog_header div").textContent = "Add New Note";
  dialog_note.show();
});

//Tạo click cho id="cancel_btn"
cancel_btn.addEventListener("click", () => {
  dialog_note.close();
  dialog_body.reset();
  currentEditId = null;
});

//Hàm render notes
function renderNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const note_grid = document.getElementById("note_container");
  
  if (notes.length === 0) {
    note_state.style.display = "flex";
    note_grid.innerHTML = "";
    note_grid.appendChild(note_state);
    return;
  }
  
  note_state.style.display = "none";
  note_grid.innerHTML = "";
  
  notes.forEach((note) => {
    const note_item = document.createElement("div");
    note_item.classList.add("note_item");
    note_item.innerHTML = `
      <div class="note-card">
        <h3 class="note-title">${note.title}</h3>
        <p class="note-content">${note.content}</p>
        <div class="note-actions">
          <button class="edit-btn" onclick="openNoteDialog(${note.id})" title="Edit Note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
            </svg>
          </button>
          <button class="delete-btn" onclick="deleteNote(${note.id})" title="Delete Note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
    note_grid.appendChild(note_item);
  });
}

//Hàm delete note
function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

//Hàm mở dialog để edit note
function openNoteDialog(id) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const note = notes.find(n => n.id === id);
  
  if (note) {
    currentEditId = id;
    document.getElementById("title").value = note.title;
    document.getElementById("content").value = note.content;
    document.querySelector(".dialog_header div").textContent = "Edit Note";
    dialog_note.show();
  }
}

//Tạo click cho id="save_btn"
save_btn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  
  if (!title || !content) {
    alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
    return;
  }

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  
  if (currentEditId) {
    // Edit mode
    const index = notes.findIndex(n => n.id === currentEditId);
    if (index !== -1) {
      notes[index].title = title;
      notes[index].content = content;
    }
  } else {
    // Add mode
    const note = {
      id: Date.now(),
      title,
      content,
    };
    notes.push(note);
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  dialog_note.close();
  dialog_body.reset();
  currentEditId = null;
  renderNotes();
});

//Render notes khi tải trang
renderNotes();