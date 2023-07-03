// This is the general script
let stat = 0;
let ticketNumber = 0;
const ticketData = {
  title: "",
  fname: "",
  lname: "",
  descript: "",
};

formButton = document.getElementById("formButton");
listButton = document.getElementById("listButton");
formContainer = document.getElementById("formContainer");
listContainer = document.getElementById("listContainer");
submitButton = document.getElementById("submitButton");
updateButton = document.getElementById("updateButton");

formButton.addEventListener("click", function () {
  formContainer.classList.toggle("active_state");
  listContainer.classList.toggle("inactive_state");
});

for (let i = 0; i < localStorage.length; i++) {
  createListItems(
    JSON.parse(localStorage.getItem(localStorage.key(i))),
    localStorage.key(i)
  );
}

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
function addTicket() {
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
    ticketID = localStorage.key(0);
    console.log(ticketID);
    ticketNumber = localStorage.length;
    console.log(ticketNumber);
    localStorage.setItem(`Item_${ticketNumber}`, JSON.stringify(ticketData));
  } else alert("Fields cannot be empty!");
  resetForm();
  // console.log(`Numar ticket${ticketNumber} si date ${ticketData}`);
}

function updateTicketList() {
  const keysStorage = Object.keys(localStorage);
  keysStorage.forEach((key) => {
    const checkUniqueTicket = document.getElementById(key);
    if (checkUniqueTicket == null) {
      const ticketData = JSON.parse(localStorage.getItem(key));
      createListItems(ticketData, key);
    }
  });
}

function resetForm() {
  titleTicket.value = "";
  fnameTicket.value = "";
  lnameTicket.value = "";
  descriptTicket.value = "";
}

submitButton.addEventListener("click", addTicket);
updateButton.addEventListener("click", updateTicketList);

for (let i = 0; i < localStorage.length; i++) {
  document
    .getElementById(`deleteButton${localStorage.key(i)}`)
    .addEventListener("click", function () {
      console.log(`delete${localStorage.key(i)}`);
    });

  document
    .getElementById(`editButton${localStorage.key(i)}`)
    .addEventListener("click", function () {
      console.log(`edit${localStorage.key(i)}`);
    });
}
const x = Object.keys(localStorage);
x.forEach((i) => {
  console.log(i);
});
// localStorage.clear();
