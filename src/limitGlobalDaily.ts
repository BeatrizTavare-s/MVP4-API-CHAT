const db = require('./db');
const ONE_DAY = 24 * 60 * 60 * 1000;
async function limitGlobalDaily(req: any, res: any, next: any) {
    try {

      await db.query(`
        CREATE TABLE IF NOT EXISTS global_limit (
          id SERIAL PRIMARY KEY,
          count INTEGER NOT NULL,
          last_request TIMESTAMP NOT NULL
        );
      `);
  
      console.log('Tabela global_limit criada (ou já existia).');

      const now: Date = new Date();
      const { rows } = await db.query('SELECT * FROM global_limit WHERE id = 1');
  
      if (rows.length === 0) {
        await db.query(
          'INSERT INTO global_limit (id, count, last_request) VALUES (1, $1, $2)',
          [1, now]
        );
        return next();
      }
  
      const { count, last_request } = rows[0];
      const lastRequest = new Date(last_request);
      const timePassed = now.getTime() - lastRequest.getTime(); 
  
      if (timePassed > ONE_DAY) {
        await db.query(
          'UPDATE global_limit SET count = 1, last_request = $1 WHERE id = 1',
          [now]
        );
        return next();
      }
  
      if (count >= 50) {
        return res.status(429).send('Limite diário de uso da API atingido. Tente novamente amanhã.');
      }
  
      await db.query(
        'UPDATE global_limit SET count = count + 1, last_request = $1 WHERE id = 1',
        [now]
      );
  
      next();
    } catch (err) {
      console.error('Erro no controle de limite global:', err);
      res.status(500).send('Erro interno no servidor');
    }
  }
  
export default limitGlobalDaily;