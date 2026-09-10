<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Tutor IA</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css?v=2">
    <style>
        .chat-box { height: 480px; overflow-y: auto; }
        .message-ai { max-width: 80%; border-radius: 15px 15px 15px 0; }
        .message-user { max-width: 80%; border-radius: 15px 15px 0 15px; }
    </style>
    <script>
    /* Aplica tema e fonte antes do primeiro paint — evita flash branco */
    (function() {
        var tema = localStorage.getItem('tema');
        if (tema === 'dark') document.documentElement.classList.add('tema-escuro');
        var fonte = localStorage.getItem('tamanhoFonte');
        if (fonte) document.documentElement.style.fontSize = fonte + 'px';
    })();
</script>
</head>
<body class="pt-5">

<?php include 'menu.php'; ?>

<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-9">
            <div class="card shadow-sm border-0">
                <div class="card-header py-3 d-flex align-items-center border-bottom">
                    <h5 class="fw-bold mb-0 text-primary">
                        <i class="bi bi-robot"></i> Assistente do Aluno
                    </h5>
                    <span class="badge bg-success ms-auto">
                        <i class="bi bi-wifi"></i> Online
                    </span>
                </div>

                <div class="card-body chat-box p-4" id="chatContainer">
                    <div class="d-flex mb-3">
                        <div class="message-ai p-3 shadow-sm border">
                            <small class="fw-bold text-primary d-block mb-1">IA Chronic Map</small>
                            <p class="mb-0">Olá! Sou a IA do Chronic Map. O que gostaria de estudar ou revisar hoje?</p>
                        </div>
                    </div>
                </div>

                <div class="card-footer p-3 border-top">
                    <form id="chatForm" class="d-flex gap-2">
                        <input type="text" id="inputMensagem" name="mensagem" class="form-control"
                            placeholder="Escreva sua pergunta aqui..." required autocomplete="off">
                        <button type="submit" class="btn btn-primary px-4">
                            <i class="bi bi-send-fill"></i> Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
<script>
/*
    INTEGRAÇÃO COM O BACK-END:
    - Substituir o setTimeout abaixo por uma chamada fetch() ao endpoint da API FastAPI
    - A resposta real virá da Gemini API, processada pelo back-end PHP/FastAPI
*/
const chatContainer = document.getElementById('chatContainer');
const chatForm = document.getElementById('chatForm');
const inputMensagem = document.getElementById('inputMensagem');

function renderizarMensagem(autor, texto) {
    let mensagemHtml = '';

    if (autor === 'user') {
        mensagemHtml = `
            <div class="d-flex justify-content-end mb-3">
                <div class="message-user bg-primary text-white p-3 shadow-sm">
                    <small class="fw-bold text-light d-block mb-1 text-end">Você</small>
                    ${escapeHtml(texto)}
                </div>
            </div>
        `;
    } else {
        mensagemHtml = `
            <div class="d-flex mb-3">
                <div class="message-ai p-3 shadow-sm border">
                    <small class="fw-bold text-primary d-block mb-1">IA Chronic Map</small>
                    ${escapeHtml(texto)}
                </div>
            </div>
        `;
    }

    chatContainer.insertAdjacentHTML('beforeend', mensagemHtml);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function salvarNoLocalStorage(autor, texto) {
    const historico = JSON.parse(localStorage.getItem('chat_historico') || '[]');
    historico.push({ autor, texto });
    localStorage.setItem('chat_historico', JSON.stringify(historico));
}

function carregarHistorico() {
    const historico = JSON.parse(localStorage.getItem('chat_historico') || '[]');
    if (historico.length > 0) {
        chatContainer.innerHTML = '';
        historico.forEach(msg => renderizarMensagem(msg.autor, msg.texto));
    }
}

chatForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const mensagemTexto = inputMensagem.value.trim();
    if (!mensagemTexto) return;

    renderizarMensagem('user', mensagemTexto);
    salvarNoLocalStorage('user', mensagemTexto);
    inputMensagem.value = '';

    setTimeout(() => {
        const respostaIA = 'Essa mensagem será processada pelo back-end quando a API for conectada.';
        renderizarMensagem('ai', respostaIA);
        salvarNoLocalStorage('ai', respostaIA);
    }, 800);
});

function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

carregarHistorico();
</script>
</body>
</html>