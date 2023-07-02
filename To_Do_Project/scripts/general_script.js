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
  createListItems(JSON.parse(localStorage.getItem(localStorage.key(i))), i);
}

function createListItems(ticketData, idNumber) {
  //Create item list container
  const itemContainer = document.createElement("div");
  itemContainer.id = `listItem${idNumber}`;
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
  deleteButton.id = `deleteButton${idNumber}`;
  deleteButton.className = "container__item-delete";
  // Create edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.id = `editButton${idNumber}`;
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

submitButton.addEventListener("click", function () {
  const titleTicket = document.getElementById("titleTicket");
  const fnameTicket = document.getElementById("fnameTicket");
  const lnameTicket = document.getElementById("lnameTicket");
  const descriptTicket = document.getElementById("descriptTicket");
  ticketData.title = titleTicket.value;
  titleTicket.value = "";
  ticketData.fname = fnameTicket.value;
  fnameTicket.value = " ";
  ticketData.lname = lnameTicket.value;
  lnameTicket.value = "";
  ticketData.descript = descriptTicket.value;
  descriptTicket.value = "";
  const checkTicket = JSON.parse(
    localStorage.getItem(`listItem${ticketNumber}`)
  );
  if (checkTicket != null) {
    ticketNumber++;    
  } else localStorage.setItem(`listItem${ticketNumber}`, JSON.stringify(ticketData));
  localStorage.setItem(`listItem${ticketNumber}`, JSON.stringify(ticketData));
  // console.log(`Numar ticket${ticketNumber} si date ${ticketData}`);
});

updateButton.addEventListener("click", function () {
  console.log(localStorage);
  for (let i = 0; i < localStorage.length; i++) {
    const checkUniqueTicket = document.getElementById(localStorage.key(i));
    console.log(checkUniqueTicket);
    if (checkUniqueTicket == null) {
      const ticketData = JSON.parse(localStorage.getItem(localStorage.key(i)));
      createListItems(ticketData, i);
      console.log(localStorage.getItem(localStorage.key(i)));
      // console.log(ticketData);
    }
  }
});

// localStorage.clear();
