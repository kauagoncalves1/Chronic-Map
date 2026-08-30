<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Cadastro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
</head>
<body class="py-5">

<div class="position-absolute top-0 end-0 p-3">
    <button id="btnThemeToggle" class="btn btn-outline-primary btn-sm">🌙 Escuro</button>
</div>

<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
            <div class="card shadow border-0">
                <div class="card-body p-4">
                    <div class="text-center mb-4">
                        <h3 class="fw-bold text-primary">Criar Conta</h3>
                        <p class="text-muted">Junte-se ao Chronic Map</p>
                    </div>

                    <form id="formCadastro" action="cadastro_processa.php" method="POST" novalidate>
                        <!-- Nome Completo -->
                        <div class="mb-3">
                            <label for="nome" class="form-label">Nome Completo</label>
                            <input type="text" name="nome" id="nome" class="form-control" placeholder="Seu nome completo" minlength="15" maxlength="80" required>
                            <div class="invalid-feedback">Nome deve ter entre 15 e 80 caracteres, só letras.</div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                                <input type="date" name="data_nascimento" id="dataNascimento" class="form-control" required>
                                <div class="invalid-feedback">Informe uma data válida.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="sexo" class="form-label">Sexo</label>
                                <select name="sexo" id="sexo" class="form-select" required>
                                    <option value="" selected disabled>Selecione</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="outro">Outro</option>
                                    <option value="nao_informar">Prefiro não informar</option>
                                </select>
                                <div class="invalid-feedback">Selecione uma opção.</div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="nomeMaterno" class="form-label">Nome Materno</label>
                            <input type="text" name="nome_materno" id="nomeMaterno" class="form-control" placeholder="Nome completo da sua mãe" required>
                            <div class="invalid-feedback">Campo obrigatório.</div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="cpf" class="form-label">CPF</label>
                                <input type="text" name="cpf" id="cpf" class="form-control" placeholder="000.000.000-00" maxlength="14" required inputmode="numeric" pattern="[0-9.\-]*">
                                <div class="invalid-feedback">CPF inválido.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="email" class="form-label">E-mail</label>
                                <input type="email" name="email" id="email" class="form-control" placeholder="seuemail@exemplo.com" required>
                                <div class="invalid-feedback">Informe um e-mail válido.</div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="telefoneCelular" class="form-label">Telefone Celular</label>
                                <input type="text" name="telefone_celular" id="telefoneCelular" class="form-control" placeholder="(+55)XX XXXXX-XXXX" required>
                                <div class="invalid-feedback">Preencha o telefone completo.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="telefoneFixo" class="form-label">Telefone Fixo</label>
                                <input type="text" name="telefone_fixo" id="telefoneFixo" class="form-control" placeholder="(+55)XX XXXXX-XXXX" required>
                                <div class="invalid-feedback">Preencha o telefone completo.</div>
                            </div>
                        </div>

                        <hr class="my-4">
                        <h6 class="fw-bold text-muted mb-3">Endereço</h6>

                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label for="cep" class="form-label">CEP</label>
                                <input type="text" name="cep" id="cep" class="form-control" placeholder="00000-000" maxlength="9" required>
                                <div class="form-text" id="statusCep"></div>
                            </div>
                            <div class="col-md-8 mb-3">
                                <label for="endereco" class="form-label">Endereço</label>
                                <input type="text" name="endereco" id="endereco" class="form-control" placeholder="Rua Exemplo" required readonly>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-3 mb-3">
                                <label for="numero" class="form-label">Número</label>
                                <input type="text" name="numero" id="numero" class="form-control" placeholder="000" required>
                            </div>
                            <div class="col-md-5 mb-3">
                                <label for="complemento" class="form-label">Complemento</label>
                                <input type="text" name="complemento" id="complemento" class="form-control" placeholder="Apto, bloco, etc. (opcional)">
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="bairro" class="form-label">Bairro</label>
                                <input type="text" name="bairro" id="bairro" class="form-control" required readonly>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-8 mb-3">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input type="text" name="cidade" id="cidade" class="form-control" required readonly>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="uf" class="form-label">UF</label>
                                <input type="text" name="uf" id="uf" class="form-control" maxlength="2" required readonly>
                            </div>
                        </div>

                        <hr class="my-4">
                        <h6 class="fw-bold text-muted mb-3">Acesso</h6>

                        <div class="mb-3">
                            <label for="login" class="form-label">Login</label>
                            <input type="text" name="login" id="login" class="form-control" placeholder="Escolha um nome de usuário" minlength="3" maxlength="30" required>
                            <div class="invalid-feedback">Login deve ter entre 3 e 30 caracteres.</div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="senha" class="form-label">Senha</label>
                                <input type="password" name="senha" id="senha" class="form-control" placeholder="Digite sua senha" required>
                                <ul class="list-unstyled small mt-2 mb-0" id="checklistSenha">
                                    <li id="regraTamanho" class="text-muted">○ Mínimo de 8 caracteres</li>
                                    <li id="regraMaiuscula" class="text-muted">○ Uma letra maiúscula</li>
                                    <li id="regraMinuscula" class="text-muted">○ Uma letra minúscula</li>
                                    <li id="regraNumero" class="text-muted">○ Um número</li>
                                    <li id="regraEspecial" class="text-muted">○ Um caractere especial</li>
                                </ul>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="confirmaSenha" class="form-label">Confirmação da Senha</label>
                                <input type="password" name="confirma_senha" id="confirmaSenha" class="form-control" placeholder="Repita a senha" required>
                                <div class="invalid-feedback">As senhas não conferem.</div>
                            </div>
                        </div>

                        <div class="d-flex gap-2 mt-3">
                            <button type="submit" class="btn btn-primary w-100 py-2">Enviar</button>
                            <button type="reset" id="btnLimpar" class="btn btn-outline-secondary w-100 py-2">Limpar Tela</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1080;">
    <div id="toastFeedback" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body" id="toastMensagem"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
