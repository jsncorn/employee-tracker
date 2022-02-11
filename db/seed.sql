USE employees_db;

-- DEPARTMENT SEED
INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");
SELECT * FROM department;

-- ROLE SEED
INSERT INTO role (title, salary, department_id)
VALUES
("Lead Salesperson", 100000.00, 1),
("Salesperson", 80000.00, 1),
("Lead Engineer", 150000.00, 2),
("Software Engineer", 120000.00, 2),
("Account Manger", 160000.00, 3),
("Accountant", 125000.00, 3),
("Legal Team Lead", 250000.00, 4),
("Lawyer", 190000.00, 4);
SELECT * FROM role;
-- EMPLOYEE SEED
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
("John", "Doe", 1, NULL),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, NULL),
("Kevin", "Tupik", 4, 3),
("Kunal", "Singh", 5, NULL),
("Malia", "Brown", 6, 5),
("Sarah", "Lourd", 7, NULL),
("Tom", "Allen", 8, 7);

SELECT * FROM employee;