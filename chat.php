<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <?php include 'menu.php'; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Tutor IA</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css">
    <style>
        .chat-box { height: 480px; overflow-y: auto; }
        .message-ai { max-width: 80%; border-radius: 15px 15px 15px 0px; }
        .message-user { max-width: 80%; border-radius: 15px 15px 0px 15px; }
    </style>
</head>
<body class="pt-5">

<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
    <div class="container">
        <a class="navbar-brand fw-bold" href="dashboard.php"><i class="bi bi-geo-alt-fill"></i> Chronic Map</a>
        
        <div class="collapse navbar-collapse" id="menuPrincipal">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="dashboard.php"><i class="bi bi-house-door"></i> Início</a>
                </li>
            </ul>
            
            <div class="d-flex align-items-center text-white">
                <span class="me-3"><i class="bi bi-person-circle"></i> Utilizador: <strong id="loginUsuarioLogado">JOSESIL</strong></span>
                <a href="index.php" class="btn btn-outline-light btn-sm"><i class="bi bi-box-arrow-right"></i> Sair</a>
            </div>
        </div>
    </div>
</nav>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-9">
            
            <div class="card shadow-sm border-0">
                <div class="card-header py-3 d-flex align-items-center border-bottom bg-white">
                    <h5 class="fw-bold mb-0 text-primary"><i class="bi bi-robot"></i> Assistente do Aluno</h5>
                    <span class="badge bg-success ms-auto"><i class="bi bi-wifi"></i> Online</span>
                </div>

                <div class="card-body chat-box p-4" id="chatContainer">
                    <div class="d-flex mb-3">
                        <div class="message-ai p-3 shadow-sm border bg-light text-dark">
                            <small class="fw-bold text-primary d-block mb-1">IA Chronic Map</small>
                            <p class="mb-0">Olá! Sou a IA do Chronic Map. Com base na sua anamnese, o que gostaria de estudar ou rever hoje?</p>
                        </div>
                    </div>
                </div>

                <div class="card-footer p-3 border-top bg-white">
                    <form id="chatForm" class="d-flex gap-2">
                        <input type="text" id="inputMensagem" name="mensagem" class="form-control" placeholder="Escreva a sua pergunta aqui..." required autocomplete="off">
                        <button type="submit" class="btn btn-primary px-4"><i class="bi bi-send-fill"></i> Enviar</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
<script>
    // Código de Front-end Temporário para simular interação.
    // TODO: Ajustar para fetch() / AJAX quando o backend PHP estiver a responder na rota correta.
    
    const chatForm = document.getElementById('chatForm');
    const inputMensagem = document.getElementById('inputMensagem');
    const chatContainer = document.getElementById('chatContainer');

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede refresh da página
        const msg = inputMensagem.value.trim();
        if (!msg) return;

        // Adiciona a mensagem do utilizador ao ecrã
        const msgUser = `
            <div class="d-flex justify-content-end mb-3">
                <div class="message-user bg-primary text-white p-3 shadow-sm">
                    <small class="fw-bold text-light d-block mb-1 me-2 text-end">Você</small>
                    <p class="mb-0">${msg}</p>
                </div>
            </div>`;
        chatContainer.insertAdjacentHTML('beforeend', msgUser);
        inputMensagem.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight; // Rolar para o fim

        // Feedback visual enquanto a IA não responde
        setTimeout(() => {
            const msgAI = `
                <div class="d-flex mb-3">
                    <div class="message-ai p-3 shadow-sm border bg-light text-dark">
                        <small class="fw-bold text-primary d-block mb-1">IA Chronic Map</small>
                        <p class="mb-0">A enviar dados para a API (FastAPI + Gemini)... Por favor, aguarde.</p>
                    </div>
                </div>`;
            chatContainer.insertAdjacentHTML('beforeend', msgAI);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 600);
    });
</script>
</body>
</html>