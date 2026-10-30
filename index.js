/* ========================================
   PORTFÓLIO DA AMANDA
   Interações do site
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ELEMENTOS DO SITE
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");
    const temaToggle = document.getElementById("temaToggle");
    const botaoCarinho = document.getElementById("botaoCarinho");
    const formulario = document.getElementById("formContato");
    const avisoFormulario = document.getElementById("avisoFormulario");
    const mensagemFlutuante = document.getElementById("mensagemFlutuante");
    const anoAtual = document.getElementById("anoAtual");

    // ANO AUTOMÁTICO NO RODAPÉ
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    // SAUDAÇÃO DE ACORDO COM O HORÁRIO
    const saudacao = document.getElementById("saudacao");

    if (saudacao) {
        const hora = new Date().getHours();

        if (hora >= 5 && hora < 12) {
            saudacao.textContent = "Bom dia! Que bom ter você aqui. ☀️";
        } else if (hora >= 12 && hora < 18) {
            saudacao.textContent = "Boa tarde! Que bom ter você aqui. 🌷";
        } else {
            saudacao.textContent = "Boa noite! Que bom ter você aqui. 🌙";
        }
    }

    // MENU PARA CELULAR
    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            const estaAberto = menu.classList.toggle("aberto");

            menuToggle.setAttribute("aria-expanded", String(estaAberto));
            menuToggle.setAttribute(
                "aria-label",
                estaAberto ? "Fechar menu" : "Abrir menu"
            );

            menuToggle.textContent = estaAberto ? "✕" : "☰";
        });

        // FECHA O MENU AO CLICAR EM UM LINK
        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                menu.classList.remove("aberto");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
                menuToggle.textContent = "☰";
            });
        });

        // FECHA O MENU SE A TELA VOLTAR AO TAMANHO GRANDE
        window.addEventListener("resize", function () {
            if (window.innerWidth > 700) {
                menu.classList.remove("aberto");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menu");
                menuToggle.textContent = "☰";
            }
        });
    }

    // TROCA ENTRE TEMA CLARO E ESCURO
    if (temaToggle) {
        temaToggle.addEventListener("click", function () {
            const temaEscuro = document.body.classList.toggle("dark");

            temaToggle.textContent = temaEscuro ? "☀️" : "🌙";
            temaToggle.setAttribute(
                "aria-label",
                temaEscuro ? "Ativar tema claro" : "Ativar tema escuro"
            );
        });
    }

    // CRIA CORAÇÕES ANIMADOS
    function criarCoracoes(elemento, quantidade = 7) {
        if (!elemento) return;

        const posicao = elemento.getBoundingClientRect();

        // Não cria efeitos quando o elemento não está visível.
        if (
            posicao.width === 0 ||
            posicao.height === 0 ||
            posicao.bottom < 0 ||
            posicao.top > window.innerHeight
        ) {
            return;
        }

        const centroX = posicao.left + posicao.width / 2;
        const centroY = posicao.top + posicao.height / 2;

        for (let i = 0; i < quantidade; i++) {
            const coracao = document.createElement("span");

            coracao.className = "coracao-animado";
            coracao.textContent = Math.random() > 0.5 ? "♥" : "♡";
            coracao.setAttribute("aria-hidden", "true");

            const deslocamentoX = Math.random() * 100 - 50;
            const tamanho = 17 + Math.random() * 19;

            coracao.style.left = (centroX + deslocamentoX) + "px";
            coracao.style.top = centroY + "px";
            coracao.style.fontSize = tamanho + "px";
            coracao.style.animationDelay = (Math.random() * 0.3) + "s";

            document.body.appendChild(coracao);

            coracao.addEventListener("animationend", function () {
                coracao.remove();
            }, { once: true });

            // Segurança extra para remover o coração se a animação for interrompida.
            window.setTimeout(function () {
                if (coracao.isConnected) {
                    coracao.remove();
                }
            }, 2500);
        }
    }

    // BOTÃO DE CARINHO DA PÁGINA INICIAL
    if (botaoCarinho) {
        botaoCarinho.addEventListener("click", function () {
            criarCoracoes(botaoCarinho, 12);
            mostrarMensagem("Um montão de carinho para você! ♥");
        });
    }

    // BOTÕES DE CORAÇÃO DOS PROJETOS
    document.querySelectorAll(".botao-coracao").forEach(function (botao) {
        botao.addEventListener("click", function () {
            criarCoracoes(botao, 9);
            mostrarMensagem("Obrigado pelo carinho! ♡");
        });
    });

    // MENSAGEM TEMPORÁRIA NA TELA
    function mostrarMensagem(texto) {
        if (!mensagemFlutuante) return;

        mensagemFlutuante.textContent = texto;
        mensagemFlutuante.classList.add("visivel");

        if (mostrarMensagem.timeout) {
            clearTimeout(mostrarMensagem.timeout);
        }

        mostrarMensagem.timeout = window.setTimeout(function () {
            mensagemFlutuante.classList.remove("visivel");
        }, 2600);
    }

    // ANIMAÇÃO DAS SEÇÕES AO APARECER NA TELA
    const secoesAnimadas = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("apareceu");
                    observador.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12
        });

        secoesAnimadas.forEach(function (secao) {
            observador.observe(secao);
        });
    } else {
        // Alternativa para navegadores antigos.
        secoesAnimadas.forEach(function (secao) {
            secao.classList.add("apareceu");
        });
    }

    // FORMULÁRIO DE CONTATO
    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            if (!nome || !email || !mensagem) {
                if (avisoFormulario) {
                    avisoFormulario.textContent =
                        "Preencha todos os campos antes de continuar.";
                }
                return;
            }

            if (avisoFormulario) {
                avisoFormulario.textContent =
                    "Mensagem preparada! Para enviá-la de verdade, o site precisa ser conectado a um serviço de envio ou e-mail.";
            }

            // O formulário não envia nem armazena os dados.
            // Apenas mostra uma confirmação na página.
            mostrarMensagem("Tudo preenchido certinho, " + nome + "! ♡");
        }
        );
    }

});