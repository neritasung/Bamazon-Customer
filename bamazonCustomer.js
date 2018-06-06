// packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
 

// sql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // username
    user: "root",

    // password
    password: "root",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    // call function to display all products for sale
    displayProducts();
});


// ---------- Function to display all products --------- //
 function displayProducts() {
    // query the database for all items 
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(err);
  
    console.log("Response from query: "+res);
// instantiate
var table = new Table({
    head: ['ID', 'ITEM_ID', 'PRODUCT_NAME', 'DEPARTMENT_NAME', 'PRICE', 'STOCK_QUANTITY']
});

// for-loop to loop through table
    for (var i = 0; i < res.length; i++) {
        var productArr = [];
        for (var key in res[i]) {
            productArr.push(res[i][key]);
            // table is an Array, so you can `push`, `unshift`, `splice` and friends
        }
        table.push(productArr);
    };
 
console.log(table.toString());
    // run Start function
    start();

});
};


// -------- Start Function ---------//
function start() {
    inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "What product would you like to buy? Enter the item id here."
      },
      {
        name: "quantity",
        type: "input",
        message: "How many do you want?"
      },
    ])
        .then(function (answer) {
        
    // compare the item_id user entered and quantity against DB
            
        var query = "SELECT PRICE, STOCK_QUANTITY FROM products WHERE ?";
        var id = parseInt(answer.item_id);
        connection.query(query, { ITEM_ID: id }, function(err, res) {
            if (err) throw err;
           // console.log(err);
             
            // if quantity is <= stock quantity, calculate the total price - Quantity user entered * price

            if (res[0].STOCK_QUANTITY >= parseInt(answer.quantity)){

                var tempQuantity = res[0].STOCK_QUANTITY - parseInt(answer.quantity);
                connection.query("UPDATE products SET ? WHERE ?", [{STOCK_QUANTITY: tempQuantity},{ITEM_ID:id}], function (err, result) {
                    if (err) throw err;
               var totalPrice = res[0].PRICE * parseInt(answer.quantity);
               console.log("Purchase Complete! Your total price is: " + totalPrice);
                               
            });
        }

            // else statement quantity user entered > stock display Insufficient quantity! message

            else {
                console.log ("Insufficient quantity!");
            }
            connection.end();
        });
    });
}
        
