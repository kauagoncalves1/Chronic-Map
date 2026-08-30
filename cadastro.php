<!DOCTYPE html>
<html lang="pt-br">
<head>
    <?php include 'menu.php'; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Cadastro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body class="pt-5">

<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6">
            <div class="card shadow border-0">
                <div class="card-body p-4">
                    <div class="text-center mb-4">
                        <h3 class="fw-bold text-primary"><i class="bi bi-person-lines-fill"></i> Criar Conta</h3>
                        <p class="text-muted">Junte-se ao Chronic Map</p>
                    </div>

                    <form id="formCadastro" action="cadastro_processa.php" method="POST" novalidate>

                        <div class="mb-3">
                            <label for="nome" class="form-label">Nome Completo</label>
                            <input type="text" name="nome" id="nome" class="form-control" placeholder="Seu nome completo" minlength="15" maxlength="80" required>
                            <div class="invalid-feedback">Nome deve ter entre 15 e 80 caracteres alfabéticos.</div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                                <input type="date" name="data_nascimento" id="dataNascimento" class="form-control" required>
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
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="nomeMaterno" class="form-label">Nome Materno</label>
                            <input type="text" name="nome_materno" id="nomeMaterno" class="form-control" placeholder="Nome completo da sua mãe" required>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="cpf" class="form-label">CPF</label>
                                <input type="text" name="cpf" id="cpf" class="form-control" placeholder="000.000.000-00" maxlength="14" required>
                                <div class="invalid-feedback">CPF inválido.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="email" class="form-label">E-mail</label>
                                <input type="email" name="email" id="email" class="form-control" placeholder="seuemail@exemplo.com" required>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="telefoneCelular" class="form-label">Telefone Celular</label>
                                <input type="text" name="telefone_celular" id="telefoneCelular" class="form-control" placeholder="(+55)XX XXXXX-XXXX" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="telefoneFixo" class="form-label">Telefone Fixo</label>
                                <input type="text" name="telefone_fixo" id="telefoneFixo" class="form-control" placeholder="(+55)XX XXXXX-XXXX" required>
                            </div>
                        </div>

                        <hr class="my-4">
                        <h6 class="fw-bold text-muted mb-3"><i class="bi bi-geo-alt"></i> Endereço</h6>

                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <label for="cep" class="form-label">CEP</label>
                                <input type="text" name="cep" id="cep" class="form-control" placeholder="00000-000" maxlength="9" required>
                                <div class="form-text" id="statusCep"></div>
                            </div>
                            <div class="col-md-8 mb-3">
                                <label for="endereco" class="form-label">Endereço</label>
                                <input type="text" name="endereco" id="endereco" class="form-control" required readonly>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-3 mb-3">
                                <label for="numero" class="form-label">Número</label>
                                <input type="text" name="numero" id="numero" class="form-control" placeholder="000" required>
                            </div>
                            <div class="col-md-5 mb-3">
                                <label for="complemento" class="form-label">Complemento</label>
                                <input type="text" name="complemento" id="complemento" class="form-control" placeholder="Apto, bloco (opcional)">
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
                        <h6 class="fw-bold text-muted mb-3"><i class="bi bi-lock"></i> Acesso</h6>

                        <div class="mb-3">
                            <label for="login" class="form-label">Login</label>
                            <input type="text" name="login" id="login" class="form-control" placeholder="Exatamente 6 letras" maxlength="6" required>
                            <div class="invalid-feedback">O login deve ter exatamente 6 letras.</div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="senha" class="form-label">Senha</label>
                                <input type="password" name="senha" id="senha" class="form-control" placeholder="Exatamente 8 letras" maxlength="8" required>
                                <div class="invalid-feedback">A senha deve ter exatamente 8 letras.</div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="confirmaSenha" class="form-label">Confirmação da Senha</label>
                                <input type="password" name="confirma_senha" id="confirmaSenha" class="form-control" placeholder="Repita a senha" maxlength="8" required>
                                <div class="invalid-feedback">As senhas não conferem.</div>
                            </div>
                        </div>

                        <div class="d-flex gap-2 mt-3">
                            <button type="submit" class="btn btn-primary w-100 py-2"><i class="bi bi-send"></i> Enviar</button>
                            <button type="reset" id="btnLimpar" class="btn btn-outline-secondary w-100 py-2"><i class="bi bi-trash"></i> Limpar Tela</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>

