<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Login</title>
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
<body class="d-flex align-items-center vh-100">

<!-- Botão de tema flutuante (página sem menu) -->
<button id="botaoTema" title="Alternar modo claro/escuro" aria-label="Alternar tema">
    <i class="bi bi-moon-fill" id="iconeTema"></i>
</button>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-4">
            <div class="card shadow border-0">
                <div class="card-body p-4">
                    <div class="text-center mb-4">
                        <h3 class="fw-bold text-primary">
                            <i class="bi bi-geo-alt-fill"></i> Chronic Map
                        </h3>
                        <p class="text-muted">Acesso ao Sistema</p>
                    </div>

                    <form action="2fa.php" method="POST">
                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" name="email" id="email" class="form-control"
                                placeholder="seuemail@exemplo.com" required>
                        </div>

                        <div class="mb-3">
                            <label for="senha" class="form-label">Senha</label>
                            <input type="password" name="senha" id="senha" class="form-control"
                                placeholder="Sua senha" required>
                        </div>

                        <div class="d-flex gap-2 mb-3">
                            <button type="submit" class="btn btn-primary w-100 py-2">
                                <i class="bi bi-box-arrow-in-right"></i> Entrar
                            </button>
                            <button type="reset" class="btn btn-outline-secondary w-100 py-2">
                                <i class="bi bi-eraser-fill"></i> Limpar
                            </button>
                        </div>
                    </form>

                    <div class="text-center">
                        <small class="text-muted">Ainda não tem conta?
                            <a href="cadastro.php" class="text-primary text-decoration-none fw-bold">Cadastre-se</a>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
</body>
</html>