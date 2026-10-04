<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Chronic Map - Plataforma inteligente com trilhas de aprendizado personalizadas por IA para impulsionar sua carreira.">
    <title>Chronic Map - Sua Trilha de Aprendizado Personalizada com IA</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css?v=5">
    <script>
        (function() {
            var tema = localStorage.getItem('tema');
            if (tema === 'dark') document.documentElement.classList.add('tema-escuro');
            var fonte = localStorage.getItem('tamanhoFonte');
            if (fonte) document.documentElement.style.fontSize = fonte + 'px';
        })();
    </script>
</head>
<body class="pt-5">

<?php include 'menu.php'; ?>

<!-- Hero Interativo -->
<section class="hero-section">
    <div class="container text-center py-4">
        <div class="mb-3 d-inline-block">
            <span class="badge-pill-soft bg-white text-primary shadow-sm">
                <i class="bi bi-stars"></i> Diagnóstico Dinâmico de Carreira com IA
            </span>
        </div>
        <h1 class="hero-titulo hero-gradient-text">
            Sua trilha de aprendizado,<br>desenhada pro seu tempo e ritmo.
        </h1>
        <p class="hero-subtitulo">
            Chega de listas infinitas de vídeos sem direção. O Chronic Map analisa seus objetivos atuais, calcula as horas da sua rotina e gera um mapa de estudos sob medida com IA.
        </p>
        <div class="d-flex flex-wrap justify-content-center gap-3">
            <a href="cadastro.php" class="btn btn-primary btn-lg px-4 py-3">
                <i class="bi bi-lightning-charge-fill me-1"></i> Criar Trilha Personalizada
            </a>
            <a href="#simulador" class="btn btn-outline-light btn-lg px-4 py-3">
                <i class="bi bi-play-circle me-1"></i> Simular Ritmo em Tempo Real
            </a>
        </div>
    </div>
</section>

<!-- Métricas e Prova de Valor -->
<section class="container py-5">
    <div class="row g-4 text-center">
        <div class="col-6 col-md-3">
            <div class="stat-box reveal-on-scroll">
                <div class="h2 fw-bold text-primary mb-1">100%</div>
                <p class="text-muted small mb-0">Personalizado para seu perfil</p>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="stat-box reveal-on-scroll">
                <div class="h2 fw-bold text-primary mb-1">4 Áreas</div>
                <p class="text-muted small mb-0">TI, Saúde, Gestão e Engenharia</p>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="stat-box reveal-on-scroll">
                <div class="h2 fw-bold text-primary mb-1">24/7</div>
                <p class="text-muted small mb-0">Tutor de IA para tirar dúvidas</p>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="stat-box reveal-on-scroll">
                <div class="h2 fw-bold text-primary mb-1">Passo a Passo</div>
                <p class="text-muted small mb-0">Foco em marcos e conquistas práticas</p>
            </div>
        </div>
    </div>
</section>

