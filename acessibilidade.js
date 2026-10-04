/* ---------- Chronic Map: Acessibilidade & Interatividade Universal ---------- */

// Elementos de Acessibilidade
const btnAcessibilidade = document.getElementById('btnAcessibilidade');
const menuAcessibilidade = document.getElementById('menuAcessibilidade');
const botaoTema = document.getElementById('botaoTema');
const iconeTema = document.getElementById('iconeTema');
const textoTema = document.getElementById('textoTema');
const btnAumentar = document.getElementById('btnAumentarFonte');
const btnDiminuir = document.getElementById('btnDiminuirFonte');

// Controle do Menu de Acessibilidade (A11y + Teclado)
if (btnAcessibilidade && menuAcessibilidade) {
    btnAcessibilidade.addEventListener('click', (e) => {
        e.stopPropagation();
        const aberto = menuAcessibilidade.classList.toggle('aberto');
        btnAcessibilidade.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
        if (!menuAcessibilidade.contains(e.target) && e.target !== btnAcessibilidade) {
            menuAcessibilidade.classList.remove('aberto');
            btnAcessibilidade.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuAcessibilidade.classList.contains('aberto')) {
            menuAcessibilidade.classList.remove('aberto');
            btnAcessibilidade.setAttribute('aria-expanded', 'false');
            btnAcessibilidade.focus();
        }
    });
}

// Gerenciador de Tema
function aplicarTema(tema) {
    if (tema === 'dark') {
        document.documentElement.classList.add('tema-escuro');
        if (iconeTema) iconeTema.className = 'bi bi-sun-fill';
        if (textoTema) textoTema.textContent = 'Modo Claro';
    } else {
        document.documentElement.classList.remove('tema-escuro');
        if (iconeTema) iconeTema.className = 'bi bi-moon-fill';
        if (textoTema) textoTema.textContent = 'Modo Escuro';
    }
    localStorage.setItem('tema', tema);
    localStorage.setItem('theme', tema === 'dark' ? 'dark' : 'light');
}

if (botaoTema) {
    botaoTema.addEventListener('click', () => {
        const atual = localStorage.getItem('tema') === 'dark' ? 'dark' : 'light';
        aplicarTema(atual === 'dark' ? 'light' : 'dark');
    });
}

const temaSalvo = localStorage.getItem('tema') || localStorage.getItem('theme') || 'light';
aplicarTema(temaSalvo);

// Tamanho de Fonte
let tamanhoAtual = parseFloat(localStorage.getItem('tamanhoFonte')) || 16;
document.documentElement.style.fontSize = tamanhoAtual + 'px';

if (btnAumentar) {
    btnAumentar.addEventListener('click', () => {
        if (tamanhoAtual < 22) {
            tamanhoAtual += 2;
            document.documentElement.style.fontSize = tamanhoAtual + 'px';
            localStorage.setItem('tamanhoFonte', tamanhoAtual);
        }
    });
}

if (btnDiminuir) {
    btnDiminuir.addEventListener('click', () => {
        if (tamanhoAtual > 12) {
            tamanhoAtual -= 2;
            document.documentElement.style.fontSize = tamanhoAtual + 'px';
            localStorage.setItem('tamanhoFonte', tamanhoAtual);
        }
    });
}

// Controle do Perfil de Usuário
document.addEventListener('DOMContentLoaded', () => {
    const btnPerfil = document.getElementById('btnPerfil');
    const menuPerfil = document.getElementById('menuPerfil');
    const btnLoginHeader = document.getElementById('btnLoginHeader');
    const containerPerfilUsuario = document.getElementById('containerPerfilUsuario');
    const linkAbrirModalPerfil = document.getElementById('linkAbrirModalPerfil');
    const btnSairConta = document.getElementById('btnSairConta');
    const btnSairModal = document.getElementById('btnSairModal');

    // Recupera dados da sessão ou cadastro
    const sessao2fa = JSON.parse(sessionStorage.getItem('usuario_2fa') || 'null');
    const cadastro = JSON.parse(localStorage.getItem('dadosCadastro') || 'null');
    const usuarioAtivo = sessao2fa || cadastro;

    if (usuarioAtivo) {
        if (containerPerfilUsuario) containerPerfilUsuario.classList.remove('d-none');
        if (btnLoginHeader) btnLoginHeader.classList.add('d-none');

        const email = usuarioAtivo.email || 'aluno@chronicmap.com';
        const nomeCurto = email.split('@')[0];

        const nomeHeader = document.getElementById('nomeHeaderUsuario');
        if (nomeHeader) nomeHeader.textContent = nomeCurto;

        const dropdownNome = document.getElementById('dropdownNomeUsuario');
        if (dropdownNome) dropdownNome.textContent = nomeCurto;

        const dropdownEmail = document.getElementById('dropdownEmailUsuario');
        if (dropdownEmail) dropdownEmail.textContent = email;

        const campoEmail = document.getElementById('campoPerfilEmail');
        if (campoEmail) campoEmail.textContent = email;

        const campoNasc = document.getElementById('campoPerfilNascimento');
        if (campoNasc && usuarioAtivo.dataNascimento) campoNasc.textContent = usuarioAtivo.dataNascimento;

        const campoCep = document.getElementById('campoPerfilCep');
        if (campoCep && usuarioAtivo.cep) campoCep.textContent = usuarioAtivo.cep;
    } else {
        if (containerPerfilUsuario) containerPerfilUsuario.classList.add('d-none');
        if (btnLoginHeader) btnLoginHeader.classList.remove('d-none');
    }

    if (btnPerfil && menuPerfil) {
        btnPerfil.addEventListener('click', (e) => {
            e.stopPropagation();
            if (menuAcessibilidade) menuAcessibilidade.classList.remove('aberto');
            const aberto = menuPerfil.classList.toggle('aberto');
            btnPerfil.setAttribute('aria-expanded', aberto ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
            if (!menuPerfil.contains(e.target) && e.target !== btnPerfil) {
                menuPerfil.classList.remove('aberto');
                btnPerfil.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuPerfil.classList.contains('aberto')) {
                menuPerfil.classList.remove('aberto');
                btnPerfil.setAttribute('aria-expanded', 'false');
                btnPerfil.focus();
            }
        });
    }

    if (linkAbrirModalPerfil) {
        linkAbrirModalPerfil.addEventListener('click', () => {
            if (menuPerfil) menuPerfil.classList.remove('aberto');
            const modalEl = document.getElementById('modalPerfilUsuario');
            if (modalEl && typeof bootstrap !== 'undefined') {
                const modalInstance = new bootstrap.Modal(modalEl);
                modalInstance.show();
            }
        });
    }

    function deslogar() {
        sessionStorage.removeItem('usuario_2fa');
        localStorage.removeItem('dadosCadastro');
        window.location.href = 'login.php';
    }

    if (btnSairConta) btnSairConta.addEventListener('click', deslogar);
    if (btnSairModal) btnSairModal.addEventListener('click', deslogar);

    // Scroll reveal
    const elementosAnimaveis = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window && elementosAnimaveis.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        elementosAnimaveis.forEach(el => observer.observe(el));
    } else {
        elementosAnimaveis.forEach(el => el.classList.add('is-visible'));
    }
});