// Affichage du username connecter
const nomDuConect = document.querySelector(".nom_du_conect");
function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

function getRoot() {
  return JSON.parse(localStorage.getItem("root"));
}

function setNomAdminConect(nom) {
  nomDuConect.innerHTML = nom["username"];
}

// redirect si pas entere dans les input du login
if (!(localStorage.hasOwnProperty('session'))){
  window.location.href = 'login.html'
}

let nomAdmin = getSession();
setNomAdminConect(nomAdmin);


// gestion de qui est connecter et fait la logique

let leSupAdm = getRoot();
let recupCoActu = getSession();
if (recupCoActu.email === leSupAdm.email){
  console.log("sa marce ", recupCoActu.email)
} else{
  let ongletGestAdm = document.querySelector('.sidebar-list-item-gestionAdm')
  ongletGestAdm.style.display = 'none'
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