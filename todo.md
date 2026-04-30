# Plataforma de Pesquisa Participativa com IA - TODO

## Fase 1: Schema e Arquitetura Base
- [x] Schema: tabela users com roles (pesquisador_popular, facilitador, gestor)
- [x] Schema: tabela projects (projetos de pesquisa)
- [x] Schema: tabela research_cycles (ciclos de pesquisa)
- [x] Schema: tabela field_entries (coletas em campo: texto, audio, foto, geolocalizacao)
- [x] Schema: tabela transcriptions (transcricoes de audio com segmentos)
- [x] Schema: tabela ai_analyses (analises de IA: codigos tematicos, sentimentos, entidades)
- [x] Schema: tabela monitoring_indicators (indicadores de monitoramento)
- [x] Schema: tabela epidemiological_data (dados epidemiologicos importados)
- [x] Schema: tabela action_plans (planos de incidencia politica)
- [x] Schema: tabela action_actors (atores mapeados nos planos)
- [x] Schema: tabela notifications (notificacoes)
- [x] Migracao do banco de dados

## Fase 2: Autenticacao e Layout Base
- [x] Perfis de acesso: pesquisador_popular, facilitador, gestor com permissoes distintas
- [x] Layout base com DashboardLayout adaptado para acessibilidade
- [x] Navegacao lateral com icones ilustrativos e linguagem simples
- [x] Pagina inicial com acesso guiado por perfil
- [x] Alto contraste e tipografia acessivel (index.css)
- [x] Pagina de gerenciamento de usuarios (gestor)

## Fase 3: Coleta de Dados em Campo
- [x] Formulario de coleta com fluxo guiado passo a passo
- [x] Registro de narrativas em texto
- [x] Upload de fotos com preview
- [x] Gravacao e upload de audio (webm/mp3)
- [x] Captura de geolocalizacao (coordenadas GPS)
- [x] Marcacao em mapa (ponto e poligono)
- [x] Service Worker para funcionamento offline (IndexedDB)
- [x] Sincronizacao automatica ao reconectar ao Wi-Fi
- [x] Indicador visual de status offline/online

## Fase 4: Transcricao e Analise com IA
- [x] Transcricao automatizada com Whisper (portugues brasileiro)
- [x] Exibicao de segmentos com timestamps
- [x] Interface de revisao manual das transcricoes
- [x] Analise de narrativas: sugestao de codigos tematicos via LLM
- [x] Analise de sentimentos das narrativas
- [x] Extracao de entidades (pessoas, lugares, conceitos)
- [x] Modelagem de topicos
- [x] Interface de validacao humana das analises de IA
- [x] Nuvem de palavras interativa

## Fase 5: Dashboard e Dados Epidemiologicos
- [x] Dashboard por perfil (pesquisador, facilitador, gestor)
- [x] Indicadores de resultado, processo e aprendizagem
- [x] Graficos de serie temporal (recharts)
- [x] Mapa de calor georreferenciado
- [x] Importacao de CSV e JSON (dados epidemiologicos)
- [x] Convergencia de dados importados com dados coletados
- [x] Visualizacao integrada no dashboard

## Fase 6: Incidencia Politica, Notificacoes e Relatorios
- [x] Modulo de planos de acao colaborativos
- [x] Mapeamento de atores com papeis e estrategias
- [x] Indicadores de monitoramento dos planos
- [x] Notificacoes automaticas: novos dados coletados
- [x] Notificacoes automaticas: ciclo de pesquisa concluido
- [x] Notificacoes automaticas: indicadores atingem limiares
- [x] Exportacao de relatorios em PDF
- [x] Relatorio de diagnostico situacional integrado

## Fase 7: Acessibilidade e Testes
- [x] Revisao de alto contraste em todas as telas
- [x] Icones ilustrativos em todos os fluxos
- [x] Linguagem simples em todos os textos da interface
- [x] Testes Vitest: autenticacao e perfis
- [x] Testes Vitest: coleta de dados
- [x] Testes Vitest: analise de IA
- [x] Testes Vitest: notificacoes
- [x] Checkpoint final

## Módulo de Cartografia Social com ODS (Agenda 2030)

