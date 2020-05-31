const { gql } = require('apollo-server');

const typeDefs = gql`
    type Tag {
        name: String!
    }

    type Service {
        name: String!
        slug: String!
        position: Position!
        tags: [Tag]
    }

    type Position {
        lat: Float
        lon: Float
    }

    input UserPosition {
        lat: Float
        lon: Float
    }

    type Query {
        tags(prefix: String!, offset: Int!, count: Int!): [Tag]!
        services(category: String!, center: UserPosition!, radius: Int!, offset: Int!, count: Int!): [Service]
    }
`;

module.exports = typeDefs;
