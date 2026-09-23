<nav class="navbar navbar-expand-md navbar-universal shadow-sm">
    <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="index.php">
            <i class="bi bi-geo-alt-fill"></i> Chronic Map
        </a>

        <!-- Botão Mobile -->
        <button class="navbar-toggler btn-mobile-menu" type="button" data-bs-toggle="collapse" data-bs-target="#navCentro" aria-controls="navCentro" aria-expanded="false" aria-label="Toggle navigation">
            <i class="bi bi-list"></i>
        </button>

        <!-- Links Centrais -->
        <div class="collapse navbar-collapse nav-center" id="navCentro">
            <a class="nav-link-header" href="dashboard.php"><i class="bi bi-house-door"></i> Início</a>
            <a class="nav-link-header" href="chat.php"><i class="bi bi-robot"></i> Tutor IA</a>
            <a class="nav-link-header" href="mapas.php"><i class="bi bi-diagram-3"></i> Mapas</a>
            <a class="nav-link-header" href="progresso.php"><i class="bi bi-bar-chart"></i> Progresso</a>
        </div>

        <!-- Acessibilidade e Perfil -->
        <div class="d-flex align-items-center gap-3 ms-auto position-relative">
            
            <button id="btnAcessibilidade" onclick="document.getElementById('menuAcessibilidade').classList.toggle('aberto')">
                <i class="bi bi-universal-access-circle"></i> <span class="d-none d-sm-inline">Acessibilidade</span>
            </button>

            <!-- Dropdown Acessibilidade -->
            <div id="menuAcessibilidade">
                <div class="acesso-titulo">Configurações Visuais</div>
                <div class="acesso-item">
                    <span>Tamanho da Fonte</span>
                    <div class="acesso-controles">
                        <button id="btnDiminuirFonte" title="Diminuir fonte">A-</button>
                        <button id="btnAumentarFonte" title="Aumentar fonte">A+</button>
                    </div>
                </div>
                <div class="acesso-item border-0 pb-0">
                    <button class="toggle-tema" id="botaoTema" onclick="aplicarTema(localStorage.getItem('tema') === 'dark' ? 'light' : 'dark')">
                        <i id="iconeTema" class="bi bi-moon-fill"></i> 
                        <span id="textoTema">Modo Escuro</span>
                    </button>
                </div>
            </div>

            <script>
                if (sessionStorage.getItem('usuario_2fa') || localStorage.getItem('dadosCadastro')) {
                    document.write(`
                        <button class="btn-perfil" title="Meu Perfil">
                            <i class="bi bi-person-circle"></i>
                        </button>
                    `);
                } else {
                    document.write(`
                        <a href="login.php" class="btn-login">
                            <i class="bi bi-box-arrow-in-right"></i> Entrar
                        </a>
                    `);
                }
            </script>
        </div>
    </div>
</nav>