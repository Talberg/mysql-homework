drop database if exists employee_db;
create database employee_db; 
use employee_db;

create table department (
id int not null,
name varchar(30)
);

create table role (
id int not null ,
title varchar(30),
salary dec(11,2) not null,
department_id int not null
);


create table employee (
id int auto_increment not null primary key,
first_name varchar(30)not null,
last_name varchar(30) not null ,
role_id int not null,
manger_id int 
);
select title,id from role

