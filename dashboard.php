<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Painel Principal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
        <a class="navbar-brand fw-bold" href="dashboard.php">Chronic Map</a>
        <div class="d-flex align-items-center">
            <span class="navbar-text text-white me-3" id="nomeUsuarioNavbar">Bem-vindo!</span>
            <button id="btnThemeToggle" type="button" class="btn btn-outline-light btn-sm me-2">🌙 Escuro</button>
            <a href="index.php" class="btn btn-outline-light btn-sm">Sair</a>
        </div>
    </div>
</nav>

<div class="container py-5">
    <div class="row mb-4">
        <div class="col">
            <h2 class="fw-bold">Painel de Estudos</h2>
            <p class="text-muted">Selecione uma das opções abaixo para evoluir suas habilidades.</p>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="card-title fw-bold text-primary">Tutor de IA</h5>
                    <p class="card-text">Converse em tempo real com nossa Inteligência Artificial para tirar dúvidas e criar resumos.</p>
                    <a href="chat.php" class="btn btn-primary w-100 mt-2">Acessar Tutor IA</a>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="card-title fw-bold text-primary">Mapas Mentais</h5>
                    <p class="card-text">Explore os cronogramas e estruturas visuais do seu plano de aprendizado.</p>
                    <a href="mapas.php" class="btn btn-outline-primary w-100 mt-2">Ver Mapas</a>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                    <h5 class="card-title fw-bold text-primary">Atividades e Progresso</h5>
                    <p class="card-text">Acompanhe suas matérias, entregas e evolução no portal.</p>
                    <a href="progresso.php" class="btn btn-outline-primary w-100 mt-2">Ver Progresso</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
    // Carrega Nome Salvo
    const nomeSalvo = localStorage.getItem('usuario_nome') || 'Estudante';
    const navbarElement = document.getElementById('nomeUsuarioNavbar');
    if (navbarElement) {
        navbarElement.textContent = `Bem-vindo, ${nomeSalvo}!`;
    }

    // Gerencia Tema Claro/Escuro
    const toggleBtn = document.getElementById('btnThemeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);

    if (toggleBtn) {
        toggleBtn.textContent = currentTheme === 'dark' ? '☀️ Claro' : '🌙 Escuro';

        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            toggleBtn.textContent = newTheme === 'dark' ? '☀️ Claro' : '🌙 Escuro';
        });
    }
});
</script>
</body>
</html>