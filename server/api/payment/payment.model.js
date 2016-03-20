var braintree = require('braintree');
var config = require('../../config/env/development');

var gateway = braintree.connect({
	//setting up keys from the braintree
  environment: braintree.Environment.Sandbox,
  merchantId: config.braintree.merchantId,
  publicKey: config.braintree.publicKey,
  privateKey: config.braintree.privateKey
  
});

module.exports = gateway;