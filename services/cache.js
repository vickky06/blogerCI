const keys = require('../config/keys')
const mongoose = require('mongoose');
const redis = require('redis');
const client = redis.createClient(keys.redisUrl);
const util = require('util');
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec; //////GOT HOLD OF THE ORIGINAL PROTOTYPE FUNCTION


mongoose.Query.prototype.cache = function (option = {}) {
    // console.log(option)
    ///this is to make sure that we do not create cache for random stuff and only essential stuff.
    //by setting and checking this flag we will create and use cache only for true instances.
    // we can pass an option object for nested caching
    this.useCache = true;
    this.hashKey = JSON.stringify(option.key || '');//if someone doesn't pass a key, empty value-string.
    // console.log(this.hashKey,"Hash key in cache function");
    return this;
}

mongoose.Query.prototype.exec = async function () {
    // console.log("I am about to run a query");
    /*since both <mongoose.Query.prototype.exec> and <
     *   mongoose.Query.prototype.cache > are part of "mongoose.Query.prototype" it can be used as "this.useCache" and 
     *  while calling this exec method we can add the extra param to call the above function as well.*/
    if (!this.useCache) {
        return exec.apply(this, arguments);
    }
    const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }))
    //see if we have a valueof key
    // console.log("we are gonna check for cache")
    const cacheValue = await client.hget(this.hashKey,key);//nested hashs
    if (cacheValue) {
        //return cacheValue with mongo model;
        const doc = JSON.parse(cacheValue);
        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))   //if doc is an array of objects we need to create model for each array objcect
            : new this.model(doc);              //else just return the result
    }


    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key,JSON.stringify(result));
}

//function to delete to clearCache;
module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    }
}