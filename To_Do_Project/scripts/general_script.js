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

submitButton.addEventListener("click", function () {
  let titleTicket = document.getElementById("titleTicket").value;
  let fnameTicket = document.getElementById("fnameTicket").value;
  let lnameTicket = document.getElementById("lnameTicket").value;
  let descriptTicket = document.getElementById("descriptTicket").value;
  ticketData.title = titleTicket;
  ticketData.fname = fnameTicket;
  ticketData.lname = lnameTicket;
  ticketData.descript = descriptTicket;

  let checkTicket = JSON.parse(localStorage.getItem(`ticket${ticketNumber}`));
  console.log(checkTicket);
  if (checkTicket != null) {
    ticketNumber++;
  }
  localStorage.setItem(`ticket${ticketNumber}`, JSON.stringify(ticketData));
  console.log(document.querySelectorAll("input"));
});

updateButton.addEventListener("click", function () {
  for (let i = 0; i < localStorage.length; i++) {
    const allTickets = JSON.parse(localStorage.getItem(localStorage.key(i)));
    console.log(allTickets);
    // const itemContainer = document.createElement("div");
    // const titleItem = document.createElement("h2");
    // titleItem.appendChild(document.createTextNode());
    // itemContainer.appendChild(titleItem);
  }
});

function createListItems(){
    for(let i = 0; i < localStorage.length; i++){
    const itemContainer = document.createElement('div')
    itemContainer.innerHTML='new created';
    itemContainer.id = '';
    itemContainer.className = 'actions__container-item';
    document.getElementById('listContainer').appendChild(itemContainer);
    }
}
createListItems();


