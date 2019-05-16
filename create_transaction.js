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
							value: req.body.value,
							breakdown:{
								item_total:{
									currency_code: 'USD',
									value: req.body.value,
								}
							},
					},
					items:req.body.items_checkout,
					shipping:{
						method: "United States Postal Service",
        				address: {
          					name: {
            					give_name:req.body.firstname,
            					surname:req.body.lastname
          					},
							address_line_1: req.body.address,
							admin_area_1: req.body.state,
							admin_area_2: req.body.city,
							postal_code: req.body.zipcode,
							country_code: "US"
        				}
					},	
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
		orderID: order.result.id
	});
}	
