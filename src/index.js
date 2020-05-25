require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const persistence = require('./database/persistence');
const resolvers = require('./resolvers');
const TagAPI = require('./datasources/tag');
const server = new ApolloServer({
    debug: true,
    typeDefs: typeDefs,
    resolvers: resolvers,
    engine: {
        debugPrintReports: true,
    },
    context: async () => {
        client = await persistence.getClient()
        return {
            db: client
        }
    },
    dataSources: () => {
        return {
            tagAPI: new TagAPI()
        }
    }
});

server.listen({
    port: process.env.SERVER_PORT
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
