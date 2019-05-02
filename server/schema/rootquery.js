const graphql = require('graphql');
const Employee = require("../models/employee");
const { EmployeeType, ManagerType } = require("./types");


const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLID
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employee:{
            type: EmployeeType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args){
                return Employee.findById(args._id)
                                .then(res => {
                                    console.log(args._id)
                                    console.log(res)
                                    return res._doc;   
                                })
                                .catch(err => {
                                    console.log(err);
                                    return err;
                                });
            }
        },
        manager:{
            type: ManagerType,
            args: {employeeId: {type: GraphQLInt}},
            resolve(parent, args){
                console.log(args);
                console.log(Employee.find({managerId: args.employeeId}));
                return Employee.find({managerId: args.employeeId})
                                .then(res => {
                                    console.log(...res._doc)
                                    return res._doc
                                })
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args){
               return Employee.find()
                                .then(employees => {
                                    console.log(employees)
                                    return employees.map( employee => {
                                        console.log(employee)
                                        return { ...employee._doc}
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                    throw err;
                                }) 
            }
        }
    }
});

module.exports = RootQuery;