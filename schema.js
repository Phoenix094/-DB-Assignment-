const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

const createUserTable = `
CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
`;

connection.query(createUserTable, (err, result) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('User table created');
    }
});

// Insert a new user into the User table
const insertUser = `
INSERT INTO User (firstName, lastName, email, password)
VALUES (?, ?, ?, ?);
`;

const user = {
    firstName: 'abc',
    lastName: 'xyz',
    email: 'abc@example.com',
    password: '123456'
};

connection.query(insertUser, [user.firstName, user.lastName, user.email, user.password], (err, result) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`User with id ${result.insertId} inserted.`);
    }
});

const selectUsers = `
SELECT * FROM User;
`;

connection.query(selectUsers, (err, rows) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Users:');
        rows.forEach((row) => {
            console.log(row);
        });
    }
});

connection.end((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});