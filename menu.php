<?php
// TODO [BACKEND]: Iniciar a sessão no topo do arquivo principal que chamar este menu.
// session_start(); 
// A variável $usuarioLogado deve ser definida se o login foi feito com sucesso.
$usuarioLogado = isset($_SESSION['usuario_logado']) ? $_SESSION['usuario_logado'] : false;
?>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <div class="container">
        <a class="navbar-brand fw-bold text-primary" href="index.php">
            <i class="bi bi-geo-alt-fill"></i> Chronic Map
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuGlobal" aria-controls="menuGlobal" aria-expanded="false" aria-label="Alternar navegação">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="menuGlobal">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="home.php"><i class="bi bi-house"></i> Início</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="historia.php"><i class="bi bi-book"></i> Nossa História</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="produtos.php"><i class="bi bi-box"></i> Produtos</a>
                </li>
            </ul>

            <div class="d-flex align-items-center gap-3">
                
                <div class="btn-group" role="group" aria-label="Acessibilidade">
                    <button id="btnAumentarFonte" class="btn btn-outline-light btn-sm" title="Aumentar Fonte">A+</button>
                    <button id="btnDiminuirFonte" class="btn btn-outline-light btn-sm" title="Diminuir Fonte">A-</button>
                    <button id="botaoTema" class="btn btn-outline-light btn-sm" title="Alto Contraste">
                        <i class="bi bi-moon-fill" id="iconeTema"></i>
                    </button>
                </div>

                <?php if (!$usuarioLogado): ?>
                    <div class="d-flex gap-2">
                        <a href="login.php" class="btn btn-outline-primary btn-sm"><i class="bi bi-box-arrow-in-right"></i> Login</a>
                        <a href="cadastro.php" class="btn btn-primary btn-sm"><i class="bi bi-person-plus"></i> Cadastre-se</a>
                    </div>
                <?php else: ?>
                    <div class="dropdown">
                        <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-circle"></i> Olá, <?php echo htmlspecialchars($_SESSION['nome_usuario']); ?>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="dashboard.php">Meu Painel</a></li>
                            <li><a class="dropdown-item" href="alterar_senha.php">Alterar Senha</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="logout.php"><i class="bi bi-box-arrow-right"></i> Sair</a></li>
                        </ul>
                    </div>
                <?php endif; ?>
                
            </div>
        </div>
    </div>
</nav>