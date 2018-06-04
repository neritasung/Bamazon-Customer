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
    
};
