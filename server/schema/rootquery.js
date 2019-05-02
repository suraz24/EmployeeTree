const graphql = require('graphql');
const Employee = require("../models/employee");
const { EmployeeType, ManagerType } = require("./types");


const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employee:{
            type: EmployeeType,
            args: {id: {type: GraphQLInt}},
            resolve(parent, args){
                return Employee.findOne({id : args.id})
                                .then(res => {
                                    console.log(args.id)
                                    console.log(res)
                                    return res;   
                                })
                                .catch(err => {
                                    console.log(err);
                                    return err;
                                });
            }
        },
        manager:{
            type: ManagerType,
            args: {id: {type: GraphQLInt}},
            resolve(parent, args){
                return Employee.find({managerId: args.id})
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args){
               return Employee.find(); 
            }
        }
    }
});

module.exports = RootQuery;