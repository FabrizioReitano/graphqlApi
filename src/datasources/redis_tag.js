const { DataSource } = require('apollo-datasource');

class TagAPI extends DataSource {
    constructor() { // todo VERIFICA PERCHÈ VIENE CHIAMATO SPESSO
        super();
        //console.log('constructor TagAPI');
    }

    initialize(config) {
        //console.log('initialize TagAPI data source');
        this.context = config.context;
        this.redis = config.context.db;
    }

    async findTags({ prefix, offset, count }) {
        //console.log({ prefix, offset, count });
        return await new Promise((resolve, reject) => {
            if(prefix.length > 1) {
                prefix = prefix.toLowerCase()
                let firstChar = prefix.charAt(0)
                let intChar = prefix.charCodeAt(prefix.length - 1) // codice ascii UTF-16 dell'ultimo carattere
                //console.log('ultimo carattere '+intChar+' ('+prefix.charAt(prefix.length - 1)+')')
                let suffix = String.fromCharCode(intChar - 1) // carattere precedente nella tabella ascii
                //console.log('carattere precedente '+suffix)
                //console.log('aux '+prefix.substring(0, prefix.length - 1))
                let [start, end] = ['('+prefix.substring(0, prefix.length - 1) + suffix + '{', '['+prefix + '{']
                //console.log('start '+start+' - end '+end)
                this.redis.zrangebylex(['tags', start, end, 'limit', offset, count], function(err, res){
                    //console.log(err);
                    //console.log(res);
                    if(err)
                        reject(err);
                    else {
                        let resObj = res.map( tag => ({ name: tag }));
                        //console.log(resObj);
                        resolve(resObj);
                    }

                });
            } else {
                resolve([])
            }
        })
    }

    async count() {
        return await new Promise((resolve, reject) => {
            this.redis.zcount('tags', 0, 1, function(err, res){
                if(err)
                    reject(err)
                else resolve({'count': res})
            })
        })
    }
}

module.exports = TagAPI;
