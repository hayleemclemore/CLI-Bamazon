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
    runApp();
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
        buyItem();
    });
      
  }

  function runApp() {
    inquirer.prompt({
      name:"choice",
      type:"list",
      message:"What would you like to do?",
      choices:["Buy Something", "Exit"]
    })
    .then(function(response){
      switch(response.choice) {
        case "Buy Something":
        displayProducts();
        break;
        case "Exit":
        connection.end();
        console.log("Thanks for visiting Bamazon! We hope to see you again soon.");
        break;
      }
    })
  }
 

  function buyItem() {
    inquirer.prompt([{
      name:"itemID",
      type:"input",
      message:`\nEnter the ID number of the product you would like to buy?`,
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        {
          return false;
        }
      }
    },
    {
      name:"quantity",
      type:"input",
      message:`\nHow many would you like to buy?`,
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        {
          return false;
        }
      } 
    },
    {
      name:"confirmation",
      type:"confirm",
      message:`\nIs that correct?`,
      default: true
    }
  ])
    .then(function(userResponse){
      //connect to entire table to pull and append data from specific columns
      var query = "SELECT * FROM products WHERE ?";

      //assigning the userResponse item chosen to the item_id column
      connection.query(query, {item_id:userResponse.itemID}, function(err, response) {
        if (err) throw err;
      
      //inform customer how many units they've purchased
        console.log(`\nYou have chosen to buy ${userResponse.quantity} ${response[0].product_name}`); 
    
        if (userResponse.quantity >= response[0].stock_quantity) {
          console.log(`Insufficient quantity.`)
          runApp();
        }
        else {
          console.log(`\nProcessing order...`);
          var totalCost = userResponse.quantity * response[0].price;
          var updateStock = response[0].stock_quantity - userResponse.quantity;
          var updateTable = "UPDATE products SET stock_quantity = " + updateStock + " WHERE item_id = " + userResponse.itemID;
          connection.query(updateTable, function(err, res){
            if (err) throw err;
            console.log(`\nYour purchase is complete. Your total is $${totalCost}.\nPlease come again soon.`)
            connection.end();
          });
        }
      });
    });
}