<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Painel Principal</title>
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

<div class="container py-5">
    <div class="row mb-4">
        <div class="col-12">
            <h2 class="fw-bold text-primary">Produtos de Aprendizado IA</h2>
            <p class="text-muted">Explore as nossas ferramentas de progressão de carreira baseadas em Inteligência Artificial.</p>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body text-center">
                    <div class="mb-3 text-primary" style="font-size: 2.5rem;">
                        <i class="bi bi-robot"></i>
                    </div>
                    <h5 class="card-title fw-bold">Tutor de IA Avançado</h5>
                    <p class="card-text text-muted">Acompanhamento em tempo real para tirar dúvidas e consolidar conhecimentos com base no seu diagnóstico inicial.</p>
                </div>
                <div class="card-footer bg-transparent border-0 pb-3 text-center">
                    <a href="chat.php" class="btn btn-primary w-75">
                        <i class="bi bi-box-arrow-in-right"></i> Acessar
                    </a>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body text-center">
                    <div class="mb-3 text-primary" style="font-size: 2.5rem;">
                        <i class="bi bi-diagram-3"></i>
                    </div>
                    <h5 class="card-title fw-bold">Mapas Mentais</h5>
                    <p class="card-text text-muted">Explore os cronogramas e estruturas visuais do seu plano de aprendizado.</p>
                </div>
                <div class="card-footer bg-transparent border-0 pb-3 text-center">
                    <a href="mapas.php" class="btn btn-outline-primary w-75">
                        <i class="bi bi-box-arrow-in-right"></i> Ver Mapas
                    </a>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body text-center">
                    <div class="mb-3 text-primary" style="font-size: 2.5rem;">
                        <i class="bi bi-bar-chart"></i>
                    </div>
                    <h5 class="card-title fw-bold">Atividades e Progresso</h5>
                    <p class="card-text text-muted">Acompanhe suas matérias, entregas e evolução no portal.</p>
                </div>
                <div class="card-footer bg-transparent border-0 pb-3 text-center">
                    <a href="progresso.php" class="btn btn-outline-primary w-75">
                        <i class="bi bi-box-arrow-in-right"></i> Ver Progresso
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
</body>
</html>