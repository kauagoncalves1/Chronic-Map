<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Sua Trilha de Aprendizado</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css?v=2">
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

<!-- Hero -->
<section class="hero-section">
    <div class="container text-center">
        <h1 class="hero-titulo">Sua trilha de aprendizado,<br>do seu jeito.</h1>
        <p class="hero-subtitulo">Escolha sua área, responda algumas perguntas e deixa a IA montar um plano de estudos personalizado pra você.</p>
        <a href="cadastro.php" class="btn btn-primary btn-lg px-5 py-3 me-2">
            <i class="bi bi-person-plus"></i> Começar agora
        </a>
        <a href="login.php" class="btn btn-outline-light btn-lg px-5 py-3">
            <i class="bi bi-box-arrow-in-right"></i> Já tenho conta
        </a>
    </div>
</section>

<!-- Áreas macro -->
<section class="container py-5">
    <div class="text-center mb-5">
        <h2 class="fw-bold">Escolha sua área</h2>
        <p class="text-muted">Explore uma das grandes áreas e veja por onde começar.</p>
    </div>

    <div class="row g-4" id="containerAreas">

        <div class="col-md-6 col-lg-3">
            <div class="card-area" data-area="TI">
                <div class="card-area-icone"><i class="bi bi-laptop"></i></div>
                <h5 class="fw-bold">Tecnologia da Informação</h5>
                <p class="text-muted small">Desenvolvimento, dados, cibersegurança, redes e muito mais.</p>
                <button class="btn btn-outline-primary btn-sm mt-2 btn-explorar" data-area="TI">
                    Explorar <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>

        <div class="col-md-6 col-lg-3">
            <div class="card-area" data-area="Saúde">
                <div class="card-area-icone"><i class="bi bi-heart-pulse"></i></div>
                <h5 class="fw-bold">Saúde</h5>
                <p class="text-muted small">Enfermagem, farmácia, nutrição, medicina e áreas correlatas.</p>
                <button class="btn btn-outline-primary btn-sm mt-2 btn-explorar" data-area="Saúde">
                    Explorar <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>

        <div class="col-md-6 col-lg-3">
            <div class="card-area" data-area="Administração">
                <div class="card-area-icone"><i class="bi bi-briefcase"></i></div>
                <h5 class="fw-bold">Administração</h5>
                <p class="text-muted small">Gestão, finanças, marketing, RH e empreendedorismo.</p>
                <button class="btn btn-outline-primary btn-sm mt-2 btn-explorar" data-area="Administração">
                    Explorar <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>

        <div class="col-md-6 col-lg-3">
            <div class="card-area" data-area="Engenharia">
                <div class="card-area-icone"><i class="bi bi-gear"></i></div>
                <h5 class="fw-bold">Engenharia</h5>
                <p class="text-muted small">Civil, elétrica, mecânica, produção e áreas afins.</p>
                <button class="btn btn-outline-primary btn-sm mt-2 btn-explorar" data-area="Engenharia">
                    Explorar <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>

    </div>
</section>

<!-- Modal: explorar área (preview antes de pedir cadastro) -->
<div class="modal fade" id="modalArea" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-0">
                <h5 class="modal-title fw-bold" id="modalAreaTitulo"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="modalAreaBody"></div>
            <div class="modal-footer border-0 flex-column gap-2">
                <a href="cadastro.php" class="btn btn-primary w-100">
                    <i class="bi bi-person-plus"></i> Criar conta e começar minha trilha
                </a>
                <a href="login.php" class="btn btn-outline-secondary w-100">
                    <i class="bi bi-box-arrow-in-right"></i> Já tenho conta
                </a>
            </div>
        </div>
    </div>
</div>