const toastEl = document.getElementById('toastFeedback');
const toastMensagem = document.getElementById('toastMensagem');
const toast = new bootstrap.Toast(toastEl, { delay: 4000 });

function mostrarToast(mensagem, tipo = 'danger') {
    toastEl.className = `toast align-items-center text-white bg-${tipo} border-0`;
    toastMensagem.textContent = mensagem;
    toast.show();
}

function marcarCampo(input, valido) {
    if (valido) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}

document.getElementById('cep').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 8);
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    this.value = v;
});

const inputCep = document.getElementById('cep');
const statusCep = document.getElementById('statusCep');
const camposEndereco = ['endereco', 'bairro', 'cidade', 'uf'].map(id => document.getElementById(id));

inputCep.addEventListener('blur', async () => {
    const cepLimpo = inputCep.value.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    statusCep.textContent = 'Buscando endereço...';
    statusCep.className = 'form-text text-muted';

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        if (!resposta.ok) throw new Error('Falha na requisição');
        const dados = await resposta.json();

        if (dados.erro) throw new Error('CEP não encontrado');

        document.getElementById('endereco').value = dados.logradouro || '';
        document.getElementById('bairro').value = dados.bairro || '';
        document.getElementById('cidade').value = dados.localidade || '';
        document.getElementById('uf').value = dados.uf || '';

        camposEndereco.forEach(campo => campo.readOnly = true);
        marcarCampo(inputCep, true);

        statusCep.textContent = 'Endereço encontrado';
        statusCep.className = 'form-text text-success';

    } catch (erro) {
        ativarPreenchimentoManual();
        marcarCampo(inputCep, false);
        statusCep.textContent = 'Endereço não encontrado';
        statusCep.className = 'form-text text-warning';
    }
});

function ativarPreenchimentoManual() {
    camposEndereco.forEach(campo => {
        campo.readOnly = false;
        campo.value = '';
    });
    document.getElementById('endereco').focus();
}

function validarCPF(cpfFormatado) {
    const cpf = cpfFormatado.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

const inputCpf = document.getElementById('cpf');
inputCpf.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.value = v;

    const numeros = v.replace(/\D/g, '');
    if (numeros.length === 11) {
        marcarCampo(this, validarCPF(v));
    } else {
        this.classList.remove('is-valid', 'is-invalid');
    }
});

function configurarMascaraTelefone(campoId) {
    const input = document.getElementById(campoId);
    if (!input) return;

    let digitos = '';

    function formatar() {
        let resultado = '(+55) ';
        if (digitos.length > 0) resultado += digitos.substring(0, 2);
        if (digitos.length > 2) resultado += ' ' + digitos.substring(2, 7);
        if (digitos.length > 7) resultado += '-' + digitos.substring(7);
        input.value = resultado;

        if (digitos.length >= 10) {
            marcarCampo(input, true);
        } else if (digitos.length > 0) {
            marcarCampo(input, false);
        } else {
            input.classList.remove('is-valid', 'is-invalid');
        }
    }

    input.addEventListener('keydown', function (evento) {
        if (evento.key === 'Backspace') {
            digitos = digitos.slice(0, -1);
            formatar();
            evento.preventDefault();
        }
    });

    input.addEventListener('beforeinput', function (evento) {
        evento.preventDefault();
        if (evento.data && /^[0-9]$/.test(evento.data) && digitos.length < 11) {
            digitos += evento.data;
            formatar();
        }
    });

    input.getDigitos = () => digitos;
}

configurarMascaraTelefone('telefoneCelular');
configurarMascaraTelefone('telefoneFixo');

const inputNome = document.getElementById('nome');
inputNome.addEventListener('input', function () {
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{15,80}$/;
    if (this.value.trim().length === 0) {
        this.classList.remove('is-valid', 'is-invalid');
        return;
    }
    marcarCampo(this, regexNome.test(this.value.trim()));
});

