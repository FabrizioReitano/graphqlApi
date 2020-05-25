const redis = require("redis");

let _client;

async function init() {
    console.log('db init');
    return await new Promise(function(resolve, reject){
        let client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST,
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

async function getClient() {
    if (!_client) _client = await init();
    return _client;
}

module.exports = {
    getClient: getClient
}
