const Employee = require("../models/employee");
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID
} = graphql;

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        _id: {type: GraphQLID},
        employeeId: {type: GraphQLInt},
        name: {type: GraphQLString},
        manager: {
            type: ManagerType, 
            resolve(parent, args){

                return Employee.find({employeeId: parent.managerId})
                                .then(res => {console.log(res.data); return res.data._doc;})
                                .catch(err => {throw err});
            }
        }
    })
});

const ManagerType = new GraphQLObjectType({
    name: 'Manager',
    fields: () => ({
        employeeId: {type: GraphQLInt},
        name: {type: GraphQLString},
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args){
                console.log(parent.managerId)
                console.log(Employee.find({managerId: parent.managerId}));
                return Employee.find({managerId: parent.managerId})
                                .then(res => {
                                    return res._doc;
                                })
                                .catch(err => {
                                    console.log(err);
                                    throw err;
                                }) 
            }
        }
    })
});

module.exports = {
    EmployeeType,
    ManagerType
}