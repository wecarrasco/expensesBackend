// const pg = require('pg');
const { Pool, Client } = require('pg');

const connectionString =
  'postgres://wecarrasco:Djwale2014@expensemanager.cylhq1ujuh7v.us-east-1.rds.amazonaws.com:5432/expensemanager';

const client = new Client({
  connectionString
});

const pool = new Pool({
  connectionString
});

exports.getInduction = async (req, res) => {
  const user = req.server.info.id.substring(0, req.server.info.id.indexOf(':'));
  const resp = await pool.query(
    `SELECT * FROM induction WHERE username = '${user}'`
  );
  console.log(resp);
  return resp;
};

exports.inductionSettings = async (req, res) => {
  const initialBudget = req.query.initialBudget;
  const dailyAverage = req.query.dailyAverage;
  const creditCardName = req.query.creditCardName;
  const cutoffDay = req.query.cutoffDay;
  const creditLimit = req.query.creditLimit;
  const user = req.server.info.id.substring(0, req.server.info.id.indexOf(':'));
  const resp = await pool.query(
    `INSERT INTO induction (username ,initialBudget, dailyAverage, creditCardName, cutoffDay, creditLimit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [user, initialBudget, dailyAverage, creditCardName, cutoffDay, creditLimit]
  );
  console.log(`Action: ${resp.command} - Induction Settings`);
  return resp;
};
