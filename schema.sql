create database bamazon;

use bamazon;

create table products (
id integer auto_increment primary key,
item_id integer not null unique,
product_name varchar (512) not null,
department_name varchar (512) not null,
price Decimal(10,2) not null,
stock_quantity integer not null
);


select*
from products




