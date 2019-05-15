'use strict';
//PayPal client class
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

function environment() {
    let clientId = 'AfkOJKljns79MF9YOnZI5b8jeTaVIu0e7vTYR6lTeDWJyYWqRL0NQoKM1UMyRBUMwcimCZNXm_yOvZCF';
    let clientSecret = 'EMdxJd9X78UN9joyVKpHOzE5PleOG3RWIHIP2wTPkD9j43Iq2R2WgyDj6MVgmukENj0C8lriU-bTZ0x1';

    return new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId, clientSecret
    );
}

async function prettyPrint(jsonData, pre=""){
    let pretty = "";
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (let key in jsonData){
        if (jsonData.hasOwnProperty(key)){
            if (isNaN(key))
              pretty += pre + capitalize(key) + ": ";
            else
              pretty += pre + (parseInt(key) + 1) + ": ";
            if (typeof jsonData[key] === "object"){
                pretty += "\n";
                pretty +=await prettyPrint(jsonData[key], pre + "    ");
            }
            else {
                pretty += jsonData[key] + "\n";
            }

        }
    }
    return pretty;
}

module.exports = {client: client, prettyPrint:prettyPrint};
