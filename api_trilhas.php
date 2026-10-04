<?php
header('Content-Type: application/json; charset=utf-8');

// Dados das trilhas e competências do Chronic Map
$trilhas = [
    [
        'id' => 'ti-software',
        'area' => 'TI',
        'titulo' => 'Engenharia de Software Full Stack',
        'subtitulo' => 'Desenvolvimento de APIs, interfaces reativas e arquitetura de software moderna.',
        'horas_base' => 180,
        'nivel_recomendado' => 'Iniciante ao Avançado',
        'etapas' => ['Fundamentos da Web & Git', 'Back-end Moderno & Bancos de Dados', 'Arquitetura de APIs REST & Segurança', 'Deploy & Monitoramento Cloud']
    ],
    [
        'id' => 'ti-dados',
        'area' => 'TI',
        'titulo' => 'Ciência de Dados e Machine Learning',
        'subtitulo' => 'Python científico, estatística inferencial, pipeline de ETL e modelos preditivos.',
        'horas_base' => 220,
        'nivel_recomendado' => 'Intermediário',
        'etapas' => ['Python para Análise & Pandas', 'Estatística e Modelagem de Dados', 'Machine Learning com Scikit-Learn', 'Deep Learning e Produção']
    ],
    [
        'id' => 'ti-cyber',
        'area' => 'TI',
        'titulo' => 'Cibersegurança & Defesa Digital',
        'subtitulo' => 'Análise de vulnerabilidades, segurança em redes e conformidade de proteção de dados.',
        'horas_base' => 160,
        'nivel_recomendado' => 'Iniciante ao Intermediário',
        'etapas' => ['Fundamentos de Redes TCP/IP', 'Análise de Riscos & Hardening', 'Ethical Hacking e Pentest Básico', 'Políticas de Segurança e Resposta a Incidentes']
    ],
    [
        'id' => 'saude-clinica',
        'area' => 'Saúde',
        'titulo' => 'Cuidados Clínicos e Suporte Primário',
        'subtitulo' => 'Boas práticas assistenciais, protocolos de triagem e biossegurança.',
        'horas_base' => 140,
        'nivel_recomendado' => 'Iniciante',
        'etapas' => ['Biossegurança e Paramentação', 'Sinais Vitais e Exames Preliminares', 'Farmacologia de Suporte', 'Comunicação Humanizada']
    ],
    [
        'id' => 'saude-nutricao',
        'area' => 'Saúde',
        'titulo' => 'Nutrição Clínica & Metabolismo',
        'subtitulo' => 'Avaliação antropométrica, planejamento alimentar e dietoterapia funcional.',
        'horas_base' => 150,
        'nivel_recomendado' => 'Todos os níveis',
        'etapas' => ['Bioquímica e Macro/Micronutrientes', 'Avaliação Nutricional Aplicada', 'Prescrição Dietética', 'Nutrição em Doenças Crônicas']
    ],
    [
        'id' => 'adm-gestao',
        'area' => 'Administração',
        'titulo' => 'Gestão Estratégica e Liderança Ágil',
        'subtitulo' => 'Frameworks modernos (Scrum/Kanban), KPIs, tomada de decisão e OKRs.',
        'horas_base' => 120,
        'nivel_recomendado' => 'Todos os níveis',
        'etapas' => ['Fundamentos de Estratégia Corporativa', 'Gestão Ágil de Projetos', 'Métricas e OKRs de Desempenho', 'Liderança e Cultura Organizacional']
    ],
    [
        'id' => 'adm-financas',
        'area' => 'Administração',
        'titulo' => 'Finanças Corporativas e Valuation',
        'subtitulo' => 'Planejamento orçamentário, análise de balanços, viabilidade e fluxo de caixa.',
        'horas_base' => 170,
        'nivel_recomendado' => 'Intermediário',
        'etapas' => ['Demonstrações Financeiras (DRE e Balanço)', 'Análise de Custo e Lucratividade', 'Planejamento Orçamentário', 'Modelagem Financeira e Valuation']
    ],
    [
        'id' => 'eng-producao',
        'area' => 'Engenharia',
        'titulo' => 'Engenharia de Produção & Lean',
        'subtitulo' => 'Otimização de processos, supply chain, Six Sigma e eliminação de gargalos.',
        'horas_base' => 190,
        'nivel_recomendado' => 'Intermediário',
        'etapas' => ['Mapeamento de Fluxo de Valor (VSM)', 'Controle Estatístico de Processos', 'Logística Integrada e Estoques', 'Automação Industrial e Indústria 4.0']
    ]
];

$acao = isset($_GET['acao']) ? sanitizeInput($_GET['acao']) : 'listar';

function sanitizeInput($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

if ($acao === 'listar') {
    $busca = isset($_GET['busca']) ? mb_strtolower(sanitizeInput($_GET['busca'])) : '';
    $areaFiltro = isset($_GET['area']) ? sanitizeInput($_GET['area']) : '';

    $resultado = array_filter($trilhas, function($t) use ($busca, $areaFiltro) {
        $combinaArea = empty($areaFiltro) || $areaFiltro === 'todas' || strcasecmp($t['area'], $areaFiltro) === 0;
        $combinaBusca = empty($busca) || 
            str_contains(mb_strtolower($t['titulo']), $busca) || 
            str_contains(mb_strtolower($t['subtitulo']), $busca) ||
            str_contains(mb_strtolower($t['area']), $busca);

        return $combinaArea && $combinaBusca;
    });

    echo json_encode([
        'sucesso' => true,
        'total' => count($resultado),
        'dados' => array_values($resultado)
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($acao === 'simular') {
    $horasSemanais = max(2, min(50, intval($_GET['horas'] ?? 10)));
    $trilhaId = sanitizeInput($_GET['trilha'] ?? 'ti-software');
    $nivelAtual = sanitizeInput($_GET['nivel'] ?? 'iniciante');

    $trilhaSelecionada = null;
    foreach ($trilhas as $t) {
        if ($t['id'] === $trilhaId) {
            $trilhaSelecionada = $t;
            break;
        }
    }

    if (!$trilhaSelecionada) {
        $trilhaSelecionada = $trilhas[0];
    }

    // Fator de ajuste de tempo pelo nível
    $fator = match($nivelAtual) {
        'intermediario' => 0.75,
        'avancado' => 0.5,
        default => 1.0,
    };

    $horasTotaisCalculadas = ceil($trilhaSelecionada['horas_base'] * $fator);
    $semanasNecessarias = ceil($horasTotaisCalculadas / $horasSemanais);

    echo json_encode([
        'sucesso' => true,
        'trilha' => $trilhaSelecionada['titulo'],
        'area' => $trilhaSelecionada['area'],
        'horas_totais' => $horasTotaisCalculadas,
        'semanas_estimadas' => $semanasNecessarias,
        'horas_por_semana' => $horasSemanais,
        'etapas' => $trilhaSelecionada['etapas']
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['sucesso' => false, 'erro' => 'Ação não reconhecida.'], JSON_UNESCAPED_UNICODE);
