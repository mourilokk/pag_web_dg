const modalForm = document.getElementById("modalForm");
const btnFechar = document.getElementById("btnFechar");
const btnAbrirForm = document.getElementById("btnAbrirForm");
const btnHero = document.getElementById("btnHero");

window.onload = () => { modalForm.style.display = "flex"; };
btnFechar.addEventListener("click", () => { modalForm.style.display = "none"; });
btnAbrirForm.addEventListener("click", () => { modalForm.style.display = "flex"; });
btnHero.addEventListener("click", () => { modalForm.style.display = "flex"; });

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
        let response = await fetch("http://127.0.0.1:8000/api/cadastrar/", {
            method: "POST",
            headers:{
                'Content-Type': "application/json",
                "X-CSRFToken": csrftoken
            },
            body: JSON.stringify(formData)
        });

        let result = await response.json();

        if(result.status === "success"){
            alert("Cadastro realizado com sucesso!");

            await fetch("http://127.0.0.1:8000/api/exportar", {
                method: "GET"
            })

            document.getElementById("formCadastro").reset();

            modalForm.style.display = "none";
        } else {
            alert("Erro ao cadastrar: " + result.message);
        }
    } catch (error){
        alert("Erro ao conectar ao servidor.");
    }
});
