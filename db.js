const { Pool } = require("pg");

const pool = new Pool({
    user: "mwjezufwcpaocv",
    password: "1a34c7f79c869b4fb1d8c6dbcb4fe12ed620aebf149893cae02cdda4c9180682",
    host: "ec2-54-211-176-156.compute-1.amazonaws.com",
    port: 5432,
    database: "d1o21eap4dmi25",
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;