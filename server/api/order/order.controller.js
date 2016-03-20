
var Order = require('./order.model');

//If there is an error, return 500 status
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

//if everything is alright, return 200 
function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

//If no matching items found, return 404
function entityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Getting a list of Orders
exports.index = function(req, res) {
  Order.find()
    .then(responseWithResult(res));
};

// Getting a single Order from the DB
exports.show = function(req, res) {
  Order.findById(req.params.id)
    .then(entityNotFound(res))
    .then(responseWithResult(res));
};

// Creating a new Order in the DB
exports.create = function(req, res) {
  Order.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updating an existing Order in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Order.findById(req.params.id)
    .then(entityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deleteing an Order from the DB
exports.destroy = function(req, res) {
  Order.findById(req.params.id)
    .then(entityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
