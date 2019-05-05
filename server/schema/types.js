const Employee = require("../models/employee");
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} = graphql;

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        _id: {type: GraphQLID},
        employeeId: {type: GraphQLInt},
        name: {type: GraphQLString},
        managerId: {type: GraphQLInt}
    })
});

module.exports = {
    EmployeeType,
}