const modalForm = document.getElementById("modalForm");
const btnFechar = document.getElementById("btnFechar");
const btnAbrirForm = document.getElementById("btnAbrirForm");
const btnHero = document.getElementById("btnHero");

window.onload = () => { modalForm.style.display = "flex"; };
btnFechar.addEventListener("click", () => { modalForm.style.display = "none"; });
btnAbrirForm.addEventListener("click", () => { modalForm.style.display = "flex"; });
btnHero.addEventListener("click", () => { modalForm.style.display = "flex"; });

const whatsappInput = document.getElementById('whatsapp');

whatsappInput.addEventListener('input', function(e){
    let numero = e.target.value;

    numero = numero.replace(/\D/g, '');

    if(numero.length > 11){
        numero = numero.slice(0, 11);
    }

    if(numero.length <= 10){
        numero = numero.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
        numero = numero.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }

    e.target.value = numero;
})

function getCookie(name){
    let cookieValue = null;
    if(document.cookie && document.cookie !== ''){
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].trim();
            if(cookie.startsWith(name + '=')){
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const API_URL = "https://api.professordouglasmartins.com.br/api/";

document.addEventListener("DOMContentLoaded", function(){
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navCollapse = document.getElementById("navbarPrincipal");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            
            const bsCollapse = new bootstrap.Collapse(navCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        });
    });
});

document.getElementById("formCadastro").addEventListener("submit", async function (event) {
    event.preventDefault();

    let csrftoken = getCookie('csrftoken');

    let formData = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        estado: document.getElementById("estado").value,
        formacao: document.getElementById("formacao").value,
        whatsapp: document.getElementById("whatsapp").value
    };

    try{
        let response = await fetch(`${API_URL}cadastrar/`, {
            method: "POST",
            headers:{
                'Content-Type': "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify(formData),
            mode: "cors"
        });

        let result = await response.json();

        if(response.ok && result.status === "success"){
            alert("Cadastro realizado com sucesso!");

            await fetch(`${API_URL}exportar/`, {
                method: "GET",
                mode: "cors"
            });

            document.getElementById("formCadastro").reset();

            modalForm.style.display = "none";
        } else {
            alert("Erro ao cadastrar: " + result.message);
        }
    } catch (error){
        console.error("Erro ao conectar ao servidor:", error);
        alert("Erro ao conectar ao servidor.");
    }
});