- [x] Schema: tabela ods (17 ODS com numero, titulo, descricao, cor oficial)
- [x] Schema: tabela ods_factors (fatores/palavras-chave por ODS)
- [x] Schema: tabela social_mapping_sessions (sessoes de cartografia por projeto/territorio)
- [x] Schema: tabela social_mapping_entries (registros de fator com georreferenciamento, risco e importancia)
- [x] Seed: 17 ODS com fatores pre-cadastrados em portugues
- [x] Router tRPC: listar todos os ODS
- [x] Router tRPC: listar fatores por ODS
- [x] Router tRPC: CRUD de sessoes de cartografia social
- [x] Router tRPC: CRUD de registros de fator georreferenciado
- [x] Pagina SocialMapping.tsx com formulario guiado passo a passo
- [x] Selecao de ODS com icones, numeros e cores oficiais da ONU
- [x] Listagem dinamica de fatores ao selecionar ODS
- [x] Campo de nome do territorio e monitor
- [x] Campo de caracterizacao do grupo focal (texto livre)
- [x] Selecao de classificacao de risco (Ameaca, Resiliencia, Vulnerabilidade)
- [x] Escala de importancia de 0 a 10 com slider visual
- [x] Georreferenciamento do fator no mapa (clique ou GPS automatico)
- [x] Mapa com todos os fatores da sessao coloridos por tipo de risco
- [x] Navegacao entre fatores dentro da sessao (proximo/anterior)
- [x] Resumo da sessao com todos os fatores registrados e mapa
- [x] Integracao na sidebar do PlatformLayout
- [x] Rota /social-mapping no App.tsx
- [x] Testes Vitest para o modulo de cartografia social

## Correção Crítica: NotFoundError Android WebView

- [x] Substituir todos os toast() do Sonner por sistema de notificação in-tree (sem portal, sem flushSync) em todas as páginas
- [x] Adicionar NotificationProvider dentro do PortalProvider no App.tsx - sistema in-tree sem portal sem flushSync

## Correções Módulo Cartografia Social (Android WebView)

- [x] Corrigir seed dos ODS: seedOdsIfEmpty agora verifica por numero e insere apenas os ODS faltantes
- [x] Icones dos ODS: confirmado que usam emoji (iconEmoji) - sem SVG externo
- [x] Corrigir erro removeChild: todos os portais Radix (select, popover, tooltip, hover-card, context-menu, menubar, drawer) agora usam PortalContext com container React gerenciado

## Módulo Cartografia Social - Fase 2

- [x] Schema: adicionar campo notes (text, nullable) em social_mapping_entries para observacao livre por fator
- [x] Schema: adicionar campo status (enum: active/closed) em social_mapping_sessions
- [x] Schema: adicionar campo closedAt (timestamp, nullable) em social_mapping_sessions
- [x] Migracao: pnpm db:push para aplicar as alteracoes de schema
- [x] Router tRPC: mutation closeSession para encerrar sessao (status=closed, closedAt=now)
- [x] Router tRPC: query getSessionSummary com contagem por ODS e por tipo de risco
- [x] Router tRPC: mutation updateEntryNotes para salvar observacao livre
- [x] Router tRPC: query getProjectMapData com todos os fatores de todas as sessoes de um projeto
- [x] Router tRPC: procedure generateSessionPdf que retorna relatorio em Markdown para download
- [x] UI: campo de observacao livre (textarea) no formulario de registro de fator no SocialMappingSession
- [x] UI: exibir observacao no card de fator no resumo da sessao
- [x] UI: botao Encerrar Sessao com confirmacao no SocialMappingSession
- [x] UI: tela de resumo consolidado apos encerramento com contagem por ODS e por tipo de risco
- [x] UI: botao Exportar Relatorio no resumo da sessao (formato Markdown)
- [x] UI: pagina SocialMappingMap.tsx com todos os fatores de um projeto em um unico mapa
- [x] UI: filtros no mapa agregado por ODS e tipo de risco
- [x] UI: marcadores coloridos por ODS ou por tipo de risco no mapa agregado
- [x] UI: rota /projetos/:id/cartografia-mapa no App.tsx
- [x] UI: botao Mapa Agregado na pagina SocialMapping.tsx
- [x] Testes Vitest: 22 testes passando incluindo modulo de cartografia social

## Módulo Cartografia Social - Fase 3

- [x] Exportacao PDF via window.print() com CSS @media print no resumo da sessao
- [x] Estilos de impressao: ocultar sidebar, botoes e navegacao, exibir apenas conteudo do relatorio
- [x] Compatibilidade com Android WebView (sem biblioteca externa)
- [x] Edicao posterior de observacoes por fator na lista de resumo da sessao
- [x] Botao de edicao inline no card do fator com textarea e salvar via updateEntryNotes
- [x] Campo de data da sessao editavel na criacao (input date) com valor padrao = hoje
- [x] Campo de data da sessao editavel inline no cabecalho da sessao (clique para editar)
- [x] Schema: sessionDate como campo editavel - updateSession aceita sessionDate como ISO string
- [x] Testes Vitest: 27 testes passando, incluindo updateEntryNotes e closeSession
- [x] Validacao TypeScript completa sem erros - build de producao concluido