<!-- Simulador Interativo com IA (NOVA FUNCIONALIDADE) -->
<section id="simulador" class="container py-5">
    <div class="card-glass p-4 p-md-5 reveal-on-scroll">
        <div class="row align-items-center g-4">
            <div class="col-lg-5">
                <span class="badge-pill-soft mb-2"><i class="bi bi-sliders"></i> Simulador Rápido</span>
                <h2 class="fw-bold mb-3">Descubra seu cronograma ideal de estudos</h2>
                <p class="text-muted mb-4">
                    Ajuste sua rotina e veja imediatamente a projeção de tempo e a estrutura de módulos gerada pela inteligência do sistema.
                </p>

                <form id="formSimulador" class="d-flex flex-column gap-3">
                    <div>
                        <label for="simuladorTrilha" class="form-label fw-bold">Qual é seu objetivo principal?</label>
                        <select id="simuladorTrilha" class="form-select">
                            <option value="ti-software">Engenharia de Software Full Stack (TI)</option>
                            <option value="ti-dados">Ciência de Dados & Machine Learning (TI)</option>
                            <option value="ti-cyber">Cibersegurança & Defesa Digital (TI)</option>
                            <option value="saude-clinica">Cuidados Clínicos e Suporte (Saúde)</option>
                            <option value="saude-nutricao">Nutrição Clínica & Metabolismo (Saúde)</option>
                            <option value="adm-gestao">Gestão Estratégica & Liderança Ágil (Adm)</option>
                            <option value="adm-financas">Finanças Corporativas e Valuation (Adm)</option>
                            <option value="eng-producao">Engenharia de Produção & Lean (Engenharia)</option>
                        </select>
                    </div>

                    <div>
                        <label for="simuladorNivel" class="form-label fw-bold">Qual o seu nível de contato hoje?</label>
                        <select id="simuladorNivel" class="form-select">
                            <option value="iniciante">Começando do Absoluto Zero</option>
                            <option value="intermediario">Já tenho noções básicas / estudando</option>
                            <option value="avancado">Transição acelerada / Profissional</option>
                        </select>
                    </div>

                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <label for="simuladorHoras" class="form-label fw-bold mb-0">Dedicação Semanal:</label>
                            <span class="badge bg-primary fs-6 px-3" id="displayHoras">10 horas / semana</span>
                        </div>
                        <input type="range" class="form-range" id="simuladorHoras" min="2" max="40" step="2" value="10">
                    </div>
                </form>
            </div>

            <div class="col-lg-7">
                <div class="card p-4 border-0 shadow-sm" style="background: var(--neutral-50);">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                        <div>
                            <h5 class="fw-bold mb-0 text-primary" id="previewTitulo">Carregando plano...</h5>
                            <small class="text-muted" id="previewArea">Área selecionada</small>
                        </div>
                        <div class="text-end">
                            <div class="h4 fw-bold text-success mb-0" id="previewSemanas">--</div>
                            <small class="text-muted">tempo estimado</small>
                        </div>
                    </div>

                    <div class="d-flex gap-3 mb-3 text-muted small">
                        <div><i class="bi bi-clock-history text-primary"></i> <span id="previewHorasTotais">--</span> horas totais</div>
                        <div><i class="bi bi-calendar-check text-primary"></i> <span id="previewRitmo">--</span></div>
                    </div>

                    <h6 class="fw-bold mb-2">Estrutura Sugerida pela Trilha:</h6>
                    <div class="roadmap-timeline" id="previewEtapas">
                        <!-- Gerado dinamicamente via AJAX -->
                    </div>

                    <div class="mt-4 pt-3 border-top d-flex flex-wrap gap-2 justify-content-between align-items-center">
                        <small class="text-muted">Gostou da previsão? Salve esse roteiro no seu perfil.</small>
                        <a href="cadastro.php" class="btn btn-primary btn-sm px-3">
                            <i class="bi bi-arrow-right-circle"></i> Continuar com esta Trilha
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Catálogo e Busca Instantânea de Trilhas (NOVA FUNCIONALIDADE) -->
<section class="container py-5">
    <div class="text-center mb-4">
        <h2 class="fw-bold">Explore as Trilhas Disponíveis</h2>
        <p class="text-muted">Use o filtro rápido ou digite um assunto de seu interesse.</p>
    </div>

    <!-- Barra de busca e filtros dinâmicos -->
    <div class="row justify-content-center mb-4 g-3">
        <div class="col-md-6">
            <div class="input-group">
                <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-primary"></i></span>
                <input type="text" id="campoBusca" class="form-control border-start-0" placeholder="Buscar por tema (ex: Dados, Finanças, Web, Nutrição...)">
            </div>
        </div>
        <div class="col-12 text-center">
            <div class="filter-btn-group" role="tablist">
                <button class="filter-btn active" data-categoria="todas">Todas as Áreas</button>
                <button class="filter-btn" data-categoria="TI">Tecnologia da Informação</button>
                <button class="filter-btn" data-categoria="Saúde">Saúde</button>
                <button class="filter-btn" data-categoria="Administração">Administração</button>
                <button class="filter-btn" data-categoria="Engenharia">Engenharia</button>
            </div>
        </div>
    </div>

    <!-- Grid de Trilhas atualizado via Fetch -->
    <div class="row g-4" id="gridTrilhas">
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando trilhas...</span>
            </div>
        </div>
    </div>
</section>

