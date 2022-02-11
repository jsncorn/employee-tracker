const inquirer = require('inquirer');

function viewAllEmployees(connection, callback) {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee as e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", function (err, res) {
        if (err) throw err;
        console.table(res);
        callback();
    })
}

function viewEmployeeDepartment(connection, callback) {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                choices: function () {
                    let choiceArr = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].name);
                    }
                    return choiceArr;
                },
                message: "What department do you want to search by?"
            }
        ]).then(function (ans) {
            console.log(ans.department);
            connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee as e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = ? ORDER BY employee.id', ans.department, function (err, res) {
                if (err) throw err;
                console.table(res);
                callback();
            })
        })
    })
}

function viewEmployeeManager(connection, callback) {
    connection.query("SELECT DISTINCT e2.first_name, e2.last_name FROM employee LEFT JOIN employee AS e2 ON employee.manager_id = e2.id WHERE e2.first_name IS NOT NULL", function (err, res) {
        if(err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'manager',
                choices: function() {
                    let choiceArr = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].first_name);
                    }
                    return choiceArr;
                },
                message: "Search by what manager?"
            }
        ]).then(function (ans) {
            console.log(ans.manager);
            connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE e2.first_name = ? ORDER BY employee.id;", ans.manager, function(err, res) {
                if (err) throw err;
                console.table(res);
                callback();
            })
        })
    })
}

function viewRoles(connection, callback) {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        callback();
    })
}
function viewDepartments(connection, callback) {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.table(res);
        callback();
    })
}

module.exports = {viewAllEmployees, viewEmployeeDepartment, viewEmployeeManager, viewRoles, viewDepartments};