const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: ''
});

connection.connect((err) => {
    if(err) {
        console.log(err);
        res.status(500);
    }
    console.log('Successfully connected');
    runPrompt();
})

connection.query = util.promisify(connection.query);

function runPrompt() {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What do you want to do?',
        choiches: [
            'View employees',
            'View employees by department',
            'View employees by manager',
            'Add employee',
            'Add department',
            'Add role',
            'Remove employee',
            'Update employee role',
            'Update employee manager'
        ]
    })
}