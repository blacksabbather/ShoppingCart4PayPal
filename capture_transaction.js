const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const payPalClient = require('paypalclient');
module.exports = async function handleRequest(req, res) {
		const orderID = req.body.orderID;
		const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
		request.requestBody({});
		let capture
		try {
			capture = await payPalClient.client().execute(request);
		} catch (err) {
			console.error(err);
			return res.send(500);
		}
		return res.status(200).json({
			transID: capture.result.purchase_units[0].payments.captures[0].id // send the transaction id back
		});
}
