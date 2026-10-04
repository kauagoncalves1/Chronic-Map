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
            
            <button id="btnAcessibilidade" aria-expanded="false" aria-haspopup="true" aria-controls="menuAcessibilidade" aria-label="Abrir opções de acessibilidade">
                <i class="bi bi-universal-access-circle" aria-hidden="true"></i> <span class="d-none d-sm-inline">Acessibilidade</span>
            </button>

            <!-- Dropdown Acessibilidade -->
            <div id="menuAcessibilidade" role="region" aria-label="Painel de preferências de acessibilidade">
                <div class="acesso-titulo">Configurações Visuais</div>
                <div class="acesso-item">
                    <span>Tamanho da Fonte</span>
                    <div class="acesso-controles">
                        <button id="btnDiminuirFonte" title="Diminuir tamanho do texto" aria-label="Diminuir fonte">A-</button>
                        <button id="btnAumentarFonte" title="Aumentar tamanho do texto" aria-label="Aumentar fonte">A+</button>
                    </div>
                </div>
                <div class="acesso-item border-0 pb-0">
                    <button class="toggle-tema" id="botaoTema" aria-label="Alternar modo claro e escuro">
                        <i id="iconeTema" class="bi bi-moon-fill" aria-hidden="true"></i> 
                        <span id="textoTema">Modo Escuro</span>
                    </button>
                </div>
            </div>

            <div id="containerPerfilUsuario">
                <button class="btn-perfil" id="btnPerfil" aria-expanded="false" aria-haspopup="true" aria-controls="menuPerfil" title="Meu Perfil" aria-label="Abrir menu do perfil">
                    <i class="bi bi-person-circle fs-5" aria-hidden="true"></i>
                    <span class="d-none d-lg-inline small" id="nomeHeaderUsuario">Aluno</span>
                </button>

                <!-- Dropdown do Perfil -->
                <div id="menuPerfil" role="region" aria-label="Menu do Usuário">
                    <div class="perfil-header">
                        <div class="fw-bold text-primary" id="dropdownNomeUsuario">Estudante Chronic</div>
                        <small class="text-muted text-truncate d-block" id="dropdownEmailUsuario">aluno@chronicmap.com</small>
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <a href="javascript:void(0)" class="perfil-link" id="linkAbrirModalPerfil">
                            <i class="bi bi-person-gear text-primary"></i> Meus Dados & Perfil
                        </a>
                        <a href="progresso.php" class="perfil-link">
                            <i class="bi bi-award text-success"></i> Meu Progresso & Trilha
                        </a>
                        <a href="chat.php" class="perfil-link">
                            <i class="bi bi-robot text-info"></i> Falar com Tutor IA
                        </a>
                        <hr class="my-2 border-secondary-subtle">
                        <a href="javascript:void(0)" class="perfil-link text-danger" id="btnSairConta">
                            <i class="bi bi-box-arrow-right"></i> Sair da Conta
                        </a>
                    </div>
                </div>
            </div>

            <a href="login.php" class="btn-login d-none" id="btnLoginHeader">
                <i class="bi bi-box-arrow-in-right"></i> Entrar
            </a>
        </div>
    </div>
</nav>

<!-- Modal de Perfil Completo com Abas -->
<div class="modal fade" id="modalPerfilUsuario" tabindex="-1" aria-labelledby="modalPerfilTitulo" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content shadow-lg border-0">
            <div class="modal-header border-bottom">
                <div class="d-flex align-items-center gap-3">
                    <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; font-size: 1.5rem;">
                        <i class="bi bi-person-fill"></i>
                    </div>
                    <div>
                        <h5 class="modal-title fw-bold mb-0" id="modalPerfilTitulo">Perfil do Aluno</h5>
                        <small class="text-muted" id="modalPerfilSubtitulo">Gerencie suas informações de estudo e conta</small>
                    </div>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            
            <div class="modal-body p-4">
                <!-- Abas do Perfil -->
                <ul class="nav nav-pills mb-4 gap-2 border-bottom pb-3" id="abasPerfilTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active rounded-pill px-3 py-2 fw-semibold" id="aba-dados-tab" data-bs-toggle="pill" data-bs-target="#aba-dados" type="button" role="tab" aria-selected="true">
                            <i class="bi bi-person-vcard me-1"></i> Dados Cadastrais
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link rounded-pill px-3 py-2 fw-semibold" id="aba-estudos-tab" data-bs-toggle="pill" data-bs-target="#aba-estudos" type="button" role="tab" aria-selected="false">
                            <i class="bi bi-mortarboard me-1"></i> Trilha Ativa
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link rounded-pill px-3 py-2 fw-semibold" id="aba-seguranca-tab" data-bs-toggle="pill" data-bs-target="#aba-seguranca" type="button" role="tab" aria-selected="false">
                            <i class="bi bi-shield-check me-1"></i> Segurança & 2FA
                        </button>
                    </li>
                </ul>

                <!-- Conteúdo das Abas -->
                <div class="tab-content" id="abasPerfilConteudo">
                    <!-- Aba 1: Dados Pessoais -->
                    <div class="tab-pane fade show active" id="aba-dados" role="tabpanel">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label text-muted small mb-1">E-mail Cadastrado</label>
                                <div class="form-control bg-light fw-bold" id="campoPerfilEmail">aluno@chronicmap.com</div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-muted small mb-1">Data de Nascimento</label>
                                <div class="form-control bg-light" id="campoPerfilNascimento">Não informada</div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-muted small mb-1">CEP Registrado</label>
                                <div class="form-control bg-light" id="campoPerfilCep">Não informado</div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-muted small mb-1">Status da Conta</label>
                                <div><span class="badge bg-success-subtle text-success border border-success-subtle py-2 px-3">Ativa & Verificada</span></div>
                            </div>
                        </div>
                    </div>

                    <!-- Aba 2: Trilha e Estudos -->
                    <div class="tab-pane fade" id="aba-estudos" role="tabpanel">
                        <div class="p-3 rounded border mb-3 bg-light">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h6 class="fw-bold mb-0 text-primary"><i class="bi bi-compass"></i> Trilha em Andamento</h6>
                                <span class="badge bg-primary">TI & Web</span>
                            </div>
                            <p class="text-muted small mb-2">Engenharia de Software Full Stack & Arquitetura Web</p>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: 35%;"></div>
                            </div>
                            <div class="d-flex justify-content-between text-muted small mt-1">
                                <span>35% concluído</span>
                                <span>Meta semanal: 10 horas</span>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <a href="progresso.php" class="btn btn-outline-primary btn-sm">
                                <i class="bi bi-bar-chart"></i> Detalhes do Progresso
                            </a>
                            <a href="mapas.php" class="btn btn-outline-secondary btn-sm">
                                <i class="bi bi-diagram-3"></i> Abrir Mapa Mental
                            </a>
                        </div>
                    </div>

                    <!-- Aba 3: Segurança -->
                    <div class="tab-pane fade" id="aba-seguranca" role="tabpanel">
                        <div class="d-flex justify-content-between align-items-center p-3 border rounded mb-3">
                            <div>
                                <h6 class="fw-bold mb-1">Verificação em Duas Etapas (2FA)</h6>
                                <small class="text-muted">Protege sua conta com perguntas secretas maternas e data de nascimento.</small>
                            </div>
                            <span class="badge bg-success">Habilitado</span>
                        </div>
                        <button type="button" class="btn btn-outline-danger btn-sm" id="btnSairModal">
                            <i class="bi bi-box-arrow-right"></i> Encerrar Sessão no Dispositivo
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer border-top">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>
