<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Progresso</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css?v=2">
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
    <h2 class="fw-bold text-primary mb-4">
        <i class="bi bi-bar-chart"></i> Seu Progresso de Aprendizado
    </h2>

    <div class="row g-3 mb-4">
        <div class="col-md-4">
            <div class="card p-3 border-0 shadow-sm text-center">
                <h6 class="text-muted">Mensagens com a IA</h6>
                <h3 class="fw-bold text-primary" id="totalMensagens">0</h3>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card p-3 border-0 shadow-sm text-center">
                <h6 class="text-muted">Módulos Concluídos</h6>
                <h3 class="fw-bold text-success">3 / 10</h3>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card p-3 border-0 shadow-sm text-center">
                <h6 class="text-muted">Nível Atual</h6>
                <h3 class="fw-bold text-warning">Iniciante Back-end</h3>
            </div>
        </div>
    </div>

    <div class="card p-4 border-0 shadow-sm mb-4">
        <h5 class="fw-bold mb-3">Evolução da Trilha</h5>
        <div class="progress" style="height: 25px;">
            <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                role="progressbar" style="width: 35%;">
                35% Concluído
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
<script>
const historico = JSON.parse(localStorage.getItem('chat_historico') || '[]');
const totalElement = document.getElementById('totalMensagens');
if (totalElement) totalElement.textContent = historico.length;
</script>
</body>
</html>