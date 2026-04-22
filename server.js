const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const crypto = require('crypto');

const app = express();
<<<<<<< HEAD
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const db = mysql.createPool({
  host: process.env.MYSQLHOST || '127.0.0.1',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'Test123!',
  database: process.env.MYSQLDATABASE || 'finalDB',
  port: Number(process.env.MYSQLPORT || 3306),
=======
const PORT = 3000;



const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'finalDB',
  port: 3306,
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

<<<<<<< HEAD
=======


>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

<<<<<<< HEAD
=======

>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
function makeId() {
  return crypto.randomUUID();
}

<<<<<<< HEAD
=======

>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
async function getUserByUsername(userName) {
  const [rows] = await db.query(
    'SELECT userID, userName, first_name, last_name, email FROM users WHERE userName = ?',
    [userName]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}

<<<<<<< HEAD
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

=======


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
const authRoutes = require('./routes/authRoutes')(db, hashPassword);
const convoyRoutes = require('./routes/convoyRoutes')(db);
const friendRoutes = require('./routes/friendRoutes')(db, makeId, getUserByUsername);
const messageRoutes = require('./routes/messageRoutes')(db);
<<<<<<< HEAD
=======
const groupChatsRoutes = require('./routes/groupChatsRoutes')(db);
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
const gpsRoutes = require('./routes/gpsRoutes')(db);

app.use('/api', authRoutes);
app.use('/api', convoyRoutes);
app.use('/api', friendRoutes);
app.use('/api', messageRoutes);
<<<<<<< HEAD
app.use('/api', gpsRoutes);

=======
app.use('/api', groupChatsRoutes);
app.use('/api', gpsRoutes);



>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

<<<<<<< HEAD
app.listen(PORT, HOST, function () {
  console.log(`Convoy app running on ${HOST}:${PORT}`);
=======


app.listen(PORT, function () {
  console.log(`Convoy app running at http://localhost:${PORT}`);
>>>>>>> b62d3093348821586b713371f3f3d7db29d2d9d4
});