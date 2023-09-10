import postgresql from 'pg';

const { Pool } = postgresql;

export default (callback = null) => {
  const pool = new Pool({
    user: 'postgres',
    database: 'eprocurement',
    password: 'admin@123',
    host: '127.0.0.1',
    port: 5432,
  });

  const connection = {
    pool,
    query: (...args) => {
      return pool.connect().then((client) => {
        return client.query(...args).then((res) => {
          client.release();
          return res.rows;
        });
      });
    },
  };

  process.postgresql = connection;
  console.info('Connected to DB instance');

  if (callback) {
    callback(connection);
  }

  return connection;
};
