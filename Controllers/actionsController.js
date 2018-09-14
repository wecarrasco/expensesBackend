const { Pool } = require('pg');

const connectionString =
  'postgres://wecarrasco:Djwale2014@expensemanager.cylhq1ujuh7v.us-east-1.rds.amazonaws.com:5432/expensemanager';

const pool = new Pool({
  connectionString
});

// const pool = require('../db/dbConnection');

exports.newAction = async (req, res) => {
  const {
    description,
    amount,
    name,
    notes,
    selectedCategory,
    selectedMethod,
    type,
    date
  } = req.payload;
  const user = req.server.info.id.substring(0, req.server.info.id.indexOf(':'));

  const resp = await pool.query(
    `INSERT INTO actions (description,
    amount,
    name,
    notes,
    selectedCategory,
    selectedMethod,
    type,
    username,
    date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
    [
      description,
      amount,
      name,
      notes,
      selectedCategory,
      selectedMethod,
      type,
      user,
      date
    ]
  );
  console.log(`Action: ${resp.command} - New ${type} - User: ${user}`);

  // if (type === 'EXPENSE') {
  //   const respUpdate = await pool.query(
  //     `UPDATE induction SET dailyaverage = dailyaverage - ${amount} WHERE username = '${user}'`
  //   );
  //   console.log(
  //     `Action: ${respUpdate.command} - Decrement Savings - User: ${user}`
  //   );
  // }

  return true;
};

exports.getActions = async (req, res) => {
  const user = req.server.info.id.substring(0, req.server.info.id.indexOf(':'));
  const resp = await pool.query(
    `SELECT * FROM actions WHERE username = '${user}'`
  );
  console.log(`Action: ${resp.command} - Get Actions - User: ${user}`);
  return resp;
};
