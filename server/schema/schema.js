const graphql = require('graphql');
const _ = require('underscore');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

//dummy data
var employeeData = [
    { id: 100, name: "Alan", managerId: 150},
    { id: 220, name: "Martin", managerId: 100},
    { id: 150, name: "Jamie"},
    { id: 275, name: "Alex", managerId: 100},
    { id: 400, name: "Steve", managerId: 150},
    { id: 190, name: "David", managerId: 400},
    { id: 101, name: "test", managerId: 150},
]

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        manager: {
            type: ManagerType, 
            resolve(parent, args){
                return _.find(employeeData, {id: parent.managerId})
            }
        }
    })
});

const ManagerType = new GraphQLObjectType({
    name: 'Manager',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args){
                return _.filter(employeeData, {managerId: parent.managerId })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employee:{
            type: EmployeeType,
            args: {id: {type: GraphQLInt}},
            resolve(parent, args){
                return _.find(employeeData, {id: args.id})
            }
        },
        manager:{
            type: ManagerType,
            args: {id: {type: GraphQLInt}},
            resolve(parent, args){
                return _.find(employeeData, {managerId : args.id })
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});