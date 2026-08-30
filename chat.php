<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Tutor IA</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
    <style>
        .chat-box {
            height: 480px;
            overflow-y: auto;
        }
        .message-ai {
            max-width: 80%;
            border-radius: 15px 15px 15px 0px;
        }
        .message-user {
            max-width: 80%;
            border-radius: 15px 15px 0px 15px;
        }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
    <div class="container">
        <a class="navbar-brand fw-bold" href="dashboard.php">Chronic Map</a>
        <div class="d-flex align-items-center">
            <button id="btnThemeToggle" class="btn btn-outline-light btn-sm me-2">🌙 Escuro</button>
            <a href="dashboard.php" class="btn btn-outline-light btn-sm">Voltar ao Painel</a>
        </div>
    </div>
</nav>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-9">
            
            <div class="card shadow-sm border-0">
                <div class="card-header py-3 d-flex align-items-center border-bottom">
                    <h5 class="fw-bold mb-0 text-primary">Assistente do Aluno</h5>
                    <span class="badge bg-success ms-auto">Online</span>
                </div>

                <div class="card-body chat-box p-4" id="chatContainer">
                    <div class="d-flex mb-3">
                        <div class="message-ai p-3 shadow-sm border">
                            <small class="fw-bold text-primary d-block mb-1">IA Chronic Map</small>
                            Olá! Sou a IA do Chronic Map. O que você gostaria de estudar ou revisar hoje?
                        </div>
                    </div>
                </div>

                <div class="card-footer p-3 border-top">
                    <form id="chatForm" class="d-flex gap-2">
                        <input type="text" id="inputMensagem" class="form-control" placeholder="Digite sua pergunta aqui..." required autocomplete="off">
                        <button type="submit" class="btn btn-primary px-4">Enviar</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
const chatContainer = document.getElementById('chatContainer');
const chatForm = document.getElementById('chatForm');
const inputMensagem = document.getElementById('inputMensagem');

function carregarHistorico() {
    const historico = JSON.parse(localStorage.getItem('chat_historico') || '[]');
    
    if (historico.length > 0) {
        chatContainer.innerHTML = '';
        historico.forEach(msg => {
            renderizarMensagem(msg.autor, msg.texto);
        });
    }
}

function renderizarMensagem(autor, texto) {
    let mensagemHtml = '';

    if (autor === 'user') {
        mensagemHtml = `
            <div class="d-flex justify-content-end mb-3">
                <div class="message-user bg-primary text-white p-3 shadow-sm">
                    <small class="fw-bold text-light d-block mb-1 me-2 text-end">Você</small>
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

chatForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const mensagemTexto = inputMensagem.value.trim();
    if (!mensagemTexto) return;

    renderizarMensagem('user', mensagemTexto);
    salvarNoLocalStorage('user', mensagemTexto);

    inputMensagem.value = '';

    setTimeout(() => {
        const respostaIA = "Entendido! Essa mensagem será processada pelo backend em PHP quando a API for conectada.";
        renderizarMensagem('ai', respostaIA);
        salvarNoLocalStorage('ai', respostaIA);
    }, 800);
});

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

carregarHistorico();

const toggleBtn = document.getElementById('btnThemeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);

if (toggleBtn) {
    toggleBtn.textContent = currentTheme === 'dark' ? '☀️ Claro' : '🌙 Escuro';
    
    toggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleBtn.textContent = newTheme === 'dark' ? '☀️ Claro' : '🌙 Escuro';
    });
}
</script>
</body>
</html>