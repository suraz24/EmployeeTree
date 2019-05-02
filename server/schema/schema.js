const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const mutation = require('./mutation');
const RootQuery = require('./rootquery');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});