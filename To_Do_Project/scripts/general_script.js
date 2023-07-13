// This is the general script
let uniqueTicketID = 0;
let allTicketsData = [];
let keysStorage = Object.keys(localStorage);

const ticketData = {
  id: "",
  title: "",
  fname: "",
  lname: "",
  descript: "",
};

// Declare elements from HTML
const formButton = document.getElementById("formButton");
const listButton = document.getElementById("listButton");
const formContainer = document.getElementById("formContainer");
const listContainer = document.getElementById("listContainer");
const submitButton = document.getElementById("submitButton");
const clearButton = document.getElementById("clearButton");
const modalForm = document.getElementById("modalForm");
const saveButton = document.getElementById("saveButton");
const modalTitle = document.getElementById("modalTitle");
const modalFname = document.getElementById("modalFname");
const modalLname = document.getElementById("modalLname");
const modalDescript = document.getElementById("modalDescript");

formButton.addEventListener("click", function () {
  formContainer.classList.toggle("grid_state");
  listContainer.classList.toggle("inactive_state");
});

// function for get data from local
function storeTicketsArray() {
  keysStorage.sort((x, y) => x - y);
  keysStorage.forEach((key) => {
    if (
      allTicketsData.find((ticketId) => ticketId.id === parseInt(key)) == null
    ) {
      allTicketsData.push(JSON.parse(localStorage.getItem(key)));
    } else {
      const idPosition = allTicketsData.findIndex(
        (ticketId) => ticketId.id === parseInt(key)
      );
      allTicketsData[idPosition] = JSON.parse(localStorage.getItem(key));
    }
  });
  return allTicketsData;
}

// function for create ticket container
function createListElement(ticketData, idName) {
  //Create item list container
  const itemContainer = document.createElement("div");
  itemContainer.id = idName;
  itemContainer.className = "actions__container-item";
  //Create title
  const titleItem = document.createElement("h2");
  titleItem.innerHTML = ticketData.title;
  titleItem.className = "container__item-title";
  //Create first name
  const fnameItem = document.createElement("h3");
  fnameItem.innerHTML = ticketData.fname;
  fnameItem.className = "container__item-fname";
  //Create last name
  const lnameItem = document.createElement("h3");
  lnameItem.innerHTML = ticketData.lname;
  lnameItem.className = "container__item-lname";
  // Create description
  const descriptItem = document.createElement("p");
  descriptItem.innerHTML = ticketData.descript;
  descriptItem.className = "container__item-descript";
  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.id = `deleteButton${idName}`;
  deleteButton.className = "container__item-delete";
  // Create edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.id = `editButton${idName}`;
  editButton.className = "container__item-edit";
  // Combine items container with data
  itemContainer.appendChild(titleItem);
  itemContainer.appendChild(fnameItem);
  itemContainer.appendChild(lnameItem);
  itemContainer.appendChild(descriptItem);
  itemContainer.appendChild(deleteButton);
  itemContainer.appendChild(editButton);
  document.getElementById("listContainer").appendChild(itemContainer);

  document
    .getElementById(`deleteButton${idName}`)
    .addEventListener("click", () => {
      console.log(`delete${idName}`);
      handleDeleteElement(idName);
    });

  document.getElementById(`editButton${idName}`).addEventListener("click", () => {
    handleEditElement(idName);
  });

  saveButton.addEventListener("click", () => {
    handleSaveElement(idName);
  });

}

// function for add a new ticket
function addTicket() {
  // read values from form
  const titleTicket = document.getElementById("titleTicket");
  const fnameTicket = document.getElementById("fnameTicket");
  const lnameTicket = document.getElementById("lnameTicket");
  const descriptTicket = document.getElementById("descriptTicket");
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
      // console.log("Primul log", ticketData, " ", uniqueTicketID);
    } else {
      // create a unique ID
      const keysStorageNumbers = keysStorage.map(Number);
      for (let i = 0; i < keysStorageNumbers.length; i++)
        if (keysStorageNumbers[i] > uniqueTicketID)
          uniqueTicketID = keysStorageNumbers[i];
      // store local and post it
      ticketData.id = parseInt(uniqueTicketID + 1);
      localStorage.setItem(`${uniqueTicketID + 1}`, JSON.stringify(ticketData));
      createListElement(ticketData, uniqueTicketID + 1);
      keysStorage = Object.keys(localStorage);
      // console.log("Al doilea log", ticketData, " ", uniqueTicketID+1);
    }
  } else alert("Fields cannot be empty!");
  // reset form inputs values
  resetForm();
  // update the local data array and keys from local storage
  allTicketsData = storeTicketsArray();
}
function handleDeleteElement(key) {
  // console.log(`delete${key}`);
  document.getElementById(key).remove();
  localStorage.removeItem(key);
  const idPosition = allTicketsData.findIndex(
    (ticketId) => ticketId.id === parseInt(key)
  );
  allTicketsData.splice(idPosition, 1);
  keysStorage = Object.keys(localStorage);
}

function handleEditElement(key) {
  console.log(`edit${key}`);
  listContainer.classList.add("inactive_state");
  modalForm.classList.add("flex_state");
  const ticketFound = allTicketsData.find(
    (ticket) => ticket.id === parseInt(key)
  );
  console.log(ticketFound);
  document.getElementById("modalTitle").value = ticketFound.title;
  document.getElementById("modalFname").value = ticketFound.fname;
  document.getElementById("modalLname").value = ticketFound.lname;
  document.getElementById("modalDescript").value = ticketFound.descript;
}

function handleSaveElement(key) {
  listContainer.classList.remove("inactive_state");
  modalForm.classList.remove("flex_state");
  console.log("key" + key);
  editTicket(parseInt(key));
  allTicketsData = storeTicketsArray();
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
  allTicketsData.forEach((ticketData) => {
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

// clearButton.addEventListener("click", function () {
//   console.log("Local database was erased!!!");
//   allTicketsData = [];
//   postTicketsList();
//   localStorage.clear();
// });
// localStorage.clear();
