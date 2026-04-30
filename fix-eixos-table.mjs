import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Ver colunas atuais da tabela eixos_tematicos
const [cols] = await conn.execute('SHOW COLUMNS FROM eixos_tematicos');
const colNames = cols.map(c => c.Field);
console.log('Colunas atuais de eixos_tematicos:', colNames.join(', '));

// Adicionar focoPedagogico se não existir
if (!colNames.includes('focoPedagogico')) {
  await conn.execute('ALTER TABLE eixos_tematicos ADD COLUMN focoPedagogico text NULL AFTER contradicaoCentral');
  console.log('focoPedagogico adicionado');
}

// Adicionar iconEmoji se não existir  
if (!colNames.includes('iconEmoji')) {
  await conn.execute('ALTER TABLE eixos_tematicos ADD COLUMN iconEmoji varchar(20) NULL AFTER color');
  console.log('iconEmoji adicionado');
}

// Verificar eixos_fatores
const [fatCols] = await conn.execute('SHOW COLUMNS FROM eixos_fatores');
const fatColNames = fatCols.map(c => c.Field);
console.log('Colunas de eixos_fatores:', fatColNames.join(', '));

// Verificar social_mapping_entry_comments
try {
  const [cmtCols] = await conn.execute('SHOW COLUMNS FROM social_mapping_entry_comments');
  const cmtColNames = cmtCols.map(c => c.Field);
  console.log('Colunas de social_mapping_entry_comments:', cmtColNames.join(', '));
} catch (e) {
  console.log('Tabela social_mapping_entry_comments não existe, criando...');
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS \`social_mapping_entry_comments\` (
      \`id\` int AUTO_INCREMENT NOT NULL,
      \`entryId\` int NOT NULL,
      \`userId\` int NOT NULL,
      \`userName\` varchar(255) NOT NULL,
      \`comment\` text NOT NULL,
      \`createdAt\` timestamp NOT NULL DEFAULT (now()),
      \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT \`social_mapping_entry_comments_id\` PRIMARY KEY(\`id\`)
    )
  `);
  console.log('social_mapping_entry_comments criada');
}

await conn.end();
console.log('Correção concluída com sucesso');
