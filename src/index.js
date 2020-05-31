require('dotenv').config()
console.log(process.env.DB_HOST);
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
//const persistence = require('./database/persistence');
//const db = persistence.getClient();
const db = require('./models/models');
const resolvers = require('./resolvers');
const TagAPI = require('./datasources/tag');
const ServiceAPI = require('./datasources/service');
const server = new ApolloServer({
    debug: true,
    typeDefs: typeDefs,
    resolvers: resolvers,
    engine: {
        debugPrintReports: true,
    },
    dataSources: () => {
        return {
            tagAPI: new TagAPI(db.models.tag),
            serviceAPI: new ServiceAPI(db.models.service)
        }
    }
});

server.listen({
    port: process.env.SERVER_PORT
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