<!-- Como Funciona o Método Chronic Map -->
<section class="como-funciona py-5">
    <div class="container">
        <div class="text-center mb-5 reveal-on-scroll">
            <h2 class="fw-bold">Como o Chronic Map transforma seu aprendizado?</h2>
            <p class="text-muted">Quatro etapas simples para sair da estagnação e dominar novas habilidades.</p>
        </div>
        <div class="row g-4 text-center">
            <div class="col-md-3 reveal-on-scroll">
                <div class="passo-numero">1</div>
                <h6 class="fw-bold mt-3">Diagnóstico Preciso</h6>
                <p class="text-muted small">Sem testes engessados. Mapeamos seu objetivo real e quanto tempo livre você tem.</p>
            </div>
            <div class="col-md-3 reveal-on-scroll">
                <div class="passo-numero">2</div>
                <h6 class="fw-bold mt-3">Curadoria com IA</h6>
                <p class="text-muted small">A plataforma seleciona apenas os blocos que você realmente precisa aprender agora.</p>
            </div>
            <div class="col-md-3 reveal-on-scroll">
                <div class="passo-numero">3</div>
                <h6 class="fw-bold mt-3">Feedback em Tempo Real</h6>
                <p class="text-muted small">Tire dúvidas no chat com o Tutor de IA e receba revisões imediatas para cada módulo.</p>
            </div>
            <div class="col-md-3 reveal-on-scroll">
                <div class="passo-numero">4</div>
                <h6 class="fw-bold mt-3">Progressão Mensurável</h6>
                <p class="text-muted small">Veja seus mapas conceituais se completarem conforme você cumpre as metas do plano.</p>
            </div>
        </div>
    </div>
</section>

<!-- Modal: Detalhes da Trilha -->
<div class="modal fade" id="modalTrilhaDetalhes" tabindex="-1" aria-labelledby="modalTrilhaTitulo" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <div>
                    <span class="badge bg-primary-subtle text-primary mb-1" id="modalTrilhaBadge">Área</span>
                    <h5 class="modal-title fw-bold" id="modalTrilhaTitulo"></h5>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body" id="modalTrilhaCorpo">
                <!-- Conteúdo Dinâmico -->
            </div>
            <div class="modal-footer border-0 flex-column gap-2">
                <a href="cadastro.php" class="btn btn-primary w-100 py-2">
                    <i class="bi bi-rocket-takeoff-fill me-1"></i> Começar Esta Trilha Agora
                </a>
                <button type="button" class="btn btn-outline-secondary w-100" data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
<script>
// Comunicação Assíncrona com api_trilhas.php
let categoriaAtiva = 'todas';
let termoBusca = '';
let debounceTimer;

const gridTrilhas = document.getElementById('gridTrilhas');
const campoBusca = document.getElementById('campoBusca');
const botoesFiltro = document.querySelectorAll('.filter-btn');

// Elementos do Simulador
const simuladorTrilha = document.getElementById('simuladorTrilha');
const simuladorNivel = document.getElementById('simuladorNivel');
const simuladorHoras = document.getElementById('simuladorHoras');
const displayHoras = document.getElementById('displayHoras');

const previewTitulo = document.getElementById('previewTitulo');
const previewArea = document.getElementById('previewArea');
const previewSemanas = document.getElementById('previewSemanas');
const previewHorasTotais = document.getElementById('previewHorasTotais');
const previewRitmo = document.getElementById('previewRitmo');
const previewEtapas = document.getElementById('previewEtapas');

