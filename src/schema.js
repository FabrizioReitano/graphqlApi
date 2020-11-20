const { gql } = require('apollo-server');

const typeDefs = gql`
    type Tag {
        name: String!
    }

    type Service {
        id: ID!
        name: String!
        slug: String!
        position: Position!
        tags: [Tag]
    }

    type Position {
        lat: Float
        lon: Float
    }

    type Role {
        id: ID!,
        name: String!
    }

    type User {
        id: ID!
        name: String!
        surname: String!
        email: String!
        roles: [Role!]
    }

    input UserPosition {
        lat: Float
        lon: Float
    }

    type Query {
        tags(prefix: String!, offset: Int!, count: Int!): [Tag]!
        services(category: String!, center: UserPosition!, radius: Int!, offset: Int!, count: Int!): [Service]
        service(slug: String!): Service
        roles: [Role]
        users: [User]
    }
`;

module.exports = typeDefs;
