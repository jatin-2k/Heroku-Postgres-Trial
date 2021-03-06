var express = require('express');
var router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


/* GET home page. */
router
.get('/', async function(req, res, next) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test');
    const results = (result) ? result.rows : null;
    res.send(results);
    client.release();
  } 
  catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
