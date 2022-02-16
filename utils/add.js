const inquirer = require('inquirer');

function addEmployee(connection, callback) {
    let newEmployee = {};
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
                validate: function (ans) {
                    if (ans.length === 0) {
                        console.log('Please enter a valid name');
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?",
                validate: function (ans) {
                    if (ans.length === 0) {
                        console.log('Please enter a valid name')
                    }
                    return true;
                }
            },
            {
                type: 'list',
                name: 'role',
                choices: function () {
                    let choiceArr = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].title)
                    }
                    return choiceArr;
                },
                message: "What is the employee's role?"
            }
        ])
            .then(function (ans) {
                newEmployee.first_name = ans.first_name;
                newEmployee.last_name = ans.last_name;

                connection.query("SELECT * FROM role WHERE title = ?", ans.role, function (err, res) {
                    if (err) throw err;
                    newEmployee.role_id = res[0].id;

                    connection.query("SELECT * FROM employee;", function (err, res) {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'manager_name',
                                    choices: function () {
                                        let choiceArr = [];
                                        for (var i = 0; i < res.length; i++) {
                                            choiceArr.push(res[i].first_name);
                                        }
                                        return choiceArr
                                    },
                                    message: "Who is the employee's manager?"
                                }
                            ])
                            .then(function (ans) {
                                connection.query("SELECT id FROM employee WHERE first_name = ?", ans.manager_name, function (err, res) {
                                    if (err) throw err;
                                    newEmployee.manager_id = res[0].id;
                                    console.dir('Employee being added');

                                    connection.query("INSERT INTO employee SET ?", newEmployee, function (err, res) {
                                        if (err) throw err;
                                        console.dir('Employee successfully added');
                                        callback();
                                    })
                                })
                            })
                    })
                })
            })
    })
}

function addRole(connection, callback) {
    let newRole = {};
    connection.query("SELECT * FROM department", function (err, res) {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'role_title',
                    message: "What role would you like to add?",
                    validate: function (ans) {
                        if (ans.length === 0) {
                            console.dir('Please enter a valid name')
                        }
                        return true;
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is the salary of this role?",
                    validate: function (ans) {
                        if (ans.length === 0) {
                            console.dir('Please enter a valid amount')
                        }
                        return true
                    }
                },
                {
                    type: 'list',
                    name: 'dept_name',
                    choices: function () {
                        let choiceArr = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArr.push(res[i].name);
                        }
                        return choiceArr;
                    },
                    message: "What is the role's department?"
                }
            ]).then(function (ans) {
                newRole.title = ans.role_title;
                newRole.salary = ans.salary;

                connection.query("SELECT id FROM department WHERE name = ?", ans.dept_name, function (err, res) {
                    if (err) throw err;
                    newRole.department_id = res[0].id;
                    console.dir('Role being added');

                    connection.query("INSERT INTO role SET ?", newRole, function (err, res) {
                        if (err) throw err;
                        console.dir('Role added successfully')
                        callback();
                    })
                })
            })
    })
}

function addDepartment(connection, callback) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept_name',
            message: 'What department would you like to add?',
            validate: function(ans) {
                if(ans.length === 0) {
                    console.dir('Please enter a valid name')
                }
                return true;
            }
        }
    ]).then(function (ans) {
        connection.query("INSERT INTO department (name) VALUES (?)", ans.dept_name, function(err, res) {
            if(err) throw err;
            console.log('Department added successfully')
            callback();
        })
    })
}

module.exports = { addEmployee, addRole, addDepartment };