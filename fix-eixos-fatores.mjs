import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Verificar colunas de eixos_fatores
const [cols] = await conn.execute('SHOW COLUMNS FROM eixos_fatores');
const colNames = cols.map(c => c.Field);
console.log('Colunas de eixos_fatores:', colNames.join(', '));

// Adicionar active se não existir
if (!colNames.includes('active')) {
  await conn.execute('ALTER TABLE eixos_fatores ADD COLUMN active tinyint(1) NOT NULL DEFAULT 1 AFTER name');
  console.log('active adicionado a eixos_fatores');
}

// Verificar se eixos_tematicos tem focoPedagogico
const [etCols] = await conn.execute('SHOW COLUMNS FROM eixos_tematicos');
const etColNames = etCols.map(c => c.Field);
console.log('Colunas de eixos_tematicos:', etColNames.join(', '));

// Verificar se o JOIN vai funcionar - testar a query
try {
  const [test] = await conn.execute(`
    SELECT sme.id, et.title 
    FROM social_mapping_entries sme
    LEFT JOIN eixos_tematicos et ON sme.eixoId = et.id
    LIMIT 1
  `);
  console.log('JOIN social_mapping_entries + eixos_tematicos: OK');
} catch (e) {
  console.log('Erro no JOIN:', e.message);
}

await conn.end();
console.log('Correção concluída');
