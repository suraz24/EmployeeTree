const graphql = require('graphql');
const Employee = require("../models/employee");
const { EmployeeType } = require("./types");


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
                                    return res;   
                                })
                                .catch(err => {
                                    console.log(err);
                                    return err;
                                });
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args){
               return Employee.find()
                                .then(employees => {
                                    return employees.map( employee => {
                                        return employee;
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                    throw err;
                                });
            }
        }
    }
});

module.exports = RootQuery;