<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1080;">
    <div id="toastFeedback" class="toast align-items-center border-0 text-white" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body" id="toastMensagem"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
    // Função utilitária para pintar a borda do input de verde (válido) ou vermelho (inválido)
    function marcarCampo(input, valido) {
        if (valido) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }

    // Exibe a mensagem flutuante (Toast)
    const toastEl = document.getElementById('toastFeedback');
    const toastMensagem = document.getElementById('toastMensagem');
    const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    function mostrarToast(mensagem, tipo = 'bg-danger') {
        toastEl.className = `toast align-items-center border-0 text-white ${tipo}`;
        toastMensagem.textContent = mensagem;
        toast.show();
    }

    // --- ACESSIBILIDADE E TEMA --- //
    // Controle do Modo Escuro
    const botaoTema = document.getElementById('botaoTema');
    const iconeTema = document.getElementById('iconeTema');
    
    function aplicarTema(tema) {
        if (tema === 'dark') {
            document.documentElement.classList.add('tema-escuro');
            iconeTema.className = 'bi bi-sun-fill';
        } else {
            document.documentElement.classList.remove('tema-escuro');
            iconeTema.className = 'bi bi-moon-stars-fill';
        }
        localStorage.setItem('tema', tema);
    }
    aplicarTema(localStorage.getItem('tema') || 'light');
    
    botaoTema.addEventListener('click', () => {
        aplicarTema(document.documentElement.classList.contains('tema-escuro') ? 'light' : 'dark');
    });

    // Controle de Tamanho da Fonte
    let tamanhoFonte = parseInt(localStorage.getItem('fonte_tamanho')) || 16;
    function alterarFonte(valor) {
        tamanhoFonte += valor;
        if(tamanhoFonte < 12) tamanhoFonte = 12;
        if(tamanhoFonte > 24) tamanhoFonte = 24;
        document.documentElement.style.fontSize = tamanhoFonte + 'px';
        localStorage.setItem('fonte_tamanho', tamanhoFonte);
    }
    alterarFonte(0); // Aplica a fonte salva ao iniciar
    document.getElementById('btnAumentarFonte').addEventListener('click', () => alterarFonte(2));
    document.getElementById('btnDiminuirFonte').addEventListener('click', () => alterarFonte(-2));


    // --- VALIDAÇÕES DE CAMPOS E MÁSCARAS --- //

    // Validação de Nome (15 a 80 caracteres)
    document.getElementById('nome').addEventListener('input', function () {
        marcarCampo(this, /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{15,80}$/.test(this.value.trim()));
    });

    // Validação e Máscara do CPF (Seu código original mantido)
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let soma = 0, resto;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf.charAt(10));
    }

    document.getElementById('cpf').addEventListener('input', function () {
        let v = this.value.replace(/\D/g, '').slice(0, 11);
        v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        this.value = v;
        if (v.replace(/\D/g, '').length === 11) marcarCampo(this, validarCPF(v));
    });

    // Máscara de Telefone: (+55)XX XXXXX-XXXX
    function configurarMascaraTelefone(campoId) {
        document.getElementById(campoId).addEventListener('input', function () {
            let v = this.value.replace(/\D/g, '');
            if(v.startsWith('55')) v = v.substring(2);
            v = v.substring(0, 11); 
            
            let formatado = '';
            if(v.length > 0) formatado = '(+55)' + v.substring(0,2);
            if(v.length > 2) formatado += ' ' + v.substring(2,7);
            if(v.length > 7) formatado += '-' + v.substring(7,11);
            
            this.value = formatado;
            marcarCampo(this, v.length >= 10);
        });
    }
    configurarMascaraTelefone('telefoneCelular');
    configurarMascaraTelefone('telefoneFixo');

    // Validação de Credenciais (Regras do Edital: Exatamente 6 e 8 caracteres alfabéticos)
    const regexLetras = /^[A-Za-z]+$/;
    
    document.getElementById('login').addEventListener('input', function () {
        marcarCampo(this, this.value.length === 6 && regexLetras.test(this.value));
    });

    document.getElementById('senha').addEventListener('input', function () {
        marcarCampo(this, this.value.length === 8 && regexLetras.test(this.value));
        const conf = document.getElementById('confirmaSenha');
        if(conf.value) marcarCampo(conf, this.value === conf.value);
    });

    document.getElementById('confirmaSenha').addEventListener('input', function () {
        marcarCampo(this, this.value === document.getElementById('senha').value && this.value.length === 8);
    });

    // --- INTEGRAÇÃO VIACEP (Seu código original mantido) --- //
    const inputCep = document.getElementById('cep');
    const statusCep = document.getElementById('statusCep');
    const camposEndereco = ['endereco', 'bairro', 'cidade', 'uf'].map(id => document.getElementById(id));

    inputCep.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
    });

    inputCep.addEventListener('blur', async () => {
        const cepLimpo = inputCep.value.replace(/\D/g, '');
        if (cepLimpo.length !== 8) return;

        statusCep.textContent = 'Buscando...';
        statusCep.className = 'form-text text-muted';

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const dados = await resposta.json();
            if (dados.erro) throw new Error();

            document.getElementById('endereco').value = dados.logradouro || '';
            document.getElementById('bairro').value = dados.bairro || '';
            document.getElementById('cidade').value = dados.localidade || '';
            document.getElementById('uf').value = dados.uf || '';

            camposEndereco.forEach(campo => campo.readOnly = true);
            marcarCampo(inputCep, true);
            statusCep.textContent = 'Endereço encontrado';
            statusCep.className = 'form-text text-success';
        } catch (erro) {
            camposEndereco.forEach(campo => { campo.readOnly = false; campo.value = ''; });
            marcarCampo(inputCep, false);
            statusCep.textContent = 'CEP não encontrado. Preencha manualmente.';
            statusCep.className = 'form-text text-warning';
        }
    });

    // --- ENVIO DO FORMULÁRIO --- //
    document.getElementById('formCadastro').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio para verificação de erros no Front-end

        const login = document.getElementById('login').value;
        const senha = document.getElementById('senha').value;
        const confSenha = document.getElementById('confirmaSenha').value;
        let erros = [];

        if (login.length !== 6 || !regexLetras.test(login)) erros.push('O login deve ter exatamente 6 letras.');
        if (senha.length !== 8 || !regexLetras.test(senha)) erros.push('A senha deve ter exatamente 8 letras.');
        if (senha !== confSenha) erros.push('As senhas não conferem.');

        if (erros.length > 0) {
            mostrarToast(erros[0]);
        } else {
            mostrarToast('Cadastro validado com sucesso! Redirecionando...', 'bg-success');
            // Quando a conexão com o PHP for feita, basta descomentar a linha abaixo:
            // this.submit(); 
        }
    });

    // Limpa os estados visuais (verdes e vermelhos) ao resetar o formulário
    document.getElementById('btnLimpar').addEventListener('click', () => {
        document.querySelectorAll('.is-valid, .is-invalid').forEach(campo => {
            campo.classList.remove('is-valid', 'is-invalid');
        });
        statusCep.textContent = '';
        camposEndereco.forEach(campo => campo.readOnly = true);
    });
</script>
</body>
</html>