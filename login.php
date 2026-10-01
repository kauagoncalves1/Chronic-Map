<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Login</title>
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

<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-6 col-lg-4">
            <div class="card shadow border-0">
                <div class="card-body p-4">
                    <div class="text-center mb-4">
                        <i class="bi bi-geo-alt-fill text-primary" style="font-size: 2.5rem;"></i>
                        <h3 class="fw-bold text-primary mt-2">Chronic Map</h3>
                        <p class="text-muted">Acesso ao Sistema</p>
                    </div>

                    <form id="formLogin" action="login_processa.php" method="POST" novalidate>
                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" name="email" id="email" class="form-control"
                                placeholder="seuemail@exemplo.com" required autocomplete="email">
                            <div class="invalid-feedback">Informe um e-mail válido.</div>
                        </div>

                        <div class="mb-3">
                            <label for="senha" class="form-label">Senha</label>
                            <div class="input-group">
                                <input type="password" name="senha" id="senha" class="form-control"
                                    placeholder="Sua senha" required autocomplete="current-password">
                                <button class="btn btn-outline-secondary" type="button" id="toggleSenha" tabindex="-1" title="Mostrar/ocultar senha">
                                    <i class="bi bi-eye" id="iconeSenha"></i>
                                </button>
                            </div>
                            <div class="invalid-feedback">Informe sua senha.</div>
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
                        <small class="text-muted">Ainda não tem conta?
                            <a href="cadastro.php" class="text-primary text-decoration-none fw-bold">Cadastre-se</a>
                        </small>
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
const toast = new bootstrap.Toast(toastEl, { delay: 4000 });

function mostrarToast(mensagem, tipo = 'danger') {
    toastEl.className = `toast align-items-center text-white bg-${tipo} border-0`;
    toastMensagem.textContent = mensagem;
    toast.show();
}

/* ---------- Olhinho de senha ---------- */
document.getElementById('toggleSenha').addEventListener('click', function () {
    const input = document.getElementById('senha');
    const icone = document.getElementById('iconeSenha');
    if (input.type === 'password') {
        input.type = 'text';
        icone.className = 'bi bi-eye-slash';
    } else {
        input.type = 'password';
        icone.className = 'bi bi-eye';
    }
});

/* ---------- Validação e simulação de login ---------- */
const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', function (event) {
    event.preventDefault(); // remover quando o back-end estiver pronto

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        mostrarToast('Preencha e-mail e senha.', 'danger');
        return;
    }

    /*
        INTEGRAÇÃO COM O BACK-END:
        - Remover o bloco de simulação abaixo
        - Deixar o form submeter normalmente para login_processa.php
        - O PHP deve validar e-mail/senha no banco, iniciar sessão e redirecionar para 2fa.php
        - O PHP deve salvar na sessão os dados necessários pro 2FA (nome da mãe, data de nascimento, CEP)
    */

    // Simulação: busca dados salvos no cadastro via localStorage
    const dadosCadastro = JSON.parse(localStorage.getItem('dadosCadastro') || '{}');

    if (dadosCadastro.email && dadosCadastro.email === email && dadosCadastro.senha === senha) {
        // Salva na sessionStorage pra o 2FA usar
        sessionStorage.setItem('usuario_2fa', JSON.stringify({
            email: dadosCadastro.email,
            nomeMaterno: dadosCadastro.nomeMaterno,
            dataNascimento: dadosCadastro.dataNascimento,
            cep: dadosCadastro.cep
        }));
        mostrarToast('Login realizado! Redirecionando para verificação...', 'success');
        setTimeout(() => { window.location.href = '2fa.php'; }, 1500);
    } else {
        mostrarToast('E-mail ou senha incorretos.', 'danger');
    }
});
</script>
</body>
</html>