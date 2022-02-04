const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const sequelize = require('sequilize');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: ''
});

connection.connect((err) => {
    if (err) {
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
        .then(answers => {
            switch (answers.action) {
                case 'View employees':
                    getEmployees();
                    runPrompt();
                    break;
                case 'View employees by department':
                    getEmployeesByDepartment();
                    runPrompt();
                    break;
                case 'View employees by manager':
                    getEmployeesByManager();
                    runPrompt();
                    break;
                case 'Add employee':
                    inquirer
                        .prompt([
                            {
                                name: 'eFirst',
                                type: 'input',
                                message: 'What is the employee name?',
                                allowNull: false
                            },
                            {
                                name: 'eLast',
                                type: 'input',
                                message: 'What is the employee last name?',
                                allowNull: false
                            },
                            {
                                name: 'eDepartment',
                                type: 'input',
                                message: 'What is the employee department?',
                                allowNull: false
                            },
                            {
                                name: 'eManager',
                                type: 'input',
                                message: 'Who is the manager by ID?',
                                allowNull: false
                            }
                        ]).then(ans => {
                            addEmployees(ans.eFirst, ans.eLast, ans.eDepartment, ans.eManager);
                        });
                    break;
                case 'Add Department':
                    inquirer
                        .prompt([
                            {
                                name: 'department',
                                type: 'input',
                                message: 'What department would you like to add?',
                                allowNull: false,
                            }
                        ]).then(ans => {
                            addDepartment(ans.department);
                            runPrompt();
                        });
                    break;
            }

        });
}

function getEmployees() {
    const results = connection.query("SELECT employee.id, employee.fname, employee.lname, role.title, department.name AS department, role.salary, CONCAT(manager.fname, ' ', manager.lname) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
}

function getEmployeesByDepartment() {
    const dept = connection.query("SELECT employee.id, employee.fname, employee.lname, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id;");
}

function getEmployeesByManager() {
    const manager = connection.query("SELECT employee.id, employee.fname, employee.lname, department.name, employee.manager_id AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id;");
}

function addEmployees(eFirst, eLast, eDepartment, eManager) {
    const add = connection.query(
        "INSERT INTO employee SET fname = ?, lname = ?, role_id = ?, manager_id = ?",
        [eFirst, eLast, eDepartment, eManager]
    )
}

function addDepartment(department) {
    const department = connection.query(
        "INSERT INTO department SET name = ?", [department]
    )
}