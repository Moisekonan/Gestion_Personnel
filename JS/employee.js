// recuperer depuis localstorage
function getEmployee() {
  return JSON.parse(localStorage.getItem("employee"));
}

function getTache() {
  return JSON.parse(localStorage.getItem("taches"));
}

// ajouter dans localstorage
function setEmployee(employee) {
  localStorage.setItem("employee", JSON.stringify(employee));
}

function setTache(tache) {
  return localStorage.setItem("taches", JSON.stringify(tache));
}

// redirect si pas entere dans les input du login
if (!(localStorage.hasOwnProperty('session'))){
  window.location.href = 'login.html'
}

// um tableau de employee
let initialEmployee = getEmployee() || [];
let initialTaches = getTache() || [];

const tableEmp = document.querySelector(".table-employ");
const tblBodyEmp = document.querySelector(".table-employ tbody");
const boxTableEmp = document.querySelector(".box-table");

// logique de deconnecter et delete la session connecter
let logoutButom = document.querySelector(".logoutButom");
logoutButom.addEventListener("click", () => {
  localStorage.removeItem("session");
});

setTache(initialTaches);
let tache = getTache();
setEmployee(initialEmployee);

// Affichage des donnes employer dans le tab tache
let employee = getEmployee();
employee.forEach(function (element) {
  row = `<tr id="${element.telephone}">
        <td>${element.nom}</td>
        <td>${element.prenom}</td>
        <td class="testTache">${element.telephone}</td>
        <td class="testTache">${element.dateArrive}</td>
        <td class="td-delete">
            <button class="delete-btn" contactphone="${element.telephone}">Supprimer</button>
            <button class="update-btn" contactphone="${element.telephone}" id="updateEmployee">mettre à jour</button>
        </td>
    </tr>`;
  tblBodyEmp.innerHTML += row;
});

// modal
let modalEmp = document.getElementById("employeeModal");
let activePopup = document.querySelectorAll(".update-btn");
let closemodalEmp = document.querySelector(".close");
let btnEmp = document.querySelectorAll("#updateEmployee");
let newEmployee = document.querySelector("#EmploiAjoutBtn");
const formAficheEmp = document.getElementById("formAfiche");

// ajouter nouveau employee
newEmployee.addEventListener("click", () => {
  modalEmp.style.display = "block";

  let form = `
    <label for="nom">Nom:</label>
    <input class="form-control" required="" placeholder="Konan" type="text" id="nom" name="nom">
    <label for="prenom">Prénom:</label>
    <input class="form-control" required="" placeholder="Moise" type="prenom" id="prenom" name="prenom" >
    <label for="telephone">Téléphone:</label>
    <input class="form-control" required="" placeholder="0506348232" type="number" id="telephone" name="telephone">
    <label for="dateArrive">Date d'arriver:</label>
    <input class="form-control" required=""  type="date" id="dateArrive" name="dateArrive">
    <button type="submit" class="addEmployeButton">Ajouter</button>
  `;

  formAficheEmp.innerHTML = form;
  const newemployeeRecup = getEmployee();
  formAficheEmp
    .querySelector(".addEmployeButton")
    .addEventListener("click", () => {
      const nom = document.getElementById("nom").value;
      const prenom = document.getElementById("prenom").value;
      const telephone = document.getElementById("telephone").value;
      const dateArrive = document.getElementById("dateArrive").value;
      if (!nom || !prenom || !telephone || !dateArrive) {
        alert("merci de tout remplir");
        return;
      }
      const newEmployee = {
        nom,
        prenom,
        telephone,
        dateArrive,
      };
      newemployeeRecup.push(newEmployee);
      setEmployee(newemployeeRecup);
      // formAficheEmp.submit();
      window.location.reload();
    });
});

formAficheEmp.addEventListener("submit", (e) => {
  e.preventDefault();
});

closemodalEmp.addEventListener("click", () => {
  modalEmp.style.display = "none";
});

modalEmp.addEventListener("click", (e) => {
  console.log(e.target.classList);
  const parent = e.target.closest(".form-container");
  if (parent) return;
  modalEmp.style.display = "none";
});

// supprimer un employee
let deleteButtonEmp = document.querySelectorAll(".delete-btn");
deleteButtonEmp.forEach(function (button) {
  button.addEventListener("click", function (e) {
    // enlever l'element supprimer
    let parentButom = e.target.closest("tr");
    const telephone = parentButom.id;
    tblBodyEmp.removeChild(parentButom);
    let filteredEmployee = employee.filter(
      (emp) => emp.telephone !== telephone
    );
    console.log(filteredEmployee);
    console.log(telephone);
    setEmployee(filteredEmployee);
  });
});

// logique de modification
btnEmp.forEach(function (button) {
  button.addEventListener("click", function (e) {
    // modifier l'element
    e.preventDefault();
    let parentButom = e.target.closest("tr");
    const telephone = parentButom.id;
    let recup = getEmployee();
    let concerne = recup.find((us) => us.telephone === telephone);
    if (!concerne) {
      alert("Pas de concerne");
      return;
    }

    let filteredEmployee = employee.filter(
      (emp) => emp.telephone !== telephone
    );
    console.log("le tab filtre", filteredEmployee);
    console.log(telephone);

    let form = `
    <label for="nom">Nom:</label>
    <input class="form-control" required="" value="${concerne.nom}" placeholder="Konan" type="text" id="nom" name="nom">
    <label for="prenom">Prénom:</label>
    <input class="form-control" required="" value="${concerne.prenom}" placeholder="Moise" type="prenom" id="prenom" name="prenom" >
    <label for="telephone">Téléphone:</label>
    <input class="form-control" required="" value="${concerne.telephone}" placeholder="0506348232" type="number" id="telephone" name="telephone">
    <label for="dateArrive">Date d'arriver:</label>
    <input class="form-control" required="" value="${concerne.dateArrive}" type="date" id="dateArrive" name="dateArrive">
    <button type="submit" class="updateEmployeeButton">Mettre à jour</button>
    `;

    formAficheEmp.innerHTML = form;

    modalEmp.style.display = "block";
    console.log("le concerner : ", concerne);

    formAficheEmp
      .querySelector(".updateEmployeeButton")
      .addEventListener("click", () => {
        let inputs = formAficheEmp.querySelectorAll("input");
        inputs.forEach(function (input) {
          concerne[input.id] = input.value;
        });
        filteredEmployee.push(concerne);
        setEmployee(filteredEmployee);
        window.location.reload();
      });
  });
});

// afficher le username du connecter actu
const countEmployee = document.querySelector(".box .count_user");
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
let nouvo = document.querySelector(".main-ajout");
let dtDelete = document.querySelectorAll(".td-delete");
let leSupAdm = getRoot();
let recupCoActu = getSession();
if (recupCoActu.email === leSupAdm.email) {
  console.log("sa marce ", recupCoActu.email);
  nouvo.style.display = "none";
  dtDelete.forEach(function (item) {
    item.style.display = "none";
  });
} else {
  let ongletGestAdm = document.querySelector(".sidebar-list-item-gestionAdm");
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
