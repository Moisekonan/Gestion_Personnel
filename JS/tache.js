function getEmployee() {
  return JSON.parse(localStorage.getItem("employee"));
}

function getTache() {
  return JSON.parse(localStorage.getItem("taches"));
}

function setTache(tache) {
  return localStorage.setItem("taches", JSON.stringify(tache));
}

function getTacheParaTch() {
  return JSON.parse(localStorage.getItem("lesTaches"));
}

// redirect si pas entere dans les input du login
if (!(localStorage.hasOwnProperty('session'))){
  window.location.href = 'login.html'
}

// Affichage des donnes employer dans le tab tache
const tblBody = document.querySelector(".table-employ tbody");
const tblBodyPaye = document.querySelector(".table_paye");

let administ = getTache();
let employeePaye = getTache();

administ.forEach(function (element) {
  row = `<tr id="${element.telephone}">
        <td>${element.nom}</td>
        <td>${element.prenom}</td>
        <td class="testTache">${element.tache}</td>
        <td class="td-delete">
          <button class="delete-btn" contactphone="${element.telephone}">Supprimer</button>
          <button class="update-btn" contactphone="${element.telephone}" id="btnEmploiAjout">mettre à jour</button>
        </td>
    </tr>`;
  tblBody.innerHTML += row;
});

employeePaye.forEach(function (element) {
  row = `<tr id="${element.telephone}">
        <td>${element.nom}</td>
        <td>${element.tache}</td>
        <td>2000</td>
        <td class="td-delete">
          <button type="submit" class="btn-payer" contactphone="${element.telephone}" onclick="openPopup()">Payer</button>
        </td>
    </tr>`;
  tblBodyPaye.innerHTML += row;
});

// SWAP
let listTache = document.querySelector(".listTache");
let listPaiment = document.querySelector(".listPaiment");
let boxListTache = document.querySelector("#taches");
let boxListPaiment = document.querySelector("#paye");

listPaiment.addEventListener("click", () => {
  boxListPaiment.style.display = "block";
  boxListTache.style.display = "none";
});

listTache.addEventListener("click", () => {
  boxListTache.style.display = "block";
  boxListPaiment.style.display = "none";
});

// Popup de payement
let tt = document.querySelector("#body-tache");
let popupPaye = document.querySelector("#popup");
function openPopup(){
  popupPaye.classList.add("open-popup");
  tt.classList.add("tt")
}
function closePopup(){
  popupPaye.classList.remove("open-popup")
  tt.classList.remove("tt")
}

// modal
let modal = document.getElementById("employeeModal");
let activePopup = document.querySelectorAll(".update-btn");
let closemodal = document.querySelector(".close");
let btn = document.querySelectorAll("#btnEmploiAjout");
let newTache = document.querySelector("#EmploiAjoutBtn");
const formAfiche = document.getElementById("formAfiche");

let localTache = getTacheParaTch()

newTache.addEventListener("click", () => {
  let form = `
  <label for="nom">Nom:</label>
  <input class="form-control" required="" placeholder="Konan" type="text" id="nom" name="nom">
  <label for="prenom">Prénom:</label>
  <input class="form-control" required="" placeholder="Moise" type="prenom" id="prenom" name="prenom" >
  <label for="tache">choisir la tache:</label>
    <select name="tache" id="tache" form="carform" class="boxSelect form-control">
    </select> <br/>
  <label for="telephone">Telephone:</label>
  <input class="form-control" required="" placeholder="0506348232" type="number" id="telephone" name="telephone">
  <button type="submit" class="addEmployeButton">Ajouter</button>
`;
  // creer autre form pour mieux indexer
  formTemp = document.createElement("form")
  formTemp.innerHTML = form
  const listeDeTache = formTemp.querySelector("select")
  modal.style.display = "block";

  // ajouter les tache du storage dans le select
  localTache.forEach(function(element){
    let optionSel = document.createElement('option')
    optionSel.text= element.tache
    optionSel.value= element.tache
    listeDeTache.appendChild(optionSel)
    console.log('demo',element.montant);
    
  })

  // Ensuite ajouter dans le form normal qui est *formAfiche
  const finallyForm = formTemp.innerHTML
  formAfiche.innerHTML = finallyForm

  // Recuperer et envoyer dans localStorage
  const newtache = getTache();
  formAfiche
    .querySelector(".addEmployeButton")
    .addEventListener("click", () => {
      const nom = document.getElementById("nom").value;
      const prenom = document.getElementById("prenom").value;
      const tache = document.getElementById("tache").value;
      const telephone = document.getElementById("telephone").value;
      if (!nom || !prenom || !tache || !telephone) {
        alert("merci de tout remplir");
        return;
      }
      const newTache = {
        nom,
        prenom,
        tache,
        telephone,
      };
      newtache.push(newTache);
      setTache(newtache);
      window.location.reload();
    });
});

