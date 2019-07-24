# ShoppingCart4PayPal
index.js is the major entry point </br>
ShoppingCart.html is the main page </br>
PayPalClient.js is the basic module </br>
create_transaction.js and capture_transaction.js are the two functional modules </br>

The deploy a website:
0. Pick up a server with node.js/npm installed; run "npm install @paypal/checkout-server-sdk" 
1. mkdir paypalclient && cd paypalclient
2. download index.js, ShoppingCart.html, ThankYou.html
3. npm install paypalclient && npm install createtransaction && npm install capture_transaction
4. node index.js
5. Use a browser (chrome is recommended) to access http://<server_ip>:8080
