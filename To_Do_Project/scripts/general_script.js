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
formButton = document.getElementById("formButton");
listButton = document.getElementById("listButton");
formContainer = document.getElementById("formContainer");
listContainer = document.getElementById("listContainer");
submitButton = document.getElementById("submitButton");
clearButton = document.getElementById("clearButton");
modalForm = document.getElementById("modalForm");
saveButton = document.getElementById("saveButton");
modalTitle = document.getElementById("modalTitle");
modalFname = document.getElementById("modalFname");
modalLname = document.getElementById("modalLname");
modalDescript = document.getElementById("modalDescript");

formButton.addEventListener("click", function () {
  formContainer.classList.toggle("grid_state");
  listContainer.classList.toggle("inactive_state");
});

// function for get data from local
function storeTicketsArray() {
  console.log(localStorage);
  keysStorage.sort((x, y) => x - y);
  keysStorage.forEach((key) => {
    console.log(key);
    if (allTicketsData[key] == null) {
      // console.log(JSON.parse(localStorage.getItem(key)));
      allTicketsData.push(JSON.parse(localStorage.getItem(key)));
    } else {
      const ticketIndex = allTicketsData.findIndex(
        (ticketId) => ticketId.id === parseInt(key)
      );
      allTicketsData[ticketIndex] = JSON.parse(localStorage.getItem(key));
    }
  });
  return allTicketsData;
}

// function for create ticket container
function createListItems(ticketData, idName) {
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
      createListItems(ticketData, uniqueTicketID);
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
      createListItems(ticketData, uniqueTicketID + 1);
      keysStorage = Object.keys(localStorage);
      // console.log("Al doilea log", ticketData, " ", uniqueTicketID+1);
    }
  } else alert("Fields cannot be empty!");
  // reset form inputs values
  resetForm();
  // update the local data array and keys from local storage
  allTicketsData = storeTicketsArray();
  modifyTicket();
}

function modifyTicket() {
  keysStorage.forEach((key) => {
    document
      .getElementById(`deleteButton${key}`)
      .addEventListener("click", function () {
        // console.log(`delete${key}`);
        console.log(key);
        document.getElementById(key).remove();
        localStorage.removeItem(key);
      });

    document
      .getElementById(`editButton${key}`)
      .addEventListener("click", function () {
        console.log(`edit${key}`);
        listContainer.classList.add("inactive_state");
        modalForm.classList.add("flex_state");
        const ticketFound = allTicketsData.find(
          (ticket) => ticket.id === parseInt(key)
        );
        // console.log(allTicketsData, key, ticketFound);
        document.getElementById("modalTitle").value = ticketFound.title;
        document.getElementById("modalFname").value = ticketFound.fname;
        document.getElementById("modalLname").value = ticketFound.lname;
        document.getElementById("modalDescript").value = ticketFound.descript;

        saveButton.addEventListener("click", function () {
          listContainer.classList.remove("inactive_state");
          modalForm.classList.remove("flex_state");
          editTicket(parseInt(key));
        });
      });
  });
}

function editTicket(ticketId) {
  ticketData.id = parseInt(ticketId);
  ticketData.title = modalTitle.value;
  ticketData.fname = modalFname.value;
  ticketData.lname = modalLname.value;
  ticketData.descript = modalDescript.value;
  localStorage.setItem(ticketId, JSON.stringify(ticketData));
  document.getElementById(ticketId).remove();
  allTicketsData = storeTicketsArray();
  postTicketsList();
  modifyTicket();
}

function postTicketsList() {
  console.log(allTicketsData);
  allTicketsData.forEach((ticketData) => {
    const checkUniqueTicket = document.getElementById(ticketData.id);
    if (checkUniqueTicket === null) createListItems(ticketData, ticketData.id);
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
modifyTicket();

clearButton.addEventListener("click", function () {
  console.log("Local database was erased!!!");
  allTicketsData = [];
  postTicketsList();
  localStorage.clear();
});
// localStorage.clear();
