USE employees_db;

-- DEPARTMENT SEED
INSERT INTO department(name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

-- ROLE SEED
INSERT INTO role(tile, salary, department_id)
VALUES
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manger', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);