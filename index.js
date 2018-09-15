const hapi = require('hapi');
const { Pool, Client } = require('pg');

const connectionString =
  'postgres://wecarrasco:Djwale2014@expensemanager.cylhq1ujuh7v.us-east-1.rds.amazonaws.com:5432/expensemanager';

const client = new Client({
  connectionString
});
const pool = new Pool({
  connectionString
});

client.connect((err) => {
  if (err) {
    console.log(`Error al conectar al cliente... ${err}`);
  } else {
    console.log('Connected to RDS from AWS');
  }
});

client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log(`Error at the initial query... ${err}`);
  } else {
    console.log(`Server time: ${res.rows[0].now}`);
  }
});

pool.query(
  'CREATE TABLE IF NOT EXISTS induction(id SERIAL PRIMARY KEY, username TEXT, initialBudget INT, dailyAverage INT, creditCardName TEXT, cutoffDay INT, creditLimit INT)',
  (err, res) => {
    if (err) {
      console.error(err);
    }
  }
);

pool.query(
  'CREATE TABLE IF NOT EXISTS actions(id SERIAL PRIMARY KEY, username TEXT, name TEXT, description TEXT, selectedCategory TEXT, selectedMethod TEXT, amount INT, notes TEXT, type TEXT, date DATE)',
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);

pool.query(
  'CREATE TABLE IF NOT EXISTS categories(id SERIAL PRIMARY KEY, username TEXT, category TEXT)',
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);

const { DEFAULT_HOST, DEFAULT_PORT, RADIX } = require('./constants');
const routes = require('./routes');

const server = hapi.server({
  host: process.env.HOST || DEFAULT_HOST,
  // host: 'ec2-54-163-150-249.compute-1.amazonaws.com',
  port: parseInt(process.env.PORT, RADIX) || DEFAULT_PORT,
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match']
    }
  },
  app: {}
});

const initServer = async () => {
  try {
    await server.register(routes);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(`Error initiating server`);
    console.log({ err });
  }
};

initServer();
