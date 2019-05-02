const Employee = require("../models/employee");
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = graphql;

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        manager: {
            type: ManagerType, 
            resolve(parent, args){

                return Employee.find({id: parent.managerId})
                                .then(res => {console.log(res.data); return res.data;})
                                .catch(err => {throw err});
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
                console.log(parent.managerId)
                console.log(Employee.find({managerId: parent.managerId}));
                return Employee.find({managerId: parent.managerId})
            }
        }
    })
});

module.exports = {
    EmployeeType,
    ManagerType
}