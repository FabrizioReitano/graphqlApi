const { gql } = require('apollo-server');

const typeDefs = gql`
    type Tag {
        name: String!
    }

    type Query {
      tags(prefix: String!, offset: Int!, count: Int!): [Tag]!
    }
`;

module.exports = typeDefs;
