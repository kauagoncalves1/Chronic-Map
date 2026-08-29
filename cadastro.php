<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chronic Map - Cadastro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light py-5">

<div class="container py-4">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card shadow border-0">
                <div class="card-body p-4">
                    <div class="text-center mb-4">
                        <h3 class="fw-bold text-primary">Criar Conta</h3>
                        <p class="text-muted">Junte-se ao Chronic Map</p>
                    </div>

        <form id="formCadastro" action="cadastro_processa.php" method="POST" novalidate>

                <!--nome completo-->
                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome Completo</label>
                        <input type="text" name="nome" id="nome" class="form-control"
                            placeholder="Seu nome completo" minlength="15" maxlength="80" required>
                        <div class="invalid-feedback">Nome deve ter entre 15 e 80 Caracteres.</div>
                    </div>
                    <div class="row">

                <!-- Data Nascimento -->
                    <div class="col-md-6 mb-3">
                        <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                        <input type="date" name="data_nascimento" id="dataNascimento" class="form-control" required>
                        <div class="invalid-feedback">Informe uma data válida.</div>
                    </div>

                <!--Sexo -->
                    <div class="col-md-6 mb-3">
                     <label for="sexo" class="form-label">Sexo</label>
                        <select name="sexo" id="sexo" class="form-select" required>
                            <option value="" selected disabled>Selecione</opition>
                            <option value="feminino">Feminino</option>
                            <option value="masculino">Masculino</option>
                            <option value="outro">Outro</option>
                            <option value="nao_informar">Prefiro não informar</option>
                        </select>
                        <div class="invalid-feedback"> Selecione uma opçãp.</div>
                    </div>
                </div>

                <!-- Nome materno -->
                    <div class="mb-3">
                        <label for="nomeMaterno" class="form-label">Nome Materno</label>
                        <input type="text" name="nome_materno" id="nomeMaterno" class="form-control"
                            placeholder="Nome completo da sua mãe" required>
                        <div class="invalid-feedback">Campo obrigatório.</div>
                    </div>

                <div class="row">

                <!-- CPF -->
                    <div class="col-md-6 mb-3">
                        <label for="cpf" class="form-label">CPF</label>
                        <input type="text" name="cpf" id="cpf" class="form-control"
                            placeholder="000.000.000-00" maxlength="14" required
                            inputmode="numeric" pattern="[0-9.\-]*">
                        <div class="invalid-feedback">CPF inválido.</div>
                    </div>

                <!-- E-mail -->
                    <div class="col-md-6 mb-3">
                        <label for="email" class="form-label">E-mail</label>
                        <input type="email" name="email" id="email" class="form-control"
                            placeholder="seuemail@exemplo.com" required>
                        <div class="invalid-feedback">Informe um e-mail válido.</div>
                    </div>
                </div>
                <div class="row">

                <!-- Telefone celular -->
                <div class="col-md-6 mb-3">
                    <label for="telefoneCelular" class="form-label">Telefone Celular</label>
                    <input type="text" name="telefone_celular" id="telefoneCelular" class="form-control"
                        placeholder="(+55)99-99999999" required>
                    <div class="invalid-feedback">Formato esperado: (+55)XX-XXXXXXXX</div>
                </div>

                <!-- Telefone fixo -->
                <div class="col-md-6 mb-3">
                    <label for="telefoneFixo" class="form-label">Telefone Fixo</label>
                    <input type="text" name="telefone_fixo" id="telefoneFixo" class="form-control"
                        placeholder="(+55)XX-XXXXXXXX" required>
                    <div class="invalid-feedback">Formato esperado: (+55)XX-XXXXXXXX</div>
                </div>
            
            <hr class="my-4">
            <h6 class="fw-bold text-muted mb-3">Endereço</h6>
            <div class="row">
                <!-- CEP -->
                <div class="col-md-4 mb-3">
                    <label for="cep" class="form-label">CEP</label>
                    <input type="text" name="cep" id="cep" class="form-control"
                        placeholder="00000-000" maxlength="9" required>
                    <div class="form-text" id="statusCep"></div>
                </div>

                <!-- Endereço (rua) -->
                <div class="col-md-8 mb-3">
                    <label for="endereco" class="form-label">Endereço</label>
                    <input type="text" name="endereco" id="endereco" class="form-control"
                        placeholder="Rua Exemplo" required readonly>
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
                <input type="text" name="login" id="login" class="form-control"
                    placeholder="6 letras, ex: joaosr" maxlength="6" required>
                <div class="invalid-feedback">Login deve ter exatamente 6 caracteres alfabéticos.</div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="senha" class="form-label">Senha</label>
                    <input type="password" name="senha" id="senha" class="form-control"
                        placeholder="8 caracteres alfabéticos" maxlength="8" required>
                    <div class="invalid-feedback">Senha deve ter exatamente 8 caracteres alfabéticos.</div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="confirmaSenha" class="form-label">Confirmação da Senha</label>
                    <input type="password" name="confirma_senha" id="confirmaSenha" class="form-control"
                        placeholder="Repita a senha" maxlength="8" required>
                    <div class="invalid-feedback">As senhas não conferem.</div>
                </div>
            </div>

            <div class="d-flex gap-2 mt-3">
                <button type="submit" class="btn btn-primary w-100 py-2">Enviar</button>
                <button type="reset" id="btnLimpar" class="btn btn-outline-secondary w-100 py-2">Limpar Tela</button>
            </div>
        </form>