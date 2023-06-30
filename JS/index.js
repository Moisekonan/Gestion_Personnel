const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector("#sidebar");
const header = document.querySelector(".header");

const countEmployee = document.querySelector(".box .count_user");
const countAdmin = document.querySelector(".box .count_admin");
const nomDuConect = document.querySelector(".nom_du_conect");
const countBudget = document.querySelector(".count_budget");


// Tab des statistiques
let options = {
  series: [
    {
      data: [1100, 530, 648, 870, 1380],
    },
  ],
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      distributed: true,
      horizontal: false,
      columnWidth: "40%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ["Banane", "Tomate", "Gombo", "Aubergine", "Cacao"],
  },
  yaxix: {
    title: {
      text: "Recette",
    },
  },
};

let chart = new ApexCharts(document.querySelector("#stat-bar"), options);
chart.render();
// ***********************************
let options2 = {
  series: [
    {
      name: "Ventes",
      type: "column",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
    {
      name: "Prévisions",
      type: "area",
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    },
    {
      name: "Rejets",
      type: "line",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    },
  ],
  chart: {
    height: 350,
    type: "line",
    stacked: false,
  },
  stroke: {
    width: [0, 2, 3],
    curve: "smooth",
  },
  plotOptions: {
    bar: {
      columnWidth: "50%",
      distributed: false,
    },
  },

  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: "light",
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100],
    },
  },
  labels: [
    "Jan",
    "Fev",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil",
    "Aout",
    "Sept",
    "Oct",
    "Nov",
  ],
  markers: {
    size: 0,
  },
  yaxis: {
    title: {
      text: "Quantité",
    },
    min: 0,
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
};

let chart2 = new ApexCharts(document.querySelector("#stat-area"), options2);
chart2.render();


// logique de deconnecter et delete la session connecter
let logoutButom = document.querySelector(".logoutButom");

logoutButom.addEventListener("click", () => {
  localStorage.removeItem("session");
});

function getEmployee() {
  return JSON.parse(localStorage.getItem("employee"));
}

function getAdmin() {
  return JSON.parse(localStorage.getItem("admin"));
}

function getBudget() {
  return JSON.parse(localStorage.getItem("budget"));
}

function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

function getRoot() {
  return JSON.parse(localStorage.getItem("root"));
}

function setCountEm(count) {
  countEmployee.innerHTML = count.length;
}

function setCountAd(count) {
  countAdmin.innerHTML = count.length;
}

function setCountBudget(count) {
  countBudget.innerHTML = count;
}

function setNomAdminConect(nom) {
  nomDuConect.innerHTML = nom["username"];
}

// redirect si pas entere dans les input du login
if (!(localStorage.hasOwnProperty('session'))){
  window.location.href = 'login.html'
}

let nomAdmin = getSession()
let nbrAdmin = getAdmin();
let employee = getEmployee();
let budget = getBudget();
setCountEm(employee);
setCountAd(nbrAdmin);
setCountBudget(budget.somme_budget);
setNomAdminConect(nomAdmin);



// gestion de qui est connecter et fait la logique
let leSupAdm = getRoot();
let recupCoActu = getSession();
if (recupCoActu.email === leSupAdm.email){
  console.log("sa marce ", recupCoActu.email)
} else{
  let ongletGestAdm = document.querySelector('.sidebar-list-item-gestionAdm')
  ongletGestAdm.style.display = 'none'
  console.log(leSupAdm.email)
  console.log("sa marce pas ", recupCoActu.email, " pas même ", recupCoActu.username)
}


// ************responsive-sidebar
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

