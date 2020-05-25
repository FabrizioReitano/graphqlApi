const { gql } = require('apollo-server');

const typeDefs = gql`
    type Tag {
        name: String!
    }

    type Query {
      tags: [Tag]!
    }
`;

module.exports = typeDefs;
