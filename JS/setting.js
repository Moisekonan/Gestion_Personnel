function getRoot() {
  return JSON.parse(localStorage.getItem("root")) || [];
}

function getSession() {
  return JSON.parse(localStorage.getItem("session")) || [];
}

function setTachePara(lestache) {
  return localStorage.setItem("lesTaches", JSON.stringify(lestache));
}

function getTachePara() {
  return JSON.parse(localStorage.getItem("lesTaches")) || [];
}

function setNombreTache(valeur) {
  return localStorage.setItem("nombre_taches", JSON.stringify(valeur));
}

function getNombreTache() {
  return JSON.parse(localStorage.getItem("nombre_taches"));
}

function setbudget(valeur) {
  return localStorage.setItem("budget", JSON.stringify(valeur));
}

function getbudget() {
  return JSON.parse(localStorage.getItem("budget")) || [];
}

// redirect si pas entere dans les input du login
if (!localStorage.hasOwnProperty("session")) {
  window.location.href = "login.html";
}

let nbrTache = getNombreTache();
let nbr_tch = { nombre_taches: nbrTache.nombre_taches };
setNombreTache(nbr_tch);

let leBudget = getbudget();
let budget = { somme_budget: leBudget.somme_budget };
setbudget(budget);

// affliche le tache du connecter
const nomDuConect = document.querySelector(".nom_du_conect");
function setNomAdminConect(nom) {
  nomDuConect.innerHTML = nom["username"];
}
let nomAdmin = getSession();
setNomAdminConect(nomAdmin);

const tableParaTch = document.querySelector(".table-Taches");
const tblBodyParaTch = document.querySelector(".table-Taches tbody");
const tblBodyParaNbr = document.querySelector(".table-nbr tbody");
const tblBodyParaBudget = document.querySelector(".table-budget tbody");
const boxTablePara = document.querySelector(".box-table");
// Affichage des donnes employer dans le tab tache
let lesTaches = getTachePara();

lesTaches.forEach(function (element) {
  row = `<tr id="${element.tache}">
        <td>${element.tache}</td>
        <td>${element.montant}</td>
        <td class="td-delete">
          <button class="delete-btn" contactphone="${element.tache}">Supprimer</button>
          <button class="update-btn" contactphone="${element.tache}" id="updateSeting">mettre à jour</button>
        </td>
    </tr>`;
  tblBodyParaTch.innerHTML += row;
});

row = `<tr id="${nbrTache.nombre_taches}">
  <td>${nbrTache.nombre_taches}</td>
  <td class="td-delete">
    <button class="update-btn" contactphone="${nbrTache.nombre_taches}" id="updateNombreTachJour">mettre à jour</button>
  </td>
</tr>`;
tblBodyParaNbr.innerHTML += row;

row_budget = `<tr id="${leBudget.somme_budget}">
  <td>${leBudget.somme_budget}</td>
  <td class="td-delete">
    <button class="update-btn" contactphone="${leBudget.somme_budget}" id="updateBudget">mettre à jour</button>
  </td>
</tr>`;
tblBodyParaBudget.innerHTML += row_budget;

// modal
let modalParaTch = document.getElementById("SettingModal");
let activePopup = document.querySelectorAll(".update-btn");
let closemodalParaTch = document.querySelector(".close");
let btnUpdateSting = document.querySelectorAll("#updateSeting");
let updateNombreTachJour = document.querySelector("#updateNombreTachJour");
let updateBudget = document.querySelector("#updateBudget");
let newAdmin = document.querySelector("#btnEmploiAjout");
const formAficheSett = document.getElementById("formAfiche");

// Creer nouveau employee
newAdmin.addEventListener("click", () => {
  modalParaTch.style.display = "block";

  let form = `
    <label for="tache">Tâche:</label>
    <input class="form-control" required="" placeholder="Mettre la tâche" type="text" id="tache" name="tache">
    <label for="montant">Montant:</label>
    <input class="form-control" required="" placeholder="2000" type="number" id="montant" name="montant" >
    <button type="submit" class="addAdminButton">Créer</button>
  `;

  formAficheSett.innerHTML = form;
  const newTacheRecup = getTachePara();
  formAficheSett
    .querySelector(".addAdminButton")
    .addEventListener("click", () => {
      const tache = document.getElementById("tache").value;
      const montant = document.getElementById("montant").value;
      if (!tache || !montant) {
        alert("merci de tout remplir");
        return;
      }
      const newAdmin = {
        tache,
        montant,
      };
      newTacheRecup.push(newAdmin);
      setTachePara(newTacheRecup);
      window.location.reload();
    });
});

formAficheSett.addEventListener("submit", (e) => {
  e.preventDefault();
});

closemodalParaTch.addEventListener("click", () => {
  modalParaTch.style.display = "none";
});

modalParaTch.addEventListener("click", (e) => {
  const parent = e.target.closest(".form-container");
  if (parent) return;
  modalParaTch.style.display = "none";
});