const inputLogin = document.getElementById('login');
inputLogin.addEventListener('input', function () {
    if (this.value.trim().length === 0) {
        this.classList.remove('is-valid', 'is-invalid');
        return;
    }
    const tamanhoOk = this.value.trim().length >= 3 && this.value.trim().length <= 30;
    marcarCampo(this, tamanhoOk);
});

const inputSenha = document.getElementById('senha');
const inputConfirmaSenha = document.getElementById('confirmaSenha');

const regrasSenha = {
    regraTamanho: (s) => s.length >= 8,
    regraMaiuscula: (s) => /[A-Z]/.test(s),
    regraMinuscula: (s) => /[a-z]/.test(s),
    regraNumero: (s) => /\d/.test(s),
    regraEspecial: (s) => /[^A-Za-z0-9]/.test(s)
};

function atualizarChecklistSenha(senha) {
    let todasOk = true;

    for (const [id, testeFn] of Object.entries(regrasSenha)) {
        const item = document.getElementById(id);
        const ok = testeFn(senha);
        if (ok) {
            item.className = 'text-success';
            item.textContent = item.textContent.replace('○', '✓');
        } else {
            item.className = 'text-muted';
            item.textContent = item.textContent.replace('✓', '○');
            todasOk = false;
        }
    }
    return todasOk;
}

inputSenha.addEventListener('input', function () {
    const senhaValida = atualizarChecklistSenha(this.value);

    if (this.value.length === 0) {
        this.classList.remove('is-valid', 'is-invalid');
    } else {
        marcarCampo(this, senhaValida);
    }

    if (inputConfirmaSenha.value.length > 0) {
        marcarCampo(inputConfirmaSenha, inputConfirmaSenha.value === this.value);
    }
});

inputConfirmaSenha.addEventListener('input', function () {
    if (this.value.length === 0) {
        this.classList.remove('is-valid', 'is-invalid');
        return;
    }
    marcarCampo(this, this.value === inputSenha.value);
});

const form = document.getElementById('formCadastro');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const erros = [];
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{15,80}$/;

    if (!regexNome.test(inputNome.value.trim())) {
        marcarCampo(inputNome, false);
        erros.push('Nome deve ter entre 15 e 80 caracteres, apenas letras.');
    }

    if (!validarCPF(inputCpf.value)) {
        marcarCampo(inputCpf, false);
        erros.push('CPF inválido.');
    }

    ['telefoneCelular', 'telefoneFixo'].forEach(id => {
        const campo = document.getElementById(id);
        const digitos = campo.getDigitos ? campo.getDigitos() : '';
        if (digitos.length < 10) {
            marcarCampo(campo, false);
            erros.push('Preencha o telefone completo (DDD + número).');
        }
    });

    if (inputLogin.value.trim().length < 3 || inputLogin.value.trim().length > 30) {
        marcarCampo(inputLogin, false);
        erros.push('Login deve ter entre 3 e 30 caracteres.');
    }

    const senhaValida = atualizarChecklistSenha(inputSenha.value);
    if (!senhaValida) {
        marcarCampo(inputSenha, false);
        erros.push('Senha não atende a todos os requisitos.');
    }

    if (inputSenha.value !== inputConfirmaSenha.value || inputConfirmaSenha.value === '') {
        marcarCampo(inputConfirmaSenha, false);
        erros.push('As senhas não conferem.');
    }

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
    }

    if (erros.length > 0 || !form.checkValidity()) {
        mostrarToast(erros[0] || 'Verifique os campos destacados em vermelho.', 'danger');
        return;
    }
    const loginUsuario = document.getElementById('login').value.trim();
    localStorage.setItem('usuario_nome', loginUsuario || 'Estudante');
    
    mostrarToast('Cadastro validado! Redirecionando...', 'success');

    setTimeout(() => {
        window.location.href = 'dashboard.php';
    }, 1500);
});

document.getElementById('btnLimpar').addEventListener('click', () => {
    form.classList.remove('was-validated');
    camposEndereco.forEach(campo => campo.readOnly = true);
    statusCep.textContent = '';

    form.querySelectorAll('.is-valid, .is-invalid').forEach(campo => {
        campo.classList.remove('is-valid', 'is-invalid');
    });

    Object.keys(regrasSenha).forEach(id => {
        const item = document.getElementById(id);
        item.className = 'text-muted';
        item.textContent = item.textContent.replace('✓', '○');
    });
});

const toggleBtn = document.getElementById('btnThemeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);

if (toggleBtn) {
    toggleBtn.textContent = currentTheme === 'dark' ? '☀️ Claro' : '🌙 Escuro';
    
    toggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleBtn.textContent = newTheme === 'dark' ? '☀️ Claro' : '🌙 Escuro';
    });
}
</script>
</body>
</html>