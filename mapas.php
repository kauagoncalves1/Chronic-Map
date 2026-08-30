<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Mapas Mentais</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
    <div class="container">
        <a class="navbar-brand fw-bold" href="dashboard.php">Chronic Map</a>
        <div class="d-flex align-items-center">
            <button id="btnThemeToggle" type="button" class="btn btn-outline-light btn-sm me-2">🌙 Escuro</button>
            <a href="dashboard.php" class="btn btn-outline-light btn-sm">Voltar ao Painel</a>
        </div>
    </div>
</nav>

<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Meus Mapas Mentais</h2>
        <button class="btn btn-primary" id="btnNovoMapa">+ Novo Mapa</button>
    </div>

    <div class="row g-4" id="containerMapas">
        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="fw-bold text-primary">Estrutura PHP & Back-end</h5>
                    <p class="text-muted small">Criado recentemente</p>
                    <p>Modelagem de Banco de Dados, sintaxe básica e requisições HTTP.</p>
                    <button class="btn btn-outline-primary btn-sm w-100">Abrir Mapa</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const btnNovoMapa = document.getElementById('btnNovoMapa');
    if (btnNovoMapa) {
        btnNovoMapa.addEventListener('click', () => {
            const titulo = prompt("Digite o título do novo mapa mental:");
            if (!titulo) return;

            const novoCard = `
                <div class="col-md-4">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-body">
                            <h5 class="fw-bold text-primary">${titulo}</h5>
                            <p class="text-muted small">Criado agora</p>
                            <p>Novo mapa mental em desenvolvimento.</p>
                            <button class="btn btn-outline-primary btn-sm w-100">Abrir Mapa</button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('containerMapas').insertAdjacentHTML('beforeend', novoCard);
        });
    }

    const toggleBtn = document.getElementById('btnThemeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (toggleBtn) {
        toggleBtn.textContent = currentTheme === 'dark' ? '☀️ Claro' : '🌙 Escuro';
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            toggleBtn.textContent = theme === 'dark' ? '☀️ Claro' : '🌙 Escuro';
        });
    }
});
</script>
</body>
</html>