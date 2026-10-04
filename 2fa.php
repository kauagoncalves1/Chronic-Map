<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Verificação de Segurança</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css?v=6">
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

<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <div class="card shadow border-0">
                <div class="card-body p-4 text-center">

                    <div class="mb-4">
                        <i class="bi bi-shield-lock text-primary" style="font-size: 3rem;"></i>
                        <h3 class="fw-bold text-primary mt-2">Verificação de Segurança</h3>
                        <p class="text-muted">Confirme sua identidade para continuar.</p>
                    </div>

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

                    <div class="text-center mb-3">
                        <small class="text-muted">
                            Tentativa <span id="tentativaAtual">1</span> de 3
                        </small>
                    </div>

                    <div class="text-center">
                        <a href="login.php" class="text-decoration-none small">
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
const toastEl = document.getElementById('toastFeedback');
const toastMensagem = document.getElementById('toastMensagem');
const toast = new bootstrap.Toast(toastEl, { delay: 3500 });

function mostrarToast(mensagem, tipo = 'danger') {
    toastEl.className = `toast align-items-center text-white bg-${tipo} border-0`;
    toastMensagem.textContent = mensagem;
    toast.show();
}

const MAX_TENTATIVAS = 3;
const CHAVE_TENTATIVAS = 'tentativas_2fa';

const perguntaTexto = document.getElementById('perguntaTexto');
const perguntaIdInput = document.getElementById('perguntaId');
const tentativaAtualEl = document.getElementById('tentativaAtual');
const form2fa = document.getElementById('form2fa');

const usuario = JSON.parse(sessionStorage.getItem('usuario_2fa') || '{}');

const PERGUNTAS = [
    {
        id: 'mae',
        texto: 'Qual o nome da sua mãe?',
        resposta: (u) => (u.nomeMaterno || '').toLowerCase().trim()
    },
    {
        id: 'nascimento',
        texto: 'Qual a data do seu nascimento? (DD/MM/AAAA)',
        resposta: (u) => (u.dataNascimento || '').trim()
    },
    {
        id: 'cep',
        texto: 'Qual o CEP do seu endereço?',
        resposta: (u) => (u.cep || '').replace(/\D/g, '')
    }
];

const escolhida = PERGUNTAS[Math.floor(Math.random() * PERGUNTAS.length)];
perguntaTexto.textContent = escolhida.texto;
perguntaIdInput.value = escolhida.id;

function getTentativas() {
    return parseInt(sessionStorage.getItem(CHAVE_TENTATIVAS) || '0', 10);
}

tentativaAtualEl.textContent = getTentativas() + 1;

form2fa.addEventListener('submit', function (event) {
    event.preventDefault();

    const respostaDigitada = document.getElementById('resposta').value.trim().toLowerCase();
    if (!respostaDigitada) return;

    const respostaEsperada = escolhida.resposta(usuario);

    const respostaNormalizada = escolhida.id === 'cep'
        ? respostaDigitada.replace(/\D/g, '')
        : respostaDigitada;

    let tentativas = getTentativas() + 1;
    sessionStorage.setItem(CHAVE_TENTATIVAS, tentativas);

    if (respostaNormalizada === respostaEsperada) {
        sessionStorage.removeItem(CHAVE_TENTATIVAS);
        sessionStorage.removeItem('usuario_2fa');
        mostrarToast('Identidade confirmada! Entrando...', 'success');
        setTimeout(() => { window.location.href = 'dashboard.php'; }, 1500);
        return;
    }

    if (tentativas >= MAX_TENTATIVAS) {
        mostrarToast('3 tentativas sem sucesso! Favor realizar Login novamente.', 'danger');
        sessionStorage.removeItem(CHAVE_TENTATIVAS);
        sessionStorage.removeItem('usuario_2fa');
        setTimeout(() => { window.location.href = 'login.php'; }, 2500);
        return;
    }

    mostrarToast('Resposta incorreta. Tente novamente.', 'warning');
    tentativaAtualEl.textContent = tentativas + 1;
    document.getElementById('resposta').value = '';
});
</script>
</body>
</html>
