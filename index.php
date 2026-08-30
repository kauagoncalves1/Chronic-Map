<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
</head>
<body class="d-flex align-items-center vh-100">

<div class="position-absolute top-0 end-0 p-3">
    <button id="btnThemeToggle" class="btn btn-outline-primary btn-sm">🌙 Escuro</button>
</div>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-4">
            <div class="card shadow border-0">
                <div class="card-body p-4">
                    <div class="text-center mb-4">
                        <h3 class="fw-bold text-primary">Chronic Map</h3>
                        <p class="text-muted">Portal de Estudos com IA</p>
                    </div>

                    <form action="dashboard.php" method="POST">
                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" name="email" id="email" class="form-control" placeholder="email@exemplo.com" required>
                        </div>

                        <div class="mb-3">
                            <label for="senha" class="form-label">Senha</label>
                            <input type="password" name="senha" id="senha" class="form-control" placeholder="••••••••" required>
                        </div>

                        <button type="submit" class="btn btn-primary w-100 py-2 mb-3">Entrar</button>
                    </form>

                    <div class="text-center">
                        <small class="text-muted">Ainda não tem conta? <a href="cadastro.php" class="text-primary text-decoration-none fw-bold">Cadastre-se</a></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
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

// Captura o login/e-mail antes de enviar o formulário
document.querySelector('form').addEventListener('submit', function() {
    const emailInput = document.getElementById('email').value.split('@')[0];
    localStorage.setItem('usuario_nome', emailInput || 'Estudante');
});
</script>
</body>
</html>