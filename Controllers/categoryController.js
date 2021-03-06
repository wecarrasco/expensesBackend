const { Pool } = require('pg');

const connectionString =
  'postgres://wecarrasco:Djwale2014@expensemanager.cylhq1ujuh7v.us-east-1.rds.amazonaws.com:5432/expensemanager';

const pool = new Pool({
  connectionString
});

exports.newCategory = async (req, res) => {
  const { category, user } = req.payload;
  // const user = req.server.info.id.substring(0, req.server.info.id.indexOf(':'));

  const resp = await pool.query(
    `INSERT INTO categories (category, username) VALUES ($1, $2) RETURNING id`,
    [category, user]
  );
  console.log(`Action: ${resp.command} - New Category - User: ${user}`);

  return true;
};

exports.getCategories = async (req, res) => {
  const { user } = req.query;

  const resp = await pool.query(
    `SELECT * FROM categories WHERE username='${user}'`
  );

  console.log(`Action: ${resp.command} - Get Categories - User: ${user}`);
  return resp;
};
