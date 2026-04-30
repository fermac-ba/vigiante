import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Limpar fatores existentes e reinserir todos
await conn.execute('DELETE FROM eixos_fatores');
console.log('Fatores removidos');

// Buscar IDs dos eixos
const [eixosRows] = await conn.execute('SELECT id, number FROM eixos_tematicos ORDER BY number');
const eixoIdMap = {};
for (const row of eixosRows) eixoIdMap[row.number] = row.id;
console.log('IDs dos eixos:', JSON.stringify(eixoIdMap));

const fatoresPorEixo = {
  1: [
    'Desemprego e subemprego estrutural',
    'Informalidade e ausência de proteção trabalhista',
    'Trabalho infantil e exploração de jovens',
    'Baixa renda e endividamento das famílias',
    'Ausência de economia solidária e cooperativismo',
    'Falta de acesso a crédito e microcrédito',
    'Insegurança alimentar e nutricional',
    'Dependência de programas de transferência de renda',
    'Ausência de agricultura familiar e hortas comunitárias',
    'Falta de formação profissional e qualificação',
    'Discriminação no mercado de trabalho (raça, gênero, território)',
    'Ausência de feiras e mercados locais',
    'Exploração por atravessadores na cadeia produtiva',
    'Falta de infraestrutura para empreendimentos locais',
    'Desvalorização do trabalho doméstico e de cuidado',
    'Ausência de políticas de geração de renda no território',
    'Migração forçada por falta de oportunidades',
    'Trabalho análogo à escravidão',
    'Ausência de espaços de comercialização comunitária',
    'Falta de acesso a tecnologias produtivas',
  ],
  2: [
    'Mortalidade infantil evitável',
    'Mortalidade materna',
    'Doenças crônicas não transmissíveis sem controle',
    'Doenças infecciosas e parasitárias endêmicas',
    'Falta de acesso à Atenção Primária à Saúde',
    'Ausência de saneamento básico (água, esgoto, lixo)',
    'Contaminação de água e solo',
    'Exposição a agrotóxicos e poluentes',
    'Violência urbana e homicídios',
    'Acidentes de trânsito',
    'Saúde mental: depressão, ansiedade e suicídio',
    'Uso e abuso de álcool e outras drogas',
    'Falta de medicamentos e insumos na rede pública',
    'Ausência de especialidades médicas no território',
    'Mortalidade por causas externas (violência)',
    'Desnutrição e obesidade infantil',
    'Ausência de vigilância epidemiológica local',
    'Falta de cobertura vacinal',
    'Condições precárias de moradia e saúde',
    'Ausência de saúde bucal na atenção básica',
    'Mortalidade prematura por doenças evitáveis',
  ],
  3: [
    'Violência doméstica e feminicídio',
    'Violência sexual e estupro',
    'Racismo estrutural e institucional',
    'Discriminação por orientação sexual e identidade de gênero',
    'Violência contra crianças e adolescentes',
    'Violência contra idosos',
    'Exploração sexual de crianças e adolescentes',
    'Trabalho infantil doméstico',
    'Ausência de equipamentos de proteção social (CRAS, CREAS)',
    'Falta de acesso a serviços de saúde para mulheres',
    'Ausência de políticas de saúde da população negra',
    'Violência policial e encarceramento em massa',
    'Falta de acesso à justiça e ao sistema judiciário',
    'Discriminação no acesso a serviços públicos',
    'Ausência de espaços seguros para mulheres e LGBTQIA+',
    'Gravidez na adolescência',
    'Falta de educação sexual nas escolas',
    'Ausência de serviços de saúde mental para vítimas de violência',
    'Invisibilidade de povos e comunidades tradicionais',
    'Falta de acesso a documentação civil',
    'Ausência de políticas de proteção a refugiados e migrantes',
  ],
  4: [
    'Desmatamento e degradação ambiental',
    'Contaminação de rios, lagos e nascentes',
    'Perda de biodiversidade local',
    'Conflitos fundiários e grilagem de terra',
    'Ausência de regularização fundiária',
    'Falta de moradia digna e habitação precária',
    'Ocupações irregulares em áreas de risco',
    'Ausência de áreas verdes e espaços de lazer',
    'Queimadas e incêndios florestais',
    'Erosão do solo e assoreamento de rios',
    'Falta de coleta e destinação adequada de resíduos sólidos',
    'Ausência de políticas de adaptação às mudanças climáticas',
    'Vulnerabilidade a desastres naturais (enchentes, deslizamentos)',
    'Falta de acesso à terra para agricultura familiar',
    'Expulsão de comunidades tradicionais de seus territórios',
    'Ausência de gestão comunitária de recursos naturais',
    'Falta de acesso à água potável',
    'Ausência de saneamento rural',
    'Monocultura e dependência de agroquímicos',
    'Falta de assistência técnica para agricultores familiares',
  ],
  5: [
    'Falta de acesso à moradia digna',
    'Ausência de infraestrutura urbana (pavimentação, iluminação)',
    'Falta de transporte público de qualidade',
    'Ausência de equipamentos públicos (escolas, UBS, CRAS)',
    'Falta de acesso à internet e tecnologia',
    'Ausência de espaços culturais e de lazer',
    'Falta de creches e educação infantil',
    'Ausência de escolas de ensino médio no território',
    'Evasão escolar e analfabetismo',
    'Falta de acesso à educação superior e técnica',
    'Ausência de bibliotecas e centros comunitários',
    'Falta de acesso a esportes e atividades físicas',
    'Ausência de políticas de juventude',
    'Falta de segurança pública efetiva',
    'Ausência de iluminação pública',
    'Falta de acesso a serviços bancários e financeiros',
    'Ausência de correios e serviços de entrega',
    'Falta de acesso a serviços de saúde especializados',
    'Ausência de políticas de habitação popular',
    'Falta de acesso à justiça e defensoria pública',
  ],
  6: [
    'Ausência de participação popular nas decisões públicas',
    'Falta de acesso à informação sobre políticas públicas',
    'Ausência de conselhos comunitários ativos',
    'Falta de representação política do território',
    'Ausência de mecanismos de controle social',
    'Falta de acesso a meios de comunicação comunitária',
    'Ausência de rádios e TVs comunitárias',
    'Falta de formação política e cidadã',
    'Ausência de organizações comunitárias fortes',
    'Falta de acesso a editais e financiamentos públicos',
    'Ausência de políticas de cultura e identidade local',
    'Falta de reconhecimento de saberes tradicionais',
    'Ausência de espaços de memória e história local',
    'Falta de acesso a serviços de assistência jurídica',
    'Ausência de políticas de comunicação popular',
    'Falta de acesso a tecnologias de comunicação',
    'Ausência de articulação entre movimentos sociais',
    'Falta de formação de lideranças comunitárias',
    'Ausência de políticas de educação popular',
    'Falta de acesso a processos eleitorais e democráticos',
  ],
};

let total = 0;
for (const [eixoNum, fatores] of Object.entries(fatoresPorEixo)) {
  const eixoId = eixoIdMap[parseInt(eixoNum)];
  if (!eixoId) { console.log(`Eixo ${eixoNum} não encontrado!`); continue; }
  for (const nome of fatores) {
    await conn.execute('INSERT INTO eixos_fatores (eixoId, name, active) VALUES (?, ?, 1)', [eixoId, nome]);
    total++;
  }
  console.log(`Eixo ${eixoNum}: ${fatores.length} fatores OK`);
}

const [verify] = await conn.execute('SELECT COUNT(*) as cnt FROM eixos_fatores');
console.log(`\nTotal inserido: ${total} | Total no banco: ${verify[0].cnt}`);
await conn.end();
