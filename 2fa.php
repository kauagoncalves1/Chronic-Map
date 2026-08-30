<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <?php include 'menu.php'; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Verificação de Segurança (2FA)</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body class="pt-5 d-flex flex-column vh-100">

<div class="container flex-grow-1 d-flex align-items-center justify-content-center py-4">
    <div class="row justify-content-center w-100">
        <div class="col-md-6 col-lg-5">
            <div class="card shadow border-0">
                <div class="card-body p-4 text-center">
                    
                    <div class="mb-4">
                        <i class="bi bi-shield-lock text-primary" style="font-size: 3rem;"></i>
                        <h3 class="fw-bold text-primary mt-2">Segurança (2FA)</h3>
                        <p class="text-muted">Confirme a sua identidade para continuar.</p>
                    </div>

                    <form action="processa_2fa.php" method="POST">
                        <div class="mb-4 text-start">
                            <label for="resposta2fa" class="form-label fw-bold">Qual o nome da sua mãe?</label>
                            <input type="text" name="resposta_2fa" id="resposta2fa" class="form-control" placeholder="Introduza a sua resposta" required>
                        </div>
                        
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-primary w-100 py-2"><i class="bi bi-check2-circle"></i> Confirmar Identidade</button>
                        </div>
                    </form>
                    
                    <a href="dashboard.php">
                    <div class="mt-3">
                        <small class="text-muted"><i class="bi bi-info-circle"></i> Após 3 tentativas falhadas, terá de iniciar sessão novamente.</small>
                    </div>
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