// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

const formulario = document.getElementById("formularioContato");
const mensagemFormulario = document.getElementById("mensagemFormulario");

formulario.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    if (nome === "" || email === "" || mensagem === "") {

        mensagemFormulario.textContent =
            "Por favor, preencha todos os campos.";

        mensagemFormulario.className = "erro";

        return;
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {

        mensagemFormulario.textContent =
            "Digite um e-mail válido.";

        mensagemFormulario.className = "erro";

        return;
    }

    mensagemFormulario.textContent = "Enviando...";
    mensagemFormulario.className = "";

    const dados = new FormData(formulario);

    try {

        const resposta = await fetch(formulario.action, {

            method: "POST",

            body: dados,

            headers: {
                "Accept": "application/json"
            }

        });

        if (resposta.ok) {

            mensagemFormulario.textContent =
                "Mensagem enviada com sucesso, " + nome + "!";

            mensagemFormulario.className = "sucesso";

            formulario.reset();

        } else {

            mensagemFormulario.textContent =
                "Não foi possível enviar a mensagem.";

            mensagemFormulario.className = "erro";
        }

    } catch (erro) {

        mensagemFormulario.textContent =
            "Ocorreu um erro. Tente novamente.";

        mensagemFormulario.className = "erro";
    }

});


// ========================================
// ANIMAÇÃO DAS SEÇÕES
// ========================================

const elementos = document.querySelectorAll(".revelar");

const observador = new IntersectionObserver(function (entradas) {

    entradas.forEach(function (entrada) {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("ativo");

        }

    });

}, {

    threshold: 0.2

});

elementos.forEach(function (elemento) {

    observador.observe(elemento);

});


// ========================================
// BOTÃO VOLTAR AO TOPO
// ========================================

const voltarTopo = document.getElementById("voltarTopo");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        voltarTopo.style.display = "block";

    } else {

        voltarTopo.style.display = "none";

    }

});

voltarTopo.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ========================================
// MENU ATIVO
// ========================================

const secoes = document.querySelectorAll("main section[id]");
const linksMenu = document.querySelectorAll(".menu-link");

const observadorMenu = new IntersectionObserver(function (entradas) {

    entradas.forEach(function (entrada) {

        if (entrada.isIntersecting) {

            linksMenu.forEach(function (link) {

                link.classList.remove("ativo");

            });

            const linkAtivo = document.querySelector(
                `.menu-link[href="#${entrada.target.id}"]`
            );

            if (linkAtivo) {

                linkAtivo.classList.add("ativo");

            }

        }

    });

}, {

    threshold: 0.4

});

secoes.forEach(function (secao) {

    observadorMenu.observe(secao);

});
// ========================================
// MODO ESCURO
// ========================================

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        botaoTema.textContent = "☀️ Modo Claro";

    } else {

        botaoTema.textContent = "🌙 Modo Escuro";

    }

});
