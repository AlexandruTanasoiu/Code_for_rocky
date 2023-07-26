// This is the general script
let uniqueTicketID = 0;
let toDoAppData = [];
let keysStorage = Object.keys(localStorage);

const ticketData = {
  id: "",
  title: "",
  fname: "",
  lname: "",
  descript: "",
};

// Declare elements from HTML
// add form for new tickets
const addButton = document.getElementById("addButton"); //add a new ticket
const formContainer = document.getElementById("formContainer"); // form with ticket data
const titleTicket = document.getElementById("titleTicket"); // input add element for title of new ticket
const fnameTicket = document.getElementById("fnameTicket"); // input add element for firstname of new ticket
const lnameTicket = document.getElementById("lnameTicket"); // input add element for lastname of new ticket
const descriptTicket = document.getElementById("descriptTicket"); // textarea element for description of new ticket
const submitButton = document.getElementById("submitButton"); // submit data for a new ticket

// list window with all saved tickets
const listContainer = document.getElementById("listContainer"); // window with all registred tickets
const clearButton = document.getElementById("clearButton"); // btn that clear local database

// modal element to edit a ticket
const modalForm = document.getElementById("modalForm"); // modal form container
const saveButton = document.getElementById("saveButton"); // btn that push edited data
const modalTitle = document.getElementById("modalTitle"); // modal input title
const modalFname = document.getElementById("modalFname"); // modal input first name
const modalLname = document.getElementById("modalLname"); // modal input last name
const modalDescript = document.getElementById("modalDescript"); // modal textarea field

addButton.addEventListener("click", function () {
  formContainer.classList.toggle("grid_state");
  listContainer.classList.toggle("inactive_state");
});

// function for get data from local
function storeTicketsArray() {
  keysStorage.sort((x, y) => x - y);
  keysStorage.forEach((key) => {
    if (toDoAppData.find((ticketId) => ticketId.id === parseInt(key)) == null) {
      toDoAppData.push(JSON.parse(localStorage.getItem(key)));
    } else {
      const idPosition = toDoAppData.findIndex(
        (ticketId) => ticketId.id === parseInt(key)
      );
      toDoAppData[idPosition] = JSON.parse(localStorage.getItem(key));
    }
  });
  return toDoAppData;
}

// function for create ticket container
function createListElement(ticketData, idName) {
  //Create layout for a new ticket
  const containerItem = `<div class=actions__container-item id=${idName}>
                         <h2 class="container__item-title">${ticketData.title}</h2>
                         <h3 class="container__item-fname">${ticketData.fname}</h3>
                         <h3 class="container__item-lname">${ticketData.lname}</h3>
                         <p class="container__item-descript">${ticketData.descript}</p>
                         <button id="deleteButton${idName}" class="container__item-delete">Delete</button>
                         <button id="editButton${idName}" class="container__item-edit">Edit</button>
                         </div>   `;
  listContainer.insertAdjacentHTML("beforeend", containerItem);

  // add event listener for all new ticket delete and save
  document
    .getElementById(`deleteButton${idName}`)
    .addEventListener("click", function () {
      console.log(`delete${idName}`);
      handleDeleteElement(idName);
    });

  document
    .getElementById(`editButton${idName}`)
    .addEventListener("click", () => {
      listContainer.classList.add("inactive_state");
      modalForm.classList.add("flex_state");
      pushFoundTicket(idName);
    });
}

// function for add a new ticket
function addTicket() {
  // read values from form
  ticketData.title = titleTicket.value;
  ticketData.fname = fnameTicket.value;
  ticketData.lname = lnameTicket.value;
  ticketData.descript = descriptTicket.value;

  if (
    titleTicket.value != "" &&
    fnameTicket.value != "" &&
    lnameTicket.value != "" &&
    descriptTicket.value != ""
  ) {
    if (keysStorage == "") {
      ticketData.id = parseInt(uniqueTicketID);
      localStorage.setItem(`${uniqueTicketID}`, JSON.stringify(ticketData));
      createListElement(ticketData, uniqueTicketID);
      keysStorage = Object.keys(localStorage);
    } else {
      // create a unique ID
      const keysStorageNumbers = keysStorage.map(Number);
      keysStorageNumbers.sort((prev, curr) => prev - curr);
      uniqueTicketID = keysStorageNumbers[keysStorageNumbers.length - 1] + 1;

      // store local and post it
      ticketData.id = parseInt(uniqueTicketID);
      localStorage.setItem(`${uniqueTicketID}`, JSON.stringify(ticketData));
      createListElement(ticketData, uniqueTicketID);
      keysStorage = Object.keys(localStorage);
    }
  } else alert("Fields cannot be empty!");
  // reset form inputs values
  resetForm();
  // update the local data array and keys from local storage
  toDoAppData = storeTicketsArray();
}

function handleDeleteElement(key) {
  // console.log(`delete${key}`);
  document.getElementById(key).remove();
  localStorage.removeItem(key);
  const idPosition = toDoAppData.findIndex(
    (ticketId) => ticketId.id === parseInt(key)
  );
  toDoAppData.splice(idPosition, 1);
  keysStorage = Object.keys(localStorage);
}

function pushFoundTicket(key) {
  console.log(`edit${key}`);
  const ticketFound = toDoAppData.find((ticket) => ticket.id === parseInt(key));
  modalTitle.value = ticketFound.title;
  modalFname.value = ticketFound.fname;
  modalLname.value = ticketFound.lname;
  modalDescript.value = ticketFound.descript;
  saveButton.addEventListener(
    "click",
    () => {
      console.log("idName from save", key);
      handleSaveElement(key);
    },
    { once: true }
  );
}

function handleSaveElement(key) {
  listContainer.classList.remove("inactive_state");
  modalForm.classList.remove("flex_state");
  editTicket(parseInt(key));
  toDoAppData = storeTicketsArray();
  postTicketsList();
}

function editTicket(ticketId) {
  ticketData.id = parseInt(ticketId);
  ticketData.title = modalTitle.value;
  ticketData.fname = modalFname.value;
  ticketData.lname = modalLname.value;
  ticketData.descript = modalDescript.value;
  localStorage.setItem(ticketId, JSON.stringify(ticketData));
  document.getElementById(ticketId).remove();
}

function postTicketsList() {
  toDoAppData.forEach((ticketData) => {
    const checkUniqueTicket = document.getElementById(ticketData.id);
    if (checkUniqueTicket === null)
      createListElement(ticketData, ticketData.id);
  });
}

function resetForm() {
  titleTicket.value = "";
  fnameTicket.value = "";
  lnameTicket.value = "";
  descriptTicket.value = "";
}

storeTicketsArray();
postTicketsList();
submitButton.addEventListener("click", addTicket);

clearButton.addEventListener("click", function () {
  console.log("Local database was erased!!!");
  toDoAppData = [];
  const allTicketToDelete = document.getElementsByClassName(
    "actions__container-item"
  );
  while (allTicketToDelete.length) allTicketToDelete[0].remove();
  localStorage.clear();
});

function getSortedTickets(ticketsData) {
  const sortedIds = [];
  console.log(ticketsData);
  let ticketsValues = [];
  ticketData.forEach((ticket) => {
    console.log(ticket);
    ticketsValues.push(Object.values(ticket)[2] + Object.values(ticket)[0]);
  });
  console.log(ticketsValues);
  ticketsValues.sort();
  ticketsValues.forEach((el) => sortedIds.push(parseInt(el[el.length - 1])));
  return sortedIds;
}
