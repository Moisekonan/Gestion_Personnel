let root = { 
  username: "Moise", 
  email: "mokonan99@gmail.com", 
  password: "moko" 
};

function getAdmin() {
  return JSON.parse(localStorage.getItem("admin"));
}

function setAdmin(administ) {
  localStorage.setItem("admin", JSON.stringify(administ));
}

let admLocal = getAdmin() || [];
console.log(typeof(admLocal))
setAdmin(admLocal)
let btnCon = document.querySelector(".btn-login");
const form = document.querySelector("form");
let tabUser = getAdmin();
const flag = tabUser.some(v => v.email == "mokonan99@gmail.com")
if(!flag){
  tabUser.push(root)
  setAdmin(tabUser)
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let result;
  tabUser.forEach((element) => {
    if (
      document.querySelector("#email").value === element.email &&
      document.querySelector("#password").value === element.password
    ) {
      result = element;
    }
  });

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