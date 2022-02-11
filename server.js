const mysql = require('mysql2');
const inquirer = require('inquirer');
const util = require('util');
const view = require('./utils/view');
const add = require('./utils/add');
const update = require('./utils/update');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: ''
});

connection.connect((err) => {
    if (err) throw err;
    runPrompt();
})

connection.query = util.promisify(connection.query);

function runPrompt() {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            'View all employees',
            'View all employees by department',
            'View all employees by manager',
            'Add employee',
            'Update employee role',
            'Update employee manager',
            'Remove Employee',
            'View all roles',
            'Add role',
            'Remove role',
            'View all departments',
            'Add department',
            'Remove Department'
        ]
    }).then(function (ans) {
        switch (ans.action) {
            case 'View all employees':
                view.viewAllEmployees(connection, runPrompt);
                break;
            case 'View all employees by department':
                view.viewEmployeeDepartment(connection, runPrompt);
                break;
            case 'View all employee by manager':
                view.viewEmployeeManager(connection, runPrompt);
                break;
            case 'Add employee':
                add.addEmployee(connection, runPrompt);
                break;
            case 'Update employee role':
                update.updateRole(connection, runPrompt);
                break;
            case 'Update employee manager':
                update.updateManager(connection, runPrompt);
                break;
            case 'Remove employee':
                update.removeEmployee(connection, runPrompt);
                break;
            case 'View all roles': 
                view.viewRoles(connection, runPrompt);
                break;
            case 'Add role':
                add.addRole(connection, runPrompt);
                break;
            case 'Remove role':
                update.removeRole(connection, runPrompt);
                break;
            case 'View all departments':
                view.viewDepartments(connection, runPrompt);
                break;
            case 'Add department':
                add.addDepartment(connection, runPrompt);
                break;
            case 'Remove department':
                update.removeDepartment(connection, runPrompt);
                break;
        }
    })
}