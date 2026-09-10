<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Verificação de Segurança</title>
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
        <div class="col-md-6 col-lg-5">
            <div class="card shadow border-0">
                <div class="card-body p-4 text-center">

                    <div class="mb-4">
                        <i class="bi bi-shield-lock text-primary" style="font-size: 3rem;"></i>
                        <h3 class="fw-bold text-primary mt-2">Verificação de Segurança</h3>
                        <p class="text-muted">Confirme sua identidade para continuar.</p>
                    </div>

                    <!--
                        INTEGRAÇÃO COM O BACK-END:
                        - A pergunta deve ser sorteada pelo PHP e vir da sessão ($_SESSION['pergunta_2fa'])
                        - O action deve apontar para 2fa_processa.php
                        - Controle de tentativas deve ser feito na sessão PHP (não no JS)
                    -->
                    <form id="form2fa" action="2fa_processa.php" method="POST">
                        <input type="hidden" name="pergunta_id" id="perguntaId" value="">

                        <div class="alert alert-light border d-flex align-items-center gap-2 text-start mb-4">
                            <i class="bi bi-question-circle text-primary fs-5"></i>
                            <span id="perguntaTexto" class="fw-semibold">Carregando pergunta...</span>
                        </div>

                        <div class="mb-3 text-start">
                            <label for="resposta" class="form-label">Sua resposta</label>
                            <input type="text" name="resposta" id="resposta" class="form-control"
                                placeholder="Digite sua resposta" required autocomplete="off">
                        </div>

                        <button type="submit" class="btn btn-primary w-100 py-2 mb-3">
                            <i class="bi bi-check2-circle"></i> Confirmar
                        </button>
                    </form>

                    <div class="text-center">
                        <small class="text-muted">
                            Tentativa <span id="tentativaAtual">1</span> de 3
                        </small>
                    </div>

                    <div class="text-center mt-3">
                        <a href="index.php" class="text-decoration-none small">
                            <i class="bi bi-arrow-left"></i> Voltar para o Login
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<!-- Toast de feedback -->
<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1080;">
    <div id="toastFeedback" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body" id="toastMensagem"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="acessibilidade.js"></script>
<script>
const PERGUNTAS = [
    { id: 'mae', texto: 'Qual o nome da sua mãe?' },
    { id: 'nascimento', texto: 'Qual a data do seu nascimento? (DD/MM/AAAA)' },
    { id: 'cep', texto: 'Qual o CEP do seu endereço?' }
];

const MAX_TENTATIVAS = 3;
const CHAVE_TENTATIVAS = 'tentativas_2fa';

const perguntaTexto = document.getElementById('perguntaTexto');
const perguntaIdInput = document.getElementById('perguntaId');
const tentativaAtualEl = document.getElementById('tentativaAtual');
const form2fa = document.getElementById('form2fa');

const toastEl = document.getElementById('toastFeedback');
const toastMensagem = document.getElementById('toastMensagem');
const toast = new bootstrap.Toast(toastEl, { delay: 4000 });

function mostrarToast(mensagem, tipo = 'danger') {
    toastEl.className = `toast align-items-center text-white bg-${tipo} border-0`;
    toastMensagem.textContent = mensagem;
    toast.show();
}

// Simulação: no fluxo real, a pergunta vem do PHP via sessão
const escolhida = PERGUNTAS[Math.floor(Math.random() * PERGUNTAS.length)];
perguntaTexto.textContent = escolhida.texto;
perguntaIdInput.value = escolhida.id;

function getTentativas() {
    return parseInt(sessionStorage.getItem(CHAVE_TENTATIVAS) || '0', 10);
}

tentativaAtualEl.textContent = getTentativas() + 1;

form2fa.addEventListener('submit', function (event) {
    event.preventDefault(); // remover quando back-end estiver pronto

    const resposta = document.getElementById('resposta').value.trim();
    if (!resposta) return;

    let tentativas = getTentativas() + 1;
    sessionStorage.setItem(CHAVE_TENTATIVAS, tentativas);

    if (tentativas >= MAX_TENTATIVAS) {
        mostrarToast('3 tentativas sem sucesso! Favor realizar Login novamente.', 'danger');
        sessionStorage.removeItem(CHAVE_TENTATIVAS);
        setTimeout(() => { window.location.href = 'index.php'; }, 2500);
        return;
    }

    mostrarToast('Resposta incorreta. Tente novamente.', 'warning');
    tentativaAtualEl.textContent = tentativas + 1;
    document.getElementById('resposta').value = '';
});
</script>
</body>
</html>