formAfiche.addEventListener("submit", (e) => {
  e.preventDefault();
});

closemodal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  console.log(e.target.classList);
  const parent = e.target.closest(".form-container");
  if (parent) return;
  modal.style.display = "none";
});
let deleteButton = document.querySelectorAll(".delete-btn");

deleteButton.forEach(function (button) {
  button.addEventListener("click", function (e) {
    // enlever l'element supprimer
    let parentButom = e.target.closest("tr");
    const telephone = parentButom.id;
    tblBody.removeChild(parentButom);
    let filteredEmployee = administ.filter(
      (emp) => emp.telephone !== telephone
    );
    console.log(filteredEmployee);
    console.log(telephone);
    localStorage.setItem("taches", JSON.stringify(filteredEmployee));
  });
});

// logique de modification
btn.forEach(function (button) {
  button.addEventListener("click", function (e) {
    // modifier l'element
    e.preventDefault();
    let parentButom = e.target.closest("tr");
    const telephone = parentButom.id;
    let recup = JSON.parse(localStorage.getItem("taches"));
    let concerne = recup.find((us) => us.telephone === telephone);
    if (!concerne) {
      alert("Pas de concerne");
      return;
    }
    modal.style.display = "block";
    console.log("le concerner : ", concerne);

    let filteredEmployee = administ.filter(
      (emp) => emp.telephone !== telephone
    );
    console.log("le tab filtre", filteredEmployee);
    console.log(telephone);

    let form = `
      <label for="nom">Nom:</label>
      <input class="form-control" required="" placeholder="Konan" type="text" id="nom" name="nom" value="${concerne.nom}">
      <label for="prenom">Prénom:</label>
      <input class="form-control" required="" placeholder="Moise" type="prenom" id="prenom" name="prenom" value="${concerne.prenom}">
      <label for="tache">Tâche:</label>
      <input class="form-control" required="" placeholder="Developeur" type="text" id="tache" name="tache" value="${concerne.tache}">
      <label for="telephone">Telephone:</label>
      <input class="form-control" required="" placeholder="0506348232" type="number" id="telephone" name="telephone" value="${concerne.telephone}">
      <button type="submit" class="addEmployeButton">Mettre à jour</button>
    `;

    formAfiche.innerHTML = form;
    formAfiche
      .querySelector(".addEmployeButton")
      .addEventListener("click", () => {
        let inputs = formAfiche.querySelectorAll("input");
        inputs.forEach(function (input) {
          concerne[input.id] = input.value;
        });
        filteredEmployee.push(concerne);
        localStorage.setItem("taches", JSON.stringify(filteredEmployee));
        window.location.reload();
      });
  });
});

// afficher le username du connecter
const nomDuConect = document.querySelector(".nom_du_conect");
function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

function setNomAdminConect(nom) {
  nomDuConect.innerHTML = nom["username"];
}

let nomAdmin = getSession();
setNomAdminConect(nomAdmin);

// gestion de qui est connecter et fait la logique
function getRoot() {
  return JSON.parse(localStorage.getItem("root"));
}

let leSupAdm = getRoot();
let recupCoActu = getSession();

// taget tous les button
let nouvo = document.querySelector(".main-ajout");
let dtDelete = document.querySelectorAll(".td-delete");
let ongletGestAdm = document.querySelector(".sidebar-list-item-gestionAdm");

if (recupCoActu.email === leSupAdm.email) {
  console.log("sa marce ", recupCoActu.email);
  nouvo.style.display = "none";
  dtDelete.forEach(function (item) {
    item.style.display = "none";
  });
} else {
  ongletGestAdm.style.display = "none";
}

// ************responsive-sidebar
const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector("#sidebar");
const header = document.querySelector(".header");

menuIcon.addEventListener("click", toggleSidebar);

function toggleSidebar() {
  if (sidebar.classList.contains("sidebar-responsive")) {
    sidebar.classList.remove("sidebar-responsive");
    menuIcon.querySelector("span").innerText = "keyboard_double_arrow_right";
    header.classList.remove("header-responsive");
  } else {
    sidebar.classList.add("sidebar-responsive");
    menuIcon.querySelector("span").innerText = "menu";
    header.classList.add("header-responsive");
  }
}
