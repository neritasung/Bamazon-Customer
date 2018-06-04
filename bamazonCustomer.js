// packages
var mysql = require("mysql");
var inquirer = require("inquirer");

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
    connection.query("SELECT ITEM_ID, PRODUCT_NAME, PRICE FROM auctions", function (err, results) {
        if (err) throw err;
    });

    // run Start function
    start();
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


            // if quantity is <= stock quantity, calculate the total price - Quantity user entered * price


            // else statement quantity user entered > stock display Insufficient quantity! message
        });


            // call displayProcut again

}
