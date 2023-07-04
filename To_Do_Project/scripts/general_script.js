// This is the general script
let maxTicketID = 0;
const ticketData = {
  title: "",
  fname: "",
  lname: "",
  descript: "",
};
{
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
      let keysStorage = Object.keys(localStorage);
      if (keysStorage == "") {
        localStorage.setItem(`${maxTicketID}`, JSON.stringify(ticketData));
      } else {
        const keysStorageNumber = keysStorage.map(Number);
        for (let i = 0; i < keysStorageNumber.length; i++)
          if (keysStorageNumber[i] > maxTicketID)
            maxTicketID = keysStorageNumber[i];
        // console.log(maxTicketID, " ", keysStorage);
        localStorage.setItem(`${maxTicketID + 1}`, JSON.stringify(ticketData));
      }
    } else alert("Fields cannot be empty!");
    resetForm();
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
  // modifyTicket;
  document
    .getElementById("listContainer")
    .addEventListener("click", modifyTicket);

  function modifyTicket() {
    const keysStorage = Object.keys(localStorage);
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
        });
    });
  }
}

// localStorage.clear();
