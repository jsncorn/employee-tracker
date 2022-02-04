const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const sequelize = require('sequelize');


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
                case 'Add Role':
                    inquirer
                        .prompt([
                            {
                                name: 'title',
                                type: 'input',
                                message: 'What role would you like to add?',
                                allowNull: false,
                            },
                            {
                                name: 'salary',
                                type: 'input',
                                message: 'Please enter a salary',
                                allowNull: false,
                                validate: {
                                    isNumeric: true
                                }
                            },
                            {
                                name: 'department_id',
                                type: 'input',
                                message: 'Please enter department ID'
                            }
                        ]).then(ans => {
                            addRole(ans.title, ans.salary, ans.department_id);
                            runPrompt();
                        });
                    break;
                case 'Remove Employee':
                    inquirer
                        .prompt([
                            {
                                name: 'id',
                                type: 'input',
                                messsage: 'Enter employee ID'
                            }
                        ]).then(ans => {
                            removeEmployee(ans.id);
                            runPrompt();
                        })
                    break;
                case 'Update employee role':
                    inquirer
                        .prompt([
                            {
                                name: 'eID',
                                type: 'input',
                                message: 'Enter employee ID'
                            },
                            {
                                name: 'roleID',
                                type: 'input',
                                message: 'Enter role ID'
                            }
                        ]).then(ans => {
                            roleUpdate(ans.eID, ans.roleID);
                            runPrompt();
                        });
                    break;
                case 'Update employee manager':
                    inquirer
                        .prompt([
                            {
                                name: 'manager',
                                type: 'input',
                                message: 'Enter manager ID'
                            },
                            {
                                name: 'employee',
                                type: 'input',
                                message: 'Enter employee ID'
                            }
                        ]).then(ans => {
                            managerUpdate(ans.manager, ans.employee);
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
    const addDepartment = connection.query(
        "INSERT INTO department SET name = ?", [department]
    )
}

function addRole(title, salary, department_id) {
    const role = connection.query(
        "INSERT INTO role SET title = ?, salary = ?, department_id = ?",
        [title, salary, department_id]
    )
}

function removeEmployee(id) {
    const remove = connection.query(
        "DELETE FROM employee WHERE id = ?", [id]
    )
    getEmployees();
}

function roleUpdate(eID, roleID) {
    const role = connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleID, eID]
    )
}

function managerUpdate(manager, employee) {
    const managerupdate = connection.query(
        "UPDATE employee SET manager_id = ? WHERE id = ?",
        [manager, employee]
    )
}