// supprimer une tache
let deleteButtonSetg = document.querySelectorAll(".delete-btn");
deleteButtonSetg.forEach(function (button) {
  button.addEventListener("click", function (e) {
    // enlever l'element supprimer
    let parentButom = e.target.closest("tr");
    const tache = parentButom.id;
    tblBodyParaTch.removeChild(parentButom);
    let filteredTachePara = lesTaches.filter((emp) => emp.tache !== tache);
    setTachePara(filteredTachePara);
  });
});

// logique de modification des taches et montant
btnUpdateSting.forEach(function (button) {
  button.addEventListener("click", function (e) {
    // modifier l'element
    e.preventDefault();
    let parentButom = e.target.closest("tr");
    const tache = parentButom.id;
    let recup = getTachePara();
    let concerne = recup.find((us) => us.tache === tache);
    if (!concerne) {
      alert("Pas de concerne");
      return;
    }

    let filteredTachePara = lesTaches.filter((emp) => emp.tache !== tache);

    let form = `
      <label for="tache">Tâche:</label>
      <input class="form-control" required="" value="${concerne.tache}" type="text" id="tache" name="tache">
      <label for="montant">montant:</label>
      <input class="form-control" required="" value="${concerne.montant}" type="number" id="montant" name="montant" >
      <button type="submit" class="updateSettingButton">Mettre à jour</button>
    `;

    formAficheSett.innerHTML = form;

    modalParaTch.style.display = "block";

    formAficheSett
      .querySelector(".updateSettingButton")
      .addEventListener("click", () => {
        let inputs = formAficheSett.querySelectorAll("input");
        inputs.forEach(function (input) {
          concerne[input.id] = input.value;
        });
        filteredTachePara.push(concerne);
        setTachePara(filteredTachePara);
        location.reload();
      });
  });
});

// logique de modification de nombre de tache par jour
updateNombreTachJour.addEventListener("click", function (e) {
  // modifier l'element
  e.preventDefault();
  let recup = getNombreTache();
  if (!recup) {
    alert("Pas de concerne");
    return;
  }

  let form = `
      <label for="tache">Nombre de tâches / jour:</label>
      <input class="form-control" required="" value="${recup.nombre_taches}" type="number" id="tache" name="tache">
      <button type="submit" class="updateSettingButton">Mettre à jour</button>
    `;

  formAficheSett.innerHTML = form;

  modalParaTch.style.display = "block";

  formAficheSett
    .querySelector(".updateSettingButton")
    .addEventListener("click", () => {
      let input = formAficheSett.querySelector("input");
      let changeNbr = input.value;

      nObj = {
        nombre_taches: changeNbr,
      };
      setNombreTache(nObj);
      new_ob = getNombreTache();
      row = `<tr id="${new_ob.nombre_taches}">
          <td>${new_ob.nombre_taches}</td>
          <td class="td-delete">
            <button class="update-btn" contactphone="${new_ob.nombre_taches}" id="updateNombreTachJour">mettre à jour</button>
          </td>
        </tr>`;
      tblBodyParaNbr.innerHTML = row;
      setNombreTache(new_ob);
      window.location.reload()
    });
});

// logique de modification de budget
updateBudget.addEventListener("click", function (e) {
  // modifier l'element
  e.preventDefault();
  let recup = getbudget();
  if (!recup) {
    alert("Pas de concerne");
    return;
  }

  let form = `
    <label for="tache">Nombre de tâches / jour:</label>
    <input class="form-control" required="" value="${recup.somme_budget}" type="text" id="tache" name="tache">
    <button type="submit" class="updateSettingButton">Mettre à jour</button>
  `;

  formAficheSett.innerHTML = form;

  modalParaTch.style.display = "block";

  formAficheSett
    .querySelector(".updateSettingButton")
    .addEventListener("click", () => {
      let input = formAficheSett.querySelector("input");
      let changeBuget = input.value;

      nObj = {
        somme_budget: changeBuget,
      };
      setbudget(nObj);
      new_ob = getbudget();
      row = `<tr id="${new_ob.somme_budget}">
        <td>${new_ob.somme_budget}</td>
        <td class="td-delete">
          <button class="update-btn" contactphone="${new_ob.somme_budget}" id="updateNombreTachJour">mettre à jour</button>
        </td>
      </tr>`;
      tblBodyParaBudget.innerHTML = row;
      setbudget(new_ob);
      window.location.reload()
    });
});

// gestion de qui est connecter et fait la logique
let leSupAdm = getRoot();
let recupCoActu = getSession();

let dtDelete = document.querySelectorAll(".td-delete");
let dtUpdateNbrBudget = document.querySelectorAll(".td-nbr-budget");
let ongletGestAdm = document.querySelector(".sidebar-list-item-gestionAdm");
let ajouTach = document.querySelector(".main-ajout");

if (recupCoActu.email === leSupAdm.email) {
  // pass
} else {
  ongletGestAdm.style.display = "none";
  ajouTach.style.display = "none";
  dtDelete.forEach(function (item) {
    item.style.display = "none";
  });
  dtUpdateNbrBudget.forEach(function (item) {
    item.style.display = "none";
  });
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
