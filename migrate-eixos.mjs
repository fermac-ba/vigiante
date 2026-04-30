import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Verificar colunas de social_mapping_entries
const [cols] = await conn.execute('SHOW COLUMNS FROM social_mapping_entries');
const colNames = cols.map(c => c.Field);
console.log('Colunas atuais:', colNames.join(', '));

// Adicionar eixoId se não existir
if (!colNames.includes('eixoId')) {
  await conn.execute('ALTER TABLE social_mapping_entries ADD COLUMN eixoId int NULL AFTER projectId');
  console.log('eixoId adicionado');
} else {
  console.log('eixoId já existe');
}

// Remover odsId se ainda existir
if (colNames.includes('odsId')) {
  await conn.execute('ALTER TABLE social_mapping_entries DROP COLUMN odsId');
  console.log('odsId removido');
} else {
  console.log('odsId não existe (já removido)');
}

// Verificar social_mapping_sessions para analysisText e analysisReview
const [sessCols] = await conn.execute('SHOW COLUMNS FROM social_mapping_sessions');
const sessColNames = sessCols.map(c => c.Field);
console.log('Colunas sessions:', sessColNames.join(', '));

if (!sessColNames.includes('analysisText')) {
  await conn.execute('ALTER TABLE social_mapping_sessions ADD COLUMN analysisText text NULL');
  console.log('analysisText adicionado em sessions');
}
if (!sessColNames.includes('analysisReview')) {
  await conn.execute('ALTER TABLE social_mapping_sessions ADD COLUMN analysisReview text NULL');
  console.log('analysisReview adicionado em sessions');
}

await conn.end();
console.log('Migração concluída com sucesso');