<!-- Como funciona -->
<section class="como-funciona py-5">
    <div class="container">
        <div class="text-center mb-5">
            <h2 class="fw-bold">Como funciona?</h2>
        </div>
        <div class="row g-4 text-center">
            <div class="col-md-3">
                <div class="passo-numero">1</div>
                <h6 class="fw-bold mt-3">Escolha sua área</h6>
                <p class="text-muted small">Selecione a grande área e depois o subsetor que mais te interessa.</p>
            </div>
            <div class="col-md-3">
                <div class="passo-numero">2</div>
                <h6 class="fw-bold mt-3">Responda o diagnóstico</h6>
                <p class="text-muted small">Perguntas rápidas sobre seu nível, tempo disponível e objetivo.</p>
            </div>
            <div class="col-md-3">
                <div class="passo-numero">3</div>
                <h6 class="fw-bold mt-3">Receba sua trilha</h6>
                <p class="text-muted small">A IA monta um plano personalizado passo a passo só pra você.</p>
            </div>
            <div class="col-md-3">
                <div class="passo-numero">4</div>
                <h6 class="fw-bold mt-3">Evolua no seu ritmo</h6>
                <p class="text-muted small">Acompanhe seu progresso, faça exercícios e ajuste o plano quando quiser.</p>
            </div>
        </div>
    </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
<script>
const subsetores = {
    'TI': [
        '<strong>Ciência de Dados</strong> — Python, estatística, machine learning e visualização de dados.',
        '<strong>Engenharia de Software</strong> — Desenvolvimento web, mobile, APIs e boas práticas.',
        '<strong>Cibersegurança</strong> — Proteção de sistemas, redes e dados.',
        '<strong>Redes e Infraestrutura</strong> — Servidores, cloud, DevOps e administração de sistemas.',
        '<strong>Inteligência Artificial</strong> — Modelos de IA, processamento de linguagem e visão computacional.'
    ],
    'Saúde': [
        '<strong>Enfermagem</strong> — Cuidados clínicos, procedimentos e saúde pública.',
        '<strong>Farmácia</strong> — Farmacologia, manipulação e atenção farmacêutica.',
        '<strong>Nutrição</strong> — Alimentação, metabolismo e saúde preventiva.',
        '<strong>Fisioterapia</strong> — Reabilitação, anatomia e técnicas terapêuticas.',
        '<strong>Saúde Mental</strong> — Psicologia, psiquiatria e bem-estar emocional.'
    ],
    'Administração': [
        '<strong>Gestão Empresarial</strong> — Estratégia, processos e liderança organizacional.',
        '<strong>Finanças</strong> — Contabilidade, investimentos e análise financeira.',
        '<strong>Marketing</strong> — Branding, mídias sociais e marketing digital.',
        '<strong>Recursos Humanos</strong> — Recrutamento, cultura organizacional e desenvolvimento de pessoas.',
        '<strong>Empreendedorismo</strong> — Startups, validação de ideias e crescimento de negócios.'
    ],
    'Engenharia': [
        '<strong>Engenharia Civil</strong> — Construção, estruturas e urbanismo.',
        '<strong>Engenharia Elétrica</strong> — Circuitos, automação e energia.',
        '<strong>Engenharia Mecânica</strong> — Termodinâmica, manufatura e projeto de máquinas.',
        '<strong>Engenharia de Produção</strong> — Logística, qualidade e gestão de operações.',
        '<strong>Engenharia Ambiental</strong> — Sustentabilidade, saneamento e gestão de recursos naturais.'
    ]
};

document.querySelectorAll('.btn-explorar').forEach(btn => {
    btn.addEventListener('click', () => {
        const area = btn.dataset.area;
        const lista = subsetores[area] || [];

        document.getElementById('modalAreaTitulo').textContent = area;
        document.getElementById('modalAreaBody').innerHTML = `
            <p class="text-muted mb-3">Alguns caminhos dentro de <strong>${area}</strong>:</p>
            <ul class="list-group list-group-flush">
                ${lista.map(item => `<li class="list-group-item border-0 ps-0">${item}</li>`).join('')}
            </ul>
            <p class="text-muted small mt-3">Crie sua conta para ver a trilha completa personalizada pra você.</p>
        `;

        new bootstrap.Modal(document.getElementById('modalArea')).show();
    });
});
</script>
</body>
</html>