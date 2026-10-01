<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Mapas Mentais</title>
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
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-primary">
            <i class="bi bi-diagram-3"></i> Meus Mapas Mentais
        </h2>
        <button class="btn btn-primary" id="btnNovoMapa">
            <i class="bi bi-plus-lg"></i> Novo Mapa
        </button>
    </div>

    <div class="row g-4" id="containerMapas">
        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="fw-bold text-primary">Estrutura PHP e Back-end</h5>
                    <p class="text-muted small">Criado recentemente</p>
                    <p>Modelagem de Banco de Dados, sintaxe básica e requisições HTTP.</p>
                    <button class="btn btn-outline-primary btn-sm w-100">
                        <i class="bi bi-eye"></i> Abrir Mapa
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
<script>
document.getElementById('btnNovoMapa').addEventListener('click', () => {
    const titulo = prompt('Digite o título do novo mapa mental:');
    if (!titulo) return;

    const novoCard = `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="fw-bold text-primary">${titulo}</h5>
                    <p class="text-muted small">Criado agora</p>
                    <p>Novo mapa mental em desenvolvimento.</p>
                    <button class="btn btn-outline-primary btn-sm w-100">
                        <i class="bi bi-eye"></i> Abrir Mapa
                    </button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('containerMapas').insertAdjacentHTML('beforeend', novoCard);
});
</script>
</body>
</html>