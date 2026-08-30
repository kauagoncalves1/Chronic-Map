<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <?php include 'menu.php'; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Iniciar Sessão</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body class="pt-5 d-flex flex-column vh-100">

<div class="container flex-grow-1 d-flex align-items-center justify-content-center">
    <div class="row justify-content-center w-100">
        <div class="col-12 col-sm-10 col-md-8 col-lg-4">
            <div class="card shadow border-0">
                <div class="card-body p-4">
                    <div class="text-center mb-4">
                        <h3 class="fw-bold text-primary"><i class="bi bi-geo-alt-fill"></i> Chronic Map</h3>
                        <p class="text-muted">Acesso ao Sistema</p>
                    </div>

                    <form action="2fa.php" method="POST">
                        <div class="mb-3">
                            <label for="login" class="form-label">Login</label>
                            <input type="text" name="login" id="login" class="form-control" placeholder="Exatamente 6 letras" maxlength="6" required>
                        </div>

                        <div class="mb-3">
                            <label for="senha" class="form-label">Palavra-passe</label>
                            <input type="password" name="senha" id="senha" class="form-control" placeholder="Exatamente 8 letras" maxlength="8" required>
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
                        <small class="text-muted">Cliente novo? <a href="cadastro.php" class="text-primary text-decoration-none fw-bold">Cadastre-se aqui</a></small>
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