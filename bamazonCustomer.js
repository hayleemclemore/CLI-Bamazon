var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");
var prompt = require("prompt");

//connection to mysql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Bob@@1#er",
    database: "bamazon_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    
    displayProducts();
  });

  function displayProducts(){
    var query = "SELECT * FROM products"
    connection.query(query, function(err, res) {
        if (err) throw err;
        var greeting = "\nHere is the current available inventory:"
        var table = new Table({
          head: ['ID', 'Product', 'Department', 'Price', 'In Stock'],
          colWidths: [10, 30, 15, 10, 10, 15]
        });

        for (var i = 0; i < res.length; i++) {
          table.push([res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
        }
        console.log(greeting);
        console.log(table.toString());
    });
      connection.end();
  }

 