<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Tutor IA</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .chat-box {
            height: 480px;
            overflow-y: auto;
            background-color: #f8f9fa;
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
<body class="bg-light">

<!-- Navbar Superior -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
    <div class="container">
        <a class="navbar-brand fw-bold" href="dashboard.php">Chronic Map</a>
        <a href="dashboard.php" class="btn btn-outline-light btn-sm">Voltar ao Painel</a>
    </div>
</nav>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-9">
            
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white py-3 d-flex align-items-center border-bottom">
                    <h5 class="fw-bold mb-0 text-primary">Assistente do Aluno</h5>
                    <span class="badge bg-success ms-auto">Online</span>
                </div>

                <!-- Área de Mensagens -->
                <div class="card-body chat-box p-4" id="chatContainer">
                    
                    <!-- Mensagem Inicial da IA -->
                    <div class="d-flex mb-3">
                        <div class="message-ai bg-white p-3 text-dark shadow-sm border">
                            <small class="fw-bold text-primary d-block mb-1">IA Chronic Map</small>
                            Olá! Sou a IA do Chronic Map. O que você gostaria de estudar ou revisar hoje?
                        </div>
                    </div>

                </div>

                <!-- Campo de Entrada -->
                <div class="card-footer bg-white p-3 border-top">
                    <form id="chatForm" class="d-flex gap-2">
                        <input type="text" id="inputMensagem" class="form-control" placeholder="Digite sua pergunta aqui..." required autocomplete="off">
                        <button type="submit" class="btn btn-primary px-4">Enviar</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>

<script>
document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const input = document.getElementById('inputMensagem');
    const mensagemTexto = input.value.trim();
    const chatContainer = document.getElementById('chatContainer');

    if (!mensagemTexto) return;

    // Adiciona mensagem do Usuário
    const userMessageHtml = `
        <div class="d-flex justify-content-end mb-3">
            <div class="message-user bg-primary text-white p-3 shadow-sm">
                <small class="fw-bold text-light d-block mb-1 me-2 text-end">Você</small>
                ${escapeHtml(mensagemTexto)}
            </div>
        </div>
    `;
    chatContainer.insertAdjacentHTML('beforeend', userMessageHtml);
    
    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Simulação visual de resposta da IA (Até a parte de PHP/API do seu grupo ser conectada)
    setTimeout(() => {
        const aiMessageHtml = `
            <div class="d-flex mb-3">
                <div class="message-ai bg-white p-3 text-dark shadow-sm border">
                    <small class="fw-bold text-primary d-block mb-1">IA Chronic Map</small>
                    Entendido! Essa mensagem será processada pelo backend em PHP quando a API for conectada.
                </div>
            </div>
        `;
        chatContainer.insertAdjacentHTML('beforeend', aiMessageHtml);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 800);
});

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>