## Módulo Cartografia Social - Fase 4
- [x] Router tRPC: closeSession dispara notifyOwner com resumo da sessao (territorio, monitor, total de fatores, distribuicao por risco)
- [x] Schema: adicionar campo analysisText (text, nullable) em social_mapping_sessions para persistir analise LLM
- [x] Router tRPC: analyzeSession salva analysisText na sessao apos gerar analise
- [x] UI: exibir analysisText salvo no cabecalho da sessao (persistencia entre recarregamentos)
- [x] Testes Vitest: cobrir closeSession com notifyOwner e analyzeSession com persistencia

## Módulo Cartografia Social - Fase 5

- [x] Schema: adicionar campo analysisReview (text, nullable) em social_mapping_sessions
- [x] DB helper: updateSessionAnalysisReview(id, analysisReview)
- [x] Router tRPC: updateAnalysisReview procedure (facilitadorProcedure)
- [x] UI SocialMappingSession: painel de validacao humana da sintese LLM com textarea e botao salvar
- [x] Router tRPC: getSessionsByTerritory procedure (lista sessoes agrupadas por territorio em um projeto)
- [x] Nova pagina TerritoryTimeline: linha do tempo de sessoes por territorio com filtros por ODS e risco
- [x] Rota App.tsx: /projetos/:id/cartografia-territorio
- [x] Link de acesso a TerritoryTimeline na pagina SocialMapping
- [x] Router tRPC: generateProjectReport procedure (PDF consolidado de todas as sessoes do projeto)
- [x] PDF helper: buildProjectReportHtml para relatorio consolidado com sumario executivo
- [x] UI SocialMapping: botao Exportar Relatorio Consolidado
- [x] Testes Vitest: cobrir updateAnalysisReview, getSessionsByTerritory e generateProjectReport

## Correções Críticas para Produção (uso imediato pelos pesquisadores populares)

- [x] Diagnóstico completo do fluxo de gravação de áudio (MediaRecorder, upload S3, transcrição Whisper)
- [x] Corrigir erros de gravação de áudio no Android WebView e navegadores móveis
- [x] Corrigir upload de áudio para S3 e retorno de URL válida
- [x] Corrigir transcrição de áudio (endpoint Whisper, formato de arquivo, tamanho)
- [x] Diagnóstico completo do módulo de cartografia social (mapa, geolocalização, registro de fatores)
- [x] Corrigir carregamento do mapa Google Maps no SocialMappingSession
- [x] Corrigir captura de geolocalização GPS no formulário de registro de fator
- [x] Corrigir registro e salvamento de fatores no banco de dados
- [x] Corrigir exibição dos fatores no mapa após registro
- [x] Testes manuais completos dos fluxos críticos antes do deploy

## Correções Críticas para Produção (Fase 6)
- [x] Corrigir restrições de role: pesquisador_popular agora pode atualizar/encerrar sessões que criou
- [x] Corrigir transcrição de áudio: URL relativa /manus-storage/ convertida para URL assinada S3 antes de chamar Whisper
- [x] Corrigir Map.tsx: tratamento robusto de falha de carregamento do Google Maps com fallback visual
- [x] Corrigir SocialMappingSession: MapView com onMapError e marcador com fallback para Marker legado
- [x] Upload de áudio via FormData (endpoint /api/upload) em vez de base64 via tRPC
- [x] Atualizar testes para refletir nova lógica de controle de acesso baseada em criador da sessão

## Reestruturação Metodológica: ODS → 6 Eixos Temáticos PICAPS

- [x] Schema: tabelas eixos_tematicos e eixos_fatores criadas (substituindo ods e ods_factors)
- [x] Schema: campo eixoId adicionado e odsId removido de social_mapping_entries
- [x] DB helpers: getAllEixos, getEixoById, getFactoresByEixo, seedEixosIfEmpty
- [x] Router tRPC: eixos.list, eixos.getById, eixos.getFactores (substituindo ods.*)
- [x] Seed: 122 fatores inseridos nos 6 eixos via force-seed-fatores.mjs
- [x] UI SocialMappingSession.tsx: seleção de eixo com 6 cards coloridos e fatores por eixo
- [x] UI SocialMapping.tsx: painel lateral "Eixos Mais Mapeados" (era "ODS Mais Mapeados")
- [x] UI SocialMappingPrint.tsx: impressão com eixos em vez de ODS
- [x] server/pdf.ts: geração de PDF com eixos em vez de ODS
- [x] Testes Vitest: 41 testes passando com eixos (incluindo eixos router)
- [x] Build de produção concluído sem erros
