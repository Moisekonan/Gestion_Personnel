let root = { 
  username: "Moise", 
  email: "mokonan99@gmail.com", 
  password: "moko" 
};

function getRoot() {
  return JSON.parse(localStorage.getItem("root"));
}

function setRoot(root) {
  localStorage.setItem("root", JSON.stringify(root));
}

setRoot(root)

let btnCon = document.querySelector(".btn-login");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  tabRoot = getRoot();
  let result;
  if (
    document.querySelector("#email").value === tabRoot.email &&
    document.querySelector("#password").value === tabRoot.password
  ) {
    result = tabRoot;
  }

  // représente qui est connecter actuellement
  localStorage.setItem("session", JSON.stringify(result));

  if (typeof result !== "undefined") {
    alert("Vos informations sont correct !");
    window.location.href = "dashboard.html";

  } else {
    alert("Vos informations sont inccorect !");
    window.location.reload();
  }
});

btnCon.addEventListener("submit", (e) => {
  e.preventDefault();
});


function setbudget(valeur){
  return localStorage.setItem("budget", JSON.stringify(valeur))
}
function setNombreTache(valeur){
  return localStorage.setItem("nombre_taches", JSON.stringify(valeur))
}

let defoBudget = {
  somme_budget: 22000000
}

let defoNobrTach = {
  nombre_taches: 2
}

setNombreTache(defoNobrTach)
setbudget(defoBudget)