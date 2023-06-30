// recuperer depuis localstorage
function getAdmin() {
  return JSON.parse(localStorage.getItem("admin"));
}

function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

// ajouter dans localstorage
function setAdmin(administ) {
  localStorage.setItem("admin", JSON.stringify(administ));
}

// redirect si pas entere dans les input du login
if (!(localStorage.hasOwnProperty('session'))){
  window.location.href = 'login.html'
}

// um tableau de administ
let initialAdmin = getAdmin() || [];

const table = document.querySelector(".table-employ");
const tblBodyAdm = document.querySelector(".table-employ tbody");
const boxTable = document.querySelector(".box-table");

// logique de deconnecter et delete la session connecter
let logoutButom = document.querySelector(".logoutButom");

logoutButom.addEventListener("click", () => {
  localStorage.removeItem("session");
});

setAdmin(initialAdmin);
let administ = getAdmin();

// Affichage des donnes employer dans le tab tache
administ.forEach(function (element) {
  row = `<tr id="${element.email}">
        <td>${element.username}</td>
        <td>${element.email}</td>
        <td class="td-delete">
          <button class="delete-btn" contactphone="${element.email}">Supprimer</button>
          <button class="update-btn" contactphone="${element.email}" id="updateAdmin">mettre à jour</button>
        </td>
    </tr>`;
  tblBodyAdm.innerHTML += row;
});

// modal
let modalAdm = document.getElementById("AdminModal");
let activePopup = document.querySelectorAll(".update-btn");
let closemodalAdm = document.querySelector(".close");
let btnUpdateAdm = document.querySelectorAll("#updateAdmin");
let newAdmin = document.querySelector("#btnEmploiAjout");
const formAficheAdm = document.getElementById("formAfiche");

// Creer nouveau employee
newAdmin.addEventListener("click", () => {
  modalAdm.style.display = "block";

  let form = `
    <label for="username">Nom d'utilisateur:</label>
    <input class="form-control" required="" placeholder="Konan" type="text" id="username" name="username">
    <label for="email">Email:</label>
    <input class="form-control" required="" placeholder="mokonan99@gmail.com" type="email" id="email" name="email" >
    <label for="password">Mot de passe:</label>
    <input class="form-control" required="" placeholder="..........." type="text" id="password" name="password">
    <button type="submit" class="addAdminButton">Créer</button>
  `;

  formAficheAdm.innerHTML = form;
  const newAdminRecup = getAdmin();
  formAficheAdm
    .querySelector(".addAdminButton")
    .addEventListener("click", () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const username = document.getElementById("username").value;
      if (!email || !password || !username) {
        alert("merci de tout remplir");
        return;
      }
      const newAdmin = {
        email,
        password,
        username,
      };
      newAdminRecup.push(newAdmin);
      setAdmin(newAdminRecup);
      window.location.reload()
    });
});

formAficheAdm.addEventListener("submit", (e) => {
  e.preventDefault();
});

closemodalAdm.addEventListener("click", () => {
  modalAdm.style.display = "none";
});

modalAdm.addEventListener("click", (e) => {
  console.log(e.target.classList);
  const parent = e.target.closest(".form-container");
  if (parent) return;
  modalAdm.style.display = "none";
});

// supprimer un employee
let deleteButtonAdm = document.querySelectorAll(".delete-btn");
deleteButtonAdm.forEach(function (button) {
  button.addEventListener("click", function (e) {
    // enlever l'element supprimer
    let parentButom = e.target.closest("tr");
    const email = parentButom.id;
    tblBodyAdm.removeChild(parentButom);
    let filteredAdmin = administ.filter(
      (emp) => emp.email !== email
    );
    console.log(filteredAdmin);
    console.log(email);
    setAdmin(filteredAdmin);
  });
});

// logique de modification
btnUpdateAdm.forEach(function (button) {
  button.addEventListener("click", function (e) {
    // modifier l'element
    e.preventDefault();
    let parentButom = e.target.closest("tr");
    const email = parentButom.id;
    let recup = getAdmin();
    let concerne = recup.find((us) => us.email === email);
    if (!concerne) {
      alert("Pas de concerne");
      return;
    }

    let filteredAdmin = administ.filter(
      (emp) => emp.email !== email
    );
    console.log("le tab filtre", filteredAdmin);
    console.log(email);

    let form = `
    <label for="username">Nom d'utilisateur:</label>
    <input class="form-control" required="" value="${concerne.username}" type="text" id="username" name="username">
    <label for="email">Email:</label>
    <input class="form-control" required="" value="${concerne.email}" type="email" id="email" name="email" >
    <label for="password">Mot de passe:</label>
    <input class="form-control" required="" value="${concerne.password}" type="text" id="password" name="password">
    <button type="submit" class="updateEmployeeButton">Mettre à jour</button>
    `;

    formAficheAdm.innerHTML = form;

    modalAdm.style.display = "block";
    console.log("le concerner : ", concerne);

    formAficheAdm
      .querySelector(".updateEmployeeButton")
      .addEventListener("click", () => {
        let inputs = formAficheAdm.querySelectorAll("input");
        inputs.forEach(function (input) {
          concerne[input.id] = input.value;
        });
        filteredAdmin.push(concerne);
        setAdmin(filteredAdmin);
        window.location.reload()
      });
  });
});

// Afficher le nom du connecter actu
const countAdmin = document.querySelector(".box .count_user");
const nomDuConect = document.querySelector(".nom_du_conect");
function setNomAdminConect(nom) {
  nomDuConect.innerHTML = nom["username"];
}
let nomAdmin = getSession();
setNomAdminConect(nomAdmin);

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
