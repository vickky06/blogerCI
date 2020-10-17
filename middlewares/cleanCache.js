const { clearHash } = require('../services/cache');
// const { model } = require('mongoose');

module.exports = async(req, res, next) => { 
    await next();//wait for routehandler to complete.
    clearHash(req.user.id)

}