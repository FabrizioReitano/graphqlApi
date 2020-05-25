global.__srcdir = __dirname;
global.__basedir = __dirname+'/..';

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const persistence = require('./database/persistence');
//const db = persistence.init();
const resolvers = require('./resolvers');
const TagAPI = require('./datasources/tag');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    engine: {
        debugPrintReports: true,
    },
    context: async () => ({
        db: persistence.getClient()
    }),
    dataSources: () => ({
        //tagAPI: new TagAPI({ db })
        tagAPI: new TagAPI()
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
