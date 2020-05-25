const config = require(global.__basedir+'/config');
const assert = require("assert");
const redis = require("redis");

let _client;

async function init() {
    return await new Promise(function(resolve, reject){
        let client = redis.createClient(config.redis.port, config.redis.host,
            {
                retry_strategy: function(options) {
                    if (options.error && options.error.code === "ECONNREFUSED") {
                        // End reconnecting on a specific error and flush all commands with
                        // a individual error
                        return new Error("The server refused the connection");
                    }
                    if (options.total_retry_time > 1000 * 60 * 60) {
                        // End reconnecting after a specific timeout and flush all commands
                        // with a individual error
                        return new Error("Retry time exhausted");
                    }
                    if (options.attempt > 10) {
                        // End reconnecting with built in error
                        return undefined;
                    }
                    // reconnect after
                    return Math.min(options.attempt * 100, 3000);
                },
            }
        );
        client.on("ready", () => {
            console.log('db ready');
            _client = client;
            resolve(client);
        });
        client.on("error", function(error) {
            console.error(error);
            reject(error);
        });
    });
};

function getClient() {
    assert.ok(_client, "database non inizializzato");
    return _client;
}

function getRepository(name) {
    assert.ok(_client, "database non inizializzato");
    assert.ok(_repositories.hasOwnProperty(name), "repository non trovato");
    return _repositories[name];
}

module.exports = {
    init: init,
    getClient: getClient,
    getRepository: getRepository
}
