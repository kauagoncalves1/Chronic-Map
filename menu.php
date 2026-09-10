<?php
$usuarioLogado = isset($_SESSION['usuario_logado']) ? $_SESSION['usuario_logado'] : false;
$nomeUsuario = isset($_SESSION['nome_usuario']) ? htmlspecialchars($_SESSION['nome_usuario']) : '';
$paginaAtual = basename($_SERVER['PHP_SELF']);
?>

<header class="navbar-universal">
    <div class="container-fluid px-4">
        <div class="d-flex align-items-center justify-content-between w-100">

            <!-- Logo -->
            <a href="<?php echo $usuarioLogado ? 'dashboard.php' : 'index.php'; ?>" class="navbar-brand">
                <i class="bi bi-geo-alt-fill"></i> Chronic Map
            </a>

            <!-- Links de navegação centralizados -->
            <nav id="navLinks" class="nav-center">
                <?php if ($usuarioLogado): ?>
                    <a href="dashboard.php" class="nav-link-header <?php echo $paginaAtual === 'dashboard.php' ? 'active' : ''; ?>">
                        <i class="bi bi-house"></i> Painel
                    </a>
                    <a href="chat.php" class="nav-link-header <?php echo $paginaAtual === 'chat.php' ? 'active' : ''; ?>">
                        <i class="bi bi-robot"></i> Tutor IA
                    </a>
                    <a href="mapas.php" class="nav-link-header <?php echo $paginaAtual === 'mapas.php' ? 'active' : ''; ?>">
                        <i class="bi bi-diagram-3"></i> Mapas Mentais
                    </a>
                    <a href="progresso.php" class="nav-link-header <?php echo $paginaAtual === 'progresso.php' ? 'active' : ''; ?>">
                        <i class="bi bi-bar-chart"></i> Progresso
                    </a>
                <?php else: ?>
                    <a href="index.php" class="nav-link-header <?php echo $paginaAtual === 'index.php' ? 'active' : ''; ?>">
                        <i class="bi bi-house"></i> Início
                    </a>
                    <a href="sobre.php" class="nav-link-header <?php echo $paginaAtual === 'sobre.php' ? 'active' : ''; ?>">
                        <i class="bi bi-info-circle"></i> Sobre Nós
                    </a>
                    <a href="areas.php" class="nav-link-header <?php echo $paginaAtual === 'areas.php' ? 'active' : ''; ?>">
                        <i class="bi bi-grid"></i> Áreas
                    </a>
                    <a href="como-funciona.php" class="nav-link-header <?php echo $paginaAtual === 'como-funciona.php' ? 'active' : ''; ?>">
                        <i class="bi bi-question-circle"></i> Como Funciona
                    </a>
                <?php endif; ?>
            </nav>

            <!-- Lado direito -->
            <div class="d-flex align-items-center gap-2 position-relative">

                <!-- Acessibilidade -->
                <button id="btnAcessibilidade" aria-label="Opções de acessibilidade" title="Acessibilidade">
                    <i class="bi bi-universal-access"></i>
                    <span class="d-none d-lg-inline">Acessibilidade</span>
                    <i class="bi bi-chevron-down" style="font-size: 0.7rem;"></i>
                </button>

                <!-- Dropdown de acessibilidade -->
                <div id="menuAcessibilidade" role="menu">
                    <p class="acesso-titulo">Tamanho do texto</p>
                    <div class="acesso-item">
                        <span><i class="bi bi-fonts"></i> Fonte</span>
                        <div class="acesso-controles">
                            <button id="btnDiminuirFonte" title="Diminuir fonte">A-</button>
                            <button id="btnResetFonte" title="Tamanho padrão">A</button>
                            <button id="btnAumentarFonte" title="Aumentar fonte">A+</button>
                        </div>
                    </div>
                    <p class="acesso-titulo mt-2">Aparência</p>
                    <div class="acesso-item">
                        <button class="toggle-tema" id="botaoTema" aria-label="Alternar modo claro/escuro">
                            <i class="bi bi-moon-fill" id="iconeTema"></i>
                            <span id="textoTema">Modo Escuro</span>
                        </button>
                    </div>
                </div>

                <?php if ($usuarioLogado): ?>
                    <!-- Área do estudante (logado) -->
                    <div class="dropdown">
                        <button class="btn-perfil dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" title="Minha Conta">
                            <i class="bi bi-person-circle"></i>
                            <span class="d-none d-lg-inline"><?php echo $nomeUsuario ?: 'Estudante'; ?></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end perfil-dropdown">
                            <li class="dropdown-header-perfil">
                                <div class="perfil-avatar">
                                    <i class="bi bi-person-circle"></i>
                                </div>
                                <div>
                                    <strong><?php echo $nomeUsuario ?: 'Estudante'; ?></strong>
                                    <small class="d-block text-muted">Estudante</small>
                                </div>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <a class="dropdown-item" href="dashboard.php">
                                    <i class="bi bi-speedometer2"></i> Meu Painel
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="progresso.php">
                                    <i class="bi bi-bar-chart"></i> Meu Progresso
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="tarefas.php">
                                    <i class="bi bi-check2-square"></i> Tarefas
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="alterar_senha.php">
                                    <i class="bi bi-key"></i> Alterar Senha
                                </a>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <a class="dropdown-item text-danger" href="logout.php">
                                    <i class="bi bi-box-arrow-right"></i> Sair da Conta
                                </a>
                            </li>
                        </ul>
                    </div>
                <?php else: ?>
                    <!-- Botões para usuário não logado -->
                    <a href="cadastro.php"
                        class="nav-link-header <?php echo $paginaAtual === 'cadastro.php' ? 'active' : ''; ?>"
                        style="background:rgba(255,255,255,0.1);">
                        <i class="bi bi-person-plus"></i>
                        <span class="d-none d-md-inline">Cadastre-se</span>
                    </a>
                    <a href="login.php"
                        class="btn-login <?php echo $paginaAtual === 'login.php' ? 'active' : ''; ?>">
                        <i class="bi bi-box-arrow-in-right"></i>
                        <span class="d-none d-md-inline">Login</span>
                    </a>
                <?php endif; ?>

                <!-- Hamburguer mobile -->
                <button id="btnMenuMobile" class="d-md-none btn-mobile-menu" aria-label="Abrir menu">
                    <i class="bi bi-list" style="font-size: 1.1rem;"></i>
                </button>

            </div>
        </div>
    </div>
</header>

<script defer>
const btnAcessibilidade = document.getElementById('btnAcessibilidade');
const menuAcessibilidade = document.getElementById('menuAcessibilidade');

btnAcessibilidade.addEventListener('click', (e) => {
    e.stopPropagation();
    menuAcessibilidade.classList.toggle('aberto');
});

document.addEventListener('click', (e) => {
    if (!menuAcessibilidade.contains(e.target) && e.target !== btnAcessibilidade) {
        menuAcessibilidade.classList.remove('aberto');
    }
});

const btnMenuMobile = document.getElementById('btnMenuMobile');
const navLinks = document.getElementById('navLinks');

if (btnMenuMobile) {
    btnMenuMobile.addEventListener('click', () => {
        navLinks.classList.toggle('aberto');
    });
}

const btnResetFonte = document.getElementById('btnResetFonte');
if (btnResetFonte) {
    btnResetFonte.addEventListener('click', () => {
        document.documentElement.style.fontSize = '16px';
        localStorage.setItem('tamanhoFonte', '16');
    });
}
</script>