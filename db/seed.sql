USE employees_db;

-- DEPARTMENT SEED
INSERT INTO department(name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');
SELECT * FROM department;

-- ROLE SEED
INSERT INTO role(tile, salary, department_id)
VALUES
('Lead Salesperson', 100000, 1)
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manger', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);
SELECT * FROM role;
-- EMPLOYEE SEED
INSERT INTO employee(fname, lname, role_id, manager_id)
VALUES 
('John', 'Doe', 1, NULL)
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 3),
('Kunal', 'Singh', 5, NULL),
('Malia', 'Brown', 6, 5),
('Sarah', 'Lourd', 7, NULL),
('Tom', 'Allen', 8, 7),

SELECT * from employee;