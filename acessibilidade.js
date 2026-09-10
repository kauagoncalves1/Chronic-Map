/* ---------- Tema Claro/Escuro ---------- */
const botaoTema = document.getElementById('botaoTema');
const iconeTema = document.getElementById('iconeTema');

function aplicarTema(tema) {
    if (tema === 'dark') {
        document.documentElement.classList.add('tema-escuro');
        if (iconeTema) iconeTema.className = 'bi bi-sun-fill';
    } else {
        document.documentElement.classList.remove('tema-escuro');
        if (iconeTema) iconeTema.className = 'bi bi-moon-fill';
    }
    localStorage.setItem('tema', tema);
}

// Aplica o tema salvo ao carregar a página
function aplicarTema(tema) {
    if (tema === 'dark') {
        document.documentElement.classList.add('tema-escuro');
        if (iconeTema) iconeTema.className = 'bi bi-sun-fill';
        const textoTema = document.getElementById('textoTema');
        if (textoTema) textoTema.textContent = 'Modo Claro';
    } else {
        document.documentElement.classList.remove('tema-escuro');
        if (iconeTema) iconeTema.className = 'bi bi-moon-fill';
        const textoTema = document.getElementById('textoTema');
        if (textoTema) textoTema.textContent = 'Modo Escuro';
    }
    // Salva nas duas chaves pra compatibilidade com código antigo
    localStorage.setItem('tema', tema);
    localStorage.setItem('theme', tema === 'dark' ? 'dark' : 'light');
}

// Lê as duas chaves — prioriza 'tema', fallback para 'theme' (legado)
const temaSalvo = localStorage.getItem('tema') || localStorage.getItem('theme') || 'light';
aplicarTema(temaSalvo);
/* ---------- Tamanho da Fonte ---------- */
const btnAumentar = document.getElementById('btnAumentarFonte');
const btnDiminuir = document.getElementById('btnDiminuirFonte');

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