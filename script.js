const myLibrary = [
  {
    title: "1984",
    author: "George Orwell",
    pages: "500",
    read: false
  }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  // do stuff here
  let bookToAdd = new Book(title, author, pages, read);
  myLibrary.push(bookToAdd);
}

function displayBooks() {
  let displayContainer = document.querySelector("#display-container");
  displayContainer.innerHTML = "";

  // Create the table element
  let table = document.createElement("table");
  table.setAttribute("id", "book-table");

  // Create the table header row
  let tableHeader = document.createElement("tr");
  let titleHeader = document.createElement("th");
  titleHeader.textContent = "Title";
  let authorHeader = document.createElement("th");
  authorHeader.textContent = "Author";
  let pagesHeader = document.createElement("th");
  pagesHeader.textContent = "Pages";
  let readHeader = document.createElement("th");
  readHeader.textContent = "Read?";
  let actionsHeader = document.createElement("th");
  actionsHeader.textContent = "Actions";

  // Append headers to the table header row
  tableHeader.appendChild(titleHeader);
  tableHeader.appendChild(authorHeader);
  tableHeader.appendChild(pagesHeader);
  tableHeader.appendChild(readHeader);
  tableHeader.appendChild(actionsHeader);
  table.appendChild(tableHeader);

  // Add book rows
  myLibrary.forEach((book, index) => {
    let bookRow = document.createElement("tr");
    bookRow.setAttribute("class", "book-row");

    // Title column
    let titleCell = document.createElement("td");
    titleCell.textContent = book.title;

    // Author column
    let authorCell = document.createElement("td");
    authorCell.textContent = book.author;

    // Pages column
    let pagesCell = document.createElement("td");
    pagesCell.textContent = book.pages;

    // Read status column
    let readCell = document.createElement("td");
    readCell.textContent = book.read ? "Yes" : "No";

    // Actions column (buttons for toggle and remove)
    let actionsCell = document.createElement("td");

    let toggleButton = document.createElement("button");
    toggleButton.setAttribute("class", "toggle-button");
   
    if (book.read === true) {
      toggleButton.textContent = "Mark as unread";
    } else if (book.read === false) {
      toggleButton.textContent = "Mark as read";
    }

    toggleButton.addEventListener("click", function() {
      myLibrary[index].read = !myLibrary[index].read;
      displayBooks();
    });

    let removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove-button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
      const userConfirmed = window.confirm("Do you really want to remove the book from the library?");

      if(userConfirmed) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    });

    actionsCell.appendChild(toggleButton);
    actionsCell.appendChild(removeButton);

    // Append cells to the row
    bookRow.appendChild(titleCell);
    bookRow.appendChild(authorCell);
    bookRow.appendChild(pagesCell);
    bookRow.appendChild(readCell);
    bookRow.appendChild(actionsCell);

    // Append row to the table
    table.appendChild(bookRow);
  });

  // Append the table to the display container
  displayContainer.appendChild(table);
}

displayBooks();

let showFormButton = document.createElement("button");
showFormButton.textContent = "Add book";
showFormButton.setAttribute("id", "show-form-button");
showFormButton.addEventListener("click", showBookForm);
let formContainer = document.querySelector("#form-container");
formContainer.appendChild(showFormButton);


function showBookForm() {
  showFormButton.remove();

  const formHTML = `
    <form id="book-form">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required>

      <label for="author">Author:</label>
      <input type="text" id="author" name="author" required>

      <label for="pages">Pages:</label>
      <input type="number" id="pages" name="pages" required min="1">

      <label for="read">Read:</label>
      <input type="checkbox" id="read" name="read">

      <button type="submit" id="add-book-button">Add to library</button>
    </form>
  `;

  let formContainer = document.querySelector("#form-container");
  formContainer.innerHTML = formHTML;

  // Focus the input element
  const titleInputElement = document.querySelector("#title");
  titleInputElement.focus();

  let form = document.querySelector("#book-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read") === "on"; // Checkbox returns "on" if checked

    addBookToLibrary(title, author, pages, read);

    while(formContainer.firstChild) {
      formContainer.firstChild.remove();
    }

    formContainer.appendChild(showFormButton);
    displayBooks();

  });
}


/*
// Helper function to create labeled inputs
function createLabeledInput(form, labelText, inputType, inputId, inputName) {
  const label = document.createElement("label");
  label.setAttribute("for", inputId);
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = inputType;
  input.id = inputId;
  input.name = inputName;

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(document.createElement("br")); // Line break for layout
  return input;
}

function showNewBookForm() {
  // Create the form element
  const form = document.createElement("form");
  form.id = "bookForm";

  // Add form fields
  createLabeledInput(form, "Title:", "text", "title", "title").required = true;
  createLabeledInput(form, "Author:", "text", "author", "author").required = true;
  createLabeledInput(form, "Pages:", "number", "pages", "pages").required = true;
  form.pages.min = 1; // Set minimum pages to 1

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "read");
  readLabel.textContent = "Read:";

  const readCheckbox = document.createElement("input");
  readCheckbox.type = "checkbox";
  readCheckbox.id = "read";
  readCheckbox.name = "read";

  form.appendChild(readLabel);
  form.appendChild(readCheckbox);
  form.appendChild(document.createElement("br")); // Line break for layout

  // Add submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Add Book";
  form.appendChild(submitButton);

  // Append form to the body or a specific container
  document.body.appendChild(form)
}
*/

/*
class Book {
  // the constructor...
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
*/
