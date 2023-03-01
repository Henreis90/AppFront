const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'node',
  password: 'Pa$$w0rd901216',
  database: 'mydb'
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <input type="email" name="email" placeholder="Email" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, password],
    (error, results) => {
      if (error) throw error;
      res.send('User created successfully');
    }
  );
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
