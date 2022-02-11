const inquirer = require('require');

function removeEmployee(connection, callback) {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'removeEmployee',
                choices: function () {
                    let choiceArr = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].first_name)
                    }
                    return choiceArr;
                },
                message: "Which emplyoee would you like to remove?"
            }
        ]).then(function (ans) {
            connection.query("DELETE FROM employee WHERE first_name = ?", ans.removeEmployee, function (err, res) {
                if (err) throw err;
                console.dir('Employee removed successfully')
                callback();
            })
        })
    })
}

function updateRole(connection, callback) {
    let newRole = {};
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                choices: function () {
                    let choiceArr = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].first_name);
                    }
                    return choiceArr;
                },
                message: "What employee would you like to remove?"
            }
        ]).then(function (ans) {
            connection.query("DELETE FROM employee WHERE first_name = ?", ans.removeEmployee, function (err, res) {
                if (err) throw err;
                console.dir('Employee deleted successfully')
                callback();
            })
        })
    })
}

function updateRole(connection, callback) {
    let newRole = {};
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                choices: function () {
                    let choiceArr = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].first_name);

                    }
                    return choiceArr;
                },
                message: 'Which employee do you want to update?'
            }
        ]).then(function (ans) {
            newRole.first_name = ans.updateEmployee;
            connection.query("SELECT * FROM role", function (err, res) {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'updateRole',
                        choices: function () {
                            let choiceArr = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArr.push(res[i].title);
                            }
                            return choiceArr;
                        },
                        message: "What role do you want them to be?"
                    }
                ]).then(function (ans) {
                    connection.query("SELECT * FROM role WHERE title = ?", ans.updateRole, function (err, res) {
                        if (err) throw err;
                        newRole.role_id = res[0].id;
                        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [newRole.role_id, newRole.first_name], function (err, res) {
                            if (err) throw err;
                            console.log("Employee successfully updated");
                            callback();
                        })
                    })
                })
            })
        })
    })
}

function updateManager(connection, callback) {
    let newManager = {};
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                choices: function () {
                    let choiceArr = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].first_name);
                    }
                    return choiceArr;
                },
                message: "Which employee would you like to update?"
            }
        ]).then(function (ans) {
            newManager.first_name = ans.updateEmployee;
            connection.query("SELECT * FROM employee", function (err, res) {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'updateManager',
                        choices: function () {
                            let choiceArr = [];
                            for (var i = 0; i < res.length; i++) {
                                choiceArr.push(res[i].first_name);

                            }
                            return choiceArr;
                        },
                        message: "What manager will the employee have?"
                    }
                ]).then(function (ans) {
                    connection.query("SELECT * employee WHERE first_name = ?", ans.updateManager, function (err, res) {
                        if (err) throw err;
                        newManager.manager_id = res[0].id;
                        connection.query("UPDATE employee SET manager_id = ? WHERE first_name = ?", [newManager.manager_id, newManager.first_name], function (err, res) {
                            if (err) throw err;
                            console.dir('Manager for employee successfully updated');
                            callback();
                        })
                    })
                })
            })
        })
    })
}

function removeRole(connection, callback) {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'removeRole',
                choices: function() {
                    let choiceArr = [];
                    for (var i=0; i<res.length; i++) {
                        choiceArr.push(res[i].title);
                    }
                    return choiceArr;
                },
                message: "What role do you want to remove?"
            }
        ]).then(function (ans) {
            connection.query("DELETE FROM role WHERE title = ?;", ans.removeRole, function(err, res) {
                if (err) throw err;
                console.log("Role deleted successfully");
                callback();
            })
        })
    })
}

function removeDepartment (connection, callback) {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "removeDept",
                    type: "list",
                    choices: function () {
                        let choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].name);
                        }
                        return choiceArray;
                    },
                    message: "Which department would you like to remove?"
                }
            ])
            .then(function (answer) {
                let query = 'DELETE FROM department WHERE name = ?;'
                connection.query(query, answer.removeDept, function (err, res) {
                    if (err) throw err;
                    console.log("Department deleted successfully");
                    callback();
                });
            });
    });
}

module.exports = {removeEmployee, updateRole, updateManager, removeRole, removeDepartment }