const paypal = require('@paypal/checkout-server-sdk');
const payPalClient = require('paypalclient');
module.exports =async function handleRequest(req, res) {
	const request = new paypal.orders.OrdersCreateRequest();
	request.prefer("return=representation");
	request.requestBody({
			intent: 'CAPTURE',
			purchase_units: [{
					amount: {
					currency_code: 'USD',
					value: req.body.value
					}
			}],
	});
	let order;
	try {
		order = await payPalClient.client().execute(request);
	} catch (err) {
		console.error(err);
		return res.send(500);
	}
	res.status(200).json({
		orderID: order.result.id //send the order ID back
	});
}	
