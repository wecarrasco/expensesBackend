const { Pool } = require('pg');

const connectionString =
  'postgres://wecarrasco:Djwale2014@expensemanager.cylhq1ujuh7v.us-east-1.rds.amazonaws.com:5432/expensemanager';

const pool = new Pool({
  connectionString
});

module.exports = {
  pool
};
