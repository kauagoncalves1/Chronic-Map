/**
 * Conteudo do blog (dicas de estudo). Fica em arquivo local de proposito: o blog e publico,
 * nao depende do back-end e carrega rapido. Para adicionar um artigo, inclua um item em POSTS
 * (slug unico, sem acento/espaco). Blocos: "p" paragrafo, "h2" subtitulo, "ul" lista.
 */
export type Bloco = { t: "p" | "h2"; texto: string } | { t: "ul"; itens: string[] };

export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: "Rotina" | "Técnicas" | "Memória" | "Metas" | "Programação";
  minutos: number;
  data: string; // AAAA-MM-DD
  conteudo: Bloco[];
};

export const POSTS: Post[] = [
  {
    slug: "rotina-de-estudos-que-cabe-na-sua-vida",
    titulo: "Como montar uma rotina de estudos que cabe na sua vida",
    resumo: "Sem horas sobrando? Veja como encaixar o estudo em blocos curtos e manter o ritmo semana após semana.",
    categoria: "Rotina",
    minutos: 4,
    data: "2026-10-12",
    conteudo: [
      { t: "p", texto: "A maioria das pessoas desiste de estudar não por falta de vontade, mas porque o plano exigia mais tempo do que a vida permite. A rotina que funciona é a que você consegue repetir, mesmo em semanas corridas." },
      { t: "h2", texto: "1. Comece pelo tempo real, não pelo ideal" },
      { t: "p", texto: "Olhe sua última semana e marque os momentos em que você estava livre de verdade: o intervalo do almoço, o trajeto, a noite depois do jantar. Some esses blocos. Esse é o seu tempo de estudo, e é com ele que a trilha deve ser montada." },
      { t: "h2", texto: "2. Prefira blocos curtos e frequentes" },
      { t: "p", texto: "Quatro sessões de 30 minutos tendem a render mais do que uma maratona de duas horas no domingo, porque o cérebro precisa de repetição e descanso para fixar o que viu." },
      { t: "h2", texto: "3. Marque horário fixo" },
      { t: "ul", itens: ["Escolha dias e horários e trate como um compromisso.", "Deixe o material aberto na véspera para reduzir o esforço de começar.", "Se perder uma sessão, retome na próxima sem compensar em dobro."] },
      { t: "h2", texto: "4. Acompanhe o progresso" },
      { t: "p", texto: "Ver as etapas concluídas dá sensação de avanço e ajuda a manter a motivação. É para isso que a sua trilha mostra o progresso: pequenas vitórias visíveis mantêm o hábito vivo." },
    ],
  },
  {
    slug: "pomodoro-sem-virar-refem-do-timer",
    titulo: "Pomodoro: como usar a técnica sem virar refém do timer",
    resumo: "25 minutos de foco e 5 de pausa. Entenda quando a técnica ajuda e como adaptá-la ao seu jeito de estudar.",
    categoria: "Técnicas",
    minutos: 3,
    data: "2026-10-19",
    conteudo: [
      { t: "p", texto: "A técnica Pomodoro propõe ciclos de 25 minutos de foco total, seguidos de uma pausa curta de 5 minutos. A cada quatro ciclos, faz-se uma pausa maior." },
      { t: "h2", texto: "Por que ela funciona" },
      { t: "p", texto: "Dividir o estudo em blocos pequenos reduz a procrastinação, porque começar fica menos assustador. Saber que existe uma pausa logo adiante também ajuda a resistir à vontade de checar o celular." },
      { t: "h2", texto: "Como aplicar" },
      { t: "ul", itens: ["Escolha uma única tarefa para o ciclo.", "Silencie notificações e deixe o celular longe.", "Ao tocar o alarme, levante, beba água, alongue. Evite redes sociais na pausa.", "Anote quantos ciclos você completou para enxergar a evolução."] },
      { t: "h2", texto: "Adapte ao seu ritmo" },
      { t: "p", texto: "Os 25 minutos são uma sugestão, não uma regra. Para leituras densas ou programação, alguns estudantes preferem ciclos de 40 a 50 minutos. Se você está em pleno estado de concentração, não precisa interromper só porque o timer tocou." },
    ],
  },
  {
    slug: "recuperacao-ativa-pare-de-reler",
    titulo: "Recuperação ativa: pare de reler, comece a se testar",
    resumo: "Reler dá a sensação de que você sabe. Testar a si mesmo mostra o que você realmente aprendeu.",
    categoria: "Técnicas",
    minutos: 4,
    data: "2026-10-26",
    conteudo: [
      { t: "p", texto: "Reler o material e grifar trechos parece produtivo, mas costuma criar uma ilusão de domínio: como o texto está na sua frente, tudo parece familiar. A recuperação ativa inverte isso, pois você tenta lembrar da informação antes de olhar a resposta." },
      { t: "h2", texto: "Como praticar" },
      { t: "ul", itens: ["Feche o material e escreva tudo o que lembra sobre o tema.", "Transforme os tópicos em perguntas e responda sem consultar.", "Explique o conteúdo em voz alta, como se ensinasse alguém.", "Faça os exercícios da etapa antes de rever a teoria."] },
      { t: "h2", texto: "Os erros são úteis" },
      { t: "p", texto: "Errar durante o teste não é fracasso: mostra exatamente onde estão as lacunas. Depois de conferir a resposta, volte ao ponto fraco e tente de novo mais tarde. É esse esforço de lembrar que fortalece a memória." },
      { t: "h2", texto: "Use o tutor a seu favor" },
      { t: "p", texto: "Quando travar em um exercício, tente primeiro por conta própria e só depois peça ajuda ao tutor. Assim, a explicação encaixa em uma dúvida real e fica mais fácil de lembrar." },
    ],
  },
  {
    slug: "repeticao-espacada-para-memorizar",
    titulo: "Repetição espaçada: revise na hora certa para memorizar de verdade",
    resumo: "Revisar em intervalos crescentes combate o esquecimento e economiza tempo de estudo.",
    categoria: "Memória",
    minutos: 4,
    data: "2026-11-02",
    conteudo: [
      { t: "p", texto: "Quanto mais tempo passa depois de estudar, mais esquecemos, e essa queda é mais rápida logo nos primeiros dias. A repetição espaçada aproveita isso: você revisa o conteúdo pouco antes de esquecê-lo e aumenta o intervalo a cada revisão." },
      { t: "h2", texto: "Um calendário simples" },
      { t: "ul", itens: ["Primeira revisão: no dia seguinte.", "Segunda revisão: cerca de uma semana depois.", "Terceira revisão: cerca de um mês depois.", "Se você errar, volte a um intervalo menor."] },
      { t: "h2", texto: "Como colocar em prática" },
      { t: "p", texto: "Crie cartões de perguntas e respostas curtos, um conceito por cartão, e revise os mais difíceis com mais frequência. Pode ser com papel, com um aplicativo de flashcards ou em uma planilha." },
      { t: "h2", texto: "Revisar é diferente de reler" },
      { t: "p", texto: "Combine a repetição espaçada com a recuperação ativa: em cada revisão, tente responder de memória antes de conferir. Dez minutos bem feitos valem mais do que uma hora relendo." },
    ],
  },
  {
    slug: "metas-de-estudo-que-voce-consegue-cumprir",
    titulo: "Metas de estudo que você consegue cumprir",
    resumo: "Transforme um objetivo grande em passos pequenos, claros e com prazo.",
    categoria: "Metas",
    minutos: 3,
    data: "2026-11-05",
    conteudo: [
      { t: "p", texto: "\"Aprender programação\" é um desejo, não uma meta. Para sair do papel, o objetivo precisa ser específico, mensurável e ter um prazo realista." },
      { t: "h2", texto: "Do sonho ao passo seguinte" },
      { t: "ul", itens: ["Objetivo: conseguir meu primeiro estágio na área.", "Marco: publicar um projeto de portfólio em três meses.", "Etapa: concluir o módulo de JavaScript neste mês.", "Tarefa: fazer três exercícios nesta semana."] },
      { t: "h2", texto: "Regras práticas" },
      { t: "p", texto: "Defina poucas metas por vez. Escreva o motivo por trás de cada uma, porque ele ajuda nos dias de desânimo. Comemore cada marco concluído e revise a meta se a sua rotina mudar, pois ajustar o plano faz parte do processo." },
      { t: "h2", texto: "Deixe a IA ajudar" },
      { t: "p", texto: "No questionário do Chronic Map você informa seu objetivo, nível e tempo disponível, e a trilha já nasce dividida em etapas com marcos. Se o plano ficar pesado demais, refaça o questionário com um tempo semanal mais realista." },
    ],
  },
  {
    slug: "aprender-programacao-do-tutorial-ao-projeto",
    titulo: "Aprender programação: do tutorial ao projeto",
    resumo: "Sair do ciclo de assistir aulas e começar a construir coisas é o que realmente acelera o aprendizado.",
    categoria: "Programação",
    minutos: 5,
    data: "2026-11-07",
    conteudo: [
      { t: "p", texto: "Muita gente fica presa ao chamado ciclo do tutorial: assiste a aula, copia o código, tudo funciona, mas na hora de fazer algo sozinho dá branco. Para quebrar o ciclo, é preciso construir coisas sem o passo a passo." },
      { t: "h2", texto: "Comece pequeno" },
      { t: "p", texto: "Escolha um projeto que caiba em um fim de semana: uma lista de tarefas, uma calculadora, a página de um negócio local. Projetos pequenos terminam, e terminar ensina mais do que começar dez projetos grandes." },
      { t: "h2", texto: "Como lidar com erros" },
      { t: "ul", itens: ["Leia a mensagem de erro com calma: ela costuma indicar o arquivo e a linha.", "Isole o problema: comente trechos até achar o que quebra.", "Pesquise a mensagem e consulte a documentação oficial.", "Se continuar travado, descreva o problema para o tutor e diga o que já tentou."] },
      { t: "h2", texto: "Mostre o que você fez" },
      { t: "p", texto: "Publique o código em um repositório e escreva um README curto explicando o projeto. Isso fixa o que você aprendeu e, com o tempo, vira um portfólio que mostra sua evolução." },
    ],
  },
];

export const postPorSlug = (slug: string) => POSTS.find((p) => p.slug === slug);
export const postsRecentes = (n: number, excluir?: string) =>
  [...POSTS].filter((p) => p.slug !== excluir).sort((a, b) => b.data.localeCompare(a.data)).slice(0, n);
export const formataData = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
