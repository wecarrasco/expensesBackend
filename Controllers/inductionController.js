const { Pool } = require('pg');

const connectionString =
  'postgres://wecarrasco:Djwale2014@expensemanager.cylhq1ujuh7v.us-east-1.rds.amazonaws.com:5432/expensemanager';

const pool = new Pool({
  connectionString
});

// const pool = require('../db/dbConnection');

exports.getInduction = async (req, res) => {
  console.log(req);
  const user = req.server.info.id.substring(0, req.server.info.id.indexOf(':'));
  const resp = await pool.query(
    `SELECT * FROM induction WHERE username = '${user}'`
  );
  console.log(`Action: ${resp.command} - Get Induction - User: ${user}`);
  return resp;
};

exports.inductionSettings = async (req, res) => {
  const {
    initialBudget,
    dailyAverage,
    creditCardName,
    cutoffDay,
    creditLimit
  } = req.payload;
  const user = req.server.info.id.substring(0, req.server.info.id.indexOf(':'));
  const resp = await pool.query(
    `INSERT INTO induction (username ,initialBudget, dailyAverage, creditCardName, cutoffDay, creditLimit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [user, initialBudget, dailyAverage, creditCardName, cutoffDay, creditLimit]
  );
  console.log(`Action: ${resp.command} - Induction Settings - User: ${user}`);
  return resp;
};
