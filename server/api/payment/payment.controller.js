var Braintree = require('./payment.model');

/**
FOR HANDLING ERRORS & RESPONSES 
*/
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function handleResponse (res) {
  return function (err, result) {
    if(err) {
      return handleError(res)(err);
    }
    responseWithResult(res)(result);
  }
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

//Generating client token in backend using Braintree SDK 
exports.clientToken = function(req, res){
  Braintree.clientToken.generate({}, function (err, data) {
    return handleResponse(res)(err, data.clientToken);
  });
}

//nonce received from the Angular to finish executing the payment 
exports.checkout = function(req, res){
  Braintree.transaction.sale({
    //getting the total amount 
    amount: req.body.total,
    paymentMethodNonce: req.body.nonce,
  }, function callback (err, result) {
    if(err) {
      return handleError(res)(err);
    }
    if(result.success){
      responseWithResult(res)(result);
    } else {
      handleError(res)(result.errors);
    }
  });
}
