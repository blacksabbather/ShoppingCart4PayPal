var fs = require('fs');
var express = require('express');
var app = express();

app.get('/', function(req, res) { //main page
	fs.readFile('ShoppingCart.html', function (err, html) {
    	if (err) {
            throw err;
        }
		res.writeHeader(200, {"Content-Type":"text/html"}); 
		res.write(html); 
		res.end();
	})
})

app.get('/Thankyou', function(req, res) { //Thank you page
	fs.readFile('ThankYou.html', function (err, html) {
    	if (err) {
            throw err;
        }
		res.writeHeader(200, {"Content-Type":"text/html"}); 
		res.write(html); 
		res.end();
	})
})

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.post('/paypal-transaction-complete', function(req, res){//cpature the transaction ID
	var handle=require('capture_transaction')
	handle(req,res)
})

app.post('/create-paypal-transaction', function(req, res){//place the order
	var handle=require('createtransaction')
	handle(req,res)
})

app.listen(8080,function() {
})
console.log('Server started')