// 1. Carregamento e renderização de trilhas via Fetch
async function carregarTrilhas() {
    gridTrilhas.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Buscando trilhas...</span>
            </div>
        </div>
    `;

    try {
        const url = `api_trilhas.php?acao=listar&area=${encodeURIComponent(categoriaAtiva)}&busca=${encodeURIComponent(termoBusca)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Falha na resposta da API');
        const data = await res.json();

        if (data.sucesso && data.dados.length > 0) {
            renderizarGrid(data.dados);
        } else {
            gridTrilhas.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-search text-muted display-4"></i>
                    <h5 class="fw-bold mt-3">Nenhuma trilha encontrada</h5>
                    <p class="text-muted">Tente ajustar o termo da busca ou selecione outra área.</p>
                </div>
            `;
        }
    } catch (err) {
        gridTrilhas.innerHTML = `
            <div class="col-12 text-center py-4 text-danger">
                <i class="bi bi-exclamation-triangle fs-3"></i>
                <p class="mt-2">Não foi possível carregar as trilhas no momento. Tente recarregar a página.</p>
            </div>
        `;
    }
}

function renderizarGrid(trilhas) {
    gridTrilhas.innerHTML = trilhas.map(trilha => {
        let icone = 'bi-laptop';
        if (trilha.area === 'Saúde') icone = 'bi-heart-pulse';
        if (trilha.area === 'Administração') icone = 'bi-briefcase';
        if (trilha.area === 'Engenharia') icone = 'bi-gear';

        return `
            <div class="col-md-6 col-lg-3">
                <div class="card-area d-flex flex-column justify-content-between h-100">
                    <div>
                        <div class="card-area-icone"><i class="bi ${icone}"></i></div>
                        <span class="badge bg-light text-primary mb-2 border">${escapeHtml(trilha.area)}</span>
                        <h5 class="fw-bold">${escapeHtml(trilha.titulo)}</h5>
                        <p class="text-muted small mt-2">${escapeHtml(trilha.subtitulo)}</p>
                    </div>
                    <div class="mt-4">
                        <button class="btn btn-outline-primary btn-sm w-100 btn-abrir-detalhe" 
                            data-titulo="${escapeHtml(trilha.titulo)}"
                            data-area="${escapeHtml(trilha.area)}"
                            data-subtitulo="${escapeHtml(trilha.subtitulo)}"
                            data-horas="${trilha.horas_base}"
                            data-nivel="${escapeHtml(trilha.nivel_recomendado)}"
                            data-etapas='${JSON.stringify(trilha.etapas)}'>
                            Ver Detalhes <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    vincularBotoesDetalhes();
}

function vincularBotoesDetalhes() {
    document.querySelectorAll('.btn-abrir-detalhe').forEach(btn => {
        btn.addEventListener('click', () => {
            const titulo = btn.dataset.titulo;
            const area = btn.dataset.area;
            const subtitulo = btn.dataset.subtitulo;
            const horas = btn.dataset.horas;
            const nivel = btn.dataset.nivel;
            const etapas = JSON.parse(btn.dataset.etapas || '[]');

            document.getElementById('modalTrilhaTitulo').textContent = titulo;
            document.getElementById('modalTrilhaBadge').textContent = area;
            document.getElementById('modalTrilhaCorpo').innerHTML = `
                <p class="text-muted">${subtitulo}</p>
                <div class="d-flex gap-3 mb-3 small">
                    <span class="badge bg-primary-subtle text-primary"><i class="bi bi-clock"></i> ~${horas}h estimadas</span>
                    <span class="badge bg-secondary-subtle text-secondary"><i class="bi bi-mortarboard"></i> ${nivel}</span>
                </div>
                <h6 class="fw-bold mb-2">Módulos Estruturados:</h6>
                <ul class="list-group list-group-flush small mb-3">
                    ${etapas.map((etapa, idx) => `<li class="list-group-item px-0 border-0"><i class="bi bi-check2-circle text-primary me-2"></i> ${etapa}</li>`).join('')}
                </ul>
                <div class="p-3 bg-light rounded text-muted small">
                    O tutor com inteligência artificial adaptará estes módulos baseando-se nas respostas do seu diagnóstico de entrada.
                </div>
            `;

            new bootstrap.Modal(document.getElementById('modalTrilhaDetalhes')).show();
        });
    });
}

// 2. Simulador Dinâmico de Ritmo
async function atualizarSimulador() {
    const trilha = simuladorTrilha.value;
    const nivel = simuladorNivel.value;
    const horas = simuladorHoras.value;
    displayHoras.textContent = `${horas} horas / semana`;

    try {
        const url = `api_trilhas.php?acao=simular&trilha=${encodeURIComponent(trilha)}&nivel=${encodeURIComponent(nivel)}&horas=${horas}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();

        if (data.sucesso) {
            previewTitulo.textContent = data.trilha;
            previewArea.textContent = `Área: ${data.area}`;
            previewSemanas.textContent = `~${data.semanas_estimadas} semanas`;
            previewHorasTotais.textContent = data.horas_totais;
            previewRitmo.textContent = `${data.horas_por_semana}h semanais (${(data.horas_por_semana / 5).toFixed(1)}h/dia)`;

            previewEtapas.innerHTML = data.etapas.map((etapa, i) => `
                <div class="roadmap-node">
                    <div class="roadmap-dot">${i + 1}</div>
                    <div class="fw-semibold">${escapeHtml(etapa)}</div>
                    <small class="text-muted">Módulo planejado pela IA</small>
                </div>
            `).join('');
        }
    } catch (err) {
        console.error('Erro no simulador:', err);
    }
}

// Event Listeners dos Filtros e Busca com Debounce
campoBusca.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    termoBusca = e.target.value.trim();
    debounceTimer = setTimeout(() => {
        carregarTrilhas();
    }, 250);
});

botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
        botoesFiltro.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        categoriaAtiva = btn.dataset.categoria;
        carregarTrilhas();
    });
});

simuladorTrilha.addEventListener('change', atualizarSimulador);
simuladorNivel.addEventListener('change', atualizarSimulador);
simuladorHoras.addEventListener('input', atualizarSimulador);

function escapeHtml(text) {
    if (!text) return '';
    return text.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Inicialização
carregarTrilhas();
atualizarSimulador();
</script>
</body>
</html>
