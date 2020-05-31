const { DataSource } = require('apollo-datasource');
const uniqid = require('uniqid');
import { snakeCase } from "change-case";

class ServiceAPI extends DataSource {
    constructor() { // todo VERIFICA PERCHÈ VIENE CHIAMATO SPESSO
        super();
    }

    initialize(config) {
        this.context = config.context;
        this.redis = config.context.db;
    }

    async count() {
        let self = this;
        return await new Promise((resolve, reject) => {
            self.redis.keys('service:IT:*', function(err, res){
                if(err)
                    reject(err);
                else resolve({'count': res.length});
            });
        })
    }

    async add({ name, lat, lon, tags }) {
        return await new Promise((resolve, reject) => {
            //console.log(service);
            let service = {
                slug: uniqid(snakeCase(name)+'-'),
                name: name
                position: {
                    lat: lat,
                    lon: lon
                },
                tags: tags
            }
            this.redis.multi()
                .hset('service:IT:'+service.slug, ['slug', service.slug, 'name', service.name])
                .geoadd('locations:IT', service.position.lon, service.position.lat, service.slug);
            for(i=0; i<tags.length; i++) {
                this.redis.multi().sadd('service_by_tag:IT:'+snakeCase(tags[0]), service.slug)
            }
            this.redis.multi().exec(function(err, replies){
                if(err)
                    reject(err)
                    /*console.log("MULTI got " + replies.length + " replies");
                    replies.forEach(function(reply, index) {
                        console.log("REPLY  @ index " + index + ": " + reply);
                    });*/
                resolve(service);
            });
        });
    }

    async findBySlug({ slug }) {
        return await new Promise((resolve, reject) => {
            this.redis.hgetall('service:IT:'+slug, function(err, res){
                if(err)
                    reject(err);
                else resolve(res);
            });
        });
    }

    async search({ name, lat, lon, dist, unit, tags }) {
        if(lat && lon) {
            let serviceByPosition = await new Promise((resolve, reject) => {
                this.redis.georadius('locations:IT', lon, lat, 'radius', unit, function(err, res){
                    if(err)
                        reject(err);
                    else resolve(res);
                });
            }
        }
        if(tags) {
            let serviceByTags = await new Promise((resolve, reject) => {
                for(i=0; i<tags.length; i++) {
                    this.redis.smembers('service_by_tag:IT:'+snakeCase(tags[0]))
                }
                this.redis.georadius('locations:IT', lon, lat, 'radius', unit, function(err, res){
                    if(err)
                        reject(err);
                    else resolve(res);
                });
            }
        }
    }
}

module.exports = ServiceAPI;
