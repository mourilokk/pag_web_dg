
const modalForm = document.getElementById("modalForm");
const btnFechar = document.getElementById("btnFechar");
const btnAbrirForm = document.getElementById("btnAbrirForm");
const btnHero = document.getElementById("btnHero");

window.onload = () => { modalForm.style.display = "flex"; };
btnFechar.addEventListener("click", () => { modalForm.style.display = "none"; });
btnAbrirForm.addEventListener("click", () => { modalForm.style.display = "flex"; });
btnHero.addEventListener("click", () => { modalForm.style.display = "flex"; });
