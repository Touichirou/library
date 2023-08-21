const myLibrary = [];
const cardOne = document.getElementById(1);
const addButton = document.getElementById("addButton");
const confirmButton = document.getElementById("confirmBtn");
const cancelButton = document.getElementById("cancel");
const addDialog = document.getElementById("addDialog");
const form = document.getElementById("form");
const container = document.getElementById("container");


addButton.addEventListener("click", () => {
    addDialog.showModal();
  });

cancelButton.addEventListener("click", () => {
    addDialog.close();
  });

let duplicateChecker = function(title, author, pages) {
  for (i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i] === undefined) {
      continue;
    }
    if (title === myLibrary[i].title && author === myLibrary[i].author && pages === myLibrary[i].pages) {
      return "duplicate";
    }
  }
  return "unique";
};

confirmButton.addEventListener("click", (event) => {
    event.preventDefault(); 
    if (!form.checkValidity()) {
      alert("Please fill out all three of the required fields.");
      return;
    } 
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    if (duplicateChecker(title, author, pages) === "duplicate") {
      alert("A book with the same title, author, and number of pages already exists in your library.");
      return;
    }
    let read;
    let checkbox = document.getElementById("read");
    if (checkbox.checked == true) {
      read = "Read";
    }
    if (checkbox.checked == false) {
      read = "Not yet read";
    }
    let userBook = new Book(title, author, pages, read);
    console.log(userBook);
    myLibrary.push(userBook);
    addBook();
    addDialog.close();
    }
  );

let i = 0;
let addBook = function() {
    for (; i < myLibrary.length; i++) {
    let newBook = document.createElement("div");
    let newBookTitle = document.createElement("p");
    let newBookAuthor = document.createElement("p");
    let newBookPages = document.createElement("p");
    
    let toggle = document.createElement("button");
    let remove = document.createElement("button");
    let removeText = document.createTextNode("Delete");
    remove.appendChild(removeText);
    remove.addEventListener("click", function handleClick(event) {
      removeIndex = event.target.parentElement.id;
      console.log(removeIndex);
      myLibrary.forEach(element => {
        console.log(element);
      });
      delete myLibrary[removeIndex];
      newBook.remove();
    });

    if (myLibrary[i].read === "Read") {
      toggle.classList.toggle("read");
      toggle.textContent = "and I have finished reading it.";
    } else {
      toggle.textContent = "and I have not yet read it.";
    }
    
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("read");
        toggle.textContent === "and I have finished reading it." ? toggle.textContent = "and I have not yet read it." : toggle.textContent = "and I have finished reading it.";
    });


    newBook.className = "card";
    newBook.id = i;
    toggle.id = "toggle" + i;
    remove.id = "remove" + i;
    newBookTitle.innerHTML += '"' + myLibrary[i].title + '"';
    newBookAuthor.innerHTML += "by" + " " + myLibrary[i].author;
    newBookPages.innerHTML += "contains" + " " + myLibrary[i].pages + " " + "pages";
    newBook.appendChild(newBookTitle);
    newBook.appendChild(newBookAuthor);
    newBook.appendChild(newBookPages);
    newBook.appendChild(toggle);
    newBook.appendChild(remove);
    container.appendChild(newBook);
    };
  };

class Book {
    constructor(title, author, pages, read)  {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }
    
}