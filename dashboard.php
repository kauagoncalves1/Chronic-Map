<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <?php include 'menu.php'; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Painel Principal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body class="pt-5">

<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
    <div class="container">
        <a class="navbar-brand fw-bold" href="dashboard.php"><i class="bi bi-geo-alt-fill"></i> Chronic Map</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="menuPrincipal">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" href="dashboard.php"><i class="bi bi-house-door"></i> Início</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="consulta_usuario.php"><i class="bi bi-people"></i> Utilizadores</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="log.php"><i class="bi bi-journal-text"></i> Logs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="alterar_senha.php"><i class="bi bi-key"></i> Alterar Senha</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="modelo_bd.php"><i class="bi bi-database"></i> Modelo BD</a>
                </li>
            </ul>
            
            <div class="d-flex align-items-center text-white">
                <span class="me-3"><i class="bi bi-person-circle"></i> Utilizador: <strong id="loginUsuarioLogado">JOSESIL</strong></span>
                <a href="logout.php" class="btn btn-outline-light btn-sm"><i class="bi bi-box-arrow-right"></i> Sair</a>
            </div>
        </div>
    </div>
</nav>

<div class="container pb-5">
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
                    <div class="mb-3 text-primary" style="font-size: 2.5rem;"><i class="bi bi-robot"></i></div>
                    <h5 class="card-title fw-bold">Tutor de IA Avançado</h5>
                    <p class="card-text text-muted">Acompanhamento em tempo real para tirar dúvidas e consolidar conhecimentos com base no seu diagnóstico inicial.</p>
                </div>
                <div class="card-footer bg-transparent border-0 pb-3 text-center">
                    <button class="btn btn-primary w-75">Aceder</button>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body text-center">
                    <div class="mb-3 text-success" style="font-size: 2.5rem;"><i class="bi bi-diagram-3"></i></div>
                    <h5 class="card-title fw-bold">Mapas Mentais Dinâmicos</h5>
                    <p class="card-text text-muted">Estruturas visuais da sua trilha de aprendizado (Informática, Saúde, etc.), geradas por IA para visualização de macro e micro áreas.</p>
                </div>
                <div class="card-footer bg-transparent border-0 pb-3 text-center">
                    <button class="btn btn-success w-75">Visualizar</button>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body text-center">
                    <div class="mb-3 text-warning" style="font-size: 2.5rem;"><i class="bi bi-graph-up-arrow"></i></div>
                    <h5 class="card-title fw-bold">Diagnóstico de Progresso</h5>
                    <p class="card-text text-muted">Acompanhe marcos e métricas sobre a sua evolução semanal conforme os objetivos definidos na Anamnese.</p>
                </div>
                <div class="card-footer bg-transparent border-0 pb-3 text-center">
                    <button class="btn btn-warning text-dark w-75">Métricas</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
</body>
</html>