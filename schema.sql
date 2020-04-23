DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INTEGER NOT NULL
);


INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("Coffee Table", "Home Decor", 125.99, 500);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("E310 Vitamix Blender", "Kitchen and Dining", 289.95, 500);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("George Foreman Indoor/Outdoor Grill", "Garden & Outdoor", 89.95, 250);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("Nespresso Coffee and Espresso Machine", "Kitchen and Dining", 201.99, 250);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("Weighted Blanket", "Home Decor", 189.70, 350);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("Bladeless Oscillating Tower Fan", "Home Decor", 986.23, 125);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("8TB External Hard Drive", "Computer and Electronics", 144.99, 300);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("Nintendo Switch", "Computer and Electronics", 529.95, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("Apple AirPods Pro", "Computer and Electronics", 234.95, 250);

INSERT INTO products(product_name, department_name, price, stock_quantity )
VALUE ("Rotating Lawn Sprinkler", "Garden & Outdoor", 19.99, 125);





